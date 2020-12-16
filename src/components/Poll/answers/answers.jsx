import React, { useState, useEffect } from "react";
import Layout from "../../layout/index";
import { httpGet1 } from "../../../actions/data.action";
import { NotificationManager } from "react-notifications";
import { hideLoader, showLoader } from "../../../helpers/loader";

export default function Answers(props) {
  const [respondents, setRespondents] = useState([]);
  const [userID, setUserID] = useState("");
  let x = window.location.pathname.split("/");
  const id = x[x.length - 1];
  // console.log("the pollID is ", id);

  const getQuestions = async () => {
    try {
      showLoader();
      let res = await httpGet1(`/opinion_poll/${id}/see_respondents/${userID}`);
      setRespondents(res.respondents);
      hideLoader();
    } catch (error) {
      hideLoader();
      NotificationManager.error(error);
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
      showLoader();
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
    // getQuestions();
  });



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
                      {respondents.map((val) => {
                        return (
                          <div
                            key={val.user.id}
                            className="card px-2 py-2"
                            onClick={() => {
                              console.log(
                                "the respondent's userID",
                                val.user.id
                              );
                              setUserID(val.user.id);
                              getAnswers(val.user.id);
                            }}
                          >
                            <h5>
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
                      <Responses data={answers} id={id} />
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

const Responses = (data) => {
  // console.log("the answers >>>>>", answers);
  // useEffect(()=>{
  //   getAnswers();
  // }, [])
  return (
    <div className="card">
      <div className="well">
        <h6>Staff Information{data.message}</h6>
        {data.status && <h1>HEllad {data.message} </h1>}
      </div>
    </div>
  );
};

// onBlur={this.handleEditDaata(id)}
