import React,{useState,useEffect} from 'react'
import Layout from "../layout/index";
import CreatePoll from '../Modals/createPoll';
import PollsTable from './PollsTable';
import Axios from 'axios';
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
  httpGet1,
} from "../../actions/data.action";
import { NotificationManager } from "react-notifications";
import $ from 'jquery'
import { hideLoader, showLoader } from '../../helpers/loader';

export default function Index(props) {

   const getPolls = async () =>{
      try{
        showLoader();
        //setSearch(search);
        let query = department.length > 0 ? `opinion_polls/branch/${branch}/department/${department}` : branch.length > 0 ? `opinion_polls/branch/${branch}` : `general_opinion_polls`;
        console.log('query>>',query);
        let res = await httpGet1(query);
        console.log('res>>',res);
        setPoll({});
        setPolls(query === 'general_opinion_polls' ? res.data.generalOpinionPolls : department.length > 0 ? res.departmentOpinionPolls : res.branchOpinionPolls)

        hideLoader();
      }catch(error){
        console.log(error);
        hideLoader();
        //NotificationManager.error("Network Error. Please try again")
        //console.log(error);
      }
    };
    const getData = async () =>{
      try{
        showLoader();
        let res =  httpGet1('all_branch');
        let res1 =  httpGet1('departments');
        let all = await Axios.all([res,res1]);
        setBranches(all[0].data.branches);
        setDepartments(all[1].data.departments);
       hideLoader();
      }catch(error){
        hideLoader();
        NotificationManager.error("Network Error. Please try again");
      }
    }
    useEffect(()=>{
      getPolls();
      getData();
    },[])
    
    const [poll,setPoll] = useState({});
    const [search,setSearch] = useState('general_opinion_polls');
    const [polls,setPolls] = useState([])
    const [branch,setBranch] = useState("");
    const [department,setDepartment] = useState("");
    const [branches,setBranches] = useState([]);
    const [departments,setDepartments] = useState([]);
    const searchHandler = () =>{
      
    }
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
                  
                  <li className="breadcrumb-item active text-" aria-current="page">
                    User Role
                  </li>
                </ol>
                <div className="section-body">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="card">
                        <div className="card-header custom-header">
                          <div className="col col-md-12">
                            <button
                              type="button"
                              className="btn "
                              data-toggle="modal"
                              data-target="#createPoll"
                              onClick={()=>setPoll({})}
                              // onClick={this.reSetModal}
                            >
                              CREATE NEW
                            </button>
                            {/* <div className="inputf">
                                <input placeholder="Input a Branch Name"/><button className="search-bt">Search</button>
                            </div> */}
                          </div>
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-7">
                      <div className="mb-5">
                        {/* <button className="btn btn-default mr-4" 
                              onClick={()=>getPolls("general_opinion_polls")} >General</button> */}
                        {/* {
                          [
                            {
                              button_name : "General",
                              search : "general_opinion_polls"
                            },
                            {
                              button_name : "Branch",
                              search : ""
                            },
                            {
                              button_name : "Department",
                              search : ""
                            }
                          ].map((item,index)=>(
                            <button className={search === item.search ? `btn btn-primary mr-4` : `btn btn-default mr-4`} 
                              key={index} onClick={()=>getPolls(item.search)} >{item.button_name}</button>
                          ))
                        } */}
                        <div className="poll-filter-container">
                          <select className="poll-filter form-control" onChange={(event)=>setBranch(event.target.value)}>
                            <option value="">By Branch</option>
                            {
                              branches.map((branch,index)=>(
                                <option key={index} value={branch.id}>{branch.name}</option>
                              ))
                            }
                          </select>
                        </div>
                        {
                          branch.length > 0 && (
                            <div className="poll-filter-container">
                              <select className="poll-filter form-control" onChange={(event)=>setDepartment(event.target.value)}>
                                <option value="">By Department</option>
                                {
                                  departments.map((department,index)=>(
                                    <option key={index} value={department.id}>{department.name}</option>
                                  ))
                                }
                              </select>
                            </div>
                          )
                        }
                        <div className="poll-filter-container">
                          <button className="btn btn-default" onClick={getPolls}><span className="fa fa-search"></span></button>
                        </div>
                      </div>
                      <div className="mb-5">
                        <PollsTable data={polls} setPoll={setPoll} getPolls={getPolls}/>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </div>
        </Layout>
        <CreatePoll poll={poll} getPolls={getPolls} setPoll={setPoll} departments={departments} branches={branches}/>
        </div>

    )
}
// onBlur={this.handleEditDaata(id)}
