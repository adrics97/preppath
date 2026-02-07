const HowItWorks = () => {
    const steps = [
        {
            number: '01',
            title: 'Create Your Account',
            description: 'Sign up in seconds and set up your profile. No credit card required to get started.',
            icon: '👤',
        },
        {
            number: '02',
            title: 'Add Applications',
            description: 'Track every job application with company details, status, and interview dates in one place.',
            icon: '📝',
        },
        {
            number: '03',
            title: 'Prepare & Practice',
            description: 'Build your question bank, practice coding problems, and track your progress over time.',
            icon: '💡',
        },
        {
            number: '04',
            title: 'Land Your Dream Job',
            description: 'Stay organized, ace your interviews, and get that offer. Track everything from first application to acceptance.',
            icon: '🎯',
        },
    ];

    return (
        <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-gray-900 sm:text-4xl mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get started in minutes and streamline your entire job search process
                    </p>
                </div>

                <div className="relative">
                    {/* Connection line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 transform -translate-y-1/2" style={{ zIndex: 0 }}></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative" style={{ zIndex: 1 }}>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative group"
                            >
                                {/* Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-100 hover:border-blue-300">
                                    {/* Number badge */}
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className="text-6xl mb-4 mt-4 text-center">
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm text-center leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">
                        Ready to streamline your job search?
                    </p>
                    <button
                        onClick={() => window.location.href = '/register'}
                        className="inline-flex items-center justify-center rounded-full py-3 px-8 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Start Free Now
                        <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;