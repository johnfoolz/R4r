import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Flame, Crown, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Package {
  id: string;
  name: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
  description: string;
  price: number;
  featured?: boolean;
  features: string[];
}

export default function Packages() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.package-card');
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const packages: Package[] = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Zap,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'For restaurants looking to dip their toes into video content.',
      price: 25000,
      features: [
        '8 short food reels (5-10 sec)',
        '1 video shoot (3 hours)',
        'Perfect for signature dishes',
        'Basic color grading',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      icon: Flame,
      iconColor: 'text-brand-orange',
      bgColor: 'bg-brand-orange/20',
      description: 'Ideal for restaurants ready to make a bigger splash online.',
      price: 40000,
      featured: true,
      features: [
        '12 short reels (5-10 sec)',
        '2 extended reels (15-30 sec)',
        '1 video shoot (3 hours)',
        'Trending audio research',
        'Caption & hashtag strategy',
      ],
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      icon: Crown,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Full video arsenal to maximize reach and dominate your market.',
      price: 60000,
      features: [
        '10 short reels (5-10 sec)',
        '5 extended reels (15-30 sec)',
        '2 video shoots (3 hours each)',
        'Full social media strategy',
        'Posting schedule & management',
        'Priority support',
      ],
    },
  ];

  return (
    <section id="packages" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-orange font-semibold mb-2 uppercase tracking-wide">
            Pricing
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Choose Your Package
          </h2>
          <p className="text-xl text-gray-600">
            Every restaurant is different. Whether you're just starting with video or
            want to dominate the feed, we've got you covered.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`package-card rounded-3xl p-8 shadow-lg ${
                pkg.featured
                  ? 'bg-brand-dark text-white featured relative scale-105 shadow-2xl'
                  : 'bg-white border border-gray-100'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div
                className={`w-12 h-12 ${pkg.bgColor} rounded-xl flex items-center justify-center mb-6`}
              >
                <pkg.icon className={`w-6 h-6 ${pkg.iconColor}`} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <p
                className={`mb-6 ${pkg.featured ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {pkg.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{formatPrice(pkg.price)}</span>
                <span className={pkg.featured ? 'text-gray-400' : 'text-gray-500'}>
                  /one-time
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        pkg.featured ? 'text-brand-orange' : 'text-green-500'
                      }`}
                    />
                    <span
                      className={pkg.featured ? 'text-gray-300' : 'text-gray-600'}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to={`/checkout?package=${pkg.id}`}
                className={`w-full py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                  pkg.featured
                    ? 'bg-brand-orange text-white hover:bg-brand-orange/90'
                    : 'border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white'
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need something specific?</p>
          <Link
            to="/custom-package"
            className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:gap-3 transition-all"
          >
            Build Your Custom Package
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            100% Satisfaction Guarantee • Cancel anytime • No hidden fees
          </p>
        </div>
      </div>
    </section>
  );
}
