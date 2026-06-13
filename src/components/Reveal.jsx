import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Reveal({ children, variant = 'up', delay = 0, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const isMobile = window.matchMedia('(max-width: 1024px)').matches
    const from = variant === 'left' ? { x: -60, opacity: 0 }
      : variant === 'scale' ? { scale: 0.9, opacity: 0 }
      : { y: 50, opacity: 0 }
    const tween = gsap.fromTo(el, from, {
      x: 0, y: 0, scale: 1, opacity: 1,
      duration: isMobile ? 0.8 : 1,
      ease: 'power3.out',
      delay: delay * (isMobile ? 0.7 : 1),
      willChange: 'transform, opacity',
      onComplete: () => gsap.set(el, { clearProps: 'willChange' }),
      scrollTrigger: { trigger: el, start: isMobile ? 'top 92%' : 'top 86%' }
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])
  return <Tag ref={ref} className={`will-reveal ${className}`} {...rest}>{children}</Tag>
}
