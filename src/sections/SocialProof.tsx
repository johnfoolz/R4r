export default function SocialProof() {
  const restaurants = [
    "Marco's Bistro",
    'Sakura Sushi',
    'The Grill House',
    'Cafe Luna',
    'Spice Route',
  ];

  return (
    <section className="bg-brand-cream py-8 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
          <p className="text-gray-600 font-medium">Trusted by restaurants across the city:</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale">
            {restaurants.map((name) => (
              <span key={name} className="font-serif text-xl font-bold">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
