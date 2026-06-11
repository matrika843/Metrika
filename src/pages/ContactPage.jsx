import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', service: 'Web Development', budget: '₹25k – ₹50k', message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget}\n\n${form.message}`
    )
    window.location.href = `mailto:matrika843@gmail.com?subject=${encodeURIComponent('New project enquiry — ' + form.name)}&body=${body}`
  }

  return (
    <main>
      <PageHero
        num="05" eyebrow="Contact"
        lines={[<>Let's <span className="accent">talk.</span></>]}
        lede="Tell us about your idea. We reply within 24 hours — usually much faster."
      />
      <div className="shell-tight" style={{ paddingTop: 0 }}>
        <div className="contact-grid">
          <Reveal as="form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" required value={form.name} onChange={set('name')} placeholder="Full name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required value={form.email} onChange={set('email')} placeholder="you@company.com" />
            </div>
            <div className="field">
              <label htmlFor="service">What do you need?</label>
              <select id="service" value={form.service} onChange={set('service')}>
                <option>Web Development</option>
                <option>SEO Optimization</option>
                <option>Branding Solutions</option>
                <option>Everything — full launch</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="budget">Budget range</label>
              <select id="budget" value={form.budget} onChange={set('budget')}>
                <option>Under ₹25k</option>
                <option>₹25k – ₹50k</option>
                <option>₹50k – ₹1L</option>
                <option>₹1L+</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Tell us about the project</label>
              <textarea id="message" rows="4" required value={form.message} onChange={set('message')} placeholder="What are we building together?" />
            </div>
            <Magnetic>
              <button type="submit" className="btn btn-solid"><i className="btn-fill"></i><span>Send message</span><ArrowUpRight size={16} /></button>
            </Magnetic>
          </Reveal>
          <Reveal as="aside" className="info-card" delay={0.15}>
            <div className="info-row"><Mail size={18} /><div><small>Email</small><a href="mailto:matrika843@gmail.com">matrika843@gmail.com</a></div></div>
            <div className="info-row"><Phone size={18} /><div><small>Phone / WhatsApp</small><a href="tel:+919108252753">+91 91082 52753</a></div></div>
            <div className="info-row"><MapPin size={18} /><div><small>Studio</small><p>Udupi, Karnataka, India</p></div></div>
            <div className="info-row"><Clock size={18} /><div><small>Response time</small><p>Within 24 hours · 24/7 support for clients</p></div></div>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
