import React, { useState } from "react";
import { Button, Modal, Table } from "semantic-ui-react";
import SectorExcelFileUploader from "./SectorExcelFileUploader";
import Spinner from "../../../components/Spinner/Spinner";
import { API } from "../../../utils/API";

const SectorExcelModalCaller = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);
  const [uploadState, setUploadState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successful, setSeccessful] = useState(0);

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
    setDataSubmitted(true);
    setUploadState(false);

    async function fetchData(item) {
      try {
        await API.post(`/sector/add`, item).then((res) =>
          setSeccessful(successful + 1)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
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
        <span className="whitespace-nowrap">Sector Import</span>
        </span>
      </Button>
      <Modal open={modalOpen} size="tiny" onClose={handleModalClose}>
        <Modal.Header>Sector Import</Modal.Header>
        <Modal.Content>
          <div className="grid grid-cols-6 gap-4 pb-5">
            <span className="col-span-3">Your Excel Format Should Be:</span>
            <Table celled className="col-span-3">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Coop-business sector</Table.HeaderCell>
                  {/* Add more header cells as needed */}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Sector 1</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Sector 2</Table.Cell>
                </Table.Row>
                {/* Add more rows as needed */}
              </Table.Body>
            </Table>
          </div>
          <Modal.Description>
            {!dataSubmitted ? (
              <SectorExcelFileUploader onDataUpload={handleDataUpload} />
            ) : loading ? (
              <Spinner />
            ) : (
              <div className="text-xl">
                <div>{successful} - Data submitted successfully!</div>
                <div>
                  <span className="text-red-500">
                    {uploadedData.length - successful}
                  </span>
                  - Data submitted unsuccessfully!
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

export default SectorExcelModalCaller;
