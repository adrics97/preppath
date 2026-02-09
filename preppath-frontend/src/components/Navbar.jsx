import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import api from '../services/api';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isPro, setIsPro] = useState(null);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await api.get('/subscription/current');
                setIsPro(response.data.planName === 'PRO');
            } catch (error) {
                console.error('Error fetching subscription:', error);
                setIsPro(false); // Si falla, asumir FREE
            }
        };

        fetchSubscription();
    }, []);

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1
                            className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer"
                            onClick={() => navigate('/dashboard')}
                        >
                            PrepPath
                        </h1>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => navigate('/applications')}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                        >
                            Applications
                        </button>
                        <button
                            onClick={() => navigate('/companies')}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                        >
                            Companies
                        </button>
                        <button
                            onClick={() => navigate('/questions')}
                            className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                        >
                            Questions
                        </button>
                    </div>

                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center space-x-4">

                        {/* Botón Upgrade to Pro */}
                        {isPro === false && (<button
                            onClick={() => navigate('/pricing')}
                            className="hidden sm:flex bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>Upgrade to Pro</span>
                        </button>
                        )}

                        {/* Dropdown de usuario */}
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className="flex items-center space-x-3 cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="hidden lg:block">
                                    <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                                <svg
                                    className="w-4 h-4 text-gray-500 transition-transform"
                                    style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                    <button
                                        onClick={() => {
                                            navigate('/subscription');
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 flex items-center transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">My Subscription</p>
                                            <p className="text-xs text-gray-500">View plan and usage</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => {
                                            navigate('/pricing');
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 flex items-center transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">Plans</p>
                                            <p className="text-xs text-gray-500">View options</p>
                                        </div>
                                    </button>

                                    <hr className="my-2 border-gray-200" />

                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <p className="font-medium">Logout</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {showMobileMenu ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 py-3 space-y-1">
                        {/* User info */}
                        <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </div>

                        {/* Navigation links */}
                        <button
                            onClick={() => {
                                navigate('/dashboard');
                                setShowMobileMenu(false);
                            }}
                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => {
                                navigate('/applications');
                                setShowMobileMenu(false);
                            }}
                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            Applications
                        </button>
                        <button
                            onClick={() => {
                                navigate('/companies');
                                setShowMobileMenu(false);
                            }}
                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            Companies
                        </button>
                        <button
                            onClick={() => {
                                navigate('/questions');
                                setShowMobileMenu(false);
                            }}
                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            Questions
                        </button>

                        <hr className="my-2" />

                        {/* Subscription links */}
                        <button
                            onClick={() => {
                                navigate('/subscription');
                                setShowMobileMenu(false);
                            }}
                            className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                            </svg>
                            My Subscription
                        </button>
                        {isPro === false && (<button
                            onClick={() => {
                                navigate('/pricing');
                                setShowMobileMenu(false);
                            }}
                            className="w-full text-left px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Upgrade to Pro
                        </button>)}

                        <hr className="my-2" />

                        {/* Logout */}
                        <button
                            onClick={() => {
                                handleLogout();
                                setShowMobileMenu(false);
                            }}
                            className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;