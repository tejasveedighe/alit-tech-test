import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login";
import ReceiptList from "./pages/ReceiptList/receiptList";

function App() {
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("authToken")) {
			navigate("/login");
		}
	}, []);
	return (
		<Routes>
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/" element={<ReceiptList />} />
		</Routes>
	);
}

export default App;
