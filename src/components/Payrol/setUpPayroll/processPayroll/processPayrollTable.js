import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import Table from "../../../../helpers/customTable";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import _ from "lodash";

export default class branchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalGrossList: [],
    };
  }

  bodyRow = () => {
    const body = this.props.payroll.map((data, index) => ({
      checkbox: (
        <div class="form-check">
          <input
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              this.props.previewPayrollProcess(e, data);
            }}
            key={data.staffId}
            name="list"
            type="checkbox"
            type="checkbox"
            class="form-check-input"
            disabled={data.status ? "disabled" : ""}
          />
        </div>
      ),
      name: `${data.user.firstName} ${data.user.lastName}`,
      employeeID: data.user.username,
      Paygrade: data.user.employmentInfo[0].salaryStructure.name,
      grossPay: (
        <NumberFormat
          value={this.sumUp(data.payrollProcessingItem)}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
      // "addictions":0,
      deduction: (
        <NumberFormat
          value={this.getReduction(data.payrollProcessingItem)}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
      //  "netPay":data.payrollProcessingItem.map((netpay)=>_.sum(netpay.amount)),
      netPay: (
        <NumberFormat
          value={this.getReduction(data.payrollProcessingItem, "netpay")}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
      bankName:
        data.user.bankName === null ? "N/A" : data.user.bankName.toUpperCase(),
      bankAccount:
        data.user.accountNumber === null ? "N/A" : data.user.accountNumber,

      action: (
        <a style={data.status ? { display: "none" } : {}}>
          <span className="edit" data-toggle="modal" data-target="#branchModal">
            <Link
              to={`/use_payslip/${
                data.payrollProcessingId
              }/${data.payrollProcessingItem.map(
                (data) => data.processPayrollUserId
              )}/${data.staffId}`}
            >
              Edit
            </Link>
          </span>
        </a>
      ),
    }));
    return body;
  };

  // getNetPay = (value) => {
  // 	return this. this.getReduction(value)
  // }

  getReduction = (payroll, type) => {
    let BHT = 0;
    payroll.map((item) => {
      if (
        item.payroll.name === "Basic Pay" ||
        item.payroll.name === "Transportation Allowance" ||
        item.payroll.name === "Housing Allowance" ||
        item.payroll.name === "Kidnapping"
      ) {
        BHT = BHT + parseInt(item.amount);
      }
    });

    let grossPay = 0;
    payroll.map((item) => (grossPay = grossPay + parseInt(item.amount)));

    const annualGross = grossPay * 12;
    const CR = (20 / 100) * annualGross + 200000;
    // const PR = (8/100) * BHT;
    const PR = 13520;
    const TR = CR + PR;
    const taxableIncome = annualGross - TR;

    if (type === "netpay") {
      return grossPay - this.getTax(taxableIncome);
    } else {
      return this.getTax(taxableIncome);
    }
  };

  getTax = (taxableIncome) => {
    let newValue = taxableIncome;
    let sumArr = [];
    let checkList = [
      { x: 300000, y: 0.07 },
      { x: 300000, y: 0.11 },
      { x: 500000, y: 0.15 },
      { x: 500000, y: 0.19 },
      { x: 1600000, y: 0.21 },
      { x: 3200000, y: 0.24 },
    ];
    for (let i = 0; i < checkList.length; i++) {
      if (newValue > checkList[i].x) {
        sumArr.push(checkList[i].y * checkList[i].x);
        newValue = newValue - checkList[i].x;
      } else if (newValue < checkList[i].x) {
        sumArr.push(checkList[i].y * newValue);
        break;
      }
    }
    console.log(sumArr);
    const annualTax = sumArr.reduce((a, b) => a + b, 0);
    const monthlyTax = annualTax / 12;
    return monthlyTax.toFixed(2);
  };

  sumUp = (value) => {
    console.log(">>>>>");
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
      sum = sum + parseInt(value[i].amount);
    }
    // console.log([sum].reduce((a, b) => a + b, 0))
    // this.setState({totalGrossList: [...this.state.totalGrossList, sum] })
    return sum;
  };

  getTotalGross = (payroll) => {
    let totalGrossList = [];
    console.log(payroll);
    payroll.map((data, index) => {
      const total = this.sumUp(data.payrollProcessingItem);
      totalGrossList.push(total);
    });
    const total = [...totalGrossList].reduce((a, b) => a + b, 0);
    return total || 0;
  };

  getTotalReduction = (payroll) => {
    let totalList = [];
    payroll.map((data, index) => {
      const total = this.getReduction(data.payrollProcessingItem);
      totalList.push(parseInt(total));
    });
    // console.log(totalList)
    const total = [...totalList].reduce((a, b) => a + b, 0);
    return total || 0;
  };

  getTotalNetPay = (payroll) => {
    let totalList = [];
    payroll.map((data, index) => {
      const total = this.getReduction(data.payrollProcessingItem, "netpay");
      totalList.push(total);
    });
    const total = [...totalList].reduce((a, b) => a + b, 0);
    return total.toFixed(2) || 0;
  };

  header = () => {
    const header = [
      { title: "", prop: "checkbox" },
      {
        title: "Name (filterable)",
        prop: "name",
        sortable: true,
        filterable: true,
      },
      { title: "Employee ID", prop: "employeeID", sortable: true },
      { title: "Pay Grade", prop: "Paygrade", sortable: true },
      { title: "Gross Pay", prop: "grossPay", sortable: true },
      // { title: 'Addition', prop: 'addictions' },
      { title: "Deduction", prop: "deduction" },
      { title: "NetPay", prop: "netPay" },
      { title: "Bank Name", prop: "bankName", sortable: true },
      { title: "Bank Account", prop: "bankAccount", sortable: true },
      { title: "Actions", prop: "action" },
    ];
    return header;
  };

  render() {
    // console.log('@@@',this.props.payroll)
    const newPayroll =
      this.props.payroll !== undefined ? this.props.payroll : [];
    console.log("@@@", newPayroll);
    return (
      <div>
        <Table
          className="ProcesspayrollTable54"
          body={this.bodyRow}
          head={this.header}
          rowsPerPage={10}
          rowsPerPageOption={[10, 15, 20, 25]}
        />

        <div style={{ position: "relative" }}>
          <div className="PayrollTotal">
            <h1>Total Gross</h1>

            <div className="payrollDataP">
              <div>
                <span>Gross Pay</span>{" "}
                <span>
                  <NumberFormat
                    value={this.getTotalGross(newPayroll)}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>
              </div>

              <div>
                <span>Deduction</span>{" "}
                <span>
                  <NumberFormat
                    value={this.getTotalReduction(newPayroll)}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>
              </div>

              <div>
                <span>Net Pay</span>{" "}
                <span>
                  <NumberFormat
                    value={this.getTotalNetPay(newPayroll)}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
