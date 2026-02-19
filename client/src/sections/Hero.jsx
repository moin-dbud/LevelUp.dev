import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="font-sans min-h-screen bg-stone-50 dark:bg-black">
            <Navbar />
            <div className="relative z-10 p-4 pt-40 pb-2 gap-8 sm:p-8 sm:pt-28 md:pt-32 lg:p-2 lg:pt-40 lg:pb-2 lg:gap-16">

                {/* Hero Section */}
                <div className="text-center max-w-6xl mx-auto mb-2   sm:mb-2 md:mb-14 lg:mb-22">
                    <div className="space-y-6 md:space-y-8">
                        <div className="relative">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-none tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: 'outfit, outfit Fallback' }}>
                                Build Real Skills
                                <br />
                                Through Daily Execution
                            </h1>
                            <div className="absolute -bottom-2 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-32 md:w-82 h-1 bg-gray-900 dark:bg-white"></div>
                        </div>

                        <p style={{ fontFamily: 'outfit, outfit Fallback' }} className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-4xl mx-auto leading-relaxed px-4 sm:px-0 text-gray-700 dark:text-gray-300">
                            Structured roadmaps. Daily build missions. XP, streaks, and leaderboards.
                            No endless videos. Just consistent progress.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 md:pt-8 px-4 sm:px-0">
                            <button
                                onClick={() => navigate('/login')}
                                style={{ backgroundColor: "hsl(217, 91%, 60%)" }}
                                className="group w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 cursor-pointer text-white rounded-full  transition-all duration-300 font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2"
                            >
                                <span className="flex items-center justify-center space-x-3">
                                    <span>START BUILDING FREE</span>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>

                            <Link
                                to="/tools"
                                className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-full border-2 transition-all duration-300 font-bold text-base sm:text-lg hover:-translate-y-2 text-center border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black">
                                <span className="flex items-center justify-center space-x-2">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <span>LEARN MORE</span>
                                </span>
                            </Link>
                        </div>


                        <div className="flex items-center justify-center space-x-6 sm:space-x-8 md:space-x-12 pt-8 sm:pt-10 md:pt-12">
                            <div style={{ fontFamily: 'outfit, outfit Fallback' }} className="text-center">
                                <div className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                                    30–60 MIN+
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                   Daily Build Sessions
                                </div>
                            </div>
                            <div style={{ fontFamily: 'outfit, outfit Fallback' }} className="w-px h-8 sm:h-10 md:h-12 bg-gray-300 dark:bg-gray-700"></div>
                            <div className="text-center">
                                <div className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                                   LEVEL-BASED
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                   Structured Learning
                                </div>
                            </div>
                            <div style={{ fontFamily: 'outfit, outfit Fallback' }} className="w-px h-8 sm:h-10 md:h-12 bg-gray-300 dark:bg-gray-700"></div>
                            <div className="text-center">
                                <div className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                                    STREAK + XP
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Track Real Progress
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Hero;