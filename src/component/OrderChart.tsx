import { useMemo } from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Bar,
} from "recharts";

type ChartPoint = {
    price: number;
    orderPercent?: number; // goes up
    orderSize?: number;
    isAsk?: boolean; // true for asks, false for bids
};

type OrderChartProps = {
    orderType: "bids" | "asks";
    orders: [number, number][];
};

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const { price, orderSize, orderPercent, isAsk } = payload[0].payload;
    return (
        <div className="bg-white border border-gray-300 px-4 py-2 rounded font-mono shadow-md">
            <p
                className={`mb-1  font-semibold text-sm ${
                    isAsk ? "text-red-500" : "text-green-500"
                }`}
            >{`$${price}`}</p>
            {orderSize !== undefined && (
                <div className="">
                    <div className="flex justify-between items-center text-xs">
                        <div className="mr-3 text-gray-500">Size</div>
                        <div>{orderSize}</div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <div className="mr-3 text-gray-500">Percent</div>
                        <div>{orderPercent?.toFixed(2)}%</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const OrderChart = ({ orderType, orders }: OrderChartProps) => {
    const isAsk = orderType === "asks";
    const { data, maxPercent, minPrize, maxPrize } = useMemo(() => {
        const totalAsk = orders.reduce((acc, [, size]) => acc + size, 0);
        const priceSet = new Set<number>();
        const map = new Map<number, ChartPoint>();

        for (const [price, size] of orders) {
            priceSet.add(price);
            map.set(price, {
                ...map.get(price),
                price,
                orderPercent: (size / totalAsk) * 100,
                orderSize: size,
                isAsk,
            });
        }

        const data = Array.from(priceSet)
            .map((price) => map.get(price)!)
            .sort((a, b) => a.price - b.price);

        const maxAsk = Math.max(...data.map((d) => d.orderPercent || 0));
        const maxPercent = Math.ceil(maxAsk / 1) + 1;
        const maxPrize = Math.max(...data.map((d) => d.price));
        const minPrize = Math.min(...data.map((d) => d.price));

        return { data, maxPercent, minPrize, maxPrize };
    }, [orders, isAsk]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
                data={data}
                barCategoryGap={0}
                barGap={0}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                <XAxis
                    dataKey="price"
                    type="number"
                    domain={[minPrize - 2, maxPrize + 2]}
                    className="font-mono text-xs"
                    tickFormatter={(v) => v.toFixed(0)}
                    label={{
                        value: isAsk ? "Asks Price" : "Bids Price",
                        position: "insideBottom",
                        offset: -5,
                        className: "font-mono font-semibold text-sm",
                    }}
                />
                <YAxis
                    domain={[0, maxPercent]}
                    tickFormatter={(v) => `${Math.abs(v)}%`}
                    className="font-mono text-xs"
                    label={{
                        value: "Size Percent",
                        angle: -90,
                        dy: 40,
                        position: "insideLeft",
                        className: "font-mono font-semibold text-sm",
                    }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                    dataKey="orderPercent"
                    fill={isAsk ? "#ef4444" : "#22c55e"}
                    maxBarSize={60}
                    isAnimationActive={false}
                    shape={(props: any) => {
                        const { x, y, height } = props;
                        const barWidth = 2; // Make this thicker if needed
                        return (
                            <rect
                                x={x - barWidth / 2}
                                y={y}
                                width={barWidth}
                                height={height}
                                fill={isAsk ? "#ef4444" : "#22c55e"}
                            />
                        );
                    }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};
