import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Reveal from '../components/Reveal'

const words = [
  { t: 'A' }, { t: 'digital' }, { t: 'studio' }, { t: 'crafting' },
  { t: 'cinematic', accent: true }, { t: 'web' }, { t: 'experiences' }, { t: 'for' },
  { t: 'ambitious' }, { t: 'brands' }, { t: 'that' }, { t: 'refuse' }, { t: 'to' },
  { t: 'look' }, { t: 'ordinary.', accent: true },
]

export default function AboutSection() {
  const stRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const tween = gsap.to(stRef.current.querySelectorAll('.w'), {
      opacity: 1, stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: stRef.current, start: 'top 78%', end: 'top 30%', scrub: true }
    })
    const par = gsap.fromTo(imgRef.current, { yPercent: -6, scale: 1.15 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill(); par.scrollTrigger?.kill(); par.kill() }
  }, [])

  return (
    <section id="about">
      <div className="shell">
        <div className="eyebrow"></div>
        <p className="about-statement" ref={stRef}>
          {words.map((w, i) => (
            <span key={i}><span className={`w ${w.accent ? 'accent' : ''}`}>{w.t}</span>{' '}</span>
          ))}
        </p>
        <div className="about-cols">
          <Reveal variant="scale" className="about-img">
            <img ref={imgRef} src="https://picsum.photos/seed/metrikastudio/800/1000?grayscale" alt="Studio at work" />
          </Reveal>
          <Reveal className="about-col" delay={0.1}>
            <h3>Who we are</h3>
            <p>Founded by builders, not salesmen. Metrika unites engineering precision and design obsession under one roof — every pixel intentional, every millisecond optimized.</p>
          </Reveal>
          <Reveal className="about-col" delay={0.2}>
            <h3>How we work</h3>
            <p>We treat your product like a film production: scripted in strategy, directed in design, and shot in clean, performant code. Then we premiere it to the world.</p>
            <p>From first sketch to launch day — one team, full accountability.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
