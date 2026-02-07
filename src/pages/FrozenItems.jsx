import React from 'react';

const FrozenItems = ({ category }) => {
    return (
        <div className="pt-40 pb-24 px-6 md:px-12 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter capitalize">
                    {category || 'Frozen Items'}
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mb-12">
                    Discover our premium selection of frozen snacks, delivered fresh to your door.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-zinc-900 rounded-3xl border border-white/5 p-8 h-64 flex flex-col justify-end group hover:border-blue-500/50 transition-all">
                            <div className="h-12 w-12 bg-blue-600/10 rounded-xl mb-auto flex items-center justify-center">
                                <span className="text-blue-400 font-bold"># {i}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Delicious Snack {i}</h3>
                            <p className="text-gray-500 text-sm">Premium quality and peak freshness guaranteed.</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FrozenItems;
