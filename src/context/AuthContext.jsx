import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, firebaseEnabled } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(firebaseEnabled)

  useEffect(() => {
    if (!firebaseEnabled) return
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const requireFirebase = () => {
    if (!firebaseEnabled) {
      throw new Error('Authentication is not configured. Add your Firebase keys to .env (see .env.example).')
    }
  }

  const signInWithGoogle = async () => {
    requireFirebase()
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  }

  const signUpWithEmail = async (name, email, password) => {
    requireFirebase()
    const result = await createUserWithEmailAndPassword(auth, email, password)
    if (name) await updateProfile(result.user, { displayName: name })
    return result.user
  }

  const signInWithEmail = async (email, password) => {
    requireFirebase()
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  }

  const signOut = async () => {
    requireFirebase()
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, firebaseEnabled, signInWithGoogle, signUpWithEmail, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
