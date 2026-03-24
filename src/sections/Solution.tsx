import { useEffect, useRef } from 'react';
import { Sparkles, Users, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Solution() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.solution-card');
    if (cards) {
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'power2.out',
        });
      });
    }
  }, []);

  const solutions = [
    {
      icon: Sparkles,
      title: 'Grab Attention',
      description:
        'Video stands out in social media feeds. It\'s more engaging than still photos or text. We create scroll-stopping moments.',
    },
    {
      icon: Users,
      title: 'Increase Awareness',
      description:
        'Show off your restaurant\'s vibe, the dishes you\'re proud of, and the customer experience. Build a brand people remember.',
    },
    {
      icon: TrendingUp,
      title: 'Boost Foot Traffic',
      description:
        'When people see what they\'re missing, they\'ll want to visit in person. We create desire that converts to reservations.',
    },
  ];

  return (
    <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            The Answer is Simple:
            <br />
            <span className="gradient-text">Video Content Marketing</span>
          </h2>
          <p className="text-xl text-gray-300">
            We don't just shoot videos. We create strategic content that drives real
            results—more reservations, more foot traffic, more revenue.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="solution-card bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 bg-brand-orange rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <solution.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
              <p className="text-gray-400 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
