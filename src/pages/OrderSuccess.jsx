import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const OrderSuccess = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart on successful order landing
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-black pt-40 pb-24 px-6 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-10 shadow-2xl shadow-green-500/20"
            >
                <CheckCircle className="w-16 h-16 text-white" />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter italic uppercase">Order Placed!</h1>
                <p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto font-medium">
                    Your delicacies are being prepared and will be at your doorstep before they even think about melting.
                </p>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <Link
                    to="/"
                    className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold border border-white/5 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                    <Home className="w-5 h-5" />
                    BACK TO HOME
                </Link>
                <Link
                    to="/frozen-items"
                    className="px-10 py-4 bg-white text-black rounded-2xl font-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5"
                >
                    ORDER MORE
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
                className="mt-20 flex items-center gap-3 text-gray-600 font-bold uppercase tracking-[0.3em] text-[10px]"
            >
                <Package className="w-4 h-4" />
                <span>Track your order in your profile soon</span>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
