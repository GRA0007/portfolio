'use client'

import { useEffect, useRef } from 'react'
import { generatePoints } from './generatePoints'

export const Eyes = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const eyes = useRef<HTMLDivElement[]>([])
  const amountPopped = useRef(0)

  const onPop = (e: PointerEvent) => {
    const target = e.currentTarget as HTMLDivElement
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
  }

  useEffect(() => {
    if (!containerRef.current) return

    // Generate points in percentage space
    const { width, height } = containerRef.current.getBoundingClientRect()
    const points = generatePoints(
      width,
      height,
      Number(getComputedStyle(document.body).fontSize.replace('px', '')) * 4.5,
    )

    // Render each eyeball
    eyes.current = points.map(([x, y]) => {
      const eye = document.createElement('div')
      eye.className = 'eye'
      eye.style.setProperty('--eye-x', `${x}%`)
      eye.style.setProperty('--eye-y', `${y}%`)
      eye.style.setProperty('--blink-delay', `${Math.random() * 30}s`)
      eye.style.fontSize = `${Math.random() * 3 + 2}em`
      eye.onclick = onPop
      containerRef.current?.append(eye)
      return eye
    })

    // Clean up
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: React compiler
  }, [onPop])

  const updatePupils = (x: number, y: number) => {
    for (const eye of eyes.current) {
      const box = eye.getBoundingClientRect()
      const eyeX = box.x + box.width / 2
      const eyeY = box.y + box.height / 2
      const direction = Math.atan2(x - eyeX, y - eyeY)
      const distance = Math.sqrt((x - eyeX) ** 2 + (y - eyeY) ** 2)
      eye.style.setProperty('--pupil-x', `${(Math.sin(direction) / 6) * Math.min(distance / 30, 1)}em`)
      eye.style.setProperty('--pupil-y', `${(Math.cos(direction) / 6) * Math.min(distance / 30, 1)}em`)
    }
  }

  const handlePointerMove = (e: PointerEvent | TouchEvent) => {
    'touches' in e ? updatePupils(e.touches[0].clientX, e.touches[0].clientY) : updatePupils(e.clientX, e.clientY)
  }
  const handleFocusChange = (e: FocusEvent) => {
    if (!(e.target instanceof HTMLElement)) return
    const bbox = e.target.getBoundingClientRect()
    updatePupils(bbox.x, bbox.y)
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.body.addEventListener('pointermove', handlePointerMove)
    document.body.addEventListener('touchmove', handlePointerMove)
    document.body.addEventListener('focusin', handleFocusChange)
    return () => {
      document.body.removeEventListener('pointermove', handlePointerMove)
      document.body.removeEventListener('touchmove', handlePointerMove)
      document.body.removeEventListener('focusin', handleFocusChange)
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: React compiler
  }, [handlePointerMove, handleFocusChange])

  return <div className="absolute inset-0" ref={containerRef} />
}
