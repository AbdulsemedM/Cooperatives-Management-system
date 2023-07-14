import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./utils/Layout";
import Admin from "./pages/Admin/Admin";
import RequireAuth from "./components/Auth/RequireAuth";
import BankUser from "./pages/Admin/BankUser";
import ReportViewer from "./pages/Admin/ReportViewer";
import PrCooperativeUser from "./pages/Cooperative/PrCooperativeUser";
import PrCooperativeReportViewer from "./pages/Cooperative/PrCooperativeReportViewer";
import PrCooperativesAdmin from "./pages/Cooperative/PrCooperativesAdmin";
import UnionAdmin from "./pages/Union/UnionAdmin";
import UnionReportViewer from "./pages/Union/UnionReportViewer";
import UnionUser from "./pages/Union/UnionUser";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Login />} />
          <Route element={<RequireAuth allowedRoles={"bankAdmin"} />}>
            <Route path="/bankAdmin/*" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={"bankUser"} />}>
            <Route path="/bankUser/*" element={<BankUser />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={"bankReportViewer"} />}>
            <Route path="/bankReportViewer/*" element={<ReportViewer />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={"primaryCooperativeUser"} />}
          >
            <Route
              path="/primaryCooperativeUser/*"
              element={<PrCooperativeUser />}
            />
          </Route>
          <Route
            element={
              <RequireAuth allowedRoles={"primaryCooperativeReportViewer"} />
            }
          >
            <Route
              path="/primaryCooperativeReportViewer/*"
              element={<PrCooperativeReportViewer />}
            />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={"primaryCooperativeAdmin"} />}
          >
            <Route
              path="/primaryCooperativeAdmin/*"
              element={<PrCooperativesAdmin />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={"unionAdmin"} />}>
            <Route path="/unionAdmin/*" element={<UnionAdmin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={"unionUser"} />}>
            <Route path="/unionUser/*" element={<UnionUser />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={"unionReportViewer"} />}>
            <Route
              path="/unionReportViewer/*"
              element={<UnionReportViewer />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
