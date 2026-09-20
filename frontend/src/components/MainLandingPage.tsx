import React from 'react';
import { Link } from 'react-router-dom';

export default function MainLandingPage() {
  return (
    <div className="w-full min-h-screen font-sans bg-slate-50">
      
{/*  BEGIN: MainHeader  */}

{/*  END: MainHeader  */}
<main>
{/*  BEGIN: HeroSection  */}
<section className="relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F1EA] to-[#EDE8DE]/40 pt-12 pb-20 border-b border-slate-200/80 overflow-hidden" data-purpose="hero-section">
<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
{/*  Hero Left Column: Narrative Content  */}
<div className="lg:col-span-7 pr-0 lg:pr-4">
{/*  Tag Badge  */}
<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/[0.06] text-slate-800 text-xs font-semibold tracking-wider uppercase mb-7">
<span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Real businesses. Real opportunities.
          </div>
{/*  Hero Headline  */}
<h1 className="font-serif-hero text-5xl md:text-[62px] leading-[1.12] text-slate-900 font-normal tracking-[-0.015em] mb-6">
            Small businesses<br />
            move the world.<br />
<span className="font-semibold text-emerald-700">Let's back them.</span>
</h1>
{/*  Hero Subtitle  */}
<p className="text-lg md:text-[19px] text-slate-600 max-w-xl leading-relaxed mb-9">
            LenderX connects creditworthy small businesses with global capital — using AI, transparency, and trust.
          </p>
{/*  CTAs  */}
<div className="flex flex-wrap items-center gap-4 mb-14">
<Link className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-full font-semibold text-[15px] shadow-sm hover:shadow-md transition inline-flex items-center gap-2" to="/borrower">
<span className="">I want to get a loan</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" aria-hidden="true" className="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
</Link>
<Link className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 px-7 py-3.5 rounded-full font-semibold text-[15px] shadow-sm transition inline-flex items-center gap-2" to="/lender">
<span className="">I want to invest</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" aria-hidden="true" className="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
</Link>
</div>
{/*  Key Value Props Row  */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-stone-300/70">
{/*  Prop 1  */}
<div className="flex items-start gap-2.5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="users" aria-hidden="true" className="lucide lucide-users w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
<div>
<h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Fair Access</h4>
<p className="text-xs text-slate-600 mt-0.5 leading-snug">Data-driven, not relationship-driven</p>
</div>
</div>
{/*  Prop 2  */}
<div className="flex items-start gap-2.5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="globe" aria-hidden="true" className="lucide lucide-globe w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
<div>
<h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Global Capital</h4>
<p className="text-xs text-slate-600 mt-0.5 leading-snug">Borderless investment opportunities</p>
</div>
</div>
{/*  Prop 3  */}
<div className="flex items-start gap-2.5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="shield-check" aria-hidden="true" className="lucide lucide-shield-check w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
<div>
<h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Real Impact</h4>
<p className="text-xs text-slate-600 mt-0.5 leading-snug">Stronger communities everywhere</p>
</div>
</div>
{/*  Prop 4  */}
<div className="flex items-start gap-2.5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="sprout" aria-hidden="true" className="lucide lucide-sprout w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"></path><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"></path><path d="M5 21h14"></path></svg>
<div>
<h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Sustainable Returns</h4>
<p className="text-xs text-slate-600 mt-0.5 leading-snug">Inclusive growth with attractive yields</p>
</div>
</div>
</div>
</div>
{/*  Hero Right Column: Human Authenticity Visual Composition  */}
<div className="lg:col-span-5 relative flex justify-center">
<div className="relative w-full max-w-[460px] rounded-3xl overflow-hidden shadow-2xl bg-stone-100 border-4 border-white">
{/*  Main Imagery: Portrait of Priya, Bakery Owner  */}
<div className="relative h-[560px]">
<img alt="Amina K. smiling bakery owner in her artisan shop" className="w-full h-full object-cover object-center brightness-[0.98]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF-stl_u4s_KPJxz1BeeqDHhRGzoTEhjPGnEoerJyVgcWoxVQT4uVeOVGM_f-QbylwXDk_GSlO0tbrrY52ZG6V1m5tdWypRTdS5hlEiiS8HwD4e1B1zbt8tDsN2P78YKTEyU_Js2fmY9ncBjAoivRkaxTtuabZiAvZAj8fsI_QMk_xhD6dmMOutncrd2xRUUA55TG51PYGqBEa0jQqx-xY2NboDiWqnJyoI6LDpskiC-_wYojO-o6g" />
{/*  Top Hanging Chalkboard & Banner Simulation in Composition  */}
<div className="absolute top-4 left-4 z-10 chalk-board px-4 py-3 rounded-lg text-stone-100 max-w-[150px] text-center rotate-[-2deg]">
<p className="font-serif italic text-sm leading-tight text-amber-100">Good Products</p>
<p className="text-[11px] uppercase tracking-wider text-stone-300 mt-1">Stronger</p>
<p className="text-[11px] uppercase tracking-wider text-stone-300">Communities</p>
<div className="text-amber-200 text-xs mt-0.5">♡</div>
</div>
<div className="absolute top-4 right-4 z-10 canvas-banner px-3 py-4 rounded text-center max-w-[140px] rotate-[1.5deg]">
<p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-900 leading-tight">
                  A BRIGHTER TOMORROW IS A LOCAL BUSINESS TODAY
                </p>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="sprout" aria-hidden="true" className="lucide lucide-sprout w-3.5 h-3.5 mx-auto text-emerald-700 mt-1.5"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"></path><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"></path><path d="M5 21h14"></path></svg>
</div>
{/*  Customer Testimonial Floating Card  */}
<div className="absolute bottom-5 inset-x-5 bg-black/60 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white shadow-lg">
<p className="text-[13.5px] italic leading-relaxed text-stone-100">
                  “This loan helped me buy new equipment and serve more customers. LenderX believed in my business.”
                </p>
<div className="mt-2.5 flex items-center justify-between text-xs text-amber-200 font-medium">
<span className="">— Amina K., Bakery Owner, Kenya</span>
<span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" aria-hidden="true" className="lucide lucide-check w-3 h-3"><path d="M20 6 9 17l-5-5"></path></svg> Verified Borrower
                  </span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  END: HeroSection  */}
{/*  BEGIN: ProofBarMetrics  */}
<section className="bg-white py-12 border-b border-slate-200" data-purpose="proof-bar">
<div className="max-w-7xl mx-auto px-6">
<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
{/*  Metric 1  */}
<div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-6 first:pl-0">
<div className="w-13 h-13 p-3 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="users" aria-hidden="true" className="lucide lucide-users w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
</div>
<div>
<div className="text-3xl font-bold text-slate-900 tracking-[0.03em]">1,200+</div>
<div className="text-sm text-slate-600 font-medium tracking-[0.01em]">Small businesses supported</div>
</div>
</div>
{/*  Metric 2  */}
<div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-6">
<div className="w-13 h-13 p-3 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="globe-2" aria-hidden="true" className="lucide lucide-globe-2 w-6 h-6"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path><circle cx="12" cy="12" r="10"></circle></svg>
</div>
<div>
<div className="text-3xl font-bold text-slate-900 tracking-[0.03em]">15+</div>
<div className="text-sm text-slate-600 font-medium tracking-[0.01em]">Countries (and growing)</div>
</div>
</div>
{/*  Metric 3  */}
<div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-6">
<div className="w-13 h-13 p-3 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="bar-chart-3" aria-hidden="true" className="lucide lucide-bar-chart-3 w-6 h-6"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
</div>
<div>
<div className="text-3xl font-bold text-slate-900 tracking-[0.03em]">$12M+</div>
<div className="text-sm text-slate-600 font-medium tracking-[0.01em]">Capital deployed</div>
</div>
</div>
{/*  Metric 4  */}
<div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-6">
<div className="w-13 h-13 p-3 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="sprout" aria-hidden="true" className="lucide lucide-sprout w-6 h-6"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"></path><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"></path><path d="M5 21h14"></path></svg>
</div>
<div>
<div className="text-3xl font-bold text-slate-900 tracking-[0.03em]">92%</div>
<div className="text-sm text-slate-600 font-medium tracking-[0.01em]">Repayment success rate</div>
</div>
</div>
</div>
</div>
</section>
{/*  END: ProofBarMetrics  */}
{/*  BEGIN: DualAudienceBreakdown  */}
<section className="py-20 bg-stone-50/70" data-purpose="audience-split">
<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
{/*  Card 1: For Borrowers  */}
<article className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col justify-between" id="for-borrowers">
<div>
<div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-5">
              For Borrowers
            </div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
<div className="md:col-span-7">
<h2 className="font-serif-hero text-3xl font-normal text-slate-900 leading-tight mb-3">
                  Access capital<br />to grow your business
                </h2>
<p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Quick, transparent, and fair loans — powered by your real business data, not just your credit history.
                </p>
{/*  Value Checklist  */}
<ul className="space-y-3 mb-8">
<li className="flex items-center gap-2.5 text-[14.5px] text-slate-700">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" aria-hidden="true" className="lucide lucide-check w-3 h-3"><path d="M20 6 9 17l-5-5"></path></svg>
</div>
<span className="">Simple application (upload your documents)</span>
</li>
<li className="flex items-center gap-2.5 text-[14.5px] text-slate-700">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" aria-hidden="true" className="lucide lucide-check w-3 h-3"><path d="M20 6 9 17l-5-5"></path></svg>
</div>
<span className="">AI-assisted, faster decisions</span>
</li>
<li className="flex items-center gap-2.5 text-[14.5px] text-slate-700">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" aria-hidden="true" className="lucide lucide-check w-3 h-3"><path d="M20 6 9 17l-5-5"></path></svg>
</div>
<span className="">Build your credit ladder</span>
</li>
<li className="flex items-center gap-2.5 text-[14.5px] text-slate-700">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" aria-hidden="true" className="lucide lucide-check w-3 h-3"><path d="M20 6 9 17l-5-5"></path></svg>
</div>
<span className="">Join a global community of entrepreneurs</span>
</li>
</ul>
</div>
{/*  Borrowers Image Vignette  */}
<div className="md:col-span-5 flex justify-center">
<div className="w-full max-w-[210px] h-[250px] rounded-2xl overflow-hidden shadow-md">
<img alt="African artisan woodworker in his workshop" className="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKmGMaesKUcLjIhFjN6X-me9U1W7idEstM7tdFVseUWjQMZ9kpz09qtTWMdeaCCLbR3xfErseJypIr4ZDy9gjmk9PG3ESYqBrOQdPi1Ng27ip3st_UlWj6iBjHZHUyfnDz5Rqd9kOkzfuSEF5bpy22CyraSFByVhoLEafVHrIgWYckiTpqK6sB7PHY4ji2Tl3zfrU3eeSjsgzaUJNTkXJ-cueYCYUViZfP4QzvGCxhB88Xp2X4wuIQ" />
</div>
</div>
</div>
</div>
<div>
<Link className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition shadow-sm" to="/wizard">
<span className="">Get a Loan</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" aria-hidden="true" className="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
</Link>
</div>
</article>
{/*  Card 2: For Lenders  */}
<article className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm flex flex-col justify-between" id="for-lenders">
<div>
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold tracking-wider uppercase mb-5">
<span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              For Lenders
            </div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
<div className="md:col-span-7">
<h2 className="font-serif-hero text-3xl font-normal text-slate-900 leading-tight mb-3">
                  Invest in real people.<br />Earn real returns.
                </h2>
<p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Discover vetted, AI-analyzed loan opportunities from high-potential small businesses around the world.
                </p>
{/*  Value Checklist  */}
<ul className="space-y-3 mb-8">
<li className="flex items-center gap-2.5 text-[14.5px] text-slate-700">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" aria-hidden="true" className="lucide lucide-check w-3 h-3"><path d="M20 6 9 17l-5-5"></path></svg>
</div>
<span className="">Curated loan marketplace</span>
</li>
<li className="flex items-center gap-2.5 text-[14.5px] text-slate-700">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" aria-hidden="true" className="lucide lucide-check w-3 h-3"><path d="M20 6 9 17l-5-5"></path></svg>
</div>
<span className="">Transparent risk scores &amp; data</span>
</li>
<li className="flex items-center gap-2.5 text-[14.5px] text-slate-700">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" aria-hidden="true" className="lucide lucide-check w-3 h-3"><path d="M20 6 9 17l-5-5"></path></svg>
</div>
<span className="">Track your portfolio in real time</span>
</li>
<li className="flex items-center gap-2.5 text-[14.5px] text-slate-700">
<div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="check" aria-hidden="true" className="lucide lucide-check w-3 h-3"><path d="M20 6 9 17l-5-5"></path></svg>
</div>
<span className="">Create impact while earning yield</span>
</li>
</ul>
</div>
{/*  Lenders Image Vignette  */}
<div className="md:col-span-5 flex justify-center">
<div className="w-full max-w-[210px] h-[250px] rounded-2xl overflow-hidden shadow-md">
<img alt="African financial investor and analyst working at desk with laptop" className="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCooJuUzWvyrQ9zW22mHAANDVfqpenPtvoy3INdh0wEC4q1LuR3SZBX0ygZcTCsgDXEQ4mtCsKlGW5Qmtsib6J3r_yY9cji2IZeIKOSMf_uF6lWME-ka7L0EbnBgM2IeKnaYI-AFQa3uzmv2A8tXqQob1dR0sV5TM8qCdRzweoCyEoO3YbFbJmOjNP_uPhOWoLjanQDpFLmJrvJ4W4qC7ynI5g3Rv4qLe9cB0aOLnbAPAyNuVSNrGsR" />
</div>
</div>
</div>
</div>
<div>
<Link className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition shadow-sm" to="/lender">
<span className="">Start Investing</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" aria-hidden="true" className="lucide lucide-arrow-right w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
</Link>
</div>
</article>
</div>
</section>
{/*  END: DualAudienceBreakdown  */}
{/*  BEGIN: OurImpactSection  */}
<section className="relative text-white py-24 impact-bg bg-gradient-to-br from-[#043828] via-[#064e3b] to-[#02261c] overflow-hidden" data-purpose="impact-banner" id="our-impact">
<div className="max-w-7xl mx-auto px-6 relative z-10">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
{/*  Impact Intro  */}
<div className="lg:col-span-5">
<span className="inline-block text-xs font-bold tracking-widest text-emerald-300 uppercase mb-4">
              Our Impact
            </span>
<h2 className="font-serif-hero text-4xl md:text-5xl font-normal leading-tight mb-5 text-white">
              A more inclusive<br />financial future.
            </h2>
<p className="text-emerald-100/90 text-base leading-relaxed mb-8 max-w-md font-light">
              When small businesses grow, communities thrive. We believe capital should flow to potential, not just privilege.
            </p>
<a className="inline-flex items-center gap-2 bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-sm px-6 py-3 rounded-full transition shadow-lg" href="#our-impact">
<span className="">Our Impact Story</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" aria-hidden="true" className="lucide lucide-arrow-right w-4 h-4 text-emerald-700"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
</a>
</div>
{/*  Impact Metrics Grid  */}
<div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-6 border-l border-emerald-500/30 pl-0 lg:pl-10">
{/*  Impact Stat 1  */}
<div className="flex items-start gap-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="users-2" aria-hidden="true" className="lucide lucide-users-2 w-6 h-6 text-emerald-300 flex-shrink-0 mt-1"><path d="M18 21a8 8 0 0 0-16 0"></path><circle cx="10" cy="8" r="5"></circle><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path></svg>
<div>
<span className="text-xs text-emerald-200/80 font-medium block tracking-[0.01em]">Jobs created</span>
<span className="text-2xl font-bold text-white tracking-[0.03em]">8,500+</span>
</div>
</div>
{/*  Impact Stat 2  */}
<div className="flex items-start gap-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="store" aria-hidden="true" className="lucide lucide-store w-6 h-6 text-emerald-300 flex-shrink-0 mt-1"><path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"></path><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"></path><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"></path></svg>
<div>
<span className="text-xs text-emerald-200/80 font-medium block tracking-[0.01em]">Communities strengthened</span>
<span className="text-2xl font-bold text-white tracking-[0.03em]">320+</span>
</div>
</div>
{/*  Impact Stat 3  */}
<div className="flex items-start gap-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="leaf" aria-hidden="true" className="lucide lucide-leaf w-6 h-6 text-emerald-300 flex-shrink-0 mt-1"><path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"></path><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"></path></svg>
<div>
<span className="text-xs text-emerald-200/80 font-medium block tracking-[0.01em]">Estimated CO₂ avoided</span>
<span className="text-2xl font-bold text-white tracking-[0.03em]">12,000 tons</span>
</div>
</div>
{/*  Impact Stat 4  */}
<div className="flex items-start gap-3">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="globe" aria-hidden="true" className="lucide lucide-globe w-6 h-6 text-emerald-300 flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
<div>
<span className="text-xs text-emerald-200/80 font-medium block tracking-[0.01em]">Businesses in emerging markets</span>
<span className="text-2xl font-bold text-white tracking-[0.03em]">1,200+</span>
</div>
</div>
</div>
{/*  Atmospheric Script Callout  */}
<div className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end text-left lg:text-right pr-4">
<p className="font-script text-3xl md:text-4xl text-amber-200 font-medium leading-snug">
              Stronger<br />Businesses<br />Happier<br />Communities
            </p>
<div className="w-12 h-0.5 bg-amber-300/80 mt-4 self-start lg:self-end"></div>
</div>
</div>
</div>
</section>
{/*  END: OurImpactSection  */}
{/*  BEGIN: HowItWorks  */}
<section className="py-24 bg-white" data-purpose="how-it-works" id="how-it-works">
<div className="max-w-7xl mx-auto px-6">
{/*  Header Section  */}
<div className="mb-14">
<span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-3">
            How LenderX Works
          </span>
<h2 className="font-serif-hero text-3xl md:text-4xl text-slate-900 font-normal">
            From opportunity to impact — in a few simple steps.
          </h2>
</div>
{/*  4 Step Cards  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/*  Step 1  */}
<div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 hover:border-emerald-300 transition shadow-sm">
<div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shadow-xs mb-5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="file-text" aria-hidden="true" className="lucide lucide-file-text w-6 h-6"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
</div>
<div className="flex items-center gap-2 mb-2">
<span className="text-base font-bold text-emerald-700">1</span>
<h3 className="font-bold text-slate-900 text-sm underline decoration-emerald-500 decoration-2 underline-offset-4">
                Apply or Browse
              </h3>
</div>
<p className="text-xs text-slate-600 leading-relaxed mt-2.5">
              Borrowers apply with business documents. Lenders browse <span className="font-semibold text-slate-800">vetted opportunities</span>.
            </p>
</div>
{/*  Step 2  */}
<div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 hover:border-emerald-300 transition shadow-sm">
<div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shadow-xs mb-5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="6" height="6" x="9" y="9" rx="1"></rect><path d="M15 2v2m0 16v2M2 15h2m0-6h2M20 15h2m0-6h2M9 2v2m0 16v2"></path></svg>
</div>
<div className="flex items-center gap-2 mb-2">
<span className="text-base font-bold text-emerald-700">2</span>
<h3 className="font-bold text-slate-900 text-sm underline decoration-emerald-500 decoration-2 underline-offset-4">
                AI Analysis
              </h3>
</div>
<p className="text-xs text-slate-600 leading-relaxed mt-2.5">
              We extract data with AWS Textract, analyze risk with Bedrock, and generate a transparent score.
            </p>
</div>
{/*  Step 3  */}
<div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 hover:border-emerald-300 transition shadow-sm">
<div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shadow-xs mb-5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="handshake" aria-hidden="true" className="lucide lucide-handshake w-6 h-6"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg>
</div>
<div className="flex items-center gap-2 mb-2">
<span className="text-base font-bold text-emerald-700">3</span>
<h3 className="font-bold text-slate-900 text-sm underline decoration-emerald-500 decoration-2 underline-offset-4">
                Fund &amp; Grow
              </h3>
</div>
<p className="text-xs text-slate-600 leading-relaxed mt-2.5">
              Lenders provide capital. Businesses use it to grow, create jobs, and serve communities.
            </p>
</div>
{/*  Step 4  */}
<div className="bg-stone-50 rounded-2xl p-6 border border-stone-200/80 hover:border-emerald-300 transition shadow-sm">
<div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shadow-xs mb-5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="trending-up" aria-hidden="true" className="lucide lucide-trending-up w-6 h-6"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
</div>
<div className="flex items-center gap-2 mb-2">
<span className="text-base font-bold text-emerald-700">4</span>
<h3 className="font-bold text-slate-900 text-sm underline decoration-emerald-500 decoration-2 underline-offset-4">
                Repay &amp; Repeat
              </h3>
</div>
<p className="text-xs text-slate-600 leading-relaxed mt-2.5">
              On-time repayments build higher credit limits and stronger returns.
            </p>
</div>
</div>
</div>
</section>
{/*  END: HowItWorks  */}
</main>
{/*  BEGIN: SiteFooter  */}
<footer className="bg-white border-t border-slate-200 py-10" data-purpose="site-footer">
<div className="max-w-7xl mx-auto px-6">
<div className="flex flex-col md:flex-row items-center justify-between gap-6">
{/*  Left: Brand  */}
<div className="flex items-center gap-3">
  <img src="/logo.png" alt="LenderX" className="h-8 w-auto object-contain" />
  <p className="hidden sm:inline text-xs text-slate-500 pl-3 border-l border-slate-200">Capital for a more inclusive world</p>
</div>
{/*  Center: Nav links  */}
<nav className="flex items-center gap-6 text-sm text-slate-600 font-medium">
<a className="hover:text-emerald-700 transition" href="#about">About</a>
<a className="hover:text-emerald-700 transition" href="#careers">Careers</a>
<a className="hover:text-emerald-700 transition" href="#blog">Blog</a>
<a className="hover:text-emerald-700 transition" href="#faq">FAQ</a>
<a className="hover:text-emerald-700 transition" href="#contact">Contact</a>
</nav>
{/*  Right: Social and Tagline  */}
<div className="flex items-center gap-6">
<div className="flex items-center gap-3 text-slate-500">
<a aria-label="LinkedIn" className="hover:text-emerald-700 transition p-1" href="#linkedin">
<i className="w-4 h-4" data-lucide="linkedin"></i>
</a>
<a aria-label="X (formerly Twitter)" className="hover:text-emerald-700 transition p-1" href="#x">
<i className="w-4 h-4" data-lucide="twitter"></i>
</a>
<a aria-label="YouTube" className="hover:text-emerald-700 transition p-1" href="#youtube">
<i className="w-4 h-4" data-lucide="youtube"></i>
</a>
</div>
<div className="hidden sm:block border-l border-slate-200 pl-6 text-xs text-slate-500">
            Building a fairer, brighter tomorrow.
          </div>
</div>
</div>
</div>
</footer>
{/*  END: SiteFooter  */}
    </div>
  );
}
