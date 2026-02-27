import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useEffect, useState } from 'react';

const SubscriptionDashboard = () => {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubscription();
    }, []);

    const fetchSubscription = async () => {
        try {
            const response = await api.get('/subscription/current');
            setSubscription(response.data);
        } catch (error) {
            console.error('Error fetching subscription:', error);
            setError('Error loading subscription information');
        } finally {
            setLoading(false);
        }
    };

    const handleManageSubscription = async () => {
        try {
            const response = await api.post('/subscription/portal');
            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error opening portal:', error);
            alert('Error opening management portal');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                    <button
                        onClick={fetchSubscription}
                        className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const isPro = subscription?.planName === 'PRO';
    const isFree = subscription?.planName === 'FREE';

    const appsPercentage = isPro ? 100 : (subscription?.currentApps / subscription?.maxApps) * 100;
    const questionsPercentage = isPro ? 100 : (subscription?.currentQuestions / subscription?.maxQuestions) * 100;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Subscription</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your PrepPath plan and usage</p>
                </div>

                {/* Current plan */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Plan {subscription?.planName}
                            </h2>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${subscription?.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                {subscription?.status === 'active' ? 'Active' : subscription?.status}
                            </span>
                        </div>

                        {isFree && (
                            <button
                                onClick={() => navigate('/pricing')}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                            >
                                Upgrade to Pro
                            </button>
                        )}
                    </div>

                    {/* Plan info */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Applications</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {isPro ? '∞' : `${subscription?.maxApps}`}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {isPro ? 'Unlimited' : 'max allowed'}
                            </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Questions</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {isPro ? '∞' : `${subscription?.maxQuestions}`}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {isPro ? 'Unlimited' : 'max allowed'}
                            </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {isPro ? '$9' : '$0'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">/month</p>
                        </div>
                    </div>

                    {/* Renewal info (Pro only) */}
                    {isPro && subscription?.currentPeriodEnd && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Next renewal
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                {subscription?.cancelAtPeriodEnd && (
                                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-semibold">
                                        Will cancel at period end
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Current usage */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Usage</h3>

                    {/* Applications */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Applications</span>
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                {subscription?.currentApps} / {isPro ? '∞' : subscription?.maxApps}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${appsPercentage >= 90 ? 'bg-red-500' :
                                    appsPercentage >= 70 ? 'bg-yellow-500' :
                                        'bg-blue-600'
                                    }`}
                                style={{ width: `${Math.min(appsPercentage, 100)}%` }}
                            />
                        </div>
                        {!isPro && appsPercentage >= 80 && (
                            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                                ⚠️ You're approaching the limit
                            </p>
                        )}
                    </div>

                    {/* Questions */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Questions</span>
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                {subscription?.currentQuestions} / {isPro ? '∞' : subscription?.maxQuestions}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${questionsPercentage >= 90 ? 'bg-red-500' :
                                    questionsPercentage >= 70 ? 'bg-yellow-500' :
                                        'bg-blue-600'
                                    }`}
                                style={{ width: `${Math.min(questionsPercentage, 100)}%` }}
                            />
                        </div>
                        {!isPro && questionsPercentage >= 80 && (
                            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                                ⚠️ You're approaching the limit
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Actions</h3>

                    <div className="space-y-3">
                        {isPro && (
                            <button
                                onClick={handleManageSubscription}
                                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Manage subscription
                            </button>
                        )}

                        {isFree && (
                            <button
                                onClick={() => navigate('/pricing')}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md"
                            >
                                View available plans
                            </button>
                        )}

                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 dark:border-gray-600 transition-colors"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SubscriptionDashboard;
