import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from '../utils/toast';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        websiteUrl: '',
        linkedinUrl: '',
        industry: '',
        companySize: '',
        description: '',
        culture: '',
    });

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await api.get('/companies');
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/companies', formData);
            setShowModal(false);
            resetForm();
            fetchCompanies();
            toast('Company created successfully');
        } catch (error) {
            console.error('Error creating company:', error);
            toast(error.response?.data?.message || 'Error creating company. Please try again.', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this company?')) return;

        try {
            await api.delete(`/companies/${id}`);
            fetchCompanies();
            toast('Company deleted');
        } catch (error) {
            console.error('Error deleting company:', error);
            toast('Error deleting company.', 'error');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            location: '',
            websiteUrl: '',
            linkedinUrl: '',
            industry: '',
            companySize: '',
            description: '',
            culture: '',
        });
    };

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-xl text-gray-600 dark:text-gray-400">Loading companies...</div>
            </div>
        );
    }

    const inputClass = "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500";
    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Companies</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your company database</p>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center space-x-2"
                        >
                            <span>➕</span>
                            <span>New Company</span>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search companies by name, location, or industry..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    {/* Companies Grid */}
                    {filteredCompanies.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                                {searchTerm ? 'No companies found matching your search' : 'No companies yet'}
                            </p>
                            {!searchTerm && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                                >
                                    Add Your First Company
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCompanies.map((company) => (
                                <div
                                    key={company.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{company.name}</h3>
                                        <button
                                            onClick={() => handleDelete(company.id)}
                                            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    {company.location && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 flex items-center space-x-2">
                                            <span>📍</span>
                                            <span>{company.location}</span>
                                        </p>
                                    )}

                                    {company.industry && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 flex items-center space-x-2">
                                            <span>🏢</span>
                                            <span>{company.industry}</span>
                                        </p>
                                    )}

                                    {company.companySize && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 flex items-center space-x-2">
                                            <span>👥</span>
                                            <span>{company.companySize} employees</span>
                                        </p>
                                    )}

                                    {company.description && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 line-clamp-2">
                                            {company.description}
                                        </p>
                                    )}

                                    <div className="flex space-x-2 mt-4">
                                        {company.websiteUrl && (
                                            <a
                                                href={company.websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm"
                                            >
                                                🌐 Website
                                            </a>
                                        )}
                                        {company.linkedinUrl && (
                                            <a
                                                href={company.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 text-sm"
                                            >
                                                💼 LinkedIn
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Company Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">New Company</h2>
                                <button
                                    onClick={() => { setShowModal(false); resetForm(); }}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className={labelClass}>Company Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={inputClass}
                                        placeholder="e.g., Google"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Location</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className={inputClass}
                                            placeholder="e.g., Madrid, Spain"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Industry</label>
                                        <input
                                            type="text"
                                            value={formData.industry}
                                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                            className={inputClass}
                                            placeholder="e.g., Technology"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Company Size</label>
                                    <select
                                        value={formData.companySize}
                                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                                        className={inputClass}
                                    >
                                        <option value="">Select size</option>
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="51-200">51-200</option>
                                        <option value="201-500">201-500</option>
                                        <option value="501-1000">501-1000</option>
                                        <option value="1000+">1000+</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Website URL</label>
                                    <input
                                        type="url"
                                        value={formData.websiteUrl}
                                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                                        className={inputClass}
                                        placeholder="https://www.example.com"
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>LinkedIn URL</label>
                                    <input
                                        type="url"
                                        value={formData.linkedinUrl}
                                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                        className={inputClass}
                                        placeholder="https://linkedin.com/company/..."
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="3"
                                        className={inputClass}
                                        placeholder="Brief description of the company..."
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Culture Notes</label>
                                    <textarea
                                        value={formData.culture}
                                        onChange={(e) => setFormData({ ...formData, culture: e.target.value })}
                                        rows="2"
                                        className={inputClass}
                                        placeholder="Notes about company culture..."
                                    />
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                                    >
                                        Create Company
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowModal(false); resetForm(); }}
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

export default Companies;
