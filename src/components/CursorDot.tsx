'use client'

import { useEffect, useRef, useState } from 'react'

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const smooth = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)
  const [enabled, setEnabled] = useState(false)

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

    const animate = () => {
      // Lerp for smoothness — 0.05 = nice silky lag
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.05
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.05

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${smooth.current.x - 6}px, ${smooth.current.y - 6}px)`
      }

      // Stop the loop once the dot has caught up; the next mousemove restarts it
      const settled =
        Math.abs(pos.current.x - smooth.current.x) < 0.1 &&
        Math.abs(pos.current.y - smooth.current.y) < 0.1
      rafRef.current = settled ? null : requestAnimationFrame(animate)
    }

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 13,
        height: 13,
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
        mixBlendMode: 'difference',
      }}
    />
  )
}
