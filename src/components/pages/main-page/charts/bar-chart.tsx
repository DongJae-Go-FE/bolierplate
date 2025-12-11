"use client";

import {
  Chart,
  ChartContainer,
  ChartHeader,
  ChartToolDropdown,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "@hdc-ui/components/ui/chart";

import { ContentRender } from "../../../ui/common-layout";

interface BarChartProps {
  data: { name: string; value: number; fill: string }[];
  title?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const chartConfig = {
  value: {
    label: "값",
  },
};

export default function BarChartComponent({
  data,
  title = "바 차트",
  isLoading = false,
  isEmpty = false,
}: BarChartProps) {
  return (
    <Chart data={data} config={chartConfig}>
      <ChartContainer>
        <ChartHeader>
          <h3 className="heading05B">{title}</h3>
          <ChartToolDropdown />
        </ChartHeader>
        <ContentRender
          isLoading={isLoading}
          isEmpty={isEmpty}
          className="h-[calc(100%-48px)]"
        >
          <BarChart>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar dataKey="value" radius={8} />
          </BarChart>
        </ContentRender>
      </ChartContainer>
    </Chart>
  );
}
