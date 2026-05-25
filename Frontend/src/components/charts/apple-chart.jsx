"use client";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
import { GlowCard } from "@/components/ui/glow-card";
/**
 * Apple-style chart component with minimal, clean design
 * Features: Soft shadows, subtle colors, smooth animations
 */
export function AppleChart({ data, type = "line", title, color = "#FCD34D", // yellow-400
 }) {
    const chartConfig = {
        stroke: color,
        fill: color,
        gridColor: "#F3F4F6",
        textColor: "#6B7280",
    };
    const renderChart = () => {
        switch (type) {
            case "bar":
                return (<BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} opacity={0.3}/>
            <XAxis dataKey="name" stroke={chartConfig.textColor} fontSize={12} tickLine={false} axisLine={false}/>
            <YAxis stroke={chartConfig.textColor} fontSize={12} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}/>
            <Bar dataKey="value" fill={chartConfig.fill} radius={[8, 8, 0, 0]}/>
          </BarChart>);
            case "area":
                return (<AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.fill} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={chartConfig.fill} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} opacity={0.3}/>
            <XAxis dataKey="name" stroke={chartConfig.textColor} fontSize={12} tickLine={false} axisLine={false}/>
            <YAxis stroke={chartConfig.textColor} fontSize={12} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}/>
            <Area type="monotone" dataKey="value" stroke={chartConfig.stroke} fill="url(#colorGradient)" strokeWidth={2}/>
          </AreaChart>);
            default:
                return (<LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.gridColor} opacity={0.3}/>
            <XAxis dataKey="name" stroke={chartConfig.textColor} fontSize={12} tickLine={false} axisLine={false}/>
            <YAxis stroke={chartConfig.textColor} fontSize={12} tickLine={false} axisLine={false}/>
            <Tooltip contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}/>
            <Line type="monotone" dataKey="value" stroke={chartConfig.stroke} strokeWidth={2} dot={{ fill: chartConfig.fill, r: 4 }} activeDot={{ r: 6 }}/>
          </LineChart>);
        }
    };
    return (<GlowCard glowIntensity="subtle" className="p-6">
      {title && (<h3 className="text-lg font-semibold text-gray-900 mb-4 font-[family:'Inter',sans-serif]">
          {title}
        </h3>)}
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </GlowCard>);
}
