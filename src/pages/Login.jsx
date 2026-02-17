import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center max-w-md w-full px-4">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4"
                    style={{ fontFamily: 'outfit, outfit Fallback' }}>
                    Login
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                    Welcome back! Sign in to continue your journey
                </p>
                <div className="space-y-4">
                    <button
                        className="w-full px-8 py-4 rounded-full text-white font-bold transition-all"
                        style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}>
                        Sign In
                    </button>
                    <p className="text-gray-500 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
