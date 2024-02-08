import axios from "axios";

export const BASE_URL = "https://reacttestprojectapi.azurewebsites.net/api/";

export const Axios = axios.create({
	baseURL: BASE_URL,
});

Axios.interceptors.request.use(
	(config) => {
		const authToken = localStorage.getItem("authToken");

		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
