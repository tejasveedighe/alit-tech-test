import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchReceipts } from "../../redux/slices/receiptSlice";

const ReceiptList = () => {
	const dispatch = useDispatch();
	const { status, loading, receipts } = useSelector((store) => store.receipts);

	useEffect(() => {
		dispatch(fetchReceipts());
	}, []);

	const addReceipt = () => {
		// code for opening CRUD interface for creating new receipt record
	};

	const printReceipts = () => {
		// code for exporting grid data to PDF or Excel
	};

	const editReceipt = (id) => {
		// code for editing receipt record with given id
	};

	const deleteReceipt = (id) => {
		// code for deleting receipt record with given id
	};

	return (
		<div className="container vh-100">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Receipt No.</th>
						<th>Receipt Date</th>
						<th>Person Name</th>
						<th>Total Qty</th>
						<th>Add</th>
						<th>Net Amount</th>
						<th>Remarks</th>
						<th>Actions</th>
					</tr>
				</thead>
				{loading ? (
					status === "rejected" ? (
						<div className="text-danger">
							Failed To load the data please try later
						</div>
					) : (
						<div>Loading...</div>
					)
				) : (
					<>
						<tbody>
							{receipts.map((receipt) => (
								<tr key={receipt.id}>
									<td>{receipt.receiptNo}</td>
									<td>{receipt.receiptDate}</td>
									<td>{receipt.personName}</td>
									<td>{receipt.totalQty}</td>
									<td>{receipt.add}</td>
									<td>{receipt.netAmount}</td>
									<td>{receipt.remarks}</td>
									<td>
										<Button
											variant="primary"
											size="sm"
											onClick={() => editReceipt(receipt.id)}
										>
											Edit
										</Button>{" "}
										<Button
											variant="danger"
											size="sm"
											onClick={() => deleteReceipt(receipt.id)}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>{" "}
					</>
				)}
			</Table>
			<div className="d-flex justify-content-between align-items-center">
				<div>
					<Button variant="success" onClick={addReceipt}>
						Add Receipt
					</Button>
					<Button variant="secondary" onClick={printReceipts}>
						Print
					</Button>
				</div>
				<div>Showing {receipts.length} records</div>
			</div>
		</div>
	);
};

export default ReceiptList;
