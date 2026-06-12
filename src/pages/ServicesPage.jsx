import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Check, ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Marquee from '../components/Marquee'
import Magnetic from '../components/Magnetic'

const services = [
  {
    kicker: 'Service /01', tag: 'Development', title: 'Web Development',
    img: '/web-development.png',
    copy: 'Production-grade websites and web apps built on Next.js and React. Fast, animated, accessible — engineered to convert visitors into customers from the first frame.',
    points: ['Next.js / React / Vite builds', 'Cinematic motion with GSAP', 'E-commerce & dashboards', '90+ Lighthouse performance scores'],
  },
  {
   tag: 'Growth', title: 'SEO Optimization', flip: true,
    img: '/seo.jpg',
    copy: 'Beautiful sites mean nothing unseen. We engineer technical SEO, content strategy and local search presence so your brand ranks — and keeps ranking.',
    points: ['Technical audits & Core Web Vitals', 'Keyword & content strategy', 'Local SEO for Udupi / Mangalore', 'Monthly ranking reports'],
  },
  {
    kicker: 'Service /03', tag: 'Identity', title: 'Branding Solutions',
    img: '/branding-solutions.png',
    copy: 'Logos, voice, and visual systems with a point of view. We craft identities that make startups look established and established brands look unforgettable.',
    points: ['Logo & identity systems', 'Brand guidelines & assets', 'Social media kits', 'Brochures, decks & print'],
  },
]

export default function ServicesPage() {
  useEffect(() => {
    const tweens = gsap.utils.toArray('.svc-media img').map(img =>
      gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, {
        yPercent: 5, ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true }
      })
    )
    return () => tweens.forEach(t => { t.scrollTrigger?.kill(); t.kill() })
  }, [])

  return (
    <main>
      <PageHero
        
        lines={[<>Services built</>, <>like <span className="accent">productions.</span></>]}
        lede="Three disciplines, one director's vision. Every engagement is scripted, designed, and shot to make your brand the main character."
      />
      <div className="shell-tight" style={{ paddingTop: 0 }}>
        {services.map((s, i) => (
          <Reveal as="div" className={`svc-block ${s.flip ? 'flip' : ''}`} key={s.title} delay={0.05}>
            <div className="svc-media">
              <span className="work-tag">{s.tag}</span>
              <img src={s.img} alt={s.title} />
            </div>
            <div>
              <div className="svc-kicker">{s.kicker}</div>
              <h2 className="svc-title">{s.title}</h2>
              <p className="svc-copy">{s.copy}</p>
              <ul className="svc-list">
                {s.points.map(p => <li key={p}><i><Check size={16} /></i>{p}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Marquee />
      <section className="cta">
        <div className="cta-eyebrow">Ready when you are</div>
        <h2><span className="h-line"><span className="h-inner" style={{ transform: 'none' }}>Pick a service, <em>start a story.</em></span></span></h2>
        <Magnetic>
          <Link to="/contact" className="btn btn-solid"><i className="btn-fill"></i><span>Get a free quote</span><ArrowUpRight size={16} /></Link>
        </Magnetic>
      </section>
    </main>
  )
}
