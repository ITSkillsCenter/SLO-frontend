import React, { useEffect, useRef, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { useHistory } from "react-router";
import {
	httpDelete, httpGet1,

	httpPatch1, httpPost1
} from "../../../actions/data.action";
import { hideLoader, showLoader } from '../../../helpers/loader';
import Layout from "../../layout/index";
import "./leave.css";
import LeaveTable from "./leaveTable";

export default function CreateLeave(props) {
	
	const [roles,setRoles] = useState([]);
	const [leaves,setLeaves] = useState([]);
	const [leave,setLeave] = useState({});
	const [id, setEditId] = useState(null);
	
	
	const typeRef = useRef(null);
	const durationRef = useRef(null);
	const daysRef = useRef(null);
	const approvalRef = useRef(null);
	const paidRef = useRef(null);
	const negativeRef = useRef(null);
	const genderCheckRef = useRef(null);
	const rangeActiveRef = useRef(null);
	const activeRef = useRef(null);

	const typeRef1 = useRef(null);
	const durationRef1 = useRef(null);
	const daysRef1 = useRef(null);
	const approvalRef1 = useRef(null);
	const paidRef1 = useRef(null);
	const negativeRef1 = useRef(null);
	const genderCheckRef1 = useRef(null);
	const rangeActiveRef1 = useRef(null);
	const activeRef1 = useRef(null);

	
	const onChangeHandler = (event) => {
		setLeave({ ...leave, [event.target.name]: event.target.value });
	  };

	  const formatDate = (date) => {
		let d = new Date(date),
		  month = "" + (d.getMonth() + 1),
		  day = "" + d.getDate(),
		  year = d.getFullYear();
	
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
	
		return [year, month, day].join("-");
	  };

	const getLeaveRoles = async () => {
		try{
		  showLoader();
		  //setSearch(search);
		  let query = `/user_roles`;
		  let res = await httpGet1(query);
		  if (res.code === 200){
			hideLoader();
			setRoles(res.data.roles);
		  }
		  hideLoader();
		}catch(error){
		  console.log(error);
		  hideLoader();
		}
	  };

	const createLeave = async (event)=>{
		try{
		  showLoader();
		  const data = {
			"type": typeRef.current.value ,
			"duration": durationRef.current.value,
			"approvalLevel": approvalRef.current.value,
			"paidLeave": paidRef.current.checked,
			"active": activeRef.current.checked,
			"genderType": genderCheckRef.current.value,
			"staffEmployedDuration": rangeActiveRef.current.checked,
			"staffEmployedDurationDays": daysRef.current.value, 
			"allowNegativeBalance":negativeRef.current.checked 
		  }
		 console.log(data);
		  let res = await httpPost1(`/create_leave`,data);
		  if (res.code === 201){
			hideLoader();
			NotificationManager.success("Success! Leave was created successfully");
			window.location.href="/leave_setup"
		  }
		}catch(error){
		  console.log(error);
		  hideLoader();
		  NotificationManager.error("Network Error. Please try again later");
		}
	}

	const editLeave= async (url)=>{
		try{
			const data = {
				"type": typeRef1.current.value ,
				"duration": durationRef1.current.value,
				"approvalLevel": approvalRef1.current.value,
				"paidLeave": paidRef1.current.checked,
				"active": activeRef1.current.checked,
				"genderType": genderCheckRef1.current.value,
				"staffEmployedDuration": rangeActiveRef1.current.checked,
				"staffEmployedDurationDays": daysRef1.current.value, 
				"allowNegativeBalance":negativeRef1.current.checked 
			  }
			  console.log(data);
			showLoader();
			let res = await httpPatch1(`edit_leave/${id}`,data);
			if (res.code === 200){
			  hideLoader();
			  NotificationManager.success("Success! Leave was edited successfully");
			  window.location.href="/leave_setup"
			}
		  }catch(error){
			console.log(error);
			hideLoader();
			NotificationManager.error("Network Error. Please try again later");
		  }
		
	  }

	const setId = async (id) => {
		console.log(id,"22")
		setEditId(id)
	}

	const getOneLeave = async (id) => {
		try{
			showLoader();
			//setSearch(search);
			console.log("id2", id)
			let query = `get_leave/${id}`;
			let res = await httpGet1(query);
			console.log(res);
			let data = res.data.leave;
			console.log(data);
			if (res.code === 200){
			  hideLoader();
			  setLeave(data);
			console.log(leave)
			}
			hideLoader();
		  }catch(error){
			console.log(error);
			hideLoader();
		  }
	}

	const deleteHandler = async (url)=>{
		try{
		const res = await httpDelete(url);
		  if (res.code === 200){
			hideLoader();
			NotificationManager.success("Success! Leave was deleted successfully");
			window.location.href="/leave_setup"
		  }
		}catch(error){
		  NotificationManager.error("Network Error! Please try again")
		}
	  }

	const getAllLeave = async () => {
		try{
		  showLoader();
		  //setSearch(search);
		  let query = `/all_leave`;
		  let res = await httpGet1(query);
		  console.log(res);
		  if (res.code === 200){
			hideLoader();
			setLeaves(res.data.leave);
		  }
		  hideLoader();
		}catch(error){
		  console.log(error);
		  hideLoader();
		}
	  };
	  useEffect(()=>{
		getAllLeave();
		getLeaveRoles();
	  },[])
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

												<LeaveTable getData={getOneLeave} date={formatDate}  tableData={leaves}deleteHandler delete={deleteHandler} setId={setId}/>
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
												ref={typeRef}
												
												
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
												ref={durationRef}
												
											/>
										</div>

										<div className="form-group">
											<label for="recipient-name" className="form-control-label">
												Approval Level
											</label>
											<select
												className="form-control sel"
												id="exampleFormControlSelect1"
												ref={approvalRef}
												
											>
											<option value="nonex">Select</option>
											{
												roles.map((item) => {
													return <option value={item.name}>{item.name}</option>
												})
											}
											</select>
										</div>

										<div className="form-group leave_cheack_box">
											<div>
												<label for="recipient-name" className="form-control-label">
													Paid Leave
												</label>
												<input ref={paidRef} type="checkbox" value={leave.paidLeave} />
											</div>

											<div>
												<label for="recipient-name" className="form-control-label">
													Active Leave
												</label>
												<input ref={activeRef} type="checkbox" value={leave.active} />
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
												<input ref={negativeRef} type="checkbox" value={leave.allowNegativeBalance} />
											</span>

											<span className="d-flex mb-2">
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													Leave applicable to 
												</label>
												<select
												className="form-control sel"
												id="genderCheck"
												ref={genderCheckRef}
											>
												<option  value="all">all</option>
												<option value="male">male</option>
												<option value="female">female</option>
											</select>
											</span>

											<span>
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													Leave dependent on how long staff have spent in
													organisation
												</label>
												<input ref={rangeActiveRef} type="checkbox" value={leave.staffEmployedDurationDays} />
											</span>

											<span className="leave_sel_span">
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													If Yes, How many days
												</label>
												<input
												type="text"
												className="form-control"
												id="leave-form"
												ref={daysRef}
											/>
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
									<button type="button" onClick={createLeave} className="btn btn-primary">
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
										EDIT LEAVE
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
												ref={typeRef1}
												name = "type"
												value={leave.type}
												onChange={onChangeHandler}
												
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
												name="duration"
												ref={durationRef1}
												value={leave.duration}
												onChange={onChangeHandler}
											/>
										</div>

										<div className="form-group">
											<label for="recipient-name" className="form-control-label">
												Approval Level
											</label>
											<select
												className="form-control sel"
												id="exampleFormControlSelect1"
												ref={approvalRef1}
												value={leave.approvalLevel}
												onChange={onChangeHandler}
												name = "approvalLevel"
											>
											<option value="nonex">Select</option>
											{
												roles.map((item) => {
													return <option defaultValue={item.name === leave.approvalLevel} value={item.name}>{item.name}</option>
												})
											}
											</select>
										</div>

										<div className="form-group leave_cheack_box">
											<div>
												<label for="recipient-name" className="form-control-label">
													Paid Leave
												</label>
												<input onChange={onChangeHandler} name="paidLeave" ref={paidRef1} type="checkbox" checked={leave.paidLeave} value={leave.paidLeave} />
											</div>

											<div>
												<label for="recipient-name" className="form-control-label">
													Active Leave
												</label>
												<input ref={activeRef1} onChange={onChangeHandler} name="active" checked={leave.active} type="checkbox" value={leave.active} />
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
												<input ref={negativeRef1} onChange={onChangeHandler} name="allowNegativeBalance" checked={leave.allowNegativeBalance} type="checkbox" value={leave.allowNegativeBalance} />
											</span>

											<span className="d-flex mb-2">
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													Leave applicable to 
												</label>
												<select
												className="form-control sel"
												id="genderCheck"
												ref={genderCheckRef1}
												onChange={onChangeHandler}
												name="genderType"
											>
												<option defaultValue={leave.genderType === "all"}   value="all">all</option>
												<option defaultValue={leave.genderType === "male"} value="male">male</option>
												<option defaultValue={leave.genderType === "female"} value="female">female</option>
											</select>
											</span>

											<span>
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													Leave dependent on how long staff have spent in
													organisation
												</label>
												<input ref={rangeActiveRef1} onChange={onChangeHandler} name="staffEmployedDuration" type="checkbox" checked={leave.staffEmployedDuration} value={leave.staffEmployedDuration} />
											</span>

											<span className="leave_sel_span">
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													If Yes, How many days
												</label>
												<input
												type="text"
												className="form-control"
												id="leave-form"
												ref={daysRef1}
												value={leave.staffEmployedDurationDays}
												onChange={onChangeHandler}
												name="staffEmployedDurationDays"
											/>
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
									<button type="button" onClick={editLeave} className="btn btn-primary">
										Edit
									</button>
								</div>
							</div>
						</div>
					</div>


					<div
						className="modal fade"
						id="exampleModal46"
						tabindex="-1"
						role="dialog"
						aria-hidden="true"
					>
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="example-Modal3">
										VIEW LEAVE
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
												ref={typeRef1}
												name = "type"
												value={leave.type}
												
												
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
												name="duration"
												ref={durationRef1}
												value={leave.duration}
												
											/>
										</div>

										<div className="form-group">
											<label for="recipient-name" className="form-control-label">
												Approval Level
											</label>
											<select
												className="form-control sel"
												id="exampleFormControlSelect1"
												ref={approvalRef1}
												value={leave.approvalLevel}
												
												name = "approvalLevel"
											>
											<option value="nonex">Select</option>
											{
												roles.map((item) => {
													return <option defaultValue={item.name === leave.approvalLevel} value={item.name}>{item.name}</option>
												})
											}
											</select>
										</div>

										<div className="form-group leave_cheack_box">
											<div>
												<label for="recipient-name" className="form-control-label">
													Paid Leave
												</label>
												<input  name="paidLeave" ref={paidRef1} type="checkbox" checked={leave.paidLeave} value={leave.paidLeave} />
											</div>

											<div>
												<label for="recipient-name" className="form-control-label">
													Active Leave
												</label>
												<input ref={activeRef1}  name="active" checked={leave.active} type="checkbox" value={leave.active} />
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
												<input ref={negativeRef1}  name="allowNegativeBalance" checked={leave.allowNegativeBalance} type="checkbox" value={leave.allowNegativeBalance} />
											</span>

											<span className="d-flex mb-2">
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													Leave applicable to 
												</label>
												<select
												className="form-control sel"
												id="genderCheck"
												ref={genderCheckRef1}
												
												name="genderType"
											>
												<option defaultValue={leave.genderType === "all"}   value="all">all</option>
												<option defaultValue={leave.genderType === "male"} value="male">male</option>
												<option defaultValue={leave.genderType === "female"} value="female">female</option>
											</select>
											</span>

											<span>
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													Leave dependent on how long staff have spent in
													organisation
												</label>
												<input ref={rangeActiveRef1} name="staffEmployedDuration" type="checkbox" checked={leave.staffEmployedDuration} value={leave.staffEmployedDuration} />
											</span>

											<span className="leave_sel_span">
												<label
													for="recipient-name"
													className="form-control-label rules-labels"
												>
													If Yes, How many days
												</label>
												<input
												type="text"
												className="form-control"
												id="leave-form"
												ref={daysRef1}
												value={leave.staffEmployedDurationDays}
												
												name="staffEmployedDurationDays"
											/>
											</span>
										</div>
									</form>
								</div>
								
							</div>
						</div>
					</div>
				</Layout>
			</div>
		);
	
}
