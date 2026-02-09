import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16">
            {/* Decorative blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center lg:pt-32">
                {/* H1 optimizado para SEO */}
                <h1 className="mx-auto max-w-4xl font-display text-5xl font-black tracking-tight text-gray-900 sm:text-7xl">
                    Track Job Applications &{' '}
                    <span className="relative whitespace-nowrap text-blue-600">
                        <span className="relative">Ace Technical Interviews</span>
                    </span>
                </h1>

                {/* Subtitle con keywords */}
                <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-700">
                    The all-in-one platform for developers. Track applications, organize companies,
                    practice interview questions, and land your dream job faster.
                </p>

                <div className="mt-10 flex justify-center gap-x-6">
                    <button
                        onClick={() => navigate('/register')}
                        className="group inline-flex items-center justify-center rounded-full py-4 px-8 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        aria-label="Start tracking job applications for free"
                    >
                        Start Free Today
                        <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>

                    <button
                        onClick={() => navigate('/login')}
                        className="inline-flex items-center justify-center rounded-full py-4 px-8 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:ring-gray-400 transition-all duration-200"
                        aria-label="Sign in to your account"
                    >
                        Sign In
                    </button>
                </div>

                {/* Social proof */}
                <div className="mt-16">
                    <p className="text-sm text-gray-600 mb-4">Join developers preparing for their next role</p>
                    <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl" aria-hidden="true">👥</span>
                            <span className="text-sm font-medium">Active Community</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl" aria-hidden="true">💼</span>
                            <span className="text-sm font-medium">Track Unlimited Apps</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl" aria-hidden="true">⭐</span>
                            <span className="text-sm font-medium">Start Free</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;