import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Magnetic from '../components/Magnetic'
import Reveal from '../components/Reveal'
import { useAuth } from '../context/AuthContext'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.3c-1.64 4.66-6.08 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.85 1.15 7.96 3.04l5.66-5.66C34.46 6.05 29.5 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92z"/>
      <path fill="#FF3D00" d="M6.31 14.69l6.57 4.82C14.66 15.65 18.99 13 24 13c3.06 0 5.85 1.15 7.96 3.04l5.66-5.66C34.46 6.05 29.5 4 24 4 16.32 4 9.66 8.34 6.31 14.69z"/>
      <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.07 14.01-5.43l-6.46-5.47C29.59 34.84 26.94 36 24 36c-5.2 0-9.62-3.32-11.28-7.95l-6.5 5.01C9.55 39.55 16.22 44 24 44z"/>
      <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.3c-.79 2.24-2.24 4.16-4.16 5.5l.01-.01 6.46 5.47C37.34 39.71 44 35 44 24c0-1.34-.14-2.65-.39-3.92z"/>
    </svg>
  )
}

function authErrorMessage(err) {
  switch (err?.code) {
    case 'auth/email-already-in-use': return 'An account with this email already exists.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password': return 'Incorrect email or password.'
    case 'auth/user-not-found': return 'No account found with this email.'
    case 'auth/weak-password': return 'Password should be at least 6 characters.'
    case 'auth/invalid-email': return 'Enter a valid email address.'
    case 'auth/popup-closed-by-user': return null
    default: return err?.message || 'Something went wrong. Please try again.'
  }
}

export default function AuthPage({ mode }) {
  const signup = mode === 'signup'
  const { user, firebaseEnabled, signInWithGoogle, signUpWithEmail, signInWithEmail } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [authMethod, setAuthMethod] = useState('password')
  const [otpSent, setOtpSent] = useState(false)
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const from = location.state?.from?.pathname || '/'

  if (user) return <Navigate to={from} replace />

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (signup) await signUpWithEmail(name, email, password)
      else await signInWithEmail(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
      navigate(from, { replace: true })
    } catch (err) {
      const msg = authErrorMessage(err)
      if (msg) setError(msg)
    } finally {
      setGoogleLoading(false)
    }
  }

  const sendOtp = (e) => { e.preventDefault(); setOtpSent(true) }
  const otpSubmit = (e) => { e.preventDefault(); setSent(true) }
  const switchMethod = (method) => { setAuthMethod(method); setOtpSent(false); setSent(false); setError(null) }

  return (
    <main className="auth-wrap">
      <div className="auth-visual">
        <img className="bgimg" src="https://picsum.photos/seed/metrikaauth/1000/1400?grayscale" alt="" loading="lazy" decoding="async" />
        <Link to="/" className="auth-logo">
          <img src="/metrika-logo-premium.png" alt="METRIKA" />
        </Link>
        <div>
          <p className="auth-quote">Every great project starts with a <em>sign-in.</em></p>
          <p className="auth-tagline">
            Client portal · project tracking · files &amp; invoices
          </p>
        </div>
      </div>
      <div className="auth-form-side">
        <Reveal className="auth-card">
          <h1>{signup ? 'Create account' : 'Welcome back'}</h1>
          <p className="sub">{signup ? 'Join the Metrika client portal to follow your project, frame by frame.' : 'Sign in to your Metrika client portal.'}</p>

          {!firebaseEnabled && (
            <p className="auth-note auth-note-warn">
              Authentication isn't configured yet. Add your Firebase keys to <code>.env</code> (see <code>.env.example</code>) to enable sign-in.
            </p>
          )}

          {error && <p className="auth-error">{error}</p>}

          <button type="button" className="auth-social" onClick={handleGoogle} disabled={googleLoading || !firebaseEnabled}>
            <GoogleIcon /><span>{googleLoading ? 'Connecting…' : 'Continue with Google'}</span>
          </button>

          <div className="auth-divider"><span>or</span></div>

          <div className="auth-tabs">
            <button type="button" className={authMethod === 'password' ? 'active' : ''} onClick={() => switchMethod('password')}>Password</button>
            <button type="button" className={authMethod === 'otp' ? 'active' : ''} onClick={() => switchMethod('otp')}>OTP</button>
          </div>

          {authMethod === 'password' ? (
            <form onSubmit={submit}>
              {signup && (
                <div className="field">
                  <label htmlFor="auth-name">Full name</label>
                  <input id="auth-name" required placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              )}
              <div className="field">
                <label htmlFor="auth-email">Email</label>
                <input id="auth-email" type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="auth-pass">Password</label>
                <input id="auth-pass" type="password" required minLength="6" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Magnetic className="auth-submit" style={{ display: 'block', width: '100%' }}>
                <button type="submit" className="btn btn-solid" disabled={loading || !firebaseEnabled}>
                  <i className="btn-fill"></i><span>{loading ? 'Please wait…' : (signup ? 'Create account' : 'Sign in')}</span><ArrowRight size={16} />
                </button>
              </Magnetic>
            </form>
          ) : (
            <form onSubmit={otpSent ? otpSubmit : sendOtp}>
              {signup && !otpSent && (
                <div className="field">
                  <label htmlFor="auth-name-otp">Full name</label>
                  <input id="auth-name-otp" required placeholder="Your name" />
                </div>
              )}
              <div className="field">
                <label htmlFor="auth-mobile">Mobile number or email</label>
                <input id="auth-mobile" required placeholder="+91 98765 43210 or you@company.com" disabled={otpSent} />
              </div>
              {otpSent && (
                <div className="field">
                  <label htmlFor="auth-otp">Enter OTP</label>
                  <input id="auth-otp" required inputMode="numeric" pattern="[0-9]*" maxLength="6" placeholder="• • • • • •" autoFocus />
                  <p className="auth-resend">Didn't get a code? <button type="button" onClick={sendOtp}>Resend OTP</button></p>
                </div>
              )}
              <Magnetic className="auth-submit" style={{ display: 'block', width: '100%' }}>
                <button type="submit" className="btn btn-solid"><i className="btn-fill"></i><span>{otpSent ? (signup ? 'Verify & create account' : 'Verify & sign in') : 'Send OTP'}</span><ArrowRight size={16} /></button>
              </Magnetic>
              {sent && <p className="auth-note">Demo mode — OTP sign-in isn't connected to a backend yet.</p>}
            </form>
          )}

          <p className="auth-switch">
            {signup ? <>Already have an account? <Link to="/signin">Sign in</Link></> : <>New to Metrika? <Link to="/signup">Create an account</Link></>}
          </p>
        </Reveal>
      </div>
    </main>
  )
}
