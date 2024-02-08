import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers } from "../../redux/slices/customersSlice";
import { getReceiptById, setReceipt } from "../../redux/slices/receiptSlice";

function initState() {
	return {
		billNo: "",
		billDate: new Date().toISOString().substr(0, 10),
		customerID: null,
		netAmount: 0,
		remarks: "",
		billItems: [],
	};
}

const ReceiptCRUD = ({ receiptId, show, handleClose, handleSave }) => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState(initState);

	const { receiptLoading, receipt, status } = useSelector(
		(store) => store.receipts
	);
	const customersData = useSelector((store) => store.customers);

	const handleChange = useCallback(
		(e) => {
			const { name, value } = e.target;
			setFormData({
				...formData,
				[name]: value,
			});
		},
		[formData]
	);

	const handleAddItem = useCallback(() => {
		setFormData({
			...formData,
			billItems: [
				...formData.billItems,
				{
					sNo: formData.billItems.length + 1,
					desc: "",
					unit: "",
					rate: 0,
					qty: 0,
					discAmt: 0,
					amount: 0,
				},
			],
		});
	}, [formData]);

	const handleItemChange = useCallback(
		(index, field, value) => {
			const updatedItems = formData.billItems.map((item, i) =>
				i === index ? { ...item, [field]: value } : item
			);

			// Calculate the amount for the item
			const updatedItem = updatedItems[index];
			const amountBeforeDiscount = updatedItem.rate * updatedItem.qty;
			const discountAmount = updatedItem.discAmt;
			const amount = amountBeforeDiscount - discountAmount;
			updatedItem.amount = amount;

			// Update the total amount
			const totalAmount = updatedItems.reduce(
				(total, item) => total + item.amount,
				0
			);

			// Update the net amount
			const discountTotal = updatedItems.reduce(
				(total, item) => total + item.discAmt,
				0
			);
			const netAmount = totalAmount - discountTotal;

			setFormData({ ...formData, billItems: updatedItems, netAmount });
		},
		[formData]
	);

	const calculateTotalAmount = useMemo(() => {
		return formData.netAmount + formData.totalDiscountAmount;
	}, [formData]);

	useEffect(() => {
		if (show && !receiptId) {
			setFormData(initState());
			dispatch(setReceipt(initState()));
		} else if (show && receiptId) {
			dispatch(getReceiptById(receiptId));
		}
		dispatch(fetchAllCustomers());
	}, [receiptId, show, dispatch]);

	useEffect(() => {
		if (receipt && !receiptLoading && status === "fulfilled") {
			setFormData({ ...receipt });
		}
	}, [receipt, receiptLoading, status]);

	useEffect(() => {
		return () => dispatch(setReceipt({}));
	}, [dispatch]);
	return (
		<>
			<Modal size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{receiptId ? "Edit Bill" : "Add Bill"}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className="d-flex align-items-center justify-content-between">
						<Form.Group>
							<Form.Label>Bill No.</Form.Label>
							<Form.Control
								type="text"
								name="billNo"
								value={formData.billNo}
								onChange={handleChange}
								disabled={receipt ? true : false}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Bill Date</Form.Label>
							<Form.Control
								type="date"
								name="billDate"
								value={formData.billDate}
								onChange={handleChange}
							/>
						</Form.Group>
					</div>

					<Form.Group>
						<Form.Label>Person Name</Form.Label>
						<Form.Select
							name="customerID"
							aria-labelledby="Select Customer Name"
							value={formData.customerID}
							defaultValue={null}
							onChange={handleChange}
						>
							{customersData?.loading ? (
								<option disabled>Loading....</option>
							) : customersData.status === "rejected" ? (
								<option disabled>Failed to fetch data</option>
							) : (
								customersData?.customers.map((customer) => (
									<option
										key={customer.customerID}
										value={customer.customerID}
										selected={customer.customerID === formData.customerID}
									>
										{customer.customerName}
									</option>
								))
							)}
						</Form.Select>
					</Form.Group>

					<div className="mt-4">
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Sr No.</th>
									<th>Description</th>
									<th>Unit</th>
									<th>Rate</th>
									<th>Quantity</th>
									<th>Discount Amount</th>
									<th>Amount</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{formData?.billItems?.map((item, index) => (
									<tr key={index}>
										<td>{item.sNo}</td>
										<td>
											<Form.Control
												type="text"
												value={item.descr}
												onChange={(e) =>
													handleItemChange(index, "descr", e.target.value)
												}
											/>
										</td>
										<td>
											<Form.Control
												type="text"
												value={item.unit}
												onChange={(e) =>
													handleItemChange(index, "unit", e.target.value)
												}
											/>
										</td>
										<td>
											<Form.Control
												type="number"
												value={item.rate}
												onChange={(e) =>
													handleItemChange(
														index,
														"rate",
														parseFloat(e.target.value)
													)
												}
											/>
										</td>
										<td>
											<Form.Control
												type="number"
												value={item.qty}
												onChange={(e) =>
													handleItemChange(
														index,
														"qty",
														parseFloat(e.target.value)
													)
												}
											/>
										</td>
										<td>
											<Form.Control
												type="number"
												value={item.discAmt}
												onChange={(e) =>
													handleItemChange(
														index,
														"discAmt",
														parseFloat(e.target.value)
													)
												}
											/>
										</td>
										<td>{item.amount}</td>
										<td>
											<Button
												variant="success"
												size="sm"
												onClick={handleAddItem}
											>
												Insert
											</Button>
											<Button variant="danger" size="sm">
												Delete
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>

					<div className="d-flex">
						<Form.Group>
							<Form.Control
								as="textarea"
								rows={10}
								cols={70}
								value={formData.remarks}
								onChange={handleChange}
								name="remarks"
							/>
						</Form.Group>
						<div>
							<Form.Group>
								<Form.Label>Total Amount</Form.Label>
								<Form.Control
									type="number"
									disabled
									name="totalAmount"
									value={calculateTotalAmount}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Discount</Form.Label>
								<Form.Control
									type="number"
									disabled
									name="totalDiscountAmount"
									value={formData.totalDiscountAmount}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Net Amount</Form.Label>
								<Form.Control
									type="number"
									disabled
									name="netAmount"
									value={formData.netAmount}
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					{!receiptLoading && (
						<Button variant="primary" onClick={handleSave}>
							Save
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ReceiptCRUD;
