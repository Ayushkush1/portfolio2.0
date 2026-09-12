'use client'

import { useEffect, useRef } from 'react'

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const smooth = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMove)

    const animate = () => {
      // Lerp for smoothness — 0.10 = nice silky lag
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.05
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.05

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${smooth.current.x - 6}px, ${smooth.current.y - 6}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

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
