import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

export default function Footer() {
  const markRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    const tween = gsap.to(markRef.current, {
      y: 0, ease: 'none',
      scrollTrigger: { trigger: rootRef.current, start: 'top 90%', end: 'bottom bottom', scrub: true }
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])

  return (
    <footer className="footer" ref={rootRef}>
      <div className="foot-grid">
        <div className="foot-col">
          <img className="foot-logo" src="/logo.png" alt="METRIKA" />
          <span className="foot-status"><span className="pulse-dot"></span>New studio — now taking projects</span>
          <p style={{ marginTop: 18 }}>Udupi, Karnataka, India</p>
        </div>
        <div className="foot-col">
          <small>Sitemap</small>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="foot-col">
          <small>Account</small>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
        <div className="foot-col">
          <small>Contact</small>
          <a href="mailto:matrika843@gmail.com">matrika843@gmail.com</a>
          <a href="tel:+919108252753">+91 91082 52753</a>
          <a href="https://github.com/DhanushbhandaryD123" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <div className="foot-mark" ref={markRef} style={{ transform: 'translateY(20%)' }}>METRIKA</div>
      <div className="foot-legal"><span>© 2026 Metrika</span><span>We build you · You trust us</span></div>
    </footer>
  )
}
