import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [applications, setApplications] = useState([]);
    const [upcomingInterviews, setUpcomingInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch stats
            const statsResponse = await api.get('/applications/stats');
            setStats(statsResponse.data);

            // Fetch recent applications
            const appsResponse = await api.get('/applications');
            setApplications(appsResponse.data.slice(0, 5)); // Get only first 5

            // Fetch upcoming interviews
            const interviewsResponse = await api.get('/applications/interviews/upcoming');
            setUpcomingInterviews(interviewsResponse.data);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            APPLIED: 'bg-blue-100 text-blue-800',
            SCREENING: 'bg-yellow-100 text-yellow-800',
            TECHNICAL: 'bg-purple-100 text-purple-800',
            FINAL: 'bg-indigo-100 text-indigo-800',
            OFFER: 'bg-green-100 text-green-800',
            REJECTED: 'bg-red-100 text-red-800',
            ACCEPTED: 'bg-green-100 text-green-800',
            WITHDRAWN: 'bg-gray-100 text-gray-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-xl text-gray-600">Loading dashboard...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-600 mt-1">Track your job search progress</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Applications"
                            value={stats?.total || 0}
                            icon="📝"
                            color="bg-blue-500"
                        />
                        <StatCard
                            title="Applied"
                            value={stats?.applied || 0}
                            icon="📤"
                            color="bg-yellow-500"
                        />
                        <StatCard
                            title="Interviews"
                            value={(stats?.screening || 0) + (stats?.technical || 0) + (stats?.final || 0)}
                            icon="💼"
                            color="bg-purple-500"
                        />
                        <StatCard
                            title="Offers"
                            value={stats?.offer || 0}
                            icon="🎉"
                            color="bg-green-500"
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Applications */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
                                <button
                                    onClick={() => navigate('/applications')}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    View All →
                                </button>
                            </div>

                            {applications.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">No applications yet</p>
                                    <button
                                        onClick={() => navigate('/applications')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                                    >
                                        Create Your First Application
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {applications.map((app) => (
                                        <div
                                            key={app.id}
                                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                                            onClick={() => navigate(`/applications/${app.id}`)}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-800">{app.position}</h3>
                                                    <p className="text-gray-600 text-sm mt-1">{app.company.name}</p>
                                                    <p className="text-gray-500 text-xs mt-1">
                                                        Applied: {formatDate(app.applicationDate)}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Upcoming Interviews */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Upcoming Interviews</h2>

                            {upcomingInterviews.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 text-sm">No upcoming interviews</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {upcomingInterviews.map((app) => (
                                        <div
                                            key={app.id}
                                            className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4"
                                        >
                                            <h3 className="font-semibold text-gray-800 text-sm">{app.position}</h3>
                                            <p className="text-gray-600 text-xs mt-1">{app.company.name}</p>
                                            <p className="text-blue-600 text-xs font-medium mt-2">
                                                📅 {formatDate(app.interviewDate)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <QuickActionCard
                            title="Add Application"
                            description="Track a new job application"
                            icon="➕"
                            onClick={() => navigate('/applications')}
                        />
                        <QuickActionCard
                            title="Add Company"
                            description="Save a company for future applications"
                            icon="🏢"
                            onClick={() => navigate('/companies')}
                        />
                        <QuickActionCard
                            title="Practice Questions"
                            description="Prepare for technical interviews"
                            icon="📚"
                            onClick={() => navigate('/questions')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
                </div>
                <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

// Quick Action Card Component
const QuickActionCard = ({ title, description, icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition text-left"
        >
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
        </button>
    );
};

export default Dashboard;