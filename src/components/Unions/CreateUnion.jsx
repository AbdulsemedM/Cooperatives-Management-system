import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Dropdown } from "semantic-ui-react";
import { addressInfo } from "../../constant/address";
import { API } from "../../utils/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createStructuredSelector } from "reselect";
import { selectRole, selectUnionID } from "../../redux/user/userSelector";
import { connect } from "react-redux";

const CreateUnion = ({ isPrCooperative, unionID, role }) => {
  const [zone, setZone] = useState([]);
  const [sectorFetched, setSectorFetched] = useState([]);
  const [typeFetched, setTypeFetched] = useState([]);
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

  const location = useLocation();
  const unionIdquery = new URLSearchParams(location.search).get("unionId");
  const regionquery = new URLSearchParams(location.search).get("region");
  const zoneqeury = new URLSearchParams(location.search).get("zone");
  const woredaquery = new URLSearchParams(location.search).get("woreda");

  const [data, setData] = useState({
    name: "",
    dateOEstablishement: "",
    shareCapitalUpoEstablishement: "",
    isActive: true,
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
    union: role === "unionUser" ? { unionId: unionID } : null,
    licensingOrgan: "",
    jobOpportunityCreated: "",
    maleMembersUpOnEstablishement: "",
    femaleMembersUpOnEstablishement: "",
    no_Of_MaleMembers: "",
    no_Of_FemaleMembers: "",
  });

  useEffect(() => {
    let newZone = addressInfo
      .filter((item) => item.region === data.address.region)
      .map((item) => item?.zone[data.address.zone]);
    setZone(newZone);
  }, [data.address.zone, data.address.region]);

  useEffect(() => {
    const fetchData = async () => {
      await API.get("/sector/getSectors").then((res) => {
        setSectorFetched(res.data);
      });
      await API.get("/type/getTypes").then((res) => {
        setTypeFetched(res.data);
      });
      isPrCooperative &&
        (await API.get("/union/getUnions").then((res) => {
          setUnionFetched(res.data);
        }));
    };
    fetchData();
  }, [isPrCooperative]);
  useEffect(() => {
    unionIdquery
      ? setData({
          name: "",
          dateOEstablishement: "",
          shareCapitalUpoEstablishement: "",
          isActive: true,
          address: {
            region: regionquery,
            zone: zoneqeury,
            woreda: woredaquery,
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
          union: {
            unionId: unionIdquery,
          },
          licensingOrgan: "",
          jobOpportunityCreated: "",
          maleMembersUpOnEstablishement: "",
          femaleMembersUpOnEstablishement: "",
          no_Of_MaleMembers: "",
          no_Of_FemaleMembers: "",
        })
      : setData({
          name: "",
          dateOEstablishement: "",
          shareCapitalUpoEstablishement: "",
          isActive: true,
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
          union:
            role === "unionUser"
              ? {
                  unionId: unionID,
                }
              : null,
          licensingOrgan: "",
          jobOpportunityCreated: "",
          maleMembersUpOnEstablishement: "",
          femaleMembersUpOnEstablishement: "",
          no_Of_MaleMembers: "",
          no_Of_FemaleMembers: "",
        });
  }, [unionIdquery, woredaquery, zoneqeury, regionquery, unionID, role]);

  const unOptions = unionFetched?.map((item) => ({
    key: item?.unionId,
    text: item?.name,
    value: item?.unionId,
  }));

  const createUnion = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      (await isPrCooperative)
        ? API.post("/prCooperatives/add", data).then((res) => {
            if (res.status === 200) {
              Alert("Created Succesfully", "success");
              setData({
                name: "",
                dateOEstablishement: "",
                shareCapitalUpoEstablishement: "",
                isActive: true,
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
                union: role === "unionUser" ? { unionId: unionID } : null,
                licensingOrgan: "",
                jobOpportunityCreated: "",
                maleMembersUpOnEstablishement: "",
                femaleMembersUpOnEstablishement: "",
                no_Of_MaleMembers: "",
                no_Of_FemaleMembers: "",
              });
              // console.log("success");
            } else {
              Alert("Failed to Create User", "error");
            }
            return res;
          })
        : API.post("/union/add", data).then((res) => {
            if (res.status === 200) {
              Alert("Created Succesfully", "success");
              setData({
                name: "",
                dateOEstablishement: "",
                shareCapitalUpoEstablishement: "",
                isActive: true,
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
                union: role === "unionUser" ? { unionId: unionID } : null,
                licensingOrgan: "",
                jobOpportunityCreated: "",
                maleMembersUpOnEstablishement: "",
                femaleMembersUpOnEstablishement: "",
                no_Of_MaleMembers: "",
                no_Of_FemaleMembers: "",
              });
            } else {
              console.log("error");
              Alert("Failed to Create User", "error");
            }
            // return res;
          });
    } catch (error) {
      console.log("error");
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
  // const handleUnionChange = (event) => {
  //   const { name, value } = event.target;
  //   setData((prevState) => ({
  //     ...prevState,
  //     union: value?.length
  //       ? {
  //           ...prevState.union,
  //           [name]: value,
  //         }
  //       : null,
  //   }));
  // };

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

  return (
    <div>
      <div className="border bg-white shadow rounded my-4">
        <h4 className="flex items-center justify-start p-2 text-cyan-500 font-bold text-xl bg-gray-200">
          Register {isPrCooperative ? "PC" : "Union"}
        </h4>

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
                placeholder="Name"
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
                {typeFetched.map((item, index) => (
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
                {sectorFetched.map((item, index) => (
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
                required
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
                required
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
                Share Capital upon EStablishement:
              </label>
              <input
                type="number"
                id="shareCapitalUpoEstablishement"
                name="shareCapitalUpoEstablishement"
                value={data.shareCapitalUpoEstablishement}
                onChange={handleChange}
                placeholder="Capital"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="phonenumber" className="label">
                Date of Establishement:
              </label>
              <input
                type="date"
                id="dateOEstablishement"
                name="dateOEstablishement"
                value={data.dateOEstablishement}
                onChange={handleChange}
                placeholder="Date of Establishement"
                required
              />
            </div>
          </div>
          <div className="three fields">
            {isPrCooperative && role === "bankUser" && (
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
            )}
            <div className="field">
              <label htmlFor="licensingOrgan" className="label">
                Licencing Organ:
              </label>
              <input
                type="text"
                id="licensingOrgan"
                name="licensingOrgan"
                value={data.licensingOrgan}
                placeholder="Licencing Organ"
                onChange={handleChange}
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
          <div className="ui divider"></div>
          <div className="flex items-center justify-end my-5">
            <Button
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
  unionID: selectUnionID,
  role: selectRole,
});

export default connect(mapStateToProps)(CreateUnion);
