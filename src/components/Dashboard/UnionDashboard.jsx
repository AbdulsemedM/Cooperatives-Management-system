import React, { useEffect, useState } from "react";
import PieChartDraw from "../Charts/PieChart";
// import BarChart from "../Charts/BarChart";
import L1 from "../Charts/L1";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  // selectPrCooperativeID,
  selectUnionID,
} from "../../redux/user/userSelector";
import { Form } from "semantic-ui-react";
import { getPCData } from "../../redux/actions/union.action";
import {
  getAnnualTurnoverData,
  getOSLoanData,
  getPaidUpShareData,
} from "../../redux/actions/capital.action";

const UnionDashboard = ({ unionID }) => {
  
  const currentDate = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(currentDate);

  const handleFromDateChange = (e, { value }) => {
    setFromDate(value);
  };

  const handleToDateChange = (e, { value }) => {
    setToDate(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getPCData(unionID));
      dispatch(getPaidUpShareData(unionID));
      dispatch(getOSLoanData(unionID));
      dispatch(getAnnualTurnoverData(unionID));
    };
    fetchData();
  }, [unionID, dispatch]);

  const capitlaData = useSelector((state) => state.capital);
  const unionData = useSelector((state) => state.unions);
  const { paidUpShare, osLoan, annualTurnover } = capitlaData;
  const { pc } = unionData;

  const data3 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 544,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 233,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 923,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 219,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 679,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 1245,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4567,
      amt: 2100,
    },
  ];

  const data2 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 240,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 338,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 504,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 932,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 3000,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 4222,
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
            Dashboard!
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
                Total Pr Cooperatives
              </span>
              <span className="my-3">
                {
                  pc?.filter((coop) => {
                    const coopDate = new Date(coop.dateOfEstablishmnet);
                    return (
                      coopDate >= new Date(fromDate || "1000-01-01") &&
                      coopDate <= new Date(toDate)
                    );
                  }).length
                }
              </span>
            </div>
            <div>
              <span className="px-1 text-sm rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-gray-700">
                {
                  pc?.filter((prCoop) => {
                    const currentYear = new Date().getFullYear();
                    const previousYear = currentYear - 1;
                    const itemYear = new Date(
                      prCoop.dateOfEstablishmnet
                    ).getFullYear();
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
                pc?.filter((coop) => {
                  const coopDate = new Date(coop.dateOfEstablishmnet);
                  return (
                    coopDate >= new Date(fromDate || "1000-01-01") &&
                    coopDate <= new Date(toDate)
                  );
                }).length
              }
              data2={
                pc?.filter((prCoop) => {
                  const currentYear = new Date().getFullYear();
                  const previousYear = currentYear - 1;
                  const itemYear = new Date(
                    prCoop.dateOfEstablishmnet
                  ).getFullYear();
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
                Annual Turnover
              </span>
              <span className="my-3">
                {annualTurnover
                  ?.filter((turnover) => {
                    const turnoverDate = new Date(turnover.dateGenerated);
                    return (
                      turnoverDate >= new Date(fromDate || "1000-01-01") &&
                      turnoverDate <= new Date(toDate)
                    );
                  })
                  .reduce((turnoverSum, turnover) => {
                    return turnoverSum + turnover.annualTurnOverValue;
                  }, 0)}
              </span>
            </div>
            <div>
              <span className="px-1 text-sm  border rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-black">
                {annualTurnover
                  ?.filter((turnover) => {
                    const currentYear = new Date().getFullYear();
                    const previousYear = currentYear - 1;
                    const itemYear = new Date(
                      turnover.dateGenerated
                    ).getFullYear();
                    return itemYear >= previousYear;
                  })
                  .reduce((osturnoverSum, turnover) => {
                    return osturnoverSum + turnover.annualTurnOverValue;
                  }, 0)}
              </span>
              <span className="text-gray-700">Since Last Year</span>
            </div>
          </div>
          <div className="">
            <PieChartDraw
              data1={annualTurnover
                ?.filter((turnover) => {
                  const turnoverDate = new Date(turnover.dateGenerated);
                  return (
                    turnoverDate >= new Date(fromDate || "1000-01-01") &&
                    turnoverDate <= new Date(toDate)
                  );
                })
                .reduce((turnoverSum, turnover) => {
                  return turnoverSum + turnover.annualTurnOverValue;
                }, 0)}
              data2={annualTurnover
                ?.filter((turnover) => {
                  const currentYear = new Date().getFullYear();
                  const previousYear = currentYear - 1;
                  const itemYear = new Date(
                    turnover.dateGenerated
                  ).getFullYear();
                  return itemYear >= previousYear;
                })
                .reduce((osturnoverSum, turnover) => {
                  return osturnoverSum + turnover.annualTurnOverValue;
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
  unionID: selectUnionID,
  // prCooperativeID: selectPrCooperativeID,
});

export default connect(mapStateToProps)(UnionDashboard);
