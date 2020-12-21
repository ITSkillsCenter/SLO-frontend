import React, { useState, useEffect } from "react";
import {
  httpPost,
  httpGet,
  httpDelete,
  httpPatch,
} from "../../../actions/data.action";
import { hideLoader, showLoader } from "../../../helpers/loader";
import { NotificationManager } from "react-notifications";
import "./leave.css";
import Layout from "../../layout/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HolidayTable from "./holidayTable";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const CreateLeave = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [holiday, setHoliday] = useState({});

  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const onChangeHandler = (event) => {
    setHoliday({ ...holiday, [event.target.name]: event.target.value });
  };

  const deleteHandler = async (id) => {
    try {
      let istrue = window.confirm(
        "Are you sure you want to delete this holiday?"
      );
      if (!istrue) {
        return;
      }
      showLoader();
      await httpDelete(`holidays/${id}/`);
      getHolidays();
      hideLoader();
      return NotificationManager.success("Success! Holiday has been deleted");
    } catch (error) {
      hideLoader();
      return NotificationManager.error("Network Error. Please try again");
    }
  };
  const updateHoliday = async (id) => {
    try {
      showLoader();
      await httpPatch(`holidays/${id}/`, holiday);
      getHolidays();
      hideLoader();
      return NotificationManager.success("Success! Holiday has been updated");
    } catch (error) {
      hideLoader();
      return NotificationManager.error("Network Error. Please try again");
    }
  };

  const handleDateChange = () => {
    // setStartDate(e.target.va lue);
    // console.log("logged on change date", formatDate(startDate));
    setHoliday({ ...holiday, date: formatDate(startDate) });
  };

  const getHoliday = async (id) => {
    showLoader();
    try {
      const res = await httpGet(`holidays/${id}`).then((res) => {
        setHoliday(res.holiday);
        hideLoader();
      });
      // setHoliday(res.holidays);
    } catch (error) {
      NotificationManager.error("oops, couldn't fetch holidays");
    }
  };
  const getHolidays = async () => {
    showLoader();
    try {
      const res = await httpGet("holidays").then((res) => {
        setHolidays(res.holidays);
        hideLoader();
      });
      setHolidays(res.holidays);
    } catch (error) {
      //   NotificationManager.error("oops, couldn't fetch holidays");
    }
  };

  const createHoliday = async () => {
    try {
      httpPost(`holidays`, holiday);
      NotificationManager.success("created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHolidays();
  }, []);

  return (
    <div>
      <Layout>
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
                  Leave
                </a>
              </li>
              <li className="breadcrumb-item active text-" aria-current="page">
                Holidays
              </li>
            </ol>
            <div className="section-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-header remove-border custom-header">
                        <button
                          type="button"
                          className="btn "
                          data-toggle="modal"
                          data-target="#exampleModal3"
                        >
                          CREATE HOLIDAY
                        </button>
                        {/* <div className="inputf">
                          <input placeholder="holiday" />
                          <button className="search-bt">Search</button>
                        </div> */}
                      </div>
                      {/* {holidays ? <HolidayTable holidays={holidays} /> : ""} */}

                      <div>
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover mb-0 text-nowrap">
                            <thead>
                              <tr>
                                <th>Holiday Title</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Created On</th>
                                {/* <th>Reoccuring</th> */}
                                <th>Modified</th>
                                <th>Actions</th>
                              </tr>
                            </thead>

                            <tbody>
                              {holidays.map((item) => {
                                return (
                                  <tr>
                                    <td>{item.title} </td>
                                    <td>{item.date}</td>
                                    <td className="w-32">{item.description}</td>

                                    <td>{formatDate(item.createdAt)}</td>

                                    {/* <td>
                                      <input
                                        type="checkbox"
                                        id="vehicle1"
                                        name="vehicle1"
                                        value="Bike"
                                      />{" "}
                                      <label>Every year</label>
                                    </td> */}
                                    <td>{formatDate(item.updatedAt)}</td>
                                    <td>
                                      {/* <span
					data-toggle="modal"
					data-target="#exampleModal45"
					className="view"
				  >
					View
				  </span> */}
                                      <span
                                        data-toggle="modal"
                                        data-target="#exampleModal45"
                                        className="edit"
                                        onClick={() => {
                                          getHoliday(item.id).then((res) => {
                                            console.log(
                                              "the holiday is ---",
                                              res
                                            );
                                          });
                                        }}
                                      >
                                        Edit
                                      </span>
                                      <button
                                        className="del"
                                        onClick={() => {
                                          deleteHandler(item.id);
                                        }}
                                      >
                                        delete
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className="modal fade"
          id="exampleModal3"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="example-Modal3">
                  CREATE HOLIDAY
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
                      name="title"
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={holiday.title}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label for="recipient-name" className="form-control-label">
                      Description
                    </label>
                    <input
                      name="description"
                      type="text"
                      value={holiday.description}
                      className="form-control"
                      id="recipient-name"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="form-group">
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createHoliday}
                >
                  Create Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal45"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
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
                      name="title"
                      type="text"
                      value={holiday.title}
                      className="form-control"
                      id="recipient-name"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label for="recipient-name" className="form-control-label">
                      Description
                    </label>
                    <input
                      name="description"
                      type="text"
                      value={holiday.description}
                      className="form-control"
                      id="recipient-name"
                      onChange={onChangeHandler}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    updateHoliday(holiday.id);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default CreateLeave;
