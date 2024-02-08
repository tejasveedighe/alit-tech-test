import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login";
import ReceiptList from "./pages/ReceiptList/receiptList";
import CustomersList from "./pages/CustomersList/customersList";
import Nav from "./components/Nav/Nav";

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
			<Route exact path="/" element={<Nav />}>
				<Route exact path="/bills" element={<ReceiptList />} />
				<Route exact path="/customers" element={<CustomersList />} />
			</Route>
		</Routes>
	);
}

export default App;
