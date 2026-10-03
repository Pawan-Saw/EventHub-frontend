import { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {
  User,
  Ticket,
  LogOut,
  Calendar,
  MapPin,
  QrCode,
  X,
  Printer,
  ShieldCheck
} from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'

import { EVENTS } from '../services/mockData.js'

import { api } from '../services/api.js'


// ==========================================================
// DEFAULT BOOKINGS
// Used only when there is no backend/local booking.
// ==========================================================

const DEFAULT_BOOKINGS = []


// ==========================================================
// STATUS COLORS
// ==========================================================

const statusColor = {
  Confirmed:
    "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold",

  Upcoming:
    "bg-[#FFB800]/15 text-[#805B00] border border-[#FFB800]/30 font-bold",

  Completed:
    "bg-zinc-100 text-zinc-600 border border-zinc-200 font-medium",
}


// ==========================================================
// NORMALIZE BACKEND BOOKING
// Converts Spring Boot response into frontend UI format.
// ==========================================================

function normalizeBooking(booking) {

  const backendEvent =
    booking?.event || {}


  const event = {

    // Backend event ID
    id:
      backendEvent?.id ??
      booking?.eventId ??
      1,


    // Spring Boot Event.name
    title:
      backendEvent?.name ??
      backendEvent?.title ??
      "Event",


    // Event description
    description:
      backendEvent?.description ??
      "",


    // Event venue
    venue:
      backendEvent?.venue ??
      "Venue not available",


    // Event location if available
    location:
      backendEvent?.location ??
      backendEvent?.venue ??
      "Venue not available",


    // Spring Boot Event.eventDate
    date:
      backendEvent?.eventDate ??
      backendEvent?.date ??
      booking?.date ??
      "Date not available",


    // Event ticket price
    price:
      Number(
        backendEvent?.ticketPrice ??
        backendEvent?.price ??
        0
      ),


    // Optional fields
    category:
      backendEvent?.category ??
      "Event",


    image:
      backendEvent?.image ??
      EVENTS[0]?.image ??
      "",

  }


  // ========================================================
  // NORMALIZE STATUS
  // ========================================================

  const rawStatus =
    String(
      booking?.status ??
      "CONFIRMED"
    ).toUpperCase()


  let status = "Confirmed"


  if (
    rawStatus === "COMPLETED" ||
    rawStatus === "PAST"
  ) {

    status = "Completed"

  } else if (
    rawStatus === "UPCOMING"
  ) {

    status = "Upcoming"

  } else {

    status = "Confirmed"

  }


  return {

    // Backend Booking ID
    id:
      booking?.id
        ? `EVT-${booking.id}`
        : booking?.bookingId ??
          booking?.id ??
          `EVT-${Date.now()}`,


    backendId:
      booking?.id ??
      null,


    event,


    status,


    // Backend: numberOfTickets
    tickets:
      Number(
        booking?.numberOfTickets ??
        booking?.tickets ??
        1
      ),


    // Backend: totalAmount
    total:
      Number(
        booking?.totalAmount ??
        booking?.total ??
        0
      ),


    date:
      booking?.date ??
      event.date,


    customerName:
      booking?.customerName ??
      "",


    customerEmail:
      booking?.customerEmail ??
      "",

  }

}


// ==========================================================
// COMPONENT
// ==========================================================

export default function Bookings() {

  const { logout, user } = useAuth()

  const navigate = useNavigate()


  const [tab, setTab] =
    useState("all")


  const [bookings, setBookings] =
    useState([])


  const [selectedTicket, setSelectedTicket] =
    useState(null)


  const [loading, setLoading] =
    useState(true)


  const [error, setError] =
    useState("")


  // ========================================================
  // LOAD BOOKINGS
  // ========================================================

  useEffect(() => {

    let isMounted = true


    const loadBookings = async () => {

      try {

        setLoading(true)

        setError("")


        // ==================================================
        // LOCAL BOOKINGS
        // ==================================================

        const local = JSON.parse(
          localStorage.getItem(
            "eventra_local_bookings"
          ) || "[]"
        )


        // ==================================================
        // BACKEND BOOKINGS
        //
        // api.getMyBookings() currently calls:
        // GET /api/bookings
        // ==================================================

        const data =
          await api.getMyBookings()


        if (!isMounted) {
          return
        }


        const backendBookings =
          Array.isArray(data)
            ? data.map(normalizeBooking)
            : []


        const localBookings =
          Array.isArray(local)
            ? local.map(normalizeBooking)
            : []


        // ==================================================
        // BACKEND FIRST
        // ==================================================

        if (
          backendBookings.length > 0
        ) {

          setBookings(
            backendBookings
          )

        } else if (
          localBookings.length > 0
        ) {

          setBookings(
            localBookings
          )

        } else {

          setBookings(
            DEFAULT_BOOKINGS
          )

        }

      } catch (err) {

        console.error(
          "Failed to load bookings:",
          err
        )


        if (!isMounted) {
          return
        }


        // ==================================================
        // FALLBACK TO LOCAL BOOKINGS
        // ==================================================

        const local = JSON.parse(
          localStorage.getItem(
            "eventra_local_bookings"
          ) || "[]"
        )


        const localBookings =
          Array.isArray(local)
            ? local.map(normalizeBooking)
            : []


        if (
          localBookings.length > 0
        ) {

          setBookings(
            localBookings
          )

        } else {

          setBookings(
            DEFAULT_BOOKINGS
          )

        }


        setError(
          err?.message ||
          "Unable to load bookings from backend."
        )

      } finally {

        if (isMounted) {

          setLoading(false)

        }

      }

    }


    loadBookings()


    return () => {

      isMounted = false

    }

  }, [])


  // ========================================================
  // FILTER BOOKINGS
  // ========================================================

  const filtered =
    tab === "all"

      ? bookings

      : bookings.filter((booking) => {

          const status =
            String(
              booking?.status ??
              "Confirmed"
            ).toLowerCase()


          return status === tab

        })


  // ========================================================
  // LOADING SCREEN
  // ========================================================

  if (loading) {

    return (

      <div className="bg-white min-h-screen py-10">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid lg:grid-cols-[240px_1fr] gap-10">

            {/* Sidebar skeleton */}

            <div className="bg-zinc-100 rounded-3xl h-48 animate-pulse" />


            {/* Content skeleton */}

            <div className="space-y-4">

              <div className="h-10 w-72 bg-zinc-100 rounded-xl animate-pulse" />

              <div className="h-5 w-96 max-w-full bg-zinc-100 rounded animate-pulse" />

              <div className="h-20 w-full bg-zinc-100 rounded-2xl animate-pulse mt-8" />

              <div className="h-32 w-full bg-zinc-100 rounded-3xl animate-pulse" />

              <div className="h-32 w-full bg-zinc-100 rounded-3xl animate-pulse" />

            </div>

          </div>

        </div>

      </div>

    )

  }


  // ========================================================
  // UI
  // ========================================================

  return (

    <div className="bg-white text-black min-h-screen py-10">


      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[240px_1fr] gap-10 items-start">


        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside className="bg-white border border-zinc-200 rounded-3xl p-4 shadow-sm space-y-1">


          <div className="px-4 py-3 border-b border-zinc-100 mb-2">

            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">

              Account Dashboard

            </p>


            <p className="font-extrabold text-sm text-black truncate">

              {user?.name || "Event Lover"}

            </p>

          </div>


          {/* MY BOOKINGS */}

          <Link
            to="/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#FFB800] text-black text-sm font-extrabold shadow-sm"
          >

            <Ticket size={18} />

            My Bookings

          </Link>


          {/* PROFILE */}

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-black transition-colors"
          >

            <User size={18} />

            User Profile

          </Link>


          {/* LOGOUT */}

          <button
            onClick={() => {

              logout()

              navigate('/')

            }}

            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors pt-3 border-t border-zinc-100"
          >

            <LogOut size={18} />

            Logout Account

          </button>

        </aside>


        {/* ==================================================
            CONTENT PANEL
        ================================================== */}

        <div>


          {/* HEADER */}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

            <div>

              <h1 className="text-3xl font-extrabold text-black tracking-tight">

                My Event Bookings

              </h1>


              <p className="text-zinc-500 text-sm mt-1">

                View, track and access digital entry passes for your events.

              </p>

            </div>


            <Link
              to="/events"
              className="bg-black text-white hover:bg-zinc-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all w-fit"
            >

              + Find More Events

            </Link>

          </div>


          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (

            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">

              <p className="text-xs text-amber-800">

                {error}

              </p>

            </div>

          )}


          {/* ==================================================
              FILTER TABS
          ================================================== */}

          <div className="flex flex-wrap gap-2 mb-8 bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200 w-fit">


            {[
              ["all", `All Bookings (${bookings.length})`],
              ["confirmed", "Confirmed"],
              ["upcoming", "Upcoming"],
              ["completed", "Past"]
            ].map(([key, label]) => (

              <button
                key={key}
                onClick={() =>
                  setTab(key)
                }

                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  tab === key
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-500 hover:text-black"
                }`}
              >

                {label}

              </button>

            ))}

          </div>


          {/* ==================================================
              BOOKINGS LIST
          ================================================== */}

          <div className="space-y-4">


            {filtered.map((b) => (

              <div
                key={b.id}
                className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
              >


                {/* BOOKING INFO */}

                <div className="flex items-center gap-4 flex-1">


                  {/* IMAGE */}

                  <img
                    src={
                      b.event?.image ||
                      EVENTS[0]?.image
                    }

                    alt={
                      b.event?.title ||
                      "Event"
                    }

                    className="w-24 h-24 rounded-2xl object-cover border border-zinc-200 shrink-0 group-hover:scale-105 transition-transform"
                  />


                  <div>


                    {/* BADGES */}

                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">


                      <span className="text-[10px] font-bold bg-[#FFB800]/20 text-[#805B00] px-2 py-0.5 rounded">

                        {b.event?.category ||
                          "Event"}

                      </span>


                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full ${
                          statusColor[
                            b.status ||
                            "Confirmed"
                          ] ||
                          statusColor.Confirmed
                        }`}
                      >

                        {b.status ||
                          "Confirmed"}

                      </span>


                      <span className="text-[10px] font-mono text-zinc-400">

                        ID: {b.id}

                      </span>

                    </div>


                    {/* EVENT NAME */}

                    <h3 className="font-extrabold text-lg text-black mb-1 leading-snug">

                      {b.event?.title ||
                        "Event Title"}

                    </h3>


                    {/* LOCATION + DATE */}

                    <div className="flex flex-wrap gap-4 text-xs text-zinc-500">


                      <span className="flex items-center gap-1">

                        <MapPin
                          size={13}
                          className="text-[#FFB800]"
                        />

                        {b.event?.location ||
                          b.event?.venue ||
                          "Venue"}

                      </span>


                      <span className="flex items-center gap-1">

                        <Calendar
                          size={13}
                          className="text-[#FFB800]"
                        />

                        {b.event?.date ||
                          b.date}

                      </span>

                    </div>


                    {/* TICKET INFO */}

                    <p className="text-xs text-zinc-500 mt-2 font-medium">

                      <strong>
                        {b.tickets || 1}
                      </strong>{" "}

                      Ticket(s) · Paid{" "}

                      <strong className="text-black">

                        ₹{b.total || 0}

                      </strong>

                    </p>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="flex sm:flex-col items-end gap-2 w-full md:w-auto border-t md:border-t-0 border-zinc-100 pt-3 md:pt-0">


                  <button
                    onClick={() =>
                      setSelectedTicket(b)
                    }

                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#FFC52E] text-black font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm"
                  >

                    <QrCode size={15} />

                    View Digital Ticket

                  </button>


                  <Link
                    to={`/events/${b.event?.id || 1}`}

                    className="flex-1 md:flex-none text-center text-xs font-semibold text-zinc-500 hover:text-black py-1"
                  >

                    Event Details →

                  </Link>

                </div>

              </div>

            ))}


            {/* ==================================================
                EMPTY STATE
            ================================================== */}

            {filtered.length === 0 && (

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-12 text-center text-zinc-500">


                <Ticket
                  size={36}
                  className="mx-auto mb-3 text-zinc-400 opacity-60"
                />


                <h3 className="text-base font-bold text-black mb-1">

                  No bookings in this filter

                </h3>


                <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-4">

                  You haven't placed any event bookings under this status tab yet.

                </p>


                <Link
                  to="/events"
                  className="bg-[#FFB800] hover:bg-[#FFC52E] text-black font-bold px-5 py-2 rounded-xl text-xs inline-block"
                >

                  Explore Events

                </Link>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* ====================================================
          DIGITAL TICKET MODAL
      ==================================================== */}

      {selectedTicket && (

        <div
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-6"

          onClick={() =>
            setSelectedTicket(null)
          }
        >


          <div
            className="bg-white rounded-3xl border border-zinc-200 max-w-md w-full overflow-hidden shadow-2xl"

            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="bg-[#0A0A0A] text-white p-6 relative">


              <button
                onClick={() =>
                  setSelectedTicket(null)
                }

                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
              >

                <X size={20} />

              </button>


              <div className="flex items-center gap-2 mb-2">


                <span className="bg-[#FFB800] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded">

                  Official Entry Pass

                </span>


                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">

                  <ShieldCheck size={14} />

                  Validated Ticket

                </span>

              </div>


              <h3 className="text-xl font-extrabold">

                {selectedTicket.event?.title ||
                  "Event"}

              </h3>


              <p className="text-xs text-zinc-400 mt-1">

                {selectedTicket.event?.venue ||
                  "Venue"}

                {selectedTicket.event?.location &&
                  `, ${selectedTicket.event.location}`}

              </p>

            </div>


            {/* =================================================
                MODAL CONTENT
            ================================================= */}

            <div className="p-6 text-center">


              {/* QR */}

              <div className="bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-2xl p-6 inline-block mb-4">


                <div className="w-40 h-40 bg-black rounded-xl p-3 mx-auto flex items-center justify-center text-white text-xs font-mono">


                  <div className="grid grid-cols-5 gap-1.5 w-full h-full p-1 bg-white rounded-lg">

                    {[...Array(25)].map(
                      (_, idx) => (

                        <div
                          key={idx}
                          className={`rounded-xs ${
                            idx % 2 === 0 ||
                            idx % 5 === 0
                              ? "bg-black"
                              : "bg-white"
                          }`}
                        />

                      )
                    )}

                  </div>

                </div>


                <p className="text-[11px] font-mono text-zinc-500 mt-3 font-bold">

                  Ref: {selectedTicket.id}

                </p>

              </div>


              {/* DETAILS */}

              <div className="text-xs space-y-2 text-left bg-zinc-50 border border-zinc-200 rounded-2xl p-4 mb-6">


                <div className="flex justify-between">

                  <span className="text-zinc-500">

                    Attendee:

                  </span>


                  <span className="font-bold text-black">

                    {selectedTicket.customerName ||
                      user?.name ||
                      "Pass Holder"}

                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-zinc-500">

                    Date & Time:

                  </span>


                  <span className="font-bold text-black">

                    {selectedTicket.event?.date ||
                      selectedTicket.date}

                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-zinc-500">

                    Pass Quantity:

                  </span>


                  <span className="font-bold text-black">

                    {selectedTicket.tickets || 1}

                    {" "}Entry Ticket(s)

                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-zinc-500">

                    Total Paid:

                  </span>


                  <span className="font-bold text-black">

                    ₹{selectedTicket.total || 0}

                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-zinc-500">

                    Status:

                  </span>


                  <span className="font-bold text-emerald-600">

                    {selectedTicket.status ||
                      "Confirmed"}

                  </span>

                </div>

              </div>


              {/* BUTTONS */}

              <div className="flex gap-3">


                <button
                  onClick={() =>
                    window.print()
                  }

                  className="flex-1 inline-flex items-center justify-center gap-2 border border-zinc-300 hover:border-black text-black font-bold text-xs py-3 rounded-xl transition-all"
                >

                  <Printer size={15} />

                  Print Ticket

                </button>


                <button
                  onClick={() =>
                    setSelectedTicket(null)
                  }

                  className="flex-1 bg-[#FFB800] hover:bg-[#FFC52E] text-black font-bold text-xs py-3 rounded-xl transition-all"
                >

                  Close Pass

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}