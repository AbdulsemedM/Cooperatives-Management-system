import React from "react";
import { logo } from "../../constant";
import "./print.css";

const DetailToPrint = ({
  prDetail,
  row,
  liability,
  asset,
  totalCapital,
  account,
  commodity,
  osLaon,
  paidUpShare,
  fromprint,
}) => {
  const currentDate = new Date();
  const date = currentDate;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return (
    <div>
      {fromprint && (
        <div>
          <div className="flex mb-10 mx-10 items-center justify-between">
            <span className="mr-4">
              <img src={logo} width={150} alt="logo" />
            </span>
            <span className="flex flex-col">
              <span className="font-bold text-2xl text-cyan-500">
                {row?.name} Details
              </span>
              <span className="text-lg">
                Date: {day}-{month}-{year}
              </span>
            </span>
          </div>
          <div className="ui divider"></div>
        </div>
      )}
      <div className="flex justify-around mb-3">
        <div className="font-bold text-2xl">Information:</div>
        <div className="font-bold text-2xl">Address:</div>
      </div>
      <div className="flex justify-around">
        <div className="flex justify-between">
          <div className="flex flex-col mr-10">
            <span className="font-bold text-lg mb-2">Name: </span>
            {prDetail && (
              <span className="font-bold text-lg mb-2">Union Name: </span>
            )}
            <span className="font-bold text-lg mb-2">
              Share Capital Upon Establishment:{" "}
            </span>
            <span className="font-bold text-lg mb-2">
              Date of Establishment:{" "}
            </span>
            <span className="font-bold text-lg mb-2">Is Active: </span>
            <span className="font-bold text-lg mb-2">Email: </span>
            <span className="font-bold text-lg mb-2">Phone Number: </span>
            <span className="font-bold text-lg mb-2">Licensing Organ: </span>
            <span className="font-bold text-lg mb-2">Sector: </span>
            <span className="font-bold text-lg mb-2">Type: </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg mb-2">{row?.name}</span>
            {prDetail && (
              <span className="text-lg mb-2">
                {row?.union?.name ? row?.union?.name : "Null"}
              </span>
            )}
            <span className="text-lg mb-2">
              {row?.shareCapitalUponEstablishmnet} Birr
            </span>
            <span className="text-lg mb-2">{row?.dateOfEstablishmnet}</span>
            <span className="text-lg mb-2">
              {row?.isActive ? "TRUE" : "FALSE"}
            </span>
            <span className="text-lg mb-2">
              {row?.address?.email ? row?.address?.email : "null"}
            </span>
            <span className="text-lg mb-2">{row?.address?.phoneNumber}</span>
            <span className="text-lg mb-2">
              {row?.licensingOrgan ? row?.licensingOrgan : "Null"}
            </span>
            <span className="text-lg mb-2">{row?.sector?.name}</span>
            <span className="text-lg mb-2">{row?.type?.typeName}</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col mr-10">
              <span className="font-bold text-lg mb-2">Country: </span>
              <span className="font-bold text-lg mb-2">Region: </span>
              <span className="font-bold text-lg mb-2">Zone: </span>
              <span className="font-bold text-lg mb-2">Woreda: </span>
              <span className="font-bold text-lg mb-2">Town: </span>
              <span className="font-bold text-lg mb-2">Kebele: </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg mb-2">Ethiopia</span>
              <span className="text-lg mb-2">{row?.address?.region}</span>
              <span className="text-lg mb-2">{row?.address?.zone}</span>
              <span className="text-lg mb-2">{row?.address?.woreda}</span>
              <span className="text-lg mb-2">{row?.address?.town}</span>
              <span className="text-lg mb-2">{row?.address?.kebele}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around my-5">
        <div className="font-bold w-1/3 flex justify-between text-2xl">
          <span className="">Paid Up Share:</span>
        </div>
        <div className="font-bold w-1/3 flex justify-between text-2xl">
          <span className="">Os Loan:</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 mx-10">
        <div>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Date Generated</th>
                <th>Paid Up Value</th>
              </tr>
            </thead>
            <tbody>
              {paidUpShare?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.dateGenerated}</td>
                    <td>{item.paidUpValue?.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-100 text-xl font-bold">
              <tr>
                <td>Total</td>
                <td>
                  {paidUpShare
                    ?.reduce((paidUpSum, balance) => {
                      return paidUpSum + balance.paidUpValue;
                    }, 0)
                    ?.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Date Generated</th>
                <th>OS Loan Value</th>
              </tr>
            </thead>
            <tbody>
              {osLaon?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.dateGenerated}</td>
                    <td>{item.osLoanValue?.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-100 text-xl font-bold">
              <tr>
                <td>Total</td>
                <td>
                  {osLaon
                    ?.reduce((osLoanSum, balance) => {
                      return osLoanSum + balance.osLoanValue;
                    }, 0)
                    ?.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="flex justify-around my-5">
        <div className="font-bold w-1/4 flex justify-between text-2xl">
          <span className="">Commodity:</span>
        </div>
        <div className="font-bold w-1/4 flex justify-between text-2xl">
          <span className="">Account:</span>
        </div>
        {prDetail && (
          <div className="font-bold w-1/4 flex justify-between text-2xl">
            <span className="">Total Capital:</span>
          </div>
        )}
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col">
          {commodity?.length
            ? commodity?.map((item, index) => (
                <span key={index}> - {item.commodityName}</span>
              ))
            : "null"}
        </div>
        <div className="flex flex-col">
          {account?.length
            ? account?.map((item, index) => (
                <span key={index}>- {item.accountNumber}</span>
              ))
            : "null"}
        </div>
        {prDetail && (
          <div>
            <span>
              -{" "}
              {totalCapital
                ?.reduce((totalSum, item) => {
                  return totalSum + item.totalCapitalValue;
                }, 0)
                ?.toLocaleString()}{" "}
              Birr
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-around my-5">
        <div className="font-bold w-1/3 flex justify-between text-2xl">
          <span className="">Asset:</span>
        </div>
        <div className="font-bold w-1/3 flex justify-between text-2xl">
          <span className="">Liability:</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 mx-10">
        <div>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date Generated</th>
                <th>Asset Value</th>
              </tr>
            </thead>
            <tbody>
              {asset?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.assetName}</td>
                    <td>{item.dateGenerated}</td>
                    <td>{item.value?.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-100 text-xl font-bold">
              <tr>
                <td>Total</td>
                <td></td>
                <td>
                  {asset
                    ?.reduce((assetSum, balance) => {
                      return assetSum + balance.value;
                    }, 0)
                    ?.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div>
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Date Generated</th>
                <th>Liability Value</th>
              </tr>
            </thead>
            <tbody>
              {liability?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.dateGenerated}</td>
                    <td>{item.liabilityValue?.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-100 text-xl font-bold">
              <tr>
                <td>Total</td>
                <td>
                  {liability
                    ?.reduce((liabilitySum, balance) => {
                      return liabilitySum + balance.liabilityValue;
                    }, 0)
                    ?.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailToPrint;
