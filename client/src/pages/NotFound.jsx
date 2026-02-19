import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center max-w-2xl px-4">
                <h1 className="text-8xl md:text-9xl font-black text-white mb-4"
                    style={{ fontFamily: 'outfit, outfit Fallback' }}>
                    404
                </h1>
                <div className="w-24 h-1 mx-auto mb-8 rounded-full"
                    style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-8 py-4 rounded-full transition-all font-bold border-2 border-white text-white hover:bg-white hover:text-black"
                    >
                        ← BACK TO HOME
                    </Link>
                    <Link
                        to="/dashboard"
                        className="px-8 py-4 rounded-full transition-all font-bold text-white"
                        style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}
                    >
                        GO TO DASHBOARD
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
