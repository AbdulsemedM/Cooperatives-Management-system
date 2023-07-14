import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import ReactDataTable from "../../containers/DataTable";
import CreateAccountModal from "../../containers/CreateAccountModal";
import { useDispatch, useSelector } from "react-redux";
import { getAccountData } from "../../redux/actions/capital.action";

const AccountFilterMenu = ({
  activeTab,
  setActiveTab,
  union,
  prCooperative,
  isPrCoop,
  role,
  prCooperativeID,
  unionID,
}) => {
  const [dataToEdit, setDataToEdit] = useState();

  const [dispatched, setDispatched] = useState(false);
  const handleAssign = () => {
    setDispatched(true);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      role === "admin"
        ? dispatch(getAccountData())
        : role === "unionUser"
        ? dispatch(getAccountData(unionID))
        : dispatch(getAccountData(prCooperativeID));
    };
    fetchData();
  }, [unionID, prCooperativeID, role, dispatch]);

  const capitalData = useSelector();
  const { account } = capitalData;

  // const MySwal = withReactContent(Swal);

  // const handleDelete = async (id, tableName) => {
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         API.delete(`/${tableName}/deleteUnion${id}`).then((res) => {
  //           // console.log(res);
  //           return res;
  //         });
  //         //   setChanged(true);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       MySwal.fire("Deleted!", "Your file has been deleted.", "success");
  //     }
  //   });
  // };

  // start

  const accountsColumn = [
    {
      name: "union",
      selector: (row) => row.union?.name,
      sortable: true,
      omit: isPrCoop ? true : false,
    },
    {
      name: "Pr Cooperative",
      selector: (row) => row.prCooperative?.name,
      sortable: true,
      omit: isPrCoop ? false : true,
    },
    {
      name: "accountNumber",
      selector: (row) => row.accountNumber,
      sortable: true,
    },
    {
      name: "district",
      selector: (row) => row.district,
      sortable: true,
    },
    {
      name: "branch",
      selector: (row) => row.branch,
      sortable: true,
    },
    {
      cell: (row) => {
        return (
          <div className="whitespace-nowrap">
            <span
              className="mx-2 cursor-pointer text-xl"
              onClick={() => {
                setDataToEdit(row);
                handleAssign();
              }}
            >
              <i className="edit teal icon"></i>
            </span>
            <span className="mx-2 cursor-pointer text-xl">
              <i className="info teal icon"></i>
            </span>
            {/* <span
              className="mx-2 cursor-pointer text-xl"
              onClick={() => handleDelete(row.id, "type")}
            >
              <i className="trash red icon"></i>
            </span> */}
          </div>
        );
      },
      right: true,
    },
  ];
  // end

  return (
    <div className="mx-5">
      <div className="ui secondary pointing menu">
        <span
          className={`${
            activeTab === "accounts" && "active teal"
          } item   cursor-pointer`}
          onClick={() => setActiveTab("accounts")}
        >
          Accounts
        </span>
      </div>
      <div>
        <ReactDataTable data={account} columns={accountsColumn} />
      </div>
      {activeTab === "accounts" && (
        <CreateAccountModal
          title="Edit Paid Up Share"
          dataToEdit={dataToEdit}
          edit={true}
          isPrCoop={isPrCoop}
          union={union}
          isLoan={false}
          prCooperative={prCooperative}
          setDispatched={setDispatched}
          dispatched={dispatched}
        />
      )}
    </div>
  );
};

export default AccountFilterMenu;
