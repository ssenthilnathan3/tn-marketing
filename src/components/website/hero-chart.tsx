import { Card } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 380 },
  { name: "Mar", value: 450 },
  { name: "Apr", value: 410 },
  { name: "May", value: 490 },
  { name: "Jun", value: 520 },
  { name: "Jul", value: 510 },
  { name: "Aug", value: 800 },
  { name: "Sep", value: 1100 },
  { name: "Oct", value: 1350 },
  { name: "Nov", value: 1700 },
  { name: "Dec", value: 2200 },
]

export function TrendGraph() {
  return (
    <div className="relative z-10 -mt-[15%] flex justify-center items-center opacity-1">
      <Card
        className="w-full max-w-5xl bg-white/10 p-4 backdrop-blur-sm dark:bg-gray-800/10"
        style={{
          boxShadow: "0px 0px 20px 5px rgba(16, 185, 129, 0.7)", // Green glow effect
          filter: "brightness(1)", // Optional for extra brightness
        }}
      >
        <ChartContainer
          config={{
            value: {
              label: "Value",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[450px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ReferenceLine x="Jul" stroke="#AA4A44" label={{ value: "Trend Change", position: "top", fill: "#FF4500" }} />
              <Line
                type="linear"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
    </div>
  );
}
