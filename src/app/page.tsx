"use client";
import React, { useEffect } from "react";
import Link from "next/link";

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#fafafa] relative">
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-50 glass border-b border-gray-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900 tracking-tight">Forma</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/store" className="nav-link">Collection</Link>
              <a href="#features" className="nav-link">Features</a>
              <a href="#how-it-works" className="nav-link">How It Works</a>
            </nav>

            <Link
              href="/store"
              className="btn-premium btn-text text-white px-5 py-2 rounded-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="relative pt-20 sm:pt-28 pb-28 sm:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 via-transparent to-transparent" />
        <div className="absolute top-32 right-[15%] w-64 h-64 bg-violet-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[8%] w-80 h-80 bg-indigo-200/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in-up leading-[1.1]" style={{ animationDelay: '0.1s' }}>
            Design shoes that<br />
            <span className="gradient-text">tell your story</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-xl mx-auto animate-fade-in-up leading-relaxed font-normal" style={{ animationDelay: '0.2s' }}>
            Every detail, every color, every material — our 3D customization
            platform lets you create footwear that&apos;s uniquely yours.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/store"
              className="btn-premium btn-text text-white px-8 py-3 rounded-lg inline-block text-center"
            >
              Browse Collection
            </Link>
            <a
              href="#how-it-works"
              className="btn-text px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 inline-block text-center"
            >
              See How It Works
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "4.9", label: "Average Rating" },
              { value: "1M+", label: "Designs Created" },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px h-8 bg-gray-200" />}
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{stat.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Shoes Preview ===== */}
      <section className="py-20 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <span className="eyebrow text-indigo-500 mb-3 block">Trending Now</span>
            <h2 className="section-heading">Popular Picks</h2>
            <p className="section-subheading mt-4">
              A taste of what&apos;s waiting for you in our collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {[
              { name: "Classic Runner", price: 120, type: "Running", img: "https://cdn.pixabay.com/photo/2016/06/03/17/35/shoes-1433925_640.jpg", isNew: true },
              { name: "Sport Elite", price: 140, type: "Running", img: "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496_640.jpg" },
              { name: "Trail Blazer", price: 150, type: "Training", img: "https://cdn.pixabay.com/photo/2021/03/08/12/31/oxford-shoes-6078993_640.jpg" },
            ].map((shoe, i) => (
              <Link href="/store" key={i} className="reveal group relative bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 shadow-sm block">
                {shoe.isNew && (
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-indigo-500 text-white px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider">New</span>
                  </div>
                )}
                <div className="relative h-56 sm:h-64 bg-gray-50 overflow-hidden">
                  <img src={shoe.img} alt={shoe.name} className="w-full h-full object-cover img-zoom" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title group-hover:text-indigo-600 transition-colors duration-200">{shoe.name}</h3>
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-md mt-1.5 font-medium">{shoe.type}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">${shoe.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="reveal text-center mt-12">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors group"
            >
              View Full Collection
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Features — Bento Grid ===== */}
      <section id="features" className="py-24 sm:py-32 bg-[#fafafa] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full mb-6">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-semibold text-white uppercase tracking-widest">Why Forma</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              Built different,<br />
              <span className="text-gray-300">by design</span>
            </h2>
          </div>

          {/* Bento Grid — 1 tall left + 2 stacked right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 bento-features">
            {/* Card 1 — 3D Customization (tall, spans 3 cols) */}
            <div className="reveal lg:col-span-3 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-violet-50/60 to-blue-50/40 border border-indigo-100/50 p-8 sm:p-10 min-h-[420px] flex flex-col justify-between bento-card">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-200/15 rounded-full blur-3xl group-hover:bg-indigo-200/25 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-violet-200/10 rounded-full blur-3xl group-hover:bg-violet-200/20 transition-all duration-700" />

              {/* Header */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-indigo-100/60 mb-4">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                  <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">Core Feature</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">3D Customization</h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">
                  Design every detail in real-time. Change colors, materials, and textures — see it come alive from every angle.
                </p>
              </div>

              {/* Illustration — floating editor UI */}
              <div className="relative z-10 mt-6 flex items-end justify-center lg:justify-end">
                <div className="relative">
                  {/* Main shoe */}
                  <svg className="w-56 h-36 sm:w-64 sm:h-40 drop-shadow-lg" viewBox="0 0 260 140" fill="none">
                    <rect x="18" y="98" rx="9" width="224" height="16" fill="#6366f1" opacity="0.25" />
                    <rect x="22" y="88" rx="5" width="216" height="14" fill="#818cf8" opacity="0.2" />
                    <path d="M32 88 C32 70, 48 40, 82 30 C100 24, 124 24, 150 32 C172 38, 192 54, 204 66 L212 78 C214 82, 215 86, 215 88 L32 88Z" fill="#6366f1" opacity="0.4" className="group-hover:opacity-55 transition-opacity duration-500" />
                    <path d="M32 88 C32 76, 40 56, 60 44 C72 36, 84 32, 90 30 L82 28 C60 32, 42 50, 32 72 Z" fill="#ec4899" opacity="0.3" className="group-hover:opacity-45 transition-opacity duration-500" />
                    <path d="M198 62 L212 78 C214 82, 215 86, 215 88 L205 88 C205 82, 202 72, 198 62Z" fill="#8b5cf6" opacity="0.35" />
                    <path d="M60 78 C80 62, 115 52, 168 58 C185 60, 196 66, 202 72" stroke="#10b981" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.45" className="group-hover:opacity-60 transition-opacity duration-500" />
                    <path d="M78 34 C82 20, 96 10, 118 6 C138 3, 144 8, 142 22 L134 32" fill="#a5b4fc" opacity="0.25" />
                    <circle cx="96" cy="40" r="3" fill="white" opacity="0.5" />
                    <circle cx="110" cy="36" r="3" fill="white" opacity="0.5" />
                    <circle cx="124" cy="34" r="3" fill="white" opacity="0.5" />
                  </svg>

                  {/* Floating glass panels */}
                  <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/80 backdrop-blur-md rounded-xl p-3 shadow-lg shadow-indigo-100/40 border border-white/60 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all duration-500">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">Color</span>
                    <div className="flex gap-1.5">
                      {["#6366f1", "#ec4899", "#f59e0b", "#10b981"].map((c, i) => (
                        <div key={i} className={`w-5 h-5 rounded-md ${i === 0 ? "ring-[1.5px] ring-indigo-400 ring-offset-1" : ""}`} style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>

                  <div className="absolute -bottom-2 -right-2 sm:-right-6 bg-white/80 backdrop-blur-md rounded-xl p-3 shadow-lg shadow-indigo-100/40 border border-white/60 group-hover:translate-y-1 group-hover:translate-x-1 transition-all duration-500">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">Material</span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-5 rounded bg-gradient-to-r from-amber-600 to-amber-700" />
                      <span className="text-[11px] font-medium text-gray-600">Leather</span>
                    </div>
                  </div>

                  <div className="absolute top-6 -right-3 sm:top-4 sm:-right-10 bg-white/80 backdrop-blur-md rounded-lg px-2.5 py-1.5 shadow-md shadow-indigo-100/30 border border-white/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 delay-100">
                    <span className="text-[10px] font-semibold text-indigo-500">Swoosh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Premium Quality (top right) */}
            <div className="reveal lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/60 to-yellow-50/40 border border-amber-100/50 p-7 sm:p-8 bento-card" style={{ transitionDelay: '0.1s' }}>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-200/15 rounded-full blur-2xl group-hover:bg-amber-200/30 transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 bg-white/70 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-100/60">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Premium Quality</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Handcrafted with the finest materials. Each pair through rigorous quality checks.
                </p>

                {/* Material tiles */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Leather", color: "from-amber-700 to-amber-800", text: "text-amber-100" },
                    { label: "Suede", color: "from-stone-400 to-stone-500", text: "text-stone-100" },
                    { label: "Mesh", color: "from-gray-200 to-gray-300", text: "text-gray-500" },
                    { label: "Canvas", color: "from-orange-200 to-orange-300", text: "text-orange-700" },
                  ].map((mat, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-xl bg-gradient-to-br ${mat.color} shadow-sm flex items-end justify-center pb-2 group-hover:scale-105 group-hover:shadow-md transition-all duration-500 cursor-pointer`}
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${mat.text}`}>{mat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 — Fast Delivery (bottom right) */}
            <div className="reveal lg:col-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/60 to-green-50/40 border border-emerald-100/50 p-7 sm:p-8 bento-card" style={{ transitionDelay: '0.2s' }}>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-200/15 rounded-full blur-2xl group-hover:bg-emerald-200/30 transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 bg-white/70 backdrop-blur-sm rounded-lg flex items-center justify-center border border-emerald-100/60">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Fast Delivery</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  From studio to doorstep in days, without compromising craftsmanship.
                </p>

                {/* Delivery timeline — horizontal */}
                <div className="flex items-center gap-1">
                  {["Order", "Craft", "Ship", "Arrive"].map((step, i) => (
                    <React.Fragment key={i}>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-emerald-400/90 flex items-center justify-center shadow-sm shadow-emerald-200/50 group-hover:scale-110 transition-all duration-400" style={{ transitionDelay: `${i * 80}ms` }}>
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">{step}</span>
                      </div>
                      {i < 3 && <div className="flex-1 h-0.5 bg-emerald-300/50 rounded-full mb-4" />}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mt-4 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-emerald-100/60 w-fit">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-[11px] text-emerald-600 font-semibold">3–5 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works — Horizontal Steps ===== */}
      <section id="how-it-works" className="py-24 sm:py-32 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full mb-6">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-semibold text-white uppercase tracking-widest">How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              Three steps to your<br />
              <span className="text-gray-300">perfect pair</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 hiw-grid">
            {/* Step 1 — Browse */}
            <div className="reveal hiw-card group">
              <div className="hiw-illustration bg-gradient-to-br from-amber-50 via-orange-50/80 to-yellow-50/60">
                <span className="hiw-number text-amber-200/50 group-hover:text-amber-300/60 transition-colors duration-500">01</span>
                {/* Three stacked shoe cards — collection feel */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="relative w-48 h-36">
                    {/* Back card */}
                    <div className="absolute top-0 left-6 w-32 h-28 bg-white/70 rounded-xl shadow-sm border border-amber-100/60 overflow-hidden group-hover:rotate-[-6deg] group-hover:-translate-x-2 transition-all duration-500">
                      <svg className="w-full h-full p-4 text-amber-300" viewBox="0 0 180 100" fill="currentColor">
                        <path d="M20 68 C20 55, 32 32, 60 24 C75 20, 95 20, 115 26 C133 32, 148 44, 158 55 L163 63 C164 66, 165 68, 165 68 L20 68Z" opacity="0.5" />
                        <rect x="12" y="68" width="160" height="10" rx="5" opacity="0.7" />
                        <path d="M48 58 C63 45, 88 38, 128 42" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                      </svg>
                    </div>
                    {/* Middle card */}
                    <div className="absolute top-4 left-3 w-32 h-28 bg-white/80 rounded-xl shadow-sm border border-amber-100/60 overflow-hidden group-hover:rotate-[-2deg] group-hover:-translate-x-1 transition-all duration-500 delay-75">
                      <svg className="w-full h-full p-4 text-orange-300" viewBox="0 0 180 100" fill="currentColor">
                        <path d="M20 68 C20 55, 32 32, 60 24 C75 20, 95 20, 115 26 C133 32, 148 44, 158 55 L163 63 C164 66, 165 68, 165 68 L20 68Z" opacity="0.5" />
                        <rect x="12" y="68" width="160" height="10" rx="5" opacity="0.7" />
                        <path d="M48 58 C63 45, 88 38, 128 42" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                      </svg>
                    </div>
                    {/* Front card — selected */}
                    <div className="absolute top-8 left-0 w-32 h-28 bg-white rounded-xl shadow-md border-2 border-amber-400 overflow-hidden group-hover:rotate-[2deg] group-hover:translate-x-1 group-hover:scale-105 transition-all duration-500 delay-100">
                      <svg className="w-full h-full p-4 text-amber-500" viewBox="0 0 180 100" fill="currentColor">
                        <path d="M20 68 C20 55, 32 32, 60 24 C75 20, 95 20, 115 26 C133 32, 148 44, 158 55 L163 63 C164 66, 165 68, 165 68 L20 68Z" opacity="0.6" />
                        <rect x="12" y="68" width="160" height="10" rx="5" opacity="0.8" />
                        <path d="M48 58 C63 45, 88 38, 128 42" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
                        <circle cx="70" cy="38" r="2.5" fill="white" opacity="0.7" />
                        <circle cx="82" cy="34" r="2.5" fill="white" opacity="0.7" />
                        <circle cx="94" cy="32" r="2.5" fill="white" opacity="0.7" />
                      </svg>
                      {/* Selection check */}
                      <div className="absolute top-2 right-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-5 px-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5 tracking-tight">Browse &amp; Pick</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Explore our curated collection of premium shoe models, each crafted for a different lifestyle.</p>
              </div>
            </div>

            {/* Step 2 — Customize */}
            <div className="reveal hiw-card group">
              <div className="hiw-illustration bg-gradient-to-br from-indigo-50 via-violet-50/80 to-blue-50/60">
                <span className="hiw-number text-indigo-200/50 group-hover:text-indigo-300/60 transition-colors duration-500">02</span>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="relative">
                    {/* Main shoe — multi-colored to show customization */}
                    <svg className="w-52 h-32 drop-shadow-md group-hover:drop-shadow-lg transition-all duration-500" viewBox="0 0 220 120" fill="none">
                      {/* Sole — yellow */}
                      <rect x="15" y="82" rx="8" width="190" height="14" fill="#f59e0b" opacity="0.7" className="group-hover:opacity-85 transition-opacity duration-400" />
                      {/* Midsole */}
                      <rect x="20" y="74" rx="4" width="182" height="10" fill="#fbbf24" opacity="0.4" />
                      {/* Upper body — indigo */}
                      <path d="M28 74 C28 58, 42 34, 75 25 C92 20, 115 20, 138 27 C158 33, 174 47, 184 58 L190 68 C191 71, 192 74, 192 74 L28 74Z" fill="#6366f1" opacity="0.55" className="group-hover:opacity-70 transition-opacity duration-400" />
                      {/* Toe cap — pink */}
                      <path d="M28 74 C28 65, 34 48, 52 38 C62 32, 72 28, 78 26 L75 25 C55 28, 38 42, 28 60 Z" fill="#ec4899" opacity="0.45" className="group-hover:opacity-60 transition-opacity duration-400" />
                      {/* Heel — purple */}
                      <path d="M178 55 L190 68 C191 71, 192 74, 192 74 L182 74 C182 70, 180 62, 178 55Z" fill="#8b5cf6" opacity="0.5" className="group-hover:opacity-65 transition-opacity duration-400" />
                      {/* Swoosh stripe — emerald */}
                      <path d="M55 64 C72 50, 105 42, 150 47 C165 49, 175 55, 180 59" stroke="#10b981" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.6" className="group-hover:opacity-80 transition-opacity duration-400" />
                      {/* Tongue */}
                      <path d="M72 28 C75 16, 86 8, 104 5 C120 3, 126 7, 124 20 L118 28" fill="#818cf8" opacity="0.35" />
                      {/* Lace dots */}
                      <circle cx="84" cy="34" r="2.5" fill="white" opacity="0.6" />
                      <circle cx="96" cy="30" r="2.5" fill="white" opacity="0.6" />
                      <circle cx="108" cy="28" r="2.5" fill="white" opacity="0.6" />
                    </svg>
                    {/* Floating color labels */}
                    <div className="absolute -top-1 -right-2 px-2 py-0.5 bg-white/90 rounded-md shadow-sm text-[10px] font-semibold text-indigo-500 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-400 delay-100">Mesh</div>
                    <div className="absolute top-6 -left-4 px-2 py-0.5 bg-white/90 rounded-md shadow-sm text-[10px] font-semibold text-pink-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-400 delay-200">Toe Cap</div>
                    <div className="absolute bottom-8 -right-3 px-2 py-0.5 bg-white/90 rounded-md shadow-sm text-[10px] font-semibold text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-400 delay-150">Swoosh</div>
                  </div>
                </div>
              </div>
              <div className="pt-5 px-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5 tracking-tight">Customize in 3D</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Change colors, materials, and textures on every part. Watch your creation come alive in real-time.</p>
              </div>
            </div>

            {/* Step 3 — Order */}
            <div className="reveal hiw-card group">
              <div className="hiw-illustration bg-gradient-to-br from-emerald-50 via-teal-50/80 to-green-50/60">
                <span className="hiw-number text-emerald-200/50 group-hover:text-emerald-300/60 transition-colors duration-500">03</span>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="relative">
                    {/* Shoe in box */}
                    <svg className="w-44 h-28 drop-shadow-sm" viewBox="0 0 200 130" fill="none">
                      {/* Box back */}
                      <rect x="20" y="55" width="160" height="60" rx="6" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
                      {/* Box flap left */}
                      <path d="M20 55 L60 40 L60 55 Z" fill="#a7f3d0" stroke="#6ee7b7" strokeWidth="1" />
                      {/* Box flap right */}
                      <path d="M180 55 L140 40 L140 55 Z" fill="#a7f3d0" stroke="#6ee7b7" strokeWidth="1" />
                      {/* Tissue paper */}
                      <path d="M35 55 C50 48, 70 52, 85 46 C100 40, 115 44, 130 42 C145 40, 155 46, 165 55" fill="white" opacity="0.6" />
                      {/* Shoe peeking out */}
                      <path d="M45 52 C45 42, 55 26, 78 20 C90 17, 105 17, 120 22 C135 26, 148 36, 155 44 L158 50 C159 52, 160 53, 160 54 L45 54Z" fill="#6366f1" opacity="0.45" className="group-hover:opacity-60 group-hover:-translate-y-2 transition-all duration-500" />
                      <path d="M38 54 L160 54 C161 54, 162 55, 162 56 L162 59 C162 60, 161 61, 160 61 L38 61 C37 61, 36 60, 36 59 L36 56 C36 55, 37 54, 38 54Z" fill="#818cf8" opacity="0.4" className="group-hover:-translate-y-2 transition-all duration-500" />
                      <path d="M70 44 C82 35, 105 30, 138 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" className="group-hover:-translate-y-2 transition-all duration-500" />
                    </svg>
                    {/* Delivery badge */}
                    <div className="absolute -bottom-2 right-0 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 rounded-full shadow-sm group-hover:shadow-md transition-all duration-400">
                      <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-semibold">3–5 days</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-5 px-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5 tracking-tight">We Deliver</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Sit back while we handcraft your design. From our studio to your doorstep in 3–5 business days.</p>
              </div>
            </div>
          </div>

          <div className="reveal text-center mt-16 sm:mt-20">
            <Link
              href="/store"
              className="btn-premium btn-text text-white px-8 py-3.5 rounded-xl inline-block"
            >
              Start Designing Now
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-white border-t border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-md flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-base font-semibold text-gray-900">Forma</span>
            </Link>

            <div className="flex gap-8">
              {["About", "Support", "Privacy", "Terms"].map((link) => (
                <a key={link} href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-medium">{link}</a>
              ))}
            </div>

            <p className="text-sm text-gray-400 font-normal">
              &copy; 2024 Forma. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
