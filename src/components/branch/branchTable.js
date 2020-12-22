import { data } from "jquery";
import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import Table from "../../helpers/customTable";

export default class branchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  bodyRow = () => {
    const body = this.props.branches.map((data, index) => ({
      branchName: data.name,
      address: data.address,
      region: data.region !== null ? data.region.name : "n/a",
      area: data.area !== null ? data.area.name : "",
      action: (
        <a>
          <span
            className="edit"
            data-toggle="modal"
            data-target="#branchModal2"
            onClick={() => this.props.handleEdit(data.id, "branch")}
          >
            Edit
          </span>
        </a>
      ),
      "delete": <button onClick={() => {this.props.deleteHandler(`delete_branch/${data.id}`,'branch')}} className="del">delete</button>
    }));
    return body;
  };

  header = () => {
    const header = [
      {
        title: "Branch Name (filterable)",
        prop: "branchName",
        sortable: true,
        filterable: true,
      },
      { title: "Address", prop: "address", sortable: true },
      {
        title: "Region",
        prop: data.region === undefined ? "n/a" : data.region.name,
        sortable: data.region === undefined ? false : true,
      },
      //   { title: "Area", prop: "area", sortable: true },
      { title: "Actions", prop: "action" },
      { title: "Delete", prop: "delete" },

    ];
    return header;
  };

  render() {
    return (
      <div className="table-responsive" style={{ overflow: "hidden" }}>
        <Table
          body={this.bodyRow}
          head={this.header}
          rowsPerPage={10}
          rowsPerPageOption={[10, 15, 20, 25]}
        />
      </div>
    );
  }
}
