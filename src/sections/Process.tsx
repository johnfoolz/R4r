import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = stepsRef.current?.querySelectorAll('.process-step');
    if (steps) {
      steps.forEach((step, i) => {
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
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

  const steps = [
    {
      number: '1',
      title: 'Discovery Call',
      description:
        'We learn about your restaurant, your goals, and what makes your food special. 15 minutes, zero pressure.',
    },
    {
      number: '2',
      title: 'Strategic Planning',
      description:
        'We research trending audio, plan your shot list, and schedule the shoot during your optimal hours.',
    },
    {
      number: '3',
      title: 'The Shoot',
      description:
        'Our team arrives with professional gear. We capture your food, ambiance, and personality—minimal disruption.',
    },
    {
      number: '4',
      title: 'Delivery & Growth',
      description:
        'Receive edited reels within 48 hours, ready to post. We provide captions, hashtags, and posting strategy.',
    },
  ];

  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-orange font-semibold mb-2 uppercase tracking-wide">
            How It Works
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Simple Process, Stunning Results
          </h2>
          <p className="text-xl text-gray-600">
            We handle everything so you can focus on what you do best—running your
            restaurant.
          </p>
        </div>

        <div ref={stepsRef} className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="process-step relative">
              <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
