import { useEffect, useRef, FC, ReactNode } from 'react';
import { gsap } from 'gsap';

interface GridMotionProps {
  items?: (string | ReactNode)[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(window.innerWidth / 2);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent): void => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = (): void => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      // Ambient slow floating movement in the background (infinite loop)
      const time = gsap.ticker.time * 0.30; // slightly faster slow speed
      const ambientOffset = Math.sin(time) * 100; // gentle back-and-forth offset

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const mouseOffset = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2);
          const totalOffset = (mouseOffset + ambientOffset) * direction;

          gsap.to(row, {
            x: totalOffset,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
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
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-2 md:gap-4 w-max"
              style={{ willChange: 'transform, filter' }}
              ref={el => {
                if (el) rowRefs.current[rowIndex] = el;
              }}
            >
              {Array.from({ length: 7 }, (_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];
                return (
                  <div key={itemIndex} className="relative shrink-0">
                    <div className="relative w-[360px] sm:w-[400px] md:w-[590px] h-[170px] sm:h-[180px] md:h-[270px] overflow-hidden rounded-[20px] md:rounded-3xl bg-[#111] border border-white/5 flex items-center justify-center text-white text-[1.5rem] shadow-2xl">
5                     {typeof content === 'string' && (content.startsWith('http') || content.startsWith('/assets/') || content.endsWith('.png') || content.endsWith('.jpg') || content.endsWith('.jpeg')) ? (
                        <img
                          src={content}
                          alt="Design Showcase"
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
