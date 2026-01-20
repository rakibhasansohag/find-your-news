/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('token');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);

// Auth APIs
export const authAPI = {
	register: (data: any) => api.post('/auth/register', data),
	login: (data: any) => api.post('/auth/login', data),
	logout: () => api.post('/auth/logout'),
	getMe: () => api.get('/auth/me'),
};

// Task APIs
export const taskAPI = {
	getTasks: (params?: any) => api.get('/tasks', { params }),
	getTask: (id: string) => api.get(`/tasks/${id}`),
	createTask: (data: any) => api.post('/tasks', data),
	updateTask: (id: string, data: any) => api.put(`/tasks/${id}`, data),
	deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};

export default api;
