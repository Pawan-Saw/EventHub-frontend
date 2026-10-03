const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api"


async function request(path, options = {}) {

  const token = localStorage.getItem("eventra_token")

  // Login/Register request ke saath old JWT nahi bhejna
  const isAuthRequest =
    path === "/auth/login" ||
    path === "/auth/register"


  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,

    headers: {
      "Content-Type": "application/json",

      // Sirf protected APIs ke liye JWT
      ...(!isAuthRequest && token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  })


  // =========================
  // ERROR HANDLING
  // =========================

  if (!response.ok) {

    let errorMessage =
      `Request failed with status ${response.status}`

    try {

      const contentType =
        response.headers.get("content-type") || ""


      if (contentType.includes("application/json")) {

        const errorData = await response.json()

        if (typeof errorData === "string") {
          errorMessage = errorData
        }
        else if (errorData?.message) {
          errorMessage = errorData.message
        }

      } else {

        const errorText = await response.text()

        if (errorText) {
          errorMessage = errorText
        }
      }

    } catch {
      // Ignore parsing error
    }


    if (response.status === 401) {
      errorMessage = "Invalid email or password."
    }


    if (response.status === 409) {
      errorMessage =
        "Email already registered. Please login."
    }


    throw new Error(errorMessage)
  }


  // =========================
  // NO CONTENT
  // =========================

  if (response.status === 204) {
    return null
  }


  // =========================
  // RESPONSE
  // =========================

  const contentType =
    response.headers.get("content-type") || ""


  if (contentType.includes("application/json")) {
    return response.json()
  }


  // JWT login response is plain text
  return response.text()
}


// ========================================
// API
// ========================================

export const api = {

  // =========================
  // AUTH
  // =========================

  register: (data) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),


  login: (data) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),


  // =========================
  // EVENTS
  // =========================

  getEvents: () =>
    request("/events"),


  getEventById: (id) =>
    request(`/events/${id}`),


  // =========================
  // BOOKINGS
  // =========================

  createBooking: (eventId, data) =>
    request(`/bookings/event/${eventId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),


  getAllBookings: () =>
    request("/bookings"),


  getMyBookings: () =>
    request("/bookings"),


  getBookingById: (id) =>
    request(`/bookings/${id}`),


  // =========================
  // PROFILE
  // =========================

  getProfile: () =>
    request("/users/me"),


  updateProfile: (data) =>
    request("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}