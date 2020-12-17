import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {setPoll} from '../../helpers/storePollData';
import $ from 'jquery';
import {
	httpPost1,
	httpGet1,
	httpDelete,
	httpPatch,
  httpGet,
  httpPatch1,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
import { NotificationManager } from "react-notifications";

export default function AddcreatePoll(props) {
  const [selected,setSelected] = useState({
    department : "",
    branch : "",
    title: "",
    description : ""
  })
    const dept = props.poll.length > 0 ? props.departments.filter(department=>department.id === props.poll.departmentId) : "";
    const branch = props.poll.length ? props.branches.filter(branch=>branch.id === props.poll.branchId) : "";
  // if(props.poll){
    
  //   setSelected({
  //     department : dept.length > 0 ? dept[0].name : dept,
  //     branch : branch.length > 0 ? bran
  //   })
  // }
  const submitHandler = async (event) => {
    event.preventDefault();
    try{
      if(selected.title.trim() === "" && !props.poll){
        return NotificationManager.error("Fields marked with * are required");
      }
      if(selected.branch.trim() === "" && selected.department.trim() !== "" && !props.poll){
        return NotificationManager.error("Please select a branch");
      }
      //showLoader();
      console.log('polling>>',props.poll);
      let edit_branch = Object.values(branch).length > 0 ? branch[0].name  : null;
      let edit_dept = Object.values(dept).length > 0 ? dept[0].name  : null;
      let fd = {
        name: Object.values(props.poll).length > 0 && selected.title.length == 0 ? props.poll.name : selected.title,
        category: selected.department !== "" || edit_dept !== null ? "department" : selected.branch.trim() !== "" || edit_branch !== null ? "branch" : "general",
        description: selected.description.trim() !== "" ? selected.description.trim() : props.poll ? props.poll.description : "",
        branchName: selected.branch.trim() !== "" ? selected.branch.trim() : edit_branch,
        departmentName: selected.department.trim() !== "" ? selected.department.trim() : edit_dept,
        startDate: "2020-12-20",
        endDate: "2020-12-29"  
      }
      if(Object.values(props.poll).length > 0){
        let res = await httpPatch1(`/opinion_poll/${props.poll.id}`,fd);
        props.setPoll({});
        await props.getPolls();
        NotificationManager.success("Success! Record has been updated");
        $(".modal").modal("hide");
        $(document.body).removeClass("modal-open");
        return $(".modal-backdrop").remove();
      }
      let res = await httpPost1('create_opinion_poll',fd);
      hideLoader();
      window.location.href = `/create_poll/${res.opinionPoll.id}`;
    }catch(error){
      console.log('error>>',error)
      hideLoader();
      NotificationManager.error("Network Error. Please try again")
    }
    
  }
  const onChangeHandler = (event) => {
    setSelected({...selected,[event.target.name] :event.target.value});
  }
  // useEffect(()=>{
  //   getData();
  // },[])
  return (
    <div>
      <div class="modal fade" id="createPoll" tabindex="-1" role="dialog" aria-labelledby="createPoll" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form className="add-investment-wrap">
          <div className="form-group">
              <label  className="form-control-label">Title *</label>
              <input  
                onChange={onChangeHandler}
                value={selected.title.length > 0 ? selected.title : props.poll ? props.poll.name : ""}
                name="title" 
                type="text" 
                className="form-control" 
              />
          </div> 
          <div className="form-group">
              <label className="form-control-label">Branch</label>
              <select name="branch" className="form-control" onChange={onChangeHandler} value={selected.branch.length > 0 ? selected.branch : Object.values(branch).length > 0 ? branch[0].name  : ""}>
                <option value="">Select Branch</option>
                {
                  props.branches.map((branch,index)=>(
                    <option value={branch.name}>{branch.name}</option>
                  ))
                }
              </select>
          </div>
          <div className="form-group">
              <label className="form-control-label">Department</label>
              <select name="department" className="form-control" onChange={onChangeHandler} value={selected.department.length > 0 ? selected.department : Object.values(dept).length > 0 ? dept[0].name  : ""}>
                <option value="">Select Department</option>
                {
                  props.departments.map((department,index)=>(
                    <option value={department.name} key={index}>{department.name}</option>
                  ))
                }
              </select>
          </div>
          <div className="form-group">
            <label  className="form-control-label">Description (Optional)</label>
            <textarea  
              onChange={onChangeHandler}
              value={selected.description.length > 0 ? selected.description : props.poll ? props.poll.description : ""}
              name="description"
              type="text" 
              className="form-control"  
            />
          </div> 

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" onClick={submitHandler}>Submit</button>
        
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
