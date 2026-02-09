import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpgradeModal = ({ isOpen, onClose, limitType }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const messages = {
        apps: {
            title: 'Application limit reached',
            description: 'You\'ve reached the limit of 10 applications on the free plan.',
            feature: 'Unlimited applications'
        },
        questions: {
            title: 'Question limit reached',
            description: 'You\'ve reached the limit of 50 questions on the free plan.',
            feature: 'Unlimited questions'
        }
    };

    const message = messages[limitType] || messages.apps;

    const handleUpgrade = () => {
        navigate('/pricing');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
                {/* Icono */}
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">{message.title}</h2>
                <p className="text-gray-600 mb-6">{message.description}</p>

                {/* Beneficios de Pro */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-3">With the Pro plan you get:</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {message.feature}
                        </li>
                        <li className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Priority support
                        </li>
                        <li className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Advanced analytics
                        </li>
                    </ul>
                    <p className="text-center mt-4">
                        Only <span className="text-2xl font-bold text-blue-600">$9</span>
                        <span className="text-gray-600">/month</span>
                    </p>
                </div>

                {/* Botones */}
                <div className="space-y-3">
                    <button
                        onClick={handleUpgrade}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md"
                    >
                        Upgrade to Pro
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpgradeModal;