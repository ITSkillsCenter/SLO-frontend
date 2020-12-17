import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";
import store from "./store";
import PersonalInfo from "./components/Onboarding/PersonalInfo";
import Qualification from "./components/Onboarding/Qualification2";
import Employment from "./components/Onboarding/Employment";
import Guarantor from "./components/Onboarding/Guarantor";
// gurantor refer to personalInfo
import Upload from "./components/Onboarding/Upload";
import PendingApplication from "./components/Onboarding/Pending";
import StaffList from "./components/Onboarding/StaffList";
import ViewDetails from "./components/Onboarding/ViewDetails";
// import Branch from "./components/branch/branch";
import Office from "./components/branch/office";
import Department from "./components/department/department";
import Unit from "./components/unit/unit";
import Role from "./components/role";
import Kpi from "./components/KPI";
import Responsibility from "./components/responsibility";
import PendingActions from "./components/Leave/pendingAction/pendingActions";
import CreateLeave from "./components/Leave/createLeave/createLeave";
import LeaveMangement from "./components/Leave/LeaveManagement/leaveManagement";
import LeaveHistory from "./components/Leave/leaveHistory/leaveHistory";
import CreateStaff from "./components/Onboarding/createStaff";
import Login from "./components/Login";
import UnderReview from "./components/Onboarding/UnderReview";
import StaffDashboard from "./components/Dashboard/Staff";
import Logout from "./components/Logout";
import Testing from "./components/testing";
import Appraisal from "./components/Appraisal";
import ViewAppraisal from "./components/Appraisal/ViewAppraisal";
import AppraisalList from "./components/Appraisal/AppraisalList";
import AssignKpi from "./components/KPI/AssignKpi";
import Labels from "./components/PerformanceLabels";

import "react-notifications/lib/notifications.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-tooltip/dist/index.js";

import ProtectedRoute from "./helpers/ProtectedRoute";

// NEW CHANGES
import UserInfo from "./components/personalinfo/info";
import PayRoll from "./components/Payrol/payroll";
import PayrollForm from "./components/Payrol/payrollForm2";
import PayrollSetup from "./components/Payrol/setUpPayroll/payrollSetup";
import MainPayrolls from "./components/Payrol/payrolls/payroll";
import PayNow from "./components/Payrol/payrollPay/pay";
import SalaryStructure from "./components/salaryStructure/index";
import LoanTypes from "./components/Loan/loanType";
import LoanRequests from "./components/Loan/loanRequests";
import UserLoan from "./components/Loan/decideLoan";
import EditPayroll from "./components/Payrol/editPayroll";
import SalaryStructureItems from "./components/salaryStructure/salaryStructureItem";

import ProcessPayroll from "./components/Payrol/setUpPayroll/processPayroll/processPayroll";
import Payslip from "./components/Payrol/setUpPayroll/processPayroll/payslip";
import ViewPayroll from "./components/Payrol/viewPayroll";
import PendingPayroll from "./components/Payrol/setUpPayroll/processPayroll/processPendingPayroll";
import AuditView from "./components/Payrol/setUpPayroll/processPayroll/auditViewPayrollIndex";
import AuditSummary from "./components/Payrol/setUpPayroll/processPayroll/auditSummary";
import PendingList from "./components/Onboarding/PendingList";
import UserRole from "./components/userRole/index";
import UsersLeave from "./components/usersLeave/leave";
import Category from "./components/Category/categories";
import SubCategory from "./components/Category/subCategory";
import Poll from "./components/Poll/index";
import CreatePoll from "./components/Poll/createPoll";
import Answers from "./components/Poll/answers";
import Summary from "./components/Poll/analytics";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <NotificationContainer />
        {/* <ToastContainer /> */}
        <Switch>
          {/* <Route exact path="/" component={Homepage}/> */}
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          {/* <Route path="/create_staff/one" component={PersonalInfo} /> */}
          <Route exact path="/staff_dashboard" component={StaffDashboard} />
          <ProtectedRoute
            exact
            path="/pending_actions"
            component={PendingActions}
          />
          <ProtectedRoute exact path="/create_staff" component={CreateStaff} />
          <ProtectedRoute
            exact
            path="/create_staff/one/:id"
            component={PersonalInfo}
          />
          <ProtectedRoute
            path="/create_staff/two/:id"
            component={Qualification}
          />
          <ProtectedRoute
            path="/create_staff/three/:id"
            component={Guarantor}
          />
          <ProtectedRoute
            path="/create_staff/four/:id"
            component={Employment}
          />
          {/* <Route path="/create_staff/five/:id" component={Upload} /> */}
          {/* <Route path="/create_staff/six" component={PendingApplication} /> */}
          <ProtectedRoute path="/staff_list" component={StaffList} />
          <ProtectedRoute path="/pending_list" component={PendingList} />
          <ProtectedRoute path="/user_info/:id" component={ViewDetails} />
          <ProtectedRoute path="/branches" component={Office} />
          <ProtectedRoute path="/departments" component={Department} />
          <ProtectedRoute path="/units" component={Unit} />
          <ProtectedRoute path="/roles" component={Role} />
          <ProtectedRoute path="/kpi" component={Kpi} />
          <ProtectedRoute path="/assign_kpi" component={AssignKpi} />
          <ProtectedRoute path="/responsibility" component={Responsibility} />
          <ProtectedRoute path="/appraisal" component={Appraisal} />
          <ProtectedRoute
            path="/view_appraisal/:id"
            component={ViewAppraisal}
          />
          <ProtectedRoute
            path="/user_appraisal_list"
            component={AppraisalList}
          />
          <ProtectedRoute path="/leave_setup" component={CreateLeave} />
          <ProtectedRoute path="/leave_management" component={LeaveMangement} />
          <ProtectedRoute path="/leave_history" component={LeaveHistory} />
          <ProtectedRoute path="/view_details/:id" component={UserInfo} />
          <ProtectedRoute path="/manage_labels" component={Labels} />
          <Route path="/application_status" component={UnderReview} />
          {/* <Route path="/testing" component={Testing} /> */}
          <Route path="/logout" component={Logout} />
          <Route path="/payroll" component={PayRoll} />
          <Route path="/payroll-form" component={PayrollForm} />
          <Route path="/setup-payroll" component={PayrollSetup} />
          <Route path="/main-payrolls" component={MainPayrolls} />
          <Route path="/pay-now" component={PayNow} />
          <Route path="/edit-payroll/:id" component={EditPayroll} />
          <Route path="/salary-structure" component={SalaryStructure} />
          <Route path="/loan" component={LoanTypes} />
          <Route path="/loan-requests" component={LoanRequests} />
          <Route path="/user-loan-request" component={UserLoan} />
          <Route
            path="/salary_structure_items/:id"
            component={SalaryStructureItems}
          />
          <Route path="/process_payroll/:id" component={PendingPayroll} />
          <Route path="/use_payslip/:id/:id2/:staffId" component={Payslip} />
          <Route path="/view_payroll/:id" component={ViewPayroll} />
          <Route
            path="/process_pending_payroll/:id"
            component={PendingPayroll}
          />
          <Route path="/audit_view_payroll/:id" component={AuditView} />
          <Route path="/audit_summary" component={AuditSummary} />
          <Route path="/user_role" component={UserRole} />
          <Route path="/user_leave" component={UsersLeave} />
          <Route path="/category" component={Category} />
          <Route path="/sub_category/:id" component={SubCategory} />
          <Route path="/poll" component={Poll} />
          <Route path="/create_poll/:id" component={CreatePoll} />
          <Route path="/answers/:poll_id" component={Answers} />
          <Route path="/summary/:poll_id" component={Summary} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
