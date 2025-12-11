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

interface MultiLineChartProps {
  data: { month: string; sales: number; revenue: number }[];
  title?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const chartConfig = {
  sales: {
    label: "판매",
  },
  revenue: {
    label: "수익",
  },
};

export default function MultiLineChartComponent({
  data,
  title = "멀티 라인 차트",
  isLoading = false,
  isEmpty = false,
}: MultiLineChartProps) {
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
            <Line dataKey="sales" type="monotone" strokeWidth={2} dot={false} />
            <Line
              dataKey="revenue"
              type="monotone"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ContentRender>
      </ChartContainer>
    </Chart>
  );
}
