import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Briefcase, 
  Building2, 
  LineChart, 
  Map, 
  HardHat, 
  TrendingUp, 
  Landmark,
  ArrowRight
} from 'lucide-react';

export default function StonehavenClone() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for the continuous "Nexus" line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#FDFDFD] text-slate-900 overflow-hidden font-sans">
      
      {/* 1. SCROLL CONTINUITY LINE (The "Nexus" thread) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-0 opacity-20 hidden md:block">
        <motion.div 
          className="w-full bg-blue-600 origin-top"
          style={{ scaleY: scrollYProgress, height: '100%' }}
        />
      </div>

      {/* 2. HEADER */}
      <header className="fixed top-0 w-full px-8 py-6 flex justify-between items-center z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold">S</div>
          <span className="font-semibold text-xl tracking-wide uppercase">Stonehaven</span>
        </motion.div>
        
        <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-slate-500">
          <a href="#" className="hover:text-blue-600 transition-colors">Affiliate Partners</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Companies</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Investors</a>
        </nav>

        <button className="px-6 py-2 border border-slate-900 rounded-full text-sm font-semibold hover:bg-slate-900 hover:text-white transition-all">
          LOG IN
        </button>
      </header>

      <main className="relative z-10">
        
        {/* 3. HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32">
          
          {/* Staggered Text Reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[7rem] font-bold leading-[0.9] tracking-tighter"
            >
              The <span className="text-blue-600">Nexus</span><br />
              of Capital and<br />
              Opportunity™
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Stonehaven is a <strong className="text-blue-600 font-semibold">broker dealer platform</strong> that supports 
            independent investment bankers & placement agents <strong className="text-blue-600 font-semibold">raise capital</strong>, 
            conduct <strong className="text-blue-600 font-semibold">M&A</strong> and execute secondaries with our proprietary operating system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button className="group px-8 py-4 bg-[#FF4F00] text-white rounded-full font-semibold text-lg hover:bg-[#E64600] transition-all flex items-center space-x-2">
              <span>Connect with Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-xs font-bold text-slate-400 tracking-widest uppercase">250+ Investment Opportunities</p>
          </motion.div>

          {/* Floaty Category Cards (Simulating the circular hover cards) */}
          <div className="w-full max-w-6xl mt-24 flex flex-wrap justify-center gap-4">
            {[
              { title: 'Venture Capital', stats: '24 Managers • 62 Deals', icon: <Briefcase /> },
              { title: 'Private Equity', stats: '17 Managers • 39 Deals', icon: <Building2 /> },
              { title: 'Private Credit', stats: '16 Managers • 6 Deals', icon: <LineChart /> },
              { title: 'Real Estate', stats: '32 Managers • 40 Deals', icon: <Map /> },
              { title: 'Infrastructure', stats: '3 Managers • 14 Deals', icon: <HardHat /> },
              { title: 'Long-Only', stats: '3 Managers', icon: <TrendingUp /> },
              { title: 'Public Companies', stats: 'Coming Soon', icon: <Landmark /> },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white border border-slate-100 shadow-xl shadow-slate-200/20 rounded-2xl p-6 w-48 h-48 flex flex-col justify-center items-center text-center cursor-pointer overflow-hidden"
              >
                <div className="text-blue-600 mb-4 transition-transform group-hover:-translate-y-2 group-hover:scale-110 duration-300">
                  {card.icon}
                </div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-2 transition-transform group-hover:-translate-y-2 duration-300">{card.title}</h3>
                
                {/* Reveal on hover */}
                <div className="absolute bottom-4 left-0 w-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <p className="text-xs text-slate-500 font-medium">{card.stats}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. THE NEXUS SECTION (Scroll-triggered complex graphic) */}
        <section className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center py-32 mt-32 relative">
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-200px" }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Capital Raising + M&A + Secondaries</h2>
            <p className="text-slate-400">The intersection of all market participants.</p>
          </motion.div>

          {/* Nexus Triangle Diagram */}
          <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
            
            {/* Center Orb */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
              className="absolute w-32 h-32 bg-blue-500 rounded-full shadow-[0_0_100px_rgba(59,130,246,0.6)] z-10 flex items-center justify-center"
            >
              <div className="w-16 h-16 bg-white rounded-full" />
            </motion.div>

            {/* Left Node: Companies */}
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: -250, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center"
            >
              <div className="w-48 h-48 bg-[#FFC700] rounded-tl-[100px] rounded-br-[100px] rounded-tr-2xl rounded-bl-2xl flex flex-col justify-center items-center text-slate-900 p-6 transform -rotate-12 hover:rotate-0 transition-all cursor-pointer">
                <h3 className="font-bold text-xl uppercase tracking-widest mb-2">Companies</h3>
                <p className="text-xs font-semibold">OPERATING COMPANIES<br/>ASSET MANAGERS</p>
              </div>
              <div className="mt-6 text-center">
                <p className="text-4xl font-bold">250+</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Active Opportunities</p>
              </div>
            </motion.div>

            {/* Top Node: Affiliate Partners */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: -250, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="mb-6 text-center">
                <p className="text-4xl font-bold">165+</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Supported on platform</p>
              </div>
              <div className="w-48 h-48 bg-[#FFC700] rounded-tr-[100px] rounded-bl-[100px] rounded-tl-2xl rounded-br-2xl flex flex-col justify-center items-center text-slate-900 p-6 transform rotate-12 hover:rotate-0 transition-all cursor-pointer">
                <h3 className="font-bold text-xl uppercase tracking-widest mb-2 text-center">Affiliate Partners</h3>
                <p className="text-xs font-semibold text-center">INVESTMENT BANKERS<br/>PLACEMENT AGENTS</p>
              </div>
            </motion.div>

            {/* Right Node: Investors */}
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 250, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute right-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center"
            >
              <div className="w-48 h-48 bg-[#FFC700] rounded-tr-[100px] rounded-bl-[100px] rounded-tl-2xl rounded-br-2xl flex flex-col justify-center items-center text-slate-900 p-6 transform -rotate-12 hover:rotate-0 transition-all cursor-pointer">
                <h3 className="font-bold text-xl uppercase tracking-widest mb-2 text-center">Investors</h3>
                <p className="text-xs font-semibold text-center">INSTITUTIONS<br/>FAMILY OFFICES<br/>HNWIS</p>
              </div>
              <div className="mt-6 text-center">
                <p className="text-4xl font-bold">$13B</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Transaction Volume</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 5. VALUE PROP SECTION (Scroll Reveal) */}
        <section className="min-h-screen bg-white py-32 px-8 flex flex-col justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            className="text-center max-w-4xl"
          >
            <p className="text-sm font-bold tracking-[0.2em] text-slate-400 mb-6 uppercase">Value Proposition</p>
            <h2 className="text-5xl font-bold tracking-tight mb-8">
              We have the infrastructure, technology and community for you to achieve <span className="text-blue-600">your goals</span>
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              Stonehaven empowers Affiliate Partners—investment bankers and placement agents—to better serve companies, asset managers, and investors through its vertically integrated broker-dealer infrastructure, technology, data, and collaboration ecosystem.
            </p>
          </motion.div>
        </section>

      </main>
    </div>
  );
}
