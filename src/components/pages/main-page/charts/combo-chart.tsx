"use client";

import {
  Chart,
  ChartContainer,
  ChartHeader,
  ChartToolDropdown,
  Bar,
  Line,
  ComboChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "@hdc-ui/components/ui/chart";

import { ContentRender } from "../../../ui/common-layout";

interface ComboChartProps {
  data: { name: string; bar: number; line: number; fill: string }[];
  title?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const chartConfig = {
  bar: {
    label: "바",
  },
  line: {
    label: "라인",
  },
};

export default function ComboChartComponent({
  data,
  title = "콤보 차트",
  isLoading = false,
  isEmpty = false,
}: ComboChartProps) {
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
          <ComboChart>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Bar dataKey="bar" yAxisId="left" radius={8} />
            <Line
              dataKey="line"
              type="monotone"
              yAxisId="right"
              strokeWidth={2}
              dot={false}
            />
          </ComboChart>
        </ContentRender>
      </ChartContainer>
    </Chart>
  );
}
