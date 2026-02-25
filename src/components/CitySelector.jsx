import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, Clock } from 'lucide-react';

const cities = [
    { name: 'Khanewal', available: true },
    { name: 'Multan', available: false },
    { name: 'Lahore', available: false },
    { name: 'Karachi', available: false },
    { name: 'Islamabad', available: false },
    { name: 'Faisalabad', available: false },
    { name: 'Rawalpindi', available: false },
    { name: 'Bahawalpur', available: false },
];

const CitySelector = ({ onCitySelect }) => {
    const [selected, setSelected] = useState(null);

    const handleConfirm = () => {
        if (!selected) return;
        localStorage.setItem('frozify_city', selected);
        onCitySelect(selected);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center px-6"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-lg"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-3">
                        Choose Your City
                    </h1>
                    <p className="text-gray-500 font-medium text-sm">
                        Frozify delivers premium frozen delights to your doorstep.
                    </p>
                </div>

                {/* City Grid */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {cities.map((city) => (
                        <button
                            key={city.name}
                            disabled={!city.available}
                            onClick={() => city.available && setSelected(city.name)}
                            className={`relative p-4 rounded-2xl border text-left transition-all duration-300 ${city.available
                                    ? selected === city.name
                                        ? 'bg-white text-black border-white scale-[1.03] shadow-lg shadow-white/10'
                                        : 'bg-zinc-900/60 text-white border-white/10 hover:border-white/40 hover:bg-zinc-800/60'
                                    : 'bg-zinc-950 text-gray-600 border-white/5 cursor-not-allowed'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-black text-sm uppercase tracking-tight">{city.name}</span>
                                {selected === city.name && city.available && (
                                    <CheckCircle className="w-4 h-4 text-black" />
                                )}
                                {!city.available && (
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-gray-600" />
                                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Soon</span>
                                    </div>
                                )}
                            </div>
                            {city.available && (
                                <span className="text-[10px] font-bold uppercase tracking-widest mt-1 block text-green-500">
                                    Available
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Confirm Button */}
                <button
                    onClick={handleConfirm}
                    disabled={!selected}
                    className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg uppercase tracking-tight transition-all hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                    {selected ? `Deliver to ${selected}` : 'Select a City to Continue'}
                </button>

                <p className="text-center text-gray-600 text-xs mt-4 font-medium">
                    You can change your city anytime later.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default CitySelector;
