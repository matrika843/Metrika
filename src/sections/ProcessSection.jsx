import Reveal from '../components/Reveal'

const steps = [
  { act: 'Act I', n: '01', title: 'Discover', copy: 'Goals, audience, competitors. We write the script before a single pixel moves.' },
  { act: 'Act II', n: '02', title: 'Design', copy: 'Art direction, identity, and UI built around your story — not a template.' },
  { act: 'Act III', n: '03', title: 'Develop', copy: 'Clean code, cinematic motion, obsessive performance. The production phase.' },
  { act: 'Finale', n: '04', title: 'Deliver', copy: 'Launch, SEO, analytics, and 24/7 support. Your premiere — and beyond.' },
]

export default function ProcessSection() {
  return (
    <section id="process">
      <div className="shell">
        <div className="eyebrow"></div>
        <div className="process-grid">
          {steps.map((s, i) => (
            <Reveal className="process-cell" key={s.n} delay={i * 0.1}>
              <span className="p-num">{s.act}</span><span className="ghost">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
