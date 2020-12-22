import $ from "jquery";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
// import axios from "axios";
// import { modal } from "bootstrap";
import Layout from "../layout/index";
import {
  httpGet,
  httpDelete,
  httpPatch, httpPost
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
// import Layout from "../layout/index";
import BranchModal from "../Modals/Branch";
import AreaTable from "./areaTable";
import "./branchStyle/branch.css";
import BranchTable from "./branchTable";
import RegionTable from "./regionTable";

export default class branch extends Component {
	constructor(props) {
		super(props);
		this.state = {
      name: '',
      address: '',
      regionId: '',
      areaId: '',
      regionOptions: [],
      areaOptions: [],
      regionName: '',
      areaName: '',
			branches: [],
			regions: [],
      areas: [],
      area: [],
			modalMode: "create",
			currentEditId: null,
      errorMessage1: null,
      tableMode: 'region',
      type: ''
		};
  }

  handleChange = (e) => {
		if (e.target.name === "name") {
			this.setState({ [e.target.name]: e.target.value, errorMessage1: null });
		} else {
			this.setState({ [e.target.name]: e.target.value });
    }
    if(e.target.name === "regionId"){
      this.getAreasById(e.target.value);
    }
   console.log(e.target.name)
  };

  handleChange2 = (e) => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handleSetState = (state) => {
    this.setState({tableMode: state});
  }
  
  componentDidMount() {
		this.getBranch();
    this.getRegions();
    this.getAreas();
	}

	getBranch = async () => {
		try {
			showLoader();
			const res = await httpGet("all_branch");
			if (res.code === 200) {
				this.setState({ branches: res.data.branches });
				hideLoader();
			}
		} catch (error) {
			hideLoader();
			console.log(error);
		}
	};

	getRegions = async () => {
		try{
			const res = await httpGet("all_region");
			if (res.code === 200) {

        let regionOptions = [];
        [...res.data.regions].map(data => {
          regionOptions.push({ value: data.id, label: data.name });
        });

				this.setState({ 
          regions: res.data.regions,
          regionOptions
				});
			}

		}catch(error){
			hideLoader()
			console.log(error)
		}
  }

  getAreasById = async (id) => {
		try{
      const res = await httpGet(`/all_area/${id}`);
     
			if (res.length > 0) {       
				this.setState({ 
          area: res
				});
			}

		}catch(error){
			hideLoader()
			console.log(error)
		}
  }

  getAreas = async () => {
		try{
			const res = await httpGet("all_area");
			if (res.code === 200) {

        let areaOptions = [];
        [...res.data.areas].map(data => {
          areaOptions.push({ value: data.id, label: data.name });
        });

				this.setState({ 
          areas: res.data.areas,
          areaOptions 
				});
			}

		}catch(error){
			hideLoader()
			console.log(error)
		}
  }

  handleEdit = async (id, editType) => {
    this.setState({
      type: editType
    })
    if(editType === 'branch'){
      const found = [...this.state.branches].filter(item => item.id === id);
      const branch = found[0];
      if (found.length) {
        this.setState({
          name: branch.name,
          address: branch.address,
          regionId: branch.regionId,
          areaId: branch.areaId,
          currentEditId: id,
          modalMode: "edit",
        });
      }
    } else if(editType === 'area'){
      const found = [...this.state.areas].filter(item => item.id === id);
      const area = found[0];
      if (found.length) {
        this.setState({
          name: area.name,
          address: area.address,
          regionId: area.regionId,
          currentEditId: id,
          modalMode: "edit",
        });
      }
    } else {
      const found = [...this.state.regions].filter(item => item.id === id);
      const region = found[0];
      if (found.length) {
        this.setState({
          name: region.name,
          address: region.address,
          currentEditId: id,
          modalMode: "edit",
        });
      }
    }
	};


  deleteHandler = async (url,type)=>{
    console.log(url);
		try{
		const res = await httpDelete(url);
		  if (res.code === 200){
      hideLoader();
      if (type === "region"){
        NotificationManager.success("Success! Region was deleted successfully");
      }
      if (type === "area"){
        NotificationManager.success("Success! Area was deleted successfully");
      }
      if (type === "branch"){
        NotificationManager.success("Success! Branch was deleted successfully");
      }
      
			
			window.location.href="/branches"
		  }
		}catch(error){
		  NotificationManager.error("Network Error! Please try again")
		}
	  }

  handleEditSubmit = async() => {
    const { modalMode, currentEditId,name, address, regionId, areaId  } = this.state;
    if(this.state.type === 'region') {
      const data = {
        name,
        address,
      }
      console.log(data);
      const res = await httpPatch(`edit_region/${currentEditId}`, data);
      if (res.code === 200) {
        NotificationManager.success("Region edited successfully");
        $(".modal").modal("hide");
        $(document.body).removeClass("modal-open");
        $(".modal-backdrop").remove();
        window.location.href="/branches"
      }
    } else if(this.state.type === 'area'){
      const data = {
        name,
        address,
        regionId,
      }
      const res = await httpPatch(`edit_area/${currentEditId}`, data);
      if (res.code === 200) {
        NotificationManager.success("Area edited successfully");
        $(".modal").modal("hide");
        $(document.body).removeClass("modal-open");
        $(".modal-backdrop").remove();
        window.location.href="/branches"
      }
    } else {
      const data = {
        name,
        address,
        regionId,
        areaId
      }

      console.log(data)
      const res = await httpPatch(`edit_branch/${currentEditId}`, data);
      if (res.code === 200) {
        NotificationManager.success("Branch edited successfully");
        $(".modal").modal("hide");
        $(document.body).removeClass("modal-open");
        $(".modal-backdrop").remove();
        window.location.href="/branches"
      }
    }
  }

  handleSubmit = async (type) => {
    showLoader()
    const { name, address, regionId, areaId } = this.state;
    if (type === ""){
      NotificationManager.error("Please select an office type");
      hideLoader();
      return;
    }
    if (type === "regions"){
      let data = {
          name,
          address
      }
      const res = await httpPost("create_region", data);
      if (res.code === 201) {
        this.getRegions();
        this.clearState()
        NotificationManager.success("Region created successfully");
        $(".modal").modal("hide");
        $(document.body).removeClass("modal-open");
        $(".modal-backdrop").remove();
        hideLoader()
      }
    }
    if (type === "branches"){
      let data = {
          name,
          address,
          regionId,
          areaId
      }
      const res = await httpPost("create_branch", data);
        if (res.code === 201) {
          this.getBranch();
          this.clearState()
          NotificationManager.success("Branch created successfully");
          $(".modal").modal("hide");
          $(document.body).removeClass("modal-open");
          $(".modal-backdrop").remove();
          hideLoader()
        }
    }
    if (type === "areas"){
      let data = {
        name,
        address,
        regionId,
    }
    const res = await httpPost("create_area", data);
        if (res.code === 201) {
          this.getAreas();
          this.clearState();
          NotificationManager.success("Area created successfully");
          $(".modal").modal("hide");
          $(document.body).removeClass("modal-open");
          $(".modal-backdrop").remove();
          hideLoader()
        }
    }
    
  } 
  
  clearState = () => {
		this.setState({      
      name: "",
      address: "",
      regionId: "",
      areaId: "",
			modalMode: "create",
			currentEditId: null,
			errorMessage1: null,
		});
	};

	closeModal = () => {
		this.clearState();
	};

	render() {
		const { modalMode, errorMessage1, branch, tableMode } = this.state;
		return (
			<Layout page="branch">
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
									Office
								</a>
							</li>
							<li className="breadcrumb-item active text-" aria-current="page">
								Office List
							</li>
						</ol>
						<div className="section-body">
							<div className="row">
								<div className="col-md-10">
									<div className="card">
										<div className="card-header custom-header">
											<div className="col-md-6">
												<button
													type="button"
													className="btn "
													data-toggle="modal"
													data-target="#branchModal"
												>
													CREATE NEW
												</button>
											</div>
                      <div className="col-md-6 btn-group">
                        <button type="button" className={tableMode === 'region' ? 'btn ml-auto':"btn btn-grp-bg ml-auto"}
                          onClick={() => this.setState({tableMode: 'region'})}
                        >Regions</button>
                        <button type="button" className={tableMode === 'area' ? 'btn':"btn btn-grp-bg"} 
                          onClick={() => this.setState({tableMode: 'area'})}
                        >Areas</button>
                        <button type="button" className={tableMode === 'branch' ? 'btn':"btn btn-grp-bg"}
                          onClick={() => this.setState({tableMode: 'branch'})}
                        >Branches</button>
                      </div>
										</div>

										<div className="card-body">
                      
                      {
                        tableMode === 'region' &&
                        <div className="mb-5">
                          <RegionTable
                            branches={this.state.regions}
                            handleDelete={this.deleteBranch}
                            handleEdit={this.handleEdit}
                            type={this.state.type}
                            deleteHandler={this.deleteHandler}
                          />
                        </div>
                      }
                    
                      {
                        tableMode === 'area' &&
                        <div className="mb-5">
                          <AreaTable
                            branches={this.state.areas}
                            handleDelete={this.deleteBranch}
                            handleEdit={this.handleEdit}
                            deleteHandler={this.deleteHandler}
                          />
                        </div>
                      }
                    
                      {
                        tableMode === 'branch' &&
                        <div className="mb-5">
                          <BranchTable
                            branches={this.state.branches}
                            handleDelete={this.deleteBranch}
                            handleEdit={this.handleEdit}
                            deleteHandler={this.deleteHandler}
                          />
                        </div>
                      }

										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
				<BranchModal
					modalMode={modalMode}
          handleSubmit={this.handleSubmit}
          handleEditSubmit={this.handleEditSubmit}
					closeModal={this.closeModal}
          name={this.state.name}
          address={this.state.address}
          areaId={this.state.areaId}
          areas={this.state.area}
          regions={this.state.regions}
          regionId={this.state.regionId}
					handleChange={this.handleChange}
          errorMessage1={errorMessage1}
          tableMode = {this.state.tableMode}
          setState = {this.state.handleSetState}
          type= {this.state.type}
          handleChange2 = {this.handleChange2}
				/>
			</Layout>
		);
	}
}
