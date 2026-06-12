import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const projects = [
  { frame: 'Frame 001', tag: 'E-commerce', img: '/project/Sara-central.png', name: 'Sara Central', meta: 'Full-stack store · live in production', year: "'25" },
  { frame: 'Frame 002', tag: 'Digital Agency', img: '/project/intouchmarketingsolutions.png', name: 'InTouch Marketing Solutions', meta: 'Digital marketing agency · brand & growth', year: "'25" },
  { frame: 'Frame 003', tag: 'RAG chatbot', img: 'https://picsum.photos/seed/ragbot/1200/750', name: 'Conversa RAG', meta: 'Document AI · LangChain', year: "'24" },
  { frame: 'Frame 004', tag: 'Your project', img: 'https://picsum.photos/seed/nextproject/1200/750', name: 'Your story, next', meta: "Let's write the script together", year: "'26" },
]

export default function WorkStrip() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const dist = () => track.scrollWidth - window.innerWidth
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current, start: 'top top', end: () => '+=' + dist(),
          pin: true, scrub: 1, invalidateOnRefresh: true,
          onUpdate: (self) => { if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})` }
        }
      })
      return () => { tween.scrollTrigger?.kill(); tween.kill() }
    })

    const imgs = trackRef.current.querySelectorAll('img')
    const onLoad = () => ScrollTrigger.refresh()
    imgs.forEach(img => { if (!img.complete) img.addEventListener('load', onLoad) })

    return () => {
      mm.revert()
      imgs.forEach(img => img.removeEventListener('load', onLoad))
    }
  }, [])

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="work-head">
        <div className="eyebrow"></div>
        <h2 className="section-h2">The <em>reel</em> so far</h2>
      </div>
      <div className="work-track" ref={trackRef}>
        {projects.map(p => (
          <Link to="/work" className="work-card" key={p.frame} data-cursor="view">
            <div className="work-media">
              <span className="work-frame-num">{p.frame}</span>
              <span className="work-tag">{p.tag}</span>
              <img src={p.img} alt={p.name} />
              <div className="work-info">
                <div>
                  <div className="work-name">{p.name}</div>
                  <div className="work-meta">{p.meta}</div>
                </div>
                <div className="work-year">{p.year}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="work-swipe-hint">Swipe →</div>
      <div className="work-progress"><i ref={progressRef}></i></div>
    </section>
  )
}
