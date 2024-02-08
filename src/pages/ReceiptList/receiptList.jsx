import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReceiptCRUD from "../../components/ReceiptsCRUDModal/ReceiptsCRUD";
import {
	addNewReceipt,
	deleteBill,
	fetchReceipts,
	generateBillNo,
	updateReceipt,
} from "../../redux/slices/receiptSlice";

const ReceiptList = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, loading, receipts } = useSelector((store) => store.receipts);
	const tableRef = useRef();
	const [selectedReceiptId, setSelectedReceiptId] = useState(null);

	const addReceipt = useCallback(() => {
		setSelectedReceiptId(null);
		setShow(true);
	}, []);

	const editReceipt = useCallback((id) => {
		setSelectedReceiptId(id);
		setShow(true);
	}, []);

	const refreshReceipts = useCallback(() => {
		dispatch(fetchReceipts());
	}, [dispatch]);

	const deleteReceipt = useCallback(
		(id) => {
			dispatch(deleteBill(id))
				.then(() => {
					alert("Delete Bill Successful");
					refreshReceipts();
				})
				.catch((err) => {
					alert(err.message);
				});
		},
		[dispatch, refreshReceipts]
	);

	const [show, setShow] = useState(false);

	useEffect(() => {
		refreshReceipts();
	}, []);

	const handleClose = useCallback(() => setShow(false), []);

	const handleSave = useCallback(
		(formData) => {
			if (!formData.billNo) {
				dispatch(generateBillNo()).then((res) => {
					const newFormData = {
						...formData,
						billNo: res.payload,
					};
					dispatch(addNewReceipt(newFormData))
						.then(() => {
							alert("New Bill Added");
							handleClose();
							refreshReceipts();
						})
						.catch((err) => {
							alert(err.message);
							handleClose();
						});
				});
			} else {
				dispatch(updateReceipt(formData))
					.then(() => {
						alert("Bill Updated Successfully");
					})
					.then(() => handleClose())
					.catch((err) => {
						alert(err.message);
						handleClose();
					});
			}
		},
		[dispatch, handleClose]
	);

	if (loading) return <div>Loading...</div>;

	return (
		<>
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
								<th>Bill No.</th>
								<th>Bill Date</th>
								<th>Customer Name</th>
								<th>Net Amount</th>
								<th>Remarks</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{receipts?.map((receipt, index) => (
								<tr key={crypto.randomUUID()}>
									<td>{index + 1}</td>
									<td>{receipt.billNo}</td>
									<td>{new Date(receipt.billDate).toLocaleDateString()}</td>
									<td>{receipt.customerName}</td>
									<td>{receipt.netAmount}</td>
									<td>{receipt.remarks}</td>
									<td>
										<Button
											variant="success"
											size="sm"
											onClick={() => editReceipt(receipt.billID)}
										>
											Edit
										</Button>
										<Button
											variant="danger"
											size="sm"
											onClick={() => deleteReceipt(receipt.billID)}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>

					<div className="float-end">Showing {receipts?.length} records</div>
				</section>
			</main>
			<ReceiptCRUD
				receiptId={selectedReceiptId}
				show={show}
				handleSave={handleSave}
				handleClose={handleClose}
			/>
		</>
	);
};

export default ReceiptList;
