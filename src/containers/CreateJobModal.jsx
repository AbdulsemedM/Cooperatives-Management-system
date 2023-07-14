import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "semantic-ui-react";
import { API } from "../utils/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectPrCooperativeID } from "../redux/user/userSelector";

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

const CreateJobModal = ({
  dispatched,
  setDispatched,
  title,
  edit,
  union,
  prCooperative,
  dataToEdit,
  role,
  prCooperativeID1,
  unionID,
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
    for: "",
  });

  useEffect(() => {
    dataToEdit &&
      setForType({
        for: dataToEdit?.prCooperative?.prCooperativeId
          ? "PrCooperative"
          : dataToEdit?.union?.unionId
          ? "union"
          : "",
      });
  }, [dataToEdit]);

  const [data, setData] = useState({
    jobTitle: "",
    employeeNumber: "",
    dateGenerated: "",
    prCooperative: {
      prCooperativeId:
        role === "primaryCooperativeUser" || role === "unionUser"
          ? prCooperativeID1
          : "",
    },
    union: {
      unionId:
        role === "primaryCooperativeUser" || role === "unionUser"
          ? unionID
          : "",
    },
  });

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
      union: {
        unionId: "",
      },
      prCooperative: {
        prCooperativeId: "", // Update the prCooperativeId property with the selected value
      },
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

  const handleUnionChange = (event, data) => {
    setData((prevData) => ({
      ...prevData,
      union: {
        unionId: data.value, // Update the unionId property with the selected value
      },
      prCooperative: null,
    }));
  };

  const registerSector = async (e) => {
    const tableName = "job";
    // console.log("hello", prCooperativeID1);

    e.preventDefault();
    try {
      (await edit)
        ? API.put(`/${tableName}/edit/${dataToEdit.jobId}`, data).then(
            (res) => {
              if (res.status === 200) {
                Alert("Updated Successfully", "success");
                dispatch({ type: "CLOSE_MODAL" });
                setDispatched(false);
              } else {
                Alert("Failed to update job", "error");
              }
              return res;
            }
          )
        : API.post(`/${tableName}/add`, data).then((res) => {
            if (res.status === 200) {
              Alert("Created Successfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
            } else {
              Alert("Failed to create job", "error");
            }

            return res;
          });
    } catch (error) {
      Alert("Something went wrong", "error");
      dispatch({ type: "CLOSE_MODAL" });
      setDispatched(false);
    }
  };

  useEffect(() => {
    dataToEdit &&
      setData({
        jobTitle: dataToEdit?.jobTitle,
        employeeNumber: dataToEdit?.employeeNumber,
        dateGenerated: dataToEdit?.dateGenerated,
        union: {
          unionId: dataToEdit?.union?.unionId,
        },
        prCooperative: {
          prCooperativeId: dataToEdit?.prCooperative?.prCooperativeId,
        },
      });
  }, [dataToEdit]);

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
              {
                <div className="field">
                  <label className="label">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={data.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title"
                    required
                  />
                </div>
              }
              <div className="field">
                <label className="label">Employee Number:</label>
                <input
                  type="number"
                  name="employeeNumber"
                  value={data.employeeNumber}
                  onChange={handleChange}
                  placeholder="Number of Employees"
                  required
                />
              </div>
            </div>

            <div className="two fields">
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
                  <option value="union">For Union</option>
                  <option value="PrCooperative">For Cooperative</option>
                </select>
              </div>
            </div>
            {(role === "unionUser" || role === "bankUser") &&
              forType.for === "PrCooperative" && (
                <div className="two fields">
                  <div className="field">
                    <label className="label">Pr Cooperative</label>
                    <Dropdown
                      placeholder="Pr cooperatives"
                      search
                      selection
                      options={prOptions}
                      value={data.prCooperative?.prCooperativeId} // Bind the selected value to the state
                      onChange={handlePrCooperativeChange}
                    />
                  </div>
                </div>
              )}
            {(role === "unionUser" || role === "bankUser") &&
              forType.for === "union" && (
                <div className="two fields">
                  <div className="field">
                    <label className="label">Union</label>
                    <Dropdown
                      placeholder="Union"
                      search
                      selection
                      options={unOptions}
                      value={data.union?.unionId} // Bind the selected value to the state
                      onChange={handleUnionChange}
                    />
                  </div>
                </div>
              )}

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

const mapStateToProps = createStructuredSelector({
  prCooperativeID1: selectPrCooperativeID,
});

export default connect(mapStateToProps)(CreateJobModal);
