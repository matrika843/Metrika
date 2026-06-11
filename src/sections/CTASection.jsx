import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import Magnetic from '../components/Magnetic'

export default function CTASection() {
  const rootRef = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.cta .h-inner', {
        y: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%' }
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])
  return (
    <section className="cta" id="contact" ref={rootRef}>
      <div className="cta-eyebrow">Have an idea?</div>
      <h2>
        <span className="h-line"><span className="h-inner">Let's build something</span></span>
        <span className="h-line"><span className="h-inner"><em>unforgettable.</em></span></span>
      </h2>
      <Magnetic>
        <Link to="/contact" className="btn btn-solid"><i className="btn-fill"></i><span>Start your project</span><ArrowUpRight size={16} /></Link>
      </Magnetic>
      <p className="cta-contact">
        
      </p>
    </section>
  )
}
