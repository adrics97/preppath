const companies = [
    { name: 'Google',    domain: 'google.com' },
    { name: 'Meta',      domain: 'meta.com' },
    { name: 'Stripe',    domain: 'stripe.com' },
    { name: 'Airbnb',    domain: 'airbnb.com' },
    { name: 'Netflix',   domain: 'netflix.com' },
    { name: 'Spotify',   domain: 'spotify.com' },
    { name: 'Shopify',   domain: 'shopify.com' },
    { name: 'GitHub',    domain: 'github.com' },
    { name: 'Notion',    domain: 'notion.so' },
    { name: 'Figma',     domain: 'figma.com' },
    { name: 'Vercel',    domain: 'vercel.com' },
    { name: 'Linear',    domain: 'linear.app' },
    { name: 'Atlassian', domain: 'atlassian.com' },
    { name: 'Twilio',    domain: 'twilio.com' },
    { name: 'Datadog',   domain: 'datadoghq.com' },
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
    const doubled = [...companies, ...companies];

    return (
        <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-20">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col">
                            <svg className="w-8 h-8 text-blue-200 mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <p className="text-gray-700 text-sm leading-relaxed flex-1">{t.quote}</p>
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

                {/* Company logos marquee */}
                <div className="border-t border-gray-100 pt-16">
                    <p className="text-center text-sm text-gray-400 mb-10 uppercase tracking-widest font-medium">
                        Companies our users are applying to
                    </p>
                    <div className="overflow-hidden relative">
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

                        <div className="flex items-center animate-marquee">
                            {doubled.map((c, i) => (
                                <div key={i} className="flex-shrink-0 mx-10 flex items-center gap-2.5">
                                    <img
                                        src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=32`}
                                        alt={c.name}
                                        className="w-5 h-5 object-contain"
                                    />
                                    <span className="text-gray-600 font-semibold text-sm whitespace-nowrap">{c.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Testimonials;
