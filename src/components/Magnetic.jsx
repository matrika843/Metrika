import { useRef } from 'react'
import gsap from 'gsap'

export default function Magnetic({ children, strength = 0.3, className, style, ...rest }) {
  const ref = useRef(null)
  const disabled = () => window.matchMedia('(hover: none), (max-width: 1024px)').matches
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const onMove = (e) => {
    const el = ref.current
    if (!el || disabled()) return
    const r = el.getBoundingClientRect()
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.4 })
  }
  const onLeave = () => {
    if (!ref.current || disabled()) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,.4)' })
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className} style={{ display: 'inline-block', ...style }} {...rest}>
      {children}
    </div>
  )
}
