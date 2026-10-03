import { useParams, Link, useNavigate } from 'react'
import { useState, useEffect } from 'react'
import { MapPin, Calendar, Clock, Music, ShoppingBag, Ticket as TicketIcon, ParkingSquare, ShieldCheck, ArrowRight, ChevronRight, Check } from 'lucide-react'
import { EVENTS, HERO_COLLAGE } from '../services/mockData.js'
import { api } from '../services/api.js'
import Loading from '../components/Loading.jsx'

export default function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImg, setSelectedImg] = useState('')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    let isMounted = true
    const localFallback = EVENTS.find((e) => String(e.id) === String(id)) || EVENTS[0]

    api.getEventById(id)
      .then((data) => {
        if (isMounted) {
          if (data && data.title) {
            setEvent(data)
            setSelectedImg(data.image)
          } else {
            setEvent(localFallback)
            setSelectedImg(localFallback.image)
          }
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setEvent(localFallback)
          setSelectedImg(localFallback.image)
          setLoading(false)
        }
      })

    return () => { isMounted = false }
  }, [id])

  if (loading || !event) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  const galleryImages = [
    event.image,
    ...HERO_COLLAGE.slice(0, 4)
  ]

  const total = (event.price || 0) * qty

  const handleBookNow = () => {
    navigate(`/book/${event.id}?qty=${qty}`)
  }

  return (
    <div className="bg-white text-black min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8 font-medium">
          <Link to="/" className="hover:text-[#B58100] transition">Home</Link>
          <ChevronRight size={13} />
          <Link to="/events" className="hover:text-[#B58100] transition">Events</Link>
          <ChevronRight size={13} />
          <span className="text-black font-semibold truncate max-w-xs">{event.title}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* Main Info */}
          <div>
            {/* Gallery */}
            <div className="rounded-3xl overflow-hidden h-[380px] sm:h-[450px] mb-4 shadow-md bg-zinc-100 border border-zinc-200">
              <img
                src={selectedImg || event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-5 gap-3 mb-8">
              {galleryImages.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImg(src)}
                  className={`h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImg === src ? "border-[#FFB800] ring-2 ring-[#FFB800]/20" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} className="w-full h-full object-cover" alt="Thumbnail" />
                </button>
              ))}
            </div>

            {/* Title & Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#FFB800] text-black text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md">
                {event.category}
              </span>
              <span className="text-xs text-zinc-500 font-semibold flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600" /> Verified Organizer Event
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black mb-6 leading-tight">
              {event.title}
            </h1>

            {/* Quick Details Pills */}
            <div className="flex flex-wrap gap-4 p-5 bg-zinc-50 border border-zinc-200 rounded-2xl mb-10 text-sm">
              <div className="flex items-center gap-2 text-zinc-700">
                <MapPin size={16} className="text-[#FFB800]" />
                <span className="font-semibold">{event.location}</span>
              </div>
              <div className="w-px h-5 bg-zinc-300 hidden sm:block" />
              <div className="flex items-center gap-2 text-zinc-700">
                <Calendar size={16} className="text-[#FFB800]" />
                <span className="font-semibold">{event.date}</span>
              </div>
              <div className="w-px h-5 bg-zinc-300 hidden sm:block" />
              <div className="flex items-center gap-2 text-zinc-700">
                <Clock size={16} className="text-[#FFB800]" />
                <span className="font-semibold">{event.time}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-black mb-3">About This Event</h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                Experience an incredible gathering at {event.title}. Held at {event.venue}, this event brings together live performances, engaging activities, and an unforgettable crowd energy.
              </p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Whether you are attending with friends, family, or solo, enjoy world-class staging, curated food stalls, and complete security. Space is limited, so reserve your entry ticket today.
              </p>
            </div>

            {/* Amenities Grid */}
            <div>
              <h3 className="text-xl font-bold text-black mb-4">What's Included</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Music, label: "Live Performances" },
                  { icon: ShoppingBag, label: "Food & Drinks Stalls" },
                  { icon: TicketIcon, label: "VIP & Regular Passes" },
                  { icon: ParkingSquare, label: "On-site Parking" }
                ].map((item, idx) => {
                  const IconComponent = item.icon
                  return (
                    <div key={idx} className="flex flex-col items-center justify-center p-4 bg-white border border-zinc-200 rounded-2xl text-center shadow-sm">
                      <IconComponent size={22} className="text-[#FFB800] mb-2" />
                      <span className="text-xs font-bold text-zinc-800">{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sticky Booking Widget */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-xl sticky top-28">
            <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-zinc-100">
              <div>
                <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Price per ticket</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-black">₹{event.price}</span>
                  <span className="text-xs text-zinc-500 font-medium">incl. taxes</span>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-full">
                Tickets Available
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">Select Number of Tickets</label>
              <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-xl p-2">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 rounded-lg bg-white border border-zinc-200 font-bold text-lg text-black hover:bg-zinc-100 flex items-center justify-center transition-colors shadow-sm"
                >
                  −
                </button>
                <span className="font-extrabold text-lg text-black">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 rounded-lg bg-white border border-zinc-200 font-bold text-lg text-black hover:bg-zinc-100 flex items-center justify-center transition-colors shadow-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Event Summary Details */}
            <div className="text-xs space-y-3 mb-6 bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
              <div className="flex justify-between">
                <span className="text-zinc-500">Venue:</span>
                <span className="font-bold text-zinc-800 text-right">{event.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Date:</span>
                <span className="font-bold text-zinc-800">{event.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Time:</span>
                <span className="font-bold text-zinc-800">{event.time}</span>
              </div>
            </div>

            {/* Total breakdown */}
            <div className="pt-2 mb-6">
              <div className="flex justify-between items-center text-sm font-semibold text-zinc-600 mb-1">
                <span>Subtotal ({qty} {qty === 1 ? 'ticket' : 'tickets'})</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between items-baseline font-black text-lg text-black pt-2 border-t border-zinc-200">
                <span>Total Amount</span>
                <span className="text-2xl text-[#B58100]">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#FFC52E] text-black font-extrabold text-base py-4 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Proceed to Book
              <ArrowRight size={18} />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-zinc-400">
              <Check size={14} className="text-emerald-500" /> Instant confirmation & e-ticket delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
