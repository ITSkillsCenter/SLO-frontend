import React from "react";
import Select from "react-select";
const ResponsibilityModal = (props) => {
	return (
		<div
			className="modal fade"
			id="roleModal"
			tabIndex="-1"
			role="dialog"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="example-Modal3">
							{props.modalMode === "create"
								? "CREATE NEW RESPONSIBILITY"
								: "EDIT RESPONSIBILITY"}
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
							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Responsibility Title
								</label>
								<input
									type="text"
									className="form-control"
									value={
										props.responsibility === null
											? ""
											: props.responsibility.name
									}
									name="name"
									onChange={props.handleChange}
								/>
								<span className="text-danger">
									{props.errorMessage1 !== null ? props.errorMessage1 : ""}
								</span>
							</div>

							<div className="form-group">
								<label for="recipient-name" className="form-control-label">
									Select Role
								</label>
								<Select
									className="w-100 pr-0 pl-0 col-md-12 mr-1"
									// defaultValue={props.postData.businessCountry}
									value={props.customSelect1}
									onChange={(e) => props.handleChange(e, "roleId")}
									options={props.roleOptions}
									isSearchable="true"
									name="roleId"
									placeholder="Select"
								/>
								<span className="text-danger">
									{props.errorMessage2 !== null ? props.errorMessage2 : ""}
								</span>
							</div>
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
						{/* {
              props.modalMode === 'create' ?
                <button type="button" className="btn btn-primary" onClick={props.handleCreate}>Create</button> :
                <button type="button" className="btn btn-primary" onClick={props.handleUpdate}>Update</button>
            } */}
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
};

export default ResponsibilityModal;
