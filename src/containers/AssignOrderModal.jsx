import React, { useEffect } from "react";
import { Button, Modal } from "semantic-ui-react";

function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

const AssignOrderModal = ({
  dispatched,
  setDispatched,
  selectedOrderNo,
  preassigned,
}) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  useEffect(() => {
    dispatched && dispatch({ type: "open", size: "tiny" });
  }, [dispatched]);

  return (
    <Modal
      centered={false}
      size={size}
      open={open}
      onClose={() => {
        dispatch({ type: "close" });
        setDispatched(false);
      }}
    >
      <Modal.Header>
        <span className="flex items-center justify-center">Assign Job</span>
      </Modal.Header>
      <Modal.Content>
        <div className="py-2 px-5">
          <h4 className="flex items-center justify-between ui header dividing">
            <span className="">Drivers</span>
            <span>Order No: {selectedOrderNo}</span>

            <span className="">No of Assigned Orders</span>
          </h4>
          <div className="flex items-center justify-between px-4 my-1 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
            <div className="flex items-center">
              <div className="border bg-gray-200 rounded-full p-1">
                <img
                  className="ui avatar image"
                  alt="logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCoKsQV8sr1bI2UaogLjBz8kD6F1qopXkUItsD-17X&s"
                />
              </div>
              <div className="ml-1 w-28">
                <div className="font-semibold text-black">Amir E.</div>
                <div className="meta">Not Connected</div>
              </div>
            </div>
            <div className="border rounded-full p-1 bg-gray-100">
              <i className="car icon"></i>
            </div>
            <span className="border px-3 py-1 rounded-full bg-gray-100">2</span>
          </div>
          {/*  */}
          <div className="flex items-center justify-between px-4 my-1 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
            <div className="flex items-center">
              <div className="border bg-gray-200 rounded-full p-1">
                <img
                  className="ui avatar image"
                  alt="logo"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCoKsQV8sr1bI2UaogLjBz8kD6F1qopXkUItsD-17X&s"
                />
              </div>
              <div className="ml-1 w-28">
                <div className="font-semibold text-black">Yared M.</div>
                <div className="meta">Connected</div>
              </div>
            </div>
            <div className="border rounded-full p-1 bg-gray-100">
              <i className="car icon"></i>
            </div>
            <span className="border px-3 py-1 rounded-full bg-gray-100">0</span>
          </div>
          {/*  */}
        </div>
      </Modal.Content>
      <Modal.Actions>
        {preassigned && (
          <div className="mx-5">
            <Button
              onClick={() => {
                dispatch({ type: "close" });
                setDispatched(false);
              }}
            >
              Unassign
            </Button>
          </div>
        )}
      </Modal.Actions>
    </Modal>
  );
};

export default AssignOrderModal;
