import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Reveal from '../components/Reveal'

const words = [
  { t: 'Your' }, { t: 'website' }, { t: 'is' }, { t: 'your' },
  { t: 'hardest-working', accent: true }, { t: 'salesperson' }, { t: '—' }, { t: 'we' },
  { t: 'make' }, { t: 'it' }, { t: 'impossible' }, { t: 'to' }, { t: 'ignore.', accent: true },
]

export default function AboutSection() {
  const stRef = useRef(null)

  useEffect(() => {
    const tween = gsap.to(stRef.current.querySelectorAll('.w'), {
      opacity: 1, stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: stRef.current, start: 'top 78%', end: 'top 30%', scrub: true }
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <section id="about">
      <div className="shell">
        <div className="eyebrow"><b>01</b> Why Metrika</div>
        <p className="about-statement" ref={stRef}>
          {words.map((w, i) => (
            <span key={i}><span className={`w ${w.accent ? 'accent' : ''}`}>{w.t}</span>{' '}</span>
          ))}
        </p>
        <div className="about-cols">
          <Reveal variant="scale" className="about-img">
            <video autoPlay muted loop playsInline poster="/showreel-poster.jpg" src="/metrika-video.mp4" />
          </Reveal>
          <Reveal className="about-col" delay={0.1}>
            <h3>Performance, not promises</h3>
            <p>Every site we ship targets 90+ Lighthouse scores, loads in under two seconds, and is engineered to rank from day one. Beauty that performs — that's the standard.</p>
            <p className="sig">— Built to convert</p>
          </Reveal>
          <Reveal className="about-col" delay={0.2}>
            <h3>One team, zero handoffs</h3>
            <p>Strategy, design, code, and SEO under one roof in Udupi. No agencies juggling freelancers, no lost-in-translation briefs — you talk directly to the people building your product.</p>
            <p>Modern stack: React, Next.js, AI integrations, and cloud deployment as standard.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
