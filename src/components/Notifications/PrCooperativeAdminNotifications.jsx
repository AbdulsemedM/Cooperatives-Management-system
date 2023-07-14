import React, { useEffect, useState } from "react";
import PieChartDraw from "../Charts/PieChart";
// import BarChart from "../Charts/BarChart";
import L1 from "../Charts/L1";
import { createStructuredSelector } from "reselect";
import { selectPrCooperativeID } from "../../redux/user/userSelector";
import { connect } from "react-redux";
import { API } from "../../utils/API";
import { Form } from "semantic-ui-react";

const PrCooperativeAdminNotifications = ({ prCooperativeID }) => {
  const [members, setMembers] = useState([]);
  const [paidUpShare, setPaidUpShare] = useState([]);
  const [osLoan, setOsLoan] = useState([]);
  const [annualSale, setAnnualSale] = useState([]);

  const currentDate = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(currentDate);

  const handleFromDateChange = (e, { value }) => {
    setFromDate(value);
  };

  const handleToDateChange = (e, { value }) => {
    setToDate(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await API.get(`/member/getByPrCooperativeId/${prCooperativeID}`).then(
        (res) => {
          setMembers(res.data);
        }
      );
      await API.get(`/paidUpShare/prCooperative/${prCooperativeID}`).then(
        (res) => {
          setPaidUpShare(res.data);
        }
      );
      await API.get(`/osLoan/getByPrCooperativeId/${prCooperativeID}`).then(
        (res) => {
          setOsLoan(res.data);
        }
      );
      await API.get(`/annualSell/prCooperative/${prCooperativeID}`).then(
        (res) => {
          setAnnualSale(res.data);
        }
      );
    };
    fetchData();
  }, [prCooperativeID]);

  const data3 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2789,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 2544,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 2899,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 2389,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 1221,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 1521,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 1000,
      amt: 2100,
    },
  ];

  const data2 = [
    {
      name: "Page A",
      uv: 2700,
      pv: 2700,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1787,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 1890,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3452,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 2900,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3452,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 5433,
      amt: 2100,
    },
  ];
  // const data = [{ value: 400 }, { value: 200 }];
  const data1 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-lg font-semibold hidden md:block">
            Admin / Dashboard
          </span>
        </div>
        <div className="right menu flex flex-col md:flex-row items-center">
          <div className="mx-3">
            <Form.Input
              label="From Date"
              type="date"
              max={toDate}
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div className="">
            <Form.Input
              label="To Date"
              type="date"
              min={fromDate}
              max={currentDate}
              value={toDate}
              onChange={handleToDateChange}
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded drop-shadow p-2  bg-white px-5 flex items-center justify-between">
          <div>
            <div className="flex flex-col items-start justify-center text-3xl text-cyan-500 font-bold">
              <span className="text-lg text-cyan-700 whitespace-nowrap">
                Total Individual Members
              </span>
              <span className="my-3">
                {
                  members?.filter((member) => {
                    const membersDate = new Date(member.dateCreated);
                    return (
                      membersDate >= new Date(fromDate || "1000-01-01") &&
                      membersDate <= new Date(toDate)
                    );
                  }).length
                }
              </span>
            </div>
            <div>
              <span className="px-1 text-sm rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-gray-700">
                {
                  members?.filter((member) => {
                    const currentYear = new Date().getFullYear();
                    const previousYear = currentYear - 1;
                    const itemYear = new Date(member.dateCreated).getFullYear();
                    return itemYear >= previousYear;
                  }).length
                }
              </span>
              <span className="text-gray-700">Since Last Year</span>
            </div>
          </div>
          <div className="borderf">
            <PieChartDraw
              data1={
                members?.filter((member) => {
                  const membersDate = new Date(member.dateCreated);
                  return (
                    membersDate >= new Date(fromDate || "1000-01-01") &&
                    membersDate <= new Date(toDate)
                  );
                }).length
              }
              data2={
                members?.filter((member) => {
                  const currentYear = new Date().getFullYear();
                  const previousYear = currentYear - 1;
                  const itemYear = new Date(member.dateCreated).getFullYear();
                  return itemYear >= previousYear;
                }).length
              }
            />
          </div>
        </div>
        <div className="drop-shadow rounded shadow p-2 bg-white px-5 flex items-center justify-between">
          <div>
            <div className="flex flex-col items-start justify-center text-3xl text-cyan-500 font-bold">
              <span className="text-lg text-cyan-700 whitespace-nowrap">
                Total Paid Up Share
              </span>
              <span className="my-3">
                {paidUpShare
                  ?.filter((paidUpShare) => {
                    const paidUpShareDate = new Date(paidUpShare.dateGenerated);
                    return (
                      paidUpShareDate >= new Date(fromDate || "1000-01-01") &&
                      paidUpShareDate <= new Date(toDate)
                    );
                  })
                  .reduce((paidUpSum, paid) => {
                    return paidUpSum + paid.paidUpValue;
                  }, 0)}
              </span>
            </div>
            <div>
              <span className="px-1 text-sm  border rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-black">
                {paidUpShare
                  ?.filter((paidUpShare) => {
                    const currentYear = new Date().getFullYear();
                    const previousYear = currentYear - 1;
                    const itemYear = new Date(
                      paidUpShare.dateGenerated
                    ).getFullYear();
                    return itemYear >= previousYear;
                  })
                  .reduce((paidUpSum, paid) => {
                    return paidUpSum + paid.paidUpValue;
                  }, 0)}
              </span>
              <span className="text-gray-700">Since Last Year</span>
            </div>
          </div>
          <div className="borderf">
            <PieChartDraw
              data1={paidUpShare
                ?.filter((paidUpShare) => {
                  const paidUpShareDate = new Date(paidUpShare.dateGenerated);
                  return (
                    paidUpShareDate >= new Date(fromDate || "1000-01-01") &&
                    paidUpShareDate <= new Date(toDate)
                  );
                })
                .reduce((paidUpSum, paid) => {
                  return paidUpSum + paid.paidUpValue;
                }, 0)}
              data2={paidUpShare
                ?.filter((paidUpShare) => {
                  const currentYear = new Date().getFullYear();
                  const previousYear = currentYear - 1;
                  const itemYear = new Date(
                    paidUpShare.dateGenerated
                  ).getFullYear();
                  return itemYear >= previousYear;
                })
                .reduce((paidUpSum, paid) => {
                  return paidUpSum + paid.paidUpValue;
                }, 0)}
            />
          </div>
        </div>
        <div className="drop-shadow rounded shadow p-2 bg-white px-5 flex items-center justify-between">
          <div>
            <div className="flex flex-col items-start justify-center text-3xl text-cyan-500 font-bold">
              <span className="text-lg text-cyan-700 whitespace-nowrap">
                Total OS Loan
              </span>
              <span className="my-3">
                {osLoan
                  ?.filter((osLoan) => {
                    const osLoanDate = new Date(osLoan.dateGenerated);
                    return (
                      osLoanDate >= new Date(fromDate || "1000-01-01") &&
                      osLoanDate <= new Date(toDate)
                    );
                  })
                  .reduce((osloanSum, loan) => {
                    return osloanSum + loan.osLoanValue;
                  }, 0)}
              </span>
            </div>
            <div>
              <span className="px-1 text-sm  border rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-black">
                {osLoan
                  ?.filter((loan) => {
                    const currentYear = new Date().getFullYear();
                    const previousYear = currentYear - 1;
                    const itemYear = new Date(loan.dateGenerated).getFullYear();
                    return itemYear >= previousYear;
                  })
                  .reduce((osloanSum, loan) => {
                    return osloanSum + loan.osLoanValue;
                  }, 0)}
              </span>
              <span className="text-gray-700">Since Last Year</span>
            </div>
          </div>
          <div className="borderf">
            <PieChartDraw
              data1={osLoan
                ?.filter((osLoan) => {
                  const osLoanDate = new Date(osLoan.dateGenerated);
                  return (
                    osLoanDate >= new Date(fromDate || "1000-01-01") &&
                    osLoanDate <= new Date(toDate)
                  );
                })
                .reduce((osloanSum, loan) => {
                  return osloanSum + loan.osLoanValue;
                }, 0)}
              data2={osLoan
                ?.filter((loan) => {
                  const currentYear = new Date().getFullYear();
                  const previousYear = currentYear - 1;
                  const itemYear = new Date(loan.dateGenerated).getFullYear();
                  return itemYear >= previousYear;
                })
                .reduce((osloanSum, loan) => {
                  return osloanSum + loan.osLoanValue;
                }, 0)}
            />
          </div>
        </div>
        <div className="drop-shadow rounded shadow p-2 bg-white px-5 flex items-center justify-between">
          <div>
            <div className="flex flex-col items-start justify-center text-3xl text-cyan-500 font-bold">
              <span className="text-lg text-cyan-700 whitespace-nowrap">
                Total Annual sale
              </span>
              <span className="my-3">
                {annualSale
                  ?.filter((annualSale) => {
                    const annualSaleDate = new Date(annualSale.dateGenerated);
                    return (
                      annualSaleDate >= new Date(fromDate || "1000-01-01") &&
                      annualSaleDate <= new Date(toDate)
                    );
                  })
                  .reduce((annualSum, sell) => {
                    return annualSum + sell.annualSellValue;
                  }, 0)}
              </span>
            </div>
            <div>
              <span className="px-1 text-sm  border rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-black">
                {annualSale
                  ?.filter((annualSale) => {
                    const currentYear = new Date().getFullYear();
                    const previousYear = currentYear - 1;
                    const itemYear = new Date(
                      annualSale.dateGenerated
                    ).getFullYear();
                    return itemYear >= previousYear;
                  })
                  .reduce((osannualSaleSum, annualSale) => {
                    return osannualSaleSum + annualSale.annualSellValue;
                  }, 0)}
              </span>
              <span className="text-gray-700">Since Last Year</span>
            </div>
          </div>
          <div className="">
            <PieChartDraw
              data1={annualSale
                ?.filter((annualSale) => {
                  const annualSaleDate = new Date(annualSale.dateGenerated);
                  return (
                    annualSaleDate >= new Date(fromDate || "1000-01-01") &&
                    annualSaleDate <= new Date(toDate)
                  );
                })
                .reduce((annualSum, sell) => {
                  return annualSum + sell.annualSellValue;
                }, 0)}
              data2={annualSale
                ?.filter((annualSale) => {
                  const currentYear = new Date().getFullYear();
                  const previousYear = currentYear - 1;
                  const itemYear = new Date(
                    annualSale.dateGenerated
                  ).getFullYear();
                  return itemYear >= previousYear;
                })
                .reduce((osannualSaleSum, annualSale) => {
                  return osannualSaleSum + annualSale.annualSellValue;
                }, 0)}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 grid lg:grid-cols-3 gap-4">
        <div className=" p-3 drop-shadow bg-[#fefce8]">
          <div className="text-cyan-800 text-xl mb-3">
            <span>Total Capital</span>
          </div>
          <L1 data={data1} />
        </div>
        <div className=" p-3 drop-shadow bg-[#ecfeff]">
          <div className="text-cyan-800 text-xl mb-3">
            <span>Total Paid Up Share</span>
          </div>
          <L1 data={data2} />
        </div>
        <div className=" p-3 drop-shadow bg-[#dcfce7] ">
          <div className="text-cyan-800 text-xl mb-3">
            <span>Total OS Loan</span>
          </div>
          <L1 data={data3} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  prCooperativeID: selectPrCooperativeID,
});

export default connect(mapStateToProps)(PrCooperativeAdminNotifications);
