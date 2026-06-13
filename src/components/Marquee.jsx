import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Item = () => (
  <span>WEB DEVELOPMENT <b>✦</b> SEO OPTIMIZATION <b>✦</b> BRANDING <b>✦</b> METRIKA <b>✦</b>&nbsp;</span>
)

export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const isMobile = window.matchMedia('(max-width: 1024px), (hover: none)').matches
    const tween = gsap.to(trackRef.current, { xPercent: -33.333, ease: 'none', duration: 18, repeat: -1 })

    if (isMobile) return () => tween.kill()

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = Math.abs(self.getVelocity()) / 1200
        gsap.to(tween, { timeScale: 1 + Math.min(v, 4), duration: 0.3, overwrite: true })
        gsap.to(tween, { timeScale: 1, duration: 1, delay: 0.25, overwrite: false })
      }
    })
    return () => { st.kill(); tween.kill() }
  }, [])

  return (
    <div className="marquee">
      <div className="marquee-track" ref={trackRef}>
        <Item /><Item /><Item />
      </div>
    </div>
  )
}
