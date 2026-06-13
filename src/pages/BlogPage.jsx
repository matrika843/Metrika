import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const featured = {
  tag: 'Featured · Web', img: 'https://picsum.photos/seed/blogfeat/1400/900',
  title: 'Why cinematic websites convert better in 2026',
  excerpt: 'Motion, story and restraint — how film language turns landing pages into experiences people remember and trust.',
  meta: 'Jun 2026 · 6 min read',
}

const team = [
  {
    name: 'Bharath Shetty',
    role: 'Digital Growth Architect & Founder, Metrika',
    img: '/bharath%20shetty.png',
    bio: '"Digital Growth Strategist" is one of the most modern and professional designations because it covers SEO, branding, website management, and marketing growth together. Founder of Metrika, Bharath Shetty combines expertise in media strategy, digital marketing, journalism, blogging, content creation, and freelancing to build powerful digital brands, drive online growth, and create meaningful connections through innovative storytelling and technology.',
  },
  {
    name: 'Dhanush Bhandary',
    role: 'Co-Founder & Web Solutions Architect, Metrika',
    img: '/Dhanush%20bhandary.png',
    bio: 'Co-Founder of Metrika, Dhanush is a Full Stack Web Developer passionate about building modern, user-friendly websites and web applications. With expertise in front-end and back-end development, he helps businesses grow online by creating reliable, responsive, and effective digital solutions that deliver a seamless user experience.',
  },
]

const posts = [
  { tag: 'SEO', img: 'https://picsum.photos/seed/blog1/800/550', title: 'Local SEO playbook for Udupi & Mangalore businesses', meta: 'May 2026 · 5 min' },
  { tag: 'Development', img: 'https://picsum.photos/seed/blog2/800/550', title: 'Next.js 14 vs Vite: choosing the right stack for your launch', meta: 'May 2026 · 7 min' },
  { tag: 'Branding', img: 'https://picsum.photos/seed/blog3/800/550', title: 'A logo is not a brand: building identity systems that scale', meta: 'Apr 2026 · 4 min' },
  { tag: 'Motion', img: 'https://picsum.photos/seed/blog4/800/550', title: 'GSAP ScrollTrigger patterns we use on every project', meta: 'Apr 2026 · 8 min' },
  { tag: 'AI', img: 'https://picsum.photos/seed/blog5/800/550', title: 'RAG chatbots for small business: hype vs reality', meta: 'Mar 2026 · 6 min' },
  { tag: 'Performance', img: 'https://picsum.photos/seed/blog6/800/550', title: 'Shipping 90+ Lighthouse scores with heavy animation', meta: 'Mar 2026 · 5 min' },
]

export default function BlogPage() {
  return (
    <main>
      <PageHero
        num="03" eyebrow="The journal"
        lines={[<>Notes from</>, <>the <span className="accent">studio.</span></>]}
        lede="Essays, breakdowns and behind-the-scenes from our work in web, SEO, branding and AI."
      />
      <div className="shell-tight" style={{ paddingTop: 0 }}>
        <Reveal as="div">
          <Link to="/contact" className="blog-featured blog-card">
            <div className="blog-featured-media blog-card-media" style={{ marginBottom: 0 }}>
              <img src={featured.img} alt={featured.title} loading="lazy" decoding="async" />
            </div>
            <div>
              <span className="blog-tag">{featured.tag}</span>
              <h3 style={{ fontSize: 'clamp(26px,3vw,42px)' }}>{featured.title}</h3>
              <p style={{ color: '#A9A496', fontSize: 15, lineHeight: 1.8, margin: '16px 0' }}>{featured.excerpt}</p>
              <div className="blog-meta">{featured.meta}</div>
            </div>
          </Link>
        </Reveal>
        <div className="blog-grid">
          {posts.map((p, i) => (
            <Reveal as="div" key={p.title} delay={(i % 3) * 0.08}>
              <Link to="/contact" className="blog-card">
                <div className="blog-card-media"><img src={p.img} alt={p.title} loading="lazy" decoding="async" /></div>
                <span className="blog-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <div className="blog-meta">{p.meta}</div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="eyebrow" style={{ marginTop: 80 }}><b>—</b> Meet the founders</div>
        <div className="team-grid">
          {team.map((m, i) => (
            <Reveal as="div" key={m.name} delay={i * 0.1} className="team-card">
              <div className="team-card-media"><img src={m.img} alt={m.name} loading="lazy" decoding="async" /></div>
              <h3>{m.name}</h3>
              <span className="blog-tag">{m.role}</span>
              <p style={{ color: '#A9A496', fontSize: 15, lineHeight: 1.8, margin: '16px 0' }}>{m.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  )
}
