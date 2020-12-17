import React, { Component } from "react";
import $ from "jquery";
import { NotificationManager } from "react-notifications";
import Layout from "../../layout/index";
import StaffTable from "./table";
import {
  httpPost,
  httpGet,
  httpDelete,
  httpPatch,
} from "../../../actions/data.action";
import { hideLoader, showLoader } from "../../../helpers/loader";
import CreateStaffModal from "../../Modals/CreateStaff";
import { countryCodes } from "../../../helpers/dailCodes";
import { validateD } from "../../../helpers/validations";

export default class CreateStaff extends Component {
  constructor() {
    super();
    this.state = {
      staffs: [],
      staff: {},
      modalMode: "create",
      currentEditId: null,
      errorMessage1: null,
      customMobile: null,
      mobilePhoneCodeError: null,
    };
  }

  componentDidMount() {
    this.getStaffs();
  }

  getStaffs = async () => {
    try {
      showLoader();
      const res = await httpGet("auth/temporary_staffs");

      if (res.code === 200) {
        this.setState({ staffs: res.data.users });
        hideLoader();
      }
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  };

  handleChange = async (e, name) => {
    const { staff } = this.state;
    if (name === "mobilePhoneCode") {
      staff[name] = e.value;
      this.setState({
        staff,
        customMobile: e,
        mobilePhoneCodeError: null,
      });
    } else {
      staff[e.target.name] = e.target.value;
      this.setState({ staff, errorMessage1: null });

      const isValidate = validateD("mobilePhone", e.target.value);
      if (!isValidate.error) {
        this.setState({
          errorMessage1: isValidate.errorMessage,
        });
        return;
      } else {
        this.setState({ errorMessage1: null });
      }
    }
  };

  handleEdit = async (id) => {
    const res = await httpGet(`unit/${id}`);
    if (res.code === 200) {
      const customSelect1 = {
        value: res.data.unit.departmentId,
        label: res.data.unit.department.name,
      };
      this.setState({
        unit: res.data.unit,
        currentEditId: id,
        modalMode: "edit",
        customSelect1,
      });
    }
  };

  handleDelete = async (id) => {
    showLoader();
    const res = await httpDelete(`auth/delete_staff/${id}`);
    if (res.code === 200) {
      this.getStaffs();
      hideLoader();
    }
  };

  handleSubmit = async (btnType) => {
    showLoader();
    const {
      staff,
      currentEditId,
      modalMode,
      errorMessage1,
      mobilePhoneCodeError,
    } = this.state;

    if (staff.mobilePhoneCode === undefined || staff.mobilePhoneCode === "") {
      hideLoader();
      this.setState({ mobilePhoneCodeError: "Country code is required" });
      return;
    }

    if (staff.username === undefined || staff.username === "") {
      hideLoader();
      this.setState({ errorMessage1: "Username is required" });
      return;
    }

    if (errorMessage1 !== null || mobilePhoneCodeError !== null) {
      hideLoader();
      return NotificationManager.warning("Complete all required fields");
    }

    try {
      if (modalMode === "create") {
        const data = {
          mobilePhone: staff.mobilePhoneCode + staff.username,
        };
        console.log("this is the staff", data);
        const res = await httpPost(`auth/create_staff`, data).then((res) => {
          console.log("this is the response", res);
          this.getStaffs();

          if (res.response.code === 201) {
            $(".modal").modal("hide");
            $(document.body).removeClass("modal-open");
            $(".modal-backdrop").remove();
            hideLoader();
            NotificationManager.success("user created successfuly");
            alert(res.body);
          }
        });
      } else {
        const res = await httpPatch(`unit/update/${currentEditId}`, staff);
        if (res.code === 200) {
          $(".modal").modal("hide");
          $(document.body).removeClass("modal-open");
          $(".modal-backdrop").remove();
        }
      }
      this.getStaffs();
      this.clearState();
      hideLoader();
    } catch (error) {
      console.log(error);
      this.clearState();
    }
  };

  clearState = () => {
    this.setState({
      staff: {
        username: "",
      },
      modalMode: "create",
      currentEditId: null,
      errorMessage1: null,
      mobilePhoneCodeError: null,
      customMobile: null,
    });
  };

  closeModal = () => {
    this.clearState();
  };

  render() {
    const {
      errorMessage1,
      modalMode,
      mobilePhoneCodeError,
      staff,
    } = this.state;

    return (
      <Layout page="createStaff">
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
                  Staff
                </a>
              </li>
              <li className="breadcrumb-item active text-" aria-current="page">
                New Staff
              </li>
            </ol>
            <div className="section-body">
              <div className="row">
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-header custom-header">
                      <div className="col col-md-12">
                        <button
                          type="button"
                          className="btn "
                          data-toggle="modal"
                          data-target="#createStaffModal"
                        >
                          CREATE NEW
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <StaffTable
                        staffs={this.state.staffs}
                        handleEdit={this.handleEdit}
                        modalMode={modalMode}
                        handleDelete={this.handleDelete}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <CreateStaffModal
          staff={staff}
          customMobile={this.state.customMobile}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          closeModal={this.closeModal}
          modalMode={modalMode}
          errorMessage1={errorMessage1}
          mobilePhoneCodeError={mobilePhoneCodeError}
          countryCodes={countryCodes}
        />
      </Layout>
    );
  }
}
