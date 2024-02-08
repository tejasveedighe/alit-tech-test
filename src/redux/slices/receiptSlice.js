import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../../utils/api";

const initialState = {
	receipts: [],
	receipt: null,
	status: "idle",
	loading: false,
	receiptLoading: false,
};

export const fetchReceipts = createAsyncThunk(
	"receipts/fetchReceipts",
	async () => {
		try {
			const response = await Axios.get("BillManagement/Bill/GetList/");

			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const getReceiptById = createAsyncThunk(
	"receipts/fetchReceiptById",
	async (id) => {
		try {
			const response = await Axios.get(`BillManagement/Bill/GetModel/${id}`);

			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const updateReceipt = createAsyncThunk(
	"receipts/updateReceipt",
	async (payload) => {
		try {
			const response = await Axios.put("BillManagement/Bill/Update", payload);
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
		setReceipt: (state, action) => {
			state.receipt = action.payload;
		},
	},
	extraReducers(builder) {
		// get all bills
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

		// get bill by id
		builder.addCase(getReceiptById.pending, (state, action) => {
			state.receiptLoading = true;
			state.status = "loading";
			state.receipt = null;
		});
		builder.addCase(getReceiptById.rejected, (state, action) => {
			state.receiptLoading = false;
			state.status = "rejected";
			state.receipt = null;
		});
		builder.addCase(getReceiptById.fulfilled, (state, action) => {
			state.receiptLoading = false;
			state.status = "fulfilled";
			state.receipt = action.payload;
		});
	},
});

export const { setReceipt, setReceipts } = receiptSlice.actions;
export default receiptSlice.reducer;
