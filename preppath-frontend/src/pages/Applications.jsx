import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('ALL');
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        position: '',
        companyId: '',
        applicationDate: new Date().toISOString().split('T')[0],
        status: 'APPLIED',
        jobUrl: '',
        expectedSalary: '',
        salaryCurrency: 'EUR',
        notes: '',
    });

    useEffect(() => {
        fetchApplications();
        fetchCompanies();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get('/applications');
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCompanies = async () => {
        try {
            const response = await api.get('/companies');
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/applications', {
                ...formData,
                companyId: parseInt(formData.companyId),
                expectedSalary: formData.expectedSalary ? parseFloat(formData.expectedSalary) : null,
            });

            setShowModal(false);
            resetForm();
            fetchApplications();
        } catch (error) {
            console.error('Error creating application:', error);
            alert('Error creating application. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this application?')) return;

        try {
            await api.delete(`/applications/${id}`);
            fetchApplications();
        } catch (error) {
            console.error('Error deleting application:', error);
            alert('Error deleting application.');
        }
    };

    const resetForm = () => {
        setFormData({
            position: '',
            companyId: '',
            applicationDate: new Date().toISOString().split('T')[0],
            status: 'APPLIED',
            jobUrl: '',
            expectedSalary: '',
            salaryCurrency: 'EUR',
            notes: '',
        });
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

    const filteredApplications = filterStatus === 'ALL'
        ? applications
        : applications.filter(app => app.status === filterStatus);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-xl text-gray-600">Loading applications...</div>
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
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Applications</h1>
                            <p className="text-gray-600 mt-1">Manage your job applications</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center space-x-2"
                        >
                            <span>➕</span>
                            <span>New Application</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                            {['ALL', 'APPLIED', 'SCREENING', 'TECHNICAL', 'FINAL', 'OFFER', 'REJECTED'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filterStatus === status
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Applications List */}
                    {filteredApplications.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                            <p className="text-gray-500 text-lg mb-4">No applications found</p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                            >
                                Create Your First Application
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredApplications.map((app) => (
                                <div
                                    key={app.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="text-xl font-semibold text-gray-800">{app.position}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                                    {app.status}
                                                </span>
                                            </div>

                                            <p className="text-gray-600 mt-2 flex items-center space-x-2">
                                                <span>🏢</span>
                                                <span>{app.company.name}</span>
                                                {app.company.location && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{app.company.location}</span>
                                                    </>
                                                )}
                                            </p>

                                            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                                                <span>📅 Applied: {formatDate(app.applicationDate)}</span>
                                                {app.expectedSalary && (
                                                    <span>💰 {app.expectedSalary.toLocaleString()} {app.salaryCurrency}</span>
                                                )}
                                                {app.interviewDate && (
                                                    <span className="text-blue-600 font-medium">
                                                        🎯 Interview: {formatDate(app.interviewDate)}
                                                    </span>
                                                )}
                                            </div>

                                            {app.notes && (
                                                <p className="text-gray-600 text-sm mt-3 bg-gray-50 p-3 rounded-lg">
                                                    {app.notes}
                                                </p>
                                            )}

                                            {app.jobUrl && (
                                                <a
                                                    href={app.jobUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
                                                >
                                                    🔗 View Job Posting →
                                                </a>
                                            )}
                                        </div>

                                        <div className="flex space-x-2 ml-4">
                                            <button
                                                onClick={() => navigate(`/applications/${app.id}`)}
                                                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(app.id)}
                                                className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Application Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">New Application</h2>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Position *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., Frontend Developer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Company *
                                    </label>
                                    <select
                                        required
                                        value={formData.companyId}
                                        onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a company</option>
                                        {companies.map((company) => (
                                            <option key={company.id} value={company.id}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Don't see your company?{' '}
                                        <button
                                            type="button"
                                            onClick={() => navigate('/companies')}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            Add it here
                                        </button>
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Application Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.applicationDate}
                                            onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="APPLIED">Applied</option>
                                            <option value="SCREENING">Screening</option>
                                            <option value="TECHNICAL">Technical</option>
                                            <option value="FINAL">Final</option>
                                            <option value="OFFER">Offer</option>
                                            <option value="REJECTED">Rejected</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Job URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.jobUrl}
                                        onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Expected Salary
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.expectedSalary}
                                            onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="50000"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Currency
                                        </label>
                                        <select
                                            value={formData.salaryCurrency}
                                            onChange={(e) => setFormData({ ...formData, salaryCurrency: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="EUR">EUR</option>
                                            <option value="USD">USD</option>
                                            <option value="GBP">GBP</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Notes
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Any additional notes..."
                                    />
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                                    >
                                        Create Application
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            resetForm();
                                        }}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Applications;