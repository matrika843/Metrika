import { useEffect, useRef } from 'react'

export function useLazyVideo() {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) video.play().catch(() => {})
      else video.pause()
    }, { threshold: [0, 0.25] })
    io.observe(video)
    return () => io.disconnect()
  }, [])
  return ref
}
