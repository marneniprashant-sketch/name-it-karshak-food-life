import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    // Demo credentials — replace with real API call
    if (email && password.length >= 6) {
      setUser({ name: email.split('@')[0], email })
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials.' }
  }

  const register = (name, email, password) => {
    if (name && email && password.length >= 6) {
      setUser({ name, email })
      return { success: true }
    }
    return { success: false, error: 'Please fill all fields. Password must be 6+ characters.' }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
