import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera, 
  Utensils, 
  ChefHat, 
  TrendingUp, 
  Plus, 
  Minus, 
  Check, 
  Info,
  Sparkles,
  Video
} from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ShootSection {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ElementType;
  selected: boolean;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export default function CustomPackagePage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
  });

  const [shootSections, setShootSections] = useState<ShootSection[]>([
    {
      id: 'ambiance',
      name: 'Ambiance & Experience',
      description: 'Capture the atmosphere, interior design, lighting, and overall dining experience that makes your restaurant unique.',
      price: 8000,
      icon: Camera,
      selected: false,
    },
    {
      id: 'dishes',
      name: 'Signature Dishes',
      description: 'Professional shots of your best dishes - plating, presentation, and those mouth-watering close-ups.',
      price: 10000,
      icon: Utensils,
      selected: false,
    },
    {
      id: 'recipe',
      name: 'Recipe Maker',
      description: 'Behind-the-scenes footage of your chef preparing a signature dish from start to finish.',
      price: 12000,
      icon: ChefHat,
      selected: false,
    },
    {
      id: 'trending',
      name: 'Trending Reels',
      description: 'Creative content based on current viral trends, challenges, and popular audio on social media.',
      price: 6000,
      icon: TrendingUp,
      selected: false,
    },
  ]);

  const [reelCount, setReelCount] = useState(5);
  const [reelDuration, setReelDuration] = useState<'short' | 'mixed' | 'extended'>('short');

  const [addOns, setAddOns] = useState<AddOn[]>([
    {
      id: 'color-grading',
      name: 'Premium Color Grading',
      description: 'Cinematic color correction and LUT application',
      price: 3000,
      selected: false,
    },
    {
      id: 'music',
      name: 'Licensed Music',
      description: 'Copyright-free trending audio and background music',
      price: 2000,
      selected: false,
    },
    {
      id: 'captions',
      name: 'Custom Captions & Hashtags',
      description: 'Professionally written captions with researched hashtags',
      price: 1500,
      selected: false,
    },
    {
      id: 'rush',
      name: 'Rush Delivery (24h)',
      description: 'Get your reels within 24 hours of the shoot',
      price: 5000,
      selected: false,
    },
  ]);

  const toggleSection = (id: string) => {
    setShootSections(sections =>
      sections.map(section =>
        section.id === id ? { ...section, selected: !section.selected } : section
      )
    );
  };

  const toggleAddOn = (id: string) => {
    setAddOns(addons =>
      addons.map(addon =>
        addon.id === id ? { ...addon, selected: !addon.selected } : addon
      )
    );
  };

  const calculateTotal = () => {
    const sectionsTotal = shootSections
      .filter(s => s.selected)
      .reduce((sum, s) => sum + s.price, 0);
    
    const reelPrice = reelCount * (reelDuration === 'short' ? 800 : reelDuration === 'mixed' ? 1200 : 1800);
    
    const addOnsTotal = addOns
      .filter(a => a.selected)
      .reduce((sum, a) => sum + a.price, 0);
    
    return sectionsTotal + reelPrice + addOnsTotal;
  };

  const selectedSectionsCount = shootSections.filter(s => s.selected).length;
  const total = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const durationOptions = [
    { id: 'short', label: 'Short (5-10 sec)', price: 800, description: 'Quick, punchy clips perfect for high engagement' },
    { id: 'mixed', label: 'Mixed (10-20 sec)', price: 1200, description: 'Balanced length for storytelling' },
    { id: 'extended', label: 'Extended (20-30 sec)', price: 1800, description: 'Longer format for detailed content' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-brand-orange transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Build Your <span className="gradient-text">Custom Package</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select exactly what you need. Mix and match shoot sections, choose your reel count, 
              and add extras to create the perfect package for your restaurant.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Builder */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Shoot Sections */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h2 className="font-semibold text-xl">Choose Shoot Sections</h2>
                    <p className="text-gray-500 text-sm">Select one or more sections for your shoot</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {shootSections.map((section) => (
                    <div
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        section.selected
                          ? 'border-brand-orange bg-brand-orange/5'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          section.selected ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          <section.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-semibold ${section.selected ? 'text-brand-orange' : ''}`}>
                              {section.name}
                            </h3>
                            <span className="font-bold text-brand-orange">{formatPrice(section.price)}</span>
                          </div>
                          <p className="text-sm text-gray-500">{section.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          section.selected ? 'border-brand-orange bg-brand-orange' : 'border-gray-300'
                        }`}>
                          {section.selected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Reel Count & Duration */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h2 className="font-semibold text-xl">Number of Reels</h2>
                    <p className="text-gray-500 text-sm">How many reels do you need?</p>
                  </div>
                </div>

                {/* Reel Count */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Total Reels</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setReelCount(Math.max(1, reelCount - 1))}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-2xl font-bold w-12 text-center">{reelCount}</span>
                      <button
                        onClick={() => setReelCount(Math.min(50, reelCount + 1))}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={reelCount}
                    onChange={(e) => setReelCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1 reel</span>
                    <span>50 reels</span>
                  </div>
                </div>

                {/* Duration Selection */}
                <div>
                  <p className="text-gray-600 mb-4">Reel Duration</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {durationOptions.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => setReelDuration(option.id as 'short' | 'mixed' | 'extended')}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          reelDuration === option.id
                            ? 'border-brand-orange bg-brand-orange/5'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-semibold ${reelDuration === option.id ? 'text-brand-orange' : ''}`}>
                            {option.label}
                          </span>
                          <span className="text-sm font-medium">{formatPrice(option.price)}/reel</span>
                        </div>
                        <p className="text-xs text-gray-500">{option.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Add-ons */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h2 className="font-semibold text-xl">Add-ons (Optional)</h2>
                    <p className="text-gray-500 text-sm">Enhance your package with these extras</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {addOns.map((addon) => (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        addon.selected
                          ? 'border-brand-orange bg-brand-orange/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          addon.selected ? 'border-brand-orange bg-brand-orange' : 'border-gray-300'
                        }`}>
                          {addon.selected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <p className={`font-medium ${addon.selected ? 'text-brand-orange' : ''}`}>{addon.name}</p>
                          <p className="text-sm text-gray-500">{addon.description}</p>
                        </div>
                      </div>
                      <span className="font-bold text-brand-orange">{formatPrice(addon.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h2 className="font-semibold text-xl">Your Details</h2>
                    <p className="text-gray-500 text-sm">We'll contact you to confirm your booking</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Restaurant Name *</label>
                      <input
                        type="text"
                        name="restaurantName"
                        required
                        value={formData.restaurantName}
                        onChange={(e) => setFormData({...formData, restaurantName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                        placeholder="e.g., Marco's Bistro"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="ownerName"
                        required
                        value={formData.ownerName}
                        onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                        placeholder="e.g., Ahmed Khan"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                        placeholder="ahmed@restaurant.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                        placeholder="+92 300 1234567"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={selectedSectionsCount === 0}
                    className="w-full btn-primary py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    Request Custom Quote
                  </button>

                  {selectedSectionsCount === 0 && (
                    <p className="text-center text-sm text-gray-500">
                      Please select at least one shoot section to continue
                    </p>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-28">
                <h2 className="font-semibold text-xl mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-orange" />
                  Package Summary
                </h2>

                {/* Selected Sections */}
                {selectedSectionsCount > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-3">Shoot Sections</p>
                    <div className="space-y-2">
                      {shootSections.filter(s => s.selected).map(section => (
                        <div key={section.id} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <section.icon className="w-4 h-4 text-gray-400" />
                            {section.name}
                          </span>
                          <span className="font-medium">{formatPrice(section.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reels */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <p className="text-sm text-gray-500 mb-3">Reels</p>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-gray-400" />
                      {reelCount} reels × {reelDuration === 'short' ? '5-10s' : reelDuration === 'mixed' ? '10-20s' : '20-30s'}
                    </span>
                    <span className="font-medium">
                      {formatPrice(reelCount * (reelDuration === 'short' ? 800 : reelDuration === 'mixed' ? 1200 : 1800))}
                    </span>
                  </div>
                </div>

                {/* Add-ons */}
                {addOns.filter(a => a.selected).length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <p className="text-sm text-gray-500 mb-3">Add-ons</p>
                    <div className="space-y-2">
                      {addOns.filter(a => a.selected).map(addon => (
                        <div key={addon.id} className="flex items-center justify-between text-sm">
                          <span>{addon.name}</span>
                          <span className="font-medium">{formatPrice(addon.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="bg-brand-cream rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Estimated Total</span>
                    <span className="text-2xl font-bold text-brand-orange">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Final price may vary based on specific requirements
                  </p>
                </div>

                {/* What's Included */}
                <div className="space-y-3">
                  <p className="font-medium text-sm">What's Always Included:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      Professional equipment
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      Expert videographer
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      Basic editing & cuts
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      48-hour delivery
                    </div>
                  </div>
                </div>

                {/* Help */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-orange transition-colors">
                        <Info className="w-4 h-4" />
                        Need help deciding?
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Contact us at hello@reels4restaurants.com or call +92 300 1234567 for a free consultation.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md bg-white rounded-3xl text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Quote Requested!</DialogTitle>
          </DialogHeader>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <p className="text-gray-600 mb-2">
            Thank you, <strong>{formData.ownerName}</strong>!
          </p>
          <p className="text-gray-600 mb-6">
            We've received your custom package request. Our team will review your selections and send you a detailed quote within 24 hours.
          </p>
          <div className="bg-brand-cream rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600">Estimated Total: <strong className="text-brand-orange text-lg">{formatPrice(total)}</strong></p>
            <p className="text-xs text-gray-500 mt-1">Final quote may vary</p>
          </div>
          <button
            onClick={() => {
              setShowSuccess(false);
              navigate('/');
            }}
            className="w-full btn-primary py-3 rounded-xl font-semibold"
          >
            Back to Home
          </button>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
