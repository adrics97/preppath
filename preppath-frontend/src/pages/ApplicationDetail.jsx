import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

const ApplicationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta aplicación?')) return;

        try {
            await api.delete(`/applications/${id}`);
            navigate('/applications');
        } catch (error) {
            console.error('Error deleting application:', error);
            alert('Error al eliminar la aplicación.');
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
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-xl text-gray-600">Loading...</div>
                </div>
            </>
        );
    }

    if (error || !application) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <p className="text-red-600 text-lg">{error || 'Application not found'}</p>
                            <button
                                onClick={() => navigate('/applications')}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                            >
                                Volver a Aplicaciones
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-6">
                        <button
                            onClick={() => navigate('/applications')}
                            className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center"
                        >
                            ← Volver a Aplicaciones
                        </button>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{application.position}</h1>
                                <p className="text-xl text-gray-600 mt-1">{application.company.name}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                {application.status}
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Company Info Section */}
                        <div className="border-b border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Información de la Compañía</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Compañía" value={application.company.name} />
                                {application.company.website && (
                                    <InfoItem
                                        label="Sitio Web"
                                        value={
                                            <a
                                                href={application.company.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 underline"
                                            >
                                                {application.company.website}
                                            </a>
                                        }
                                    />
                                )}
                                {application.company.industry && (
                                    <InfoItem label="Industria" value={application.company.industry} />
                                )}
                                {application.company.location && (
                                    <InfoItem label="Ubicación" value={application.company.location} />
                                )}
                            </div>
                        </div>

                        {/* Application Details Section */}
                        <div className="border-b border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalles de la Aplicación</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Posición" value={application.position} />
                                <InfoItem label="Estado" value={application.status} />
                                <InfoItem label="Fecha de Aplicación" value={formatDate(application.applicationDate)} />
                                {application.interviewDate && (
                                    <InfoItem label="Fecha de Entrevista" value={formatDate(application.interviewDate)} highlighted />
                                )}
                                {application.offerDate && (
                                    <InfoItem label="Fecha de Oferta" value={formatDate(application.offerDate)} />
                                )}
                                {application.rejectionDate && (
                                    <InfoItem label="Fecha de Rechazo" value={formatDate(application.rejectionDate)} />
                                )}
                                {application.expectedSalary && (
                                    <InfoItem
                                        label="Salario Esperado"
                                        value={formatSalary(application.expectedSalary, application.salaryCurrency)}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Job URL Section */}
                        {application.jobUrl && (
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Enlace del Trabajo</h2>
                                <a
                                    href={application.jobUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 underline break-all"
                                >
                                    {application.jobUrl}
                                </a>
                            </div>
                        )}

                        {/* Notes Section */}
                        {application.notes && (
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Notas</h2>
                                <p className="text-gray-700 whitespace-pre-wrap">{application.notes}</p>
                            </div>
                        )}

                        {/* Feedback Section */}
                        {application.feedback && (
                            <div className="border-b border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Feedback</h2>
                                <p className="text-gray-700 whitespace-pre-wrap">{application.feedback}</p>
                            </div>
                        )}

                        {/* Timestamps Section */}
                        <div className="p-6 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                                <div>
                                    <span className="font-medium">Creado:</span> {formatDate(application.createdAt)}
                                </div>
                                <div>
                                    <span className="font-medium">Última actualización:</span> {formatDate(application.updatedAt)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={() => navigate('/applications')}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition"
                        >
                            Volver
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition"
                        >
                            Eliminar Aplicación
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Info Item Component
const InfoItem = ({ label, value, highlighted = false }) => {
    return (
        <div className={highlighted ? 'bg-blue-50 p-3 rounded-lg' : ''}>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className={`text-gray-800 mt-1 ${highlighted ? 'font-semibold text-blue-700' : ''}`}>
                {value}
            </p>
        </div>
    );
};

export default ApplicationDetail;
