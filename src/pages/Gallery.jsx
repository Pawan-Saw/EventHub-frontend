import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Eye, X, Image as ImageIcon, Search, Sparkles } from 'lucide-react'
import { galleryItems } from '../data/mockGallery'

const categories = ['Concerts', 'Sports', 'Corporate', 'Cultural']

const PARTNERS = [
  'Layers',
  'Sisyphus',
  'Capsule',
  'GlobalBank',
  'Luminous',
  'Alt+Shift'
]

export default function Gallery() {
  const [activeCats, setActiveCats] = useState([])
  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState(null)

  const toggleCat = (c) =>
    setActiveCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  const filtered = galleryItems.filter((g) => {
    const matchCat = activeCats.length === 0 || activeCats.includes(g.category)
    const matchQuery = g.title.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <div className="bg-white text-black min-h-screen">
      {/* =========================================================
          BLACK HERO SECTION FOR GALLERY
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
            <span className="text-white font-semibold">Gallery</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-[#FFB800] text-black text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  <ImageIcon size={13} /> {galleryItems.length}+ Event Moments
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Event Gallery & Memories
              </h1>
              <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl">
                Relive the crowd energy — photographs from concerts, sports tournaments, cultural parades, and corporate summits.
              </p>
            </div>

            <div className="flex items-center bg-[#141414] border border-zinc-800 rounded-2xl p-2.5 w-full md:w-96 shadow-xl">
              <Search size={18} className="text-zinc-400 ml-3 mr-2 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search moments by event title..."
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
              Discover event moments captured live.
            </h2>
            <div className="flex justify-center mt-5">
              <span className="inline-flex items-center bg-[#FFB800] text-black text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-sm tracking-wide">
                #EventMoments
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
        {/* Sidebar Filters */}
        <aside className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm lg:sticky lg:top-24">
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">Search Moments</label>
            <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-[#FFB800]">
              <Search size={15} className="text-zinc-400 mr-2 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by event title..."
                className="bg-transparent text-sm text-black outline-none w-full placeholder-zinc-400"
              />
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Categories</h3>
          <div className="space-y-2 mb-4">
            {categories.map((c) => {
              const count = galleryItems.filter((g) => g.category === c).length
              const isChecked = activeCats.includes(c)
              return (
                <label
                  key={c}
                  className={`flex items-center justify-between text-sm px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                    isChecked ? "bg-[#FFB800]/15 text-[#805B00] font-bold" : "text-zinc-600 hover:bg-zinc-50 font-medium"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCat(c)}
                      className="accent-[#FFB800] w-4 h-4 rounded cursor-pointer"
                    />
                    {c}
                  </span>
                  <span className="text-xs text-zinc-400">{count}</span>
                </label>
              )
            })}
          </div>

          {activeCats.length > 0 && (
            <button
              onClick={() => setActiveCats([])}
              className="text-xs text-[#B58100] font-bold hover:underline"
            >
              Clear selected filters
            </button>
          )}
        </aside>

        {/* Gallery Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-100">
            <p className="text-sm font-semibold text-zinc-500">
              Displaying <strong className="text-black">{filtered.length}</strong> photo memories
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-16 text-center text-zinc-500">
              <ImageIcon size={36} className="mx-auto mb-3 opacity-40 text-zinc-400" />
              <h3 className="text-base font-bold text-black mb-1">No Photos Found</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-4">Try adjusting your category selections or search term.</p>
              <button
                onClick={() => { setActiveCats([]); setQuery(''); }}
                className="bg-[#FFB800] text-black font-bold text-xs px-4 py-2 rounded-xl"
              >
                Reset Gallery Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPreview(item)}
                  className="group relative rounded-2xl overflow-hidden border border-zinc-200 cursor-pointer bg-zinc-100 shadow-sm hover:shadow-xl hover:border-[#FFB800] transition-all duration-300 h-64 flex flex-col justify-end"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-all" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full p-3">
                      <Eye size={24} />
                    </span>
                  </div>

                  <div className="relative p-5 text-white z-10">
                    <span className="inline-block bg-[#FFB800] text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-extrabold leading-tight text-white group-hover:text-[#FFB800] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1 font-medium">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>

      {/* Lightbox Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-black border border-zinc-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white border border-white/20 flex items-center justify-center hover:bg-[#FFB800] hover:text-black transition-all"
            >
              <X size={20} />
            </button>

            <div className="h-[400px] sm:h-[480px] relative bg-zinc-900">
              <img src={preview.image} alt={preview.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            </div>

            <div className="p-6 bg-[#0A0A0A] text-white border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="bg-[#FFB800] text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                  {preview.category}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">{preview.title}</h3>
                <p className="text-xs text-zinc-400 mt-1">Event Capture · {preview.date}</p>
              </div>

              <Link
                to="/events"
                onClick={() => setPreview(null)}
                className="bg-[#FFB800] hover:bg-[#FFC52E] text-black font-bold text-xs px-5 py-3 rounded-xl transition-all w-fit"
              >
                Book Similar Event →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
