import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Heart, Globe } from 'lucide-react';
import logo from '../assets/logo.jpg';

const AboutUs = () => {
    return (
        <div className="pt-40 pb-24 px-6 md:px-12 min-h-screen bg-black">
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-7xl mx-auto"
            >
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
                        <div key={i} className="bg-zinc-950 p-8 rounded-3xl border border-white/5 hover:border-white/30 transition-all hover:-translate-y-2">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default AboutUs;
