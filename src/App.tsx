import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopNav from './components/TopNav'; // Usar TopNav consistentemente
import Footer from './components/Footer';
import Home from './pages/Home';
import GreenCoffee from './pages/GreenCoffee';
import ForRoasters from './pages/ForRoasters';
import RoastedCoffee from './pages/RoastedCoffee';
import Sustainability from './pages/Sustainability';
import About from './pages/About';
import Contact from './pages/Contact';

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isGreen = location.pathname === "/green-coffee";

  // En Home, el TopNav se renderiza con lógica especial.
  // En las demás páginas, se renderiza con fondo claro.
  const showFooter = !isHome && !isGreen; 

  return (
    <div className={`min-h-screen bg-cream-50 ${isHome ? "overflow-hidden" : ""}`}>
      {/* Renderiza TopNav en todas las páginas EXCEPTO en Home y GreenCoffee (que tiene su propio TopNav) */}
      {!isHome && !isGreen && <TopNav onLight={false} />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/green-coffee" element={<GreenCoffee />} />
          <Route path="/for-roasters" element={<ForRoasters />} />
          <Route path="/roasted-coffee" element={<RoastedCoffee />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
