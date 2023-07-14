import React, { useEffect, useState } from "react";
import PieChartDraw from "../Charts/PieChart";
import LineChartDraw from "../Charts/LineChart";
import PieChart2 from "../Charts/PieChart2";
import { API } from "../../utils/API";
import { Form } from "semantic-ui-react";

const BankAdminNotifications = () => {
  const [prCooperative, setPrCooperative] = useState([]);
  const [unionFetched, setUnionFetched] = useState([]);
  const [paidUpShare, setPaidUpShare] = useState([]);
  const [osLoan, setOsLoan] = useState([]);

  const [asset, setAsset] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [commodity, setCommodity] = useState([]);

  const currentDate = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState(currentDate);

  useEffect(() => {
    const fetchData = async () => {
      await API.get("/prCooperatives/getPrCooperatives").then((res) => {
        setPrCooperative(res.data);
      });
      await API.get("/paidUpShare/getPaidUpShares").then((res) => {
        setPaidUpShare(res.data);
      });
      await API.get("/osLoan/getosLoans").then((res) => {
        setOsLoan(res.data);
      });
      await API.get("/union/getUnions").then((res) => {
        setUnionFetched(res.data);
      });
      await API.get("/asset/getAssets").then((res) => {
        setAsset(res.data);
      });
      await API.get("/liability/getLiabilities").then((res) => {
        setLiabilities(res.data);
      });
      await API.get("/commodity/getcommodities").then((res) => {
        setCommodity(res.data);
      });
    };
    fetchData();
  }, []);
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
                Total Unions
              </span>
              <span className="my-3">
                {
                  unionFetched?.filter((union) => {
                    const unionDate = new Date(union.dateOfEstablishmnet);
                    return (
                      unionDate >= new Date(fromDate || "1000-01-01") &&
                      unionDate <= new Date(toDate)
                    );
                  }).length
                }
              </span>
            </div>
            <div>
              <span className="px-1 text-sm rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-gray-700">
                {
                  unionFetched?.filter((union) => {
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
                unionFetched?.filter((union) => {
                  const unionDate = new Date(union.dateOfEstablishmnet);
                  return (
                    unionDate >= new Date(fromDate || "1000-01-01") &&
                    unionDate <= new Date(toDate)
                  );
                }).length
              }
              data2={
                unionFetched?.filter((union) => {
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
                {
                  prCooperative?.filter((coop) => {
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
              <span className="px-1 text-sm  border rounded-lg opacity-50 bg-[#6AF6BD] mr-2 text-black">
                {
                  prCooperative?.filter((prCoop) => {
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
                prCooperative?.filter((coop) => {
                  const coopDate = new Date(coop.dateOfEstablishmnet);
                  return (
                    coopDate >= new Date(fromDate || "1000-01-01") &&
                    coopDate <= new Date(toDate)
                  );
                }).length
              }
              data2={
                prCooperative?.filter((prCoop) => {
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
          <div className="">
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
                  return (
                    assetDate >= new Date(fromDate || "1000-01-01") &&
                    assetDate <= new Date(toDate)
                  );
                })
                .reduce((assetSum, loan) => {
                  return assetSum + loan.value;
                }, 0)}
              data2={liabilities
                ?.filter((liabilities) => {
                  const liabilitiesDate = new Date(liabilities.dateGenerated);
                  return (
                    liabilitiesDate >= new Date(fromDate || "1000-01-01") &&
                    liabilitiesDate <= new Date(toDate)
                  );
                })
                .reduce((liabilitiesSum, loan) => {
                  return liabilitiesSum + loan.liabilityValue;
                }, 0)}
              data3={commodity
                ?.filter((commodity) => {
                  const commodityDate = new Date(commodity.dateGenerated);
                  return (
                    commodityDate >= new Date(fromDate || "1000-01-01") &&
                    commodityDate <= new Date(toDate)
                  );
                })
                .reduce((commoditySum, loan) => {
                  return commoditySum + loan.osLoanValue;
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
                    return (
                      assetDate >= new Date(fromDate || "1000-01-01") &&
                      assetDate <= new Date(toDate)
                    );
                  })
                  .reduce((assetSum, loan) => {
                    return assetSum + loan.value;
                  }, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Liability</span>
              <span>
                {liabilities
                  ?.filter((liabilities) => {
                    const liabilitiesDate = new Date(liabilities.dateGenerated);
                    return (
                      liabilitiesDate >= new Date(fromDate || "1000-01-01") &&
                      liabilitiesDate <= new Date(toDate)
                    );
                  })
                  .reduce((liabilitiesSum, loan) => {
                    return liabilitiesSum + loan.liabilityValue;
                  }, 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Commodity</span>
              <span>
                {commodity
                  ?.filter((commodity) => {
                    const commodityDate = new Date(commodity.dateGenerated);
                    return (
                      commodityDate >= new Date(fromDate || "1000-01-01") &&
                      commodityDate <= new Date(toDate)
                    );
                  })
                  .reduce((commoditySum, loan) => {
                    return commoditySum + loan.osLoanValue;
                  }, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAdminNotifications;
