import axios from 'axios';


const API_URL = 'https://api.preppathapp.com/api';
//const API_URL_DEV = 'http://localhost:8080/api';


//Patrón de diseño: Singleton - Se crea una única instancia de Axios configurada para ser utilizada en toda la aplicación, asegurando que todas las solicitudes compartan la misma configuración y estado (como el token JWT).
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir el token JWT a todas las peticiones

//Patrón de diseño: Decorator - El interceptor actúa como un decorador para las solicitudes, añadiendo funcionalidad (autenticación) sin modificar el código de las solicitudes individuales.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;