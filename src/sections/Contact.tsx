import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    restaurant: '',
    phone: '',
    email: '',
    package: '',
  });

  useEffect(() => {
    const content = sectionRef.current;
    if (content) {
      gsap.from(content, {
        scrollTrigger: {
          trigger: content,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({
      name: '',
      restaurant: '',
      phone: '',
      email: '',
      package: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="py-24 bg-brand-dark text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold rounded-full filter blur-3xl" />
      </div>

      <div
        ref={sectionRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
      >
        <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
          Ready to Fill Your Tables?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Book a free 15-minute consultation. We'll discuss your goals, answer your
          questions, and create a custom plan for your restaurant.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-4 text-left"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                name="restaurant"
                required
                value={formData.restaurant}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange"
                placeholder="Bistro 42"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-orange"
              placeholder="john@restaurant.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Interested Package
            </label>
            <select
              name="package"
              value={formData.package}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-brand-orange"
            >
              <option value="" className="text-gray-800">
                Select a package...
              </option>
              <option value="starter" className="text-gray-800">
                Starter - $299
              </option>
              <option value="growth" className="text-gray-800">
                Growth - $499
              </option>
              <option value="ultimate" className="text-gray-800">
                Ultimate - $799
              </option>
              <option value="custom" className="text-gray-800">
                Custom/Not sure yet
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full btn-primary py-4 rounded-xl font-semibold text-lg mt-6"
          >
            Book My Free Consultation
          </button>
          <p className="text-center text-sm text-gray-400 mt-4">
            We typically respond within 2 hours during business hours.
          </p>
        </form>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md bg-white rounded-3xl text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">You're All Set!</DialogTitle>
          </DialogHeader>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600 mb-6">
            Thanks for your interest. We'll be in touch within 2 hours to schedule your
            free consultation.
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full bg-brand-dark text-white py-3 rounded-xl font-semibold hover:bg-brand-dark/90 transition-colors"
          >
            Got it!
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
