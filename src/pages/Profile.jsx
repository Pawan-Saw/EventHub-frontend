import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Ticket, LogOut, CheckCircle2, Save, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../services/api.js'

export default function Profile() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: user?.name || "Rahul Sharma",
    email: user?.email || "rahul.sharma@example.com",
    phone: user?.phone || "+91 98765 43210",
    city: "Mumbai",
    category: "Music & Festivals"
  })

  const [savedSuccess, setSavedSuccess] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let isMounted = true
    api.getProfile()
      .then((data) => {
        if (isMounted && data) {
          setForm((prev) => ({
            ...prev,
            name: data.name || prev.name,
            email: data.email || prev.email,
            phone: data.phone || prev.phone,
          }))
        }
      })
      .catch(() => {
        // Fallback silently for local mock state
      })
    return () => { isMounted = false }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSavedSuccess(false)

    try {
      await api.updateProfile(form)
    } catch (err) {
      // Fallback
    }

    login({ ...user, name: form.name, email: form.email, phone: form.phone }, localStorage.getItem('eventra_token') || 'demo-token')
    setSaving(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 4000)
  }

  return (
    <div className="bg-white text-black min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[240px_1fr] gap-10 items-start">
        
        {/* Account Sidebar */}
        <aside className="bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm space-y-1">
          <div className="px-4 py-3 border-b border-zinc-100 mb-2">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Account Dashboard</p>
            <p className="font-extrabold text-sm text-black truncate">{form.name}</p>
          </div>

          <Link
            to="/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-black transition-colors"
          >
            <Ticket size={18} /> My Bookings
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FFB800] text-black text-sm font-extrabold shadow-sm"
          >
            <User size={18} /> User Profile
          </Link>

          <button
            onClick={() => { logout(); navigate('/') }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors pt-3 border-t border-zinc-100"
          >
            <LogOut size={18} /> Logout Account
          </button>
        </aside>

        {/* Profile Card */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-md">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#FFB800] text-black flex items-center justify-center font-black text-2xl shadow-md border-2 border-white">
                {form.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-black">{form.name}</h1>
                <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5 font-medium">
                  <ShieldCheck size={14} className="text-emerald-600" /> Active Member
                </p>
              </div>
            </div>

            <span className="bg-zinc-100 text-zinc-600 border border-zinc-200 text-xs font-bold px-3 py-1.5 rounded-xl w-fit">
              ID: USER-2026-88
            </span>
          </div>

          {savedSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold p-4 rounded-2xl mb-6 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              Your profile information has been updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 block mb-1">Preferred City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 block mb-1">Favorite Event Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="input-field cursor-pointer"
              >
                <option value="Music & Festivals">Music & Festivals</option>
                <option value="Tech & Conferences">Tech & Conferences</option>
                <option value="Food & Culinary">Food & Culinary</option>
                <option value="Cultural & Arts">Cultural & Arts</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
              </select>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFC52E] text-black font-extrabold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md"
              >
                <Save size={16} />
                {saving ? "Saving Changes..." : "Save Profile Changes"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}
