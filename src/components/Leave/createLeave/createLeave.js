import React, { Component } from "react";
import Layout from "../../layout/index";
import "./leave.css";
import LeaveTable from "./leaveTable";

export default class CreateLeave extends Component {
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
										Leave Setup
									</a>
								</li>
				
							</ol>
							<div className="section-body">
								<div className="row">
									<div className="col-lg-12">
										<div className="card">
											<div className="card-body">
												<div className="card-header remove-border custom-header">
													<button
														type="button"
														className="btn "
														data-toggle="modal"
														data-target="#exampleModal3"
													>
														CREATE NEW
													</button>
													<div className="inputf">
														<input placeholder="Input a Branch Name" />
														<button className="search-bt">Search</button>
													</div>
												</div>

												<LeaveTable />
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					<div
						className="modal fade"
						id="exampleModal3"
						tabindex="-1"
						role="dialog"
						aria-hidden="true"
					>
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="example-Modal3">
										CREATE LEAVE
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<form>
										<div className="form-group">
											<label for="recipient-name" className="form-control-label">
												Leave Type
											</label>
											<input
												type="text"
												className="form-control"
												id="recipient-name"
											/>
										</div>

										<div className="form-group">
											<label for="recipient-name" className="form-control-label">
												Leave Duration
											</label>
											<input
												type="text"
												className="form-control"
												id="recipient-name"
											/>
										</div>

										<div className="form-group">
											<label for="recipient-name" className="form-control-label">
												Approval Level
											</label>
											<select
												className="form-control sel"
												id="exampleFormControlSelect1"
											>
												<option value="nonex">Select</option>
												<option value="RegionA">Level</option>
												<option value="ob TypeB">Level</option>
												<option value="ob TypeC">Level</option>
												<option value="ob TypeD">Level</option>
											</select>
										</div>

										<div className="form-group leave_cheack_box">
											<div>
												<label for="recipient-name" className="form-control-label">
													Paid Leave
												</label>
												<input type="checkbox" />
											</div>

											<div>
												<label for="recipient-name" className="form-control-label">
													Active Leave
												</label>
												<input type="checkbox" />
											</div>
										</div>

										<div className="line_BREAK"></div>

										<h1 className="leave_rules_header ">Leave Rules</h1>

										<div className="Rules">
											<span>
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													Allow for negative balance
												</label>
												<input type="checkbox" />
											</span>

											<span>
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													Leave applicable to male or female
												</label>
												<input type="checkbox" />
											</span>

											<span>
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													Leave dependent on how long staff have spent in
													organisatio
												</label>
												<input type="checkbox" />
											</span>

											<span className="leave_sel_span">
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													If Yes, How many days
												</label>
												<select
													className="form-control leave_sel"
													id="exampleFormControlSelect1"
												>
													<option value="nonex">Select</option>
													<option value="RegionA">Level</option>
													<option value="ob TypeB">Level</option>
													<option value="ob TypeC">Level</option>
													<option value="ob TypeD">Level</option>
												</select>
											</span>
										</div>
									</form>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-danger"
										data-dismiss="modal"
									>
										Close
									</button>
									<button type="button" className="btn btn-primary">
										Create Now
									</button>
								</div>
							</div>
						</div>
					</div>

					<div
						className="modal fade"
						id="exampleModal45"
						tabindex="-1"
						role="dialog"
						aria-hidden="true"
					>
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="example-Modal3">
										CREATE EDIT BRANCH
									</h5>
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
									>
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<form>
										<div className="form-group">
											<label className="form-control-label">Branch Name</label>
											<input
												type="text"
												className="form-control"
												id="recipient-name"
											/>
										</div>

										<div className="form-group">
											<label className="form-control-label">Address</label>
											<input
												type="text"
												className="form-control"
												id="recipient-name"
											/>
										</div>

										<label for="recipient-name" className="form-control-label">
											Region
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
									</form>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-danger"
										data-dismiss="modal"
									>
										Close
									</button>
									<button type="button" className="btn btn-primary">
										Create Now
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
