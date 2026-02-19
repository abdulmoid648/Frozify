import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Star, Shield, Zap, Users, Heart, Globe } from 'lucide-react';
import pattiesImg from '../assets/patties.png';
import prathaImg from '../assets/pratha.png';
import logo from '../assets/logo.jpg';

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const services = [
        {
            title: "Gourmet Patties",
            description: "Flash-frozen at peak freshness to lock in every bit of flavor and nutrition.",
            img: pattiesImg,
            color: "from-blue-500/20"
        },
        {
            title: "Frozen Pratha",
            description: "Handcrafted by gourmet chefs using only the finest organic ingredients.",
            img: prathaImg,
            color: "from-indigo-500/20"
        },
        {
            title: "Smart Delivery",
            description: "Climate-controlled shipping ensures your treats arrive perfectly frozen.",
            img: "https://images.unsplash.com/photo-1633501053847-482403986b6a?auto=format&fit=crop&q=80&w=800",
            color: "from-purple-500/20"
        },
        {
            title: "Eco Packaging",
            description: "Sustainable materials that keep your food cold and our planet green.",
            img: "https://images.unsplash.com/photo-1605600611284-195209f0ea67?auto=format&fit=crop&q=80&w=800",
            color: "from-green-500/20"
        },
        {
            title: "Global Flavors",
            description: "Unique and exotic flavors inspired by global culinary traditions.",
            img: "https://images.unsplash.com/photo-1551024601-bec78aea70dd?auto=format&fit=crop&q=80&w=800",
            color: "from-pink-500/20"
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = services.length - itemsPerPage;

    const nextSlide = () => {
        setActiveIndex(prev => (prev < maxIndex ? prev + 1 : 0));
    };

    const prevSlide = () => {
        setActiveIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
    };

    return (
        <div className="bg-black text-white">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900/20 blur-[120px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-black tracking-widest uppercase mb-8 inline-block">
                            Premium Frozen Snacks
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-tight">
                            PREMIUM <br />
                            <span className="bg-gradient-to-r text-white">FROZEN FOOD</span>
                        </h1>
                        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                            Experience the future of snacking with our flash-frozen gourmet treats.
                            Delivered fresh, preserved perfectly, tasted exceptionally.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="px-10 py-5 bg-white text-black rounded-full font-black text-lg text-black hover:bg-black hover:text-white transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] active:scale-95 flex items-center group">
                                Order Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-10 py-5 bg-zinc-900 text-white rounded-full font-black text-lg border border-white/5 hover:bg-zinc-800 transition-all active:scale-95">
                                Explore Menu
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Image Decoration (Optional) */}
                <motion.img
                    src={pattiesImg}
                    className="absolute -bottom-20 -right-20 w-[600px] opacity-20 blur-sm pointer-events-none hidden lg:block"
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </section>


            {/* Services/Menu Preview Section */}
            <section id="menu" className="py-32 px-6 md:px-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative">

                    <div className="relative">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute -left-4 md:-left-8 top-[40%] -translate-y-1/2 z-30 bg-white/5 hover:bg-white hover:text-black p-4 rounded-full border border-white/10 transition-all active:scale-95 group backdrop-blur-md"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute -right-4 md:-right-8 top-[40%] -translate-y-1/2 z-30 bg-white/5 hover:bg-white hover:text-black p-4 rounded-full border border-white/10 transition-all active:scale-95 group backdrop-blur-md"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <div className="overflow-hidden">
                            <div
                                className="carousel-track"
                                style={{
                                    transform: `translateX(-${activeIndex * (100 / itemsPerPage)}%)`,
                                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                            >
                                {services.map((service, idx) => (
                                    <div
                                        key={idx}
                                        style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
                                        className="px-4 group"
                                    >
                                        <div className={`relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-gradient-to-br ${service.color} to-transparent mb-8 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]`}>
                                            <div className="absolute inset-0">
                                                <img
                                                    src={service.img}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
                                            <div className="absolute bottom-10 left-10 z-20">
                                                <h3 className="text-3xl font-black text-white mb-2 leading-tight">{service.title}</h3>
                                                <button className="text-white font-bold flex items-center text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                                    View Product <ArrowRight className="ml-2 w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 font-medium leading-relaxed px-4">
                                            {service.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section (Full Integration) */}
            <section id="about" className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-white tracking-tight">The Flash-Freeze Revolution</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Conventional frozen food compromises on texture and taste. At Frozify, we utilize cutting-edge flash-freezing technology at -40°C, which prevents the formation of large ice crystals. This preserves the cellular structure of our ingredients, locking in peak flavor and nutrients.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Every samosa, kebab, and roll is handcrafted by our team of expert chefs using only organic, locally-sourced ingredients. We don't use stabilizers, artificial colors, or MSG—just pure, honest food.
                            </p>
                        </div>
                        <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 relative group bg-white/5 flex items-center justify-center p-12">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-90"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Zero Preservatives", desc: "Pure ingredients, preserved only by cold." },
                            { icon: Users, title: "Artisanal Team", desc: "Hand-rolled with care by gourmet masters." },
                            { icon: Heart, title: "Locally Sourced", desc: "Supporting local farmers and organic producers." },
                            { icon: Globe, title: "Global Standards", desc: "International hygiene and quality certifications." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-zinc-950 p-8 rounded-3xl border border-white/5 hover:border-white/30 transition-all hover:-translate-y-2"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Newsletter/CTA Section */}
            <section className="py-32 px-6 md:px-12 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-zinc-900/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter">JOIN THE <br /><span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent italic">REVOLUTION.</span></h2>
                    <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto font-medium">Stay updated with our latest flavors and exclusive offers delivered straight to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="flex-grow px-8 py-5 bg-zinc-900 border border-white/10 rounded-full text-white placeholder:text-gray-600 focus:outline-none focus:border-white transition-all font-medium text-lg"
                        />
                        <button className="px-10 py-5 bg-white text-black rounded-full font-black text-lg hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/10">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
