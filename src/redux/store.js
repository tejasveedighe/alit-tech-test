import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import receiptReducer from "./slices/receiptSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		receipts: receiptReducer,
	},
});
export default store;
