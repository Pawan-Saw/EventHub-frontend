import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ChevronDown, User, Ticket, Settings, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Left: nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-300 font-medium">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                isActive ? 'text-[#FFB800] font-semibold border-b-2 border-[#FFB800] pb-1' : 'hover:text-white transition-colors pb-1'
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Center: logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight justify-self-start md:justify-self-center text-white"
        >
          Event<span className="text-[#FFB800]">Hub</span>
        </Link>

        {/* Right: search + auth */}
        <div className="flex items-center justify-end gap-4">
          <div className="hidden lg:flex items-center w-56 xl:w-64 bg-[#191919] border border-zinc-800 rounded-xl px-3.5 py-2 focus-within:border-[#FFB800] transition-colors">
            <Search size={15} className="text-zinc-400 mr-2 shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search events..."
              className="bg-transparent text-sm text-white outline-none w-full placeholder-zinc-500"
            />
          </div>

          {!user ? (
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <Link to="/login" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-3 py-2">
                Login
              </Link>
              <Link to="/register" className="bg-[#FFB800] hover:bg-[#FFC52E] text-black font-semibold text-sm px-5 py-2 rounded-xl transition-all">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative hidden sm:block shrink-0">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 bg-[#191919] border border-zinc-800 rounded-full pl-1.5 pr-3 py-1 hover:border-zinc-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#FFB800] text-black flex items-center justify-center font-bold text-sm">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-semibold text-zinc-200 hidden xl:block">{user.name}</span>
                <ChevronDown size={15} className="text-zinc-400" />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-[#141414] border border-zinc-800 rounded-2xl p-2 shadow-2xl z-50 text-white">
                  <div className="px-3 py-2 border-b border-zinc-800/80 mb-1">
                    <p className="text-xs font-semibold text-zinc-400">Signed in as</p>
                    <p className="text-sm font-bold truncate text-white">{user.name || user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#222] text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    <User size={16} className="text-[#FFB800]" /> My Profile
                  </Link>
                  <Link
                    to="/bookings"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#222] text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    <Ticket size={16} className="text-[#FFB800]" /> My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setOpen(false)
                      navigate('/')
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#222] text-sm text-red-400 hover:text-red-300 transition-colors mt-1 border-t border-zinc-800/80 pt-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 border-t border-zinc-800 pt-4 bg-[#0A0A0A]">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block text-base font-medium text-zinc-300 hover:text-[#FFB800]"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {!user ? (
            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                className="flex-1 text-center border border-zinc-700 rounded-xl py-2.5 text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center bg-[#FFB800] hover:bg-[#FFC52E] text-black font-semibold rounded-xl py-2.5 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <Link to="/profile" className="block text-sm text-zinc-300" onClick={() => setMobileOpen(false)}>My Profile</Link>
              <Link to="/bookings" className="block text-sm text-zinc-300" onClick={() => setMobileOpen(false)}>My Bookings</Link>
              <button onClick={() => { logout(); setMobileOpen(false); navigate('/') }} className="block text-sm text-red-400">Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}