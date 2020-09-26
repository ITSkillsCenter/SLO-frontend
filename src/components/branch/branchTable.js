import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import Table from '../../helpers/customTable';



export default class branchTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
	
	}

	bodyRow = () => {
		const body = this.props.branches.map((data, index) => (
			{
				"branchName": data.name,
				"address": data.address,
				"region": data.region.name,
				"area": data.area.name,
				"action": <a><span className='edit' data-toggle="modal" data-target="#branchModal" onClick={() => this.props.handleEdit(data.id, 'branch')}>Edit</span></a>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
			{
				title: 'Branch Name (filterable)',
				prop: 'branchName',
				sortable: true,
				filterable: true
			},
			{ title: 'Address', prop: 'address', sortable: true },
			{ title: 'Region', prop: 'region', sortable: true },
			{ title: 'Area', prop: 'area', sortable: true },
			{ title: 'Actions', prop: 'action' },
		];
		return header;
	}

	render() {
		return (
			<div className="table-responsive" style={{overflow: 'hidden'}}>
				<Table 
          body={this.bodyRow}
					head={this.header}
					rowsPerPage={10}
					rowsPerPageOption={[10, 15, 20, 25]}
        />
			</div>
		)
	}
}
