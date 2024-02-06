import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login";

function App() {
	return (
		<Routes>
			<Route exact path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
