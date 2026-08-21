'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Booking & Requirements',
    question: 'What documents are required to rent a vehicle in the Bahamas?',
    answer: 'Renters must present a valid driver’s license from their home country or international driving permit, a valid passport, and a major credit/debit card in the primary driver’s name. The minimum driver age is 21.'
  },
  {
    category: 'Booking & Requirements',
    question: 'How does the security deposit work?',
    answer: 'A refundable security deposit (ranging between $150 and $500 depending on the vehicle class) is pre-authorized or charged at checkout. Upon returning the vehicle in good standing with the same fuel level, the full deposit is automatically released back to your card within 24-48 hours.'
  },
  {
    category: 'Pickup & Delivery',
    question: 'How do I pick up my car at Nassau Airport (NAS)?',
    answer: 'Our dedicated airport concierge will meet you immediately outside the arrivals exit terminal holding a personalized Bahamas Luxury Drive sign. Your vehicle is parked directly in the priority VIP lot for rapid departure in under 5 minutes.'
  },
  {
    category: 'Pickup & Delivery',
    question: 'Can I return the car to a different island location?',
    answer: 'Yes! Bahamas Luxury Drive supports multi-location returns. You can easily pick up at Nassau Airport and return to your resort on Paradise Island or Cable Beach.'
  },
  {
    category: 'Insurance & Coverage',
    question: 'What is covered by the Comprehensive Damage Waiver (CDW)?',
    answer: 'Our optional CDW ($25/day) reduces your financial responsibility to zero ($0 deductible) in the unlikely event of accidental collision, windshield chips, tire punctures, or theft.'
  },
  {
    category: 'Cancellation & Changes',
    question: 'What is the cancellation policy?',
    answer: 'We offer 100% free cancellation on all standard and luxury bookings when cancelled at least 24 hours prior to scheduled pickup time.'
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1 bg-orange-100 text-orange-700 font-bold text-xs rounded-full uppercase tracking-wider">
            Help & Guidance
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-gray-600">
            Find immediate answers about our Bahamas rental requirements, airport pickup procedures, and deposit terms.
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm divide-y divide-gray-100">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="font-bold text-gray-900 text-base group-hover:text-orange-600 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isOpen ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-orange-50 group-hover:text-orange-600'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
