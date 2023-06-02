'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { generatePoints } from '/components/Eyes/generatePoints'

import styles from './Eyes.module.scss'

const Eyes = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const eyeRefs = useRef<NodeListOf<HTMLDivElement>>()
  const [cursorPos, setCursorPos] = useState<{ x: number, y: number }>()
  const [points, setPoints] = useState<[number, number][]>([])

  useEffect(() => {
    const bbox = containerRef.current?.getBoundingClientRect()
    if (bbox) {
      setPoints(generatePoints(bbox.height, bbox.width, Number(getComputedStyle(document.body).fontSize.replace('px', '')) * 4.5))
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.pageX, y: e.pageY })
  }, [])

  useEffect(() => {
    document.body.addEventListener('mousemove', handleMouseMove)
    return () => document.body.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Update eye pupils
  useEffect(() => {
    if (!cursorPos) return
    if (!eyeRefs.current) {
      eyeRefs.current = document.querySelectorAll<HTMLDivElement>(`.${styles.eye}`)
    }
    eyeRefs.current.forEach(eye => {
      const box = eye.getBoundingClientRect()
      const eyeX = box.x + (box.width / 2)
      const eyeY = box.y + (box.height / 2)
      const direction = Math.atan2(cursorPos.x - eyeX, cursorPos.y - eyeY)
      const distance = Math.sqrt(Math.pow(cursorPos.x - eyeX, 2) + Math.pow(cursorPos.y - eyeY, 2))
      eye.style.setProperty('--pupil-x', `${Math.sin(direction) / 6 * Math.min(distance / 30, 1)}em`)
      eye.style.setProperty('--pupil-y', `${Math.cos(direction) / 6 * Math.min(distance / 30, 1)}em`)
    })
  }, [cursorPos])

  const eyes = useMemo(() => points.map((c, i) => <div
    key={i}
    className={styles.eye}
    style={{
      '--eye-y': `${c[0]}%`,
      '--eye-x': `${c[1]}%`,
      fontSize: `${Math.random() * 3 + 2}em`,
      '--blink-delay': `${Math.random() * 30}s`,
    } as React.CSSProperties}
    onClick={e => {
      const target = e.currentTarget
      target.dataset.popped = 'true'
      window.setTimeout(() => target.dataset.popped = 'false', 5000)
    }}
  />), [points])

  return <div className={styles.wrapper} ref={containerRef}>{eyes}</div>
}

export default Eyes
