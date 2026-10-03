import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-zinc-800/80 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="text-2xl font-extrabold tracking-tight inline-block mb-4 text-white">
            Event<span className="text-[#FFB800]">Hub</span>
          </Link>
          <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-6">
            The all-in-one platform to discover, plan, host, and book extraordinary events, concerts, corporate summits, and cultural festivals.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5 bg-[#191919] border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Systems Operational
            </span>
            <span>v1.0.0</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li><Link to="/" className="hover:text-[#FFB800] transition-colors">Home Page</Link></li>
            <li><Link to="/events" className="hover:text-[#FFB800] transition-colors">All Events</Link></li>
            <li><Link to="/gallery" className="hover:text-[#FFB800] transition-colors">Event Gallery</Link></li>
            <li><Link to="/blog" className="hover:text-[#FFB800] transition-colors">EventHub Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Account & Support</h4>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li><Link to="/login" className="hover:text-[#FFB800] transition-colors">Login to Account</Link></li>
            <li><Link to="/register" className="hover:text-[#FFB800] transition-colors">Create Account</Link></li>
            <li><Link to="/bookings" className="hover:text-[#FFB800] transition-colors">My Bookings</Link></li>
            <li><Link to="/profile" className="hover:text-[#FFB800] transition-colors">User Profile</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-800/60 py-6 text-center text-xs text-zinc-500 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© 2026 EventHub. All rights reserved.</div>
        <div className="flex gap-6">
          <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
          <span className="hover:text-zinc-300 cursor-pointer">Cookie Settings</span>
        </div>
      </div>
    </footer>
  )
}
