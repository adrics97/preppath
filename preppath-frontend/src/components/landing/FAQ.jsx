import { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'Is PrepPath really free?',
            answer: 'Yes! Our free tier includes up to 10 job applications and 50 interview questions. For unlimited access and advanced features, check out our Pro plan at just $9/month.',
        },
        {
            question: 'How does PrepPath help me prepare for interviews?',
            answer: 'PrepPath lets you build a personal question bank organized by category and difficulty. Track which questions you\'ve practiced, save your solutions, and monitor your progress over time.',
        },
        {
            question: 'Can I track applications from multiple job boards?',
            answer: 'Absolutely! PrepPath centralizes all your applications regardless of where you applied - LinkedIn, Indeed, company websites, or anywhere else. Just add them to your dashboard.',
        },
        {
            question: 'What if I need to cancel my Pro subscription?',
            answer: 'You can cancel anytime with no penalties. Your data remains accessible on the free tier (up to 10 applications and 50 questions). No lock-in, no hassle.',
        },
        {
            question: 'Is my data secure?',
            answer: 'Yes! We use industry-standard encryption for all data transmission and storage. Your personal information and job search details are kept private and secure.',
        },
        {
            question: 'Can I export my data?',
            answer: 'Pro users can export their applications and questions to PDF or CSV format. This makes it easy to create reports or backup your data.',
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-gray-900 sm:text-4xl mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about PrepPath
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900 pr-8">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-6 h-6 text-blue-600 flex-shrink-0 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <div className="mt-12 text-center p-8 bg-blue-50 rounded-2xl border border-blue-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Still have questions?
                    </h3>
                    <p className="text-gray-600 mb-4">
                        We're here to help! Reach out to our support team.
                    </p>
                    <a
                        href="mailto:hello@preppathapp.com"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Contact Support
                        <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </div >
    );
};

export default FAQ;