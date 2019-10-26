import axios from 'axios';
import router from './router'
import store from './store'

axios.defaults.timeout = 8000;

// 全局设定 Token
axios.interceptors.request.use(
	config => {
		let token = store.state.token
		if (token) {
			config.headers.Authorization = 'Token ' + token
		}

		return config
	},

	error => {
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(
	response => {
		if (response.status === 401) {
			removeToken()
			router.push({path: '/login'});
		} else if (response.status === 403) {
			router.push({path: '/home'});
		}
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);


export default axios