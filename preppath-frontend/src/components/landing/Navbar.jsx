import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                        >
                            PrepPath
                        </button>
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => scrollToSection('features')}
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection('pricing')}
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Pricing
                        </button>
                        <button
                            onClick={() => scrollToSection('faq')}
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            FAQ
                        </button>
                        <button
                            onClick={() => navigate('/blog')}
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Blog
                        </button>
                    </div>

                    {/* CTA Buttons - Right */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 pt-2 space-y-3 border-t border-gray-100 mt-2">
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => scrollToSection('features')}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection('pricing')}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        >
                            Pricing
                        </button>
                        <button
                            onClick={() => scrollToSection('faq')}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        >
                            FAQ
                        </button>
                        <button
                            onClick={() => { navigate('/blog'); setIsMenuOpen(false); }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        >
                            Blog
                        </button>

                        <div className="pt-2 space-y-2">
                            <button
                                onClick={() => navigate('/login')}
                                className="block w-full text-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;