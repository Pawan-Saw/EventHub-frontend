import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Calendar, Clock, Newspaper, Search, User, ArrowRight, X } from 'lucide-react'
import { blogPosts } from '../data/mockBlog'

const categories = ['All', 'Music', 'Corporate', 'Trends', 'Guides']

const PARTNERS = [
  'Layers',
  'Sisyphus',
  'Capsule',
  'GlobalBank',
  'Luminous',
  'Alt+Shift'
]

export default function Blog() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const [readingPost, setReadingPost] = useState(null)

  const filtered = blogPosts.filter((p) => {
    const matchCat = active === 'All' || p.category === active
    const matchQuery = p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  const [featured, ...rest] = filtered

  return (
    <div className="bg-white text-black min-h-screen">
      {/* =========================================================
          BLACK HERO SECTION FOR BLOG
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#0A0A0A] text-white pt-10 pb-20">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FFB800]/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4 font-medium">
            <Link to="/" className="hover:text-[#FFB800] transition">Home</Link>
            <ChevronRight size={13} />
            <span className="text-white font-semibold">Blog</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-[#FFB800] text-black text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  <Newspaper size={13} /> EventHub Journal
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Event Stories, Trends & Guides
              </h1>
              <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">
                Tips, industry insights, and inspiration for organizers, hosts, and event enthusiasts.
              </p>
            </div>

            <div className="flex items-center bg-[#141414] border border-zinc-800 rounded-2xl p-2.5 w-full md:w-96 shadow-xl">
              <Search size={18} className="text-zinc-400 ml-3 mr-2 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles & guides..."
                className="bg-transparent text-sm text-white outline-none w-full placeholder-zinc-500 py-1.5"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-xs text-zinc-400 hover:text-white px-2 font-medium">
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Trusted by Partners Strip */}
          <div className="border-t border-zinc-800/80 pt-8 pb-10">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 font-semibold">
              Trusted by 2500+ Event Organizers
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-zinc-400 font-semibold text-sm">
              {PARTNERS.map((partner) => (
                <span key={partner} className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="w-2 h-2 rounded-full bg-[#FFB800]" />
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CURVED TOP WHITE CONTAINER (MATCHING DESIGN)
      ========================================================= */}
      <section className="relative -mt-10 sm:-mt-14 bg-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] pt-14 pb-20 shadow-2xl z-20 text-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header section matching screenshot layout */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black max-w-2xl mx-auto leading-tight">
              Discover insights, stories & event guides.
            </h2>
            <div className="flex justify-center mt-5">
              <span className="inline-flex items-center bg-[#FFB800] text-black text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-sm tracking-wide">
                #EventHubJournal
              </span>
            </div>
          </div>
        
        {/* Category bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all ${
                  active === c
                    ? 'bg-[#FFB800] text-black shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-white border border-zinc-200 rounded-xl px-3.5 py-2 w-full md:w-72 focus-within:border-[#FFB800] shadow-sm">
            <Search size={15} className="text-zinc-400 mr-2 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="bg-transparent text-sm text-black outline-none w-full placeholder-zinc-400"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-16 text-center text-zinc-500">
            <Newspaper size={36} className="mx-auto mb-3 text-zinc-400 opacity-60" />
            <h3 className="text-base font-bold text-black mb-1">No Articles Found</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-4">We couldn't find any stories matching your search terms.</p>
            <button
              onClick={() => { setActive('All'); setQuery(''); }}
              className="bg-[#FFB800] text-black font-bold text-xs px-4 py-2.5 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Post Card */}
            {featured && (
              <div
                onClick={() => setReadingPost(featured)}
                className="bg-white border border-zinc-200 rounded-3xl overflow-hidden mb-12 grid grid-cols-1 lg:grid-cols-2 shadow-md hover:shadow-xl hover:border-[#FFB800] transition-all cursor-pointer group"
              >
                <div className="h-64 lg:h-full bg-zinc-100 relative overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-black/80 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-md">
                    Featured Story
                  </span>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-between bg-white">
                  <div>
                    <span className="inline-block bg-[#FFB800]/20 text-[#805B00] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md mb-4">
                      {featured.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-4 leading-tight group-hover:text-[#B58100] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6 pt-4 border-t border-zinc-100">
                      <span className="flex items-center gap-1.5 font-semibold text-zinc-700">
                        <User size={13} className="text-[#FFB800]" /> {featured.author || 'EventHub Team'}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Calendar size={13} /> {featured.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {featured.readTime}</span>
                    </div>

                    <span className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFC52E] text-black font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-sm">
                      Read Full Article
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Rest of Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <article
                  key={post.id}
                  onClick={() => setReadingPost(post)}
                  className="bg-white border border-zinc-200 rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl hover:border-[#FFB800] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 overflow-hidden bg-zinc-100 relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-extrabold text-lg text-black mb-2 leading-snug group-hover:text-[#B58100] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-100 pt-4 mt-2">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1 font-semibold text-zinc-700"><Clock size={12} /> {post.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
        </div>
      </section>

      {/* Article Reading Drawer Modal */}
      {readingPost && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setReadingPost(null)}
        >
          <div
            className="bg-white rounded-3xl border border-zinc-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="h-64 sm:h-80 relative bg-black">
              <img src={readingPost.image} alt={readingPost.title} className="w-full h-full object-cover opacity-90" />
              <button
                onClick={() => setReadingPost(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white border border-white/20 flex items-center justify-center hover:bg-[#FFB800] hover:text-black transition-all"
              >
                <X size={20} />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="bg-[#FFB800] text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded w-fit mb-2">
                  {readingPost.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">{readingPost.title}</h2>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-4 text-xs text-zinc-500 pb-6 border-b border-zinc-100 mb-6">
                <span className="font-bold text-black flex items-center gap-1"><User size={14} className="text-[#FFB800]" /> By {readingPost.author || 'EventHub Editorial'}</span>
                <span>·</span>
                <span>{readingPost.date}</span>
                <span>·</span>
                <span>{readingPost.readTime}</span>
              </div>

              <div className="prose max-w-none text-zinc-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p className="font-semibold text-zinc-900 text-base leading-relaxed">
                  {readingPost.excerpt}
                </p>
                <div className="whitespace-pre-line">
                  {readingPost.content || "Full article text content..."}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-zinc-100 flex items-center justify-between">
                <Link
                  to="/events"
                  onClick={() => setReadingPost(null)}
                  className="bg-[#FFB800] hover:bg-[#FFC52E] text-black font-extrabold text-xs px-6 py-3 rounded-xl transition-all"
                >
                  Explore Upcoming Events
                </Link>
                <button
                  onClick={() => setReadingPost(null)}
                  className="text-xs font-bold text-zinc-500 hover:text-black"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
