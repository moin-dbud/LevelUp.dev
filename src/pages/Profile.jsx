import React from 'react';

const Profile = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4"
                    style={{ fontFamily: 'outfit, outfit Fallback' }}>
                    Profile
                </h1>
                <p className="text-gray-400 text-lg">
                    Manage your account and preferences
                </p>
            </div>
        </div>
    );
};

export default Profile;
