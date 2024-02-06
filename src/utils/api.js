import axios from "axios";

export const BASE_URL = "https://reacttestprojectapi.azurewebsites.net/api/";

export const Axios = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("authToken")}`,
	},
});
