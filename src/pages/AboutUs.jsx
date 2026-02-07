import React from 'react';

const AboutUs = () => {
    return (
        <div className="pt-40 pb-24 px-6 md:px-12 min-h-screen">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                    OUR STORY
                </h1>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                    <p>
                        Frozify was born out of a passion for bringing gourmet quality snacks to the convenience of your home.
                    </p>
                    <p>
                        We believe that frozen food shouldn't mean compromising on taste or quality. Our team uses flash-freezing technology to ensure every bite is as delicious as if it were just made.
                    </p>
                    <div className="pt-12">
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
