import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import Table from "../../helpers/customTable";
import { Link } from "react-router-dom";
import _ from 'lodash';

export default class payroll extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	bodyRow = () => {
		const body = this.props.payrollDetails.map((data, index) => ({
			name: _.startCase(_.lowerCase(data.name)),
			taxable:  _.startCase(_.lowerCase(`${data.taxable}`)),

			Pensionable: _.startCase(_.lowerCase(`${data.pensionable}`)),
			positive: _.startCase(_.lowerCase(`${data.positive}`)),
			PayableMonth:  _.startCase(_.lowerCase(`${data.periodicity}`)),

			action: (
				<a>
					<Link to={`view_payroll/${data.id}`}>
						{" "}
						<span
							className="edit"
							className="fa fa-eye mr-4 add-cursor"
						></span>
					</Link>

					<Link to={`edit-payroll/${data.id}`}>
						{" "}
						<span
							className="edit"
							className="fa fa-pencil-square-o mr-4 add-cursor"
						></span>
					</Link>

					<span
						className="del"
						onClick={() => this.props.deletePayroll(data.id)}
						className="fa fa-trash mr-4 add-cursor"
					></span>
				</a>
			),
		}));
		return body;
	};

	header = () => {
		const header = [
			{
				title: "Item Name (filterable)",
				prop: "name",
				sortable: true,
				filterable: true,
			},
			{ title: "Taxable", prop: "taxable", sortable: true },

			{ title: "Pensionable", prop: "Pensionable", sortable: true },

			{ title: "Positive", prop: "positive", sortable: true },

			{ title: "Payable", prop: "PayableMonth", sortable: true },
			{ title: "Actions", prop: "action" },
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
