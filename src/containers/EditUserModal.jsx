import React, { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { addressInfo } from "../constant/address";
import { API } from "../utils/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

const EditUserModal = ({
  dispatched,
  setDispatched,
  isPrCooperative,
  title,
  dataToEdit,
}) => {
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
    union: {
      unionId: "",
    },
    prCooperative: "",
  });

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

  useEffect(() => {
    let newZone = addressInfo
      .filter((item) => item.region === data.address.region)
      .map((item) => item?.zone[data.address.zone]);
    setZone(newZone);
  }, [data.address.zone, data.address.region]);

  useEffect(() => {
    const fetchData = async () => {
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
      await API.put(`/user/edit/${dataToEdit.userId}`, data).then((res) => {
        if (res.status === 200) {
          Alert("Updated Successfully", "success");
          dispatch({ type: "CLOSE_MODAL" });
          setDispatched(false);
        } else {
          Alert("Failed to Create User", "error");
          dispatch({ type: "CLOSE_MODAL" });
          setDispatched(false);
        }
        return res;
      });
    } catch (error) {
      Alert("Something went wrong", "error");
      dispatch({ type: "CLOSE_MODAL" });
      setDispatched(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      roles: [{ ...prevData.roles[0], [name]: value }],
    }));
  };

  const handlePrChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      prCooperative: {
        ...prevState.prCooperative,
        [name]: value,
      },
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
  const handleUnionChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      union: {
        ...prevState.union,
        [name]: value,
      },
    }));
  };

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    // dimmer: undefined,
  });
  const { open } = state;

  useEffect(() => {
    setData({
      fullName: dataToEdit?.fullName,
      username: dataToEdit?.username,
      address: {
        region: dataToEdit?.address.region,
        zone: dataToEdit?.address.zone,
        woreda: dataToEdit?.address.woreda,
        town: dataToEdit?.address.town,
        kebele: dataToEdit?.address.kebele,
        email: dataToEdit?.address.email,
        phoneNumber: dataToEdit?.address.phoneNumber,
      },
      roles: [
        {
          roleName: dataToEdit?.roles[0]?.roleName,
        },
      ],
      prCooperative: {
        prCooperativeId: dataToEdit?.prCooperative?.prCooperativeId,
      },
      union: {
        unionId: dataToEdit?.union?.unionId,
      },
    });
  }, [dataToEdit]);

  useEffect(() => {
    dispatched && dispatch({ type: "OPEN_MODAL" });
  }, [dispatched]);
  return (
    <Modal
      //   dimmer={dimmer}
      open={open}
      size="small"
      onClose={() => {
        dispatch({ type: "CLOSE_MODAL" });
        setDispatched(false);
      }}
    >
      <Modal.Header className="text-cyan-500">{title}</Modal.Header>
      <Modal.Content>
        <form className="ui form p-5" onSubmit={createUnion}>
          <div className="two fields">
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
            <div className="field">
              <label className="label">Role</label>
              <select
                className="ui dropdown"
                name="roleName"
                value={data.roles[0]?.roleName}
                onChange={handleRoleChange}
              >
                <option></option>
                {roles.map((item) => (
                  <option key={item.id} value={item.roleName}>
                    {item.roleName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="three fields">
            <div className="field">
              <label className="label">Union</label>
              <select
                className="ui dropdown"
                name="unionId"
                value={data.union.unionId}
                onChange={handleUnionChange}
              >
                <option></option>
                {unionFetched.map((item, index) => (
                  <option key={index} value={item.unionId}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label">Pr Cooperative</label>
              <select
                className="ui dropdown"
                name="prCooperativeId"
                value={data.prCooperative.prCooperativeId}
                onChange={handlePrChange}
              >
                <option></option>
                {prCooperative.map((item, index) => (
                  <option key={index} value={item.prCooperativeId}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="ui divider"></div>
          <div className="flex items-center justify-end my-5">
            <Button
              onClick={() => {
                dispatch({ type: "CLOSE_MODAL" });
                setDispatched(false);
              }}
            >
              Cancel
            </Button>
            <Button
              positive
              type="submit"
              style={{ backgroundColor: "#06B6D4" }}
            >
              Update
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default EditUserModal;
