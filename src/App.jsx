import { Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'
import Events from './pages/Events.jsx'
import EventDetails from './pages/EventDetails.jsx'
import BookTicket from './pages/BookTicket.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Bookings from './pages/Bookings.jsx'
import Profile from './pages/Profile.jsx'
import Gallery from './pages/Gallery.jsx'
import Blog from './pages/Blog.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-1">

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Home redirects */}
          <Route
            path="/Home"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />

          {/* Events */}
          <Route
            path="/events"
            element={<Events />}
          />

          {/* Event Details */}
          <Route
            path="/events/:id"
            element={<EventDetails />}
          />

          {/* Booking */}
          <Route
            path="/book/:id"
            element={<BookTicket />}
          />

          {/* Gallery */}
          <Route
            path="/gallery"
            element={<Gallery />}
          />

          {/* Blog */}
          <Route
            path="/blog"
            element={<Blog />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* User */}
          <Route
            path="/bookings"
            element={<Bookings />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Unknown URL */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </main>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  )
}