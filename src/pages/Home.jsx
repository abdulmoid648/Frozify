import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Star, Shield, Zap, Users, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import pattiesImg from '../assets/patties.png';
import prathaImg from '../assets/pratha.png';
import samosaImg from '../assets/samosa.png';
import shamiImg from '../assets/Shami.png';
import koftaImg from '../assets/Kofta.png';
import logo from '../assets/logo.jpg';

const Home = () => {
    // Selection of items for the continuous carousel
    const featuredItems = [
        {
            title: "Crispy Samosa",
            description: "Traditional tea-time favorite with a perfectly spiced filling and flaky crust.",
            img: samosaImg,
            color: "from-orange-500/20"
        },
        {
            title: "Shami Kabab",
            description: "Melt-in-your-mouth minced meat patties with authentic herbal notes.",
            img: shamiImg,
            color: "from-red-500/20"
        },
        {
            title: "Gourmet Kofta",
            description: "Tender, seasoned meatballs prepared using age-old family recipes.",
            img: koftaImg,
            color: "from-amber-500/20"
        },
        {
            title: "Premium Patties",
            description: "Flash-frozen at peak freshness to lock in every bit of flavor.",
            img: pattiesImg,
            color: "from-blue-500/20"
        },
        {
            title: "Frozen Pratha",
            description: "Handcrafted using only the finest organic ingredients and pure ghee.",
            img: prathaImg,
            color: "from-indigo-500/20"
        }
    ];

    // Double the items for seamless infinite scroll
    const scrollItems = [...featuredItems, ...featuredItems];


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
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
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
                            <Link
                                to="/frozen-items"
                                className="px-10 py-5 bg-white text-black rounded-full font-black text-lg hover:bg-black hover:text-white transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] active:scale-95 flex items-center group"
                            >
                                Order Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Image Decorations */}
                <motion.img
                    src={samosaImg}
                    className="absolute top-20 left-10 w-[300px] opacity-20 blur-[2px] pointer-events-none hidden lg:block"
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -10, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                    src={pattiesImg}
                    className="absolute -bottom-20 -right-20 w-[600px] opacity-20 blur-sm pointer-events-none hidden lg:block"
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </section>


            <section id="menu" className="py-32 px-6 md:px-12 relative overflow-hidden bg-black">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-7xl mx-auto relative"
                >
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div>
                            <span className="text-white font-black tracking-widest text-xs uppercase mb-4 block">Our Specialties</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase line-clamp-2">Featured <br /><span className="text-gray-600">Delights</span></h2>
                        </div>
                        <p className="text-gray-500 max-w-sm font-medium">A curated selection of our most popular frozen snacks, ready to heat and eat.</p>
                    </div>

                    <div className="relative overflow-hidden py-10">
                        <motion.div
                            className="flex gap-8"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                            style={{ width: "fit-content" }}
                        >
                            {scrollItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="w-[350px] md:w-[450px] flex-shrink-0 group"
                                >
                                    <div className={`relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-gradient-to-br ${item.color} to-transparent mb-8 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]`}>
                                        <div className="absolute inset-0">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
                                        <div className="absolute bottom-10 left-10 z-20">
                                            <h3 className="text-3xl font-black text-white mb-2 leading-tight uppercase italic">{item.title}</h3>
                                            <Link
                                                to="/frozen-items"
                                                className="text-white font-bold flex items-center text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0"
                                            >
                                                Order Now <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 font-medium leading-relaxed px-4">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <section id="about" className="py-32 px-6 md:px-12 bg-black border-t border-white/5">
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="text-center mb-24">
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic">
                            OUR <span className="text-gray-600">STORY</span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                            Frozify was born from a simple mission: to preserve the soul of gourmet cooking in every frozen bite.
                        </p>
                    </div>

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
                        <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 relative group">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Zero Preservatives", desc: "Pure ingredients, preserved only by cold." },
                            { icon: Users, title: "Artisanal Team", desc: "Hand-rolled with care by gourmet masters." },
                            { icon: Heart, title: "Locally Sourced", desc: "Supporting local farmers and organic producers." },
                            { icon: Globe, title: "Global Standards", desc: "International hygiene and quality certifications." }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="bg-zinc-950 p-8 rounded-3xl border border-white/5 hover:border-white/30 transition-all hover:-translate-y-2"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>


            {/* Newsletter/CTA Section */}
            <section className="py-32 px-6 md:px-12 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-zinc-900/5 blur-[150px] rounded-full pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase italic">JOIN THE <br /><span className="text-gray-600">REVOLUTION.</span></h2>
                    <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">Stay updated with our latest flavors and exclusive offers delivered straight to your inbox.</p>
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
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
