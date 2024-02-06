import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchReceipts } from "../../redux/slices/receiptSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";

const ReceiptList = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, loading, receipts } = useSelector((store) => store.receipts);

	useEffect(() => {
		dispatch(fetchReceipts());
	}, []);

	const addReceipt = () => {
		// code for opening CRUD interface for creating new receipt record
	};

	const tableRef = useRef();
	const printReceipts = () => {};

	const editReceipt = (id) => {
		// code for editing receipt record with given id
	};

	const deleteReceipt = (id) => {
		// code for deleting receipt record with given id
	};

	const refreshReceipts = useCallback(() => {
		dispatch(fetchReceipts());
	}, [dispatch]);

	return (
		<main className="container d-flex align-items-center justify-content-center vh-100">
			<section>
				<h1>Receipts</h1>
				<div className="float-end mb-2 d-flex gap-2 align-items-center">
					<Button variant="success" onClick={addReceipt}>
						Add Receipt
					</Button>
					<DownloadTableExcel
						filename="users table"
						sheet="users"
						currentTableRef={tableRef.current}
					>
						<Button variant="primary">Print</Button>
					</DownloadTableExcel>
					<Button variant="secondary" onClick={refreshReceipts}>
						Refresh
					</Button>
					<Button variant="danger" onClick={() => navigate("/")}>
						Exit
					</Button>
				</div>
				<Table ref={tableRef} striped bordered hover>
					<thead>
						<tr>
							<th>Sr No.</th>
							<th>Receipt No.</th>
							<th>Receipt Date</th>
							<th>Person Name</th>
							<th>Total Qty</th>
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
						<tbody>
							{receipts.map((receipt, index) => (
								<tr key={crypto.randomUUID()}>
									<td>{index + 1}</td>
									<td>{receipt.billNo}</td>
									<td>{new Date(receipt.billDate).toLocaleDateString()}</td>
									<td>{receipt.customerName}</td>
									<td>{receipt.totalQty}</td>
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
						</tbody>
					)}
				</Table>

				<div className="float-end">Showing {receipts.length} records</div>
			</section>
		</main>
	);
};

export default ReceiptList;
