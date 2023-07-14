export const UnionColumn = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Phone Number",
    selector: (row) => row.address.phoneNumber,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.address.email,
    sortable: true,
  },
  {
    name: "Woreda",
    selector: (row) => row.address.woreda,
    sortable: true,
  },
  {
    name: "Sector",
    selector: (row) => row.sector.name,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type.typeName,
    sortable: true,
    omit: true,
  },
  {
    cell: (row) => {
      return (
        <div className="whitespace-nowrap">
          <span className="mx-2 text-xl">
            <i className="edit teal icon"></i>
          </span>
          <span className="mx-2 text-xl">
            <i className="info teal icon"></i>
          </span>
          <span className="mx-2 text-xl">
            <i className="trash red icon"></i>
          </span>
        </div>
      );
    },
  },
];
