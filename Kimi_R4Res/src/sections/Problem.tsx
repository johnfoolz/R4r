import { useEffect, useRef } from 'react';
import { EyeOff, Clock, TrendingDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.problem-card');
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
          delay: i * 0.1,
          ease: 'power2.out',
        });
      });
    }
  }, []);

  const problems = [
    {
      icon: EyeOff,
      title: 'Low Engagement',
      description:
        'Your posts get buried. Static photos don\'t capture the sizzle, steam, and atmosphere that makes your restaurant special.',
    },
    {
      icon: Clock,
      title: 'No Time to Create',
      description:
        'You\'re busy running a restaurant. Learning video editing, trending audio, and posting schedules isn\'t realistic.',
    },
    {
      icon: TrendingDown,
      title: 'Empty Tables',
      description:
        'Without consistent visibility, potential diners choose your competitors—the ones showing up on their feeds daily.',
    },
  ];

  const stats = [
    { value: '49%', label: 'More engagement with video' },
    { value: '80%', label: 'Of diners check social first' },
    { value: '3x', label: 'More shares than images' },
    { value: '2.5x', label: 'Higher conversion rates' },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Your Food is Amazing.
            <br />
            But Is Anyone <span className="text-brand-orange">Seeing</span> It?
          </h2>
          <p className="text-xl text-gray-600">
            In a sea of static posts, video is the only thing that stops the scroll. But
            creating consistent, professional content is a full-time job you don't have
            time for.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="problem-card text-center p-8 rounded-2xl bg-gray-50 hover:bg-brand-orange/5 transition-colors group"
            >
              <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-orange/20 transition-colors">
                <problem.icon className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* The Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-brand-orange mb-2">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
