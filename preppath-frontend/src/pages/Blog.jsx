import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/landing/Footer';

const articles = [
    {
        slug: 'how-to-track-job-applications-developer',
        title: 'How to Track Your Job Applications as a Developer',
        excerpt: 'Applying to multiple companies without a system leads to missed follow-ups, forgotten deadlines, and unnecessary stress. Here\'s how to stay organized during your job search.',
        date: 'March 2, 2026',
        readTime: '5 min read',
        category: 'Job Search',
    },
    {
        slug: 'technical-interview-preparation-guide',
        title: 'Technical Interview Preparation: The Complete Developer Guide',
        excerpt: 'From data structures to system design — a practical guide to preparing for technical interviews at any company, from startups to FAANG.',
        date: 'March 2, 2026',
        readTime: '8 min read',
        category: 'Interview Prep',
    },
    {
        slug: 'developer-job-search-tips',
        title: '10 Mistakes Developers Make During Their Job Search (And How to Fix Them)',
        excerpt: 'Most developers are great at coding but overlook the non-technical side of job hunting. These are the most common mistakes and what to do instead.',
        date: 'March 2, 2026',
        readTime: '6 min read',
        category: 'Career',
    },
];

const Blog = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Blog - PrepPath | Developer Job Search & Interview Prep"
                description="Guides and tips for developers on job searching, tracking applications, and acing technical interviews."
                url="https://preppathapp.com/blog"
            />

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
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all text-sm font-semibold"
                        >
                            Get Started Free
                        </button>
                    </div>
                </div>
            </nav>

            <div className="pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">Blog</h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Practical guides for developers navigating the job search
                        </p>
                    </div>

                    <div className="space-y-8">
                        {articles.map((article) => (
                            <article
                                key={article.slug}
                                onClick={() => navigate(`/blog/${article.slug}`)}
                                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        {article.category}
                                    </span>
                                    <span className="text-xs text-gray-400">{article.date}</span>
                                    <span className="text-xs text-gray-400">·</span>
                                    <span className="text-xs text-gray-400">{article.readTime}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed">{article.excerpt}</p>
                                <div className="mt-4 text-sm text-blue-600 font-medium group-hover:underline">
                                    Read article →
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Blog;
