import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "semantic-ui-react";
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

const CreateMemberModal = ({
  dispatched,
  setDispatched,
  title,
  role,
  prCooperativeID,
  edit,
  selectedPrId,
  dataToEdit,
  unionID,
  setUpdatedState,
}) => {
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

  const [zone, setZone] = useState([]);
  const [prFetched, setPrFetched] = useState([]);
  // const [unionFetched, setUnionFetched] = useState([]);
  // console.log(unionFetched);

  const [data, setData] = useState({
    fullName: "",
    gender: "",
    dateCreated: "",
    isFounder: false,
    address: {
      region: "",
      zone: "",
      woreda: "",
      town: "",
      kebele: "",
      email: "",
      phoneNumber: "",
    },
    prCooperative:
      role === "primaryCooperativeUser"
        ? {
            prCooperativeId: prCooperativeID,
          }
        : null,
    union:
      role === "unionUser"
        ? {
            unionId: unionID,
          }
        : role === "primaryCooperativeUser" && unionID
        ? {
            unionId: unionID,
          }
        : null,
  });

  useEffect(() => {
    let newZone = addressInfo
      .filter((item) => item.region === data.address.region)
      .map((item) => item?.zone[data.address.zone]);
    setZone(newZone);
  }, [data.address.zone, data.address.region]);

  useEffect(() => {
    const fetchData = async () => {
      role === "bankUser" &&
        (await API.get("/prCooperatives/getPrCooperatives").then((res) => {
          setPrFetched(res.data);
        }));
      role === "unionUser" &&
        (await API.get(`/prCooperatives/union/${unionID}`).then((res) => {
          setPrFetched(res.data);
        }));
    };
    fetchData();
  }, [role, unionID]);
  const prOptions = prFetched?.map((item) => ({
    key: item?.prCooperativeId,
    text: item?.name,
    union: item?.union?.unionId,
    value: item?.prCooperativeId,
  }));

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

  const handlePrChange = (event, data) => {
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

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    // dimmer: undefined,
  });
  const { open } = state;

  const createMember = async (e) => {
    e.preventDefault();
    try {
      (await edit)
        ? API.put(`/member/edit/${dataToEdit.memberId}`, data).then((res) => {
            if (res.status === 200) {
              Alert("Updated Succesfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
              setUpdatedState("member");
            } else {
              Alert("Failed to Edit Member", "error");
            }
            return res;
          })
        : API.post("/member/add", data).then((res) => {
            if (res.status === 200) {
              Alert("Created Succesfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
              setUpdatedState("member");
            } else {
              Alert("Failed to create member", "error");
            }
            return res;
          });
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        Alert("Something went wrong", "error");
      } else if (error.code === "ERR_NETWORK") {
        Alert("Network Error", "error");
      }
      // dispatch({ type: "CLOSE_MODAL" });
      // setDispatched(false);
    }
  };

  useEffect(() => {
    dataToEdit &&
      setData({
        name: dataToEdit?.name,
        fullName: dataToEdit?.fullName,
        gender: dataToEdit?.gender,
        dateCreated: dataToEdit?.dateCreated,
        isFounder: false,
        address: {
          region: dataToEdit?.address?.region,
          zone: dataToEdit?.address?.zone,
          woreda: dataToEdit?.address?.woreda,
          town: dataToEdit?.address?.town,
          kebele: dataToEdit?.address?.kebele,
          email: dataToEdit?.address?.email,
          phoneNumber: dataToEdit?.address?.phoneNumber,
        },
        union:
          role === "bankUser" && dataToEdit?.union?.unionId
            ? {
                unionId: dataToEdit?.union?.unionId,
              }
            : role === "unionUser"
            ? {
                unionId: unionID,
              }
            : null,
        prCooperative:
          role === "primaryCooperativeUser"
            ? {
                prCooperativeId: prCooperativeID,
              }
            : dataToEdit?.prCooperative?.prCooperativeId && {
                prCooperativeId: dataToEdit?.prCooperative?.prCooperativeId,
              },
      });
    selectedPrId &&
      setData({
        name: "",
        fullName: "",
        gender: "",
        dateCreated: "",
        isFounder: false,
        address: {
          region: selectedPrId?.address?.region,
          zone: selectedPrId?.address?.zone,
          woreda: selectedPrId?.address?.woreda,
          town: "",
          kebele: "",
          email: "",
          phoneNumber: "",
        },
        union: selectedPrId?.union?.unionId
          ? {
              unionId: selectedPrId?.union?.unionId,
            }
          : null,
        prCooperative: selectedPrId?.prCooperativeId
          ? {
              prCooperativeId: selectedPrId?.prCooperativeId,
            }
          : null,
      });
  }, [dataToEdit, unionID, role, prCooperativeID, selectedPrId]);

  useEffect(() => {
    dispatched && dispatch({ type: "OPEN_MODAL" });
  }, [dispatched]);
  return (
    <Modal
      //   dimmer={dimmer}
      open={open}
      // size="medium"
      onClose={() => {
        dispatch({ type: "CLOSE_MODAL" });
        setDispatched(false);
      }}
    >
      <Modal.Header className="text-cyan-500">{title}</Modal.Header>
      <Modal.Content>
        <form className="ui form p-5" onSubmit={createMember}>
          <div className="three fields">
            <div className="field">
              <label htmlFor="fullName" className="label">
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
            {(role === "unionUser" || role === "bankUser") && (
              <div className="field">
                <label className="label">Pr Cooperative</label>
                <Dropdown
                  placeholder="Pr cooperatives"
                  search
                  selection
                  options={prOptions}
                  value={data.prCooperative?.prCooperativeId} // Bind the selected value to the state
                  onChange={handlePrChange}
                  clearable
                />
              </div>
            )}
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
              <label className="label">Gender</label>
              <select
                className="ui dropdown"
                name="gender"
                value={data.gender}
                onChange={handleChange}
              >
                <option></option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="phonenumber" className="label">
                Date Registered:
              </label>
              <input
                type="date"
                id="dateCreated"
                name="dateCreated"
                value={data.dateCreated}
                onChange={handleChange}
                placeholder="Registration Date"
                required
              />
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
              Register
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default CreateMemberModal;
