import { useState, useEffect, useRef } from 'react';
import { Play, Filter, X, Eye, ThumbsUp, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

interface Reel {
  id: string;
  title: string;
  restaurant: string;
  category: string;
  youtubeId: string;
  thumbnail: string;
  views: string;
  likes: string;
  duration: string;
  description: string;
  results: string;
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Fine Dining', 'Casual Dining', 'Cafes', 'Bars', 'Fast Food'];

  const reels: Reel[] = [
    {
      id: '1',
      title: 'Signature Pasta Making',
      restaurant: "Marco's Bistro",
      category: 'Fine Dining',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
      views: '2.3M',
      likes: '45K',
      duration: '0:45',
      description: 'Behind-the-scenes look at our handmade pasta process that captivated millions.',
      results: '40% increase in weekend reservations',
    },
    {
      id: '2',
      title: 'Omakase Experience',
      restaurant: 'Sakura Sushi',
      category: 'Fine Dining',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
      views: '1.8M',
      likes: '38K',
      duration: '0:52',
      description: 'An intimate journey through our 12-course omakase menu.',
      results: 'Sold out omakase nights for 3 months',
    },
    {
      id: '3',
      title: 'Perfect Steak Sear',
      restaurant: 'The Grill House',
      category: 'Fine Dining',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
      views: '3.1M',
      likes: '62K',
      duration: '0:38',
      description: 'The satisfying sizzle of our dry-aged ribeye hitting the grill.',
      results: '60% boost in weekend bookings',
    },
    {
      id: '4',
      title: 'Brunch Vibes',
      restaurant: 'Cafe Luna',
      category: 'Cafes',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
      views: '1.2M',
      likes: '28K',
      duration: '0:41',
      description: 'Sunday brunch atmosphere that keeps customers coming back.',
      results: '2x increase in brunch traffic',
    },
    {
      id: '5',
      title: 'Spice Symphony',
      restaurant: 'Spice Route',
      category: 'Fine Dining',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
      views: '890K',
      likes: '22K',
      duration: '0:48',
      description: 'A colorful celebration of authentic Indian flavors.',
      results: 'Fully booked weekends',
    },
    {
      id: '6',
      title: 'Happy Hour Energy',
      restaurant: 'The Rusty Anchor',
      category: 'Bars',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80',
      views: '2.1M',
      likes: '51K',
      duration: '0:35',
      description: 'The electric atmosphere of our Friday happy hour.',
      results: '45% increase in happy hour sales',
    },
    {
      id: '7',
      title: 'Burger Assembly',
      restaurant: 'Burger Joint',
      category: 'Fast Food',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
      views: '4.2M',
      likes: '89K',
      duration: '0:28',
      description: 'Satisfying burger build that went viral overnight.',
      results: '3x increase in daily orders',
    },
    {
      id: '8',
      title: 'Pizza Perfection',
      restaurant: 'Napoli Pizzeria',
      category: 'Casual Dining',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
      views: '1.5M',
      likes: '34K',
      duration: '0:42',
      description: 'Wood-fired pizza with that perfect leopard spotting.',
      results: '50% increase in takeout orders',
    },
    {
      id: '9',
      title: 'Cocktail Crafting',
      restaurant: 'Mixology Bar',
      category: 'Bars',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
      views: '980K',
      likes: '26K',
      duration: '0:55',
      description: 'Artisanal cocktail creation that mesmerizes viewers.',
      results: '35% increase in bar traffic',
    },
  ];

  const filteredReels = activeFilter === 'All' 
    ? reels 
    : reels.filter(reel => reel.category === activeFilter);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.reel-card');
    if (items) {
      gsap.fromTo(items, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [filteredReels]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold rounded-full filter blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-brand-orange font-semibold mb-2 uppercase tracking-wide">Our Portfolio</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Watch Our <span className="gradient-text">Best Work</span>
            </h1>
            <p className="text-xl text-gray-300">
              Browse through our collection of viral restaurant reels that have helped businesses 
              across Pakistan fill their tables and grow their following.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-cream py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-brand-orange">50+</p>
              <p className="text-gray-600 text-sm">Restaurants Served</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-orange">15M+</p>
              <p className="text-gray-600 text-sm">Total Views</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-orange">200+</p>
              <p className="text-gray-600 text-sm">Reels Created</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-orange">98%</p>
              <p className="text-gray-600 text-sm">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h2 className="font-serif text-3xl font-bold">All Reels</h2>
            
            {/* Desktop Filter */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === cat
                      ? 'bg-brand-orange text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              Filter: {activeFilter}
            </button>
          </div>

          {/* Mobile Filter Dropdown */}
          {isFilterOpen && (
            <div className="md:hidden mb-6 bg-white border border-gray-200 rounded-2xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Select Category</span>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveFilter(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === cat
                        ? 'bg-brand-orange text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reels Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReels.map((reel) => (
              <div
                key={reel.id}
                className="reel-card group cursor-pointer"
                onClick={() => setSelectedReel(reel)}
              >
                {/* Thumbnail with Play Button */}
                <div className="relative rounded-2xl overflow-hidden aspect-video mb-4 shadow-lg">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {reel.duration}
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                    {reel.category}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg group-hover:text-brand-orange transition-colors">
                    {reel.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{reel.restaurant}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{reel.description}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {reel.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {reel.likes}
                    </span>
                  </div>

                  {/* Results Badge */}
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium mt-2">
                    {reel.results}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReels.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No reels found in this category.</p>
              <button
                onClick={() => setActiveFilter('All')}
                className="mt-4 text-brand-orange font-semibold hover:underline"
              >
                View all reels
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedReel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedReel(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-brand-dark rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReel(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* YouTube Embed */}
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedReel.youtubeId}?autoplay=1`}
                title={selectedReel.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedReel.title}</h3>
                  <p className="text-gray-400">{selectedReel.restaurant}</p>
                </div>
                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                  {selectedReel.results}
                </div>
              </div>
              <p className="text-gray-300 mb-4">{selectedReel.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {selectedReel.views} views
                </span>
                <span className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  {selectedReel.likes} likes
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedReel.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
