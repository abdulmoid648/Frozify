import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Plus, Star, Loader2, ChevronRight, CheckCircle } from 'lucide-react';
import { getProducts } from '../api/productService';
import { getCategories } from '../api/categoryService';
import { useCart } from '../context/CartContext';

// ProductCard must be OUTSIDE FrozenItems so React doesn't remount it on every render
const ProductCard = ({ item, getImageUrl }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(item);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-950 rounded-[2rem] border border-white/5 overflow-hidden group hover:border-white/30 transition-all duration-500 h-full"
        >
            <div className="aspect-[4/3] overflow-hidden relative">
                <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 z-10">
                    <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center space-x-1.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-white text-xs font-black">4.8</span>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-gray-400 transition-colors uppercase tracking-tight">{item.name}</h3>
                    <span className="text-2xl font-black text-white tracking-tighter shrink-0 ml-4">
                        <span className="text-sm text-gray-500 font-bold mr-1">Rs.</span>
                        {item.price}
                    </span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                    {item.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800" />
                        ))}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 shadow-lg ${added
                                ? 'bg-green-500 text-white shadow-green-500/20 scale-105'
                                : 'bg-white text-black hover:bg-gray-200 shadow-white/10'
                            }`}
                    >
                        {added ? (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Added!</span>
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                <span>Add To Cart</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const FrozenItems = () => {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsRes, categoriesRes] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);

                if (productsRes.success) {
                    setItems(productsRes.data);
                } else {
                    setError('Failed to load products');
                }

                if (categoriesRes.success) {
                    setCategories(categoriesRes.data);
                }
            } catch (err) {
                setError(err.error || 'Server connection error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to get image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath || imagePath === 'no-photo.jpg' || imagePath === '') {
            return `https://images.unsplash.com/photo-1601050638917-3f048d0a0b6d?auto=format&fit=crop&q=80&w=400`;
        }
        if (imagePath.startsWith('http')) return imagePath;
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        return `${baseUrl}${imagePath}`;
    };

    // Filter items by category if one is specified in the URL
    const filteredItems = category
        ? items.filter(item => item.category.toLowerCase() === category.toLowerCase())
        : items;

    // Group items by category for the "All Items" view
    const groupedItems = categories.map(cat => ({
        ...cat,
        products: items.filter(item => item.category.toLowerCase() === cat.name.toLowerCase())
    })).filter(group => group.products.length > 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-white animate-spin opacity-20" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-3xl font-black text-white mb-4">Oops!</h2>
                <p className="text-gray-500 mb-8 max-w-md">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-24 px-6 md:px-12 min-h-screen bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-16">
                    <div className="max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter capitalize italic"
                        >
                            {category || 'ALL ITEMS'}
                        </motion.h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed">
                            {filteredItems.length === 0
                                ? `Our chefs are preparing fresh stock for ${category}. Check back very soon!`
                                : `Experience the peak of fresh-frozen technology. Every item is flash-frozen at sub-zero temperatures to lock in every note of flavor.`}
                        </p>
                    </div>
                </div>

                {category ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredItems.map((item) => <ProductCard key={item._id} item={item} getImageUrl={getImageUrl} />)}
                    </div>
                ) : (
                    <div className="space-y-32">
                        {groupedItems.map((group, idx) => (
                            <motion.section
                                key={group._id}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative"
                            >
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-6">
                                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">{group.name}</h2>
                                        <div className="h-0.5 w-24 bg-white/20 hidden md:block" />
                                    </div>
                                    <Link
                                        to={`/frozen-items/${group.name.toLowerCase()}`}
                                        className="text-gray-500 hover:text-white flex items-center gap-2 font-black uppercase text-xs tracking-widest transition-all group"
                                    >
                                        View All <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {group.products.slice(0, 3).map((item) => (
                                        <ProductCard key={item._id} item={item} getImageUrl={getImageUrl} />
                                    ))}
                                </div>
                            </motion.section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FrozenItems;
