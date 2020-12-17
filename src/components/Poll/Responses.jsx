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
export default function Responses(props) {
  const [pollQuestion, setpollQuestion] = useState("");
  const [question_id, setQuestionId] = useState("");

  return (
    <div>
      <Layout>
        <h1>HELLO</h1>
        <a href="#" className="text-muted">
          Home
        </a>
      </Layout>
    </div>
  );
}
