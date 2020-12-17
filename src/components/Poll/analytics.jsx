import React, { useState, useEffect } from "react";
import Layout from "../layout/index";
import { httpGet1 } from "../../actions/data.action";
import { NotificationManager } from "react-notifications";
import { hideLoader, showLoader } from "../../helpers/loader";
import { Item } from "react-bootstrap/lib/Breadcrumb";

export default function Analytics(props) {
  const [summary, setSummary] = useState([]);
  let x = window.location.pathname.split("/");
  const id = x[x.length - 1];
  console.log("the current ID is ", id);

  const getQuestions = async () => {
    try {
      showLoader();
      let res = await httpGet1(`opinion_poll/${id}/get_analytics`);
      setSummary(res.analyzedResponses);
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

  useEffect(() => {
    getQuestions();
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

              <li className="breadcrumb-item active text-" aria-current="page">
                Polls Summary
              </li>
            </ol>
            <div className="section-body">
              <div className="row">
                <div className="col-md-8 mx-auto">
                  <div className="mb-5">
                    <h2> Response Summary </h2>
                  </div>
                  <div className="responses ">
                    <div className="">
                      {summary ? (
                        <div className="px-4 py-4">
                          {summary.map((item) => {
                            return (
                              <div className="card px-4 pt-4">
                                <h5>
                                  {item.question.number}:{" "}
                                  {item.question.question}:
                                </h5>

                                {/* <h5>Options</h5> */}
                                <div className="well px-4 pt-4">
                                  {item.options.map((item) => {
                                    return (
                                      <p>
                                        <strong>{item.option.option}</strong>
                                        <br />
                                        {item.option.number} respondents
                                        <hr />
                                      </p>
                                    );
                                  })}
                                  {/* <Option data={item.options} /> */}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
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

const Option = (data) => {
  // console.log("the option", data[0].option.option);
  return (
    <div>
      {data[0] &&
        data.map((i) => {
          // return <h6>{i.option.option}</h6>;
          return <p>sdfslkdjf</p>;
        })}
    </div>
  );
};
