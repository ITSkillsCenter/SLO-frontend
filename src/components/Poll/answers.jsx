import React,{useState,useEffect} from 'react'
import Layout from "../layout/index";
import CreatePoll from '../Modals/createPoll';
import AnswersTable from './PollsTable';
import Axios from 'axios';
import {
	httpPost,
	httpGet,
	httpDelete,
	httpPatch,
  httpGet1,
} from "../../actions/data.action";
import { NotificationManager } from "react-notifications";
import $ from 'jquery'
import { hideLoader, showLoader } from '../../helpers/loader';

export default function Answers(props) {
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
                    User Role
                  </li>
                </ol>
                <div className="section-body">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="mb-5">
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </div>
        </Layout>
        </div>

    )
}
// onBlur={this.handleEditDaata(id)}
