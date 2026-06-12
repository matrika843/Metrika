import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import GrainOverlay from './components/GrainOverlay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import WorkPage from './pages/WorkPage'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import AuthPage from './pages/AuthPage'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [revealed] = useState(true)
  const location = useLocation()
  const isAuth = location.pathname === '/signin' || location.pathname === '/signup'

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.08 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    window.__lenis = lenis
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-auth', isAuth)
  }, [isAuth])

  useEffect(() => {
    let t
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(() => ScrollTrigger.refresh(), 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  return (
    <>
      {!isAuth && <Cursor />}
      <GrainOverlay />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home revealed={revealed} />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<AuthPage mode="signin" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="*" element={<Home revealed={revealed} />} />
      </Routes>
      {!isAuth && <Footer />}
    </>
  )
}
