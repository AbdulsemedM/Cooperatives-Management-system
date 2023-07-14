import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { createStructuredSelector } from "reselect";
import { selectRole } from "../redux/user/userSelector";
import { connect } from "react-redux";

const CreateAccountBalanceModal = ({
  row,
  role,
  handleAssign,
  setSelectedPrId,
  setActionSelected,
  setDataToEdit,
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
        {role === "bankUser" && (
          <MenuItem
            onClick={() => {
              setDataToEdit(row);
              setActionSelected("account");
              setSelectedPrId(
                row?.account?.prCooperative
                  ? row?.account?.prCooperative?.prCooperativeId
                  : row?.account?.union
                  ? row?.account?.union?.unionId
                  : row?.account?.federation && row?.federation.federationId
              );
              handleAssign();
              handleClose();
            }}
          >
            Edit Balance
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

const mapSateToProps = createStructuredSelector({
  role: selectRole,
});

export default connect(mapSateToProps)(CreateAccountBalanceModal);
