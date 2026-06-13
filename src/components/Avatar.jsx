export const getInitials = (name = '', email = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  if (parts.length === 1) return parts[0][0].toUpperCase()
  if (email) return email[0].toUpperCase()
  return 'U'
}

export default function Avatar({ name = '', email = '', size = 38, className = '' }) {
  return (
    <span className={`avatar-initials ${className}`} style={{ width: size, height: size, fontSize: size * 0.37 }}>
      {getInitials(name, email)}
    </span>
  )
}
