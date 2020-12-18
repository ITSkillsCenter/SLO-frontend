import React from "react";
import Select from "react-select";

export default function UnitModal(props) {
  return (
    <div
      className="modal fade"
      id="createStaffModal"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="example-Modal3">
              {props.modalMode === "create"
                ? "CREATE NEW HOLIDAY"
                : "EDIT HOLIDAY"}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {/* <form>
              <div className="form-group">
                <label for="recipient-name" className="form-control-label">Username</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend select2-padding">
                    <Select
                      className="input-group-text pt-0 pb-0 pr-0 pl-0 border-0"
                      value={props.customMobile}
                      onChange={e => props.handleChange(e, 'mobilePhoneCode')}
                      options={props.countryCodes}
                      isSearchable="true"
                      name="mobilePhoneCode"
                      placeholder="Select"
                    />
                  </div>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.staff.username} 
                    name="username"
                    placeholder="E.g 8033036225"
                    onChange={props.handleChange}
                  />
                </div>
                <span className="text-danger">{props.mobilePhoneCodeError !== null ? props.mobilePhoneCodeError : ''}</span>
                <span className="text-danger">{props.errorMessage1 !== null ? props.errorMessage1 : ''}</span>
              </div>
            
            </form> */}
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="example-Modal3">
                  EDIT HOLIDAY
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
                      Holiday Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>

                  <div className="form-group">
                    <label for="recipient-name" className="form-control-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div className="form-group leave_cheack_box">
                    <div>
                      <label
                        for="recipient-name"
                        className="form-control-label"
                      >
                        Reoccuring Holiday
                      </label>
                      <input type="checkbox" />
                    </div>
                  </div>

                  {/* <div className="line_BREAK"></div> */}
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
                <button type="button" className="btn btn-primary">
                  Create Now
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={props.closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.handleSubmit}
            >
              {props.modalMode === "create" ? "Create" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
