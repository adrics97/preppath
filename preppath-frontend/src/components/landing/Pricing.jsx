import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate();

    const plans = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            description: 'Perfect for getting started',
            features: [
                '10 job applications',
                '50 interview questions',
                'Basic dashboard',
                'Company database',
                'Community support',
            ],
            cta: 'Get Started',
            highlighted: false,
        },
        {
            name: 'Pro',
            price: '$9',
            period: 'per month',
            description: 'For serious job seekers',
            badge: 'Most Popular',
            features: [
                'Unlimited applications',
                'Unlimited questions',
                'Advanced analytics',
                'Export to PDF',
                'Email reminders',
                'Practice session tracking',
                'Priority support',
            ],
            cta: 'Start Free Trial',
            highlighted: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: 'contact us',
            description: 'For teams and bootcamps',
            features: [
                'Everything in Pro',
                'Team management',
                'SSO authentication',
                'Admin dashboard',
                'Custom integrations',
                'Dedicated support',
                'SLA guarantee',
            ],
            cta: 'Contact Sales',
            highlighted: false,
        },
    ];

    return (
        <div className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
                        Simple, transparent pricing
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Choose the plan that fits your job search needs
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col rounded-3xl p-8 ${plan.highlighted
                                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl ring-2 ring-blue-600 scale-105'
                                    : 'bg-white text-gray-900 ring-1 ring-gray-200'
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-5 left-0 right-0 mx-auto w-32">
                                    <div className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1 text-center text-sm font-bold text-white shadow-lg">
                                        {plan.badge}
                                    </div>
                                </div>
                            )}

                            <div className="flex-1">
                                <h3 className={`text-2xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`mt-2 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                                    {plan.description}
                                </p>

                                <div className="mt-6 flex items-baseline">
                                    <span className={`text-5xl font-black tracking-tight ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                        {plan.price}
                                    </span>
                                    {plan.price !== 'Custom' && (
                                        <span className={`ml-2 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                                            /{plan.period}
                                        </span>
                                    )}
                                </div>

                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <svg
                                                className={`h-6 w-6 flex-shrink-0 ${plan.highlighted ? 'text-blue-200' : 'text-green-500'}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className={`ml-3 text-sm ${plan.highlighted ? 'text-blue-50' : 'text-gray-700'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={() => plan.name === 'Enterprise' ? window.location.href = 'mailto:hello@preppathapp.com' : navigate('/register')}
                                className={`mt-8 w-full rounded-full py-3 px-6 text-center text-sm font-semibold transition-all duration-200 ${plan.highlighted
                                        ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg'
                                        : 'bg-blue-600 text-white hover:bg-blue-700 ring-1 ring-blue-600'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    All plans include a 14-day free trial. No credit card required. Cancel anytime.
                </p>
            </div>
        </div>
    );
};

export default Pricing;