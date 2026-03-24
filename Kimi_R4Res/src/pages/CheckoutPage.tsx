import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, Shield, CreditCard, ArrowLeft, Lock, Star, Sparkles } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ElementType;
}

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string>(searchParams.get('package') || 'growth');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    preferredDate: '',
    notes: '',
  });

  const packages: Package[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 25000,
      description: 'Perfect for restaurants looking to dip their toes into video content.',
      icon: Star,
      features: [
        '8 short food reels (5-10 sec)',
        '1 video shoot (3 hours)',
        'Perfect for signature dishes',
        'Basic color grading',
        '48-hour delivery',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 40000,
      description: 'Ideal for restaurants ready to make a bigger splash online.',
      icon: Sparkles,
      popular: true,
      features: [
        '12 short reels (5-10 sec)',
        '2 extended reels (15-30 sec)',
        '1 video shoot (3 hours)',
        'Trending audio research',
        'Caption & hashtag strategy',
        '48-hour delivery',
      ],
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      price: 60000,
      description: 'Full video arsenal to maximize reach and dominate your market.',
      icon: Shield,
      features: [
        '10 short reels (5-10 sec)',
        '5 extended reels (15-30 sec)',
        '2 video shoots (3 hours each)',
        'Full social media strategy',
        'Posting schedule & management',
        'Priority support',
        '24-hour delivery',
      ],
    },
  ];

  const currentPackage = packages.find(p => p.id === selectedPackage) || packages[1];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setShowSuccess(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h1 className="font-serif text-3xl font-bold mb-2">Complete Your Booking</h1>
                <p className="text-gray-600 mb-8">Fill in your details and we'll get started on your reels.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Restaurant Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <div className="w-8 h-8 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange text-sm font-bold">1</div>
                      Restaurant Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Restaurant Name *</label>
                        <input
                          type="text"
                          name="restaurantName"
                          required
                          value={formData.restaurantName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                          placeholder="e.g., Marco's Bistro"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Owner/Manager Name *</label>
                        <input
                          type="text"
                          name="ownerName"
                          required
                          value={formData.ownerName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                          placeholder="e.g., Ahmed Khan"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                          placeholder="ahmed@restaurant.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                          placeholder="+92 300 1234567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Restaurant Address *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                        placeholder="Full address for the shoot"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Shoot Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <div className="w-8 h-8 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange text-sm font-bold">2</div>
                      Shoot Details
                    </h3>

                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Shoot Date *</label>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Notes</label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all resize-none"
                        placeholder="Any specific dishes, requirements, or questions..."
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Payment Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <div className="w-8 h-8 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange text-sm font-bold">3</div>
                      Payment
                    </h3>

                    <div className="bg-brand-cream rounded-xl p-4 flex items-center gap-3">
                      <Lock className="w-5 h-5 text-brand-orange" />
                      <span className="text-sm text-gray-600">Your payment is secured with SSL encryption</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVC</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Name on Card</label>
                      <input
                        type="text"
                        placeholder="Full name as on card"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full btn-primary py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Pay {formatPrice(currentPackage.price)} & Book Now
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    100% Satisfaction Guarantee • Cancel anytime
                  </p>
                </form>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-28">
                <h2 className="font-semibold text-lg mb-6">Order Summary</h2>

                {/* Package Selector */}
                <div className="space-y-3 mb-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPackage === pkg.id
                          ? 'border-brand-orange bg-brand-orange/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <pkg.icon className={`w-5 h-5 ${selectedPackage === pkg.id ? 'text-brand-orange' : 'text-gray-400'}`} />
                          <div>
                            <p className={`font-semibold ${selectedPackage === pkg.id ? 'text-brand-orange' : ''}`}>
                              {pkg.name}
                              {pkg.popular && (
                                <span className="ml-2 text-xs bg-brand-orange text-white px-2 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-500">{formatPrice(pkg.price)}</p>
                          </div>
                        </div>
                        {selectedPackage === pkg.id && (
                          <div className="w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected Package Details */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-semibold mb-4">What's Included:</h3>
                  <ul className="space-y-3">
                    {currentPackage.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total */}
                <div className="border-t border-gray-100 mt-6 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(currentPackage.price)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Tax (0%)</span>
                    <span className="font-medium">Rs 0</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-brand-orange">{formatPrice(currentPackage.price)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Check className="w-4 h-4 text-green-500" />
                    No hidden fees
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Check className="w-4 h-4 text-green-500" />
                    Cancel anytime
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Check className="w-4 h-4 text-green-500" />
                    100% satisfaction guarantee
                  </div>
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
            <DialogTitle className="text-2xl font-bold">Booking Confirmed!</DialogTitle>
          </DialogHeader>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <p className="text-gray-600 mb-2">
            Thank you for booking the <strong>{currentPackage.name}</strong> package!
          </p>
          <p className="text-gray-600 mb-6">
            We've sent a confirmation email to <strong>{formData.email}</strong>. Our team will contact you within 24 hours to schedule your shoot.
          </p>
          <div className="bg-brand-cream rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600">Order Total: <strong className="text-brand-orange text-lg">{formatPrice(currentPackage.price)}</strong></p>
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
