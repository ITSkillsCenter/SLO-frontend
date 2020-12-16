import React, { Component } from "react";
import Table from "../../helpers/customTable";

class RoleTable extends Component {
  constructor(props) {
    super(props);
  }

  getValue = (data) => {
    const firstDept = data.unit !== null ? data.unit.department.name : "";
    const unitName =
      data.unitId !== null && data.unit != null ? data.unit.name : "";

    return data.unitId === null
      ? data.department.name
      : firstDept + "/" + unitName;
  };

  bodyRow = () => {
    const body = this.props.roles.map((data, index) => ({
      jobTitle: data.title,
      departmentUnit: this.getValue(data),
      action: (
        <a>
          <span
            className="edit"
            data-toggle="modal"
            data-target="#roleModal"
            onClick={() => this.props.handleEdit(data.id)}
          >
            Edit
          </span>
          {/* <span className="del" 
						data-toggle="modal"
						data-target="#confirm"
						onClick={() => this.props.setSelectedId(data.id)}>
						Delete
					</span> */}
        </a>
      ),
    }));
    return body;
  };

  header = () => {
    const header = [
      {
        title: "Job Title (filterable)",
        prop: "jobTitle",
        sortable: true,
        filterable: true,
      },
      { title: "Department/Unit", prop: "departmentUnit", sortable: true },
      { title: "Actions", prop: "action" },
    ];
    return header;
  };

  render() {
    return (
      <div>
        <div className="table-responsive" style={{ overflow: "hidden" }}>
          <Table
            body={this.bodyRow}
            head={this.header}
            rowsPerPage={10}
            rowsPerPageOption={[10, 15, 20, 25]}
          />

          {/* <table className="table table-bordered table-hover mb-0 text-nowrap">
                    <tr>
                        <th>Job Title</th>
                        <th>Department/Unit</th>
                        <th>Actions</th>       
                    </tr>

										{
											props.roles.length ? props.roles.map(data => (
												<tr>		
													<td>{data.title}</td>
													<td>
														{
															data.unitId === null ? data.department.name : data.unit.name
														}
													</td>
													
													<td>
															<span className='edit' data-toggle="modal" data-target="#roleModal" onClick={() => props.handleEdit(data.id)}>Edit</span>
															<span className='del' onClick={() => props.handleDelete(data.id)}>Delete</span>
													</td>
												</tr>
											)) : ''
										}

												
												</table> */}
        </div>
      </div>
    );
  }
}

export default RoleTable;
