import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopNav from './components/TopNav'; // Usar TopNav consistentemente
import Home from './pages/Home';
import GreenCoffee from './pages/GreenCoffee';
import ForRoasters from './pages/ForRoasters';
import Sustainability from './pages/Sustainability';
import Contact from './pages/Contact';
import MicrolotProduct from './pages/MicrolotProduct';
import Cart from './pages/Cart';

function AppLayout() {
  // Footer disabled site-wide to keep section flow.



  return (
    <div className={`min-h-screen bg-cream-50`}>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/green-coffee" element={<GreenCoffee />} />
          <Route path="/microlots/:slug" element={<MicrolotProduct />} />
          <Route path="/nanolots/:slug" element={<MicrolotProduct />} />
          <Route path="/cart" element={<Cart />} />
          {/* Nueva ruta para Farm manteniendo compatibilidad con /for-roasters */}
          <Route path="/farm"element={<ForRoasters />} />
          <Route path="/for-roasters" element={<ForRoasters />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {/* Footer removed per request */}
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

