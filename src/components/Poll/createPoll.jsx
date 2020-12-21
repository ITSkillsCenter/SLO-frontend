import React, { useState, useEffect } from "react";
import Layout from "../layout/index";
import { getPoll } from "../../helpers/storePollData";
import "./index.css";
import { NotificationManager } from "react-notifications";
import {
  httpPost1,
  httpGet1,
  httpPatch,
  httpPatch1,
  httpDelete,
} from "../../actions/data.action";
import { useParams } from "react-router-dom";
import { hideLoader, showLoader } from "../../helpers/loader";
import { Link } from "react-router-dom";
export default function CreatePoll(props) {
  const { id } = useParams();
  const [PollOptions, setPollOptions] = useState([]);
  const [savePollData, setsavePollData] = useState([]);
  const [PollOptionsInput, setPollOptionsInput] = useState("");
  const [pollQuestion, setpollQuestion] = useState("");
  const [question_id, setQuestionId] = useState("");

  const handlePollOptions = (type, deleteData, data = "") => {
    if (type === "add") {
      if (
        PollOptionsInput === "" ||
        PollOptionsInput === null ||
        PollOptionsInput === undefined
      ) {
        NotificationManager.error("Please enter an option");
        return;
      }
      if (PollOptions.find((data) => data === PollOptionsInput)) {
        alert(`${PollOptionsInput} already added`);
        return;
      }
      setPollOptions([...PollOptions, PollOptionsInput]);
      setPollOptionsInput("");
    } else {
      if (question_id !== "") {
        let option = ques_options
          .filter((que) => que.question.id === question_id)
          .map((que) => {
            return que.options;
          });
        let opt = [...option[0]].filter((opt) => opt.option === data);
        deleteHandler(
          `/opinion_poll/${id}/question/${question_id}/option/${opt[0].id}`
        );
      }
      let deletData = PollOptions[deleteData];
      let filterData = PollOptions.filter((data) => {
        return data !== deletData;
      });
      setPollOptions(filterData);
    }
  };

  const deleteHandler = async (url) => {
    try {
      await httpDelete(url);
    } catch (error) {
      NotificationManager.error("Network Error! Please try again");
    }
  };

  const editOptions = (e, index) => {
    const newPollOptions = [...PollOptions];
    newPollOptions[index] = e.target.value;
    setPollOptions(newPollOptions);
  };

  const savePoll = async (event) => {
    if (PollOptions.length === 0 || pollQuestion.trim().length === 0) {
      return NotificationManager.error(
        "Please enter question and at least an option"
      );
    }
    try {
      showLoader();
      let fd = {
        question: {
          question: pollQuestion,
          optionType: "single-selection",
          enableOthers: true,
        },
        options: PollOptions,
      };
      if (question_id !== "") {
        let res = await httpPatch1(
          `/opinion_poll/${id}/question/${question_id}`,
          fd
        );
        setPollOptions([]);
        setpollQuestion("");
        setQuestionId("");
        getQuestions();
        hideLoader();
        return NotificationManager.success("Success! Record has been updated");
      }
      let res = await httpPost1(`/opinion_poll/${id}/create_question`, fd);
      //setsavePollData([...savePollData,res.opinion])
      setPollOptions([]);
      setpollQuestion("");
      getQuestions();
      hideLoader();
      NotificationManager.success("Success! Record has been saved");
    } catch (error) {
      console.log(error);
      hideLoader();
      NotificationManager.error("Network Error. Please try again later");
    }
  };

  const editData = (que) => {
    console.log(">>>", que);
    setpollQuestion(que.question.question);
    setQuestionId(que.question.id);
    setPollOptions(que.options.map((option) => option.option));
  };
  const removeData = async (que) => {
    console.log("remove>>", que);
    await deleteHandler(`opinion_poll/${id}/question/${que.question.id}/`);
    getQuestions();
  };

  const getQuestions = async () => {
    try {
      showLoader();
      let res = await httpGet1(`/opinion_poll/${id}`);
      console.log("que>>", res.questionsAndOptions);
      setQuesOptions(res.questionsAndOptions);
      hideLoader();
    } catch (error) {
      hideLoader();
      NotificationManager.error("Network Error. Please try again");
    }
  };
  const [ques_options, setQuesOptions] = useState([]);
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
                  {getPoll.who}
                </a>
              </li>

              <li className="breadcrumb-item active text-" aria-current="page">
                Opinion Polls
              </li>
            </ol>
            <div className="section-body">
              <div className="create-poll-container">
                <div className="create-poll-form-col">
                  <div className="createPollForm-col-one-child">
                    <form>
                      <div className="poll-input-wrap">
                        <label>Question</label>
                        <textarea
                          onChange={(e) => setpollQuestion(e.target.value)}
                          required
                          placeholder="Type your first question here"
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          value={pollQuestion}
                        ></textarea>
                      </div>
                      <div className="poll-options">
                        <label>Input poll option</label>
                        <div className="poll-input-add">
                          <input
                            title="Click the plus button to add option"
                            style={{ borderRadius: "5px 0px 0 5px" }}
                            onChange={(e) =>
                              setPollOptionsInput(e.target.value)
                            }
                            type="text"
                            placeholder="eg, your text here"
                            value={PollOptionsInput}
                          />
                          <img
                            src="/add.png"
                            onClick={(data) => handlePollOptions("add", "")}
                          />
                        </div>
                        <div className="poll-tags">
                          {PollOptions.map((data, index) => {
                            return (
                              <div className="poll-options-drow">
                                <input
                                  required
                                  value={data}
                                  onChange={(e) => editOptions(e, index)}
                                  className="funding-industry-tags-span"
                                />
                                <img
                                  src="/remove.png"
                                  onClick={() =>
                                    handlePollOptions("remove", index, data)
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div className="save-poll-btn">
                          <button onClick={savePoll} type="button">
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* <div className="createPollForm-col-two-child">
                        <form>
                          <div className="selet-poll-type">
                            <label htmlFor="">Add answers</label>
                            <select name="" id="">
                              <option value="single">Single  choice answer</option>
                            </select>
                          </div>
                          <div className="poll-enable-others">
                              <input type="checkbox"/> <label style={{fontSize:"15px",marginLeft:"10px"}}>Enable  others</label>
                          </div>
                        </form>
                      </div> */}
                </div>

                <div className="create-poll-preview">
                  <div className="poll-tags">
                    {ques_options.map((que, index) => (
                      <div className="ml-4 mr-4 mt-4">
                        <span
                          className="fa fa-remove pull-right text-danger pull-action"
                          onClick={() => removeData(que)}
                        ></span>
                        <span
                          className="fa fa-pencil pull-right text-success mr-3 pull-action"
                          onClick={() => editData(que)}
                        ></span>
                        <Link
                          to={`/answers/${que.question.id}`}
                          className="pull-right text-success mr-3 pull-action"
                        >
                          <span className="fa fa-eye"></span>
                        </Link>
                        <p key={index}>{que.question.question}</p>
                      </div>
                    ))}
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
