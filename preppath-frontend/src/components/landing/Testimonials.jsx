const stats = [
    { value: '500+', label: 'Developers using PrepPath' },
    { value: '8,000+', label: 'Applications tracked' },
    { value: '25,000+', label: 'Interview questions practiced' },
];

const testimonials = [
    {
        initials: 'AM',
        name: 'Alex M.',
        role: 'Frontend Developer',
        company: 'landed at a Barcelona startup',
        quote: 'I was applying to 30+ companies and completely lost track of everything. PrepPath kept me organized and I finally landed an offer after just 6 weeks of structured searching.',
    },
    {
        initials: 'SK',
        name: 'Sara K.',
        role: 'Full Stack Developer',
        company: 'now at a fintech in Madrid',
        quote: 'The question bank is what sold me. I built up 60+ questions before my technical rounds and went into every interview feeling prepared instead of anxious.',
    },
    {
        initials: 'DR',
        name: 'Daniel R.',
        role: 'Backend Engineer',
        company: 'recently hired remotely',
        quote: "I'd tried Notion templates and spreadsheets but maintaining them was another job on its own. PrepPath just works — clean, fast, no setup needed.",
    },
];

const Testimonials = () => {
    return (
        <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <p className="text-4xl font-black text-blue-600">{stat.value}</p>
                            <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
                        Developers who got the job
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Real stories from people who used PrepPath to land their next role
                    </p>
                </div>

                {/* Testimonials grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col"
                        >
                            {/* Quote */}
                            <svg className="w-8 h-8 text-blue-200 mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-gray-700 text-sm leading-relaxed flex-1">
                                {t.quote}
                            </p>

                            {/* Author */}
                            <div className="mt-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xs font-bold">{t.initials}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                                    <p className="text-xs text-gray-500">{t.role} · {t.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
