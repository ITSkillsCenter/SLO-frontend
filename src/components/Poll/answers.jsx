import React, { useState, useEffect } from "react";
import Layout from "../layout/index";
import { httpGet1 } from "../../actions/data.action";
import { NotificationManager } from "react-notifications";
import { hideLoader, showLoader } from "../../helpers/loader";
export default function Answers(props) {
  const [respondents, setRespondents] = useState([]);
  let x = window.location.pathname.split("/");
  const id = x[x.length - 1];
  console.log("x is value", id);
  const [respondent, setRespondent] = useState("");

  const getAnswers = async () => {
    try {
      showLoader();
      let res = await httpGet1(`/opinion_poll/1/respondents/3`);
      setRespondents(res.respondents);
      hideLoader();
    } catch (error) {
      hideLoader();
      NotificationManager.error("Network Error. Please try again");
    }
  };
  const getQuestions = async () => {
    try {
      showLoader();
      let res = await httpGet1(`/opinion_poll/${id}/see_respondents/`);
      setRespondents(res.respondents);
      hideLoader();
    } catch (error) {
      hideLoader();
      NotificationManager.error("Network Error. Please try again");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  console.log("the que>>", respondents);

  const formatTime = (time) => {
    let x = time.split("T");
    const year = x[0];
    console.log("year", year);

    const hour = x[1].split(".")[0];
    console.log("HOUR", hour);
    return { year, hour };
  };

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

              <li className="breadcrumb-item active text-" aria-current="page">
                Polls Responses
              </li>
            </ol>
            <div className="section-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-5">
                    <h3>{respondents.length} Respondents</h3>
                  </div>
                  <div className="responses ">
                    <div className="well">
                      {respondents.map((respondent) => {
                        return (
                          <div className="card px-2 py-2">
                            <h5>
                              {respondent.user["firstName"] +
                                " " +
                                respondent.user.lastName}
                            </h5>
                            {"submitted on " +
                              formatTime(respondent.createdAt).year +
                              " " +
                              formatTime(respondent.createdAt).year}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-5">
                    <h3>Responses</h3>
                  </div>
                  <div className="responses ">
                    <div className="well">
                      <Responses respondent />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  );
}

const Responses = (respondentID) => {
  return (
    <div className="card">
      <div className="well">
        <h6>Staff Information</h6>
      </div>
    </div>
  );
};

// onBlur={this.handleEditDaata(id)}
