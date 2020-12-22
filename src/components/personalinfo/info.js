import React, { Component } from "react";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import { modal } from "bootstrap";
import Layout from "../layout/index";
import "./personInfo.css";
import UserLogo from "./Img/userLogo.jpg";
import EducationQ from "./educationQulification";
import EmploymentHistory from "./employmentHistory";
import Garantor from "./gurantor";

import {
  httpPost,
  httpGet,
  httpDelete,
  httpPatch,
} from "../../actions/data.action";
import { hideLoader, showLoader } from "../../helpers/loader";
// import "./branchStyle/responsibilities.css";

export default class info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      educationHistory: null,
      employmentHistory: null,
      institution: [],
      guarantorInfo: [],
      employmentInfo: {},
      avatar: null,
      identification: "",
      alert: null,
    };
  }

  async componentDidMount() {
    showLoader();
    // await this.getDetails()
    const { id } = this.props.match.params;

    const res = await httpGet(`auth/staff_details/${id}`);

    this.setState({
      user: res.data.user,
      qualification: res.data.qualification,
      certification: res.data.certification,
      employmentInfo: res.data.employmentInfo,
      employmentHistory: res.data.employmentHistory,
      guarantorInfo: res.data.guarantorInfo,
      institution: [...res.data.qualification, ...res.data.certification],
      //   avatar,
      //   identification,
    });
    hideLoader();
  }

  getDetails = async () => {
    try {
      const { id } = this.props.match.params;

      const res = await httpGet(`auth/staff_details/${id}`);
      console.log("this is the response", res.data.user);

      if (res.code === 200) {
        console.log("*******", res.data.user);

        const avatarObj = [...res.data.user.uploads].filter(
          (item) => item.fileName === "Passport Photograph"
        )[0];
        const avatar = avatarObj !== undefined ? avatarObj.path : null;

        const identificationObj = [...res.data.user.uploads].filter(
          (item) => item.fileName === "Identification"
        )[0];
        const identification =
          identificationObj !== undefined ? identificationObj.path : null;

        hideLoader();
      }
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  };

  handleStatus = async (e, value) => {
    try {
      showLoader();
      const { id } = this.props.match.params;

      const data = {
        status: "rejected",
      };

      const res = await httpPatch(`auth/staff_application_status/${id}`, data);

      if (res.code === 200) {
        hideLoader();
        const getAlert = () => (
          <SweetAlert
            success
            title="Application Status"
            onConfirm={() => {
              this.hideAlert();
            }}
          >
            Rejected
          </SweetAlert>
        );

        this.setState({
          alert: getAlert(),
        });
        // this.getDetails();
      }
    } catch (error) {
      hideLoader();
      console.log(error);
    }
  };

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  getFiles = (list, type) => {
    const newList = list !== undefined ? list : [];
    if (type === "Passport Photograph") {
      const mainList = newList.filter((item) => item.fileName === type)[0];
      let avatar = mainList !== undefined ? mainList.path : null;
      return avatar;
    } else if (type === "identification") {
      const mainList = newList.filter((item) => item.fileName === type)[0];
      let identification = mainList !== undefined ? mainList.path : null;
      return identification;
    }
    // return newList.length ? newList.map(item => {
    // 	if(item.fileName === type){
    // 		return item.path
    // 	}
    // }) : null
  };

  render() {
    const {
      user,
      institution,
      employmentInfo,
      employmentHistory,
      educationHistory,
      guarantorInfo,
    } = this.state;
    const newEducationHistory =
      educationHistory !== null ? educationHistory : [];
    const newEmploymentHistory =
      employmentHistory !== null ? employmentHistory : [];

    return (
      <Layout>
        {this.state.alert}
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
                View Staff
              </li>
            </ol>

            <div className="row">
              <div className="col-md-10 col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row col-12">
                      <h4 className="col col-md-6">
                        <Link
                          to={`/create_staff/one/${this.props.match.params.id}`}
                          style={
                            this.state.user.onBoarding < 4
                              ? { display: "none" }
                              : { textDecorationLine: "underline" }
                          }
                        >
                          Edit
                        </Link>
                      </h4>
                      <div className="col col-md-6 text-right pr-0">
                        <h4 className="">
                          APPLICATION STATUS:{" "}
                          <span className="text-warning">
                            {user.applicationStatus === "pending"
                              ? "Pending"
                              : user.applicationStatus === "approved"
                              ? "Approved"
                              : "Rejected"}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="appheaderr5">
                      <h1>PERSONAL INFORMATION</h1>
                    </div>
                    <div className="personalInfo">
                      <div className="infoGrid1">
                        <img
                          src={this.state.avatar || UserLogo}
                          alt="Profile Pic"
                        />
                        <span className="files675">Files</span>
                        <a href={this.state.identification} target="_blank">
                          <i className="fa fa-link"></i> Identification{" "}
                        </a>
                      </div>

                      <div className="infoGrid2">
                        <div className="userDetails">
                          <span>Full Name</span>
                          <span>
                            {" "}
                            {user.firstName +
                              " " +
                              (user.middleName || "") +
                              " " +
                              user.lastName}
                          </span>
                        </div>

                        <div className="userDetails">
                          <span>Date Of Birth</span>
                          <span>
                            {<Moment format="MMM D,  YYYY">{user.dob}</Moment>}{" "}
                          </span>
                        </div>

                        <div className="userDetails">
                          <span>Marital Status</span>
                          <span> {user.maritalStatus || ""}</span>
                        </div>

                        <div className="userDetails">
                          <span>Address</span>
                          <span>
                            {user.currentAddress}
                            <span
                              style={
                                !user.currentCity &&
                                !user.currentLga &&
                                !user.currentState &&
                                !user.currentCountry
                                  ? { display: "none" }
                                  : {}
                              }
                            >
                              (
                              <span
                                style={
                                  !user.currentCity ? { display: "none" } : {}
                                }
                              >
                                {user.currentCity},{" "}
                              </span>
                              <span
                                style={
                                  !user.currentLga ? { display: "none" } : {}
                                }
                              >
                                {user.currentLga},{" "}
                              </span>
                              <span
                                style={
                                  !user.currentState ? { display: "none" } : {}
                                }
                              >
                                {user.currentState},{" "}
                              </span>
                              <span
                                style={
                                  !user.currentCountry
                                    ? { display: "none" }
                                    : {}
                                }
                              >
                                {user.currentCountry}
                              </span>
                              )
                            </span>
                          </span>
                        </div>

                        <div className="userDetails">
                          <span>Email</span>
                          <span>{user.email || ""}</span>
                        </div>

                        <div className="userDetails">
                          <span>State of Origin</span>
                          <span>{user.stateOfOrigin}</span>
                        </div>
                      </div>

                      <div className="infoGrid3">
                        <div className="userDetails">
                          <span>Bvn</span>
                          <span>{user.bvn}</span>
                        </div>

                        <div className="userDetails">
                          <span>Bank Name</span>
                          <span>{user.bankName}</span>
                        </div>

                        <div className="userDetails">
                          <span>Account Number</span>
                          <span>{user.accountNumber} State</span>
                        </div>

                        <div className="userDetails">
                          <span>Gender</span>
                          <span> {user.gender || ""} </span>
                        </div>

                        <div className="userDetails">
                          <span>Nationality</span>
                          <span> {user.nationality || ""}</span>
                        </div>

                        <div className="userDetails">
                          <span>Phone Numbers</span>
                          <span>
                            <span></span>
                            <div style={{ display: "block" }}>
                              {user.mobilePhoneCode + user.mobilePhone}
                            </div>
                            <div
                              style={!user.homePhone ? { display: "none" } : {}}
                            >
                              {user.homePhoneCode + user.homePhone}
                            </div>
                            <span></span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <EducationQ institution={institution} />
                    <EmploymentHistory
                      newEmploymentHistory={newEmploymentHistory}
                    />

                    <section className="appheaderr5 reduceMargin">
                      <h1>Employment Information</h1>
                    </section>
                    <div className="row">
                      <div className="col-md-6 col-sm-6">
                        <p className="row">
                          <span className="col-md-5 font-bold">
                            Rank at employment:
                          </span>{" "}
                          <span className="col-md-7">
                            {!employmentInfo ? "" : employmentInfo.rank}
                          </span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">
                            Unit at Employment:
                          </span>{" "}
                          <span className="col-md-7">
                            {!employmentInfo
                              ? ""
                              : !employmentInfo.unit
                              ? ""
                              : employmentInfo.unit.name}
                          </span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">
                            Salary Amount:
                          </span>{" "}
                          <span className="col-md-7">
                            {
                              <NumberFormat
                                value={
                                  !employmentInfo
                                    ? ""
                                    : employmentInfo.salaryAmount
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            }
                          </span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">
                            Employee Number:
                          </span>{" "}
                          <span className="col-md-7">
                            {!employmentInfo
                              ? ""
                              : employmentInfo.employeeNumber}
                          </span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">
                            No of dependants:
                          </span>{" "}
                          <span className="col-md-7">{user.noOfDependant}</span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">Religion:</span>{" "}
                          <span className="col-md-7">{user.religion}</span>
                        </p>
                        {/* <p className="row">
								<span className="col-md-5 font-bold">Region:</span> <span className="col-md-7">{!employmentInfo ? '' : employmentInfo.region ? employmentInfo.region.name : ''}</span></p> */}
                      </div>
                      <div className="col-md-6 col-sm-6 pl-md-0">
                        {/* <p className="row">
								<span className="col-md-5 font-bold">Area:</span> <span className="col-md-7">{!employmentInfo ? '' : employmentInfo.area ? employmentInfo.area.name : ''}</span></p> */}
                        <p className="row">
                          <span className="col-md-5 font-bold">
                            Date of resumption:
                          </span>{" "}
                          <span className="col-md-7">
                            {
                              <Moment
                                format="MMM D YYYY"
                                value={
                                  !employmentInfo
                                    ? ""
                                    : employmentInfo.dateOfResumption
                                }
                              />
                            }
                          </span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">
                            Branch at employment:
                          </span>{" "}
                          <span className="col-md-7">
                            {!employmentInfo
                              ? ""
                              : employmentInfo.branch !== undefined
                              ? employmentInfo.branch.name
                              : ""}
                          </span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">Job title:</span>{" "}
                          <span className="col-md-7">
                            {!employmentInfo
                              ? ""
                              : employmentInfo.role !== undefined
                              ? employmentInfo.role.title
                              : ""}
                          </span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">Skills:</span>{" "}
                          <span className="col-md-7">{user.skills}</span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">
                            Seek Reference:
                          </span>{" "}
                          <span className="col-md-7">
                            {!user.objectReference ? "No" : "YES"}
                          </span>
                        </p>
                        <p className="row">
                          <span className="col-md-5 font-bold">
                            Reason for leaving last employment:
                          </span>{" "}
                          <span className="col-md-7">
                            {user.reasonForLeaving}
                          </span>
                        </p>
                      </div>
                    </div>

                    <Garantor guarantorInfo={guarantorInfo} />

                    <div
                      className="row mt-3 text-right"
                      style={
                        this.state.user.onBoarding !== 3
                          ? { display: "none" }
                          : {}
                      }
                    >
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-info mr-5"
                          onClick={(e) => this.handleStatus(e, "rejected")}
                          disabled={
                            this.state.user.onBoarding !== 3 ? true : ""
                          }
                        >
                          <span className="fa fa-ban"></span> DECLINE
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={
                            this.state.user.onBoarding !== 3 ? true : ""
                          }
                          onClick={(e) =>
                            this.props.history.push(
                              `/create_staff/four/${this.props.match.params.id}`
                            )
                          }
                        >
                          <span className="fa fa-check-square-o"></span> APPROVE
                        </button>
                      </div>
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
