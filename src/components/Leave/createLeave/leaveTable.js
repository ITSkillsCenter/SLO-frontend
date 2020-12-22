import React from "react";


export default function LeaveTable(props){
	console.log(props);
	const tableData = props.tableData;
	const deleteLeave = props.delete;
	const getData = props.getData;
	const onEdit = (id) => {
		console.log("id",id)
		props.setId(id);
		getData(id);
	}
		return (
			<div>
				<div className="table-responsive">
					<table className="table table-bordered table-hover mb-0 text-nowrap">
						<thead>
							<tr>
								<th>Leave Type</th>
								<th>Leave Duration</th>
								<th>Approval Level</th>
								<th>Paid Level</th>
								<th>Active</th>
								<th>Modified</th>
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{ 
								tableData.map((item) => {
									return (
										<tr>
								<td>{item.type} </td>
								<td>{item.duration} months</td>
								<td>{item.approvalLevel}</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
										checked={item.paidLeave ? true : false}
									/>
								</td>
								<td>
									{" "}
									<input
										type="checkbox"
										id="vehicle1"
										name="vehicle1"
										value="Bike"
										checked={item.active ? true : false}
									/>
								</td>
								<td>{props.date(item.updatedAt)}</td>
								<td>
									<span
										data-toggle="modal"
										data-target="#exampleModal46"
										className="view"
										onClick= {() => onEdit(`${item.id}`)}
									>
										View
									</span>

									<span
										data-toggle="modal"
										data-target="#exampleModal45"
										className="edit px-3"
										onClick= {() => onEdit(`${item.id}`)}
									>
										Edit
									</span>

									<button onClick={() => deleteLeave(`/leave/${item.id}`)} className="del">delete</button>
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
