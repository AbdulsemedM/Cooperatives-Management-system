import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import PCExcelFileUploader from "./PCExcelFileUploader";
import Spinner from "../../../components/Spinner/Spinner";
import { API } from "../../../utils/API";
import PCExcelFormat from "./ExcelFormat";

const AnnualTurnoverExcelModalCaller = ({ prCooperative }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);
  const [uploadState, setUploadState] = useState(false);
  const [loading, setLoading] = useState(true);
  // console.log(prCooperative)

  let successCount = 0;
  let failCount = 0;

  const handleModalClose = () => {
    setModalOpen(false);
    setDataSubmitted(false);
    setUploadedData([]);
  };

  const handleDataUpload = (data) => {
    setUploadedData(data);
    setUploadState(true);
  };

  const handleSubmit = async () => {
    // eslint-disable-next-line
    // uploadedData?.map(async (item) => {
    //   console.log(item);
    //   await API.post(`/type/add`, item);
    // });
    // console.log(uploadedData);
    // console.log(prCooperative)
    setDataSubmitted(true);
    setUploadState(false);

    async function fetchData(item) {
      try {
        await API.post(`/annualTurnOver/add`, item).then(
          (res) => (successCount = successCount + 1)
        );
      } catch (error) {
        failCount = failCount + 1;
        // console.log("this is failed item", item);
        // console.error("Error adding data:", error);
      }
    }

    async function fetchDataLoop() {
      for (const item of uploadedData) {
        await fetchData(item);
      }
      setLoading(false); // Set loading to false when all requests are completed
    }
    fetchDataLoop();
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>
        {" "}
        <span className="whitespace-nowrap">
          <i className="upload icon whitespace-nowrap"></i>
          <span className="whitespace-nowrap">Annual Turnover Import</span>
        </span>
      </Button>
      <Modal open={modalOpen} size="tiny" onClose={handleModalClose}>
        <Modal.Header>Account Import</Modal.Header>
        <Modal.Content>
          <div className="grid grid-cols-6 gap-4 pb-5">
            <span className="col-span-3">Your Excel Format Should Be:</span>
            <PCExcelFormat />
          </div>
          <Modal.Description>
            {!dataSubmitted ? (
              <PCExcelFileUploader
                prCooperative={prCooperative}
                onDataUpload={handleDataUpload}
              />
            ) : loading ? (
              <Spinner />
            ) : (
              <div className="text-xl">
                <div>{successCount} - Data submitted successfully!</div>
                <div>
                  <span className="text-red-500">{failCount}</span>- Data
                  submitted unsuccessfully!
                </div>
              </div>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={handleModalClose}>
            Close
          </Button>
          <Button color="green" disabled={!uploadState} onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AnnualTurnoverExcelModalCaller;
