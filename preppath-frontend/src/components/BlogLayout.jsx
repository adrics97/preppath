import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import Footer from './landing/Footer';

const BlogLayout = ({ children, seo }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            <SEO {...seo} />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <button
                            onClick={() => navigate('/')}
                            className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                        >
                            PrepPath
                        </button>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/blog')}
                                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                            >
                                ← All articles
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all text-sm font-semibold"
                            >
                                Get Started Free
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="pt-16">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default BlogLayout;
