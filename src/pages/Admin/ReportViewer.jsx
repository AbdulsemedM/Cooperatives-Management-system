import React from "react";
import { Route, Routes } from "react-router-dom";
import Industry from "../../components/Industry/Industry";
import Member from "../../components/Members/Members";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreateUnion from "../../components/Unions/CreateUnion";
import UnionList from "../../components/Unions/UnionList";
import Capital from "../../components/Capital/Capital";
import BalanceSheet from "../../components/Balance Sheet/BalanceSheet";
import CreateUser from "../../components/User/CreateUser";
import UserList from "../../components/User/UserList";
import { connect } from "react-redux";
import { selectHiddenSidebarState } from "../../redux/state-control/stateSelector";
import { createStructuredSelector } from "reselect";
import "./../../components/Sidebar/Sidebar.css";
import AdminDashboard from "../../components/Dashboard/AdminDashboard";
import Report from "../../components/Reports/Report";
import Establishment from "../../components/Establishment/Establishment";
import IncomeStatement from "../../components/IncomeStatement/IncomeStatement";
import Credit from "../../components/Credit/Credit";
import Federation from "../../components/Federation/Federation";
import SellAndTurnOver from "../../components/Sell and Turnover/SellAndTurnOver";
import SettingsPage from "../Settings/SettingPage";

const ReportViewer = ({ hidden_sidebar }) => {
  return (
    <div>
      <Sidebar />
      <div
        className={`${
          hidden_sidebar ? "md:ml-80" : ""
        } sidebar-animation mt-24 mx-4 md:mx-10`}
      >
        <Routes>
          <Route path="" element={<AdminDashboard />} />
          <Route
            path="unions"
            element={<UnionList isPrCooperative={false} />}
          />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="allUsers" element={<UserList />} />
          <Route
            path="addprcooperative"
            element={<CreateUnion isPrCooperative={true} />}
          />
          <Route path="establishment" element={<Establishment />} />
          <Route
            path="unions"
            element={<CreateUnion isPrCooperative={false} />}
          />
          <Route path="sheet" element={<BalanceSheet />} />
          <Route path="withcoopbank" element={<Capital />} />
          <Route
            path="unionlist"
            element={<UnionList isPrCooperative={false} />}
          />
          <Route
            path="prcooperativelist"
            element={<UnionList isPrCooperative={true} />}
          />
          <Route path="business" element={<Industry />} />
          <Route path="industry" element={<Industry />} />
          <Route path="reports" element={<Report />} />
          <Route path="members" element={<Member status={false} />} />
          <Route path="incomestatement" element={<IncomeStatement />} />
          <Route path="credittomember" element={<Credit />} />
          <Route path="federation" element={<Federation />} />
          <Route path="sellandturnover" element={<SellAndTurnOver />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  hidden_sidebar: selectHiddenSidebarState,
});

export default connect(mapStateToProps)(ReportViewer);
