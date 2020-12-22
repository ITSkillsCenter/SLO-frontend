import React from "react";

export function SalaryStructureModal(props) {
  return (
    <div
      className="modal fade"
      id="SalaryStructure"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="example-Modal3">
              {props.modalMode === "edit"
                ? "Edit Salary Structure"
                : "Create Salary Structure"}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.clearModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label for="recipient-name" className="form-control-label">
                  Salary Structure
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={props.salaryStructure}
                  name="name"
                  onChange={props.handleChange}
                />
              </div>

              <div className="form-group">
                <label for="recipient-name" className="form-control-label">
                  No of Level
                </label>
                <select
                  type="text"
                  className="form-control"
                  value={props.level}
                  name="level"
                  required
                  onChange={props.handleChange}
                >
                  <option value="" disabled selected>
                    Select
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={props.clearModal}
            >
              Close
            </button>
            {/* {
              props.modalMode === 'create' ?
                <button type="button" className="btn btn-primary" onClick={props.handleCreate}>Create</button> :
                <button type="button" className="btn btn-primary" onClick={props.handleUpdate}>Update</button>
            } */}
            {props.modalMode === "create" ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={props.handleSubmit}
              >
                Create
              </button>
            ) : (
              ""
            )}

            {props.modalMode === "edit" ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={props.editSalaryStructure}
              >
                Save
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
