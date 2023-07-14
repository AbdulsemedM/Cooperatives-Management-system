import React, { useEffect, useState } from "react";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import { connect, useDispatch, useSelector } from "react-redux";
import SellAndTurnOverMenu from "./SellAndTurnOverMenu";
import SellAndTurnOverFilterMenu from "./SellAndTurnOverFilterMenu";
import {
  getFederationData,
  getPCData,
  getUnionData,
} from "../../redux/actions/union.action";

const SellAndTurnOver = ({ role, prCooperativeID, unionID }) => {
  const [dataToEdit, setDataToEdit] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      role === "bankUser" && dispatch(getUnionData());
      role === "bankUser" && dispatch(getFederationData());
      role === "bankUser" &&
        dispatch(getPCData()) &&
        dispatch(getPCData(unionID));
    };
    fetchData();
  }, [role, unionID, dispatch]);

  const unionsData = useSelector((state) => state.unions);
  const { federation, unions, pc } = unionsData;
  const [filterBy, setFilterBy] = useState({
    option:
      role === "primaryCooperativeUser" ||
      role === "primaryCooperativeReportViewer"
        ? "prCooperative"
        : role.includes("union")
        ? "union"
        : "federation",
    searchInput: "",
  });

  return (
    <div>
      <h1>
        {role === "bankUser" || role === "bankReportViewer" ? (
          <span>Annual Sell and Turnover</span>
        ) : role === "unionUser" || role === "unionReportViewer" ? (
          <span>Annual Turnover</span>
        ) : (
          (role === "primaryCooperativeReportViewer" ||
            role === "primaryCooperativeUser") && <span>Annual Sale</span>
        )}
      </h1>

      <div
        className={`${
          (role === "bankUser" ||
            role === "unionUser" ||
            role === "primaryCooperativeUser") &&
          "border p-5 rounded bg-white shadow mb-10"
        }`}
      >
        <SellAndTurnOverMenu
          role={role}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          dataToEdit={dataToEdit}
          unionID={unionID}
          filterBy={filterBy}
          prCooperativeID={prCooperativeID}
          prCooperative={pc}
          union={unions}
          federation={federation}
        />
      </div>
      <div className="border p-5 rounded shadow">
        <SellAndTurnOverFilterMenu
          role={role}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          setIsEdit={setIsEdit}
          setDataToEdit={setDataToEdit}
          unionID={unionID}
          prCooperativeID={prCooperativeID}
          prCooperative={pc}
          union={unions}
          federation={federation}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
  role: selectRole,
});

export default connect(mapStateToProps)(SellAndTurnOver);
