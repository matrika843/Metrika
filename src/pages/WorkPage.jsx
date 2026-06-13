import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import CTASection from '../sections/CTASection'
import { projects } from '../sections/WorkStrip'

export default function WorkPage() {
  return (
    <main>
      <PageHero
        num="03" eyebrow="Our portfolio"
        lines={[<>Work that</>, <>speaks for <span className="accent">itself.</span></>]}
        lede="A look at the products, platforms and brands we've shipped — proof that Metrika turns ambitious ideas into polished, performant experiences."
      />
      <div className="shell-tight" style={{ paddingTop: 0 }}>
        <div className="blog-grid">
          {projects.map((p, i) => (
            <Reveal as="div" key={p.frame} delay={(i % 3) * 0.08}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="blog-card" data-cursor="view">
                  <div className="blog-card-media">
                    <img src={p.img} alt={p.name} style={{ objectFit: 'contain', background: 'var(--surface)' }} />
                  </div>
                  <span className="blog-tag">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <div className="blog-meta">{p.meta} · {p.year}</div>
                </a>
              ) : (
                <div className="blog-card">
                  <div className="blog-card-media">
                    <img src={p.img} alt={p.name} style={{ objectFit: 'contain', background: 'var(--surface)' }} />
                  </div>
                  <span className="blog-tag">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <div className="blog-meta">{p.meta} · {p.year}</div>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <div className="cta-eyebrow" style={{ marginTop: 90, textAlign: 'center' }}>Like what you see?</div>
        <h2 style={{ textAlign: 'center', margin: '14px 0 28px' }}>
          Let's add <em>your project</em> to this list.
        </h2>
        <p style={{ textAlign: 'center', color: '#A9A496', maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.8 }}>
          Every project here started as a conversation. Tell us about your business and we'll show you exactly
          how Metrika can build, launch and grow your next digital product.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 90 }}>
          <Magnetic>
            <Link to="/contact" className="btn btn-solid"><i className="btn-fill"></i><span>Start your project</span><ArrowUpRight size={16} /></Link>
          </Magnetic>
        </div>
      </div>
      <CTASection />
    </main>
  )
}
