"use client";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import Image from "next/image";

const data = [
  {
    name: "Girls",
    count: 42,
    fill: "#E38A23",
  },
  {
    name: "Boys",
    count: 33,
    fill: "#84A03A",
  },
  {
    name: "Total",
    count: 75,
    fill: "#8A3F36",
  },
];

const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "28px",
};

const BarChart = () => {
  return (
    <div className="rounded-xl w-full h-full p-3 bg-white">
      {/*Our title*/}
      <div className="font-serif">
        <h2>Students</h2>
      </div>
      {/*Charts*/}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="100%"
            barSize={20}
            data={data}
          >
            <RadialBar background dataKey="count" />
            {/*<Legend*/}
            {/*  iconSize={10}*/}
            {/*  layout="vertical"*/}
            {/*  verticalAlign="middle"*/}
            {/*  wrapperStyle={style}*/}
            {/*/>*/}
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={40}
          height={40}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        {/*Bottom of chart*/}
        <div className="gap-14 flex justify-center">
          <div className="gap-1 flex flex-col">
            <div className="rounded-full bg-red-400 w-3 h-3"></div>
            <h1 className="font-bold">33</h1>
            <h2 className="text-sm">Boys (40%)</h2>
          </div>
          <div className="gap-1 flex flex-col">
            <div className="rounded-full bg-red-400 h-3 w-3"></div>
            <h1 className="font-bold">42</h1>
            <h2 className="text-sm">Girls (60%)</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
