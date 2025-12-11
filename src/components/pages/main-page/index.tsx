"use client";

import { useState, useEffect } from "react";
import LineChartComponent from "@/components/pages/main-page/charts/line-chart";
import BarChartComponent from "@/components/pages/main-page/charts/bar-chart";
import AreaChartComponent from "@/components/pages/main-page/charts/area-chart";
import PieChartComponent from "@/components/pages/main-page/charts/pie-chart";
import MultiLineChartComponent from "@/components/pages/main-page/charts/multi-line-chart";
import ComboChartComponent from "@/components/pages/main-page/charts/combo-chart";

const generateRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const lineChartData = [
  { month: "1월", value: generateRandomValue(100, 500) },
  { month: "2월", value: generateRandomValue(100, 500) },
  { month: "3월", value: generateRandomValue(100, 500) },
  { month: "4월", value: generateRandomValue(100, 500) },
  { month: "5월", value: generateRandomValue(100, 500) },
  { month: "6월", value: generateRandomValue(100, 500) },
];

const barChartData = [
  { name: "A팀", value: generateRandomValue(200, 500), fill: "var(--chart-1)" },
  { name: "B팀", value: generateRandomValue(200, 500), fill: "var(--chart-2)" },
  { name: "C팀", value: generateRandomValue(200, 500), fill: "var(--chart-3)" },
  { name: "D팀", value: generateRandomValue(200, 500), fill: "var(--chart-4)" },
  { name: "E팀", value: generateRandomValue(200, 500), fill: "var(--chart-5)" },
];

const pieChartData = [
  { name: "카테고리1", value: generateRandomValue(200, 500) },
  { name: "카테고리2", value: generateRandomValue(200, 500) },
  { name: "카테고리3", value: generateRandomValue(200, 500) },
  { name: "카테고리4", value: generateRandomValue(200, 500) },
];

const areaChartData = [
  { date: "1주", value: generateRandomValue(1000, 5000) },
  { date: "2주", value: generateRandomValue(1000, 5000) },
  { date: "3주", value: generateRandomValue(1000, 5000) },
  { date: "4주", value: generateRandomValue(1000, 5000) },
];

const multiLineData = [
  {
    month: "1월",
    sales: generateRandomValue(2000, 5000),
    revenue: generateRandomValue(1000, 3000),
  },
  {
    month: "2월",
    sales: generateRandomValue(2000, 5000),
    revenue: generateRandomValue(1000, 3000),
  },
  {
    month: "3월",
    sales: generateRandomValue(2000, 5000),
    revenue: generateRandomValue(1000, 3000),
  },
  {
    month: "4월",
    sales: generateRandomValue(2000, 5000),
    revenue: generateRandomValue(1000, 3000),
  },
  {
    month: "5월",
    sales: generateRandomValue(2000, 5000),
    revenue: generateRandomValue(1000, 3000),
  },
  {
    month: "6월",
    sales: generateRandomValue(2000, 5000),
    revenue: generateRandomValue(1000, 3000),
  },
];

const comboChartData = [
  {
    name: "1월",
    bar: generateRandomValue(2000, 5000),
    line: generateRandomValue(1000, 3000),
    fill: "var(--chart-1)",
  },
  {
    name: "2월",
    bar: generateRandomValue(2000, 5000),
    line: generateRandomValue(1000, 3000),
    fill: "var(--chart-2)",
  },
  {
    name: "3월",
    bar: generateRandomValue(2000, 5000),
    line: generateRandomValue(1000, 3000),
    fill: "var(--chart-3)",
  },
  {
    name: "4월",
    bar: generateRandomValue(2000, 5000),
    line: generateRandomValue(1000, 3000),
    fill: "var(--chart-4)",
  },
  {
    name: "5월",
    bar: generateRandomValue(2000, 5000),
    line: generateRandomValue(1000, 3000),
    fill: "var(--chart-5)",
  },
];

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="mb-4 flex h-50 w-full gap-x-2">
        <div className="flex-1">
          <LineChartComponent
            data={lineChartData}
            title="월별 추이"
            isLoading={isLoading}
          />
        </div>
        <div className="flex-1">
          <BarChartComponent
            data={barChartData}
            title="팀별 실적"
            isLoading={isLoading}
          />
        </div>
        <div className="flex-1">
          <AreaChartComponent
            data={areaChartData}
            title="주간 데이터"
            isLoading={isLoading}
          />
        </div>
      </div>
      <div
        className="grid h-[calc(100%-268px)] w-full gap-2"
        style={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(400px,100%), 1fr))",
        }}
      >
        <div className="min-h-70">
          <LineChartComponent
            data={lineChartData}
            title="라인 차트"
            isLoading={isLoading}
          />
        </div>
        <div className="min-h-70">
          <BarChartComponent
            data={barChartData}
            title="바 차트"
            isLoading={isLoading}
          />
        </div>
        <div className="min-h-70">
          <PieChartComponent
            data={pieChartData}
            title="파이 차트"
            isLoading={isLoading}
          />
        </div>
        <div className="min-h-70">
          <AreaChartComponent
            data={areaChartData}
            title="에어리어 차트"
            isLoading={isLoading}
          />
        </div>
        <div className="min-h-70">
          <MultiLineChartComponent
            data={multiLineData}
            title="멀티 라인 차트"
            isLoading={isLoading}
          />
        </div>
        <div className="min-h-70">
          <ComboChartComponent
            data={comboChartData}
            title="콤보 차트"
            isLoading={isLoading}
          />
        </div>
        <div className="min-h-70">
          <LineChartComponent
            data={lineChartData}
            title="추가 라인 차트"
            isLoading={isLoading}
          />
        </div>
        <div className="min-h-70">
          <BarChartComponent
            data={barChartData}
            title="추가 바 차트"
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
