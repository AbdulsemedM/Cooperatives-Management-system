import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import { API } from "../../utils/API";
// import { downloadExcel } from "../../containers/DownloadExcel";
// import { sampleData } from "./sampleData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SellAndTurnOverMenu = ({
  role,
  unionID,
  prCooperativeID,
  dataToEdit,
  isEdit,
  filterBy,
  setIsEdit,
  prCooperative,
  union,
  federation,
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

  const [forType, setForType] = useState({
    for:
      filterBy?.option === "union" 
        ? "union"
        : filterBy?.option === "prCooperative"
        ? "prcooperative"
        : "federation",
  });

  const fdOptions = federation?.map((item) => ({
    key: item?.federationId,
    text: item?.name,
    value: item?.federationId,
  }));
  const unOptions = union?.map((item) => ({
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

  const [data, setData] = useState({
    annualTurnOverValue: "",
    dateGenerated: "",
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
        : null,
    federation:
      role === "bankUser"
        ? {
            federationId: "",
          }
        : null,
  });
  // function handleExport(data1) {
  //   downloadExcel(data1);
  // }

  useEffect(() => {
    setForType({
      for:
        filterBy?.option === "union"
          ? "union"
          : filterBy?.option === "prCooperative"
          ? "prcooperative"
          : "federation",
    });
    setData({
      annualTurnOverValue: "",
      dateGenerated: "",
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
          : null,
      federation:
        role === "bankUser"
          ? {
              federationId: "",
            }
          : null,
    });
  }, [filterBy?.option, role, unionID, prCooperativeID]);

  useEffect(() => {
    dataToEdit &&
      setData({
        annualTurnOverValue: dataToEdit?.annualTurnOverValue,
        dateGenerated: dataToEdit?.dateGenerated,
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
          (role === "unionUser" || role === "bankUser") &&
          dataToEdit?.prCooperative?.prCooperativeId
            ? {
                prCooperativeId: dataToEdit?.prCooperative?.prCooperativeId,
              }
            : role === "primaryCooperativeUser"
            ? {
                prCooperativeId: prCooperativeID,
              }
            : null,
        federation: dataToEdit?.federation?.federationId
          ? {
              federationId: dataToEdit?.federation?.federationId,
            }
          : null,
      });
  }, [dataToEdit, role, unionID, prCooperativeID]);

  const createSale = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      role === "bankUser"
        ? filterBy?.option === "union"
          ? isEdit
            ? await API.put(
                `/annualTurnOver/edit/${dataToEdit?.annualTurnOverId}`,
                data
              ).then((res) => {
                if (res.status === 200) {
                  setData({
                    annualTurnOverValue: "",
                    dateGenerated: "",
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
                        : null,
                    federation:
                      role === "bankUser"
                        ? {
                            federationId: "",
                          }
                        : null,
                  });
                  Alert("Updated Successfully", "success");
                  setIsEdit(false);
                } else {
                  Alert("Failed to update annual turnover", "error");
                  setIsEdit(false);
                }
                return res;
              })
            : await API.post(`/annualTurnOver/add`, data).then((res) => {
                if (res.status === 200) {
                  setData({
                    annualTurnOverValue: "",
                    dateGenerated: "",
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
                        : null,
                    federation:
                      role === "bankUser"
                        ? {
                            federationId: "",
                          }
                        : null,
                  });
                  Alert("Created Successfully", "success");
                  setIsEdit(false);
                } else {
                  Alert("Failed to create annual turnover", "error");
                  setIsEdit(false);
                }
                return res;
              })
          : filterBy?.option === "prCooperative" && isEdit
          ? await API.put(
              `/annualTurnOver/edit/${dataToEdit?.annualTurnOverId}`,
              data
            ).then((res) => {
              if (res.status === 200) {
                setData({
                  annualTurnOverValue: "",
                  dateGenerated: "",
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
                      : null,
                });
                Alert("Updated Successfully", "success");
                setIsEdit(false);
              } else {
                Alert("Failed to update annual sell", "error");
                setIsEdit(false);
              }
              return res;
            })
          : await API.post(`/annualTurnOver/add`, data).then((res) => {
              if (res.status === 200) {
                setData({
                  annualTurnOverValue: "",
                  dateGenerated: "",
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
                      : null,
                  federation:
                    role === "bankUser"
                      ? {
                          federationId: "",
                        }
                      : null,
                });
                Alert("Created Successfully", "success");
                setIsEdit(false);
              } else {
                Alert("Failed to create annual sell", "error");
                setIsEdit(false);
              }
              return res;
            })
        : role === "unionUser"
        ? isEdit
          ? await API.put(
              `/annualTurnOver/edit/${dataToEdit?.annualTurnOverId}`,
              data
            ).then((res) => {
              if (res.status === 200) {
                setData({
                  annualTurnOverValue: "",
                  dateGenerated: "",
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
                      : null,
                  federation:
                    role === "bankUser"
                      ? {
                          federationId: "",
                        }
                      : null,
                });
                Alert("Updated Successfully", "success");
                setIsEdit(false);
              } else {
                Alert("Failed to update annual turnover", "error");
                setIsEdit(false);
              }
              return res;
            })
          : await API.post(`/annualTurnOver/add`, data).then((res) => {
              if (res.status === 200) {
                setData({
                  annualTurnOverValue: "",
                  annualSellValue: "",
                  dateGenerated: "",
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
                      : null,
                  federation:
                    role === "bankUser"
                      ? {
                          federationId: "",
                        }
                      : null,
                });
                Alert("Created Successfully", "success");
                setIsEdit(false);
              } else {
                Alert("Failed to create annual turnover", "error");
                setIsEdit(false);
              }
              return res;
            })
        : isEdit
        ? await API.put(
            `/annualTurnOver/edit/${dataToEdit?.annualTurnOverId}`,
            data
          ).then((res) => {
            if (res.status === 200) {
              setData({
                annualTurnOverValue: "",
                dateGenerated: "",
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
                    : null,
                federation:
                  role === "bankUser"
                    ? {
                        federationId: "",
                      }
                    : null,
              });
              Alert("Updated Successfully", "success");
              setIsEdit(false);
            } else {
              Alert("Failed to update annual sell", "error");
              setIsEdit(false);
            }
            return res;
          })
        : await API.post(`/annualTurnOver/add`, data).then((res) => {
            if (res.status === 200) {
              setData({
                annualTurnOverValue: "",
                annualSellValue: "",
                dateGenerated: "",
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
                    : null,
                federation:
                  role === "bankUser"
                    ? {
                        federationId: "",
                      }
                    : null,
              });
              Alert("Created Successfully", "success");
              setIsEdit(false);
            } else {
              Alert("Failed to create annual sell", "error");
              setIsEdit(false);
            }
            return res;
          });
    } catch (error) {
      Alert("Something went wrong", "error");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUnionChange = (event, data) => {
    setData((prevData) => ({
      ...prevData,
      union: {
        unionId: data.value, // Update the unionId property with the selected value
      },
      prCooperative: null,
      federation: null,
    }));
  };

  const handleForChange = (e) => {
    const { name, value } = e.target;
    setForType({
      ...data, //spread operator
      [name]: value,
    });
    setData((prevData) => ({
      ...prevData,
      union: null,
      prCooperative: null,
    }));
  };

  const handleFederationChange = (event, data) => {
    setData((prevData) => ({
      ...prevData,
      federation: {
        federationId: data.value, // Update the unionId property with the selected value
      },
      prCooperative: null,
      union: null,
    }));
  };

  const handlePrCooperativeChange = (event, data) => {
    setData((prevData) => ({
      ...prevData,
      prCooperative: {
        prCooperativeId: data.value, // Update the prCooperativeId property with the selected value
      },
      federation: null,
    }));
  };

  return (
    <div className="pr-3">
      {(role === "bankUser" ||
        role === "unionUser" ||
        role === "primaryCooperativeUser") && (
        <form action="" className="ui form" onSubmit={createSale}>
          {(role === "bankUser" || role === "unionUser") && (
            <div className="two fields">
              <div className="field">
                <label className="label">For</label>
                <select
                  className="ui dropdown"
                  name="for"
                  value={forType.for}
                  onChange={handleForChange}
                  required
                >
                  <option></option>
                  {role === "bankUser" && (
                    <option value="federation">For Federation</option>
                  )}
                  <option value="union">
                    For{" "}
                    {role === "bankUser"
                      ? "Union"
                      : role === "unionUser" && "Self"}
                  </option>
                  <option value="prCooperative">For Cooperative</option>
                </select>
              </div>
              {role === "bankUser" && forType.for === "federation" && (
                <div className="field">
                  <label className="label">Federation</label>
                  <Dropdown
                    placeholder="Federations"
                    search
                    clearable
                    selection
                    options={fdOptions}
                    value={data.federation?.federationId} // Bind the selected value to the state
                    onChange={handleFederationChange}
                  />
                </div>
              )}
              {(role === "bankUser" || role === "unionUser") &&
                forType.for === "prCooperative" && (
                  <div className="field">
                    <label className="label">Pr Cooperative</label>
                    <Dropdown
                      clearable
                      placeholder="Pr cooperatives"
                      search
                      selection
                      options={prOptions}
                      value={data.prCooperative?.prCooperativeId} // Bind the selected value to the state
                      onChange={handlePrCooperativeChange}
                      required
                    />
                  </div>
                )}
              {role === "bankUser" && forType.for === "union" && (
                <div className="field">
                  <label className="label">Union</label>
                  <Dropdown
                    clearable
                    placeholder="Union"
                    search
                    selection
                    options={unOptions}
                    value={data.union?.unionId} // Bind the selected value to the state
                    onChange={handleUnionChange}
                    required
                  />
                </div>
              )}
            </div>
          )}
          <div className="two fields">
            <div className="field">
              <label htmlFor="annualTurnOverValue">Annual Turnover Value</label>
              <input
                type="number"
                id="annualTurnOverValue"
                name="annualTurnOverValue"
                value={data.annualTurnOverValue}
                onChange={handleChange}
                placeholder="Annual Sale Value"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="dateGenerated">Date Generated</label>
              <input
                type="date"
                id="dateGenerated"
                name="dateGenerated"
                value={data.dateGenerated}
                onChange={handleChange}
                placeholder="Date"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            {!isEdit ? (
              <Button
                positive
                type="submit"
                style={{ backgroundColor: "#06B6D4" }}
              >
                Sumbit
              </Button>
            ) : (
              <Button
                positive
                type="submit"
                style={{ backgroundColor: "#06B6D4" }}
              >
                Update
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default SellAndTurnOverMenu;
