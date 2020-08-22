import React, { Component } from "react";
import $, { data } from "jquery";
import moment from 'moment'
import { NotificationManager } from "react-notifications";
import axios from "axios";
import {Link} from 'react-router-dom'
import Layout from "../../layout/index";
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
} from "../../../actions/data.action";
import { hideLoader, showLoader } from "../../../helpers/loader";
import "./setup.css";
import PayHistory from "./payHistory";
import PendingPayroll from './processPayroll/pendingPayrolls'
export default class payrollsetup extends Component {
	constructor(props){
		super(props)
		this.state={
			regions:[],
			regionId:null,
			areaId:null,
			branchId:null,
			areas:[],
			areaOptions: [],
			branchOptions:[],
			branches:[],
			payrollMonth:null,
			payrollYear:new Date().getFullYear(),
			title:"",
			regionName:"",
			payrollId:null,
			branchName: '',
			areaName: '',
			regionName: ''
		}
		this.inputRef = React.createRef();
	}

	

	getRegion= async()=>{
        try{
             
                showLoader()
                const res = await httpGet(`/all_region`)
                
                if (res.code === 200) {
                    this.setState({
						regions:res.data.regions
					})
				}
             hideLoader()
          
          
          
              }
              catch(error){
                hideLoader();
                console.log(error);
			  }}


			  getArea= async()=>{
				try{
					 
						showLoader()
						const res = await httpGet(`/all_area`)
						
						if (res.code === 200) {
							
							this.setState({
							areas:res.data.areas
							})
						}
					 hideLoader()
				  
				  
				  
					  }
					  catch(error){
						hideLoader();
						console.log(error);
					  }}



					  getBranch= async()=>{
						try{
							 
								showLoader()
								const res = await httpGet(`/all_branch`)
								
								if (res.code === 200) {
									this.setState({
										branches:res.data.branches
									})
								}
							 hideLoader()
						  
						  
						  
							  }
							  catch(error){
								hideLoader();
								console.log(error);
							  }}
		
		

					  getAreaData=()=>{
							const areaData = [...this.state.areas].filter(
								(datas) => 
								datas.regionId === this.state.regionId
							)
							this.setState({
								areaOptions: areaData,
							});
					  }

					  getBranchData=()=>{
						const branchData = [...this.state.branches].filter(
							(datas) => 
							datas.areaId === this.state.areaId
						)
						this.setState({
							branchOptions:branchData
						});
					  }



componentDidMount= async()=>{
 this.getRegion()
this.getArea()
	this.getBranch()
// this.getTitle()
}

	handleChange  =  async (e,type) => {
		e.preventDefault();
			

		if (type === "area") {
			this.getAreaData()
			const selected = [...this.state.areas].filter(item => item.id === e.target.value)[0];
			const areaName = selected.name;
			await this.setState({ [e.target.name]: e.target.value, areaName });
		} else if (type === "branch") {
			this.getBranchData()
			const selected = [...this.state.branches].filter(item => item.id === e.target.value)[0];
			const branchName = selected.name;
			await this.setState({ [e.target.name]: e.target.value, branchName });
		} else if(type === "region"){
			const selected = [...this.state.regions].filter(item => item.id === e.target.value)[0];
			const regionName = this.handleRegionAbbr(selected.name);
			await this.setState({ [e.target.name]: e.target.value, regionName });
		} else {
			await this.setState({ [e.target.name]: e.target.value });
		}
  }

  handleRegionAbbr = (value) => {
	if(value === 'South West'){
		  return 'SW'
	} else if(value === 'South East'){
		return 'SE'
	} else if(value === 'South South'){
		return 'SS'
	} else if(value === 'North Central'){
		return 'NC'
	} else 	  if(value === 'North East'){
		return 'NE'
	} else 	  if(value === 'North West'){
		return 'NW'
	}
  }

  handleSubmit=async(e)=>{
		showLoader()
		e.preventDefault()
		if (this.state.payrollMonth === null) {
			NotificationManager.error('Please select payment month', 'Opps', 5000, () => {
				// alert('callback');
				hideLoader()
				return;
				});
				
			
		}

		if (this.state.regionId ===null) {
			NotificationManager.error('payroll region is required', 'Opps', 5000, () => {
				// alert('callback');
				});
				hideLoader()
				return;
				
			}



		let data;
		const { regionId, areaId, branchId, title, payrollMonth, payrollYear, regionName, areaName, branchName } = this.state;
		if(branchId){
			data = {
				month: payrollMonth,
				branchId:branchId,
				title: `${regionName}-${areaName}-${branchName}-${payrollMonth}-${payrollYear}`,
				year: payrollYear   
			}
		} else if(areaId){
			data = {
				month: payrollMonth,
				areaId:areaId,
				title: `${regionName}-${areaName}-${payrollMonth}-${payrollYear}`,
				year: payrollYear   
			} 
		} else{
			data = {
				month: payrollMonth,
				regionId:regionId,
				title: `${regionName}-${payrollMonth}-${payrollYear}`,
				year: payrollYear   
			}
		}
		try {
			const res = await httpPost('process_payroll',data)
			showLoader()
			if (res.code === 201) {
				
				console.log(res.data.process.id)
				// NotificationManager.error(res.message, 'Opps', 5000, () => {
				// 	// alert('callback');
				// });
				this.props.history.push(`/process_payroll/${res.data.process.id}`)
			}
		} catch (error) {
			hideLoader()
		}
		hideLoader()
  }
  
  getTitle=(e,data)=>{
this.setState({regionName:data})
}  
	render() {
	
		return (
			<Layout page="payrollSetup">
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
									Process Payroll
								</a>
							</li>
						</ol>
					</section>
					<section className="paysetUpwraper">
						<div style={{ marginBottom: "20px" }} className="payroll-headr">
							<h1 style={{ fontSize: "23px", marginLeft: "50px" }}>
								Process Payroll
							</h1>
						</div>
						<div className="payroll-form-setup">
							<form>
							<div class="inputPayroll-setup">
									<div class="inputPayroll-setup-wrap">
										<label for="">Month for payment</label>
										<select name="payrollMonth" onChange={this.handleChange}
										 name="payrollMonth" class="form-control" id="">
											<option value={null}>Select Months</option>
											<option value="january">January</option>
											<option value="february">February</option>
											<option value="match">Match</option>
											<option value="april">April</option>
											<option value="may">May</option>
											<option value="june">June</option>
											<option value="july">July</option>
											<option value="august">August</option>
											<option value="september">September</option>
											<option value="october">October</option>
											<option value="november">November</option>
											<option value="december">December</option>
										</select>
									</div>

									
								</div>
								<div class="inputPayroll-setup">
								

									<div class="inputPayroll-setup-wrap">
										<label for="">Title</label>

										<input
										disabled="true"
											type="text"
											class="form-control"
											id=""
											placeholder="Type in the title"
											value={`${this.state.regionName !== undefined? this.state.regionName:""}-${this.state.areaName 
												!== undefined? this.state.areaName:""}-${this.state.branchName
													 !== undefined? this.state.branchName:""}-${this.state.payrollMonth 
														!== null ? this.state.payrollMonth : ""}-${this.state.payrollYear} `}
										/>
									</div>

									<div class="inputPayroll-setup-wrap">
										<label>Region</label>
									<select

	 name="regionId"
	 onChange={e => this.handleChange(e, 'region')} 
	
	class="form-control" id="exampleFormControlSelect1">
			<option value={null} >Select</option>
		{this.state.regions.map((data)=>{
			return(
			
		
			
				<option ref={this.inputRef} name="regionName" regionName={data.name} value={data.id}>{data.name}</option>
			
				
			)
		})}
    
    </select>
									</div>
								</div>

								<div class="inputPayroll-setup">
									<div class="inputPayroll-setup-wrap">
										<label for="">Area</label>
										<select
										disabled={this.state.regionId===null}
	 name="areaId"
	 onChange={(e)=>this.handleChange(e,"area")} 
	 onClick={this.getAreaData}
	class="form-control" id="exampleFormControlSelect1">
			<option value={null}>Select</option>
		{this.state.areaOptions.map((data)=>{
			return(
			
		
			
				<option  value={data.id}>{data.name}</option>
			
				
			)
		})}
    
    </select>
									</div>

									<div class="inputPayroll-setup-wrap">
										<label for="">Branch</label>

										<select
										 name="branchId"
										disabled={this.state.areaId===null}
										 onChange={(e)=>this.handleChange(e,"branch")} 
										 onClick={this.getBranchData}
										class="form-control" id="">
											<option value={null}>Select Branch</option>
											{this.state.branchOptions.map((data)=>{
			return(
			
		
			
				<option value={data.id}>{data.name}</option>
			
				
			)
		})}
										</select>
									</div>
								</div>

								<div className="buttonWrap-setup">
									{/* <Link to="/process_payroll"> */}
									<button onClick={this.handleSubmit} type="submit" class="btn btn-primary">
										Proceed
									</button>
									{/* </Link> */}
									
								</div>
							</form>
						</div>
						<PayHistory />
						
						
						
					</section>
					<br/>
					<section className="paysetUpwraper">
					<div style={{ marginBottom: "20px" }} className="payroll-headr">
							<h1 style={{ fontSize: "23px", marginLeft: "10px" }}>
								Pending Payrolls
							</h1>
						</div>
						<PendingPayroll />
					</section>
					
				</div>
				<br/>
			</Layout>
		);
	}
}
