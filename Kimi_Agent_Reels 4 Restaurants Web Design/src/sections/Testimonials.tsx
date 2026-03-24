import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  restaurant: string;
  image: string;
}

export default function Testimonials() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
    if (cards) {
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 30,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.1,
          ease: 'power2.out',
        });
      });
    }
  }, []);

  const testimonials: Testimonial[] = [
    {
      quote:
        "We went from 200 followers to 15K in 3 months. The reels they created consistently hit over 100K views. Our weekend reservations are now booked 2 weeks out.",
      name: 'Marco Rossi',
      role: 'Owner',
      restaurant: "Marco's Bistro",
      image: 'https://images.unsplash.com/photo-1583394293214-28ez8ac94e4a?w=100&q=80',
    },
    {
      quote:
        "I was skeptical about video marketing, but the ROI has been incredible. One viral reel brought in 40 new customers in a single week. Worth every penny.",
      name: 'Sarah Chen',
      role: 'Owner',
      restaurant: 'Sakura Sushi',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
    },
    {
      quote:
        "The team is professional, fast, and understands exactly what works on social media. They made the entire process effortless. Highly recommend!",
      name: 'James Wilson',
      role: 'Owner',
      restaurant: 'The Grill House',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    },
  ];

  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-orange font-semibold mb-2 uppercase tracking-wide">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Restaurants Love Working With Us
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="testimonial-card bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.role}, {testimonial.restaurant}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
