import React from "react";

type OrderTuple = [number, number];
type OrderBookType = {
    asks: OrderTuple[];
    bids: OrderTuple[];
};

type Props = {
    orderBook: OrderBookType;
};

const StatCard = ({
    label,
    value,
    color,
}: {
    label: string;
    value: string;
    icon?: string;
    color?: string;
}) => (
    <div className="bg-white/5 border border-gray-200/20 rounded-lg p-1 shadow-sm flex flex-col gap-1 min-w-[80px]">
        <div className="text-sm text-gray-300/80">{label}</div>
        <div
            className="text-sm font-semibold "
            style={{
                color: color || "#fff",
            }}
        >
            {/* {icon && <span style={{ marginRight: "6px" }}>{icon}</span>} */}
            {value}
        </div>
    </div>
);

export const OrderBookStats: React.FC<Props> = ({ orderBook }) => {
    const { asks, bids } = orderBook;

    if (!asks.length || !bids.length) {
        return (
            <div
                style={{
                    background: "#1a1a1a",
                    padding: "12px",
                    borderRadius: "12px",
                    textAlign: "center",
                    color: "#888",
                }}
            >
                No order book data available.
            </div>
        );
    }

    const sortedAsks = [...asks].sort((a, b) => a[0] - b[0]);
    const sortedBids = [...bids].sort((a, b) => b[0] - a[0]);

    const bestAsk = sortedAsks[0][0];
    const bestBid = sortedBids[0][0];
    const spread = bestAsk - bestBid;
    const midPrice = (bestAsk + bestBid) / 2;

    const totalAskVolume = asks.reduce((sum, [, size]) => sum + size, 0);
    const totalBidVolume = bids.reduce((sum, [, size]) => sum + size, 0);
    const buySellRatio = totalBidVolume / (totalAskVolume || 1);

    return (
        <div className="py-1 px-2 border border-gray-300/20 rounded-lg bg-[#1b1b1b] font-sans flex flex-col gap-2">
            <div className="text-lg font-semibold text-blue-200 font-mono">
                Stats
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "4px",
                }}
                className="pb-2 px-2"
            >
                <StatCard
                    label="Best Bid"
                    value={`$${bestBid.toFixed(2)}`}
                    icon="🟢"
                    color="oklch(62.7% 0.194 149.214)"
                />
                <StatCard
                    label="Best Ask"
                    value={`$${bestAsk.toFixed(2)}`}
                    icon="🔴"
                    color="oklch(57.7% 0.245 27.325)"
                />
                <StatCard
                    label="Spread"
                    value={`$${spread.toFixed(2)}`}
                    icon="📐"
                />
                <StatCard
                    label="Mid Price"
                    value={`$${midPrice.toFixed(2)}`}
                    icon="⚖️"
                />
                <StatCard
                    label="Bid Volume"
                    value={totalBidVolume.toFixed(2)}
                    icon="📦"
                />
                <StatCard
                    label="Ask Volume"
                    value={totalAskVolume.toFixed(2)}
                    icon="📦"
                />
                <StatCard
                    label="Buy/Sell Ratio"
                    value={buySellRatio.toFixed(2)}
                    icon="📈"
                />
            </div>
        </div>
    );
};
