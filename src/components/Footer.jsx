import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Footer = () => {
    return (
        <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10 px-6 md:px-12 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <img src={logo} alt="Frozify" className="h-16 w-auto rounded-xl" />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Elevating your snack experience with gourmet frozen treats, flash-frozen to preserve peak freshness and artisanal flavor.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-white rounded-full text-black hover:text-white hover:bg-white/10 transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-black hover:text-white hover:bg-white/10 transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-black hover:text-white hover:bg-white/10 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Explore</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="transition-colors">Home</Link></li>
                            <li><Link to="/frozen-items" className="transition-colors">Frozen Items</Link></li>
                            <li><Link to="/fresh-meals" className="transition-colors">Fresh Meals</Link></li>
                            <li><Link to="/about" className="transition-colors">Our Story</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Categories</h4>
                        <ul className="space-y-4">
                            <li><Link to="/frozen-items/samosas" className="hover:text-white transition-colors">Samosas</Link></li>
                            <li><Link to="/frozen-items/rolls" className="hover:text-white transition-colors">Spring Rolls</Link></li>
                            <li><Link to="/frozen-items/kababs" className="hover:text-white transition-colors">Gourmet Kababs</Link></li>
                            <li><Link to="/frozen-items/parathas" className="hover:text-white transition-colors">Flaky Parathas</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-white shrink-0" />
                                <span className="text-sm"> Street no 2, Khanewal</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-white shrink-0" />
                                <span className="text-sm">+92 300 1234567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-white shrink-0" />
                                <span className="text-sm">hello@frozify.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-600 text-[10px] uppercase tracking-widest font-black">
                    <p>© 2026 FROZIFY. ALL RIGHTS RESERVED.</p>
                    <div className="flex space-x-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
