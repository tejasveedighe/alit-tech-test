import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useDispatch, useSelector } from "react-redux";
import CustomerModal from "../../components/CustomersModal/CustomersModal";
import {
	addCustomer,
	deleteCustomer,
	fetchAllCustomers,
	updateCustomer,
} from "../../redux/slices/customersSlice";

export default function CustomersList() {
	const tableRef = useRef();
	const dispatch = useDispatch();
	const { customers, status, loading } = useSelector(
		(store) => store.customers
	);

	const [showModal, setShowModal] = useState(false);
	const [editedCustomer, setEditedCustomer] = useState(null);

	useEffect(() => {
		dispatch(fetchAllCustomers());
	}, [dispatch]);

	const refreshCustomers = useCallback(() => {
		dispatch(fetchAllCustomers());
	}, [dispatch]);

	const handleOpenModal = useCallback((customer) => {
		setEditedCustomer(customer);
		setShowModal(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setShowModal(false);
		setEditedCustomer(null);
	}, []);

	const handleUpdateCustomer = useCallback(
		(editedCustomer) => {
			dispatch(updateCustomer(editedCustomer))
				.then(() => {
					alert("Customer Updated!");
					handleCloseModal();
				})
				.then(() => refreshCustomers())
				.catch((err) => {
					alert(err.message);
					handleCloseModal();
				});
		},
		[dispatch, handleCloseModal, refreshCustomers]
	);

	const handleNewCustomer = useCallback(
		(customer) => {
			dispatch(addCustomer(customer))
				.then(() => {
					alert("Customer Added!");
					handleCloseModal();
				})
				.then(() => refreshCustomers())
				.catch((err) => {
					alert(err.message);
					handleCloseModal();
				});
		},
		[dispatch, handleCloseModal, refreshCustomers]
	);

	const handleDeleteCustomer = useCallback(
		(customerId) => {
			if (
				window.confirm(`Do you want to delete customer with id - ${customerId}`)
			) {
				dispatch(deleteCustomer(customerId))
					.then(() => {
						alert("Deleted Customer!");
					})
					.catch((err) => {
						alert(err.message);
						handleCloseModal();
					})
					.then(() => {
						handleCloseModal();
						refreshCustomers();
					});
			}
		},
		[dispatch, refreshCustomers, handleCloseModal]
	);

	if (loading && status === "pending") return <div>Loading...</div>;
	if (!loading && status === "rejected") return <div>Failed to fetch data</div>;
	return (
		<main className="container d-flex align-items-center justify-content-center flex-column">
			<section className="w-100">
				<div className="d-flex align-items-center justify-content-between w-100">
					<h1>Customers</h1>
					<div className="float-end mb-2 d-flex gap-2 align-items-center ">
						<Button variant="success" onClick={() => handleOpenModal(null)}>
							Add Customer
						</Button>
						<DownloadTableExcel
							filename="customers"
							sheet="customers"
							currentTableRef={tableRef.current}
						>
							<Button variant="primary">Print</Button>
						</DownloadTableExcel>
						<Button variant="secondary" onClick={refreshCustomers}>
							Refresh
						</Button>
					</div>
				</div>
				<Table ref={tableRef} striped bordered hover>
					<thead>
						<tr>
							<th>Sr No.</th>
							<th>Customer Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{customers?.map((customer) => (
							<tr key={crypto.randomUUID()}>
								<td>{customer.customerID}</td>
								<td>{customer.customerName}</td>
								<td>
									<div className="float-end">
										<ButtonGroup>
											<Button onClick={() => handleOpenModal(customer)}>
												Edit
											</Button>{" "}
											<Button
												variant="danger"
												onClick={() =>
													handleDeleteCustomer(customer.customerID)
												}
											>
												Delete
											</Button>
										</ButtonGroup>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<div className="float-start">Showing {customers?.length} Record</div>
			</section>

			<CustomerModal
				show={showModal}
				handleClose={handleCloseModal}
				handleSubmit={handleUpdateCustomer}
				handleAddCustomer={handleNewCustomer}
				customer={editedCustomer}
			/>
		</main>
	);
}
