"use client";

import {
  Chart,
  ChartContainer,
  ChartHeader,
  ChartToolDropdown,
  Pie,
  PieChart,
} from "@hdc-ui/components/ui/chart";

import { ContentRender } from "../../../ui/common-layout";

interface PieChartProps {
  data: { name: string; value: number }[];
  title?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const chartConfig = {
  value: {
    label: "값",
  },
};

export default function PieChartComponent({
  data,
  title = "파이 차트",
  isLoading = false,
  isEmpty = false,
}: PieChartProps) {
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
          <PieChart>
            <Pie
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ContentRender>
      </ChartContainer>
    </Chart>
  );
}
