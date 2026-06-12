import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Showreel() {
  const frameRef = useRef(null)
  useEffect(() => {
    const tween = gsap.to(frameRef.current, {
      scale: 1, ease: 'power2.out',
      scrollTrigger: { trigger: frameRef.current, start: 'top 85%', end: 'top 35%', scrub: 0.6 }
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])
  return (
    <section className="reel" id="reel">
      <div className="reel-frame" ref={frameRef}>
        <video autoPlay muted loop playsInline poster="https://picsum.photos/seed/metrikareel/1920/960?grayscale">
          <source src="/metrika-showreel.mp4" type="video/mp4" />
        </video>
        <div className="reel-ui">
          <div className="reel-top">
            <div className="reel-rec"><i></i>REC — Metrika studio reel</div>
            
          </div>
          <div className="reel-bottom">
          
            <div className="reel-play" data-cursor="view">PLAY ▸</div>
          </div>
        </div>
      </div>
    </section>
  )
}
