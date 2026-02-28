import { useState, useEffect } from 'react';

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handler = (e) => {
            const { message, type } = e.detail;
            const id = Date.now();
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3500);
        };
        window.addEventListener('preppath:toast', handler);
        return () => window.removeEventListener('preppath:toast', handler);
    }, []);

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white animate-slide-in
                        ${t.type === 'success' ? 'bg-gray-900 dark:bg-gray-700' : 'bg-red-600'}
                    `}
                >
                    {t.type === 'success' ? (
                        <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4 text-red-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                    {t.message}
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
