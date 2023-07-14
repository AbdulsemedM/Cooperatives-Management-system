import React, { useEffect, useState } from "react";
import { Button, Modal, Popup } from "semantic-ui-react";
import { API } from "../../utils/API";
import { PrintDetail } from "./PrintDetail";
import DetailToPrint from "./DetailToPrint";

function DetailModal({ row, prDetail }) {
  const [paidUpShare, setPaidUpShare] = useState();
  const [osLaon, setOsLaon] = useState();
  const [commodity, setCommodity] = useState();
  const [account, setAccount] = useState([]);
  const [totalCapital, setTotalCapital] = useState();
  const [asset, setAsset] = useState();
  const [liability, setLiability] = useState();
  useEffect(() => {
    setPaidUpShare([]);
    setOsLaon([]);
    const fetchData = async () => {
      prDetail
        ? await API.get(
            `/paidUpShare/prCooperative/${row?.prCooperativeId}`
          ).then((res) => setPaidUpShare(res.data))
        : await API.get(`/paidUpShare/union/${row?.unionId}`).then((res) =>
            setPaidUpShare(res.data)
          );
      prDetail
        ? await API.get(
            `/osLoan/getByPrCooperativeId/${row?.prCooperativeId}`
          ).then((res) => setOsLaon(res.data))
        : await API.get(`/osLoan/getByUnionId/${row?.unionId}`).then((res) =>
            setOsLaon(res.data)
          );
      prDetail
        ? await API.get(
            `/commodity/getByPrCooperativeId/${row?.prCooperativeId}`
          ).then((res) => setCommodity(res.data))
        : await API.get(`/commodity/getByUnionId/${row?.unionId}`).then((res) =>
            setCommodity(res.data)
          );
      prDetail
        ? await API.get(
            `/account/getByPrCooperativeId/${row?.prCooperativeId}`
          ).then((res) => setAccount(res.data))
        : await API.get(`/account/getByUnionId/${row?.unionId}`).then((res) =>
            setAccount(res.data)
          );
      prDetail
        ? await API.get(`/asset/prCooperative/${row?.prCooperativeId}`).then(
            (res) => setAsset(res.data)
          )
        : await API.get(`/asset/union/${row?.unionId}`).then((res) =>
            setAsset(res.data)
          );
      prDetail
        ? await API.get(
            `/liability/getByPrCooperativeId/${row?.prCooperativeId}`
          ).then((res) => setLiability(res.data))
        : await API.get(`/liability/getByUnionId/${row?.unionId}`).then((res) =>
            setLiability(res.data)
          );
      prDetail &&
        (await API.get(
          `/totalCapital/prCooperative/${row?.prCooperativeId}`
        ).then((res) => setTotalCapital(res.data)));
    };
    fetchData();
  }, [prDetail, row?.prCooperativeId, row?.unionId]);
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      centered={false}
      open={open}
      size="large"
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
      <Modal.Header>{row?.name}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <DetailToPrint
            prDetail={prDetail}
            row={row}
            liability={liability}
            asset={asset}
            totalCapital={totalCapital}
            account={account}
            commodity={commodity}
            osLaon={osLaon}
            paidUpShare={paidUpShare}
            fromprint={false}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className="flex items-center justify-end">
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <PrintDetail
          prDetail={prDetail}
          row={row}
          liability={liability}
          asset={asset}
          totalCapital={totalCapital}
          account={account}
          commodity={commodity}
          osLaon={osLaon}
          paidUpShare={paidUpShare}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default DetailModal;
