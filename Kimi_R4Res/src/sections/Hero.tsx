import { useEffect, useRef } from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.2,
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-dark">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80"
            alt="Restaurant kitchen"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="hero-video-overlay absolute inset-0" />
      </div>

      {/* Floating Food Elements */}
      <div className="absolute top-32 right-10 w-32 h-32 animate-float opacity-20 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80"
          alt="Pizza"
          className="rounded-full shadow-2xl"
        />
      </div>
      <div
        className="absolute bottom-32 left-10 w-40 h-40 animate-float opacity-20 hidden lg:block"
        style={{ animationDelay: '2s' }}
      >
        <img
          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=80"
          alt="Salad"
          className="rounded-full shadow-2xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Now booking for April 2026</span>
            </div>

            <h1
              ref={textRef}
              className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 reveal-text"
            >
              We Turn <span className="gradient-text">Scrollers</span> Into Diners
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Professional short-form video content that fills your tables. We handle
              everything—shooting, strategy, and posting.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => scrollToSection('packages')}
                className="btn-primary px-8 py-4 rounded-full font-semibold text-lg text-center flex items-center justify-center gap-2"
              >
                See Packages & Pricing
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('work')}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg text-center border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Our Work
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Same-week delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>50+ restaurants served</span>
              </div>
            </div>
          </div>

          {/* Hero Video Preview */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Restaurant interior"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button
                  onClick={() => scrollToSection('work')}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                >
                  <Play className="w-8 h-8 text-brand-orange ml-1" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <p className="font-semibold text-sm">@marcobistro • 2.3M views</p>
                <p className="text-xs text-gray-600">
                  "This reel brought us 40 new reservations in one week"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce-slow">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
