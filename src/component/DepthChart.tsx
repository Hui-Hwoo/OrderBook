import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

type OrderTuple = [number, number];
type OrderBookType = {
    asks: OrderTuple[];
    bids: OrderTuple[];
};

type Props = {
    orderBook: OrderBookType;
};

const CustomTooltip = ({ active, payload, chartType }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    const isAsk = data.type === "ask";

    return (
        <div className="bg-white/10 border border-gray-300/60 rounded-lg px-6 py-3 shadow-lg">
            <div className={`text-sm font-medium mb-2 ${isAsk ? "text-red-500" : "text-green-500"}`}>
                {isAsk ? "Ask Order" : "Bid Order"}
            </div>
            <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center gap-4">
                    <span className="text-white/80">Price:</span>
                    <span className="text-white font-mono">
                        $
                        {typeof data.price === "number"
                            ? data.price.toLocaleString()
                            : data.price}
                    </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                    <span className="text-white/80">Size:</span>
                    <span className="text-white font-mono">{data.size}</span>
                </div>
                {chartType === "depth" && (
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-white/80">Cumulative:</span>
                        <span className="text-white font-mono">
                            {data.cumulative?.toFixed(3)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export const DepthChart: React.FC<Props> = ({ orderBook }) => {
    let bidCumulative = 0;
    let askCumulative = 0;

    const bidDepth = orderBook.bids.map(([price, size]) => {
        bidCumulative += size;
        return {
            price,
            size,
            cumulative: bidCumulative,
            type: "bid",
        };
    });

    const askDepth = orderBook.asks.map(([price, size]) => {
        askCumulative += size;
        return {
            price,
            size,
            cumulative: askCumulative,
            type: "ask",
        };
    });

    const chartData = [...bidDepth.reverse(), ...askDepth];

    return (
        <div className="w-full h-[280px] flex flex-col">
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 4, right: 20, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                    <XAxis
                        dataKey="price"
                        stroke="#9ca3af"
                        className="text-xs font-mono"
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                        label={{
                            value: "Depth Chart",
                            position: "insideBottom",
                            dy: 20,
                            className:
                                "font-mono font-semibold text-sm text-red-500",
                        }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        className="text-xs font-mono"
                        tickFormatter={(v) => `${(Math.abs(v) * 100) / 1}%`}
                    />
                    <Tooltip content={<CustomTooltip chartType={"depth"} />} />
                    <Area
                        type="monotone"
                        dataKey="cumulative"
                        stroke="#bedbff"
                        fill="url(#depthGradient)"
                        strokeWidth={2}
                    />
                    <defs>
                        <linearGradient
                            id="depthGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="white"
                                stopOpacity={0.3}
                            />
                            <stop
                                offset="95%"
                                stopColor="transparent"
                                stopOpacity={0.05}
                            />
                        </linearGradient>
                    </defs>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
