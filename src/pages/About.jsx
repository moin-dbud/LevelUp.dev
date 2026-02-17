import React from 'react';
import Navbar from '../components/layout/Navbar';
import ComingSoon from '../components/shared/ComingSoon';

const About = () => {
    return (
        <div className="bg-black min-h-screen">
            <Navbar />
            <ComingSoon
                title="About Us Coming Soon"
                subtitle="Learn about our mission to revolutionize skill development. Coming very soon!"
                showBackButton={true}
            />
        </div>
    );
};

export default About;
