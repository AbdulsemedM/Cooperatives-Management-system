import { connect } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectRole } from "../../redux/user/userSelector";

const RequireAuth = ({ allowedRoles, roles }) => {
  const location = useLocation();
  return roles === allowedRoles ? (
    <Outlet />
  ) : roles ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

const mapStateToProps = createStructuredSelector({
  roles: selectRole,
});

export default connect(mapStateToProps)(RequireAuth);
