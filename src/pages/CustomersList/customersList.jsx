import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers } from "../../redux/slices/customersSlice";

export default function CustomersList() {
	const dispatch = useDispatch();
	const { customers, status, loading } = useSelector(
		(store) => store.customers
	);
	useEffect(() => {
		dispatch(fetchAllCustomers());
	}, []);

	if (loading && status === "pending") return <div>Loading...</div>;
	if (!loading && status === "rejected") return <div>Failed to fetch data</div>;
	return (
		<main className="container d-flex align-items-center justify-content-center flex-column">
			<h1 className="">Customers</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Sr No.</th>
						<th>Customer Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{customers?.map((customer) => (
						<tr key={customer.customerID}>
							<td>{customer.customerID}</td>
							<td>{customer.customerName}</td>
							<td>
								<Button>Edit</Button>
								<Button variant="danger">Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</main>
	);
}
