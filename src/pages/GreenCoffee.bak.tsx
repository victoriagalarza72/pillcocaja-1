import React from 'react';import { Download, Mountain, Thermometer, Droplets, Calendar } from 'lucide-react';
const GreenCoffee: React.FC = () => {  const heroBg = new URL('../assets/images/cafe7.png', import.meta.url).href;  const microlots = [    { id: 1, name: 'Honey Typica Premium', variety: 'Typica', process: 'Honey', altitude: '1,800 masl', notes: ['Citrus','Caramel','Floral'], score: 86, availability: 'Available', image: new URL('../assets/images/cafe3.jpg', import.meta.url).href, specUrl: '#' },    { id: 2, name: 'Natural Bourbon Select', variety: 'Red Bourbon', process: 'Natural', altitude: '1,950 masl', notes: ['Berry','Chocolate','Wine'], score: 88, availability: 'Limited', image: new URL('../assets/images/cafe4.jpg', import.meta.url).href, specUrl: '#' },    { id: 3, name: 'Washed Geisha Exclusive', variety: 'Geisha', process: 'Washed', altitude: '2,000 masl', notes: ['Jasmine','Bergamot','Tea-like'], score: 92, availability: 'Sold Out', image: new URL('../assets/images/cafe5.jpg', import.meta.url).href, specUrl: '#' },  ];  const harvestCalendar = [    { month: 'May', activity: 'Harvest Begins', status: 'active' },    { month: 'Jun', activity: 'Peak Harvest', status: 'active' },    { month: 'Jul', activity: 'Processing', status: 'active' },    { month: 'Aug', activity: 'Drying & Milling', status: 'complete' },    { month: 'Sep', activity: 'Quality Control', status: 'complete' },    { month: 'Oct', activity: 'Export Ready', status: 'complete' },  ];  return (    <div>      {/* Hero */}      <section        className="relative h-screen bg-cover bg-center text-white flex items-center"        style={{ backgroundImage: `url(${heroBg})` }}      >        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />        <div className="relative w-full">          <div className="container-width text-center">            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">Green Coffee Microlots</h1>            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 hero-desc">              Discover our meticulously crafted single-origin lots from the pristine Yunguilla Valley, each with its own unique character and story.            </p>          </div>        </div>      </section>      {/* Current Microlots — estilo póster */}      <section className="section-padding bg-cream-50">        <div className="container-width">          <h2 className="font-serif text-2xl md:text-3xl font-bold text-center text-forest-900 mb-12">Current Microlots</h2><div className="flex flex-wrap justify-center gap-0">  {microlots.map((lot) => (    <a      key={lot.id}      href={lot.specUrl}      className={`poster poster-tight w-[280px] md:w-[320px] ${lot.id === 1 ? 'tint-cacao' : lot.id === 2 ? 'tint-forest' : 'tint-violet'}`}      aria-label={`${lot.name} spec sheet`}    >  <div className="poster-aspect-3x4">    <img src={lot.image} alt={lot.name} className="poster-media" loading="lazy" />    <div className="poster-dim" />    <div className="poster-top">{lot.notes.join(' \u00B7 ')}</div>    <div className="poster-bottom">      <h3 className="poster-title">{lot.name}</h3>      <p className="poster-meta">{lot.variety} · {lot.process} · {lot.altitude}</p>    </div>    <div className="poster-hover flex items-end justify-center">      <h3 className="font-serif text-xl font-bold text-forest-900">{lot.name}</h3>      <p className="text-gray-600 text-sm mt-1">        {lot.variety} · {lot.process} · {lot.altitude} — {lot.score} pts      </p>      <div className="flex flex-wrap gap-2 mt-4 notes-list">        {lot.notes.map(n => (          <span key={n} className="px-3 py-1 rounded-full text-xs bg-cream-200 text-cacao-800">{n}</span>        ))}      </div>      <div className="only-cta flex items-center justify-center">        <span className="poster-cta poster-cta--white">          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>            <polyline points="7 10 12 15 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>            <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>          </svg>          Download Spec Sheet        </span>      </div>    </div>  </div>    </a>  ))}</div>        </div>      </section>      {/* Yunguilla Terroir (igual) */}      {/* Yunguilla Terroir (refined split layout) */}
      <section className="relative section-padding bg-white overflow-hidden min-h-screen">
        {/* Fixed right half image (50vw) */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[50vw] z-0">
          <img
            src={(new URL('../assets/images/cafe9.jpg', import.meta.url).href)}
            alt="Yunguilla Valley"
            className="w-full h-full object-cover"
          />
          <div className="absolute -left-6 top-0 h-full w-12 bg-white rounded-r-full" aria-hidden></div>
        </div>
        <div className="container-width relative z-10">
          <div className="relative lg:pr-[54vw]">
            {/* Text panel with subtle illustration */}
            <div className="relative bg-white py-12 px-6 md:px-12 overflow-hidden lg:h-screen lg:overflow-y-auto no-scrollbar">
              <img
                src={(new URL('../assets/illustrations/montana.svg', import.meta.url).href)}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-10 object-contain w-full h-full"
              />
              <div className="uppercase tracking-[0.18em] text-xs text-forest-700/70 mb-3">Yunguilla Valley · Azuay, Ecuador</div>
              <h2 className="font-serif text-5xl md:text-6xl font-extrabold text-forest-900 leading-tight mb-5">
                The Yunguilla Terroir
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xl">
                Nestled in the Andean foothills between 1,500–2,000 meters above sea level, the Yunguilla Valley
                offers a singular microclimate where cool mountain air, rich volcanic soils and filtered sunlight
                bring clarity and elegance to the cup.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-800">1,800m</div>
                  <div className="text-xs text-gray-600">Avg. Altitude</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-800">22°C</div>
                  <div className="text-xs text-gray-600">Avg. Temp</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest-800">1,200mm</div>
                  <div className="text-xs text-gray-600">Annual Rainfall</div>
                </div>
              </div>
              <div className="mt-10 space-y-6 max-w-2xl">
                <div className="relative w-full pt-100p shadow-md">
                  <img src={(new URL('../assets/images/cafe9.jpg', import.meta.url).href)} alt="Raised drying beds" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative w-full pt-100p shadow">
                    <img src={(new URL('../assets/images/cafe8.png', import.meta.url).href)} alt="Coffee detail" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="relative w-full pt-100p shadow">
                    <img src={(new URL('../assets/images/cafehoney.png', import.meta.url).href)} alt="Honey process" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
            {/* Image sits absolutely on the right; no second column here */}
          </div>
        </div>
      </section>      {/* Harvest Calendar (igual) */}      <section className="section-padding bg-gradient-to-r from-cream-100 to-forest-50">        <div className="container-width">          <div className="text-center mb-12">            <h2 className="font-serif text-4xl font-bold text-forest-900 mb-6">Harvest Calendar & Availability</h2>            <p className="text-lg text-gray-700 max-w-2xl mx-auto">              Follow our harvest and processing timeline to understand when our exceptional lots become available for export.            </p>          </div>          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">            {harvestCalendar.map((item) => (              <div key={item.month} className={`bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 ${item.status === 'active' ? 'ring-2 ring-cacao-500' : ''}`}>                <div className="flex items-center justify-center mb-4">                  <Calendar className={`h-8 w-8 ${item.status === 'active' ? 'text-cacao-600' : item.status === 'complete' ? 'text-green-600' : 'text-gray-400'}`} />                </div>                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">{item.month}</h3>                <p className="text-gray-600 mb-3">{item.activity}</p>                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'active' ? 'bg-cacao-100 text-cacao-800' : item.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>                  {item.status === 'active' ? 'In Progress' : item.status === 'complete' ? 'Complete' : 'Upcoming'}                </div>              </div>            ))}          </div>        </div>      </section>    </div>  );};export default GreenCoffee;













