import React from "react";
import DataTable from "react-data-table-component";
import Spinner from "../components/Spinner/Spinner";
import "./styles.css";

const CustomLoader = () => (
  <div>
    <h1>Loading data...</h1>
    <Spinner />
  </div>
);

const customStyles = {
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};

const ReactDataTable = ({ columns, data, loading }) => {
  // const [pending, setPending] = React.useState(true);
  // const [rows, setRows] = React.useState([]);

  // useEffect(() => {
  //   data?.length && setPending(false);
  //   data?.length === 0 && setPending(true);
  //   const timeout = setTimeout(() => {
  //     setPending(false);
  //   }, 3500);
  //   return () => clearTimeout(timeout);
  // }, [data]);

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        className="my-custom-table"
        pagination
        selectableRows
        progressPending={data?.length ? false : loading ? loading : false}
        progressComponent={<CustomLoader />}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        dense
      />
    </div>
  );
};

export default ReactDataTable;
