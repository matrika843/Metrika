import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAuth } from '../context/AuthContext'
import Avatar from './Avatar'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const accountRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  useEffect(() => {
    if (!accountOpen) return
    const onClick = (e) => {
      if (!accountRef.current?.contains(e.target)) setAccountOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setAccountOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [accountOpen])

  const handleSignOut = async () => {
    setAccountOpen(false)
    await signOut()
    navigate('/')
  }

  useEffect(() => {
    let lastY = 0
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const y = self.scroll()
        navRef.current?.classList.toggle('is-hidden', y > lastY && y > 200 && !open)
        lastY = y
      }
    })
    return () => st.kill()
  }, [open])

  useEffect(() => {
    if (!menuRef.current) return
    if (open) {
      window.__lenis?.stop()
      gsap.timeline()
        .to(menuRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' })
        .to('.menu-overlay a', { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: 'power3.out' }, '-=0.25')
        .to('.menu-foot', { opacity: 1, duration: 0.4 }, '-=0.3')
    } else {
      window.__lenis?.start()
      gsap.to(menuRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'power4.inOut' })
      gsap.set('.menu-overlay a', { opacity: 0, y: 40, delay: 0.6 })
      gsap.set('.menu-foot', { opacity: 0, delay: 0.6 })
    }
  }, [open])

  const go = (to) => { setOpen(false); navigate(to) }

  return (
    <>
      <nav className="nav" ref={navRef}>
        <Link className="brand" to="/" aria-label="Metrika home" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="METRIKA" />
        </Link>
        <div className="nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'active' : ''}>{l.label}</NavLink>
          ))}
        </div>
        <div className="nav-right">
          {user ? (
            <div className="nav-account" ref={accountRef}>
              <button
                type="button"
                className="nav-avatar"
                aria-label={`Account menu for ${user.displayName || user.email || 'user'}`}
                onClick={() => setAccountOpen(v => !v)}
              >
                <Avatar name={user.displayName} email={user.email} size={38} />
              </button>
              {accountOpen && (
                <div className="nav-account-menu">
                  <Avatar name={user.displayName} email={user.email} size={48} className="nav-account-avatar" />
                  <div className="nav-account-name">{user.displayName || 'Account'}</div>
                  <div className="nav-account-email">{user.email}</div>
                  <button type="button" className="nav-account-logout" onClick={handleSignOut}>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="nav-signin">Sign in</Link>
          )}
          <Link to="/contact" className="nav-cta">Start project</Link>
          <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(!open)}>
            <i style={open ? { transform: 'rotate(45deg) translateY(5px)' } : {}}></i>
            <i style={open ? { transform: 'rotate(-45deg) translateY(-5px)' } : {}}></i>
          </button>
        </div>
      </nav>
      <div className="menu-overlay" ref={menuRef} style={{ clipPath: 'inset(0 0 100% 0)', pointerEvents: open ? 'auto' : 'none' }}>
        {[...links, { to: '/signin', label: 'Sign in' }, { to: '/signup', label: 'Sign up' }].map((l, i) => (
          <a key={l.to + l.label} href={l.to} onClick={(e) => { e.preventDefault(); go(l.to) }}>
            <em>0{i + 1}</em>{l.label}
          </a>
        ))}
        <div className="menu-foot">matrika843@gmail.com · Udupi, Karnataka</div>
      </div>
    </>
  )
}
