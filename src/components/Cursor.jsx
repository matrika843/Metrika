import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (max-width: 1024px), (prefers-reduced-motion: reduce)').matches) return
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my
    let raf
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) { dotRef.current.style.left = mx + 'px'; dotRef.current.style.top = my + 'px' }
    }
    const loop = () => {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px' }
      raf = requestAnimationFrame(loop)
    }
    const over = (e) => {
      if (e.target.closest('[data-cursor="view"], .work-card, .blog-card')) ringRef.current?.classList.add('is-active')
    }
    const out = (e) => {
      if (e.target.closest('[data-cursor="view"], .work-card, .blog-card')) ringRef.current?.classList.remove('is-active')
    }
    addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    raf = requestAnimationFrame(loop)
    return () => {
      removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}><span className="cursor-label">VIEW</span></div>
    </>
  )
}
