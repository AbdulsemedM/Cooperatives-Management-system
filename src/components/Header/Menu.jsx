import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu, Popup } from "semantic-ui-react";
import NameAvatar from "./NameAvatar";
import "./Header.css";
import { logo2 } from "../../constant";
import {
  setActiveSidebarTab,
  setHiddenSidebar,
} from "../../redux/state-control/stateAction";
import { connect, useDispatch } from "react-redux";
import {
  setPrCooperativeId,
  setRefreshToken,
  setRole,
  setToken,
  setUnionId,
  setUserProfile,
} from "../../redux/user/userAction";
import { createStructuredSelector } from "reselect";
import {
  selectEmail,
  selectFullName,
  selectRole,
  selectUserProfileByName,
} from "../../redux/user/userSelector";

const MenuBar = ({
  SetHiddenSidebarFunc,
  selectName,
  role,
  fullName,
  userEmail,
}) => {
  const [notification, setNotification] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleItemClick = (name) => {
  //   navigate(`/${name}`);
  // };

  return (
    <div className="px-5 border bg-cyan-500 fixed left-0 md:left-0 right-0 top-0 z-[100]">
      <Menu secondary>
        {/* <Menu.Item onClick={() => handleItemClick("dashboard")}> */}
        <div className="flex items-center pl-1 text-2xl font-bold text-white">
          <span
            onClick={SetHiddenSidebarFunc}
            className="cursor-pointer text-gray-100 mr-3"
          >
            <i className="bars icon"></i>
          </span>
          <span className="text-white">
            <img src={logo2} alt="logo" width={90} />
          </span>
        </div>
        {/* </Menu.Item> */}
        <Menu.Menu position="right">
          {/* <Menu.Item>
            <div className="hidden md:flex">
              <div className="item">
                <div className="ui icon input">
                  <input type="text" placeholder="Search ..." />
                  <i className="search link icon"></i>
                </div>
              </div>
            </div>
          </Menu.Item> */}
          <Menu.Item>
            {notification ? (
              <Popup
                content="Turn off notification"
                trigger={
                  <i
                    className="bell text-white icon large"
                    style={{ cursor: "pointer" }}
                    onClick={() => setNotification(!notification)}
                  ></i>
                }
              />
            ) : (
              <Popup
                content="Turn on notification"
                trigger={
                  <i
                    className="bell text-white slash icon large"
                    style={{ cursor: "pointer" }}
                    onClick={() => setNotification(!notification)}
                  ></i>
                }
              />
            )}
            <Popup
              content="help"
              trigger={
                <i
                  className="question text-white circle icon large"
                  style={{ cursor: "pointer", marginRight: "1.5rem" }}
                ></i>
              }
            />
            <div className="mx-2">
              <span className="text-xl text-white">
                {role.includes("bank") ? "CBO" : selectName}
              </span>
            </div>
            <Dropdown
              icon={
                <NameAvatar name={role.includes("bank") ? "CBO" : selectName} />
              }
              floating
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header>
                  <div className="flex items-center w-full lowercase">
                    <NameAvatar
                      name={role.includes("bank") ? "CBO" : selectName}
                    />
                    <div className="flex flex-col ml-1">
                      <span className="text-xl font-bold capitalize">
                        {fullName}
                      </span>
                      <span className="">{userEmail}</span>
                    </div>
                  </div>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item
                  icon="user"
                  onClick={() => navigate("settings")}
                  text="My Account"
                />
                <Dropdown.Item
                  icon="setting"
                  onClick={() => navigate("settings")}
                  text="Settings"
                />
                <Dropdown.Divider />
                <Dropdown.Item
                  icon="sign-out"
                  onClick={() => {
                    dispatch(setRole([]));
                    dispatch(setPrCooperativeId(null));
                    dispatch(setRefreshToken(""));
                    dispatch(setToken(""));
                    dispatch(setUnionId(""));
                    dispatch(setActiveSidebarTab("dashboard"));
                    dispatch(setHiddenSidebar(true));
                    dispatch(setUserProfile({}));
                    navigate(`/`);
                  }}
                  text="Logout"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  selectName: selectUserProfileByName,
  role: selectRole,
  fullName: selectFullName,
  userEmail: selectEmail,
});

export default connect(mapStateToProps)(MenuBar);
