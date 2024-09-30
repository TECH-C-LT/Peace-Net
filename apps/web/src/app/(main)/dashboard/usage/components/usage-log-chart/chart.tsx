'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function Chart({ data }: { data: any }) {
  const maxValue = Math.max(
    ...data.flatMap((item: any) =>
      Object.values(item).filter((val) => typeof val === 'number'),
    ),
  )
  const yAxisMax = Math.ceil(maxValue / 10) * 10

  return (
    <ResponsiveContainer width="100%" height="100%" className="">
      <BarChart
        width={550}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
          strokeWidth={0.5}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => Math.round(value).toString()}
          domain={[0, yAxisMax]}
        />
        <Tooltip />
        <Bar
          dataKey="guardians"
          name="Guardian API"
          stackId="a"
          fill="#14aab8"
        />
        <Bar
          dataKey="sunshines"
          name="Sunshine API"
          stackId="a"
          fill="#14b884"
        />
        <Bar dataKey="prisms" name="Prism API" stackId="a" fill="#7fb814" />
      </BarChart>
    </ResponsiveContainer>
  )
}
