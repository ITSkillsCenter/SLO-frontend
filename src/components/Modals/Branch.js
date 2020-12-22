import React, { useEffect, useRef, useState } from 'react';
import "../branch/branchStyle/branch.css";


const BranchModal = (props) => {
  const checkRef = useRef(null);
  const [type,setType] = useState("");
  const [regionId, setRegionId] = useState("")
  const onChange = (event) => {
    event.target.checked = true;
    setType(event.target.value)
  }
  const onChange2 = (event) => {
		setRegionId(event.target.value);
	  };
  return (
    <div className="modal fade" id="branchModal" tabindex="-1" role="dialog"  aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="example-Modal3">{props.modalMode === 'create' ? 'CREATE' : 'EDIT'} NEW OFFICE</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">

          
          <form>
          <div className="form-group">
              <label for="recipient-name"  className="form-control-label" aria-required required>Office Type</label>
              <div>
                <span>
                <input type="radio" id="regions" onChange={onChange}  name="type" className="radio" value="regions" />
              <label for="male" className="pl-2">Regions</label>
                </span>
            
            <span className="radio">
            <input type="radio" id="areas" onChange={onChange}  name="type"  value="areas" />
              <label for="female" className="pl-2">Areas</label>
            </span>
              <span className="radio">
              <input type="radio" id="branches" onChange={onChange}  name="type" className="radio" value="branches" />
              <label for="other" className="pl-2">Branches</label>
              </span>
              
          </div>
            </div> 
            {
              type === "regions" ? (
                <div>
                    <div className="form-group">
              <label for="recipient-name" className="form-control-label">Office Name</label>
              <input  
                onChange={props.handleChange}
                value={props.name}
                name="name" 
                type="text" 
                className="form-control" 
                id="recipient-name"
              />
            </div> 

            <div className="form-group">
              <label for="recipient-names" classs="form-control-label">Address</label>
              <input 
                onChange={props.handleChange}
                value={props.address}
                name="address" 
                type="text" 
                className="form-control" 
                id="recipient-names"
              />
            </div>

                </div>
              ) : type === "areas" ? (
                  <div>
                      <div className="form-group">
              <label for="recipient-name" className="form-control-label">Office Name</label>
              <input  
                onChange={props.handleChange}
                value={props.name}
                name="name" 
                type="text" 
                className="form-control" 
                id="recipient-name"
              />
            </div> 

            <div className="form-group">
              <label for="recipient-names" classs="form-control-label">Address</label>
              <input 
                onChange={props.handleChange}
                value={props.address}
                name="address" 
                type="text" 
                className="form-control" 
                id="recipient-names"
              />
            </div>

          <div className="form-group">
            <label for="recipient-name" className="form-control-label">Region</label>
              <select 
                value={props.regionId}
                name="regionId"
                onChange={props.handleChange}    
                className="form-control sel" 
                id="exampleFormControlSelect1"
                disabled={props.modalMode === 'edit' ? true : false}
              >      
                <option value="" selected disabled>Select Region</option>
                {
                  props.regions.length ? props.regions.map(item => (
                    <option value={item.id} >{item.name}</option>
                  )) : ''
                }
              </select>
          </div>

          
                  </div>
              ) : (
                <div>
                    <div className="form-group">
              <label for="recipient-name" className="form-control-label">Office Name</label>
              <input  
                onChange={props.handleChange}
                value={props.name}
                name="name" 
                type="text" 
                className="form-control" 
                id="recipient-name"
              />
            </div> 

            <div className="form-group">
              <label for="recipient-names" classs="form-control-label">Address</label>
              <input 
                onChange={props.handleChange}
                value={props.address}
                name="address" 
                type="text" 
                className="form-control" 
                id="recipient-names"
              />
            </div>

          <div className="form-group">
            <label for="recipient-name" className="form-control-label">Region</label>
              <select 
                value={props.regionId}
                name="regionId"
                onChange={props.handleChange}    
                className="form-control sel" 
                id="exampleFormControlSelect1"
                disabled={props.modalMode === 'edit' ? true : false}
               
              >      
                <option value="" selected disabled>Select Region</option>
                {
                  props.regions.length ? props.regions.map(item => (
                    <option value={item.id} >{item.name}</option>
                  )) : ''
                }
              </select>
          </div>

          <div className="form-group">
            <label for="recipient-name" className="form-control-label">Area</label>
              <select 
                value={props.areaId}
                name="areaId"
                onChange={props.handleChange}    
                className="form-control sel" 
                id="exampleFormControlSelect1"
                disabled={props.modalMode === 'edit' ? true : false}
              >      
                <option value="" selected disabled>Select Area</option>
                {
                  props.areas.length ? props.areas.map(item => (
                    <option value={item.id} >{item.name}</option>
                  )) : ''
                }
              </select>
          </div>

                </div>
              )
            }
            
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.closeModal}>Close</button>
          {
            props.modalMode === 'create' ?
            <button type="button" className="btn btn-primary" onClick={() => props.handleSubmit(type)}>
              CREATE
            </button> :
            <button type="button" className="btn btn-primary" onClick={props.handleEditSubmit}>
              UPDATE
            </button>
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default BranchModal;
