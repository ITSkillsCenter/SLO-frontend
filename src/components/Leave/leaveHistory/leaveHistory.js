import React, { Component } from "react";
import Layout from "../../layout/index";
import LeavehistoryTable from "./leavehistoryTable";
import "./Lhistory.css";

export default class LeaveHistory extends Component {
	render() {
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
									Leave History
								</li>
							</ol>

							<div className="col-lg-12 col-xl-12 col-md-12 col-12">
								<div className="card">
									<div className="card-body remove-padding">
										<div className="row">
											<div className="flex-4">
												<div className="flex4-drop">
													<label
														for="recipient-name"
														className="form-control-label"
													>
														Leave Type
													</label>
													<select
														className="form-control sel"
														id="exampleFormControlSelect1"
													>
														<option value="">Select</option>
														<option value="RegionA">Region A</option>
														<option value="RegionB">Region B</option>
														<option value="RegionC">Region C</option>
														<option value="RegionD">Region D</option>
													</select>
												</div>

												<div className="flex4-drop">
													<label
														for="recipient-name"
														className="form-control-label"
													>
														Department
													</label>
													<select
														className="form-control sel"
														id="exampleFormControlSelect1"
													>
														<option value="">Select </option>
														<option value="RegionA">Region A</option>
														<option value="RegionB">Region B</option>
														<option value="RegionC">Region C</option>
														<option value="RegionD">Region D</option>
													</select>
												</div>

												<div className="flex4-drop">
													<label
														for="recipient-name"
														className="form-control-label"
													>
														Date Applied
													</label>
													<select
														className="form-control sel"
														id="exampleFormControlSelect1"
													>
														<option value="">Select Region</option>
														<option value="RegionA">Region A</option>
														<option value="RegionB">Region B</option>
														<option value="RegionC">Region C</option>
														<option value="RegionD">Region D</option>
													</select>
												</div>

												<div className="flex4-drop">
													<label
														for="recipient-name"
														className="form-control-label"
													>
														{" "}
														Approved
													</label>
													<select
														className="form-control sel"
														id="exampleFormControlSelect1"
													>
														<option value="">Select</option>
														<option value="RegionA">Region A</option>
														<option value="RegionB">Region B</option>
														<option value="RegionC">Region C</option>
														<option value="RegionD">Region D</option>
													</select>
												</div>
											</div>
										</div>
										<span className="checkggp">
											<span className="checkggpt">Status:</span>

											<span className="checkgg">
												<label for="vehicle1">Approved</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</span>

											<span className="checkgg">
												<label for="vehicle1">Rejected</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</span>

											<span className="checkgg">
												<label for="vehicle1">Cancelled</label>
												<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													value="Bike"
												/>
											</span>
										</span>
									</div>
								</div>
							</div>
							<div className="section-body">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-body">
												<LeavehistoryTable />
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
										<div className="col-md-6">
											<p>Staff Name: Okeke Andrew</p>
											<p>Staff Branch: Aguda Branch</p>
											<p>Leave Type: Casual Leave</p>
											<p>Leave Start Date: 14th April 2020</p>
											<p>Leave End Date: 14th April 2020</p>
										</div>
										<div className="col-md-6">
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
}
