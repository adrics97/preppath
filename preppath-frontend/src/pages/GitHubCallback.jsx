import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const GitHubCallback = () => {
    const [searchParams] = useSearchParams();
    const { githubLogin } = useAuth();
    const navigate = useNavigate();
    const called = useRef(false);

    useEffect(() => {
        const code = searchParams.get('code');
        if (!code || called.current) return;
        called.current = true;

        githubLogin(code).then((result) => {
            if (result.success) {
                navigate('/dashboard', { replace: true });
            } else {
                navigate('/login?error=github', { replace: true });
            }
        });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Signing you in with GitHub...</p>
            </div>
        </div>
    );
};

export default GitHubCallback;
