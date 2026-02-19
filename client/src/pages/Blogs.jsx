import React from 'react';
import Navbar from '../components/layout/Navbar';
import ComingSoon from '../components/shared/ComingSoon';

const Blogs = () => {
    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <ComingSoon
                title="Blogs Coming Soon"
                subtitle="Developer insights, tutorials, and success stories - launching soon!"
                showBackButton={true}
            />
        </div>
    );
};

export default Blogs;
