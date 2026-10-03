import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    try {

      const savedUser =
        localStorage.getItem("eventra_user")

      const savedToken =
        localStorage.getItem("eventra_token")


      if (savedUser && savedToken) {

        setUser(JSON.parse(savedUser))

      } else {

        localStorage.removeItem("eventra_user")
        localStorage.removeItem("eventra_token")

        setUser(null)
      }

    } catch (error) {

      console.error("Auth restore error:", error)

      localStorage.removeItem("eventra_user")
      localStorage.removeItem("eventra_token")

      setUser(null)

    } finally {

      setLoading(false)

    }

  }, [])


  const login = (userData, token) => {

    if (!token) {
      console.error("JWT token missing")
      return false
    }

    localStorage.setItem(
      "eventra_token",
      token
    )

    localStorage.setItem(
      "eventra_user",
      JSON.stringify(userData)
    )

    setUser(userData)

    return true
  }


  const logout = () => {

    localStorage.removeItem("eventra_token")
    localStorage.removeItem("eventra_user")

    setUser(null)
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () =>
  useContext(AuthContext)