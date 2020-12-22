import React, { useEffect, useRef, useState } from 'react';
import {
	httpDelete, httpGet1,

	httpPatch1, httpPost1
} from "../../../actions/data.action";
import Layout from "../../layout/index";
import { hideLoader, showLoader } from '../../../helpers/loader';
import LeaveManagementTable from "./leaveMangmentTable";
import "./leaveM.css";

export default function LeaveManagement(){
	const [leaveHistory,setLeaveHistory] = useState([]);
	const getAllLeaveHistory = async () => {
		try{
		  showLoader();
		  //setSearch(search);
		  let query = `/all_leave_request`;
		  let res = await httpGet1(query);
		  console.log(res);
		  if (res.code === 200){
			hideLoader();
			setLeaveHistory(res.data.leaveApplication);
		  }
		  hideLoader();
		}catch(error){
		  console.log(error);
		  hideLoader();
		}
	  };

	  useEffect(()=>{
		getAllLeaveHistory();
	  },[])
	
		return (
			<div>
				<Layout>
					<div className="app-content">
						<section className="section">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<a href="#" className="text-muted">
										Home
									</a>
								</li>
								<li className="breadcrumb-item">
									<a href="#" className="text-muted">
										Leave
									</a>
								</li>
								<li className="breadcrumb-item active text-" aria-current="page">
									Leave Management
								</li>
							</ol>
							<div className="section-body">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-body">
												<LeaveManagementTable />
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>

					<div
						className="modal fade"
						id="exampleModal2"
						tabindex="-1"
						role="dialog"
						aria-labelledby="exampleModal2"
						aria-hidden="true"
					>
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="example-Modal2">
										Application Details
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">×</span>
									</button>
								</div>
								<div className="modal-body">
									<div className="row">
										<div className="col-md-6 addi">
											<p>Staff Name: Okeke Andrew</p>
											<p>Staff Branch: Aguda Branch</p>
											<p>Leave Type: Casual Leave</p>
											<p>Leave Start Date: 14th April 2020</p>
											<p>Leave End Date: 14th April 2020</p>
										</div>
										<div className="col-md-6 addi">
											<p>Staff Position: Manager</p>
											<p>Staff Region: Benin Town</p>
											<p>Number of days for leave: 10 days</p>
											<p>Number of days applied: 6 days</p>
											<p>Number of leave days left: 4 days</p>
										</div>
									</div>
									<div className="row">
										<div className="col-md-12 checkBoxTabP">
											<div className="checkBoxTa">
												<label for="vehicle1">HR Approval</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</div>

											<div className="checkBoxTa">
												<label for="vehicle1">BM Approval</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</div>

											<div className="checkBoxTa">
												<label for="vehicle1">AM Approval</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</div>

											<div className="checkBoxTa">
												<label for="vehicle1">RM Approval</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12 checkBoxTabP">
											<div className="checkBoxTa">
												<label for="vehicle1">HR Rejection</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</div>

											<div className="checkBoxTa">
												<label for="vehicle1">BM Rejection</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</div>

											<div className="checkBoxTa">
												<label for="vehicle1">AM Rejection</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</div>

											<div className="checkBoxTa">
												<label for="vehicle1">RM Rejection</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</div>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12 reason">
											<h1>REASON</h1>
											<p>
												rovide a valid href, but still need the element to
												resemble a link, use a button and change it with
												appropriate styles
											</p>
										</div>
									</div>

									<div className="row">
										<div className="col-md-12 leavepay">
											<label for="vehicle1">PAID LEAVE</label>
											<input
												type="checkbox"
												id="vehicle1"
												name="vehicle1"
												value="Bike"
											/>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-danger"
										data-dismiss="modal"
									>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</Layout>
			</div>
		);
}
