import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUserProfile = async () => {
        try {
            const response = await api.get('/users/me');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const _saveSession = ({ token, ...userData }) => {
        localStorage.setItem('token', token);
        setToken(token);
        setUser(userData);
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            _saveSession(response.data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed',
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            _saveSession(response.data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed',
            };
        }
    };

    const googleLogin = async (accessToken) => {
        try {
            const response = await api.post('/auth/google', { accessToken });
            _saveSession(response.data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Google sign-in failed',
            };
        }
    };

    const githubLogin = async (code) => {
        try {
            const response = await api.post('/auth/github', { code });
            _saveSession(response.data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'GitHub sign-in failed',
            };
        }
    };

    const forgotPassword = async (email) => {
        try {
            await api.post('/auth/forgot-password', { email });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to send reset email',
            };
        }
    };

    const resetPassword = async (token, password) => {
        try {
            await api.post('/auth/reset-password', { token, password });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to reset password',
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        googleLogin,
        githubLogin,
        forgotPassword,
        resetPassword,
        isAuthenticated: !!token,
    };

    //Patrón de diseño: Provider - El AuthProvider actúa como un proveedor de contexto que encapsula la lógica de autenticación y proporciona el estado y las funciones relacionadas a toda la aplicación, permitiendo que cualquier componente acceda a esta información sin necesidad de prop drilling.
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
