import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectRole } from "../redux/user/userSelector";
import { connect } from "react-redux";

const ActionDropdown = ({
  row,
  role,
  isUnion,
  handleAssign,
  setSelectedPrId,
  setSelectedUnionId,
  setActionSelected,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   isUnion
  //     ? setSelectedUnionId(row?.unionId)
  //     : setSelectedPrId(row?.prCooperativeId);
  //   // eslint-disable-next-line
  // }, [isUnion, row?.unionId, row?.prCooperativeId]);

  return (
    <>
      <IconButton onClick={handleClick}>
        <span className="text-xl -mt-2 cursor-pointer">
          <i className="add text-cyan-500 icon"></i>
        </span>
      </IconButton>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isUnion ? (
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            <Link
              to={`addPC?unionId=${row?.unionId}&region=${row?.address?.region}&zone=${row?.address?.zone}&woreda=${row?.address?.woreda}`}
            >
              Add PC
            </Link>
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              setActionSelected("individualMember");
              setSelectedPrId(row);
              handleAssign();
              handleClose();
            }}
          >
            Add Member
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            setActionSelected("asset");
            isUnion
              ? setSelectedUnionId(row?.unionId)
              : setSelectedPrId(row?.prCooperativeId);
            handleAssign();
            handleClose();
          }}
        >
          Add Asset
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActionSelected("liability");
            isUnion
              ? setSelectedUnionId(row?.unionId)
              : setSelectedPrId(row?.prCooperativeId);
            handleAssign();
            handleClose();
          }}
        >
          Add Liability
        </MenuItem>
        <MenuItem
          onClick={() => {
            setActionSelected("commodity");
            isUnion
              ? setSelectedUnionId(row?.unionId)
              : setSelectedPrId(row?.prCooperativeId);
            handleAssign();
            handleClose();
          }}
        >
          Add Commodity
        </MenuItem>
        {role.includes("bank") && (
          <MenuItem
            onClick={() => {
              setActionSelected("paidUpShare");
              isUnion
                ? setSelectedUnionId(row?.unionId)
                : setSelectedPrId(row?.prCooperativeId);
              handleAssign();
              handleClose();
            }}
          >
            Add Paid-up Share
          </MenuItem>
        )}
        {role.includes("bank") && (
          <MenuItem
            onClick={() => {
              setActionSelected("osLoan");
              isUnion
                ? setSelectedUnionId(row?.unionId)
                : setSelectedPrId(row?.prCooperativeId);
              handleAssign();
              handleClose();
            }}
          >
            Add OS Loan
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setActionSelected("account");
            isUnion
              ? setSelectedUnionId(row?.unionId)
              : setSelectedPrId(row?.prCooperativeId);
            handleAssign();
            handleClose();
          }}
        >
          Add Account
        </MenuItem>
      </Menu>
    </>
  );
};

const mapSateToProps = createStructuredSelector({
  role: selectRole,
});

export default connect(mapSateToProps)(ActionDropdown);
