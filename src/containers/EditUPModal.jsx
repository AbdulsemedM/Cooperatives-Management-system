import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "semantic-ui-react";
import { addressInfo } from "../constant/address";
import { API } from "../utils/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import { getSectorData, getTypeData } from "../redux/actions/industry.action";
import { getUnionData } from "../redux/actions/union.action";

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

const EditUPModal = ({
  dispatched,
  setDispatched,
  isPrCooperative,
  title,
  dataToEdit,
  setUpdatedState,
}) => {
  const [zone, setZone] = useState([]);
  //   const [typeFetched, setTypeFetched] = useState([]);

  const [data, setData] = useState({
    name: "",
    dateOfEstablishmnet: "",
    shareCapitalUponEstablishmnet: "",
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
    union: null,
    licensingOrgan: "",
    jobOpportunityCreated: "",
    maleMembersUpOnEstablishement: "",
    femaleMembersUpOnEstablishement: "",
    no_Of_MaleMembers: "",
    no_Of_FemaleMembers: "",
  });

  const dispatcher = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatcher(getSectorData());
      dispatcher(getTypeData());
      isPrCooperative && dispatcher(getUnionData());
    };
    fetchData();
  }, [isPrCooperative, dispatcher]);
  useEffect(() => {
    const fetchData = async () => {
      dispatcher(getUnionData());
      //   await API.get("/type/getTypes").then((res) => {
      //     setTypeFetched(res.data);
      //   });
    };
    fetchData();
  }, [dispatcher]);
  const industryData = useSelector((state) => state.industry);
  const { types, sectors } = industryData;
  const unionData = useSelector((state) => state.unions);
  const { unions } = unionData;

  useEffect(() => {
    let newZone = addressInfo
      .filter((item) => item?.region === data.address.region)
      .map((item) => item?.zone[data.address.zone]);
    setZone(newZone);
  }, [data.address.zone, data.address.region]);

  const unOptions = unions?.map((item) => ({
    key: item?.unionId,
    text: item?.name,
    value: item?.unionId,
  }));

  const createUnion = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      isPrCooperative
        ? await API.put(
            `/prCooperatives/edit/${dataToEdit.prCooperativeId}`,
            data
          ).then((res) => {
            if (res.status === 200) {
              Alert("Updated Successfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
              setUpdatedState("prCooop");
            } else {
              Alert("Failed to update primary cooperative", "error");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
            }
            return res;
          })
        : await API.put(`/union/edit/${dataToEdit.unionId}`, data).then(
            (res) => {
              if (res.status === 200) {
                Alert("Updated Successfully", "success");
                dispatch({ type: "CLOSE_MODAL" });
                setDispatched(false);
                setUpdatedState("union");
              } else {
                Alert("Failed to update union", "error");
                dispatch({ type: "CLOSE_MODAL" });
                setDispatched(false);
              }
              return res;
            }
          );
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

  const handleUnionChange = (event, data) => {
    setData((prevData) => ({
      ...prevData,
      union: data.value
        ? {
            unionId: data.value, // Update the unionId property with the selected value
          }
        : null,
    }));
  };

  const handleSectorChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      sector: {
        ...prevState.sector,
        [name]: value,
      },
    }));
  };

  const handleTypeChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      type: {
        ...prevState.type,
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
    dataToEdit &&
      setData({
        name: dataToEdit?.name,
        dateOfEstablishmnet: dataToEdit?.dateOfEstablishmnet,
        shareCapitalUponEstablishmnet:
          dataToEdit?.shareCapitalUponEstablishmnet,
        isActive: dataToEdit?.isActive,
        address: {
          region: dataToEdit?.address?.region,
          zone: dataToEdit?.address?.zone,
          woreda: dataToEdit?.address?.woreda,
          town: dataToEdit?.address?.town,
          kebele: dataToEdit?.address?.kebele,
          email: dataToEdit?.address?.email && dataToEdit?.address?.email,
          phoneNumber: dataToEdit?.address?.phoneNumber,
        },
        type: {
          typeId: dataToEdit?.type?.typeId,
        },
        sector: {
          sectorId: dataToEdit?.sector?.sectorId,
        },
        union: dataToEdit?.union?.unionId
          ? {
              unionId: dataToEdit?.union?.unionId,
            }
          : "",
        licensingOrgan: dataToEdit?.licensingOrgan,
        jobOpportunityCreated: dataToEdit?.jobOpportunityCreated
          ? dataToEdit?.jobOpportunityCreated
          : null,
        maleMembersUpOnEstablishement: dataToEdit?.maleMembersUpOnEstablishement
          ? dataToEdit?.maleMembersUpOnEstablishement
          : null,
        femaleMembersUpOnEstablishement:
          dataToEdit?.femaleMembersUpOnEstablishement
            ? dataToEdit?.femaleMembersUpOnEstablishement
            : null,
        no_Of_MaleMembers: dataToEdit?.no_Of_MaleMembers
          ? dataToEdit?.no_Of_MaleMembers
          : null,
        no_Of_FemaleMembers: dataToEdit?.no_Of_FemaleMembers
          ? dataToEdit?.no_Of_FemaleMembers
          : null,
      });
  }, [dataToEdit]);

  useEffect(() => {
    dispatched && dispatch({ type: "OPEN_MODAL" });
  }, [dispatched]);
  return (
    <Modal
      //   dimmer={dimmer}
      open={open}
      // size="small"
      onClose={() => {
        dispatch({ type: "CLOSE_MODAL" });
        setDispatched(false);
      }}
    >
      <Modal.Header className="text-cyan-500">{title}</Modal.Header>
      <Modal.Content>
        <form className="ui form p-5" onSubmit={createUnion}>
          <div className="three fields">
            <div className="field">
              <label htmlFor="name" className="label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                placeholder="Union Name"
                onChange={handleChange}
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
              <label htmlFor="phonenumber" className="label">
                Share Capital upon EStablishment:
              </label>
              <input
                type="text"
                id="shareCapitalUponEstablishmnet"
                name="shareCapitalUponEstablishmnet"
                value={data.shareCapitalUponEstablishmnet}
                onChange={handleChange}
                placeholder="Capital"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="dateOfEstablishmnet" className="label">
                Date of Establishment:
              </label>
              <input
                type="date"
                id="dateOfEstablishmnet"
                name="dateOfEstablishmnet"
                value={data.dateOfEstablishmnet}
                onChange={handleChange}
                placeholder="Date of Establishment"
                required
              />
            </div>
          </div>

          {isPrCooperative && (
            <div className="three fields">
              <div className="field">
                <label className="label">Union</label>
                <Dropdown
                  placeholder="Union"
                  clearable
                  search
                  selection
                  options={unOptions}
                  value={data?.union?.unionId} // Bind the selected value to the state
                  onChange={handleUnionChange}
                />
              </div>
              {isPrCooperative && (
                <div className="field">
                  <label htmlFor="jobOpportunityCreated" className="label">
                    Job Opportunity Created:
                  </label>
                  <input
                    type="number"
                    id="jobOpportunityCreated"
                    name="jobOpportunityCreated"
                    value={data.jobOpportunityCreated}
                    placeholder="Job Opportunity Created"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {isPrCooperative && (
                <div className="field">
                  <label
                    htmlFor="maleMembersUpOnEstablishement"
                    className="label"
                  >
                    Male Members upon Establishement:
                  </label>
                  <input
                    type="number"
                    id="maleMembersUpOnEstablishement"
                    name="maleMembersUpOnEstablishement"
                    value={data.maleMembersUpOnEstablishement}
                    placeholder="MaleEMembers upon Establishement"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>
          )}
          {isPrCooperative && (
            <div className="three fields">
              <div className="field">
                <label
                  htmlFor="femaleMembersUpOnEstablishement"
                  className="label"
                >
                  Female Members Upon Establishement:
                </label>
                <input
                  type="number"
                  id="femaleMembersUpOnEstablishement"
                  name="femaleMembersUpOnEstablishement"
                  value={data.femaleMembersUpOnEstablishement}
                  placeholder="Female Members Upon Establishement"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="no_Of_MaleMembers" className="label">
                  Total Male Members:
                </label>
                <input
                  type="number"
                  id="no_Of_MaleMembers"
                  name="no_Of_MaleMembers"
                  value={data.no_Of_MaleMembers}
                  placeholder="Total Male Members"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="no_Of_FemaleMembers" className="label">
                  Total Female Members:
                </label>
                <input
                  type="number"
                  id="no_Of_FemaleMembers"
                  name="no_Of_FemaleMembers"
                  value={data.no_Of_FemaleMembers}
                  placeholder="Total Female Members"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          <div className="three fields">
            <div className="field">
              <label htmlFor="licensingOrgan" className="label">
                Licensing Organ:
              </label>
              <input
                type="text"
                id="licensingOrgan"
                name="licensingOrgan"
                value={data?.licensingOrgan}
                placeholder="Licensing Organ"
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="isActive" className="label">
                Is Active:
              </label>
              <select
                className="ui dropdown"
                name="isActive"
                value={data.isActive}
                onChange={handleChange}
              >
                <option></option>
                <option value={true}>True</option>
                <option value={false}>False</option>
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

export default EditUPModal;
