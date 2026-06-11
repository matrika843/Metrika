import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function PageHero({ eyebrow, num, lines, lede }) {
  const rootRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.h-inner', { y: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.15 })
      gsap.fromTo('.lede', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' })
      gsap.fromTo('.eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.2 })
    }, rootRef)
    return () => ctx.revert()
  }, [])
  return (
    <div className="page-hero" ref={rootRef}>
      <div className="eyebrow"><b>{num}</b> {eyebrow}</div>
      <h1>
        {lines.map((l, i) => (
          <span className="h-line" key={i}>
            <span className="h-inner">{l}</span>
          </span>
        ))}
      </h1>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}
