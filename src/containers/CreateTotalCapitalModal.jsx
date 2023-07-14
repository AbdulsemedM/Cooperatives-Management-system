import React, { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
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

const CreateTotalCapitalModal = ({
  dispatched,
  setDispatched,
  title,
  edit,
  // union,
  role,
  prCooperativeID,
  unionID,
  // prCooperative,
  dataToEdit,
}) => {
  // console.log("pr", role, " ", prCooperativeID, " ", unionID);
  const [data, setData] = useState({
    totalCapitalValue: "",
    dateGenerated: "",
    prCooperative:
      role === "primaryCooperativeUser" && prCooperativeID
        ? {
            prCooperativeId: prCooperativeID,
          }
        : null,
  });
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
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    // dimmer: undefined,
  });
  // const [prCooperative1, setPrCooperatives] = useState([]);
  const { open } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data, //spread operator
      [name]: value,
    });
  };
  //   const handleUnionChange = (event) => {
  //     const { name, value } = event.target;
  //     setData((prevState) => ({
  //       ...prevState,
  //       union: {
  //         ...prevState.union,
  //         [name]: value,
  //       },
  //     }));
  //   };

  // const handlePrCooperativeChange = (event) => {
  //   const { name, value } = event.target;
  //   setData((prevState) => ({
  //     ...prevState,
  //     prCooperative: {
  //       ...prevState.prCooperative,
  //       [name]: value,
  //     },
  //   }));
  // };

  const registerSector = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      (await edit)
        ? API.put(`/totalCapital/edit/${dataToEdit.totalCapitalId}`, data).then(
            (res) => {
              if (res.status === 200) {
                Alert("Updated Successfully", "success");
                dispatch({ type: "CLOSE_MODAL" });
                setDispatched(false);
              } else {
                Alert("Failed to updated total capital", "error");
              }
              return res;
            }
          )
        : API.post(`/totalCapital/add`, data).then((res) => {
            // console.log(res);
            if (res.status === 200) {
              Alert("Created Successfully", "success");
              dispatch({ type: "CLOSE_MODAL" });
              setDispatched(false);
            } else {
              Alert("Failed to create total capital", "error");
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await API.get("/prCooperatives/getPrCooperatives").then((res) =>
  //       setPrCooperatives(res.data)
  //     );
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    dataToEdit &&
      setData({
        totalCapitalValue: dataToEdit?.totalCapitalValue,
        dateGenerated: dataToEdit?.dateGenerated,
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
      });
  }, [dataToEdit, role, prCooperativeID, unionID]);

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
                <label className="label">Total Capital Value:</label>
                <input
                  type="number"
                  name="totalCapitalValue"
                  value={data.totalCapitalValue}
                  onChange={handleChange}
                  placeholder="Capital Value"
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
            {/* <div className="two fields">
              <div className="field">
                <label className="label">Pr-Cooperative</label>
                <select
                  className="ui dropdown"
                  name="prCooperativeId"
                  value={data?.prCooperative?.prCooperativeId}
                  onChange={handlePrCooperativeChange}
                  required
                >
                  <option></option>
                  <option></option>
                  {prCooperative1?.map((item, index) => (
                    <option value={item.prCooperativeId} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}
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

export default CreateTotalCapitalModal;
