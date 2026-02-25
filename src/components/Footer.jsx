import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { getCategories } from '../api/categoryService';

const Footer = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(res => {
            if (res.success) setCategories(res.data);
        }).catch(() => { });
    }, []);

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
                            {/* PASTE YOUR INSTAGRAM URL BELOW */}
                            <a href="https://www.instagram.com/frozify.0?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full text-black hover:text-white hover:bg-white/10 transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            {/* PASTE YOUR FACEBOOK URL BELOW */}
                            <a href="https://www.facebook.com/share/1DVej3WzRG/" target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full text-black hover:text-white hover:bg-white/10 transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            {/* PASTE YOUR WHATSAPP NUMBER BELOW — format: https://wa.me/92XXXXXXXXXX */}
                            <a href="https://wa.me/923704252383" target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full text-black hover:text-white hover:bg-white/10 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
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

                    {/* Categories - dynamic from admin */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Categories</h4>
                        <ul className="space-y-4">
                            {categories.map(cat => (
                                <li key={cat._id}>
                                    <Link to={`/frozen-items/${cat.name.toLowerCase()}`} className="hover:text-white transition-colors capitalize">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                            {categories.length === 0 && (
                                <li className="text-gray-600 text-sm">Loading...</li>
                            )}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            {/* PASTE YOUR GOOGLE MAPS LINK BELOW */}
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-white shrink-0" />
                                <a
                                    href="https://www.google.com/maps/place/30%C2%B018'29.9%22N+71%C2%B056'49.3%22E/@30.3083144,71.9444417,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.3083144!4d71.9470166?hl=en&entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm hover:text-white transition-colors underline-offset-2 hover:underline"
                                >
                                    Street no 2, Khanewal
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-white shrink-0" />
                                <span className="text-sm">+92 300 1234567</span>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-600 text-[10px] uppercase tracking-widest font-black">
                    <p>© 2026 FROZIFY. ALL RIGHTS RESERVED.</p>
                    <div className="flex space-x-8">
                        {/* PASTE YOUR PRIVACY POLICY LINK BELOW */}
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        {/* PASTE YOUR TERMS OF SERVICE LINK BELOW */}
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
