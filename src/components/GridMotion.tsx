"use client";
import { useEffect, useRef, FC, ReactNode } from 'react';
import { gsap } from 'gsap';

/** An image with its description; plain strings are treated as image URLs with no description */
export interface GridImage {
  src: string;
  alt: string;
}

interface GridMotionProps {
  items?: (GridImage | string | ReactNode)[];
  gradientColor?: string;
}

const isGridImage = (item: unknown): item is GridImage =>
  typeof item === 'object' && item !== null && 'src' in item && 'alt' in item;

const isImageUrl = (item: unknown): item is string =>
  typeof item === 'string' &&
  (item.startsWith('http') || item.startsWith('/assets/') || /\.(png|jpe?g|webp)$/.test(item));

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

  const copies = 2; // each row is repeated so the marquee wraps seamlessly
  const defaultItems = Array.from({ length: 28 }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items : defaultItems;
  // Every item appears once across the two middle rows. The outer rows reuse those items,
  // shifted by different amounts so neighbouring cards never repeat. Six rows keep the tilted
  // band tall enough to fill the container's corners, even on wide screens.
  const half = Math.ceil(combinedItems.length / 2);
  const middleTop = combinedItems.slice(0, half);
  const middleBottom = combinedItems.slice(half);
  const rotate = <T,>(arr: T[], fraction = 0.5) => {
    const shift = Math.floor(arr.length * fraction);
    return [...arr.slice(shift), ...arr.slice(0, shift)];
  };
  const rows = [
    rotate(middleTop, 0.25),
    rotate(middleBottom),
    middleTop,
    middleBottom,
    rotate(middleTop),
    rotate(middleBottom, 0.75),
  ];
  const rowLengthsRef = useRef<number[]>([]);
  rowLengthsRef.current = rows.map(row => row.length);
  const rowCount = rows.length;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent): void => {
      mouseXRef.current = e.clientX;
    };

    const maxMoveAmount = 300;
    const scrollSpeed = 40; // px per second, constant marquee speed
    // Each row follows the mouse with its own lag, so the parallax has depth
    const inertiaFactors = Array.from({ length: rowCount }, (_, i) => 0.05 + i * 0.015);
    const smoothedMouse = new Array(rowCount).fill(0);

    // Row loop widths are measured once (and on resize) — never inside the frame loop,
    // where reading layout right after writing transforms forces a synchronous reflow.
    const periods = new Array(rowCount).fill(0);
    const measure = () => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const first = row.children[0] as HTMLElement | undefined;
        const nextSet = row.children[rowLengthsRef.current[index]] as HTMLElement | undefined;
        if (first && nextSet) periods[index] = nextSet.offsetLeft - first.offsetLeft;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    rowRefs.current.forEach((row) => row && ro.observe(row));

    // Fast transform writers (no tween objects per frame)
    const setX = rowRefs.current.map((row) => (row ? gsap.quickSetter(row, "x", "px") : null));

    // Only animate while the grid is on screen
    let visible = false;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "100px 0px" });
    if (gridRef.current) io.observe(gridRef.current);

    const updateMotion = (): void => {
      if (!visible) return;
      // Continuous one-way marquee: rows never slow down or reverse.
      // Each row holds repeated copies of its cards, so wrapping by one copy's width is seamless.
      const travelled = gsap.ticker.time * scrollSpeed;
      const targetMouse = (mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2;

      for (let index = 0; index < setX.length; index++) {
        const set = setX[index];
        const period = periods[index];
        if (!set || !period) continue;
        const direction = index % 2 === 0 ? 1 : -1;
        smoothedMouse[index] += (targetMouse - smoothedMouse[index]) * inertiaFactors[index];
        const loop = gsap.utils.wrap(-period / 2, period / 2, travelled * direction);
        set(loop + smoothedMouse[index] * direction);
      }
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      removeAnimationLoop();
      ro.disconnect();
      io.disconnect();
    };
  }, [rowCount]);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-full overflow-hidden relative flex items-center justify-center"
        style={{
          background: gradientColor !== 'transparent' ? `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)` : 'transparent'
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>
        <div className="md:gap-4 gap-2 flex-none relative w-max h-max grid grid-cols-1 rotate-[-15deg] origin-center z-[2]">
          {rows.map((rowItems, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-2 md:gap-4 w-max"
              style={{ willChange: 'transform' }}
              ref={el => {
                if (el) rowRefs.current[rowIndex] = el;
              }}
            >
              {Array.from({ length: rowItems.length * copies }, (_, itemIndex) => {
                const content = rowItems[itemIndex % rowItems.length];
                const src = isGridImage(content) ? content.src : isImageUrl(content) ? content : null;
                // Each design is described once: its first copy in the two middle rows. Every other
                // card is a visual repeat for the endless loop, so it's hidden from screen readers.
                const isOriginal = (rowIndex === 2 || rowIndex === 3) && itemIndex < rowItems.length;
                const alt = isOriginal && isGridImage(content) ? content.alt : "";
                return (
                  <div key={itemIndex} className="relative shrink-0" aria-hidden={isOriginal ? undefined : true}>
                    <div className="relative w-[360px] sm:w-[400px] md:w-[590px] h-[170px] sm:h-[180px] md:h-[270px] overflow-hidden rounded-[20px] md:rounded-3xl bg-[#111] border border-white/5 flex items-center justify-center text-white text-[1.5rem] shadow-2xl">
                      {src ? (
                        <img
                          src={src}
                          alt={alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top absolute top-0 left-0"
                        />
                      ) : (
                        <div className="p-4 text-center z-[1]">{content as ReactNode}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default GridMotion;

