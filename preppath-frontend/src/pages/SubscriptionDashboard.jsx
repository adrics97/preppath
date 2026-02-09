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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={fetchSubscription}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const isPro = subscription?.planName === 'PRO';
    const isFree = subscription?.planName === 'FREE';

    // Calcular porcentajes de uso
    const appsPercentage = isPro ? 100 : (subscription?.currentApps / subscription?.maxApps) * 100;
    const questionsPercentage = isPro ? 100 : (subscription?.currentQuestions / subscription?.maxQuestions) * 100;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Subscription</h1>
                    <p className="mt-2 text-gray-600">Manage your PrepPath plan and usage</p>
                </div>

                {/* Plan actual */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Plan {subscription?.planName}
                            </h2>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${subscription?.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
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

                    {/* Info del plan */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Applications</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {isPro ? '∞' : `${subscription?.maxApps}`}
                            </p>
                            <p className="text-xs text-gray-500">
                                {isPro ? 'Unlimited' : 'max allowed'}
                            </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Questions</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {isPro ? '∞' : `${subscription?.maxQuestions}`}
                            </p>
                            <p className="text-xs text-gray-500">
                                {isPro ? 'Unlimited' : 'max allowed'}
                            </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Price</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {isPro ? '$9' : '$0'}
                            </p>
                            <p className="text-xs text-gray-500">/month</p>
                        </div>
                    </div>

                    {/* Info de renovación (solo para Pro) */}
                    {isPro && subscription?.currentPeriodEnd && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        Next renewal
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                {subscription?.cancelAtPeriodEnd && (
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                        Will cancel at period end
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Uso actual */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Current Usage</h3>

                    {/* Aplicaciones */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Applications</span>
                            <span className="text-sm font-semibold text-blue-600">
                                {subscription?.currentApps} / {isPro ? '∞' : subscription?.maxApps}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${appsPercentage >= 90 ? 'bg-red-500' :
                                    appsPercentage >= 70 ? 'bg-yellow-500' :
                                        'bg-blue-600'
                                    }`}
                                style={{ width: `${Math.min(appsPercentage, 100)}%` }}
                            />
                        </div>
                        {!isPro && appsPercentage >= 80 && (
                            <p className="text-xs text-yellow-600 mt-1">
                                ⚠️ You're approaching the limit
                            </p>
                        )}
                    </div>

                    {/* Preguntas */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Questions</span>
                            <span className="text-sm font-semibold text-blue-600">
                                {subscription?.currentQuestions} / {isPro ? '∞' : subscription?.maxQuestions}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${questionsPercentage >= 90 ? 'bg-red-500' :
                                    questionsPercentage >= 70 ? 'bg-yellow-500' :
                                        'bg-blue-600'
                                    }`}
                                style={{ width: `${Math.min(questionsPercentage, 100)}%` }}
                            />
                        </div>
                        {!isPro && questionsPercentage >= 80 && (
                            <p className="text-xs text-yellow-600 mt-1">
                                ⚠️ You're approaching the limit
                            </p>
                        )}
                    </div>
                </div>

                {/* Acciones */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>

                    <div className="space-y-3">
                        {isPro && (
                            <button
                                onClick={handleManageSubscription}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
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
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 transition-colors"
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