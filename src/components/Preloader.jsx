import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onReveal }) {
  const root = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { onReveal(); setDone(true); return }
    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const tl = gsap.timeline({ onComplete: () => setDone(true) })
      tl.to('.loader-logo', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut' })
        .to('.loader-tag', { opacity: 1, duration: 0.5 }, '-=0.5')
        .to(counter, {
          v: 100, duration: 1.9, ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = Math.round(counter.v)
            if (barRef.current) barRef.current.style.width = counter.v + '%'
          }
        }, 0)
        .to('.loader-center, .loader-count, .loader-bar', { opacity: 0, duration: 0.4 })
        .to('.loader-curtain.top', { yPercent: -101, duration: 1.1, ease: 'power4.inOut' }, '<')
        .to('.loader-curtain.bottom', { yPercent: 101, duration: 1.1, ease: 'power4.inOut' }, '<')
        .add(onReveal, '-=0.75')
    }, root)
    return () => ctx.revert()
  }, [])

  if (done) return null
  return (
    <div className="loader" ref={root}>
      <div className="loader-curtain top"></div>
      <div className="loader-curtain bottom"></div>
      <div className="loader-center">
        <img className="loader-logo" src="/logo-white.png" alt="Metrika" />
        <div className="loader-tag">We build you · You trust us</div>
      </div>
      <div className="loader-count"><span ref={countRef}>0</span>%</div>
      <div className="loader-bar"><i ref={barRef}></i></div>
    </div>
  )
}
