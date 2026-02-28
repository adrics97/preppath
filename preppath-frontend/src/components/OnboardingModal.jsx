import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
    {
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        title: 'Add a company first',
        description: 'Before tracking an application, add the company you\'re applying to. Go to Companies → New Company.',
    },
    {
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        title: 'Track your applications',
        description: 'Go to Applications → New Application. Track status, interview dates, salary expectations, and notes for each role.',
    },
    {
        icon: (
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Prepare for interviews',
        description: 'Build your personal question bank in Questions. Save LeetCode problems, behavioral questions, and your own solutions.',
    },
];

const OnboardingModal = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const isLast = step === STEPS.length - 1;
    const current = STEPS[step];

    const handleFinish = () => {
        localStorage.setItem('onboarding_done', 'true');
        onClose();
        navigate('/companies');
    };

    const handleSkip = () => {
        localStorage.setItem('onboarding_done', 'true');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">

                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-8">
                    {STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === step ? 'w-6 bg-blue-600' : i < step ? 'w-3 bg-blue-300' : 'w-3 bg-gray-200 dark:bg-gray-600'
                            }`}
                        />
                    ))}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                        {current.icon}
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {current.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {current.description}
                    </p>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    {isLast ? (
                        <button
                            onClick={handleFinish}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                        >
                            Get started →
                        </button>
                    ) : (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                        >
                            Next
                        </button>
                    )}
                    <button
                        onClick={handleSkip}
                        className="w-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm py-2 transition"
                    >
                        Skip
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;
