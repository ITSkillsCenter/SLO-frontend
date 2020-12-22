import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import Table from '../../helpers/customTable';



export default class branchTable extends Component {
	constructor(props){
		super(props)
		this.state = {}
		console.log(this.props.branches);
	
	}

	bodyRow = () => {
		const body = this.props.branches.map((data, index) => (
			{
				"areaName": data.name,
				"region": data.regionId,
				"address": data.address ,
				"action": <a><span className='edit' data-toggle="modal" data-target="#branchModal2" onClick={() => this.props.handleEdit(data.id, 'area')}>Edit</span></a>,
				"delete": <button onClick={() => {this.props.deleteHandler(`delete_area/${data.id}`,'area')}} className="del">delete</button>
			}
		));
		return body;
	}
	
	header = () => {
		const header = [
			{
				title: 'Area Name (filterable)',
				prop: 'areaName',
				sortable: true,
				filterable: true
			},
			{ title: 'Region', prop: 'region', sortable: true },
			{ title: 'Address', prop: 'address', sortable: true },
			{ title: 'Actions', prop: 'action' },
			{ title: 'Delete', prop: 'delete' },
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
