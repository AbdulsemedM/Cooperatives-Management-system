import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import { addressInfo } from "../../constant/address";
import { API } from "../../utils/API";
import { connect } from "react-redux";
import {
  selectPrCooperativeID,
  selectRole,
  selectUnionID,
} from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CreateUser = ({ role, unionID, prCooperativeID }) => {
  const [zone, setZone] = useState([]);
  const [prCooperative, setPrCooperative] = useState([]);
  const [roles, setRoles] = useState([]);
  const [unionFetched, setUnionFetched] = useState([]);

  const MySwal = withReactContent(Swal);
  let timerInterval;
  const Alert = (message, icon) => {
    MySwal.fire({
      icon: icon,
      position: "top-end",
      html: message ? message : "message not returned",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  };

  const [data, setData] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    address: {
      region: "",
      zone: "",
      woreda: "",
      town: "",
      kebele: "",
      email: "",
      phoneNumber: "",
    },
    roles: [
      {
        roleName: "",
      },
    ],
    union:
      role === "unionAdmin"
        ? {
            unionId: unionID,
          }
        : role === "primaryCooperativeAdmin" && unionID?.length
        ? {
            unionId: unionID,
          }
        : null,
    prCooperative:
      role === "primaryCooperativeAdmin"
        ? {
            prCooperativeId: prCooperativeID,
          }
        : null,
  });

  useEffect(() => {
    let newZone = addressInfo
      .filter((item) => item.region === data.address.region)
      .map((item) => item?.zone[data.address.zone]);
    setZone(newZone);
  }, [data.address.zone, data.address.region, prCooperative]);

  useEffect(() => {
    const fetchData = async () => {
      await API.get("/prCooperatives/getPrCooperatives").then((res) => {
        setPrCooperative(res.data);
      });
      await API.get("/role/getRoles").then((res) => {
        setRoles(res.data);
      });
      await API.get("/union/getUnions").then((res) => {
        setUnionFetched(res.data);
      });
    };
    fetchData();
  }, []);

  const createUnion = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      await API.post("/users/createUser", data).then((res) => {
        if (res.status === 200) {
          Alert("Created Succesfully", "success");
          setData({
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            address: {
              region: "",
              zone: "",
              woreda: "",
              town: "",
              kebele: "",
              email: "",
              phoneNumber: "",
            },
            roles: [
              {
                roleName: "",
              },
            ],
            union:
              role === "unionAdmin"
                ? {
                    unionId: unionID,
                  }
                : role === "primaryCooperativeAdmin" && unionID?.length
                ? {
                    unionId: unionID,
                  }
                : null,
            prCooperative:
              role === "primaryCooperativeAdmin"
                ? {
                    prCooperativeId: prCooperativeID,
                  }
                : null,
          });
          // console.log("success");
        } else {
          Alert("Failed to Create User", "error");
        }
      });
      // console.log(result);
    } catch (error) {
      Alert("Failed to Create User", "error");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleRoleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      prCooperative: null,
      union: null,
    });
    const roles = [...data.roles];
    roles[0] = { ...roles[0], [name]: value };
    setData({ ...data, roles });
  };

  const unOptions = unionFetched?.map((item) => ({
    key: item?.unionId,
    text: item?.name,
    value: item?.unionId,
  }));

  const prOptions = prCooperative?.map((item) => ({
    key: item?.prCooperativeId,
    text: item?.name,
    union: item?.union?.unionId,
    value: item?.prCooperativeId,
  }));

  const handlePrCooperativeChange = (event, data) => {
    const unionIdofpr = data?.options?.filter(
      (item) => item.value === data.value
    );
    setData((prevData) => ({
      ...prevData,
      union: unionIdofpr[0]?.union
        ? {
            unionId: unionIdofpr[0]?.union,
          }
        : null,
      prCooperative: {
        prCooperativeId: data.value, // Update the prCooperativeId property with the selected value
      },
    }));
  };

  const handleUnionChange = (event, data) => {
    setData((prevData) => ({
      ...prevData,
      union: data.value
        ? {
            unionId: data.value, // Update the unionId property with the selected value
          }
        : null,
      prCooperative: null,
    }));
  };

  return (
    <div>
      <div className="border bg-white shadow rounded my-4">
        <h4 className="flex items-center justify-start p-2 text-cyan-500 font-bold text-xl bg-gray-200">
          Create User
        </h4>

        <form className="ui form p-5" onSubmit={createUnion}>
          <div className="four fields">
            <div className="field">
              <label htmlFor="fullName" className="label">
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={data.fullName}
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="username" className="label">
                UserName:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={data.username}
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="cpassword" className="label">
                Confirm Password:
              </label>
              <input
                type="password"
                id="cpassword"
                name="confirmPassword"
                value={data.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
              {data.confirmPassword === ""
                ? ""
                : data.password !== data.confirmPassword && (
                    <span className="text-sm text-red-500">
                      Password not match
                    </span>
                  )}
            </div>
          </div>
          <h4 className="ui header">Address</h4>
          <div className="ui divider"></div>
          <div className="three fields">
            <div className="field">
              <label className="label">Region</label>
              <select
                className="ui dropdown"
                name="region"
                value={data.address.region}
                onChange={handleAddressChange}
                required
              >
                <option></option>
                {addressInfo.map((item, index) => (
                  <option key={index} value={item.region}>
                    {item.region}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label">Zone</label>
              <select
                className="ui dropdown"
                name="zone"
                value={data.address.zone}
                onChange={handleAddressChange}
                disabled={data.address.region ? false : true}
              >
                <option></option>
                {addressInfo
                  .filter((item) => item.region === data.address.region)
                  .map((item, index) => {
                    const keys = item.zone ? Object.keys(item?.zone) : "";
                    //   console.log(item?.zone["Bale"]);
                    return (
                      keys instanceof Array &&
                      keys?.map((key) => {
                        return (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        );
                      })
                    );
                  })}
              </select>
            </div>
            <div className="field">
              <label className="label">Woreda</label>
              <select
                className="ui dropdown"
                name="woreda"
                value={data.address.woreda}
                onChange={handleAddressChange}
                disabled={data.address.zone ? false : true}
              >
                <option></option>
                {zone[0]?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              <label htmlFor="town" className="label">
                Town:
              </label>
              <input
                type="text"
                id="town"
                name="town"
                value={data.address.town}
                onChange={handleAddressChange}
                placeholder="Town"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="kebele" className="label">
                Kebele:
              </label>
              <input
                type="text"
                id="kebele"
                name="kebele"
                value={data.address.kebele}
                onChange={handleAddressChange}
                placeholder="Kebele"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email" className="label">
                E-mail:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.address.email}
                onChange={handleAddressChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              <label htmlFor="phonenumber" className="label">
                Phone Number:
              </label>
              <input
                type="text"
                id="phonenumber"
                name="phoneNumber"
                value={data.address.phoneNumber}
                onChange={handleAddressChange}
                placeholder="Mobile Number"
                required
              />
            </div>
            {(role === "bankAdmin" ||
              role === "unionAdmin" ||
              role === "primaryCooperativeAdmin") && (
              <div className="field">
                <label className="label">Role</label>
                <select
                  className="ui dropdown"
                  name="roleName"
                  value={data.roles[0].roleName}
                  onChange={handleRoleChange}
                >
                  <option></option>
                  {roles
                    .filter((item) =>
                      role === "bankAdmin"
                        ? item.roleName !== "superAdmin"
                        : role === "unionAdmin"
                        ? item?.roleName?.includes("union")
                        : role === "primaryCooperativeAdmin" &&
                          item?.roleName?.includes("primary")
                    )
                    .map((item) => (
                      <option key={item.id} value={item.roleName}>
                        {item.roleName}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {role === "bankAdmin" &&
              data.roles[0]?.roleName?.includes("primary") && (
                <div className="field">
                  <label className="label">Pr Cooperative</label>
                  <Dropdown
                    placeholder="Pr cooperatives"
                    search
                    clearable
                    selection
                    options={prOptions}
                    value={data.prCooperative?.prCooperativeId} // Bind the selected value to the state
                    onChange={handlePrCooperativeChange}
                  />
                </div>
              )}
            {role === "bankAdmin" &&
              data.roles[0]?.roleName?.includes("union") && (
                <div className="field">
                  <label className="label">Union</label>
                  <Dropdown
                    placeholder="Union"
                    search
                    clearable
                    selection
                    options={unOptions}
                    value={data.union?.unionId} // Bind the selected value to the state
                    onChange={handleUnionChange}
                  />
                </div>
              )}
          </div>
          <div className="ui divider"></div>
          <div className="flex items-center justify-end my-5 ">
            <Button
              disabled={data.password !== data.confirmPassword}
              positive
              type="submit"
              style={{ backgroundColor: "#06B6D4" }}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  role: selectRole,
  unionID: selectUnionID,
  prCooperativeID: selectPrCooperativeID,
});
export default connect(mapStateToProps)(CreateUser);
