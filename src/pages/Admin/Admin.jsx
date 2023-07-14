import React from "react";
import { Route, Routes } from "react-router-dom";
import Industry from "../../components/Industry/Industry";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreateUser from "../../components/User/CreateUser";
import UserList from "../../components/User/UserList";
import { connect } from "react-redux";
import { selectHiddenSidebarState } from "../../redux/state-control/stateSelector";
import { createStructuredSelector } from "reselect";
import "./../../components/Sidebar/Sidebar.css";
import SettingsPage from "../Settings/SettingPage";

const Admin = ({ hidden_sidebar }) => {
  return (
    <div>
      <Sidebar />
      <div
        className={`${
          hidden_sidebar ? "md:ml-80" : ""
        } sidebar-animation mt-24 mx-4 md:mx-10`}
      >
        <Routes>
          <Route path="createUser" element={<CreateUser />} />
          <Route path="/" element={<UserList />} />
          <Route path="industry" element={<Industry />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  hidden_sidebar: selectHiddenSidebarState,
});

export default connect(mapStateToProps)(Admin);
