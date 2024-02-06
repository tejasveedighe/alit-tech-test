import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Axios, BASE_URL } from "../../utils/api";

const initialState = {
	receipts: [],
	status: "idle",
	loading: false,
};

export const fetchReceipts = createAsyncThunk(
	"receipts/fetchReceipts",
	async (payload) => {
		try {
			const response = await Axios.get(
				`${BASE_URL}BillManagement/Bill/GetList/`
			);

			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

const receiptSlice = createSlice({
	name: "receipts",
	initialState,
	reducers: {
		setReceipts: (state, action) => {
			state.receipts = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchReceipts.pending, (state, action) => {
			state.loading = true;
			state.status = "loading";
		});

		builder.addCase(fetchReceipts.rejected, (state, action) => {
			state.loading = false;
			state.status = "rejected";
		});
		builder.addCase(fetchReceipts.fulfilled, (state, action) => {
			state.loading = false;
			state.status = "fulfilled";
			state.receipts = action.payload;
		});
	},
});

const { setReceipts } = receiptSlice.actions;
export default receiptSlice.reducer;
