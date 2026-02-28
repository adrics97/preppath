import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast, notifyAppChanged } from '../utils/toast';

const ApplicationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editForm, setEditForm] = useState(null);

    useEffect(() => {
        fetchApplicationDetail();
    }, [id]);

    const fetchApplicationDetail = async () => {
        try {
            const response = await api.get(`/applications/${id}`);
            setApplication(response.data);
        } catch (error) {
            console.error('Error fetching application details:', error);
            setError('Failed to load application details');
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = () => {
        setEditForm({
            position: application.position || '',
            status: application.status || 'APPLIED',
            jobUrl: application.jobUrl || '',
            expectedSalary: application.expectedSalary || '',
            salaryCurrency: application.salaryCurrency || 'EUR',
            interviewDate: application.interviewDate || '',
            notes: application.notes || '',
            feedback: application.feedback || '',
        });
        setShowEditModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                position: editForm.position,
                status: editForm.status,
                jobUrl: editForm.jobUrl || null,
                expectedSalary: editForm.expectedSalary ? parseFloat(editForm.expectedSalary) : null,
                salaryCurrency: editForm.salaryCurrency,
                interviewDate: editForm.interviewDate || null,
                notes: editForm.notes || null,
                feedback: editForm.feedback || null,
                companyId: application.company.id,
                applicationDate: application.applicationDate,
            };
            const response = await api.put(`/applications/${id}`, payload);
            setApplication(response.data);
            setShowEditModal(false);
            toast('Application updated successfully');
        } catch (error) {
            console.error('Error updating application:', error);
            toast('Error updating application. Please try again.', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this application?')) return;
        try {
            await api.delete(`/applications/${id}`);
            toast('Application deleted');
            notifyAppChanged();
            navigate('/applications');
        } catch (error) {
            console.error('Error deleting application:', error);
            toast('Error deleting application.', 'error');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            APPLIED:   'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            SCREENING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            TECHNICAL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            FINAL:     'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
            OFFER:     'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            REJECTED:  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
            ACCEPTED:  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            WITHDRAWN: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    };

    const formatSalary = (salary, currency) => {
        if (!salary) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(salary);
    };

    const inputClass = "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500";
    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        );
    }

    if (error || !application) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                        <p className="text-red-600 dark:text-red-400 text-lg">{error || 'Application not found'}</p>
                        <button
                            onClick={() => navigate('/applications')}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                        >
                            Back to Applications
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header */}
                    <div className="mb-6">
                        <button
                            onClick={() => navigate('/applications')}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 mb-4 inline-flex items-center gap-1 text-sm"
                        >
                            ← Back to Applications
                        </button>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{application.position}</h1>
                                <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">{application.company.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                    {application.status}
                                </span>
                                <button
                                    onClick={openEditModal}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                                >
                                    ✏️ Edit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">

                        {/* Company Info */}
                        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Company Info</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Company" value={application.company.name} />
                                {application.company.websiteUrl && (
                                    <InfoItem label="Website" value={
                                        <a href={application.company.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 underline">
                                            {application.company.websiteUrl}
                                        </a>
                                    } />
                                )}
                                {application.company.industry && <InfoItem label="Industry" value={application.company.industry} />}
                                {application.company.location && <InfoItem label="Location" value={application.company.location} />}
                            </div>
                        </div>

                        {/* Application Details */}
                        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Application Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Position" value={application.position} />
                                <InfoItem label="Status" value={application.status} />
                                <InfoItem label="Applied" value={formatDate(application.applicationDate)} />
                                {application.interviewDate && (
                                    <InfoItem label="Interview Date" value={formatDate(application.interviewDate)} highlighted />
                                )}
                                {application.offerDate && <InfoItem label="Offer Date" value={formatDate(application.offerDate)} />}
                                {application.rejectionDate && <InfoItem label="Rejection Date" value={formatDate(application.rejectionDate)} />}
                                {application.expectedSalary && (
                                    <InfoItem label="Expected Salary" value={formatSalary(application.expectedSalary, application.salaryCurrency)} />
                                )}
                            </div>
                        </div>

                        {/* Job URL */}
                        {application.jobUrl && (
                            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Job Posting</h2>
                                <a href={application.jobUrl} target="_blank" rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 underline break-all">
                                    {application.jobUrl}
                                </a>
                            </div>
                        )}

                        {/* Notes */}
                        {application.notes && (
                            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Notes</h2>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{application.notes}</p>
                            </div>
                        )}

                        {/* Feedback */}
                        {application.feedback && (
                            <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Feedback</h2>
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{application.feedback}</p>
                            </div>
                        )}

                        {/* Timestamps */}
                        <div className="p-6 bg-gray-50 dark:bg-gray-700/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div><span className="font-medium">Created:</span> {formatDate(application.createdAt)}</div>
                                <div><span className="font-medium">Last updated:</span> {formatDate(application.updatedAt)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={() => navigate('/applications')}
                            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-medium transition"
                        >
                            Back
                        </button>
                        <button
                            onClick={openEditModal}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                        >
                            Edit Application
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && editForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Application</h2>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none"
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label className={labelClass}>Position *</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.position}
                                        onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Status</label>
                                    <select
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                        className={inputClass}
                                    >
                                        <option value="APPLIED">Applied</option>
                                        <option value="SCREENING">Screening</option>
                                        <option value="TECHNICAL">Technical</option>
                                        <option value="FINAL">Final</option>
                                        <option value="OFFER">Offer</option>
                                        <option value="ACCEPTED">Accepted</option>
                                        <option value="REJECTED">Rejected</option>
                                        <option value="WITHDRAWN">Withdrawn</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Interview Date</label>
                                    <input
                                        type="date"
                                        value={editForm.interviewDate}
                                        onChange={(e) => setEditForm({ ...editForm, interviewDate: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Expected Salary</label>
                                        <input
                                            type="number"
                                            value={editForm.expectedSalary}
                                            onChange={(e) => setEditForm({ ...editForm, expectedSalary: e.target.value })}
                                            className={inputClass}
                                            placeholder="50000"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Currency</label>
                                        <select
                                            value={editForm.salaryCurrency}
                                            onChange={(e) => setEditForm({ ...editForm, salaryCurrency: e.target.value })}
                                            className={inputClass}
                                        >
                                            <option value="EUR">EUR</option>
                                            <option value="USD">USD</option>
                                            <option value="GBP">GBP</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Job URL</label>
                                    <input
                                        type="url"
                                        value={editForm.jobUrl}
                                        onChange={(e) => setEditForm({ ...editForm, jobUrl: e.target.value })}
                                        className={inputClass}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Notes</label>
                                    <textarea
                                        value={editForm.notes}
                                        onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                                        rows="3"
                                        className={inputClass}
                                        placeholder="Notes about this application..."
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Feedback</label>
                                    <textarea
                                        value={editForm.feedback}
                                        onChange={(e) => setEditForm({ ...editForm, feedback: e.target.value })}
                                        rows="3"
                                        className={inputClass}
                                        placeholder="Interview feedback, rejection reason..."
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-lg font-medium transition"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium transition"
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

const InfoItem = ({ label, value, highlighted = false }) => (
    <div className={highlighted ? 'bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg' : ''}>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        <p className={`mt-1 ${highlighted ? 'font-semibold text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-white'}`}>
            {value}
        </p>
    </div>
);

export default ApplicationDetail;
