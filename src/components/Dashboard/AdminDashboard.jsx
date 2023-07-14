import React, { useEffect, useState } from "react";
import PieChartDraw from "../Charts/PieChart";
import LineChartDraw from "../Charts/LineChart";
import PieChart2 from "../Charts/PieChart2";
import { Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getPCData, getUnionData } from "../../redux/actions/union.action";
import {
  getOSLoanData,
  getPaidUpShareData,
} from "../../redux/actions/capital.action";
import {
  getAssetData,
  getCommodityData,
  getLiabilityData,
} from "../../redux/actions/sheet.action";

const AdminDashboard = () => {
  // const [prCooperative, setPrCooperative] = useState([]);
  // const [unionFetched, setUnionFetched] = useState([]);
  // const [paidUpShare, setPaidUpShare] = useState([]);
  // const [osLoan, setOsLoan] = useState([]);

  // const [asset, setAsset] = useState([]);
  // const [liabilities, setLiabilities] = useState([]);
  // const [commodity, setCommodity] = useState([]);

  const currentDate = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(currentDate);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getPCData());
      dispatch(getPaidUpShareData());
      dispatch(getOSLoanData());
      dispatch(getUnionData());
      dispatch(getAssetData());
      dispatch(getLiabilityData());
      dispatch(getCommodityData());
    };
    fetchData();
  }, [dispatch]);
  const unionData = useSelector((state) => state.unions);
  const { unions, pc } = unionData;
  const sheetData = useSelector((state) => state.sheet);
  const { liability, asset, commodity } = sheetData;

  const capitalData = useSelector((state) => state.capital);
  const { paidUpShare, osLoan } = capitalData;

  // const data = [{ value: 400 }, { value: 200 }];
  const handleFromDateChange = (e, { value }) => {
    setFromDate(value);
  };

  const handleToDateChange = (e, { value }) => {
    setToDate(value);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-lg font-semibold hidden md:block">
            Dashboard
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
                Total Unions
              </span>
              <span className="my-3">
                {
                  unions?.filter((union) => {
                    const unionDate = new Date(union.dateOfEstablishmnet);
                    return unionDate <= new Date(toDate);
                  }).length
                }
              </span>
            </div>
            <div>
              <span className="px-1 text-sm rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-gray-700">
                {
                  unions?.filter((union) => {
                    const currentYear = new Date().getFullYear();
                    const previousYear = currentYear - 1;
                    const itemYear = new Date(
                      union.dateOfEstablishmnet
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
                unions?.filter((union) => {
                  const unionDate = new Date(union.dateOfEstablishmnet);
                  return unionDate <= new Date(toDate);
                }).length
              }
              data2={
                unions?.filter((union) => {
                  const currentYear = new Date().getFullYear();
                  const previousYear = currentYear - 1;
                  const itemYear = new Date(
                    union.dateOfEstablishmnet
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
                Total Pr Cooperatives
              </span>
              <span className="my-3">
                {pc
                  ?.filter((coop) => {
                    const coopDate = new Date(coop.dateOfEstablishmnet);
                    return coopDate <= new Date(toDate);
                  })
                  .length.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="px-1 text-sm  border rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-black">
                {pc
                  ?.filter((prCoop) => {
                    const currentYear = new Date().getFullYear();
                    const previousYear = currentYear - 1;
                    const itemYear = new Date(
                      prCoop.dateOfEstablishmnet
                    ).getFullYear();
                    return itemYear >= previousYear;
                  })
                  .length.toLocaleString()}
              </span>
              <span className="text-gray-700">Since Last Year</span>
            </div>
          </div>
          <div className="borderf">
            <PieChartDraw
              data1={
                pc?.filter((coop) => {
                  const coopDate = new Date(coop.dateOfEstablishmnet);
                  return coopDate <= new Date(toDate);
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
              <span className="my-3 text-xl">
                {paidUpShare
                  ?.filter((paidUpShare) => {
                    const paidUpShareDate = new Date(paidUpShare.dateGenerated);
                    return paidUpShareDate <= new Date(toDate);
                  })
                  .reduce((paidUpSum, paid) => {
                    return paidUpSum + paid.paidUpValue;
                  }, 0)
                  .toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="whitespace-nowrap">
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
                  }, 0)
                  .toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-gray-700">Since Last Year</span>
            </div>
          </div>
          <div className="borderf">
            <PieChartDraw
              data1={paidUpShare
                ?.filter((paidUpShare) => {
                  const paidUpShareDate = new Date(paidUpShare.dateGenerated);
                  return paidUpShareDate <= new Date(toDate);
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
              <span className="my-3 text-xl">
                {osLoan
                  ?.filter((osLoan) => {
                    const osLoanDate = new Date(osLoan.dateGenerated);
                    return osLoanDate <= new Date(toDate);
                  })
                  .reduce((osloanSum, loan) => {
                    return osloanSum + loan.osLoanValue;
                  }, 0)
                  .toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="whitespace-nowrap">
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
                  }, 0)
                  .toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-gray-700 text-sm">Since Last Year</span>
            </div>
          </div>
          <div className="">
            <PieChartDraw
              data1={osLoan
                ?.filter((osLoan) => {
                  const osLoanDate = new Date(osLoan.dateGenerated);
                  return osLoanDate <= new Date(toDate);
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
      </div>
      <div className="mt-5 grid lg:grid-cols-11 gap-4">
        <div className="col-span-7 p-3 drop-shadow bg-white">
          <div className="text-cyan-800 text-xl mb-3">
            <span>Total Capital</span>
          </div>
          <LineChartDraw />
        </div>
        <div className="col-span-4 bg-white shadow">
          <div className="flex items-center justify-end p-5">
            <button className="border rounded p-1 m-1 px-2 shadow-sm border-cyan-500">
              All
            </button>
            <button className="border rounded p-1 m-1 px-2 shadow-sm">
              1Yr
            </button>
            <button className="border rounded p-1 m-1 px-2 shadow-sm">
              3Yrs
            </button>
            <button className="border rounded p-1 m-1 px-2 shadow-sm">
              5Yrs
            </button>
          </div>
          <div>
            <PieChart2
              data1={asset
                ?.filter((asset) => {
                  const assetDate = new Date(asset.dateGenerated);
                  return assetDate <= new Date(toDate);
                })
                .reduce((assetSum, loan) => {
                  return assetSum + loan.value;
                }, 0)}
              data2={liability
                ?.filter((liabilities) => {
                  const liabilitiesDate = new Date(liabilities.dateGenerated);
                  return liabilitiesDate <= new Date(toDate);
                })
                .reduce((liabilitiesSum, loan) => {
                  return -1 * (liabilitiesSum + loan.liabilityValue);
                }, 0)}
              data3={commodity
                ?.filter((commodity) => {
                  const commodityDate = new Date(commodity.dateGenerated);
                  return commodityDate <= new Date(toDate);
                })
                .reduce((commoditySum, loan) => {
                  return commoditySum + loan.CommodityValue;
                }, 0)}
            />
          </div>
          <div className="flex flex-col mx-10 text-gray-700 text-lg">
            <div className="flex items-center justify-between">
              <span>Asset</span>
              <span>
                {asset
                  ?.filter((asset) => {
                    const assetDate = new Date(asset.dateGenerated);
                    return assetDate <= new Date(toDate);
                  })
                  .reduce((assetSum, loan) => {
                    return assetSum + loan.value;
                  }, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Liability</span>
              <span>
                {liability
                  ?.filter((liabilities) => {
                    const liabilitiesDate = new Date(liabilities.dateGenerated);
                    return liabilitiesDate <= new Date(toDate);
                  })
                  .reduce((liabilitiesSum, loan) => {
                    return (liabilitiesSum + loan.liabilityValue) * -1;
                  }, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Commodity</span>
              <span>
                {commodity
                  ?.filter((commodity) => {
                    const commodityDate = new Date(commodity.dateGenerated);
                    return commodityDate <= new Date(toDate);
                  })
                  .reduce((commoditySum, loan) => {
                    return commoditySum + loan.CommodityValue;
                  }, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
