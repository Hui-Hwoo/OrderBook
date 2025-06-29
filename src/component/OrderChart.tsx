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
import type { OrderItem } from "../types/order";

type ChartPoint = {
    price: number;
    orderPercent?: number;
    orderSize?: number;
    type: "bid" | "ask";
    id: string;
    isNew?: boolean;
};

type OrderChartProps = {
    orders: OrderItem[];
};

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const { price, orderSize, orderPercent, type } = payload[0].payload;
    return (
        <div className="bg-white/5 border border-gray-300/60 px-6 py-3 rounded font-mono shadow-md">
            <p
                className={`mb-1 font-semibold text-sm ${
                    type === "ask" ? "text-red-500" : "text-green-500"
                }`}
            >{`$${price}`}</p>
            {orderSize !== undefined && (
                <div>
                    <div className="flex justify-between items-center text-xs">
                        <div className="mr-3 text-white/80">Size</div>
                        <div>{orderSize}</div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <div className="mr-3 text-white/80">Percent</div>
                        <div>{orderPercent?.toFixed(2)}%</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const OrderChart = ({ orders }: OrderChartProps) => {
    const { data, maxPercent, lowerBound, upperBound } = useMemo(() => {
        const totalAsk = orders.reduce((acc, order) => acc + order.size, 0);
        const priceSet = new Set<number>();
        const map = new Map<number, ChartPoint>();

        for (const order of orders) {
            priceSet.add(order.price);
            map.set(order.price, {
                ...map.get(order.price),
                price: order.price,
                orderPercent: (order.size / totalAsk) * 100,
                orderSize: order.size,
                type: order.type,
                id: order.id,
                isNew: order.isNew,
            });
        }

        const data = Array.from(priceSet)
            .map((price) => map.get(price)!)
            .sort((a, b) => a.price - b.price);

        const maxAsk = Math.max(...data.map((d) => d.orderPercent || 0));
        const maxPercent = Math.ceil(maxAsk / 1);
        const maxPrize = Math.max(...data.map((d) => d.price));
        const minPrize = Math.min(...data.map((d) => d.price));

        const diff = maxPrize - minPrize;
        const lowerBound = Math.floor(minPrize - diff * 0.02);
        const upperBound = Math.ceil(maxPrize + diff * 0.02);

        return { data, maxPercent, lowerBound, upperBound };
    }, [orders]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
                data={data}
                barCategoryGap={20}
                barGap={5}
                margin={{ top: 4, right: 30, bottom: 20, left: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis
                    dataKey="price"
                    type="number"
                    domain={[lowerBound, upperBound]}
                    className="font-mono text-xs overflow-visible"
                    tickCount={12}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    label={{
                        value: "Spread Chart",
                        position: "insideBottom",
                        dy: 20,
                        className: "font-mono font-semibold text-sm",
                    }}
                />
                <YAxis
                    domain={[0, maxPercent]}
                    tickFormatter={(v) => `${Math.abs(v)}%`}
                    className="font-mono text-xs"
                    tickCount={18}
                    allowDecimals={false}
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
                    maxBarSize={40}
                    isAnimationActive={false}
                    shape={(props: any) => {
                        const { x, y, height, isNew, type } = props;
                        const barWidth = 5; // Make this thicker if needed
                        return (
                            <rect
                                x={x - barWidth / 2}
                                y={y}
                                width={barWidth * 0.8}
                                height={height}
                                stroke="transparent"
                                strokeWidth={0.5}
                                fill={
                                    isNew
                                        ? "orange"
                                        : type === "ask"
                                        ? "#b00108"
                                        : "#00a63e"
                                }
                            />
                        );
                    }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};
