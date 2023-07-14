import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "semantic-ui-react";
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

const CreatePaidUpShareModal = ({
  dispatched,
  setDispatched,
  title,
  edit,
  isLoan,
  union,
  prCooperative,
  selectedUnionId,
  selectedPrId,
  dataToEdit,
  role,
  prCooperativeID,
  unionID,
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
    for: selectedUnionId ? "union" : selectedPrId ? "PrCooperative" : "",
  });

  useEffect(() => {
    setForType({
      for: selectedUnionId ? "union" : selectedPrId ? "PrCooperative" : "",
    });
  }, [selectedPrId, selectedUnionId]);

  useEffect(() => {
    dataToEdit &&
      setForType({
        for: dataToEdit?.prCooperative?.prCooperativeId
          ? "PrCooperative"
          : dataToEdit?.union?.unionId
          ? "union"
          : dataToEdit?.federation?.federationId && "federation",
      });
  }, [dataToEdit]);

  const [data, setData] = useState({
    paidUpValue: "",
    osLoanValue: isLoan !== true ? null : "",
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
            unionID: unionID,
          }
        : role === "primaryCooperativeUser" && unionID
        ? {
            unionId: unionID,
          }
        : null,
    federation: {
      federationId: "",
    },
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
      federation: null,
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
      federation: null,
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
      federation: null,
      prCooperative: {
        prCooperativeId: data.value, // Update the prCooperativeId property with the selected value
      },
    }));
  };

  const registerSector = async (e) => {
    // console.log(isLoan);
    const tableName = isLoan ? "osLoan" : "paidUpShare";

    e.preventDefault();
    try {
      (await edit)
        ? API.put(
            `/${tableName}/edit/${
              isLoan ? dataToEdit.osLoanId : dataToEdit.paidUpId
            }`,
            data
          ).then((res) => {
            if (res.status === 200) {
              Alert("Updated Successfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
            } else {
              Alert(`Failed to update ${tableName}`, "error");
            }
            return res;
          })
        : API.post(`/${tableName}/add`, data).then((res) => {
            if (res.status === 200) {
              Alert("Created Successfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
            } else {
              Alert(`Failed to create ${tableName}`, "error");
            }
            return res;
          });
    } catch (error) {
      Alert("Something went wrong", "error");
      dispatch({ type: "CLOSE_MODAL" });
      setDispatched(false);
    }
    // console.log("here", isLoan, data);
  };

  useEffect(() => {
    dataToEdit &&
      setData({
        paidUpValue: dataToEdit?.paidUpValue,
        osLoanValue: dataToEdit?.osLoanValue,
        dateGenerated: dataToEdit?.dateGenerated,
        union:
          role === "unionUser"
            ? {
                unionId: unionID,
              }
            : role === "bankUser" && dataToEdit?.union?.unionId
            ? {
                unionId: dataToEdit?.union?.unionId,
              }
            : null,
        prCooperative: dataToEdit?.prCooperative?.name
          ? {
              prCooperativeId: dataToEdit?.prCooperative?.prCooperativeId,
            }
          : null,
        federation: dataToEdit?.federation
          ? {
              federationId: dataToEdit?.federation?.federationId,
            }
          : null,
      });
    dataToEdit &&
      setForType({
        for: dataToEdit?.prCooperative?.name
          ? "PrCooperative"
          : dataToEdit?.union?.name
          ? "union"
          : "federation",
      });
    selectedUnionId &&
      setData({
        paidUpValue: "",
        osLoanValue: "",
        dateGenerated: "",
        union: {
          unionId: selectedUnionId,
        },
        prCooperative: null,
        federation: null,
      });
    selectedPrId &&
      setData({
        paidUpValue: "",
        osLoanValue: "",
        dateGenerated: "",
        prCooperative: {
          prCooperativeId: selectedPrId,
        },
        union: null,
        federation: null,
      });
  }, [dataToEdit, selectedUnionId, unionID, role, selectedPrId]);

  useEffect(() => {
    dispatched && dispatch({ type: "OPEN_MODAL" });
  }, [dispatched]);

  return (
    <Modal
      // dimmer={dimmer}
      open={open}
      size="tiny"
      onClose={() => {
        dispatch({ type: "CLOSE_MODAL" });
        setDispatched(false);
      }}
    >
      <Modal.Header className="text-cyan-500">{title}</Modal.Header>
      <Modal.Content>
        <form className="ui small form" onSubmit={registerSector}>
          <div className="md:px-4">
            <div className="two fields">
              {isLoan ? (
                <div className="field">
                  <label className="label">OS Loan Value:</label>
                  <input
                    type="number"
                    name="osLoanValue"
                    value={data.osLoanValue}
                    onChange={handleChange}
                    placeholder="OS Loan Value"
                    required
                  />
                </div>
              ) : (
                <div className="field">
                  <label className="label">Paid Up Value:</label>
                  <input
                    type="number"
                    name="paidUpValue"
                    value={data.paidUpValue}
                    onChange={handleChange}
                    placeholder="Paid Up Value"
                    required
                  />
                </div>
              )}
              <div className="field">
                <label className="label">Date Generated:</label>
                <input
                  type="date"
                  name="dateGenerated"
                  value={data.dateGenerated}
                  onChange={handleChange}
                  placeholder="Value"
                  required
                />
              </div>
            </div>
            <div className="two fields">
              {(role === "bankUser" || role === "unionUser") && (
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
                    <option value="union">For Union</option>
                    <option value="PrCooperative">For Cooperative</option>
                  </select>
                </div>
              )}
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
              {(role === "unionUser" || role === "bankUser") &&
                forType.for === "PrCooperative" && (
                  <div className="field">
                    <label className="label">Pr Cooperative</label>
                    <Dropdown
                      placeholder="Pr cooperatives"
                      search
                      selection
                      clearable
                      options={prOptions}
                      value={data.prCooperative?.prCooperativeId} // Bind the selected value to the state
                      onChange={handlePrCooperativeChange}
                    />
                  </div>
                )}
              {(role === "unionUser" || role === "bankUser") &&
                forType.for === "union" && (
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
            <div className="float-right py-3">
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
                disabled={
                  !(
                    data?.union?.unionId ||
                    data?.prCooperative?.prCooperativeId ||
                    data?.federation?.federationId
                  )
                }
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

export default CreatePaidUpShareModal;
