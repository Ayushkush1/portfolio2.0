'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

// Context-aware cursor. Any element can opt in with:
//   data-cursor="View"                → the dot opens into a glass lens with a serif label
//   data-cursor-ring="Catfy · SaaS"   → text that orbits the lens edge (usually the project's name)
//   data-cursor-icon="external"       → adds a ↗ for links that leave the site

const LENS = 120 // px
const RING_R = 57 // drawn brand ring
const TEXT_R = 46 // orbiting micro-text
const RING_C = 2 * Math.PI * RING_R
const TEXT_C = 2 * Math.PI * TEXT_R

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const stretchRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const smooth = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)
  const activeRef = useRef(false)
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [label, setLabel] = useState('')
  const [ring, setRing] = useState('')
  const [icon, setIcon] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const [pressed, setPressed] = useState(false)

  // A click navigates away while the lens is open; close it so it doesn't linger on the new page
  const pathname = usePathname()
  useEffect(() => {
    activeRef.current = false
    setActive(false)
  }, [pathname])

  // Only for real mouse pointers — touch devices have no cursor to follow
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const animate = () => {
      // Loose, silky lag as a dot; tighter as a lens so the label stays readable
      const ease = activeRef.current ? 0.18 : 0.05
      const prevX = smooth.current.x
      const prevY = smooth.current.y
      smooth.current.x += (pos.current.x - smooth.current.x) * ease
      smooth.current.y += (pos.current.y - smooth.current.y) * ease
      const { x, y } = smooth.current

      if (dotRef.current) dotRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`
      if (lensRef.current) lensRef.current.style.transform = `translate(${x}px, ${y}px)`

      // Liquid squash & stretch along the direction of travel
      if (stretchRef.current && !reduceMotion) {
        const vx = x - prevX
        const vy = y - prevY
        const s = Math.min(Math.hypot(vx, vy) * 0.01, 0.18)
        const a = Math.atan2(vy, vx)
        stretchRef.current.style.transform = `rotate(${a}rad) scale(${1 + s}, ${1 - s * 0.6}) rotate(${-a}rad)`
      }

      // Stop the loop once the cursor has caught up; the next mousemove restarts it
      const settled =
        Math.abs(pos.current.x - x) < 0.1 &&
        Math.abs(pos.current.y - y) < 0.1
      rafRef.current = settled ? null : requestAnimationFrame(animate)
    }

    const startLoop = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(animate)
    }

    const updateTarget = (el: Element | null) => {
      const target = el?.closest<HTMLElement>('[data-cursor]')
      if (target) {
        // Keep the last content while closing, so nothing blanks mid-animation
        setLabel(target.dataset.cursor ?? '')
        setRing(target.dataset.cursorRing ?? '')
        setIcon(target.dataset.cursorIcon ?? null)
      }
      const isActive = !!target
      if (isActive !== activeRef.current) {
        activeRef.current = isActive
        setActive(isActive)
        startLoop()
      }
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      startLoop()
    }
    const onOver = (e: MouseEvent) => updateTarget(e.target as Element)

    // Scrolling with a still mouse moves elements under the pointer without any mouse events.
    // Hit-testing every scroll frame forces layout mid-scroll, so check at most every 120ms.
    let scrollFrame: ReturnType<typeof setTimeout> | null = null
    const onScroll = () => {
      if (scrollFrame !== null || pos.current.x < 0) return
      scrollFrame = setTimeout(() => {
        scrollFrame = null
        updateTarget(document.elementFromPoint(pos.current.x, pos.current.y))
      }, 120)
    }

    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    const root = document.documentElement
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    root.addEventListener('mouseleave', onLeave)
    root.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      root.removeEventListener('mouseleave', onLeave)
      root.removeEventListener('mouseenter', onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (scrollFrame) clearTimeout(scrollFrame)
      rafRef.current = null
    }
  }, [enabled])

  if (!enabled) return null

  const open = active && !hidden
  const expo = 'ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none'
  // Repeat the orbit text so it wraps the full circle, then let textLength space it evenly
  const repeats = ring.length > 28 ? 1 : ring.length > 16 ? 2 : 3
  const orbit = ring ? Array(repeats).fill(`${ring} ✦ `).join('') : ''

  return (
    <>
      {/* Dot — blends with whatever is underneath. Its own fixed layer so the blend isn't isolated */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`h-[13px] w-[13px] rounded-full bg-white transition-[transform,opacity] duration-500 ${expo} ${
            active || hidden ? 'scale-0 opacity-0' : pressed ? 'scale-75' : 'scale-100'
          }`}
        />
      </div>

      {/* Lens — opens out of the dot over elements that opt in with data-cursor */}
      <div
        ref={lensRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{ willChange: 'transform' }}
      >
        <div ref={stretchRef} className="absolute left-0 top-0" style={{ willChange: 'transform' }}>
          <div
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-700 ${expo} ${
              open ? (pressed ? 'scale-90 opacity-100' : 'scale-100 opacity-100') : 'scale-[0.2] opacity-0'
            }`}
            style={{ width: LENS, height: LENS }}
          >
            {/* Frosted glass — blurs and deepens the work underneath instead of covering it */}
            <div
              className="absolute inset-[6px] rounded-full bg-[#0b0f19]/55 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_20px_50px_rgba(0,0,0,0.45)]"
              style={{ backdropFilter: 'blur(10px) saturate(1.6)', WebkitBackdropFilter: 'blur(10px) saturate(1.6)' }}
            />

            <svg viewBox={`0 0 ${LENS} ${LENS}`} className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <path
                  id="cursor-orbit"
                  d={`M ${LENS / 2},${LENS / 2} m -${TEXT_R},0 a ${TEXT_R},${TEXT_R} 0 1,1 ${TEXT_R * 2},0 a ${TEXT_R},${TEXT_R} 0 1,1 -${TEXT_R * 2},0`}
                />
              </defs>

              {/* Brand ring draws itself in, starting at 12 o'clock */}
              <circle
                cx={LENS / 2}
                cy={LENS / 2}
                r={RING_R}
                fill="none"
                stroke="hsl(var(--brand))"
                strokeWidth={1.25}
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={open ? 0 : RING_C}
                transform={`rotate(-90 ${LENS / 2} ${LENS / 2})`}
                className={`transition-[stroke-dashoffset] duration-1000 ${expo}`}
              />

              {/* Orbiting project name */}
              {orbit && (
                <g
                  className="animate-[spin_16s_linear_infinite] motion-reduce:animate-none"
                  style={{ transformBox: 'view-box', transformOrigin: `${LENS / 2}px ${LENS / 2}px` }}
                >
                  <text
                    className={`fill-white/80 text-[7.5px] font-medium uppercase transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}
                    style={{ letterSpacing: '0.22em' }}
                  >
                    <textPath href="#cursor-orbit" textLength={TEXT_C - 4} lengthAdjust="spacing">
                      {orbit}
                    </textPath>
                  </text>
                </g>
              )}
            </svg>

            {/* Centre label — rises through a mask, in the same voice as the section headings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
                <span
                  className={`flex items-start text-white transition-transform duration-700 ${expo} ${
                    open ? 'translate-y-0 delay-100' : 'translate-y-[110%]'
                  }`}
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  <span className="text-[22px] italic font-light leading-none">{label}</span>
                  {icon === 'external' ? (
                    <ArrowUpRight className="ml-0.5 -mt-0.5 h-4 w-4 text-brand" strokeWidth={2.25} />
                  ) : (
                    <span className="text-[22px] leading-none text-brand">.</span>
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
