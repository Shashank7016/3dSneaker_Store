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

      {/* ===== Features Bento Grid ===== */}
      <section id="features" className="py-20 sm:py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-14">
            <span className="eyebrow text-indigo-500 mb-3 block">Why Us</span>
            <h2 className="section-heading">Why Forma?</h2>
            <p className="section-subheading mt-4">
              Cutting-edge technology meets premium craftsmanship for an experience like no other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hero Card — 3D Customization (spans full width on md) */}
            <div className="reveal-scale md:col-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950 p-8 sm:p-10 border border-white/5 bento-card">
              <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-violet-500/8 rounded-full blur-3xl group-hover:bg-violet-500/15 transition-all duration-700" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="flex-1">
                  <div className="w-11 h-11 bg-indigo-500/15 rounded-xl flex items-center justify-center mb-5 group-hover:bg-indigo-500/25 transition-colors duration-300">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">3D Customization</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                    Design every detail in real-time 3D. Change colors, materials, and textures — see your creation come alive from every angle.
                  </p>
                </div>

                {/* Interactive shoe color preview */}
                <div className="relative flex-shrink-0 w-full lg:w-auto">
                  <div className="flex items-center justify-center lg:justify-end gap-3">
                    {/* Animated color swatches that pulse on hover */}
                    <div className="flex flex-col gap-2.5">
                      {["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6"].map((color, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-lg shadow-lg cursor-pointer bento-swatch transition-all duration-300 hover:scale-125"
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 4px 14px ${color}40`,
                            animationDelay: `${i * 0.12}s`,
                          }}
                        />
                      ))}
                    </div>
                    {/* Shoe silhouette that reflects the hover color */}
                    <div className="w-40 h-40 sm:w-48 sm:h-48 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-2xl group-hover:from-indigo-500/30 group-hover:to-violet-500/30 transition-all duration-500" />
                      <svg className="w-full h-full text-indigo-400/60 group-hover:text-indigo-300/80 transition-colors duration-500 bento-shoe" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M15 65 C15 55, 25 35, 45 30 C55 27, 65 28, 75 32 C82 35, 88 42, 90 50 L92 58 C92 62, 90 65, 86 66 L14 66 C14 66, 15 65, 15 65Z" opacity="0.6"/>
                        <path d="M10 66 L92 66 C93 66, 94 67, 94 68 L94 72 C94 74, 92 76, 90 76 L8 76 C6 76, 4 74, 4 72 L4 70 C4 68, 6 66, 8 66Z" opacity="0.8"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Premium Quality */}
            <div className="reveal-scale group relative overflow-hidden rounded-2xl bg-white p-7 sm:p-8 border border-gray-100 shadow-sm bento-card">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors duration-300">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="card-title mb-2">Premium Quality</h3>
                <p className="card-body text-sm mb-6">
                  Handcrafted with the finest materials. Each pair goes through rigorous quality checks.
                </p>

                {/* Material swatches that fan out on hover */}
                <div className="flex items-end gap-1.5 h-12">
                  {[
                    { label: "Leather", color: "bg-amber-800" },
                    { label: "Suede", color: "bg-stone-500" },
                    { label: "Mesh", color: "bg-gray-300" },
                    { label: "Canvas", color: "bg-orange-200" },
                  ].map((mat, i) => (
                    <div
                      key={i}
                      className={`bento-material relative rounded-lg ${mat.color} transition-all duration-300 cursor-pointer`}
                      style={{
                        width: '48px',
                        height: '32px',
                        transform: `rotate(${-6 + i * 4}deg)`,
                      }}
                      title={mat.label}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {mat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 — Fast Delivery */}
            <div className="reveal-scale group relative overflow-hidden rounded-2xl bg-white p-7 sm:p-8 border border-gray-100 shadow-sm bento-card">
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors duration-300">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="card-title mb-2">Fast Delivery</h3>
                <p className="card-body text-sm mb-6">
                  From your design to your doorstep in days, without compromising craftsmanship.
                </p>

                {/* Animated delivery tracker */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-medium text-gray-400">
                    <span>Designed</span>
                    <span>Crafted</span>
                    <span>Shipped</span>
                    <span className="text-emerald-500">Delivered</span>
                  </div>
                  <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full bento-tracker" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[11px] text-emerald-500 font-medium">3-5 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section id="how-it-works" className="py-20 sm:py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal text-center mb-16">
            <span className="eyebrow inline-block px-4 py-1.5 bg-white/10 text-indigo-300 rounded-full mb-5">
              How It Works
            </span>
            <h2 className="section-heading text-white">Three simple steps</h2>
            <p className="section-subheading text-gray-400 mt-4">
              From browsing to doorstep — designing your dream shoes has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Choose Your Base", desc: "Pick from our curated collection of premium shoe models designed for every lifestyle." },
              { step: "02", title: "Customize in 3D", desc: "Use our interactive editor to change colors, materials, and details on every part." },
              { step: "03", title: "Place Your Order", desc: "Happy with your design? Add to cart and checkout. We handle the rest." },
            ].map((item) => (
              <div key={item.step} className="reveal-scale text-center group">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-sm mx-auto mb-5 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-indigo-500/15">
                  {item.step}
                </div>
                <h3 className="card-title text-white mb-2">{item.title}</h3>
                <p className="card-body text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal text-center mt-14">
            <Link
              href="/store"
              className="btn-text bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg inline-block"
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
