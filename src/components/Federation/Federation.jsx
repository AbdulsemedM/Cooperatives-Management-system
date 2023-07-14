import FederationMenu from "./FederationMenu";
import FederationFilterMenu from "./FederationFilterMenu";
import { createStructuredSelector } from "reselect";
import { selectRole } from "../../redux/user/userSelector";
import { connect } from "react-redux";
import { setUpdatedState } from "../../redux/state-control/stateAction";
import { selectUpdatedState } from "../../redux/state-control/stateSelector";

const Federation = ({ role, updatedState, setUpdatedState }) => {
  return (
    <div className="border p-5 rounded shadow">
      <FederationMenu role={role} />
      <FederationFilterMenu
        role={role}
        setUpdatedState={setUpdatedState}
        updatedState={updatedState}
      />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  role: selectRole,

  updatedState: selectUpdatedState,
});

const mapDispatchToProps = (dispatch) => ({
  setUpdatedState: (item) => dispatch(setUpdatedState(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Federation);
