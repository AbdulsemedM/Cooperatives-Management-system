import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectHiddenSidebarState } from "../../redux/state-control/stateSelector";
import CreateUser from "../../components/User/CreateUser";
import UserList from "../../components/User/UserList";
import SettingsPage from "../Settings/SettingPage";

const Unions = ({ hidden_sidebar }) => {
  return (
    <div>
      <Sidebar />
      <div
        className={`${
          hidden_sidebar ? "md:ml-80" : ""
        } sidebar-animation mt-24 mx-4 md:mx-10`}
      >
        <Routes>
          <Route path="" element={<CreateUser />} />
          <Route path="allUsers" element={<UserList />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  hidden_sidebar: selectHiddenSidebarState,
});

export default connect(mapStateToProps)(Unions);
