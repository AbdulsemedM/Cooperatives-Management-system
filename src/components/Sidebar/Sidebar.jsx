import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarConfig } from "../../constant/sidebarConfig";
import MenuBar from "../Header/Menu";
import "./Sidebar.css";
import { createStructuredSelector } from "reselect";
import {
  selectActiveSidebarTab,
  selectHiddenSidebarState,
} from "../../redux/state-control/stateSelector";
import { connect } from "react-redux";
import {
  setActiveSidebarTab,
  setHiddenSidebar,
} from "../../redux/state-control/stateAction";
import { selectRole } from "../../redux/user/userSelector";

const Sidebar = ({
  role,
  hidden_sidebar,
  setHiddenSidebar,
  activeSidebarTab,
  setSidebarTab,
}) => {
  const [showDropdown, setShowDropdown] = useState();

  const items = sidebarConfig[role];

  const SetHiddenSidebarFunc = () => {
    setHiddenSidebar(!hidden_sidebar);
  };
  return (
    <div>
      <MenuBar SetHiddenSidebarFunc={SetHiddenSidebarFunc} />
      <aside
        className={`${
          !hidden_sidebar && "hidden md:block sidebar-container"
        }  fixed top-0 text-lg left-0 z-40 w-72 h-screen bg-white drop-shadow-md sidebar-animation border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-24 flex flex-col items-end bg-white justify-center"></div>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {items?.map((item, index) => {
              return (
                <li key={index}>
                  <div className="flex flex-col">
                    <div>
                      <Link
                        to={!item.items && item.path}
                        onClick={() => {
                          item.items
                            ? item.id === showDropdown
                              ? setShowDropdown()
                              : setShowDropdown(item.id)
                            : setSidebarTab(item?.label?.toLocaleLowerCase());
                          // SetHiddenSidebarFunc();
                        }}
                        className={`${
                          activeSidebarTab === item.label?.toLocaleLowerCase()
                            ? "bg-gray-100 text-cyan-500"
                            : "text-gray-600"
                        } flex items-center whitespace-nowrap px-2 rounded-lg dark:text-white hover:text-cyan-500 hover:bg-gray-100 dark:hover:bg-gray-700`}
                      >
                        <div className="w-full flex items-center justify-between">
                          <div>
                            <span className="text-cyan-700">{item.icon}</span>
                            <span className="ml-3">{item.label}</span>
                          </div>
                          {item.items && (
                            <div
                              className={`${
                                showDropdown === item.id && "rotate-180"
                              } transition-transform ease-in`}
                            >
                              <i className="angle down icon"></i>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                    <div className="sidebar-animation">
                      {item.id === showDropdown &&
                        item.items &&
                        item.items.map((innerItem, index) => (
                          <div key={index} className="ml-5 p-2 border-l">
                            <Link
                              to={innerItem.path}
                              onClick={() => {
                                setSidebarTab(
                                  innerItem?.label?.toLocaleLowerCase()
                                );
                                // SetHiddenSidebarFunc();
                              }}
                              className={`${
                                activeSidebarTab ===
                                innerItem.label?.toLocaleLowerCase()
                                  ? "bg-gray-100 text-cyan-500"
                                  : "text-gray-500 "
                              } flex items-center px-2 whitespace-nowrap rounded-lg dark:text-white hover:text-cyan-500 hover:bg-gray-100 dark:hover:bg-gray-700`}
                            >
                              <span className="pr-2 text-cyan-700">
                                {innerItem.icon}
                              </span>
                              <span className="">{innerItem.label}</span>
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  hidden_sidebar: selectHiddenSidebarState,
  role: selectRole,
  activeSidebarTab: selectActiveSidebarTab,
});
const mapDispatchToProps = (dispatch) => ({
  setHiddenSidebar: (item) => dispatch(setHiddenSidebar(item)),
  setSidebarTab: (item) => dispatch(setActiveSidebarTab(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
