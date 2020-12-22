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
				// "officeId": data.region,
				"address": data.address,
				"action": <a><span className='edit' data-toggle="modal" data-target="#branchModal2" onClick={() => this.props.handleEdit(data.id, 'region')}>Edit</span></a>,
				"delete": <button onClick={() => {this.props.deleteHandler(`delete_region/${data.id}`,'region')}} className="del">delete</button>
				
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
			{
				title: 'Region Name (filterable)',
				prop: 'branchName',
				sortable: true,
				filterable: true
			},
			// { title: 'Office Id', prop: 'officeId', sortable: true },
			{ title: 'Address', prop: 'address', sortable: true },
			{ title: 'Actions', prop: 'action' },
			{ title: 'Delete', prop: 'delete' },
		];
		return header;
	}

	render() {
		return (
			<div className="table-responsive" style={{overflow: 'hidden', marginBottom: '20px'}}>
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
