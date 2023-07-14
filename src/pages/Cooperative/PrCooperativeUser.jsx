import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import SellAndTurnOver from "../../components/Sell and Turnover/SellAndTurnOver";
import { connect } from "react-redux";
import { selectHiddenSidebarState } from "../../redux/state-control/stateSelector";
import { createStructuredSelector } from "reselect";
import Capital from "../../components/Capital/Capital";
import BalanceSheet from "../../components/Balance Sheet/BalanceSheet";
import Members from "../../components/Members/Members";
import SettingsPage from "../Settings/SettingPage";

const PrCooperativeUser = ({ hidden_sidebar }) => {
  return (
    <div>
      <Sidebar />
      <div
        className={`${
          hidden_sidebar ? "md:ml-80" : ""
        } sidebar-animation mt-24 mx-4 md:mx-10`}
      >
        <Routes>
          <Route path="" element={<Members />} />
          <Route path="sellandturnover" element={<SellAndTurnOver />} />
          <Route path="sheet" element={<BalanceSheet />} />
          <Route path="withcoopbank" element={<Capital />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  hidden_sidebar: selectHiddenSidebarState,
});

export default connect(mapStateToProps)(PrCooperativeUser);
