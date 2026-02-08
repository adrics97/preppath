import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full text-center">
                {/* Icono de cancelación */}
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">Pago Cancelado</h1>
                <p className="text-gray-600 mb-6">
                    Has cancelado el proceso de pago. No se ha realizado ningún cargo.
                </p>

                {/* Info adicional */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">¿Tuviste algún problema?</span>
                        <br />
                        Si encontraste algún error o tienes dudas sobre la suscripción, no dudes en contactarnos.
                    </p>
                </div>

                {/* Recordatorio de beneficios */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-3">Con PrepPath Pro obtienes:</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center text-gray-700">
                            <span className="text-blue-600 mr-2">✓</span>
                            Aplicaciones ilimitadas
                        </li>
                        <li className="flex items-center text-gray-700">
                            <span className="text-blue-600 mr-2">✓</span>
                            Preguntas ilimitadas
                        </li>
                        <li className="flex items-center text-gray-700">
                            <span className="text-blue-600 mr-2">✓</span>
                            Soporte prioritario
                        </li>
                    </ul>
                    <p className="mt-4 text-center">
                        <span className="text-2xl font-bold text-blue-600">$9</span>
                        <span className="text-gray-600">/mes</span>
                    </p>
                </div>

                {/* Botones */}
                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/pricing')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
                    >
                        Intentar de nuevo
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 transition-colors"
                    >
                        Volver al Dashboard
                    </button>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                    ¿Necesitas ayuda?{' '}
                    <a href="mailto:support@preppathapp.com" className="text-blue-600 hover:underline">
                        Contáctanos
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;