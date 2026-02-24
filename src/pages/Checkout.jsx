import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, MapPin, MessageSquare, ChevronRight, ChevronLeft, Trash2, Plus, Minus, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orderService';

const Checkout = () => {
    const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [shippingData, setShippingData] = useState({
        address: '',
        city: '',
        phone: ''
    });

    const handleNext = () => {
        if (step === 1) {
            if (cart.length === 0) return;
            setStep(2);
        } else if (step === 2) {
            if (!shippingData.address || !shippingData.city || !shippingData.phone) return;
            setStep(3);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleConfirmOrder = async () => {
        setIsLoading(true);
        try {
            // 1. Create order in Database
            const orderData = {
                orderItems: cart.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item._id
                })),
                shippingAddress: {
                    address: shippingData.address,
                    city: shippingData.city,
                    phone: shippingData.phone,
                    postalCode: 'N/A' // Added default since model might still have it
                },
                paymentMethod: 'WhatsApp',
                totalPrice: cartTotal
            };

            const response = await createOrder(orderData);

            if (response.success) {
                const orderId = response.data._id;

                // 2. Construct WhatsApp Message
                const adminNumber = "923704152383"; // Replace with actual admin number
                const itemsText = cart.map(item => `• ${item.name} (${item.qty} x Rs.${item.price}) = Rs.${item.qty * item.price}`).join('\n');

                const message = `*NEW ORDER FROM FROZIFY* 🍦\n\n` +
                    `*Order ID:* ${orderId}\n` +
                    `*Customer:* ${user.username}\n` +
                    `*Phone:* ${shippingData.phone}\n` +
                    `*City:* ${shippingData.city}\n` +
                    `*Address:* ${shippingData.address}\n\n` +
                    `*ITEMS:*\n${itemsText}\n\n` +
                    `*TOTAL PRICE: Rs. ${cartTotal}*\n\n` +
                    `Please confirm my order. Thank you!`;

                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

                // 3. Open WhatsApp and Redirect
                window.open(whatsappUrl, '_blank');
                clearCart();
                window.location.href = '/order-success';
            }
        } catch (err) {
            alert(err.error || "Failed to process order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (cart.length === 0 && step === 1) {
        return (
            <div className="min-h-screen bg-black pt-40 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-8 border border-white/5">
                    <ShoppingCart className="w-10 h-10 text-gray-500" />
                </div>
                <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">YOUR CART IS EMPTY</h1>
                <p className="text-gray-500 mb-10 max-w-md">Looks like you haven't added any delicacies yet. Browse our selection and pick your favorites!</p>
                <button
                    onClick={() => navigate('/frozen-items')}
                    className="px-10 py-4 bg-white text-black rounded-2xl font-black hover:bg-gray-200 transition-all"
                >
                    EXPLORE ITEMS
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Header & Progress */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8"
                >
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase underline decoration-white/20 underline-offset-8">Checkout</h1>
                        <p className="text-gray-500 mt-4 font-medium uppercase tracking-widest text-xs">Step {step} of 3</p>
                    </div>

                    <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-full border border-white/5">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all duration-500 ${step >= s ? 'bg-white text-black scale-110 shadow-lg shadow-white/20' : 'bg-black text-gray-600'
                                    }`}
                            >
                                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-8 space-y-8"
                    >
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-zinc-950 rounded-[2.5rem] p-8 md:p-12 border border-white/5">
                                        <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
                                            <ShoppingCart className="w-6 h-6" />
                                            REVIEW YOUR ORDER
                                        </h2>
                                        <div className="space-y-8">
                                            {cart.map((item) => (
                                                <div key={item._id} className="flex gap-6 items-center border-b border-white/5 pb-8 last:border-0 last:pb-0">
                                                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 shrink-0 border border-white/10">
                                                        <img
                                                            src={item.image.startsWith('http') ? item.image : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${item.image}`}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.name}</h3>
                                                            <button
                                                                onClick={() => removeFromCart(item._id)}
                                                                className="text-gray-600 hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-between items-end">
                                                            <div className="flex items-center bg-black border border-white/10 rounded-full px-2 py-1">
                                                                <button onClick={() => updateQty(item._id, item.qty - 1)} className="p-1 hover:text-white text-gray-500"><Minus className="w-4 h-4" /></button>
                                                                <span className="w-8 text-center text-white font-black text-sm">{item.qty}</span>
                                                                <button onClick={() => updateQty(item._id, item.qty + 1)} className="p-1 hover:text-white text-gray-500"><Plus className="w-4 h-4" /></button>
                                                            </div>
                                                            <p className="text-white font-black">Rs. {item.price * item.qty}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        className="w-full bg-white text-black py-6 rounded-[2rem] font-black text-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/5 active:scale-[0.98]"
                                    >
                                        NEXT: SHIPPING DETAILS
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-zinc-950 rounded-[2.5rem] p-8 md:p-12 border border-white/5">
                                        <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
                                            <MapPin className="w-6 h-6" />
                                            SHIPPING INFORMATION
                                        </h2>
                                        <div className="space-y-8">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-4">Full Address</label>
                                                <textarea
                                                    value={shippingData.address}
                                                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                                                    placeholder="Street name, Apartment, etc."
                                                    className="w-full bg-black border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-white/40 transition-all resize-none h-32 text-lg"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-4">City</label>
                                                    <input
                                                        type="text"
                                                        value={shippingData.city}
                                                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                                                        placeholder="e.g. Lahore"
                                                        className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white text-lg focus:outline-none focus:border-white/40 transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-4">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        value={shippingData.phone}
                                                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                                                        placeholder="03XXXXXXXXX"
                                                        className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white text-lg focus:outline-none focus:border-white/40 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleBack}
                                            className="flex-1 bg-zinc-900 text-white py-6 rounded-[2rem] font-bold border border-white/10 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                            BACK
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={!shippingData.address || !shippingData.city || !shippingData.phone}
                                            className="flex-[2] bg-white text-black py-6 rounded-[2rem] font-black text-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale"
                                        >
                                            NEXT: CONFIRMATION
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-zinc-950 rounded-[2.5rem] p-10 border border-white/5 text-center">
                                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                                            <MessageSquare className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter italic underline decoration-green-500/30 underline-offset-8">Confirm via WhatsApp</h2>
                                        <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                                            To complete your order, we'll send a direct message to our coordinator. This ensures personal confirmation and faster delivery.
                                        </p>

                                        <div className="bg-black/40 border border-white/5 rounded-3xl p-8 mb-10 text-left space-y-4">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">DELIVERY TO</span>
                                                <span className="text-white font-black">{shippingData.city}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">TOTAL ITEMS</span>
                                                <span className="text-white font-black">{cart.length}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={handleBack}
                                                className="flex-1 bg-zinc-900 text-white py-6 rounded-[2rem] font-bold border border-white/10 hover:bg-zinc-800 transition-all"
                                            >
                                                BACK
                                            </button>
                                            <button
                                                onClick={handleConfirmOrder}
                                                disabled={isLoading}
                                                className="flex-[2] bg-green-500 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-500/20"
                                            >
                                                {isLoading ? (
                                                    <Loader2 className="w-6 h-6 animate-spin" />
                                                ) : (
                                                    <>
                                                        SEND TO WHATSAPP
                                                        <MessageSquare className="w-6 h-6" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Order Summary Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="lg:col-span-4 sticky top-40"
                    >
                        <div className="bg-zinc-950 rounded-[2.5rem] p-10 border border-white/5">
                            <h2 className="text-xl font-black text-white mb-8 border-b border-white/5 pb-6">SUMMARY</h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span>Rs. {cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium tracking-tight">
                                    <span>Shipping</span>
                                    <span className="text-green-500 font-bold uppercase text-xs">Free</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end mb-10">
                                <span className="text-gray-400 font-black text-xs uppercase tracking-[0.2em]">Total</span>
                                <span className="text-4xl font-black text-white tracking-tighter">Rs. {cartTotal}</span>
                            </div>

                            <div className="p-6 bg-zinc-900/30 rounded-3xl border border-white/5">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Checkout Account</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-black">{user?.username?.slice(0, 2).toUpperCase()}</div>
                                    <span className="text-sm font-bold text-white capitalize">{user?.username}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
