import React, { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { API } from "../utils/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { addressInfo } from "../constant/address";
import { useDispatch, useSelector } from "react-redux";
import { getSectorData, getTypeData } from "../redux/actions/industry.action";

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

const CreateFederationModal = ({
  dispatched,
  setDispatched,
  title,
  edit,
  dataToEdit,
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
  // const [typeFetched, setTypeFetched] = useState([]);
  // const [sectorFetched, setSectorFetched] = useState([]);
  const [zone, setZone] = useState([]);
  const [data, setData] = useState({
    name: "",
    yearOfEstablishmnet: "",
    shareCapitalUpOnEstablishement: "",
    isActive: "",
    address: {
      region: "",
      zone: "",
      woreda: "",
      town: "",
      kebele: "",
      email: "",
      phoneNumber: "",
    },
    type: {
      typeId: "",
    },
    sector: {
      sectorId: "",
    },
  });
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    // dimmer: undefined,
  });
  const { open } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data, //spread operator
      [name]: value,
    });
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
  const handleTypeChange = (event) => {
    const { value } = event.target;
    setData((prevState) => ({
      ...prevState,
      type: {
        typeId: value,
      },
    }));
  };
  const handleSectorChange = (event) => {
    const { value } = event.target;
    setData((prevState) => ({
      ...prevState,
      sector: {
        sectorId: value,
      },
    }));
  };

  const registerFederation = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      (await edit)
        ? API.put(`/federation/edit/${dataToEdit.federationId}`, data).then(
            (res) => {
              if (res.status === 200) {
                Alert("Updated Successfully", "success");
                dispatch({ type: "CLOSE_MODAL" });
                setDispatched(false);
              } else {
                // console.log("failed");
                Alert("Failed to update sector", "error");
                dispatch({ type: "CLOSE_MODAL" });
                setDispatched(false);
              }
              return res;
            }
          )
        : API.post(`/federation/add`, data).then((res) => {
            if (res.status === 200) {
              Alert("Created Successfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
              setUpdatedState("federation");
            } else {
              // console.log("failed");
              Alert("Failed to Create Sector", "error");
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
  const fetch = useDispatch();

  useEffect(() => {
    dataToEdit &&
      setData({
        name: dataToEdit?.name,
        yearOfEstablishmnet: dataToEdit?.yearOfEstablishmnet,
        shareCapitalUpOnEstablishement:
          dataToEdit.shareCapitalUpOnEstablishement,
        isActive: dataToEdit?.isActive,
        address: {
          region: dataToEdit?.address?.region,
          zone: dataToEdit?.address?.zone,
          woreda: dataToEdit?.address?.woreda,
          town: dataToEdit?.address?.town,
          kebele: dataToEdit?.address?.kebele,
          email: dataToEdit?.address?.email,
          phoneNumber: dataToEdit?.address?.phoneNumber,
        },
        type: {
          typeId: dataToEdit?.type?.typeId,
        },
        sector: {
          sectorId: dataToEdit?.sector?.sectorId,
        },
      });
  }, [dataToEdit]);
  useEffect(() => {
    const fetchtData = async () => {
      fetch(getTypeData());

      fetch(getSectorData());
    };
    fetchtData();
  }, [fetch]);
  const industrData = useSelector((state) => state.industry);
  const { sectors, types } = industrData;
  useEffect(() => {
    let newZone = addressInfo
      .filter((item) => item?.region === data.address.region)
      .map((item) => item?.zone[data.address.zone]);
    setZone(newZone);
  }, [data.address.zone, data.address.region]);

  useEffect(() => {
    dispatched && dispatch({ type: "OPEN_MODAL" });
  }, [dispatched]);

  return (
    <Modal
      open={open}
      size="large"
      onClose={() => {
        dispatch({ type: "CLOSE_MODAL" });
        setDispatched(false);
      }}
    >
      <Modal.Header className="text-cyan-500">{title}</Modal.Header>
      <Modal.Content>
        <form className="ui small form" onSubmit={registerFederation}>
          <div>
            <div className="three fields md:px-4">
              <div className="field">
                <label className="label">Federation Name:</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Federation Name"
                  required
                />
              </div>
              <div className="field">
                <label className="label">Type</label>
                <select
                  className="ui dropdown"
                  name="typeId"
                  value={data.type.typeId}
                  onChange={handleTypeChange}
                >
                  <option></option>
                  {types.map((item, index) => (
                    <option value={item.typeId} key={index}>
                      {item.typeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="label">Sector</label>
                <select
                  className="ui dropdown"
                  name="sectorId"
                  value={data.sector.sectorId}
                  onChange={handleSectorChange}
                >
                  <option></option>
                  {sectors.map((item, index) => (
                    <option value={item.sectorId} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
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
                />
              </div>
            </div>
            <div className="three fields">
              <div className="field">
                <label htmlFor="phonenumber" className="label">
                  Phone Number:
                </label>
                <input
                  type="number"
                  id="phonenumber"
                  name="phoneNumber"
                  value={data.address.phoneNumber}
                  onChange={handleAddressChange}
                  placeholder="Mobile Number"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="phonenumber" className="label">
                  Share Capital upon EStablishment:
                </label>
                <input
                  type="number"
                  id="shareCapitalUpOnEstablishement"
                  name="shareCapitalUpOnEstablishement"
                  value={data.shareCapitalUpOnEstablishement}
                  onChange={handleChange}
                  placeholder="Capital"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="yearOfEstablishmnet" className="label">
                  Date of Establishment:
                </label>
                <input
                  type="date"
                  id="yearOfEstablishmnet"
                  name="yearOfEstablishmnet"
                  value={data.yearOfEstablishmnet}
                  onChange={handleChange}
                  placeholder="Date of Establishment"
                  required
                />
              </div>
            </div>
            {/* <div className="ui divider"></div> */}
            <div className="float-right py-6">
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
                Save
              </Button>
            </div>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default CreateFederationModal;
