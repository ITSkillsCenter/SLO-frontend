import React, { Component } from "react";
import { SalaryStructureItemModal } from "../Modals/salaryStructureItemModal";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { modal } from "bootstrap";
import { Link } from "react-router-dom";
import Layout from "../layout/index";
import GoBack from "../Payrol/goBack/index";
import {
  httpPost,
  httpGet,
  httpDelete,
  httpPatch,
} from "../../actions/data.action";
import $ from "jquery";
import { hideLoader, showLoader } from "../../helpers/loader";
import SalaryStructureItemsTable from "./salaryStructureItemsTable";
import DeleteModal from "../Modals/deleteModal";

export default class salaryStructureItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payrollItems: [],
      name: "",
      amount: null,
      salaryData: [],
      modalType: "create",
      salaryStructureItemID: null,
      salaryStructure: null,
      deleteId: null,
      salaryStructureName: "",
    };
    console.log(this.props.match.params.id);
  }
  componentDidMount() {
    this.getPayrollID();
    this.getSalaryStructure();
  }
  clearModal = () => {
    this.setState({
      name: "",
      amount: "",
      modalType: "create",
      salaryStructureItemID: null,
      salaryStructure: null,
    });
  };
  setModalType = (salaryStructureItemId, salaryStructureID) => {
    const { salaryData } = this.state;
    const find = salaryData.filter(
      (item) => item.id === salaryStructureItemId
    )[0];
    console.log(find.payrollItem.name);

    this.setState({
      modalType: "edit",
      salaryStructureItemID: salaryStructureItemId,
      salaryStructure: salaryStructureID,
      name: find.payrollItem.name,
      amount: find.amount,
    });
    console.log(salaryStructureItemId, "data2>>>>", salaryStructureID);
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  getPayrollID = async () => {
    try {
      showLoader();
      const res = await httpGet(`/payroll_items`);
      console.log(res);
      if (res.code === 200) {
        this.setState({
          payrollItems: res.data.payrollItems,
        });
        console.log(this.state.payrollItems);
        hideLoader();
      }
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  };

  handleSubmit = async () => {
    const SalaryStructure = { name: this.state.name };
    if (
      this.state.amount === "" ||
      this.state.name === "invalidData" ||
      this.state.name === null
    ) {
      NotificationManager.error(
        "Opps Salary Structure Fileds Can't Be Empty",
        "Oops!",
        4000
      );
    } else {
      try {
        showLoader();
        let data = {
          salaryStructureId: this.props.match.params.id,
          payrollItemId: this.state.name,
          amount: this.state.amount,
        };
        const res = await httpPost(`add_salary_structure`, data);
        console.log(data);
        if (res.code === 201) {
          this.setState({ name: "" });
          $(".modal").modal("hide");
          $(document.body).removeClass("modal-open");
          $(".modal-backdrop").remove();
          hideLoader();
          NotificationManager.success(
            "A Salary Structure item has successfully been created",
            "Success!",
            5000
          );
          this.getSalaryStructure();
          this.clearModal();
        }
      } catch (error) {
        hideLoader();
        console.log(error);
      }
    }
  };

  getSalaryStructure = async () => {
    try {
      showLoader();
      const resData = await httpGet(
        `salary_structure/${this.props.match.params.id}`
      );

      this.setState({
        salaryStructureName: resData.data.salaryStructure.name,
      });

      const res = await httpGet(
        `all_salary_structure_items/${this.props.match.params.id}`
      );
      if (res.code === 200) {
        this.setState({
          salaryData: res.data.salaryStructureItems,
          salaryStructureName: resData.data.salaryStructure.name,
        });
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

  editSalaryStructure = async () => {
    console.log(this.props.match.params.id);
    const SalaryStructure = { name: this.state.name };
    if (
      this.state.amount === "" ||
      this.state.name === "invalidData" ||
      this.state.name === null
    ) {
      NotificationManager.error(
        "Opps Salary Structure Fileds Can't Be Empty",
        "Oops!",
        4000
      );
    } else {
      try {
        showLoader();
        let data = {
          payrollItemId: this.state.name,
          amount: this.state.amount,
        };
        const res = await httpPatch(
          `update_salary_structure_items?id=${this.state.salaryStructureItemID}&salaryStructureId=${this.state.salaryStructure}`,
          data
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

  getDeleteId = (id) => {
    this.setState({
      deleteId: id,
    });
  };

  handleDelete = async () => {
    showLoader();
    try {
      const data = await httpDelete(
        `salary_structure_item/${this.state.deleteId}`
      );
      console.log(data);
      if (data.code === 200) {
        hideLoader();

        this.setState({
          salaryData: this.state.salaryData.filter(
            (datas) => datas.id !== this.state.deleteId
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
  render() {
    return (
      <Layout page="salaryStructure">
        <div className="app-content">
          <section className="section">
            <GoBack goback={() => this.props.history.goBack()} />
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
              <li className="breadcrumb-item">
                <a href="#" className="text-muted">
                  {this.state.salaryStructureName}
                </a>
              </li>
            </ol>

            <div className="DropDownWrap56">
              <div
                style={{
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                <h4>{this.state.salaryStructureName}</h4>
              </div>
              <div style={{ padding: "30px", marginBottom: "30px" }}>
                <div style={{ marginBottom: "22px" }} class="checkBoxW ">
                  <button
                    onClick={(e) => {
                      this.setState({ modalType: "create" });
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "#003766",
                      fontsize: "18px",
                      fontWeight: "600",
                    }}
                    type="button"
                    class=""
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i
                      style={{
                        backgroundColor: "#003766",
                        width: "22px",
                        height: "22px",
                        borderRadius: "11px",
                        color: "white",
                        lineHeight: "1.7",
                        fontsize: "15px",
                      }}
                      class="fa fa-plus"
                      aria-hidden="true"
                    ></i>{" "}
                    Add Payroll Item
                  </button>
                </div>
                <SalaryStructureItemsTable
                  setModalType={this.setModalType}
                  salaryStructureItems={this.state.salaryData}
                  getDeleteId={this.getDeleteId}
                />
              </div>
            </div>
          </section>
        </div>

        <SalaryStructureItemModal
          payrollData={this.state.payrollItems}
          handleChange={this.handleChange}
          name={this.state.name}
          amount={this.state.amount}
          handleSubmit={this.handleSubmit}
          modalMode={this.state.modalType}
          editSalaryStructure={this.editSalaryStructure}
          modalType={this.state.modalType}
          clearModal={this.clearModal}
        />
        <DeleteModal handleDelete={this.handleDelete} />
      </Layout>
    );
  }
}
