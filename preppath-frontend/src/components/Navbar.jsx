import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">PrepPath</h1>
                    </div>

                    {/* Navigation Links */}
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

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">

                        <button
                            onClick={() => navigate('/pricing')}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition flex items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>Upgrade to Pro</span>
                        </button>

                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;