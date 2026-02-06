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