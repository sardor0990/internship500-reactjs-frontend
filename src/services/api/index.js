import axios from 'axios';
const request = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	// baseURL: 'http://192.168.1.64:8080/api',
	headers: {
		common: {
			Authorization: localStorage.getItem('token')
				? 'Bearer ' + localStorage.getItem('token')
				: null,
		},
	},
	params: {
		"lang": localStorage.getItem('i18nextLng')
	},
	timeout: 30000,
});

request.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
			? 'Bearer ' + localStorage.getItem('token')
			: null;
		config.headers['Authorization'] = `${token}`;

		return config;
	},
	(error) => {
		if (error.response?.status === 401) {
			localStorage.clear();
			window.location.pathname = '/register';
		}
		return Promise.reject(error);
	},
);

request.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		const location = window.location.pathname;

		if (err?.response?.status === 401 || err?.response?.status === 403) {
			// localStorage.clear();
			if (location?.search('admin') > 0) {
				// window.location.pathname = '/admin/sign-in';
			} else {
				return Promise.reject(err);
			}
		} else {
			return Promise.reject(err);
		}
	},
);

export default request;
