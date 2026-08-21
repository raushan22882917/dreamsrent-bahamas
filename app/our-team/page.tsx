import React from 'react';
import { Mail, Phone } from 'lucide-react';

const TEAM = [
  {
    name: 'Alexander Sterling',
    role: 'Chief Executive Officer & Founder',
    photo: '/images/team/team_ceo_male_1787225259487.jpg',
    bio: 'Over 15 years in luxury automotive hospitality and Caribbean fleet operations.',
    email: 'alexander@bahamasluxurydrive.com'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Head of Fleet Operations & Logistics',
    photo: '/images/team/team_ceo_female_1787225300600.jpg',
    bio: 'Oversees 20-vehicle maintenance, white-glove airport dispatch, and vehicle sanitization standards.',
    email: 'sarah.j@bahamasluxurydrive.com'
  },
  {
    name: 'Marcus Richardson',
    role: 'Director of Customer Experience',
    photo: '/images/team/team_business_head_1787225318994.jpg',
    bio: 'Dedicated to providing seamless VIP resort deliveries across Paradise Island and Nassau.',
    email: 'marcus.r@bahamasluxurydrive.com'
  }
];

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 bg-orange-100 text-orange-700 font-bold text-xs rounded-full uppercase tracking-wider">
            Leadership Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
            The People Behind Bahamas Luxury Drive
          </h1>
          <p className="text-base text-gray-600">
            Meet the experienced automotive hospitality team committed to making your Bahamas travels exceptional.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 text-center group hover:shadow-xl transition-all">
              <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-orange-500 shadow-md">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-xs font-bold text-orange-600 mt-0.5">{member.role}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{member.bio}</p>
              </div>
              <div className="pt-3 border-t border-gray-100 text-xs text-gray-400 font-semibold flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 mr-1.5 text-orange-500" /> {member.email}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
