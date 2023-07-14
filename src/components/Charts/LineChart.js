import "./chartStypes.css";
import React, { PureComponent, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  getOSLoanData,
  getPaidUpShareData,
} from "../../redux/actions/capital.action";

class CustomizedLabel extends PureComponent {
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }
}

const LineChartDraw = () => {
  const currentYear = new Date().getFullYear();
  const year1 = currentYear - 1;
  const year2 = currentYear - 2;
  const year3 = currentYear - 3;
  const year4 = currentYear - 4;
  const year5 = currentYear - 5;
  const year6 = currentYear - 6;

  // console.log(year1 - 2);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getPaidUpShareData());
      dispatch(getOSLoanData());
    };
    fetchData();
  }, [dispatch]);
  const capitalData = useSelector((state) => state.capital);
  const { paidUpShare, osLoan } = capitalData;

  // console.log(paidUpShare);
  const data = [
    {
      name: year6,
      loan: handleLoan(year6),
      Paidupshare: handleShare(year6),
    },
    {
      name: year5,
      loan: handleLoan(year5),
      Paidupshare: handleShare(year5),
    },
    {
      name: year4,
      loan: handleLoan(year4),
      Paidupshare: handleShare(year4),
    },
    {
      name: year3,
      loan: handleLoan(year3),
      Paidupshare: handleShare(year3),
    },
    {
      name: year2,
      loan: handleLoan(year2),
      Paidupshare: handleShare(year2),
    },
    {
      name: year1,
      loan: handleLoan(year1),
      Paidupshare: handleShare(year1),
    },
    {
      name: currentYear,
      loan: handleLoan(currentYear),
      Paidupshare: handleShare(currentYear),
    },
  ];
  function handleShare(year) {
    const value = paidUpShare
      ?.filter((item) => {
        const itemYear = new Date(item.dateGenerated).getFullYear();
        return itemYear === year;
      })
      .reduce((paidupsum, paid) => {
        return paidupsum + paid.paidUpValue;
      }, 0);
    return value;
  }
  function handleLoan(year) {
    const value = osLoan
      ?.filter((item) => {
        const itemYear = new Date(item.dateGenerated).getFullYear();
        return itemYear === year;
      })
      .reduce((Loansum, loan) => {
        return Loansum + loan.osLoanValue;
      }, 0);
    return value;
  }
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        // width={500}
        // height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="loan"
          stroke="#FF781F"
          strokeWidth={3}
          label={<CustomizedLabel />}
        />
        <Line
          type="monotone"
          dataKey="Paidupshare"
          strokeWidth={3}
          stroke="#06B6D4"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LineChartDraw;
