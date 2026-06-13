import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading, firebaseEnabled } = useAuth()
  const location = useLocation()

  if (!firebaseEnabled) return children

  if (loading) return null

  if (!user) return <Navigate to="/signin" state={{ from: location }} replace />

  return children
}
