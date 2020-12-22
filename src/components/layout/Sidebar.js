import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar(props) {
  const [userRole, setUserRole] = useState("");
  // console.log("this is the logged in user", userRole);
  useEffect(() => {
    window.$(".app-sidebar").mCustomScrollbar({
      theme: "minimal",
      autoHideScrollbar: true,
      scrollbarPosition: "outside",
    });
    setUserRole(props.props.user.role);
  }, []);

  return (
    <aside className="app-sidebar mCustomScrollbar _mCS_1 mCS-autoHide">
      {/* <div className="app-sidebar__user"> 
          <div className="dropdown">
          <a className="nav-link pl-2 pr-2 leading-none d-flex" data-toggle="dropdown" href="#">
            <img alt="image" src="/assets/img/avatar/avatar-1.jpg" className=" avatar-md rounded-circle" />
            <span className="ml-2 d-lg-block">
              <span className=" app-sidebar__user-name mt-5">Jessica Lee</span><br />
              <span className="text-muted app-sidebar__user-name text-sm"> Web-Designer</span>
            </span>
          </a>
        </div>
      </div> */}
      <ul className="side-menu">
        <li className={props.props.page === "dashboard" ? "active" : ""}>
          <Link
            className={
              props.props.page === "dashboard"
                ? "side-menu__item active"
                : "side-menu__item"
            }
            to="#"
          >
            <strong className="side-menu__label">
              <i className="side-menu__icon fa fa-desktop"></i>
              Dashboard
            </strong>
          </Link>
        </li>
        {/* {this.state.props.props.user} */}
        <li className={props.props.page === "poll" ? "active" : ""}>
          <Link
            className={
              props.props.page === "poll"
                ? "side-menu__item active"
                : "side-menu__item"
            }
            to="/poll"
          >
            <i className="side-menu__icon fa fa-clipboard"></i>
            <span className="side-menu__label">Opinion Poll</span>
          </Link>
        </li>

        <li
          className={
            props.props.page === "branch" ||
            props.props.page === "departments" ||
            props.props.page === "units" ||
            props.props.page === "roles" ||
            props.props.page === "responsibility" ||
            props.props.page === "kpi" ||
            props.props.page === "staff"
              ? "slide is-expanded"
              : "slide"
          }
        >
          <a
            className={
              props.props.page === "branch" ||
              props.props.page === "departments" ||
              props.props.page === "units" ||
              props.props.page === "roles" ||
              props.props.page === "responsibility" ||
              props.props.page === "kpi" ||
              props.props.page === "staff"
                ? "side-menu__item active"
                : "side-menu__item"
            }
            data-toggle="slide"
            href="#"
          >
            <i className="side-menu__icon fa fa-tasks"></i>
            <span className="side-menu__label">Company MGT</span>
            <i className="angle fa fa-angle-right"></i>
          </a>
          <ul className="slide-menu">
            <li className={props.props.page === "branch" ? "active" : ""}>
              <Link
                className={
                  props.props.page === "branch"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/branches"
              >
                <span>Offices</span>
              </Link>
            </li>
            <li className={props.props.page === "departments" ? "active" : ""}>
              <Link
                className={
                  props.props.page === "departments"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/departments"
              >
                <span>Departments</span>
              </Link>
            </li>
            <li className={props.props.page === "units" ? "active" : ""}>
              <Link
                className={
                  props.props.page === "units"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/units"
              >
                <span>Units</span>
              </Link>
            </li>

            <li className={props.props.page === "roles" ? "active" : ""}>
              <Link
                className={
                  props.props.page === "roles"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/roles"
              >
                <span>Roles</span>
              </Link>
            </li>
            {/* <li className={props.props.page === 'responsibility' ? "active" : ""}>
              <Link className={props.props.page === 'responsibility' ? "slide-item active" : "slide-item"} to="/responsibility">
                <span>Responsibility</span>
              </Link>
            </li>
            <li className={props.props.page === 'appraisal' ? "active" : ""}>
              <Link className={props.props.page === 'appraisal' ? "slide-item active" : "slide-item"} to="/appraisal">
                <span>Appraisal</span>
              </Link>
            </li> */}
            <li
              className={props.props.page === "kpi" ? "slide active" : "slide"}
            >
              <Link
                className="side-menu__item second-side-menu__item"
                data-toggle="second-slide"
                to="/kpi"
              >
                <span
                  className="side-menu__label"
                  style={{ paddingLeft: "25px", fontSize: "12px" }}
                >
                  Kpi Settings
                </span>
                <i className="angle fa fa-angle-right"></i>
              </Link>
              <ul className="second-slide-menu">
                <li className="active">
                  <Link to="/kpi" className="slide-item active">
                    Manage Kpi
                  </Link>
                </li>
                <li>
                  <Link to="/assign_kpi" className="slide-item">
                    Assign Kpi
                  </Link>
                </li>
                <li>
                  <Link to="/manage_labels" className="slide-item">
                    Manage Performance Label
                  </Link>
                </li>
                <li>
                  <Link to="/appraisal" className="slide-item">
                    Appraisal
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={
                props.props.page === "staff" ? "slide active" : "slide"
              }
            >
              <a
                className="side-menu__item second-side-menu__item"
                data-toggle="second-slide"
                href="#"
              >
                <span
                  className="side-menu__label"
                  style={{ paddingLeft: "25px", fontSize: "12px" }}
                >
                  Staff
                </span>
                <i className="angle fa fa-angle-right"></i>
              </a>
              <ul className="second-slide-menu">
                <li className="active">
                  <Link to="/create_staff" className="slide-item active">
                    Create Staff
                  </Link>
                </li>
                {/* <li><Link className="slide-item">Personal Information</Link></li> */}
                <li>
                  <Link to="/pending_list" className="slide-item">
                    Pending List
                  </Link>
                </li>
                <li>
                  <Link to="/staff_list" className="slide-item">
                    Staff List
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li
          className={
            props.props.page === "payroll" ||
            props.props.page === "salaryStructure" ||
            props.props.page === "payrollSetup" ||
            props.props.page === "viewPending"
              ? "slide is-expanded"
              : "slide"
          }
        >
          <a
            className={
              props.props.page === "payroll" ||
              props.props.page === "salaryStructure"
                ? "side-menu__item active"
                : "side-menu__item"
            }
            data-toggle="slide"
            href="#"
          >
            <i className="side-menu__icon fa fa-credit-card"></i>
            <span className="side-menu__label">Payroll Settings</span>
            <i className="angle fa fa-angle-right"></i>
          </a>
          <ul className="slide-menu">
            <li className={props.props.page === "payroll" ? "active" : ""}>
              <Link
                className={
                  props.props.page === "payroll"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/payroll"
              >
                <span>Setup Payroll Items</span>
              </Link>
            </li>
            <li
              className={props.props.page === "salaryStructure" ? "active" : ""}
            >
              <Link
                className={
                  props.props.page === "salaryStructure"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/salary-structure"
              >
                <span>Salary Structures</span>
              </Link>
            </li>
            <li className={props.props.page === "payrollSetup" ? "active" : ""}>
              <Link
                className={
                  props.props.page === "payrollSetup"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/setup-payroll"
              >
                <span>Process Payroll</span>
              </Link>
            </li>
            <li
              className={props.props.page === "viewPending" ? "active" : ""}
              style={
                props.props.user.role !== "ed" &&
                props.props.user.role !== "audits"
                  ? { display: "none" }
                  : {}
              }
            >
              {/* {console.log(props.props.user)} */}
              <Link
                className={
                  props.props.page === "viewPending"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/audit_summary"
              >
                <span>View Pending Payroll</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <li>
          <a className="side-menu__item" href="#"><i className="side-menu__icon fa fa-hand-o-left"></i><span className="side-menu__label">Leave</span></a>
        </li> */}
        <li
          className={
            props.props.page === "leave_setup" ||
            props.props.page === "leave_management" ||
            props.props.page === "leave_history"
              ? "slide is-expanded"
              : "slide"
          }
        >
          <a
            className={
              props.props.page === "leave_setup" ||
              props.props.page === "leave_management" ||
              props.props.page === "leave_history"
                ? "side-menu__item active"
                : "side-menu__item"
            }
            data-toggle="slide"
            href="#"
          >
            <i className="side-menu__icon fa fa-tasks"></i>
            <span className="side-menu__label">Leave</span>
            <i className="angle fa fa-angle-right"></i>
          </a>
          <ul className="slide-menu">
            <li className={props.props.page === "leave_setup" ? "active" : ""}>
              <Link
                className={
                  props.props.page === "leave_setup"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/leave_setup"
              >
                <span>Leave Setup</span>
              </Link>
            </li>
            <li
              className={
                props.props.page === "leave_management" ? "active" : ""
              }
            >
              <Link
                className={
                  props.props.page === "leave_management"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/leave_management"
              >
                <span>Manage Application</span>
              </Link>
            </li>
            <li
              className={props.props.page === "leave_history" ? "active" : ""}
            >
              <Link
                className={
                  props.props.page === "leave_history"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/leave_history"
              >
                <span>Leave History</span>
              </Link>
            </li>
            <li className={props.props.page === "calender" ? "active" : ""}>
              <Link
                className={
                  props.props.page === "calender"
                    ? "slide-item active"
                    : "slide-item"
                }
                to="/holidays"
              >
                <span>Holidays</span>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link className="side-menu__item" to="/user_role">
            <i className="side-menu__icon fa fa-user"></i>
            <span className="side-menu__label">Users Role</span>
          </Link>
        </li>

        <li>
          <Link className="side-menu__item" to="/user_leave">
            <i className="side-menu__icon fa fa-user"></i>
            <span className="side-menu__label">Users Leave</span>
          </Link>
        </li>

        {/* <li>
            <a className="side-menu__item" href="#"><i className="side-menu__icon fa fa-money"></i><span className="side-menu__label">Budget</span></a>
          </li>
          <li>
            <a className="side-menu__item" href="#"><i className="side-menu__icon fa fa-exchange"></i><span className="side-menu__label">Transfer</span></a>
          </li>
          <li>
            <a className="side-menu__item" href="#"><i className="side-menu__icon fa fa-user"></i><span className="side-menu__label">Profile</span></a>
          </li> */}
        <li>
          <Link className="side-menu__item" to="/logout">
            <i className="side-menu__icon fa fa-sign-out"></i>
            <span className="side-menu__label">Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
