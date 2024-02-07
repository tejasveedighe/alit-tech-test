import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function Nav() {
	return (
		<>
			<Navbar bg="light" expand="lg">
				<Link to="/customers">
					<Button>Customers</Button>
				</Link>
				<Link to="/bills">
					<Button variant="success">Bills</Button>
				</Link>
			</Navbar>
			<Outlet />
		</>
	);
}

export default Nav;
