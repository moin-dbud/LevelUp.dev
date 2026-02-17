import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center max-w-md w-full px-4">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4"
                    style={{ fontFamily: 'outfit, outfit Fallback' }}>
                    Register
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                    Start your skill-building journey today!
                </p>
                <div className="space-y-4">
                    <button
                        className="w-full px-8 py-4 rounded-full text-white font-bold transition-all"
                        style={{ backgroundColor: 'hsl(217, 91%, 60%)' }}>
                        Create Account
                    </button>
                    <p className="text-gray-500 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
