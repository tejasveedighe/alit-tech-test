import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import receiptReducer from "./slices/receiptSlice";
import customersReducer from "./slices/customersSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		receipts: receiptReducer,
		customers: customersReducer,
	},
});
export default store;
