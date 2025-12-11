"use client";

import {
  Chart,
  ChartContainer,
  ChartHeader,
  ChartToolDropdown,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "@hdc-ui/components/ui/chart";

import { ContentRender } from "../../../ui/common-layout";

interface AreaChartProps {
  data: { date: string; value: number }[];
  title?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const chartConfig = {
  value: {
    label: "값",
  },
};

export default function AreaChartComponent({
  data,
  title = "에어리어 차트",
  isLoading = false,
  isEmpty = false,
}: AreaChartProps) {
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
          <AreaChart>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Area dataKey="value" type="natural" fillOpacity={0.4} />
          </AreaChart>
        </ContentRender>
      </ChartContainer>
    </Chart>
  );
}
