import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Axios, BASE_URL } from "../../utils/api";

const initialState = {
	user: null,
	loading: false,
	status: "idle",
};

export const authenticateUser = createAsyncThunk(
	"user/authenticateUser",
	async (payload) => {
		try {
			const response = await Axios.post(
				`${BASE_URL}UserManagement/AuthenticateUser?UserName=${payload.username}&Password=${payload.password}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(authenticateUser.pending, (state, action) => {
			state.loading = true;
			state.status = "pending";
		});
		builder.addCase(authenticateUser.rejected, (state, action) => {
			state.loading = false;
			state.status = "rejected";
		});
		builder.addCase(authenticateUser.fulfilled, (state, action) => {
			state.loading = false;
			state.status = "authenticated";
			state.user = action.payload;
			localStorage.setItem("authToken", action.payload.authToken);
		});
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
