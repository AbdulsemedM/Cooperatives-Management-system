import React from "react";
import { Button, Modal, Popup } from "semantic-ui-react";

function MemberDetailModal({ row }) {
  // console.log("row", row);
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <button>
          <Popup
            content="Details"
            trigger={
              <i className="file alternate outline outline-none teal icon"></i>
            }
          />
        </button>
      }
    >
      <Modal.Header>{row?.fullName}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div className="flex justify-around mb-3">
            <div className="font-bold text-2xl">Personal Information:</div>
            <div className="font-bold text-2xl">Address:</div>
          </div>
          <div className="flex justify-around">
            <div className="flex justify-between">
              <div className="flex flex-col mr-10">
                <span className="font-bold text-lg mb-2">Full Name: </span>
                <span className="font-bold text-lg mb-2">Gender: </span>
                <span className="font-bold text-lg mb-2">Pr Cooperative: </span>
                <span className="font-bold text-lg mb-2">Is Founder: </span>
                <span className="font-bold text-lg mb-2">Union: </span>
                <span className="font-bold text-lg mb-2">Email: </span>
                <span className="font-bold text-lg mb-2">Phone Number: </span>
                <span className="font-bold text-lg mb-2">
                  Date Registered:{" "}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg mb-2">{row?.fullName}</span>
                <span className="text-lg mb-2">{row?.gender}</span>
                <span className="text-lg mb-2">{row?.prCooperative?.name}</span>
                <span className="text-lg mb-2">
                  {row?.isFounder ? "TRUE" : "FALSE"}
                </span>
                <span className="text-lg mb-2">
                  {row?.union?.name ? row?.union?.name : "Null"}
                </span>
                <span className="text-lg mb-2">{row?.address?.email}</span>
                <span className="text-lg mb-2">
                  {row?.address?.phoneNumber}
                </span>
                <span className="text-lg mb-2">{row?.dateCreated}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <div className="flex flex-col mr-10">
                  <span className="font-bold text-lg mb-2">Country: </span>
                  <span className="font-bold text-lg mb-2">Region: </span>
                  <span className="font-bold text-lg mb-2">Zone: </span>
                  <span className="font-bold text-lg mb-2">Woreda: </span>
                  <span className="font-bold text-lg mb-2">Town: </span>
                  <span className="font-bold text-lg mb-2">Kebele: </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg mb-2">Ethiopia</span>
                  <span className="text-lg mb-2">{row?.address?.region}</span>
                  <span className="text-lg mb-2">{row?.address?.woreda}</span>
                  <span className="text-lg mb-2">{row?.address?.zone}</span>
                  <span className="text-lg mb-2">{row?.address?.town}</span>
                  <span className="text-lg mb-2">{row?.address?.kebele}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default MemberDetailModal;
