import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/api";

const initialState = {
	customers: [],
	loading: false,
	status: "idle",
};

export const fetchAllCustomers = createAsyncThunk(
	"customers/fetchAllCustomers",
	async () => {
		try {
			const response = await Axios.get(
				"CustomerManagement/Customer/GetLookupList"
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

const customersSlice = createSlice({
	name: "customers",
	initialState,
	extraReducers(builder) {
		builder.addCase(fetchAllCustomers.pending, (state, payload) => {
			state.loading = true;
			state.status = "pending";
		});
		builder.addCase(fetchAllCustomers.rejected, (state, payload) => {
			state.loading = false;
			state.status = "rejected";
			state.customers = [];
		});
		builder.addCase(fetchAllCustomers.fulfilled, (state, action) => {
			state.loading = false;
			state.status = "fulfilled";
			state.customers = action.payload;
		});
	},
});

export default customersSlice.reducer;
