import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  BookOpen,
  Images
} from 'lucide-react'

import { EVENTS, HERO_COLLAGE } from '../services/mockData.js'

const PARTNERS = [
  'Layers',
  'Sisyphus',
  'Capsule',
  'GlobalBank',
  'Luminous',
  'Alt+Shift'
]

const BLOGS = [
  {
    id: 1,
    title: 'How to Plan an Unforgettable Event',
    description:
      'From choosing the right venue to managing guests, discover simple ways to create memorable events.',
    category: 'Event Planning'
  },
  {
    id: 2,
    title: 'Top Event Trends to Watch in 2026',
    description:
      'Explore the latest ideas, experiences and technologies changing the modern event industry.',
    category: 'Trends'
  },
  {
    id: 3,
    title: 'How to Choose the Perfect Event',
    description:
      'Music, technology, sports or culture — find the right event experience for you.',
    category: 'Experiences'
  }
]

export default function Home() {
  return (
    <div className="bg-white text-black">

      {/* =========================================================
          BLACK HOME / HERO SECTION
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#0A0A0A] text-white">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#FFB800]/10 blur-[120px] rounded-full" />
        </div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-20">

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Plan events, fully{' '}
              <span className="text-[#FFB800]">
                under control
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed">
              One platform to manage vendors, schedules and budgets —
              from start to finish.
            </p>

          </div>


          {/* =====================================================
              IMAGE COLLAGE (3D FLOATING ANIMATION)
          ===================================================== */}
          <div className="max-w-6xl mx-auto mt-14 perspective-1000">

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 py-6">

              {HERO_COLLAGE.map((src, index) => (
                <div
                  key={index}
                  className={`
                    relative overflow-hidden
                    w-28 h-36
                    sm:w-36 sm:h-48
                    md:w-40 md:h-56
                    lg:w-44 lg:h-60
                    rounded-2xl
                    border border-white/20
                    shadow-2xl shadow-black/80
                    transition-all duration-500 ease-out
                    hover:scale-115
                    hover:rotate-0
                    hover:z-30
                    hover:shadow-[#FFB800]/40
                    hover:border-[#FFB800]
                    cursor-pointer
                    transform-gpu
                    ${
                      index % 2 === 0
                        ? 'animate-float-3d-even'
                        : 'animate-float-3d-odd'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 0.4}s`
                  }}
                >
                  <img
                    src={src}
                    alt={`Event experience ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent hover:from-black/20 transition-all" />
                </div>
              ))}

            </div>

          </div>


          {/* =====================================================
              HERO BUTTON
          ===================================================== */}
          <div className="flex justify-center mt-14 pb-16">

            <Link
              to="/events"
              className="
                inline-flex items-center gap-2
                bg-[#FFB800]
                hover:bg-[#FFC52E]
                text-black
                font-semibold
                px-7 py-3.5
                rounded-xl
                transition-all duration-200
                hover:-translate-y-0.5
                shadow-lg shadow-[#FFB800]/10
              "
            >
              Start Manage Your Event
              <ArrowRight size={17} />
            </Link>

          </div>


          {/* =====================================================
              TRUSTED BY
          ===================================================== */}
          <div className="border-t border-[#222] py-9 pb-16">

            <div className="text-center">

              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 font-semibold">
                Trusted by 2500+ Organizations
              </p>

              <div className="
                flex
                flex-wrap
                justify-center
                items-center
                gap-x-12
                gap-y-5
                text-zinc-400
                font-semibold
                text-sm
              ">
                {PARTNERS.map((partner) => (
                  <span key={partner} className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#FFB800]" />
                    {partner}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          MAIN WHITE CONTENT CONTAINER (SEAMLESS CURVED TRANSITION)
      ========================================================= */}
      <div className="relative -mt-10 sm:-mt-14 bg-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] pt-14 md:pt-20 pb-16 shadow-2xl z-20 text-black">

        {/* EVENTS PREVIEW */}
        <section className="pb-16">

        <div className="max-w-7xl mx-auto px-6">

          {/* Center heading */}
          <div className="text-center mb-12">

            <h2 className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-black
              tracking-tight
              text-black
              max-w-2xl
              mx-auto
              leading-tight
            ">
              Discover events people are loving right now.
            </h2>

            <div className="flex justify-center mt-5">

              <span className="
                inline-flex
                items-center
                bg-[#FFB800]
                text-black
                text-xs
                sm:text-sm
                font-extrabold
                px-5
                py-2.5
                rounded-xl
                shadow-sm
                tracking-wide
              ">
                #MostPopularEvents
              </span>

            </div>

          </div>


          {/* =====================================================
              HORIZONTAL EVENT STRIP
          ===================================================== */}
          <div className="
            flex
            gap-5
            overflow-x-auto
            pb-5
            snap-x
            snap-mandatory
            [&::-webkit-scrollbar]:h-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-zinc-300
            [&::-webkit-scrollbar-thumb]:rounded-full
          ">

            {EVENTS.map((event) => (

              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="
                  group
                  relative
                  shrink-0
                  w-[245px]
                  sm:w-[270px]
                  md:w-[290px]
                  h-[390px]
                  rounded-2xl
                  overflow-hidden
                  snap-start
                  bg-zinc-100
                  shadow-md
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >

                {/* Event image */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Dark bottom gradient */}
                <div className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/20
                  to-transparent
                " />

                {/* Category */}
                <span className="
                  absolute
                  top-4
                  left-4
                  bg-white
                  text-black
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  px-3
                  py-1.5
                  rounded-md
                ">
                  {event.category}
                </span>


                {/* Event information */}
                <div className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-5
                  text-white
                ">

                  <h3 className="
                    text-xl
                    sm:text-2xl
                    font-extrabold
                    uppercase
                    leading-tight
                  ">
                    {event.title}
                  </h3>

                  <div className="
                    flex
                    items-center
                    gap-1.5
                    mt-2
                    text-white/75
                    text-xs
                  ">
                    <MapPin size={13} />
                    {event.location}
                  </div>

                  <div className="
                    flex
                    items-center
                    gap-1.5
                    mt-1
                    text-white/75
                    text-xs
                  ">
                    <Clock size={13} />
                    {event.date}
                  </div>

                </div>

              </Link>

            ))}

          </div>


          {/* View All Events */}
          <div className="flex justify-center mt-10">

            <Link
              to="/events"
              className="
                inline-flex
                items-center
                gap-2
                bg-[#FFB800]
                hover:bg-[#FFC52E]
                text-black
                font-semibold
                px-6
                py-3
                rounded-xl
                transition-all
                hover:-translate-y-0.5
              "
            >
              View All Events
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          GALLERY PREVIEW — WHITE
      ========================================================= */}
      <section className="py-20 border-t border-zinc-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-4
            mb-10
          ">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <Images
                  size={18}
                  className="text-[#FFB800]"
                />

                <span className="text-sm font-semibold text-[#B58100]">
                  Event Gallery
                </span>

              </div>

              <h2 className="
                text-3xl
                md:text-4xl
                font-extrabold
              ">
                Moments worth remembering.
              </h2>

              <p className="text-zinc-500 mt-3">
                Explore the energy, people and experiences behind EventHub.
              </p>

            </div>

            <Link
              to="/gallery"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                hover:text-[#B58100]
              "
            >
              View Gallery
              <ArrowRight size={16} />
            </Link>

          </div>


          {/* Gallery grid */}
          <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-4
            auto-rows-[170px]
            md:auto-rows-[210px]
          ">

            {HERO_COLLAGE.slice(0, 6).map((src, index) => (

              <Link
                key={index}
                to="/gallery"
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  ${
                    index === 0 || index === 5
                      ? 'md:row-span-2'
                      : ''
                  }
                `}
              >

                <img
                  src={src}
                  alt={`Gallery moment ${index + 1}`}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                <div className="
                  absolute
                  inset-0
                  bg-black/0
                  group-hover:bg-black/20
                  transition-colors
                " />

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          BLOG PREVIEW — WHITE
      ========================================================= */}
      <section className="bg-white py-20 border-t border-zinc-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-5
            mb-10
          ">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <BookOpen
                  size={18}
                  className="text-[#FFB800]"
                />

                <span className="text-sm font-semibold text-[#B58100]">
                  EventHub Stories
                </span>

              </div>

              <h2 className="
                text-3xl
                md:text-4xl
                font-extrabold
              ">
                Ideas, stories & event inspiration.
              </h2>

              <p className="text-zinc-500 mt-3">
                Tips and inspiration to make every event memorable.
              </p>

            </div>

            <Link
              to="/blog"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                hover:text-[#B58100]
              "
            >
              View All Blogs
              <ArrowRight size={16} />
            </Link>

          </div>


          {/* Blog cards */}
          <div className="
            grid
            md:grid-cols-3
            gap-6
          ">

            {BLOGS.map((blog, index) => (

              <Link
                key={blog.id}
                to="/blog"
                className="
                  group
                  rounded-2xl
                  border
                  border-zinc-200
                  overflow-hidden
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  bg-white
                "
              >

                <div className="h-52 overflow-hidden bg-zinc-100">

                  <img
                    src={HERO_COLLAGE[index % HERO_COLLAGE.length]}
                    alt={blog.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />

                </div>

                <div className="p-6">

                  <span className="
                    inline-block
                    bg-[#FFF4CC]
                    text-[#9A6D00]
                    text-[11px]
                    font-bold
                    px-3
                    py-1
                    rounded-full
                    mb-4
                  ">
                    {blog.category}
                  </span>

                  <h3 className="
                    text-xl
                    font-bold
                    leading-tight
                    group-hover:text-[#B58100]
                    transition-colors
                  ">
                    {blog.title}
                  </h3>

                  <p className="
                    text-zinc-500
                    text-sm
                    leading-relaxed
                    mt-3
                  ">
                    {blog.description}
                  </p>

                  <div className="
                    flex
                    items-center
                    gap-2
                    mt-5
                    text-sm
                    font-semibold
                  ">
                    Read Article
                    <ArrowRight
                      size={15}
                      className="
                        group-hover:translate-x-1
                        transition-transform
                      "
                    />
                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          LOGIN / REGISTER CTA — WHITE
      ========================================================= */}
      <section className="bg-white py-20">

        <div className="max-w-5xl mx-auto px-6">

          <div className="
            relative
            overflow-hidden
            rounded-3xl
            bg-[#0A0A0A]
            text-white
            px-7
            py-14
            md:px-14
            text-center
          ">

            <div className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-80
              h-40
              bg-[#FFB800]/10
              blur-[80px]
              rounded-full
            " />

            <div className="relative">

              <p className="
                text-[#FFB800]
                text-sm
                font-semibold
                mb-3
              ">
                READY TO GET STARTED?
              </p>

              <h2 className="
                text-3xl
                md:text-4xl
                font-extrabold
              ">
                Your next great experience starts here.
              </h2>

              <p className="
                text-zinc-400
                max-w-xl
                mx-auto
                mt-4
              ">
                Create your account, discover amazing events and
                manage all your bookings in one place.
              </p>

              <div className="
                flex
                flex-col
                sm:flex-row
                justify-center
                gap-3
                mt-8
              ">

                <Link
                  to="/register"
                  className="
                    inline-flex
                    justify-center
                    items-center
                    gap-2
                    bg-[#FFB800]
                    hover:bg-[#FFC52E]
                    text-black
                    font-semibold
                    px-7
                    py-3.5
                    rounded-xl
                  "
                >
                  Create Account
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/login"
                  className="
                    inline-flex
                    justify-center
                    items-center
                    px-7
                    py-3.5
                    rounded-xl
                    border
                    border-zinc-700
                    hover:border-zinc-400
                    font-semibold
                    transition-colors
                  "
                >
                  Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      </div>

    </div>
  )
}