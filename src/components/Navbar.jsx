import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getCategories } from '../api/categoryService';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItemsCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(res.data);
            } catch (err) {
                console.error('Navbar category fetch failed', err);
            }
        };

        window.addEventListener('scroll', handleScroll);
        fetchCategories();
        // Reset mobile menu on route change
        setIsMobileMenuOpen(false);
        setIsMobileDropdownOpen(false);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location]);

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: sectionId } });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Effect to handle scrolling when navigating back to home from another page
    useEffect(() => {
        if (location.pathname === '/' && location.state?.scrollTo) {
            const sectionId = location.state.scrollTo;
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
            // Clear state after scrolling
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const frozenItems = ['Samosas', 'Kababs', 'Parathas', 'More Items'];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-black/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3'
                : 'bg-black/100 backdrop-blur-sm py-5'
                }`}
        >
            <div className="w-full px-4 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center">
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-shrink-0 flex items-center">
                        <img
                            src={logo}
                            alt="Frozify Logo"
                            className="h-16 md:h-16 w-auto cursor-pointer object-contain transition-transform duration-300 hover:scale-105 rounded-xl"
                        />
                    </Link>

                    {/* Center Links: Desktop */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link
                            to="/"
                            onClick={(e) => {
                                if (location.pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            className="text-gray-300 hover:text-white font-medium transition-colors"
                        >
                            Home
                        </Link>

                        {/* Frozen Items Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <div className="flex items-center text-gray-300 hover:text-white font-medium transition-colors py-2 cursor-pointer">
                                <Link to="/frozen-items">Items</Link>
                                <ChevronDown className={`ml-1.5 w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>

                            <div className={`absolute top-full left-0 w-52 pt-2 transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                                <div className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-3 border border-white/10">
                                    {categories.length > 0 ? (
                                        categories.map((cat) => (
                                            <Link
                                                key={cat._id}
                                                to={`/frozen-items/${cat.name.toLowerCase()}`}
                                                className="block px-5 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all font-medium"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="px-5 py-2.5 text-xs text-gray-600 italic">No categories</div>
                                    )}
                                    <div className="border-t border-white/5 my-2" />
                                    <button
                                        onClick={() => scrollToSection('menu')}
                                        className="w-full text-left px-5 py-2.5 text-sm text-white hover:bg-white/5 transition-all font-bold"
                                    >
                                        Featured Delights
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Link to="/fresh-meals" className="text-gray-300 hover:text-white font-medium transition-colors">Fresh Meals</Link>
                            <span className="ml-2 px-2 py-0.5 text-[9px] font-black tracking-widest uppercase bg-white text-black rounded-md shadow-[0_0_15px_rgba(255,255,255,0.3)]">New</span>
                        </div>

                        <button
                            onClick={() => scrollToSection('about')}
                            className="text-gray-300 hover:text-white font-medium transition-colors"
                        >
                            About Us
                        </button>

                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-white font-bold bg-white/10 px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                                Admin
                            </Link>
                        )}
                    </div>

                    {/* Right Side: Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user?.role !== 'admin' && (
                            <>


                                <Link to="/checkout" className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-black">
                                        {cartItemsCount}
                                    </span>
                                </Link>
                            </>
                        )}

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 bg-zinc-900/50 border border-white/10 px-4 py-2 rounded-full cursor-pointer hover:border-white/30 transition-all">
                                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-black uppercase">
                                        {user.username.slice(0, 2)}
                                    </div>
                                    <span className="text-sm font-bold text-white capitalize">{user.username}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-500/5 rounded-full transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white text-black px-8 py-2.5 rounded-full font-bold hover:bg-gray-100 transition-all shadow-xl active:scale-95">
                                Login
                            </Link>
                        )}
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
            <div className={`md:hidden bg-black/98 backdrop-blur-2xl border-t border-white/5 transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="px-6 pt-4 pb-10 space-y-2">
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">Home</Link>

                    <div className="space-y-1">
                        <button
                            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                            className="w-full flex justify-between items-center px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                        >
                            Frozen Items
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`pl-8 space-y-1 transition-all duration-300 overflow-hidden ${isMobileDropdownOpen ? 'max-h-80 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            {categories.map(cat => (
                                <Link key={cat._id} to={`/frozen-items/${cat.name.toLowerCase()}`} className="block px-4 py-2.5 text-base text-gray-500 hover:text-white transition-colors">{cat.name}</Link>
                            ))}
                            <button
                                onClick={() => scrollToSection('menu')}
                                className="block w-full text-left px-4 py-2.5 text-base text-white hover:text-gray-300 transition-colors font-bold"
                            >
                                Featured
                            </button>
                        </div>
                    </div>

                    <Link to="/fresh-meals" className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center justify-between">
                        Fresh Meals
                        <span className="px-2 py-0.5 text-[9px] font-black bg-white text-black rounded-md">NEW</span>
                    </Link>

                    <button
                        onClick={() => scrollToSection('about')}
                        className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                        About Us
                    </button>

                    {user?.role === 'admin' && (
                        <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-bold text-white bg-white/5 border border-white/10 rounded-xl transition-all">
                            Admin Dashboard
                        </Link>
                    )}

                    <div className="pt-8 flex flex-col space-y-4 px-4 border-t border-white/10 mt-4">
                        {user ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 bg-zinc-900/50 p-4 rounded-2xl">
                                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black uppercase">
                                        {user.username.slice(0, 2)}
                                    </div>
                                    <span className="font-bold text-white capitalize">{user.username}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-4 rounded-2xl font-bold text-lg transition-all text-center"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="w-full bg-white text-black px-6 py-4 rounded-2xl font-bold text-lg shadow-2xl active:scale-[0.98] transition-all text-center">Login</Link>
                        )}

                        {user?.role !== 'admin' && (
                            <div className="flex items-center justify-center space-x-6 py-4">
                                <Search className="w-6 h-6 text-gray-400" />
                                <Link to="/checkout" className="relative">
                                    <ShoppingCart className="w-6 h-6 text-gray-400" />
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{cartItemsCount}</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;
