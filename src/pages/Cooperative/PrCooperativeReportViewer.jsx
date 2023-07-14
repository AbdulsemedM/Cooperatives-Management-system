import React from "react";
import { Route, Routes } from "react-router-dom";
import Industry from "../../components/Industry/Industry";
import Sidebar from "../../components/Sidebar/Sidebar";
import Account from "../../components/Accounts/Account";
import Members from "../../components/Members/Members";
import SellAndTurnOver from "../../components/Sell and Turnover/SellAndTurnOver";
import { connect } from "react-redux";
import { selectHiddenSidebarState } from "../../redux/state-control/stateSelector";
import { createStructuredSelector } from "reselect";
import Capital from "../../components/Capital/Capital";
import BalanceSheet from "../../components/Balance Sheet/BalanceSheet";
import CooperativeDashboard from "../../components/Dashboard/CooperativeDashboard";
import UserList from "../../components/User/UserList";
import SettingsPage from "../Settings/SettingPage";

const PrCooperativeReportViewer = ({ hidden_sidebar }) => {
  return (
    <div>
      <Sidebar />
      <div
        className={`${
          hidden_sidebar ? "md:ml-80" : ""
        } sidebar-animation mt-24 mx-4 md:mx-10`}
      >
        <Routes>
          <Route path="" element={<CooperativeDashboard />} />
          {/* <Route path="dashboard" element={<Industry />} /> */}

          <Route path="members" element={<Members />} />
          <Route path="accounts" element={<Account isPrCoop={false} />} />
          <Route path="sellandturnover" element={<SellAndTurnOver />} />
          <Route path="industry" element={<Industry />} />
          <Route path="sheet" element={<BalanceSheet />} />
          <Route path="withcoopbank" element={<Capital />} />
          <Route path="allUsers" element={<UserList />} />
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

export default connect(mapStateToProps)(PrCooperativeReportViewer);
