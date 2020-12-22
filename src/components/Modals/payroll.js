import React from "react";
import Select from "react-select";

export function PayRollModal(props) {
  console.log(props);
  return (
    <div
      className="modal fade"
      id="addPayroll"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="example-Modal3">
              Applicable To
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
            <form>
              <div className="form-group row">
                <label for="inputName" className="col-md-2 pr-0 col-form-label">
                  Type{" "}
                </label>
                <div className="col-md-4">
                  <Select
                    name="applicableTo"
                    placeholder="Select"
                    value={props.customDepartmentId}
                    // options={props.getDepartments()}
                    options={[
                      { value: "departmentId", label: "Department" },
                      { value: "unitId", label: "Unit" },
                      { value: "jobTitle", label: "Job Title" },
                      { value: "regionId", label: "Region" },
                      { value: "areaId", label: "Area" },
                      { value: "branchId", label: "Branch" },
                    ]}
                    onChange={(e) => props.handleChange(e, "applicableTo")}
                  />
                </div>
                <label for="inputName" className="col-md-2 col-form-label">
                  Value{" "}
                </label>
                <div className="col-md-4">
                  {console.log(props.valueOptions)}
                  <Select
                    name="value"
                    placeholder="Select"
                    value={props.customValue}
                    options={props.valueOptions}
                    onChange={(e) => props.handleChange(e, "value")}
                  />
                </div>
              </div>
              {/* <div className="form-group row">
						<label for="inputName" className="col-md-2 col-form-label">Units </label>
						<div className="col-md-4">
							<Select
								name="unitId"
								placeholder="Select"
								value={props.customUnitId}
								options={props.unitOptions}
								onChange={(e) => props.handleChange(e, 'unitId')}
							/>
						</div>
						<label for="inputName" className="col-md-2 col-form-label">Area <span className="impt">*</span></label>
						<div className="col-md-4">
							<Select
								name="areaId"
								placeholder="Select"
								value={props.customAreaId}
								options={props.areaOptions}
								onChange={(e) => props.handleChange(e, 'areaId')}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label for="inputName" className="col-md-2 col-form-label">Job Title </label>
						<div className="col-md-4">
							<Select
								name="jobTitle"
								placeholder="Select"
								value={props.customJobTitle}
								options={props.getRoles()}
								onChange={(e) => props.handleChange(e, 'jobTitle')}
							/>
						</div>
						<label for="inputName" className="col-md-2 col-form-label">Branch </label>
							<div className="col-md-4">
							<Select
								name="branchId"
								placeholder="Select"
								value={props.customBranchId}
								options={props.getBranches()}
								onChange={(e) => props.handleChange(e, 'branchId')}
							/>
						</div>
					</div> */}
            </form>
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
              data-dismiss="modal"
              onClick={props.addSelection}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
