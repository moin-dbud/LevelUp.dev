import React from 'react';
import { Link } from 'react-router-dom';

const CTA = ({ onClick, className = '' }) => {
  return (
    <div className={`max-w-7xl pb-10 bg-black mx-auto px-4 sm:px-0 mt-12 sm:mt-16 md:mt-20 ${className}`}>
      <Link
        to="/tools"
        className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-out bg-black shadow-lg hover:shadow-xl dark:shadow-none dark:border dark:border-gray-800 dark:hover:border-gray-700 block"
        style={{ transformStyle: 'preserve-3d' }}
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), transparent)' }}></div>

        <div className="relative p-8 md:p-12 rounded-3xl bg-black dark:bg-black">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div style={{ backgroundColor: "hsl(217, 91%, 60%)" }} className="inline-flex items-center px-3 py-1 text-white text-xs font-bold rounded-full tracking-wider mb-4">
                DAILY BUILD MISSIONS
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">
                Start Your Structured Learning Journey
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                Choose your skill, follow a clear roadmap, complete daily tasks, and track your progress through XP, streaks, and leaderboards.
              </p>
            </div>

            <div className="flex-shrink-0">
              <div className="group-hover:scale-105 transition-all duration-500">
                <button
                  onClick={onClick}
                  style={{ backgroundColor: "hsl(217, 91%, 60%)" }}
                  className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base transition-all duration-300 hover:opacity-90 shadow-xl"
                >
                  <span>START BUILDING FREE</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out rounded-b-3xl" style={{ backgroundImage: 'linear-gradient(to right, transparent, #3b82f6, transparent)' }}></div>
      </Link>
    </div>
  );
};

export default CTA;