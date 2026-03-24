import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './sections/Hero';
import SocialProof from './sections/SocialProof';
import Problem from './sections/Problem';
import Solution from './sections/Solution';
import Portfolio from './sections/Portfolio';
import Packages from './sections/Packages';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';

// Pages
import PortfolioPage from './pages/PortfolioPage';
import CheckoutPage from './pages/CheckoutPage';
import CustomPackagePage from './pages/CustomPackagePage';

// Home Page Component
function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <Solution />
        <Portfolio />
        <Packages />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/custom-package" element={<CustomPackagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
