"use client";

import {
  Chart,
  ChartContainer,
  ChartHeader,
  ChartToolDropdown,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
} from "@hdc-ui/components/ui/chart";

import { ContentRender } from "../../../ui/common-layout";

interface LineChartProps {
  data: { month: string; value: number }[];
  title?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const chartConfig = {
  value: {
    label: "값",
  },
};

export default function LineChartComponent({
  data,
  title = "라인 차트",
  isLoading = false,
  isEmpty = false,
}: LineChartProps) {
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
          <LineChart>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Line dataKey="value" type="monotone" strokeWidth={2} dot={false} />
          </LineChart>
        </ContentRender>
      </ChartContainer>
    </Chart>
  );
}
