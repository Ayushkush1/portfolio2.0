"use client";
import { useEffect, useRef, FC, ReactNode } from 'react';
import { gsap } from 'gsap';

interface GridMotionProps {
  items?: (string | ReactNode)[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

  const copies = 2; // each row is repeated so the marquee wraps seamlessly
  const defaultItems = Array.from({ length: 28 }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items : defaultItems;
  // Only the two middle rows are fully visible, so every item is split between them.
  // The partly-hidden top & bottom rows reuse those items, shifted so neighbours differ.
  const half = Math.ceil(combinedItems.length / 2);
  const middleTop = combinedItems.slice(0, half);
  const middleBottom = combinedItems.slice(half);
  const rotate = <T,>(arr: T[]) => {
    const shift = Math.floor(arr.length / 2);
    return [...arr.slice(shift), ...arr.slice(0, shift)];
  };
  const rows = [rotate(middleBottom), middleTop, middleBottom, rotate(middleTop)];
  const rowLengthsRef = useRef<number[]>([]);
  rowLengthsRef.current = rows.map(row => row.length);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent): void => {
      mouseXRef.current = e.clientX;
    };

    const maxMoveAmount = 300;
    const scrollSpeed = 40; // px per second, constant marquee speed
    const inertiaFactors = [0.06, 0.08, 0.1, 0.12];
    const smoothedMouse = [0, 0, 0, 0];

    const updateMotion = (): void => {
      // Continuous one-way marquee: rows never slow down or reverse.
      // Each row holds repeated copies of its cards, so wrapping by one copy's width is seamless.
      const travelled = gsap.ticker.time * scrollSpeed;
      const targetMouse = (mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2;

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const direction = index % 2 === 0 ? 1 : -1;
        const first = row.children[0] as HTMLElement | undefined;
        const nextSet = row.children[rowLengthsRef.current[index]] as HTMLElement | undefined;
        if (!first || !nextSet) return;
        const period = nextSet.offsetLeft - first.offsetLeft;

        smoothedMouse[index] += (targetMouse - smoothedMouse[index]) * inertiaFactors[index];
        const loop = gsap.utils.wrap(-period / 2, period / 2, travelled * direction);

        gsap.set(row, { x: loop + smoothedMouse[index] * direction });
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-full overflow-hidden relative flex items-center justify-center"
        style={{
          background: gradientColor !== 'transparent' ? `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)` : 'transparent'
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>
        <div className="md:gap-4 gap-2 flex-none relative w-max h-max grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">
          {rows.map((rowItems, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-2 md:gap-4 w-max"
              style={{ willChange: 'transform, filter' }}
              ref={el => {
                if (el) rowRefs.current[rowIndex] = el;
              }}
            >
              {Array.from({ length: rowItems.length * copies }, (_, itemIndex) => {
                const content = rowItems[itemIndex % rowItems.length];
                return (
                  <div key={itemIndex} className="relative shrink-0">
                    <div className="relative w-[360px] sm:w-[400px] md:w-[590px] h-[170px] sm:h-[180px] md:h-[270px] overflow-hidden rounded-[20px] md:rounded-3xl bg-[#111] border border-white/5 flex items-center justify-center text-white text-[1.5rem] shadow-2xl">
                      {typeof content === 'string' && (content.startsWith('http') || content.startsWith('/assets/') || content.endsWith('.png') || content.endsWith('.jpg') || content.endsWith('.jpeg')) ? (
                        <img
                          src={content}
                          alt="Design Showcase"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top absolute top-0 left-0"
                        />
                      ) : (
                        <div className="p-4 text-center z-[1]">{content}</div>
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

