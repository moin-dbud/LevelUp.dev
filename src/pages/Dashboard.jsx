import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4" 
                    style={{ fontFamily: 'outfit, outfit Fallback' }}>
                    Dashboard
                </h1>
                <p className="text-gray-400 text-lg">
                    Your learning dashboard and progress tracker
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
