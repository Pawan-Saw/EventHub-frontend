import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { EVENTS } from '../services/mockData.js'
import { api } from '../services/api.js'

import Loading from '../components/Loading.jsx'

import {
  CheckCircle2,
  CreditCard,
  QrCode,
  Building2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin
} from 'lucide-react'

const STEPS = [
  "Event Overview",
  "Your Details",
  "Payment",
  "Confirmation"
]

export default function BookTicket() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const initialQty = parseInt(
    searchParams.get('qty') || '1',
    10
  )

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  const [step, setStep] = useState(1)

  const [qty, setQty] = useState(
    isNaN(initialQty) ? 1 : initialQty
  )

  const [paymentMethod, setPaymentMethod] = useState('card')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [bookingId, setBookingId] = useState('')

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
    agree: false
  })


  // ==========================================
  // LOAD EVENT
  // ==========================================

  useEffect(() => {

    let isMounted = true

    const local =
      EVENTS.find(
        e => String(e.id) === String(id)
      ) || EVENTS[0]

    api.getEventById(id)

      .then(data => {

        if (isMounted) {

          setEvent(
            data && (data.title || data.name)
              ? data
              : local
          )

          setLoading(false)
        }

      })

      .catch(error => {

        console.error(
          "Failed to load event:",
          error
        )

        if (isMounted) {

          setEvent(local)
          setLoading(false)

        }

      })

    return () => {
      isMounted = false
    }

  }, [id])


  // ==========================================
  // LOADING
  // ==========================================

  if (loading || !event) {

    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    )

  }


  // ==========================================
  // EVENT DATA
  // ==========================================

  const eventName =
    event.title || event.name || "Event"

  const eventImage =
    event.image ||
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"

  const eventPrice =
    event.price ??
    event.ticketPrice ??
    0

  const eventDate =
    event.date ||
    event.eventDate ||
    "Date not available"

  const eventVenue =
    event.venue ||
    "Venue not available"

  const eventLocation =
    event.location ||
    ""

  const eventCategory =
    event.category ||
    "Event"


  const total =
    Number(eventPrice) * qty


  // ==========================================
  // STEP HANDLERS
  // ==========================================

  const handleNext = () => {

    setStep(
      prev => Math.min(4, prev + 1)
    )

  }


  const handleBack = () => {

    setStep(
      prev => Math.max(1, prev - 1)
    )

  }


  // ==========================================
  // CREATE BOOKING
  // ==========================================

  const handlePayment = async () => {

    if (isSubmitting) {
      return
    }

    if (!event?.id) {

      alert(
        "Event ID is missing. Please try again."
      )

      return
    }

    if (qty <= 0) {

      alert(
        "Please select at least one ticket."
      )

      return
    }


    setIsSubmitting(true)


    try {

      console.log(
        "Creating booking for event:",
        event.id
      )

      console.log(
        "Number of tickets:",
        qty
      )


      // ==========================================
      // SEND REQUEST TO SPRING BOOT
      //
      // POST
      // /api/bookings/event/{eventId}
      //
      // BODY
      // {
      //   numberOfTickets: qty
      // }
      // ==========================================

      const response = await api.createBooking(
        event.id,
        {
          numberOfTickets: qty
        }
      )


      console.log(
        "Booking successful:",
        response
      )


      // ==========================================
      // BOOKING ID
      // ==========================================

      const generatedId =
        response?.id
          ? `EVT-${response.id}`
          : "EVT-" +
            Math.floor(
              100000 +
              Math.random() * 900000
            )


      setBookingId(generatedId)


      // ==========================================
      // SAVE LOCAL RECORD
      // ONLY AFTER BACKEND SUCCESS
      // ==========================================

      const existing = JSON.parse(
        localStorage.getItem(
          'eventra_local_bookings'
        ) || '[]'
      )


      const newBooking = {

        id: generatedId,

        backendId: response?.id || null,

        event: event,

        status:
          response?.status ||
          "CONFIRMED",

        tickets: qty,

        total:
          response?.totalAmount ??
          total,

        date:
          new Date().toLocaleDateString(
            'en-US',
            {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }
          )

      }


      localStorage.setItem(
        'eventra_local_bookings',
        JSON.stringify([
          newBooking,
          ...existing
        ])
      )


      // ==========================================
      // SUCCESS
      // ==========================================

      setStep(4)


    } catch (error) {

      console.error(
        "Booking failed:",
        error
      )


      alert(
        error?.message ||
        "Booking failed. Please try again."
      )

    } finally {

      setIsSubmitting(false)

    }

  }


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="bg-white text-black min-h-screen py-10">

      <div className="max-w-6xl mx-auto px-6">


        {/* ==========================================
            STEPPER
        ========================================== */}

        <div className="flex items-center justify-center gap-2 sm:gap-6 mb-12 overflow-x-auto pb-4">

          {STEPS.map((label, i) => {

            const n = i + 1

            const isActive =
              n <= step

            const isCurrent =
              n === step

            return (

              <div
                key={label}
                className="flex items-center gap-2 sm:gap-6 shrink-0"
              >

                <div className="flex items-center gap-2.5">

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      isCurrent
                        ? "bg-[#FFB800] text-black ring-4 ring-[#FFB800]/20 scale-105"
                        : isActive
                        ? "bg-black text-white"
                        : "bg-zinc-100 text-zinc-400 border border-zinc-200"
                    }`}
                  >

                    {n}

                  </div>


                  <span
                    className={`text-xs font-bold ${
                      isCurrent
                        ? "text-black"
                        : isActive
                        ? "text-zinc-700"
                        : "text-zinc-400"
                    }`}
                  >

                    {label}

                  </span>

                </div>


                {i < STEPS.length - 1 && (

                  <div
                    className={`w-8 sm:w-16 h-0.5 ${
                      n < step
                        ? "bg-[#FFB800]"
                        : "bg-zinc-200"
                    }`}
                  />

                )}

              </div>

            )

          })}

        </div>


        {/* ==========================================
            MAIN GRID
        ========================================== */}

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">


          {/* ==========================================
              MAIN PANEL
          ========================================== */}

          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">


            {/* ==========================================
                STEP 1
            ========================================== */}

            {step === 1 && (

              <div>

                <div className="flex justify-between items-start mb-6">

                  <div>

                    <span className="bg-[#FFB800] text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                      Step 1 of 3
                    </span>

                    <h2 className="text-2xl font-black text-black mt-2">
                      Confirm Event & Quantity
                    </h2>

                  </div>

                </div>


                <div className="relative h-60 rounded-2xl overflow-hidden mb-6 bg-zinc-100 border border-zinc-200">

                  <img
                    src={eventImage}
                    alt={eventName}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">

                    <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider">
                      {eventCategory}
                    </span>

                    <h3 className="text-2xl font-extrabold">
                      {eventName}
                    </h3>

                  </div>

                </div>


                <div className="grid sm:grid-cols-2 gap-4 text-xs text-zinc-600 mb-8 bg-zinc-50 border border-zinc-200 rounded-2xl p-4">

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={16}
                      className="text-[#FFB800]"
                    />

                    <span>

                      <strong className="text-black">
                        Venue:
                      </strong>{" "}

                      {eventVenue}

                      {eventLocation
                        ? `, ${eventLocation}`
                        : ""
                      }

                    </span>

                  </div>


                  <div className="flex items-center gap-2">

                    <Calendar
                      size={16}
                      className="text-[#FFB800]"
                    />

                    <span>

                      <strong className="text-black">
                        Date:
                      </strong>{" "}

                      {eventDate}

                    </span>

                  </div>

                </div>


                <div className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl mb-8">

                  <div>

                    <span className="text-xs text-zinc-400 font-semibold block uppercase">
                      Number of Tickets
                    </span>

                    <span className="text-sm font-extrabold text-black">
                      ₹{eventPrice} per ticket
                    </span>

                  </div>


                  <div className="flex items-center gap-4 bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-1.5">

                    <button
                      type="button"
                      onClick={() =>
                        setQty(
                          Math.max(
                            1,
                            qty - 1
                          )
                        )
                      }
                      className="text-black font-extrabold text-lg hover:text-[#B58100] w-6"
                    >
                      −
                    </button>


                    <span className="font-extrabold text-lg text-black w-6 text-center">
                      {qty}
                    </span>


                    <button
                      type="button"
                      onClick={() =>
                        setQty(qty + 1)
                      }
                      className="text-black font-extrabold text-lg hover:text-[#B58100] w-6"
                    >
                      +
                    </button>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#FFC52E] text-black font-bold text-base py-3.5 rounded-2xl transition-all shadow-md"
                >

                  Continue to Attendee Info

                  <ArrowRight size={18} />

                </button>

              </div>

            )}


            {/* ==========================================
                STEP 2
            ========================================== */}

            {step === 2 && (

              <div>

                <span className="bg-[#FFB800] text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                  Step 2 of 3
                </span>

                <h2 className="text-2xl font-black text-black mt-2 mb-1">
                  Attendee Information
                </h2>

                <p className="text-xs text-zinc-500 mb-6">
                  Enter your contact details where tickets will be delivered.
                </p>


                <div className="space-y-4">


                  <div>

                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Full Name *
                    </label>

                    <input
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={e =>
                        setForm({
                          ...form,
                          name: e.target.value
                        })
                      }
                      className="input-field"
                    />

                  </div>


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
                          setForm({
                            ...form,
                            email: e.target.value
                          })
                        }
                        className="input-field"
                      />

                    </div>


                    <div>

                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Phone Number *
                      </label>

                      <input
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={e =>
                          setForm({
                            ...form,
                            phone: e.target.value
                          })
                        }
                        className="input-field"
                      />

                    </div>

                  </div>


                  <div className="pt-2">

                    <label className="flex items-start gap-3 text-xs text-zinc-600 cursor-pointer bg-zinc-50 p-4 border border-zinc-200 rounded-2xl">

                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={e =>
                          setForm({
                            ...form,
                            agree: e.target.checked
                          })
                        }
                        className="accent-[#FFB800] w-4 h-4 mt-0.5 rounded cursor-pointer"
                      />

                      <span>

                        I agree to the{" "}

                        <strong>
                          Event Policy
                        </strong>{" "}

                        and confirm that all information provided is accurate.

                      </span>

                    </label>

                  </div>

                </div>


                <div className="flex gap-4 mt-8 pt-4 border-t border-zinc-100">

                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-outline flex-1 text-center py-3"
                  >
                    Back
                  </button>


                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      !form.name ||
                      !form.email ||
                      !form.phone ||
                      !form.agree
                    }
                    className="btn-primary flex-[2] text-center py-3 disabled:opacity-40"
                  >
                    Proceed to Payment →
                  </button>

                </div>

              </div>

            )}


            {/* ==========================================
                STEP 3
            ========================================== */}

            {step === 3 && (

              <div>

                <span className="bg-[#FFB800] text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                  Step 3 of 3
                </span>

                <h2 className="text-2xl font-black text-black mt-2 mb-1">
                  Select Payment Method
                </h2>

                <p className="text-xs text-zinc-500 mb-6">
                  Choose how you'd like to complete your purchase of ₹{total}.
                </p>


                <div className="grid grid-cols-3 gap-3 mb-6">

                  {[

                    {
                      id: 'card',
                      label: 'Credit/Debit Card',
                      icon: CreditCard
                    },

                    {
                      id: 'upi',
                      label: 'UPI / QR Code',
                      icon: QrCode
                    },

                    {
                      id: 'netbank',
                      label: 'Net Banking',
                      icon: Building2
                    }

                  ].map(method => {

                    const IconComponent =
                      method.icon

                    const selected =
                      paymentMethod === method.id

                    return (

                      <button
                        key={method.id}
                        type="button"
                        onClick={() =>
                          setPaymentMethod(
                            method.id
                          )
                        }
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                          selected
                            ? "border-[#FFB800] bg-[#FFB800]/10 text-black font-bold"
                            : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                        }`}
                      >

                        <IconComponent
                          size={20}
                          className={
                            selected
                              ? "text-[#B58100]"
                              : "text-zinc-400"
                          }
                        />

                        <span className="text-xs mt-1.5">
                          {method.label}
                        </span>

                      </button>

                    )

                  })}

                </div>


                {/* CARD */}

                {paymentMethod === 'card' && (

                  <div className="space-y-4 bg-zinc-50 p-5 border border-zinc-200 rounded-2xl mb-6">

                    <div>

                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Card Number
                      </label>

                      <input
                        placeholder="4532 •••• •••• 8901"
                        value={form.cardNumber}
                        onChange={e =>
                          setForm({
                            ...form,
                            cardNumber: e.target.value
                          })
                        }
                        className="input-field"
                      />

                    </div>


                    <div className="grid grid-cols-2 gap-4">

                      <div>

                        <label className="text-xs font-bold text-zinc-700 block mb-1">
                          Expiry Date
                        </label>

                        <input
                          placeholder="MM / YY"
                          value={form.expiry}
                          onChange={e =>
                            setForm({
                              ...form,
                              expiry: e.target.value
                            })
                          }
                          className="input-field"
                        />

                      </div>


                      <div>

                        <label className="text-xs font-bold text-zinc-700 block mb-1">
                          Security Code (CVV)
                        </label>

                        <input
                          placeholder="123"
                          type="password"
                          maxLength={4}
                          value={form.cvv}
                          onChange={e =>
                            setForm({
                              ...form,
                              cvv: e.target.value
                            })
                          }
                          className="input-field"
                        />

                      </div>

                    </div>

                  </div>

                )}


                {/* UPI */}

                {paymentMethod === 'upi' && (

                  <div className="space-y-4 bg-zinc-50 p-5 border border-zinc-200 rounded-2xl mb-6">

                    <div>

                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        UPI ID / VPA
                      </label>

                      <input
                        placeholder="username@upi or username@okaxis"
                        value={form.upiId}
                        onChange={e =>
                          setForm({
                            ...form,
                            upiId: e.target.value
                          })
                        }
                        className="input-field"
                      />

                    </div>

                    <p className="text-xs text-zinc-500">
                      Supported apps: Google Pay, PhonePe, Paytm, BHIM
                    </p>

                  </div>

                )}


                {/* NET BANKING */}

                {paymentMethod === 'netbank' && (

                  <div className="bg-zinc-50 p-5 border border-zinc-200 rounded-2xl mb-6 text-xs text-zinc-600">

                    <p className="font-semibold text-black mb-2">
                      Select Popular Bank:
                    </p>

                    <div className="grid grid-cols-2 gap-2">

                      {[
                        "HDFC Bank",
                        "ICICI Bank",
                        "State Bank of India",
                        "Axis Bank"
                      ].map(bank => (

                        <button
                          key={bank}
                          type="button"
                          className="p-2.5 bg-white border border-zinc-200 rounded-xl text-left font-semibold hover:border-[#FFB800]"
                        >
                          {bank}
                        </button>

                      ))}

                    </div>

                  </div>

                )}


                <div className="flex gap-4 pt-2">

                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-outline flex-1 text-center py-3"
                  >
                    Back
                  </button>


                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="btn-primary flex-[2] text-center py-3 font-extrabold text-base disabled:opacity-50"
                  >

                    {isSubmitting
                      ? "Processing Booking..."
                      : `Confirm Booking ₹${total}`
                    }

                  </button>

                </div>

              </div>

            )}


            {/* ==========================================
                STEP 4
            ========================================== */}

            {step === 4 && (

              <div className="text-center py-8">

                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 border-4 border-emerald-200">

                  <CheckCircle2 size={44} />

                </div>


                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">

                  Booking Successful

                </span>


                <h2 className="text-3xl font-black text-black mt-3 mb-2">
                  Booking Confirmed!
                </h2>


                <p className="text-zinc-600 text-sm max-w-md mx-auto mb-6">

                  Thank you,{" "}

                  <strong className="text-black">
                    {form.name || "Attendee"}
                  </strong>

                  . Your booking has been successfully created.

                </p>


                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs text-zinc-600 space-y-2 mb-8">

                  <div className="flex justify-between border-b border-zinc-200 pb-2">

                    <span className="font-semibold text-zinc-400">
                      Booking Reference:
                    </span>

                    <span className="font-extrabold text-black font-mono text-sm">
                      {bookingId}
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span>
                      Event Name:
                    </span>

                    <span className="font-bold text-black">
                      {eventName}
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span>
                      Tickets Purchased:
                    </span>

                    <span className="font-bold text-black">
                      {qty} Entry Pass(es)
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span>
                      Total:
                    </span>

                    <span className="font-extrabold text-[#B58100] text-sm">
                      ₹{total}
                    </span>

                  </div>

                </div>


                <div className="flex flex-col sm:flex-row justify-center gap-4">

                  <button
                    type="button"
                    onClick={() =>
                      navigate('/bookings')
                    }
                    className="bg-[#FFB800] hover:bg-[#FFC52E] text-black font-bold px-8 py-3.5 rounded-2xl text-sm transition-all shadow-md"
                  >
                    View My Bookings
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      navigate('/events')
                    }
                    className="border border-zinc-300 hover:border-black text-black font-bold px-8 py-3.5 rounded-2xl text-sm transition-all"
                  >
                    Browse More Events
                  </button>

                </div>

              </div>

            )}

          </div>


          {/* ==========================================
              ORDER SUMMARY
          ========================================== */}

          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-md sticky top-28">

            <h3 className="font-bold text-base text-black mb-4 pb-3 border-b border-zinc-100 flex items-center justify-between">

              Order Summary

              <ShieldCheck
                size={18}
                className="text-emerald-600"
              />

            </h3>


            <div className="flex gap-4 mb-4">

              <img
                src={eventImage}
                alt={eventName}
                className="w-20 h-20 rounded-xl object-cover border border-zinc-200 shrink-0"
              />


              <div>

                <span className="text-[10px] font-bold bg-[#FFB800]/20 text-[#805B00] px-2 py-0.5 rounded">

                  {eventCategory}

                </span>


                <h4 className="font-extrabold text-sm text-black leading-tight mt-1 truncate max-w-[180px]">

                  {eventName}

                </h4>


                <p className="text-xs text-zinc-500 mt-1">

                  {eventDate}

                </p>

              </div>

            </div>


            <div className="text-xs space-y-2.5 text-zinc-600 mb-6 bg-zinc-50 p-4 border border-zinc-200 rounded-2xl">

              <div className="flex justify-between">

                <span>
                  Location:
                </span>

                <span className="font-semibold text-black truncate max-w-[170px]">

                  {eventLocation || eventVenue}

                </span>

              </div>


              <div className="flex justify-between">

                <span>
                  Price per ticket:
                </span>

                <span className="font-semibold text-black">
                  ₹{eventPrice}
                </span>

              </div>


              <div className="flex justify-between">

                <span>
                  Quantity:
                </span>

                <span className="font-semibold text-black">
                  {qty}
                </span>

              </div>


              <div className="flex justify-between">

                <span>
                  Booking Fee:
                </span>

                <span className="font-semibold text-emerald-600">
                  FREE
                </span>

              </div>

            </div>


            <div className="border-t border-zinc-200 pt-4 flex items-baseline justify-between">

              <span className="font-bold text-sm text-black">
                Total Payable
              </span>

              <span className="font-black text-2xl text-[#B58100]">
                ₹{total}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}