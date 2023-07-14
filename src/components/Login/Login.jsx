import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cmsLogo, logo2 } from "../../constant";
import {
  setPrCooperativeId,
  setRefreshToken,
  setRole,
  setToken,
  setUnionId,
  setUserProfile,
} from "../../redux/user/userAction";
import { API, LOGIN } from "../../utils/API";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { connect } from "react-redux";
import {
  setActiveSidebarTab,
  setHiddenSidebar,
} from "../../redux/state-control/stateAction";
import Spinner from "../Spinner/Spinner";
import "./login.css";

const Login = ({
  setAccessToken,
  setRefreshToken,
  setRole,
  setPrCooperativeId,
  setUnionId,
  setProfile,
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data, //spread operator
      [name]: value,
    });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setData({
        username: storedUsername,
        password: storedPassword,
      });
    }
  }, []);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // console.log("data", data);
      const response = await LOGIN.post("/login", data).then((res) => res);
      // console.log(response.status);
      if (response.status === 200) {
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        const decoded = jwtDecode(access_token);
        const decode2 = jwtDecode(refresh_token);
        console.log("refresh",new Date(decode2.exp *1000))
        setRole(decoded.roles);
        setUnionId(decoded.unionId);
        setPrCooperativeId(decoded.prCooperativeId);
        setActiveSidebarTab("dashboard");
        const nav = decoded.roles[0];
        await API.get(`/users/getUserByPhone/${data.username}`, data).then(
          (res) => setProfile(res.data)
        );

        // console.log(decoded);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate(`${nav}/`);
        setLoading(false);

        const rememberMe = e.target.elements.rememberMe.checked;
        if (rememberMe) {
          localStorage.setItem("username", data.username);
          localStorage.setItem("password", data.password);
        }
      }
    } catch (error) {
      // console.log(error);
      if (error.code === "ERR_BAD_REQUEST") {
        setMessage("Wrong username or password");
      } else if (error.code === "ERR_NETWORK") {
        setMessage("Network Error");
      }
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && (
        <div className="fixed right-1/2 top-1/2 z-[100]">
          <Spinner />
        </div>
      )}

      <section className={`dark:bg-gray-900 ${loading && "opacity-50"}`}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 shadow">
          <div className="flex w-full items-center justify-center">
            <div className="w-full flex justify-center">
              <div className="w-full bg-gradient-to-r text-white bg-gray-400 to-cyan-400 from-blue-500 dark:from-gray-00 dark:to-gray-600 hidden md:block rounded-l-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-center p-8">
                  <img src={logo2} alt="logo" width={120} />
                  <div className="flex flex-col text-white font-bold ml-5 text-sm">
                    <span>Baankii Hojii Gamtaa Oromiyaa</span>
                    <span>የኦሮሚያ ኅብረት ሥራ ባንክ</span>
                  </div>
                </div>
                <div className="flex-1 items-center  justify-center text-2xl font-bold px-16 py-3">
                  <span>Cooperative Societies Data Management System</span>
                </div>
                <div className="p-10">
                  <span className="text-4xl italic">"</span>
                  <h3 className=" text-xl font-bold flex justify-center items-center">
                    Welcome to Cooperative Societies Data Base for CoopBank of
                    Oromia, Sh.C.
                  </h3>
                  <span className="float-right text-4xl italic">"</span>
                </div>
              </div>
              <div className="w-full bg-white rounded-r-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-center">
                  <img src={cmsLogo} alt="logo" width={175} />
                </div>
                <div className="space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  {message && (
                    <span className="text-red-500 border rounded-lg bg-red-50 flex px-2 py-3">
                      {message}
                    </span>
                  )}
                  <form className="space-y-4 md:space-y-6 pb-5" action="#">
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm align-left font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={data.username}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                        placeholder="Username"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="rememberMe"
                            aria-describedby="remember"
                            type="checkbox"
                            disabled={loading}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-cyan-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800"
                            required=""
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="rememberMe"
                            className="text-gray-500 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <Link
                        to="/forgotpassword"
                        hidden={loading}
                        className="text-sm disabled font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      onClick={handleLogin}
                      className="w-full text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAccessToken: (item) => dispatch(setToken(item)),
  setRefreshToken: (item) => dispatch(setRefreshToken(item)),
  setRole: (item) => dispatch(setRole(item)),
  setUnionId: (item) => dispatch(setUnionId(item)),
  setHidden: (item) => dispatch(setHiddenSidebar(item)),
  setPrCooperativeId: (item) => dispatch(setPrCooperativeId(item)),
  setProfile: (item) => dispatch(setUserProfile(item)),
  setActivesidebarTab: (item) => dispatch(setActiveSidebarTab(item)),
});

export default connect(null, mapDispatchToProps)(Login);
