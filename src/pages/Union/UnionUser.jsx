import React from "react";
import { Route, Routes } from "react-router-dom";
import Capital from "../../components/Capital/Capital";
import Sidebar from "../../components/Sidebar/Sidebar";
import Member from "../../components/Members/Members";
import SellAndTurnOver from "../../components/Sell and Turnover/SellAndTurnOver";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectHiddenSidebarState } from "../../redux/state-control/stateSelector";
import BalanceSheet from "../../components/Balance Sheet/BalanceSheet";
import UnionList from "../../components/Unions/UnionList";
import CreateUnion from "../../components/Unions/CreateUnion";
import SettingsPage from "../Settings/SettingPage";

const UnionUser = ({ hidden_sidebar }) => {
  return (
    <div>
      <Sidebar />
      <div
        className={`${
          hidden_sidebar ? "md:ml-80" : ""
        } sidebar-animation mt-24 mx-4 md:mx-10`}
      >
        <Routes>
          <Route path="members" element={<Member />} />
          <Route path="sellandturnover" element={<SellAndTurnOver />} />
          <Route path="sheet" element={<BalanceSheet />} />
          <Route path="withcoopbank" element={<Capital />} />
          <Route path="" element={<UnionList isPrCooperative={true} />} />
          <Route
            path="addPC"
            element={<CreateUnion isPrCooperative={true} />}
          />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  hidden_sidebar: selectHiddenSidebarState,
});

export default connect(mapStateToProps)(UnionUser);
