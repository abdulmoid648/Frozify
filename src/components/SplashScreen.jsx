import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpg';

const SplashScreen = ({ finishLoading }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timeout = setTimeout(() => {
            finishLoading();
        }, 2500);
        return () => clearTimeout(timeout);
    }, [finishLoading]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
            <AnimatePresence>
                {isMounted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="relative mb-8"
                        >
                            <img
                                src={logo}
                                alt="Frozify Logo"
                                className="h-24 md:h-32 w-auto mx-auto rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-white rounded-2xl blur-2xl -z-10"
                            />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-3xl md:text-5xl font-black tracking-[0.2em] text-white uppercase"
                        >
                            FROZIFY
                        </motion.h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 max-w-[200px] mx-auto"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SplashScreen;
