import React, { useCallback, useLayoutEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CustomerModal = ({
	show,
	handleClose,
	handleSubmit,
	customer,
	handleAddCustomer,
	handleDeleteCustomer,
}) => {
	const [customerName, setCustomerName] = useState("");

	const handleChange = useCallback((e) => {
		setCustomerName(e.target.value);
	}, []);

	const handleFormSubmit = useCallback(() => {
		const updatedCustomer = { ...customer, customerName };
		handleSubmit(updatedCustomer);
	}, [customer, handleSubmit, customerName]);

	const handleAddSubmit = useCallback(() => {
		handleAddCustomer({ customerName });
	}, [customerName, handleAddCustomer]);

	const handleDeleteSubmit = useCallback(() => {
		handleDeleteCustomer(customer.customerID);
	}, [customer, handleDeleteCustomer]);

	useLayoutEffect(() => {
		setCustomerName(customer ? customer?.customerName : "");
	}, [customer]);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{customer ? "Edit Customer" : "Add Customer"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="customerName">
						<Form.Label>Customer Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter customer name"
							value={customerName}
							onChange={handleChange}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				{customer ? (
					<Button variant="primary" onClick={handleFormSubmit}>
						Update
					</Button>
				) : (
					<Button variant="primary" onClick={handleAddSubmit}>
						Add
					</Button>
				)}
				<Button variant="danger" onClick={handleDeleteSubmit}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CustomerModal;
