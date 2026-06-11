import Hero from '../sections/Hero'
import Marquee from '../components/Marquee'
import AboutSection from '../sections/AboutSection'
import ServicesIndex from '../sections/ServicesIndex'
import Showreel from '../sections/Showreel'
import WorkStrip from '../sections/WorkStrip'
import ProcessSection from '../sections/ProcessSection'
import CTASection from '../sections/CTASection'

export default function Home({ revealed }) {
  return (
    <main>
      <Hero revealed={revealed} />
      <Marquee />
      <AboutSection />
      <ServicesIndex />
      <Showreel />
      <WorkStrip />
      <ProcessSection />
      <CTASection />
    </main>
  )
}
