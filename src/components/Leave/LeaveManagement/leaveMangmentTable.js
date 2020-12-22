import React, { Component } from "react";

export default function LeaveMngementTable (props) {
		console.log(props)
		return (
			<div>
				<div className="table-responsive">
					<table className="table table-bordered table-hover mb-0 text-nowrap">
						<thead>
							<tr>
								<th>User ID</th>
								<th>Staff Name</th>
								<th>Position</th>
								<th>Branch</th>
								<th>Region</th>
								<th>Leave Type</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody>
							{

								props.leaveHistory.map((item) => {
									return (
										<tr>
										<td>{item.leaveApplication.user.id}</td>
										<td>{item.leaveApplication.user.firstName} {item.leaveApplication.user.lastName}</td>
										<td>{item.leaveApplication.user.role} </td>
										<td>{item.branch !== null ? item.branch.name : ""} </td>
										<td>{item.region !== null ? item.region.name : ""}</td>
										<td>{item.leaveApplication.leave.type}</td>
										<td>{item.leaveApplication.status}</td>
										<td>
											<span
												data-toggle="modal"
												data-target="#exampleModal2"
												className="edit"
											>
												View Application
											</span>
										</td>
									</tr>
									)
								})
							
									

									
								
							}
							
							
						</tbody>
					</table>
				</div>
			</div>
		);
}
