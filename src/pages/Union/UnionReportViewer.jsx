import React from "react";
import { Route, Routes } from "react-router-dom";
import Capital from "../../components/Capital/Capital";
import Industry from "../../components/Industry/Industry";
import Sidebar from "../../components/Sidebar/Sidebar";
import Account from "../../components/Accounts/Account";
import Member from "../../components/Members/Members";
import SellAndTurnOver from "../../components/Sell and Turnover/SellAndTurnOver";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectHiddenSidebarState } from "../../redux/state-control/stateSelector";
import BalanceSheet from "../../components/Balance Sheet/BalanceSheet";
import UnionDashboard from "../../components/Dashboard/UnionDashboard";
import CreateUser from "../../components/User/CreateUser";
import UnionList from "../../components/Unions/UnionList";
import UserList from "../../components/User/UserList";
import SettingsPage from "../Settings/SettingPage";

const UnionReportViewer = ({ hidden_sidebar }) => {
  return (
    <div>
      <Sidebar />
      <div
        className={`${
          hidden_sidebar ? "md:ml-80" : ""
        } sidebar-animation mt-24 mx-4 md:mx-10`}
      >
        <Routes>
          {/* <Route path="dashboard" element={<Industry />} /> */}
          <Route path="/" element={<UnionDashboard />} />

          <Route path="members" element={<Member />} />
          <Route path="accounts" element={<Account isPrCoop={false} />} />
          <Route path="sellandturnover" element={<SellAndTurnOver />} />
          <Route path="industry" element={<Industry />} />
          <Route path="sheet" element={<BalanceSheet />} />
          <Route path="withcoopbank" element={<Capital />} />
          <Route path="createUser" element={<CreateUser />} />
          <Route path="allUsers" element={<UserList />} />
          <Route
            path="prcooperativelist"
            element={<UnionList isPrCooperative={true} />}
          />

          {/* <Route path="settings" element={<Industry />} /> */}
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  hidden_sidebar: selectHiddenSidebarState,
});

export default connect(mapStateToProps)(UnionReportViewer);
