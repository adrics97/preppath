const Features = () => {
    const features = [
        {
            icon: '📊',
            title: 'Track Applications',
            description: 'Never lose track of where you applied. Monitor every application from submission to offer with our intuitive dashboard.',
        },
        {
            icon: '💡',
            title: 'Question Bank',
            description: 'Build your personal library of technical interview questions. Organize by difficulty, category, and track your practice sessions.',
        },
        {
            icon: '📈',
            title: 'Interview Analytics',
            description: 'Get insights into your interview performance. Track your progress and identify areas for improvement.',
        },
        {
            icon: '🎯',
            title: 'Stay Organized',
            description: 'Centralized dashboard with all your job search metrics. See upcoming interviews, recent applications, and study progress at a glance.',
        },
        {
            icon: '🏢',
            title: 'Company Database',
            description: 'Maintain a personal database of companies you\'re interested in. Store notes about culture, tech stack, and interview processes.',
        },
        {
            icon: '🔔',
            title: 'Smart Reminders',
            description: 'Never miss an interview or follow-up. Get notified about upcoming deadlines and important dates.',
        },
    ];

    return (
        <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
                        Everything you need to succeed
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Powerful features designed specifically for developers in their job search journey
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative group bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300"></div>

                            <div className="relative">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-black mb-2">500+</div>
                            <div className="text-blue-100 text-sm uppercase tracking-wide">Active Users</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black mb-2">2K+</div>
                            <div className="text-blue-100 text-sm uppercase tracking-wide">Applications Tracked</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black mb-2">5K+</div>
                            <div className="text-blue-100 text-sm uppercase tracking-wide">Questions Solved</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;