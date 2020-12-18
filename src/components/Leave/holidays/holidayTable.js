import React from "react";

const LeaveTable = () => {
  const holidays = [2, 3, 4, 5];
  return (
    <div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover mb-0 text-nowrap">
          <thead>
            <tr>
              <th>Holiday Title</th>
              <th>Date</th>
              <th>Description</th>
              <th>Created On</th>
              <th>Reoccuring</th>
              <th>Modified</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {holidays.map((item) => {
              return (
                <tr>
                  <td>Anual Leave </td>
                  <td>2020-03-16 12:33</td>
                  <td>First Level</td>

                  <td>2020-03-16 12:33</td>

                  <td>
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    />{" "}
                    <label>Every year</label>
                  </td>
                  <td>2020-03-16 12:33</td>
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
                    >
                      Edit
                    </span>
                    <button className="del">delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;
