import { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  image: string;
  views: string;
  result: string;
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedReel, setSelectedReel] = useState<PortfolioItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filters = ['All', 'Fine Dining', 'Casual', 'Bars'];

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      name: "Marco's Bistro",
      category: 'Fine Dining',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
      views: '2.3M',
      result: '40% increase in reservations',
    },
    {
      id: '2',
      name: 'Sakura Sushi',
      category: 'Japanese',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80',
      views: '1.8M',
      result: 'Sold out omakase nights',
    },
    {
      id: '3',
      name: 'The Grill House',
      category: 'Steakhouse',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
      views: '3.1M',
      result: '60% boost in weekend bookings',
    },
    {
      id: '4',
      name: 'Cafe Luna',
      category: 'Casual',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80',
      views: '1.2M',
      result: '2x increase in brunch traffic',
    },
    {
      id: '5',
      name: 'Spice Route',
      category: 'Fine Dining',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
      views: '890K',
      result: 'Fully booked weekends',
    },
    {
      id: '6',
      name: 'The Rusty Anchor',
      category: 'Bars',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80',
      views: '2.1M',
      result: '45% increase in happy hour',
    },
  ];

  const filteredItems =
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter(
          (item) =>
            item.category === activeFilter ||
            (activeFilter === 'Fine Dining' && item.category === 'Japanese') ||
            (activeFilter === 'Casual' && item.category === 'Casual') ||
            (activeFilter === 'Bars' && item.category === 'Bars')
        );

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.portfolio-item');
    if (items) {
      items.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out',
        });
      });
    }
  }, [filteredItems]);

  return (
    <section id="work" ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <p className="text-brand-orange font-semibold mb-2 uppercase tracking-wide">
              Our Work
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">Recent Reels</h2>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-brand-dark text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="portfolio-item group cursor-pointer"
              onClick={() => setSelectedReel(item)}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-brand-orange ml-1" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </div>
              </div>
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm">
                {item.views} views • {item.result}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          to= "src/pages/PortfolioPage.tsx"
          <button className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:gap-3 transition-all">
            View Full Portfolio
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reel Modal */}
      <Dialog open={!!selectedReel} onOpenChange={() => setSelectedReel(null)}>
        <DialogContent className="max-w-2xl bg-brand-dark text-white border-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedReel?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-[9/16] max-h-[60vh] flex items-center justify-center bg-black/50 rounded-xl">
            <div className="text-center p-8">
              <Play className="w-16 h-16 mx-auto mb-4 text-brand-orange" />
              <p className="text-lg">Reel preview would play here</p>
              <p className="text-gray-400 text-sm mt-2">
                {selectedReel?.views} views • {selectedReel?.result}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
