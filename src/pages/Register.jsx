import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, UserPlus } from 'lucide-react'
import { api } from '../services/api.js'

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.name || !form.email || !form.password) {
      setError("Please fill out all required fields.")
      return
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.")
      return
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)

    try {
      // Only registration
      await api.register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      })

      // Registration successful
      // Ab login page par jao
      navigate("/login", {
        replace: true,
        state: {
          message: "Account created successfully. Please login."
        }
      })

    } catch (err) {
      console.error("Registration error:", err)

      setError(
        err?.message || "Registration failed. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white text-black min-h-screen py-16 flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left Perks Info */}
        <div>
          <Link
            to="/"
            className="text-3xl font-black tracking-tight inline-block mb-4 text-black"
          >
            Event<span className="text-[#FFB800]">Hub</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black mb-4">
            Join EventHub Today
          </h1>

          <p className="text-zinc-600 text-sm mb-8 leading-relaxed">
            Create your account to discover trending events, manage bookings
            seamlessly, and get instant digital ticket access.
          </p>

          <div className="space-y-4 bg-zinc-50 border border-zinc-200 p-6 rounded-3xl">
            {[
              "Instant digital entry pass & QR ticket issuance",
              "Manage, download or view all your event bookings in one place",
              "Exclusive early-bird ticket alerts & personalized recommendations",
              "Fast, secure checkouts with instant confirmation"
            ].map(item => (
              <div
                key={item}
                className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-zinc-700"
              >
                <CheckCircle2
                  size={18}
                  className="text-[#FFB800] shrink-0 mt-0.5"
                />

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Card */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl">

          <h2 className="text-2xl font-extrabold text-black mb-1">
            Create Account
          </h2>

          <p className="text-xs text-zinc-500 mb-6">
            Enter your details below to get started.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">
                Full Name *
              </label>

              <input
                placeholder="Rahul Sharma"
                value={form.name}
                onChange={e =>
                  setForm({ ...form, name: e.target.value })
                }
                className="input-field"
                required
              />
            </div>

            {/* Email + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Email Address *
                </label>

                <input
                  type="email"
                  placeholder="rahul@example.com"
                  value={form.email}
                  onChange={e =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Phone Number
                </label>

                <input
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="input-field"
                />
              </div>

            </div>

            {/* Password */}
            <div className="grid sm:grid-cols-2 gap-4">

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Password *
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">
                  Confirm Password *
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={e =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#FFC52E] text-black font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-md mt-2 disabled:opacity-60"
            >
              <UserPlus size={16} />

              {loading
                ? "Creating Account..."
                : "Create Free Account"}
            </button>

          </form>

          <p className="text-center text-xs text-zinc-500 mt-6">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-[#B58100] font-bold hover:underline"
            >
              Sign In Here
            </Link>
          </p>

        </div>

      </div>
    </div>
  )
}