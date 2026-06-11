import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowRight, Play } from 'lucide-react'
import Magnetic from '../components/Magnetic'

export default function Hero({ revealed }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const lbTop = useRef(null)
  const lbBottom = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx2d = canvas.getContext('2d')
    let pts = [], raf
    const size = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    size(); addEventListener('resize', size)
    for (let i = 0; i < 60; i++) pts.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4, s: Math.random() * 0.0004 + 0.0001, o: Math.random() * 0.5 + 0.15 })
    const draw = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.y -= p.s; if (p.y < 0) p.y = 1
        ctx2d.beginPath(); ctx2d.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, 7)
        ctx2d.fillStyle = `rgba(201,169,106,${p.o})`; ctx2d.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size) }
  }, [])

  useEffect(() => {
    const t1 = gsap.fromTo(lbTop.current, { height: 28 }, { height: 0, scrollTrigger: { start: 0, end: 400, scrub: 0.5 } })
    const t2 = gsap.fromTo(lbBottom.current, { height: 28 }, { height: 0, scrollTrigger: { start: 0, end: 400, scrub: 0.5 } })
    return () => { t1.scrollTrigger?.kill(); t1.kill(); t2.scrollTrigger?.kill(); t2.kill() }
  }, [])

  useEffect(() => {
    if (!revealed) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .to('.hero-rule', { scaleX: 1, duration: 0.8, ease: 'power3.out' })
        .to('.hero-badge', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to('.hero .h-inner', { y: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 }, '-=0.5')
        .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .to('.hero-anim', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.6')
        .to('.stat', {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out',
          onStart: () => {
            document.querySelectorAll('[data-count]').forEach(el => {
              gsap.to(el, { innerText: +el.dataset.count, duration: 1.6, snap: { innerText: 1 }, ease: 'power2.out' })
            })
          }
        }, '-=0.45')
    }, rootRef)
    return () => ctx.revert()
  }, [revealed])

  return (
    <section className="hero" ref={rootRef}>
      <div className="letterbox top" ref={lbTop}></div>
      <div className="letterbox bottom" ref={lbBottom}></div>
      <div className="hero-bg">
        <video autoPlay muted loop playsInline poster="https://picsum.photos/seed/metrikahero/1920/1080?grayscale">
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
      </div>
      <canvas className="hero-particles" ref={canvasRef}></canvas>
      <div className="hero-inner">
        

        <h1>
          <span className="h-line"><span className="h-inner">We build <span className="accent">you.</span></span></span>
          <span className="h-line"><span className="h-inner">You trust <span className="accent">us.</span></span></span>
        </h1>
        <p className="hero-sub">Metrika is a digital studio crafting cinematic websites, search-dominating SEO, and brands people remember. Built in Udupi. Built for the world.</p>
        <div className="hero-actions">
          <Magnetic className="hero-anim">
            <Link to="/contact" className="btn btn-solid"><i className="btn-fill"></i><span>Start your project</span><ArrowRight size={16} /></Link>
          </Magnetic>
          <Magnetic className="hero-anim">
            <a href="#reel" className="btn btn-ghost" data-cursor="view"><Play size={14} /><span>Watch showreel</span></a>
          </Magnetic>
        </div>
        <div className="hero-stats">
          <div className="stat"><b><span data-count="10">0</span><em>+</em></b><small>Projects delivered</small></div>
          <div className="stat"><b><span data-count="5">0</span><em>+</em></b><small>Happy clients</small></div>
          <div className="stat"><b><span data-count="95">0</span><em>%</em></b><small>Client satisfaction</small></div>
          <div className="stat"><b>24<em>/7</em></b><small>Support</small></div>
        </div>
      </div>
      
    </section>
  )
}
