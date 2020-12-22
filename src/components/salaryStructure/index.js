import React, { Component } from "react";
import "./index.css";
import { Collapse } from "react-collapse";
import { SalaryStructureModal } from "../Modals/salaryStructure";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { datepicker } from "bootstrap";
import Goback from "../Payrol/goBack/index";
import {
  httpPost,
  httpGet,
  httpDelete,
  httpPatch,
} from "../../actions/data.action";
import Layout from "../layout/index";
import { hideLoader, showLoader } from "../../helpers/loader";
import { Link } from "react-router-dom";
import DeletModal from "../Modals/deleteModal";
import $ from "jquery";

export default class index extends Component {
  constructor(props) {
    super(props);
    const { togge1, togge2, togge3 } = this.props;

    this.state = {
      toggle: "",

      hideActions: false,
      name: "",
      level: null,
      showDrop: false,
      toggleAction: "",
      salaryData: [],
      modalDeleteID: null,
      modalEditID: null,
      modalType: "create",
      ch: false,
    };
  }
  toggle = (id) => {
    console.log("toggle", id);
    this.setState({ toggle: id, hideActions: false });
    if (parseInt(this.state.toggle) === id) {
      this.setState({
        showDrop: !this.state.showDrop,
      });
    } else {
      this.setState({
        showDrop: !this.state.showDrop,
      });
    }
  };

  resetSmallModal = () => {};

  hideActions = (hideBar) => {
    this.setState({ toggleAction: hideBar });
    if (this.state.toggleAction === hideBar) {
      this.setState({
        hideActions: !this.state.hideActions,
      });
    } else {
      this.setState({
        hideActions: !this.state.hideActions,
        toggle: false,
      });
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    if (this.state.name === "") {
      NotificationManager.error("Title field can't be empty", "Oops!", 3000);
    }
    if (!this.state.level) {
      NotificationManager.error("Level can't be empty", "Oops!", 3000);
    }

    const data = {
      name: this.state.name,
      level: parseInt(this.state.level),
    };

    try {
      showLoader();
      const res = await httpPost(`create_salary_structure`, data);

      if (res.code === 201) {
        this.clearModal();
        $(".modal").modal("hide");
        $(document.body).removeClass("modal-open");
        $(".modal-backdrop").remove();
        hideLoader();
        NotificationManager.success("Created Successfully", "Success!", 5000);
        this.getSalaryStructure();
      }
    } catch (error) {
      hideLoader();
      return NotificationManager.error(
        `Opps ${this.state.name} already exist`,
        "Oops!",
        3000
      );
    }
  };

  clearModal = () => {
    this.setState({ name: "", level: null });
  };

  componentDidMount() {
    this.getSalaryStructure();
    console.log(this.state.salaryData);
  }
  getSalaryStructure = async () => {
    try {
      showLoader();
      const res = await httpGet(`salary_structure`);
      if (res.code === 200) {
        this.setState({ salaryData: res.data.salaryStructures });
      }
      hideLoader();

      console.log(this.state.salaryData);
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  };

  GetAlertId = async (id) => {
    this.setState({
      modalDeleteID: id,
      hideActions: !this.state.hideActions,
    });
  };

  handleDelete = async () => {
    showLoader();
    try {
      const data = await httpDelete(
        `salary_structure/${this.state.modalDeleteID}`
      );
      console.log(data);
      if (data.code === 200) {
        hideLoader();

        this.setState({
          salaryData: this.state.salaryData.filter(
            (datas) => datas.id !== this.state.modalDeleteID
          ),
        });
        hideLoader();
        // this.getSalaryStructure()
      }
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  };

  getAsalaryStructure = async (id) => {
    this.setState({
      hideActions: !this.state.hideActions,
    });
    try {
      showLoader();
      const res = await httpGet(`salary_structure/${id}`);
      if (res.code === 200) {
        this.setState({
          name: res.data.salaryStructure.name,
          modalEditID: res.data.salaryStructure.id,
          modalType: "edit",
        });
        hideLoader();
      }
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  };

  editSalaryStructure = async () => {
    const SalaryStructure = { name: this.state.name };
    if (this.state.name === "") {
      NotificationManager.error(
        "Opps Salary Structure Filed Can't Be Empty",
        "Oops!",
        3000
      );
    } else {
      try {
        showLoader();
        const res = await httpPatch(
          `update_salary_structure/${this.state.modalEditID}`,
          SalaryStructure
        );

        if (res.code === 200) {
          this.setState({ name: "" });
          hideLoader();
          NotificationManager.success(
            "A Salary Structure item has successfully been Updated",
            "Success!",
            5000
          );
          $(".modal").modal("hide");
          $(document.body).removeClass("modal-open");
          $(".modal-backdrop").remove();
          this.getSalaryStructure();
        }
      } catch (error) {
        hideLoader();
        console.log(error);
      }
    }
  };

  render() {
    return (
      <Layout page="salaryStructure">
        <div className="app-content">
          <section className="section">
            <Goback goback={this.props.history.goBack} />
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#" className="text-muted">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#" className="text-muted">
                  Salary Structure
                </a>
              </li>
            </ol>
            <div
              style={{ marginBottom: "-26px" }}
              class="checkBoxW salaryStructure"
            >
              <button
                type="button"
                className="payrolBtn "
                data-toggle="modal"
                data-target="#SalaryStructure"
                onClick={() => {
                  this.setState({ modalType: "create" });
                }}
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
                Add Salary Structure
              </button>
            </div>
            <div className="DropDownWrap56">
              <div>
                {this.state.salaryData.map((data) => {
                  console.log(this.state.salaryStructure);
                  return (
                    <div>
                      <div className="dropDownColum ">
                        <div className="dropHeader">
                          {" "}
                          <div
                            onClick={() => this.toggle(data.id)}
                            className="dropHead"
                          >
                            <span
                              className={`${
                                this.state.showDrop === true &&
                                parseInt(this.state.toggle) === data.id
                                  ? "fa fa-chevron-up"
                                  : "fa fa-chevron-down"
                              }`}
                            ></span>{" "}
                            <h1 key={data.id}>{data.name}</h1>
                          </div>
                          <div className="verticalDots">
                            <i
                              onClick={(e) => this.hideActions(`${data.id}`)}
                              className="fa fa-ellipsis-v"
                              aria-hidden="true"
                            ></i>
                            {this.state.hideActions === true &&
                            parseInt(this.state.toggleAction) === data.id ? (
                              <div className="actionsSS">
                                <span>
                                  <Link
                                    className="actionView"
                                    to={`/salary_structure_items/${data.id}`}
                                  >
                                    View
                                  </Link>
                                </span>
                                <span
                                  type="button"
                                  className="payrolBtn "
                                  data-toggle="modal"
                                  data-target="#SalaryStructure"
                                  className="actionEdit"
                                  onClick={(e) => {
                                    this.getAsalaryStructure(data.id);
                                  }}
                                >
                                  Edit
                                </span>
                                <span
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#ComfirmModalDelete"
                                  onClick={(e) => {
                                    this.GetAlertId(data.id);
                                  }}
                                  className="actiondelet"
                                >
                                  Delete
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        {data.salaryStructureItem.length === 0 ? (
                          <div>
                            {this.state.toggle === data.id &&
                            this.state.showDrop === true ? (
                              <Link to={`/salary_structure_items/${data.id}`}>
                                <p className="noSalaryStruture">
                                  Click to add a payroll item
                                </p>
                              </Link>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          <div>
                            {this.state.toggle === data.id &&
                            this.state.showDrop === true ? (
                              <div className="">
                                {data.salaryStructureItem.map((data) => {
                                  return (
                                    <div className="showpayrolldata">
                                      <div>{data.payrollItem.name}</div>

                                      <div>{data.amount}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DROPDOWN WRAP END */}
            </div>

            <br />
          </section>
        </div>
        <SalaryStructureModal
          salaryStructure={this.state.name}
          level={this.state.level}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          clearModal={this.clearModal}
          modalMode={this.state.modalType}
          editSalaryStructure={this.editSalaryStructure}
        />
        <DeletModal handleDelete={this.handleDelete} />
      </Layout>
    );
  }
}
