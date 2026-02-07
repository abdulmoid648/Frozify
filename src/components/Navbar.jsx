import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        // Reset mobile menu on route change
        setIsMobileMenuOpen(false);
        setIsMobileDropdownOpen(false);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location]);

    const frozenItems = ['Samosas', 'Rolls', 'Kababs', 'Parathas'];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-black/100 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
                : 'bg-black/100 backdrop-blur-sm py-5'
                }`}
        >
            <div className="w-full px-4 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <img
                            src={logo}
                            alt="Frozify Logo"
                            className="h-20 md:h-20 w-auto cursor-pointer object-contain transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <span style={{ display: 'none' }} className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent cursor-pointer tracking-tight">
                            Frozify
                        </span>
                    </Link>

                    {/* Center Links: Desktop */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors">Home</Link>

                        {/* Frozen Items Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => {
                                setTimeout(() => {
                                    setIsDropdownOpen(false);
                                }, 100);
                            }}
                        >
                            <Link to="/frozen-items" className="flex items-center text-gray-300 hover:text-white font-medium transition-colors py-2">
                                Frozen Items
                                <ChevronDown className={`ml-1.5 w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </Link>

                            <div className={`absolute top-full left-0 w-52 pt-2 transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                                <div className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-3 border border-white/10">
                                    {frozenItems.map((item) => (
                                        <Link
                                            key={item}
                                            to={`/frozen-items/${item.toLowerCase()}`}
                                            className="block px-5 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all font-medium"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Link to="/fresh-meals" className="text-gray-300 hover:text-white font-medium transition-colors">Fresh Meals</Link>
                            <span className="ml-2 px-2 py-0.5 text-[9px] font-black tracking-widest uppercase bg-white text-black rounded-md shadow-[0_0_15px_rgba(59,130,246,0.5)]">New</span>
                        </div>

                        <Link to="/about" className="text-gray-300 hover:text-white font-medium transition-colors">About Us</Link>
                    </div>

                    {/* Right Side: Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link to="/login" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                            <User className="w-5 h-5" />
                        </Link>
                        <button className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-black">
                                3
                            </span>
                        </button>
                        <Link to="/login" className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-all shadow-xl active:scale-95">
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu: Dropdown */}
            <div className={`md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/5 transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="px-6 pt-4 pb-10 space-y-2">
                    <Link to="/" className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">Home</Link>
                    <button
                        onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                        className="w-full flex justify-between items-center px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                        Frozen Items
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`pl-8 space-y-1 transition-all duration-300 overflow-hidden ${isMobileDropdownOpen ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        {frozenItems.map(item => (
                            <Link key={item} to={`/frozen-items/${item.toLowerCase()}`} className="block px-4 py-2.5 text-base text-gray-500 hover:text-white transition-colors">{item}</Link>
                        ))}
                    </div>
                    <Link to="/fresh-meals" className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center justify-between">
                        Fresh Meals
                        <span className="px-2 py-0.5 text-[9px] font-black bg-blue-500 text-white rounded-md">NEW</span>
                    </Link>
                    <Link to="/about" className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">About Us</Link>

                    <div className="pt-8 flex flex-col space-y-4 px-4 border-t border-white/10 mt-4">
                        <Link to="/login" className="w-full bg-white text-black px-6 py-4 rounded-2xl font-bold text-lg shadow-2xl active:scale-[0.98] transition-all text-center">Login</Link>
                        <div className="flex items-center justify-center space-x-6 py-4">
                            <Search className="w-6 h-6 text-gray-400" />
                            <Link to="/login">
                                <User className="w-6 h-6 text-gray-400" />
                            </Link>
                            <div className="relative">
                                <ShoppingCart className="w-6 h-6 text-gray-400" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
