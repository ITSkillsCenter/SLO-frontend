import React, { Component } from "react";
// import $ from "jquery";
// import { NotificationManager } from "react-notifications";
// import axios from "axios";
// import { modal } from "bootstrap";
import { Link } from "react-router-dom";
import Layout from "../layout/index";
import Goback from "./goBack/index";
import {
  httpPost,
  httpGet,
  httpDelete,
  httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";

import PayrollTable from "./payrollTable";
import "./payroll.css";

export default class payroll extends Component {
  constructor(props) {
    super(props);
    this.state = { payrollItems: [] };
  }

  componentDidMount = async () => {
    showLoader();
    await this.getPayroll();
    hideLoader();
  };

  deletePayroll = async (id) => {
    showLoader();
    try {
      const data = await httpDelete(`payroll_item/${id}`);
      console.log(data);
      if (data.code === 200) {
        hideLoader();

        this.setState({
          payrollItems: this.state.payrollItems.filter(
            (payroll) => payroll.id !== id
          ),
        });
        hideLoader();
      }
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  };

  getPayroll = async () => {
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

  editPayroll = async () => {
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

  render() {
    return (
      <Layout page="payroll">
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
                  Payroll
                </a>
              </li>
            </ol>
            <div className="section-body">
              <div className="row">
                <div className="col-md-7">
                  <div className="card" style={{ width: "fit-content" }}>
                    <div className="card-header custom-header">
                      <div className="col col-md-12">
                        <Link to="/payroll-form">
                          <button type="button" className="payrolBtn ">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            Add Payroll Item
                          </button>
                        </Link>
                      </div>
                    </div>

                    <div className="card-body">
                      <PayrollTable
                        payrollDetails={this.state.payrollItems}
                        deletePayroll={this.deletePayroll}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}
