import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Plus, Star } from 'lucide-react';

const FrozenItems = () => {
    const { category } = useParams();

    // Mock items - in a real app these could come from a data file or API
    const items = [
        { id: 1, name: "Premium Samosas", price: "450", rating: 4.8, img: "https://images.unsplash.com/photo-1601050638917-3f048d0a0b6d?auto=format&fit=crop&q=80&w=400" },
        { id: 2, name: "Spring Rolls", price: "380", rating: 4.6, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "Chicken Seekh Kabab", price: "620", rating: 4.9, img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400" },
        { id: 4, name: "Aloo Paratha", price: "250", rating: 4.5, img: "https://images.unsplash.com/photo-1626132646529-5006375bc9fa?auto=format&fit=crop&q=80&w=400" },
        { id: 5, name: "Shami Kabab", price: "550", rating: 4.7, img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400" },
        { id: 6, name: "Cheese Samosa", price: "480", rating: 4.9, img: "https://images.unsplash.com/photo-1601050638917-3f048d0a0b6d?auto=format&fit=crop&q=80&w=400" },
    ];

    return (
        <div className="pt-40 pb-24 px-6 md:px-12 min-h-screen bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter capitalize"
                        >
                            {category || 'ALL ITEMS'}
                        </motion.h1>
                        <p className="text-xl text-gray-500 max-w-2xl font-medium">
                            Browse our full collection of premium frozen treats, individually flash-frozen for peak perfection.
                        </p>
                    </div>
                    <div className="flex bg-zinc-900/50 border border-white/5 rounded-2xl p-1 shrink-0">
                        <button className="px-6 py-2.5 bg-white text-black rounded-xl font-bold text-sm transition-all shadow-lg shadow-white/20">Grid</button>
                        <button className="px-6 py-2.5 text-gray-500 hover:text-white rounded-xl font-bold text-sm transition-all">List</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-zinc-950 rounded-[2rem] border border-white/5 overflow-hidden group hover:border-white/30 transition-all duration-500"
                        >
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 right-6 z-10">
                                    <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center space-x-1.5">
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        <span className="text-white text-xs font-black">{item.rating}</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-gray-400 transition-colors">{item.name}</h3>
                                    <span className="text-2xl font-black text-white tracking-tighter shrink-0 ml-4">
                                        <span className="text-sm text-gray-500 font-bold mr-1">Rs.</span>
                                        {item.price}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800" />
                                        ))}
                                        <div className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-white text-black flex items-center justify-center text-[10px] font-black">+12</div>
                                    </div>
                                    <button className="flex items-center space-x-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-95">
                                        <Plus className="w-4 h-4" />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FrozenItems;
