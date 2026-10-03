import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../services/api.js'

export default function Login() {
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.email || !form.password) {
      setError("Please enter both email address and password.")
      return
    }

    setLoading(true)

    try {
      // Backend se real login
      const token = await api.login({
        email: form.email,
        password: form.password,
      })

      // Backend JWT token return karega
      const userObj = {
        name: form.email.split("@")[0],
        email: form.email,
      }

      login(userObj, token)

      navigate("/")
    } catch (err) {
      console.error("Login error:", err)

      setError(
        err?.message || "Invalid email or password. Please register first."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white text-black min-h-screen py-16 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-6">

        {/* Card Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-black tracking-tight inline-block mb-3 text-black"
          >
            Event<span className="text-[#FFB800]">Hub</span>
          </Link>

          <h1 className="text-2xl font-extrabold text-black">
            Welcome Back
          </h1>

          <p className="text-zinc-500 text-xs mt-1">
            Sign in to manage your tickets and event bookings.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="input-field !pl-11"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="input-field !pl-11 !pr-11"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-1">
              <a
                href="#"
                className="text-xs text-[#B58100] font-bold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#FFC52E] text-black font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-md mt-2 disabled:opacity-60"
            >
              <LogIn size={16} />

              {loading ? "Signing in..." : "Login to EventHub"}
            </button>

          </form>

          <div className="flex items-center gap-3 text-xs text-zinc-400 my-6">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="font-semibold">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* Social buttons - visual only for now */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="border border-zinc-200 text-zinc-400 font-bold text-xs py-2.5 rounded-xl cursor-not-allowed"
            >
              Google
            </button>

            <button
              type="button"
              disabled
              className="border border-zinc-200 text-zinc-400 font-bold text-xs py-2.5 rounded-xl cursor-not-allowed"
            >
              GitHub
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-6">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-[#B58100] font-bold hover:underline"
          >
            Register for Free
          </Link>
        </p>

      </div>
    </div>
  )
}