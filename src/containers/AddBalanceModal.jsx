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

const AddBalanceModal = ({
  dispatched,
  setDispatched,
  title,
  edit,
  unionId,
  isPrCoop,
  dataToEdit,
  role,
  union,
  unionID,
  prCooperativeID,
  prCooperative,
  selectedUnionId,
  selectedPrId,
  federation,
  account,
}) => {
  // console.log(federation)
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
      selectedPrId || role === "primaryCooperativeUser"
        ? "PrCooperative"
        : selectedUnionId || role === "unionUser"
        ? "union"
        : "",
  });
  const [selectedAccount, setSelectedAccount] = useState([]);
  useEffect(() => {
    const filterer = account.filter((item) =>
      item.account?.prCooperative
        ? item.account?.prCooperative?.prCooperativeId === prCooperativeID
        : item.account?.union
        ? item.account?.union?.unionId === prCooperativeID
        : item.account?.federation && item.account?.federation.federationId === prCooperativeID
    );
    setSelectedAccount(filterer[0]);
  }, [prCooperativeID, account]);
//   console.log("selected", selectedAccount);
//   console.log(prCooperativeID);
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
          dataToEdit?.account?.prCooperative?.prCooperativeId ||
          role === "primaryCooperativeUser"
            ? "PrCooperative"
            : dataToEdit?.account?.union?.unionId || role === "unionUser"
            ? "union"
            : dataToEdit?.account?.federation?.federationId && "federation",
      });
  }, [dataToEdit, role]);

  const [data, setData] = useState({
    accountNumber: "",
    accountType: "",
    district: "",
    branch: "",
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
    accountBalance: "",
    dateGenerated: "",
    account: {
      accountId: "",
    },
  });
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    // dimmer: undefined,
  });
  const { open } = state;

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
      prCooperative: data.value
        ? {
            prCooperativeId: data.value, // Update the prCooperativeId property with the selected value
          }
        : null,
      federation: null,
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
    try {
      console.log("dattaa", data);
      edit &&
        (await API.put(
          `/accountBalance/edit/${selectedAccount?.accountBalanceId}`,
          data
        ).then((res) => {
          if (res.status === 200) {
            Alert("Updated Successfully", "success");
            dispatch({ type: "CLOSE_MODAL" });
            setDispatched(false);
          } else {
            Alert("Failed to Update Account", "error");
            dispatch({ type: "CLOSE_MODAL" });
            setDispatched(false);
          }
          return res;
        }));
    } catch (error) {
      console.log(error);
      Alert("Something went wrong", "error");
      dispatch({ type: "CLOSE_MODAL" });
      setDispatched(false);
    }
  };

  useEffect(() => {
    // console.log(dataToEdit);
    (dataToEdit || selectedAccount) &&
      setData({
        accountNumber: dataToEdit?.account?.accountNumber,
        accountType: dataToEdit?.account?.accountType,
        district: dataToEdit?.account?.district,
        branch: dataToEdit?.account?.branch,
        prCooperative:
          role === "primaryCooperativeUser"
            ? {
                prCooperativeId: prCooperativeID,
              }
            : role === "bankUser" ||
              (role === "unionUser" &&
                dataToEdit?.account?.prCooperative?.prCooperativeId)
            ? {
                prCooperativeId:
                  dataToEdit?.account?.prCooperative?.prCooperativeId,
              }
            : null,
        union:
          role === "unionUser"
            ? {
                unionId: unionID,
              }
            : role === "bankUser" && dataToEdit?.account?.union?.unionId
            ? {
                unionId: dataToEdit?.account?.union?.unionId,
              }
            : null,
        federation: dataToEdit?.account?.federation
          ? {
              federationId: dataToEdit?.account?.federation?.federationId,
            }
          : null,
        accountBalance: selectedAccount ? selectedAccount?.accountBalance : "",
        dateGenerated: selectedAccount ? selectedAccount?.dateGenerated : "",
        account: {
          accountId: selectedAccount?.account?.accountId,
        },
      });
    selectedUnionId &&
      setData({
        accountNumber: "",
        accountType: "",
        district: "",
        branch: "",
        union: {
          unionId: selectedUnionId,
        },
        prCooperative: null,
        federation: null,
        accountBalance: selectedAccount ? selectedAccount?.accountBalance : "",
        dateGenerated: selectedAccount ? selectedAccount?.dateGenerated : "",
        account: {
          accountId: selectedAccount?.account?.accountId,
        },
      });
    selectedPrId &&
      setData({
        accountNumber: "",
        accountType: "",
        district: "",
        branch: "",
        union: null,
        prCooperative: {
          prCooperativeId: selectedPrId,
        },
        federation: null,
        accountBalance: selectedAccount ? selectedAccount?.accountBalance : "",
        dateGenerated: selectedAccount ? selectedAccount?.dateGenerated : "",
        account: {
          accountId: selectedAccount?.account?.accountId,
        },
      });
  }, [
    dataToEdit,
    isPrCoop,
    unionId,
    prCooperativeID,
    selectedPrId,
    selectedUnionId,
    role,
    unionID,
    selectedAccount,
  ]);

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
                <label className="label">Account Number:</label>
                <input
                  type="number"
                  name="accountNumber"
                  value={data.accountNumber}
                  onChange={handleChange}
                  placeholder="Account Number"
                  required
                  disabled
                />
              </div>
              <div className="field">
                <label className="label">Account Type:</label>
                <input
                  type="text"
                  name="accountType"
                  value={data.accountType}
                  onChange={handleChange}
                  placeholder="Type"
                  disabled
                  // required
                />
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label className="label">District:</label>
                <input
                  type="text"
                  name="district"
                  value={data.district}
                  onChange={handleChange}
                  placeholder="District"
                  disabled
                  // required
                />
              </div>
              <div className="field">
                <label className="label">Branch:</label>
                <input
                  type="text"
                  name="branch"
                  value={data.branch}
                  onChange={handleChange}
                  placeholder="Branch"
                  disabled
                  // required
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
                    disabled
                  >
                    <option></option>
                    {role === "bankUser" && (
                      <option value="federation"> For Federation</option>
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
                    placeholder="Federations"
                    search
                    clearable
                    selection
                    options={fdOptions}
                    value={data.federation?.federationId} // Bind the selected value to the state
                    onChange={handleFederationChange}
                    disabled
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
                      disabled
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
                    disabled
                  />
                </div>
              )}
            </div>
            <div className="two fields">
              <div className="field">
                <label className="label">Account Balance:</label>
                <input
                  type="number"
                  name="accountBalance"
                  value={data.accountBalance}
                  onChange={handleChange}
                  placeholder="Account Balance"
                  required
                />
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

export default AddBalanceModal;
