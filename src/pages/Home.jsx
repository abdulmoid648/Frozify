import React from 'react';

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Premium Frozen Snacks</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
                        TASTE PERFECTION <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">FROZEN FRESH.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Elevate your snack game with our artisanal Samosas, Rolls, and Gourmet meals.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-2xl text-lg font-black hover:bg-gray-100 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95">
                            Order Now
                        </button>
                        <button className="w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all active:scale-95">
                            Explore Menu
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Categories / Content Blocks */}
            <div className="w-full px-6 md:px-12 pb-32 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="group relative h-80 bg-zinc-900 rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <h3 className="text-2xl font-black mb-2">Snack Category {i}</h3>
                                    <p className="text-gray-500 font-medium">Coming soon to your table.</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Large Decorative Block */}
                <div className="h-[30rem] w-full bg-zinc-900 rounded-[3rem] border border-white/5 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50" />
                    <div className="relative text-center z-10 p-12">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">Why Frozify?</h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto">
                            We use flash-freezing technology to lock in the flavor and nutrients of every single snack.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
