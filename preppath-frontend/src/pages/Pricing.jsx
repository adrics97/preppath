import React, { useState } from 'react';
import api from '../services/api';
import { PRICE_IDS } from '../config/stripe';

const Pricing = () => {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const response = await api.post('/subscription/checkout', {
                priceId: PRICE_IDS.PRO_MONTHLY,
                planName: 'PRO'
            });

            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error creating payment session:', error);
            alert('Error processing payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Choose your plan
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Start free, upgrade when you need
                    </p>
                </div>

                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">

                    {/* Plan FREE */}
                    <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white">
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-900">Free</h3>
                            <p className="mt-4">
                                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                                <span className="text-base font-medium text-gray-500">/month</span>
                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                                Perfect to start practicing
                            </p>
                            <ul className="mt-6 space-y-4">
                                <li className="flex">
                                    <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-base text-gray-700">Up to 10 applications</span>
                                </li>
                                <li className="flex">
                                    <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-base text-gray-700">Up to 50 questions</span>
                                </li>
                                <li className="flex">
                                    <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-base text-gray-700">Basic support</span>
                                </li>
                            </ul>
                            <button
                                disabled
                                className="mt-8 block w-full bg-gray-300 text-gray-500 rounded-md py-2 text-sm font-semibold cursor-not-allowed"
                            >
                                Current plan
                            </button>
                        </div>
                    </div>

                    {/* Plan PRO */}
                    <div className="border-2 border-blue-500 rounded-lg shadow-lg divide-y divide-gray-200 bg-white relative">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-4">
                            <span className="inline-flex rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                                Most Popular
                            </span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-gray-900">Pro</h3>
                            <p className="mt-4">
                                <span className="text-4xl font-extrabold text-gray-900">$9</span>
                                <span className="text-base font-medium text-gray-500">/month</span>
                            </p>
                            <p className="mt-4 text-sm text-gray-500">
                                Prepare without limits
                            </p>
                            <ul className="mt-6 space-y-4">
                                <li className="flex">
                                    <svg className="flex-shrink-0 w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-base text-gray-700"><strong>Unlimited</strong> applications</span>
                                </li>
                                <li className="flex">
                                    <svg className="flex-shrink-0 w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-base text-gray-700"><strong>Unlimited</strong> questions</span>
                                </li>
                                <li className="flex">
                                    <svg className="flex-shrink-0 w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-base text-gray-700">Priority support</span>
                                </li>
                                <li className="flex">
                                    <svg className="flex-shrink-0 w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="ml-3 text-base text-gray-700">Advanced analytics</span>
                                </li>
                            </ul>
                            <button
                                onClick={handleSubscribe}
                                disabled={loading}
                                className="mt-8 block w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Processing...' : 'Upgrade to Pro'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Pricing;