import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReceiptById } from "../../redux/slices/receiptSlice";

const ReceiptCRUD = ({ receiptId, show, setShow }) => {
	const dispatch = useDispatch();

	const { receiptLoading, receipt, status } = useSelector(
		(store) => store.receipts
	);

	const [formData, setFormData] = useState({
		billNo: receipt?.billNo,
		billDate: new Date(receipt?.billDate),
		customerName: receipt?.customerName,
		totalQty: receipt?.totalQty,
		netAmount: receipt?.netAmount,
		remarks: receipt?.remarks,
	});

	const handleClose = () => setShow(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSave = () => {
		handleClose();
	};

	useEffect(() => {
		if (show) dispatch(getReceiptById(receiptId));
	}, [receiptId, show, dispatch]);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{receipt ? "Edit Receipt" : "Add Receipt"}</Modal.Title>
				</Modal.Header>

				{!receiptLoading ? (
					status === "fulfilled" ? (
						<Modal.Body>
							<Form.Group>
								<Form.Label>Receipt No.</Form.Label>
								<Form.Control
									type="text"
									name="billNo"
									value={receipt?.billNo}
									onChange={handleChange}
									disabled={receipt ? true : false}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Receipt Date</Form.Label>
								<Form.Control
									type="date"
									name="billDate"
									// value={formData.billDate.toISOString().split("T")[0]}
									value={receipt?.billDate}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Person Name</Form.Label>
								<Form.Control
									type="text"
									name="customerName"
									value={receipt?.customerName}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Total Qty</Form.Label>
								<Form.Control
									type="number"
									name="totalQty"
									value={receipt?.totalQty}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Net Amount</Form.Label>
								<Form.Control
									type="number"
									name="netAmount"
									value={receipt?.netAmount}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Remarks</Form.Label>
								<Form.Control
									type="text"
									name="remarks"
									value={receipt?.remarks}
									onChange={handleChange}
								/>
							</Form.Group>
						</Modal.Body>
					) : (
						<div>Loading....</div>
					)
				) : (
					<div className="text-danger">Error, in fetching data</div>
				)}

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					{!receiptLoading ? (
						<Button variant="primary" onClick={handleSave}>
							Save
						</Button>
					) : (
						""
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ReceiptCRUD;
