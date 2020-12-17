import React, { useState, useEffect } from "react";
import Layout from "../layout/index";
import { httpGet1 } from "../../actions/data.action";
import { NotificationManager } from "react-notifications";
import { hideLoader, showLoader } from "../../helpers/loader";
import { Link } from "react-router-dom";

export default function Answers(props) {
  const [respondents, setRespondents] = useState([]);
  const [userID, setUserID] = useState("");
  let x = window.location.pathname.split("/");
  const id = x[x.length - 1];
  // console.log("the pollID is ", id);

  const getQuestions = async () => {
    try {
      showLoader();
      let res = await httpGet1(`opinion_poll/${id}/see_respondents/${userID}`);
      setRespondents(res.respondents);
      hideLoader();
    } catch (error) {
      hideLoader();
      // NotificationManager.error(error);
    }
  };

  const formatTime = (time) => {
    let x = time.split("T");
    const year = x[0];

    const hour = x[1].split(".")[0];
    return { year, hour };
  };

  // get the user's answers
  const [answers, setAnswers] = useState({});

  const getAnswers = async (user) => {
    try {
      // showLoader();
      let res = await httpGet1(`opinion_poll/${id}/respondents/${user}`).then(
        (res) => {
          setAnswers(res);
          console.log("the answers>", answers);
        }
      );

      hideLoader();
    } catch (error) {
      hideLoader();
      // NotificationManager.error("Network Error. Please try again");
    }
  };

  useEffect(() => {
    getQuestions();
  }, [answers]);

  useEffect(() => {
    getAnswers(userID);
  }, [userID]);

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
                    <h3>{respondents.length} Respondents</h3>{" "}
                    <Link to={`/summary/${id}`} className="btn btn-primary">
                      View Summary
                      {/* <button className="btn btn-primary">View Summary</button> */}
                    </Link>
                  </div>
                  <div className="responses ">
                    <div className="well">
                      {respondents.map((val) => {
                        return (
                          <div
                            key={val.user.id}
                            className="card px-2 py-2 cursor"
                            // onClick={() => {
                            //   console.log(
                            //     "the respondent's userID",
                            //     val.user.id
                            //   );
                            //   setUserID(val.user.id);
                            //   getAnswers(val.user.id);
                            // }}
                          >
                            <h5
                              onClick={() => {
                                console.log(
                                  "the respondent's userID",
                                  val.user.id
                                );
                                setUserID(val.user.id);
                              }}
                            >
                              {val.user["firstName"] + " " + val.user.lastName}
                            </h5>
                            {"submitted at " +
                              formatTime(val.createdAt).hour +
                              " " +
                              formatTime(val.createdAt).year}
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
                      {/* <Responses data={answers} id={id} /> */}

                      {/* <div className="card"> */}
                      <div className="Results">
                        <div className="well ">
                          {answers.message ? (
                            <div>
                              <h5>{answers.opinionPoll.name}</h5>
                              <h6>{answers.opinionPoll.description}</h6>
                              <strong>Created by: </strong>
                              {answers.opinionPoll.user.role}
                              <br />
                              <br />
                              <h6>Staff Information</h6>
                              {/* <br /> */}
                              <strong>Fullname:</strong>{" "}
                              {" " +
                                answers.respondent.user.firstName +
                                " " +
                                answers.respondent.user.lastName}{" "}
                              <br />
                              <strong>Job Role:</strong>{" "}
                              {" " + answers.respondent.user.role + " "}
                              <br />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <br />
                        {answers.message
                          ? answers.questionsAndAnswers.map((item) => {
                              return (
                                <div className="card px-4 py-4">
                                  <strong>{item.question.question}</strong>
                                  {
                                    item.answerAndOptions.theSelectedOptions[0]
                                      .option
                                  }
                                  <br />
                                  {/* {
                                      item.questionsAndAnswers
                                        .theSelectedOption[0]
                                    } */}
                                </div>
                              );
                            })
                          : ""}
                      </div>
                      {/* </div> */}
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
