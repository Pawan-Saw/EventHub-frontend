import { Link } from 'react-router-dom'
import { Heart, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function EventCard({ event }) {
  const [liked, setLiked] = useState(false)
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden group hover:border-[#FFB800] hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-zinc-100">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        
        <span className="absolute top-3 left-3 bg-black/80 text-white text-[11px] font-bold px-3 py-1 rounded-md tracking-wider uppercase backdrop-blur-md border border-white/10">
          {event.category}
        </span>
        
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setLiked(!liked)
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Wishlist"
        >
          <Heart size={15} fill={liked ? "#FFB800" : "none"} className={liked ? "text-[#FFB800]" : "text-white"} />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-lg text-black mb-2 truncate group-hover:text-[#B58100] transition-colors">
            {event.title}
          </h3>
          
          <div className="space-y-1.5 mb-4 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#FFB800] shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#FFB800] shrink-0" />
              <span>{event.date}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-2">
          <div>
            <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider block">From</span>
            <span className="font-black text-xl text-black">₹{event.price}</span>
          </div>
          <Link
            to={`/events/${event.id}`}
            className="inline-flex items-center gap-1.5 bg-[#FFB800] hover:bg-[#FFC52E] text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
          >
            Book Ticket
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}
