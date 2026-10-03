import { useState, useMemo, useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles
} from 'lucide-react'

import EventCard from '../components/EventCard.jsx'

import { EVENTS } from '../services/mockData.js'

import { api } from '../services/api.js'


// =========================================================
// CATEGORIES
// =========================================================

const CATEGORIES = [
  "All Categories",
  "Music",
  "Tech",
  "Food",
  "Cultural",
  "Business"
]


// =========================================================
// PARTNERS
// =========================================================

const PARTNERS = [
  'Layers',
  'Sisyphus',
  'Capsule',
  'GlobalBank',
  'Luminous',
  'Alt+Shift'
]


export default function Events() {

  const [searchParams, setSearchParams] = useSearchParams()

  const urlSearch =
    searchParams.get('search') || ''


  // =========================================================
  // STATE
  // =========================================================

  const [category, setCategory] =
    useState("All Categories")

  const [query, setQuery] =
    useState(urlSearch)

  const [sort, setSort] =
    useState("latest")

  const [maxPrice, setMaxPrice] =
    useState(5000)

  const [eventsList, setEventsList] =
    useState(EVENTS)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")


  // =========================================================
  // SYNC URL SEARCH
  // =========================================================

  useEffect(() => {

    if (urlSearch !== query) {
      setQuery(urlSearch)
    }

  }, [urlSearch])


  // =========================================================
  // LOAD EVENTS FROM SPRING BOOT
  // =========================================================

  useEffect(() => {

    let isMounted = true

    setLoading(true)
    setError("")


    api.getEvents()

      .then((data) => {

        if (!isMounted) return


        if (
          data &&
          Array.isArray(data) &&
          data.length > 0
        ) {

          // =================================================
          // IMPORTANT:
          // Convert Spring Boot Event object
          // into the format expected by EventCard/UI
          // =================================================

          const formattedEvents = data.map((event) => {

            return {

              // Backend
              id: event?.id,

              // Backend: name
              // Frontend: title
              title:
                event?.name ||
                event?.title ||
                "Untitled Event",

              // Backend description
              description:
                event?.description ||
                "Join us for an amazing event experience.",

              // Backend venue
              venue:
                event?.venue ||
                "Venue not available",

              // Backend may not have location
              location:
                event?.location ||
                event?.venue ||
                "Location not available",

              // Backend: eventDate
              // Frontend: date
              date:
                event?.eventDate ||
                event?.date ||
                "Date not available",

              // Keep time if backend has it
              time:
                event?.time ||
                "",

              // Backend: ticketPrice
              // Frontend: price
              price:
                Number(
                  event?.ticketPrice ??
                  event?.price ??
                  0
                ),

              // Backend available seats
              availableSeats:
                Number(
                  event?.availableSeats ??
                  0
                ),

              // Backend may not have category
              category:
                event?.category ||
                "Other",

              // Keep image if backend has one
              image:
                event?.image ||
                "",

              // Keep any other backend properties
              ...event

            }

          })


          setEventsList(formattedEvents)

        } else {

          // Empty backend response
          setEventsList([])

        }

      })

      .catch((err) => {

        console.error(
          "Failed to fetch events:",
          err
        )


        if (isMounted) {

          setError(
            err?.message ||
            "Unable to connect to the backend."
          )

          // Do NOT silently use fake data
          // when backend is being tested.
          setEventsList([])

        }

      })

      .finally(() => {

        if (isMounted) {
          setLoading(false)
        }

      })


    return () => {
      isMounted = false
    }

  }, [])


  // =========================================================
  // FILTER + SEARCH + SORT
  // =========================================================

  const filtered = useMemo(() => {

    let list = eventsList.filter((e) => {

      // -----------------------------------------------------
      // CATEGORY
      // -----------------------------------------------------

      const eventCategory =
        String(
          e?.category || ""
        )


      const matchCategory =
        category === "All Categories" ||
        eventCategory === category


      // -----------------------------------------------------
      // SEARCH
      // -----------------------------------------------------

      const eventTitle =
        String(
          e?.title ||
          e?.name ||
          ""
        ).toLowerCase()


      const eventLocation =
        String(
          e?.location ||
          e?.venue ||
          ""
        ).toLowerCase()


      const searchQuery =
        String(
          query || ""
        ).toLowerCase().trim()


      const matchQuery =
        !searchQuery ||
        eventTitle.includes(searchQuery) ||
        eventLocation.includes(searchQuery)


      // -----------------------------------------------------
      // PRICE
      // -----------------------------------------------------

      const eventPrice =
        Number(
          e?.price ??
          e?.ticketPrice ??
          0
        )


      const matchPrice =
        eventPrice <= maxPrice


      return (
        matchCategory &&
        matchQuery &&
        matchPrice
      )

    })


    // =======================================================
    // SORTING
    // =======================================================

    if (sort === "price-low") {

      list = [...list].sort(
        (a, b) =>
          Number(a?.price || 0) -
          Number(b?.price || 0)
      )

    }


    if (sort === "price-high") {

      list = [...list].sort(
        (a, b) =>
          Number(b?.price || 0) -
          Number(a?.price || 0)
      )

    }


    return list

  }, [
    eventsList,
    category,
    query,
    sort,
    maxPrice
  ])


  // =========================================================
  // RESET FILTERS
  // =========================================================

  const resetFilters = () => {

    setCategory("All Categories")

    setQuery("")

    setSort("latest")

    setMaxPrice(5000)

    setSearchParams({})

  }


  // =========================================================
  // CATEGORY COUNT
  // =========================================================

  const getCategoryCount = (cat) => {

    if (cat === "All Categories") {
      return eventsList.length
    }


    return eventsList.filter(
      (event) =>
        String(
          event?.category || ""
        ) === cat
    ).length

  }


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (

      <div className="bg-white min-h-screen">

        {/* BLACK HEADER SKELETON */}

        <section className="bg-[#0A0A0A] text-white pt-10 pb-20">

          <div className="max-w-7xl mx-auto px-6">

            <div className="h-5 w-32 bg-zinc-800 rounded mb-5 animate-pulse" />

            <div className="h-12 w-96 max-w-full bg-zinc-800 rounded mb-4 animate-pulse" />

            <div className="h-5 w-full max-w-xl bg-zinc-800 rounded animate-pulse" />

          </div>

        </section>


        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid lg:grid-cols-[260px_1fr] gap-10">

            <div className="h-96 bg-zinc-100 rounded-2xl animate-pulse" />

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

              {[1, 2, 3, 4, 5, 6].map((item) => (

                <div
                  key={item}
                  className="h-80 bg-zinc-100 rounded-2xl animate-pulse"
                />

              ))}

            </div>

          </div>

        </div>

      </div>

    )

  }


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="bg-white text-black min-h-screen">


      {/* =====================================================
          BLACK HERO SECTION FOR EVENTS
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#0A0A0A] text-white pt-10 pb-20">


        {/* Background glow */}

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FFB800]/10 blur-[120px] rounded-full" />

        </div>


        <div className="relative max-w-7xl mx-auto px-6">


          {/* HERO HEADER */}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12">


            <div>

              <div className="flex items-center gap-2 mb-2">

                <span className="bg-[#FFB800] text-black text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">

                  Explore & Book

                </span>


                <span className="text-xs text-zinc-400">

                  Over {eventsList.length}+ Active Events

                </span>

              </div>


              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">

                Upcoming Events & Experiences

              </h1>


              <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">

                Find music festivals, tech summits, food carnivals, and cultural parades near you.

              </p>

            </div>


            {/* SEARCH */}

            <div className="flex items-center bg-[#141414] border border-zinc-800 rounded-2xl p-2.5 w-full md:w-96 shadow-xl">

              <Search
                size={18}
                className="text-zinc-400 ml-3 mr-2 shrink-0"
              />


              <input
                value={query}

                onChange={(e) => {

                  const value =
                    e.target.value

                  setQuery(value)

                  if (!value) {
                    setSearchParams({})
                  }

                }}

                placeholder="Search by event title or city..."

                className="bg-transparent text-sm text-white outline-none w-full placeholder-zinc-500 py-1.5"
              />


              {query && (

                <button
                  onClick={() => {

                    setQuery("")
                    setSearchParams({})

                  }}

                  className="text-xs text-zinc-400 hover:text-white px-2 font-medium"
                >

                  Clear

                </button>

              )}

            </div>

          </div>


          {/* TRUSTED PARTNERS */}

          <div className="border-t border-zinc-800/80 pt-8 pb-10">

            <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 font-semibold">

              Trusted by 2500+ Event Organizers

            </p>


            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-zinc-400 font-semibold text-sm">

              {PARTNERS.map((partner) => (

                <span
                  key={partner}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >

                  <span className="w-2 h-2 rounded-full bg-[#FFB800]" />

                  {partner}

                </span>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CURVED TOP WHITE CONTAINER
      ===================================================== */}

      <section className="relative -mt-10 sm:-mt-14 bg-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] pt-14 pb-20 shadow-2xl z-20 text-black">


        <div className="max-w-7xl mx-auto px-6">


          {/* HEADER */}

          <div className="text-center mb-12">

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black max-w-2xl mx-auto leading-tight">

              Discover events people are loving right now.

            </h2>


            <div className="flex justify-center mt-5">

              <span className="inline-flex items-center bg-[#FFB800] text-black text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-sm tracking-wide">

                #MostPopularEvents

              </span>

            </div>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-5">

              <p className="text-red-700 text-sm font-semibold">

                Backend connection error:

              </p>

              <p className="text-red-600 text-sm mt-1">

                {error}

              </p>

              <button
                onClick={() =>
                  window.location.reload()
                }

                className="mt-4 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
              >

                Retry

              </button>

            </div>

          )}


          {/* =================================================
              MAIN GRID CONTENT
          ================================================= */}

          <div className="grid lg:grid-cols-[260px_1fr] gap-10">


            {/* =================================================
                SIDEBAR FILTERS
            ================================================= */}

            <aside className="space-y-6">


              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">


                {/* FILTER HEADER */}

                <div className="flex items-center justify-between font-bold text-base mb-5 pb-3 border-b border-zinc-100">

                  <span className="flex items-center gap-2 text-black">

                    <SlidersHorizontal
                      size={17}
                      className="text-[#FFB800]"
                    />

                    Filters

                  </span>


                  {(category !== "All Categories" ||
                    query ||
                    maxPrice < 5000) && (

                    <button
                      onClick={resetFilters}
                      className="text-xs text-zinc-500 hover:text-[#B58100] flex items-center gap-1 font-semibold"
                    >

                      <RotateCcw size={12} />

                      Reset

                    </button>

                  )}

                </div>


                {/* CATEGORIES */}

                <div className="mb-6">

                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">

                    Categories

                  </h4>


                  <div className="space-y-2">

                    {CATEGORIES.map((c) => (

                      <label
                        key={c}
                        className={`flex items-center justify-between text-sm px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                          category === c
                            ? "bg-[#FFB800]/15 text-[#805B00] font-bold"
                            : "text-zinc-600 hover:bg-zinc-50 hover:text-black font-medium"
                        }`}
                      >

                        <span className="flex items-center gap-2.5">

                          <input
                            type="radio"
                            name="category"
                            checked={
                              category === c
                            }
                            onChange={() =>
                              setCategory(c)
                            }
                            className="accent-[#FFB800] w-4 h-4 cursor-pointer"
                          />

                          {c}

                        </span>


                        <span className="text-xs text-zinc-400">

                          {getCategoryCount(c)}

                        </span>

                      </label>

                    ))}

                  </div>

                </div>


                {/* PRICE RANGE */}

                <div>

                  <div className="flex justify-between items-center mb-2">

                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">

                      Max Ticket Price

                    </h4>


                    <span className="font-extrabold text-sm text-[#B58100]">

                      ₹{maxPrice}

                    </span>

                  </div>


                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(
                        Number(e.target.value)
                      )
                    }
                    className="w-full accent-[#FFB800] cursor-pointer"
                  />


                  <div className="flex justify-between text-xs text-zinc-400 mt-1.5 font-medium">

                    <span>
                      ₹200
                    </span>

                    <span>
                      ₹5000
                    </span>

                  </div>

                </div>

              </div>

            </aside>


            {/* =================================================
                LISTING COLUMN
            ================================================= */}

            <div>


              {/* HEADER CONTROLS */}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-100">


                <div>

                  <h2 className="text-xl font-bold text-black">

                    Showing {filtered.length}{" "}

                    {filtered.length === 1
                      ? 'Event'
                      : 'Events'}

                  </h2>


                  {category !== "All Categories" && (

                    <p className="text-xs text-zinc-500 mt-0.5">

                      Category:{" "}

                      <span className="font-semibold text-black">

                        {category}

                      </span>

                    </p>

                  )}

                </div>


                <div className="flex items-center gap-3">

                  <span className="text-xs font-semibold text-zinc-500 whitespace-nowrap">

                    Sort By:

                  </span>


                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(e.target.value)
                    }
                    className="bg-white border border-zinc-200 rounded-xl text-sm font-semibold px-4 py-2.5 outline-none focus:border-[#FFB800] transition-colors cursor-pointer shadow-sm"
                  >

                    <option value="latest">
                      Featured & Latest
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                  </select>

                </div>

              </div>


              {/* =================================================
                  EVENTS
              ================================================= */}

              {filtered.length === 0 ? (

                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-12 text-center">

                  <Sparkles
                    size={36}
                    className="text-[#FFB800] mx-auto mb-3 opacity-80"
                  />


                  <h3 className="text-lg font-bold text-black mb-1">

                    No Events Found

                  </h3>


                  <p className="text-zinc-500 text-sm max-w-sm mx-auto mb-6">

                    We couldn't find any events matching your search or selected filters.

                  </p>


                  <button
                    onClick={resetFilters}
                    className="bg-[#FFB800] hover:bg-[#FFC52E] text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
                  >

                    Reset All Filters

                  </button>

                </div>

              ) : (

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

                  {filtered.map((ev) => (

                    <EventCard
                      key={ev.id}
                      event={ev}
                    />

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </section>

    </div>

  )

}