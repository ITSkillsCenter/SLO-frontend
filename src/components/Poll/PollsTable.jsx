import React, { Component } from "react";
import Table from "../../helpers/customTable";
import { Link } from "react-router-dom";
import { httpDelete } from "../../actions/data.action";
import { showLoader, hideLoader } from "../../helpers/loader";
import {NotificationManager} from "react-notifications";

const PollsTable = ({data,setPoll,getPolls}) =>{

    const deleteHandler = async (poll) =>{
        try{
            let istrue = window.confirm("Are you sure you want to delete this poll?");
            if(!istrue){
                return;
            }
            showLoader();
            await httpDelete(`opinion_poll/${poll.id}/`);
            getPolls();
            hideLoader();
            return NotificationManager.success("Success! Poll has been deleted");
        }catch(error){
            hideLoader();
            return NotificationManager.error("Network Error. Please try again");
        }
    }
	const bodyRow = () => {
        const body = data.map((data, index) => ({
            name: data.name,
            action: (
                <div className="text-center">
                    <Link to={`/create_poll/${data.id}`}
                        className="mr-5"
                    >
                        View
                    </Link>
                    <Link
                        to="#"
                        type="button"
                        data-toggle="modal"
                        data-target="#createPoll"
                        onClick={()=>setPoll(data)}
                    >
                        Edit
                    </Link>
                    <Link
                        to="#"
                        className="ml-5"
                        onClick={()=>deleteHandler(data)}
                    >
                        Delete
                    </Link>
                </div>
            ),
        }));
        return body;
    };

    const header = () => {
        const header = [
            {
                title: "Name",
                prop: "name",
                sortable: true,
                filterable: true,
            },
            { title: "Actions", prop: "action" },
        ];
        return header;
    };

    return (
        <div>
            <div className="table-responsive" style={{ overflow: "hidden" }}>
                <Table
                    body={bodyRow}
                    head={header}
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 15, 20, 25]}
                />
            </div>
        </div>
    );
}

export default PollsTable;
