"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const router = useRouter();
  const [orderNumber] = useState(() =>
    `ORD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  const steps = [
    { label: "Order confirmed", status: "done" },
    { label: "Production started (1-2 days)", status: "active" },
    { label: "Quality check (1 day)", status: "pending" },
    { label: "Shipped (3-5 days)", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col page-enter">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">Forma</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 text-sm mb-8">
            Thank you for your purchase. Your custom shoes are being prepared with care.
          </p>

          {/* Order Number */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Order Number</p>
            <p className="font-mono font-bold text-lg text-gray-900">{orderNumber}</p>
          </div>

          {/* Timeline */}
          <div className="text-left mb-8 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-sm text-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    step.status === 'done' ? 'bg-green-500' :
                    step.status === 'active' ? 'bg-indigo-500 animate-pulse' :
                    'bg-gray-200'
                  }`} />
                  <span className={`text-sm ${
                    step.status === 'done' ? 'text-gray-900 font-medium' :
                    step.status === 'active' ? 'text-indigo-600 font-medium' :
                    'text-gray-400'
                  }`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full btn-premium text-white py-3.5 rounded-xl font-semibold text-sm"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Print Receipt
            </button>
          </div>

          <p className="text-[11px] text-gray-400 mt-6">
            Redirecting to home page in 10 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
