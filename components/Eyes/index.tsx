'use client'

import { useEffect, useRef, useState } from 'react'

import { generatePoints } from './generatePoints'

export const Eyes = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const eyeRefs = useRef<NodeListOf<HTMLDivElement>>(null)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>()
  const [points, setPoints] = useState<[number, number][]>([])
  const amountPopped = useRef(0)

  useEffect(() => {
    const bbox = containerRef.current?.getBoundingClientRect()
    if (bbox) {
      setPoints(
        generatePoints(
          bbox.height,
          bbox.width,
          Number(getComputedStyle(document.body).fontSize.replace('px', '')) * 4.5,
        ),
      )
    }
  }, [])

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPos({ x: e.pageX, y: e.pageY })
  }
  const handleFocusChange = (e: FocusEvent) => {
    if (!(e.target instanceof HTMLElement)) return
    const bbox = e.target.getBoundingClientRect()
    setCursorPos({ x: bbox.x, y: bbox.y })
  }

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.addEventListener('pointermove', handleMouseMove)
      document.body.addEventListener('focusin', handleFocusChange)
      return () => {
        document.body.removeEventListener('pointermove', handleMouseMove)
        document.body.removeEventListener('focusin', handleFocusChange)
      }
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: React compiler
  }, [handleMouseMove, handleFocusChange])

  // Update eye pupils
  useEffect(() => {
    if (!cursorPos) return
    if (!eyeRefs.current) {
      eyeRefs.current = document.querySelectorAll<HTMLDivElement>('.eye')
    }
    for (const eye of eyeRefs.current) {
      const box = eye.getBoundingClientRect()
      const eyeX = box.x + box.width / 2
      const eyeY = box.y + box.height / 2
      const direction = Math.atan2(cursorPos.x - eyeX, cursorPos.y - eyeY)
      const distance = Math.sqrt((cursorPos.x - eyeX) ** 2 + (cursorPos.y - eyeY) ** 2)
      eye.style.setProperty('--pupil-x', `${(Math.sin(direction) / 6) * Math.min(distance / 30, 1)}em`)
      eye.style.setProperty('--pupil-y', `${(Math.cos(direction) / 6) * Math.min(distance / 30, 1)}em`)
    }
  }, [cursorPos])

  return (
    <div className="absolute inset-0" ref={containerRef}>
      {points.map((c, i) => (
        // biome-ignore lint/a11y/useKeyWithClickEvents: These goofy eyes don't need to be clickable via keyboard
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: List never changes order
          key={i}
          className="eye"
          style={
            {
              '--eye-y': `${c[0]}%`,
              '--eye-x': `${c[1]}%`,
              fontSize: `${Math.random() * 3 + 2}em`,
              '--blink-delay': `${Math.random() * 30}s`,
            } as React.CSSProperties
          }
          onClick={(e) => {
            const target = e.currentTarget
            target.dataset.popped = 'true'
            window.setTimeout(() => {
              target.dataset.popped = 'false'
            }, 5000)

            amountPopped.current++
            const cStyle = 'font-weight: bold; color: #14072E;'
            if (amountPopped.current === 3) console.log('%couch', cStyle)
            if (amountPopped.current === 10) console.log('%cplease stop 😭', cStyle)
            if (amountPopped.current === 25) console.log("%cyou're determined, i'll give you that", cStyle)
            if (amountPopped.current === 50) console.log('%ci only have so many eyes >.>', cStyle)
            if (amountPopped.current === 75) console.log('%cand i am running out', cStyle)
            if (amountPopped.current === 99) console.log('%cokok relax', cStyle)
            if (amountPopped.current === 100) console.log("%chere's a cool webcomic: https://sas.ewanb.me", cStyle)
            if (amountPopped.current === 110) console.log("%cno seriously there's nothing else", cStyle)
          }}
        />
      ))}
    </div>
  )
}
