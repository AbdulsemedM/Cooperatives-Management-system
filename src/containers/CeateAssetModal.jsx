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

const CreateAssetModal = ({
  dispatched,
  setDispatched,
  title,
  edit,
  role,
  union,
  prCooperativeID,
  unionID,
  prCooperative,
  selectedUnionId,
  selectedPrId,
  selectedFdId,
  dataToEdit,
  federation,
}) => {
  const MySwal = withReactContent(Swal);
  let timerInterval;
  // console.log(dataToEdit)
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
      selectedPrId || role === "primaryCooperativeUser"
        ? "PrCooperative"
        : selectedUnionId || role === "unionUser"
        ? "union"
        : "",
  });

  // console.log("for", forType.for);
  useEffect(() => {
    setForType({
      for:
        selectedPrId || role === "primaryCooperativeUser"
          ? "PrCooperative"
          : selectedUnionId || role === "unionUser"
          ? "union"
          : "",
    });
  }, [selectedPrId, selectedUnionId, role]);

  useEffect(() => {
    dataToEdit &&
      setForType({
        for:
          dataToEdit?.prCooperative?.prCooperativeId ||
          role === "primaryCooperativeUser"
            ? "PrCooperative"
            : dataToEdit?.union?.unionId || role === "unionUser"
            ? "union"
            : dataToEdit?.federation?.federationId && "federation",
      });
  }, [dataToEdit, role]);

  const [data, setData] = useState({
    assetName: "",
    value: "",
    type: "",
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
        : role === "primaryCooperativeUser" && unionID
        ? {
            unionId: unionID,
          }
        : null,
    federation: {
      federationId: "",
    },
  });

  const FDOptions = federation?.map((item) => ({
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

  //
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
      union: role === "unionUser" ? { unionId: unionID } : null,
      prCooperative:
        role === "primaryCooperativeUser"
          ? { prCooperativeId: prCooperativeID }
          : null,
      federation: null,
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
      prCooperative: {
        prCooperativeId: data.value, // Update the prCooperativeId property with the selected value
      },
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

  const registerSector = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      (await edit)
        ? API.put(`/asset/edit/${dataToEdit.assetId}`, data).then((res) => {
            if (res.status === 200) {
              Alert("Updated Successfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
            } else {
              Alert("Failed to Update asset", "error");
            }
            return res;
          })
        : API.post(`/asset/add`, data).then((res) => {
            if (res.status === 200) {
              Alert("Created Successfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
            } else {
              Alert("Failed to create asset", "error");
            }
            return res;
          });
    } catch (error) {
      // console.log(error);
      Alert("Something went wrong", "error");
      dispatch({ type: "CLOSE_MODAL" });
      setDispatched(false);
    }
  };

  useEffect(() => {
    dataToEdit &&
      setData({
        assetName: dataToEdit?.assetName,
        value: dataToEdit?.value,
        type: dataToEdit?.type,
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
        prCooperative:
          role === "primaryCooperativeUser"
            ? {
                prCooperativeId: prCooperativeID,
              }
            : (role === "bankUser" || role === "unionUser") &&
              dataToEdit?.prCooperative?.prCooperativeId
            ? {
                prCooperativeId: dataToEdit?.prCooperative?.prCooperativeId,
              }
            : null,
        federation: {
          federationId: dataToEdit?.federation?.federationId,
        },
      });
    selectedUnionId &&
      setData({
        assetName: "",
        value: "",
        type: "",
        dateGenerated: "",
        union: {
          unionId: selectedUnionId,
        },
        prCooperative: null,
        federation: null,
      });
    selectedPrId &&
      setData({
        assetName: "",
        value: "",
        type: "",
        dateGenerated: "",
        union: null,
        prCooperative: {
          prCooperativeId: selectedPrId,
        },
        federation: null,
      });
  }, [
    dataToEdit,
    role,
    prCooperativeID,
    unionID,
    selectedUnionId,
    selectedPrId,
  ]);
  // console.log("id", selectedUnionId);

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
              <div className="field">
                <label className="label">Asset Name:</label>
                <input
                  type="text"
                  name="assetName"
                  value={data.assetName}
                  onChange={handleChange}
                  placeholder="Asset Name"
                />
              </div>
              <div className="field">
                <label className="label">Value:</label>
                <input
                  type="text"
                  name="value"
                  value={data.value}
                  onChange={handleChange}
                  placeholder="Value"
                  required
                />
              </div>
            </div>

            <div className="two fields">
              <div className="field">
                <label className="label">Type</label>
                <select
                  className="ui dropdown"
                  name="type"
                  value={data.type}
                  onChange={handleChange}
                  required
                >
                  <option></option>
                  <option value="Fixed">Fixed</option>
                  <option value="Current assets">Current assets</option>
                  <option value="Intangible assets">Intangible assets</option>
                  <option value="Financial assets">Financial assets</option>
                  <option value="Natural resources">Natural resources</option>
                  <option value="Human resources">Human resources</option>
                </select>
              </div>
              <div className="field">
                <label className="label">Date Generated:</label>
                <input
                  type="date"
                  name="dateGenerated"
                  value={data.dateGenerated}
                  onChange={handleChange}
                  placeholder="Date Generated"
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
                    <option value="union">
                      For {role === "unionUser" ? "Self" : "Union"}
                    </option>
                    <option value="PrCooperative">For Cooperative</option>
                  </select>
                </div>
              )}
              {role === "bankUser" && forType.for === "federation" && (
                <div className="field">
                  <label className="label">Federation</label>
                  <Dropdown
                    placeholder="federations"
                    search
                    clearable
                    selection
                    options={FDOptions}
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
                      clearable
                      selection
                      options={prOptions}
                      value={data.prCooperative?.prCooperativeId} // Bind the selected value to the state
                      onChange={handlePrCooperativeChange}
                    />
                  </div>
                )}
              {role === "bankUser" && forType.for === "union" && (
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

export default CreateAssetModal;
