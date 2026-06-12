import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal'

const services = [
  { name: 'Web Development', desc: 'Next.js · React · performance-first, animation-rich builds', img: '/web-development.png' },
  {  name: 'SEO Optimization', desc: 'Technical SEO · content strategy · rankings that compound', img: '/seo.jpg' },
  {  name: 'Branding Solutions', desc: 'Identity · voice · visual systems that tell your story', img: '/branding-solutions.png' },
]

export default function ServicesIndex() {
  const previewRef = useRef(null)
  const imgRef = useRef(null)

  const enter = (img) => {
    if (window.matchMedia('(hover: none), (max-width: 1024px)').matches) return
    imgRef.current.src = img
    gsap.to(previewRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 0.4, ease: 'power3.out' })
  }
  const leave = () => gsap.to(previewRef.current, { opacity: 0, scale: 0.85, rotate: -3, duration: 0.3 })
  const move = (e) => gsap.to(previewRef.current, { left: e.clientX + 30, top: e.clientY - 110, duration: 0.5, ease: 'power3.out' })

  return (
    <section id="services">
      <div className="shell">
        <div className="eyebrow"></div>
        {services.map((s, i) => (
          <Reveal as="div" key={s.num} delay={i * 0.08}>
            <Link
              to="/services"
              className={`service-row ${i === 0 ? 'first' : ''}`}
              onMouseEnter={() => enter(s.img)}
              onMouseLeave={leave}
              onMouseMove={move}
            >
              <div className="service-left">
                <span className="service-num">{s.num}</span>
                <div>
                  <div className="service-name">{s.name}</div>
                  <div className="service-desc">{s.desc}</div>
                </div>
              </div>
              <div className="service-arrow"><ArrowUpRight size={18} /></div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="service-preview" ref={previewRef}><img ref={imgRef} src="" alt="" /></div>
    </section>
  )
}
