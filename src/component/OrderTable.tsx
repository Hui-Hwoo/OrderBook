import { areFloatsEqual } from "../utils";

export type OrderItem = [number, number];

type OrderTableProps = {
    orderType: "bids" | "asks";
    newOrders: OrderItem[];
    existingOrders: OrderItem[];
};

// type OrderBookType = {
//     asks: OrderItem[];
//     bids: OrderItem[];
// };

// type OrderType = {
//     asks: [number, number][];
//     bids: [number, number][];
// };

const ColorMap = {
    bids: {
        textColor: "text-green-600",
        titleColor: "text-gray-600/70",
        background: "rgba(0, 128, 0, 0.1)",
    },
    asks: {
        textColor: "text-red-600",
        titleColor: "text-gray-600/70",
        background: "rgba(255, 0, 0, 0.1)",
    },
};

export const OrderTable = (props: OrderTableProps) => {
    const { orderType, newOrders, existingOrders } = props;
    const orderColor = ColorMap[orderType];

    return (
        <div className=" w-full">
            <div
                className={`text-center text-2xl font-bold mb-4 ${orderColor.textColor}`}
            >
                {orderType === "bids" ? "Bids" : "Asks"}
            </div>
            <div className="h-[60vh] overflow-y-scroll border rounded-lg">
                <table
                    style={{ borderCollapse: "collapse", width: "100%" }}
                    className="w-full"
                >
                    <thead className="sticky top-0 bg-gray-100">
                        <tr>
                            <th
                                className={`${orderColor.titleColor} border border-gray-300 p-2`}
                            >
                                Price
                            </th>
                            <th
                                className={`${orderColor.titleColor} border border-gray-300 p-2`}
                            >
                                Size
                            </th>
                            <th
                                className={`${orderColor.titleColor} border border-gray-300 p-2`}
                            >
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...newOrders, ...existingOrders]
                            .sort((a, b) => b[0] - a[0])
                            .map((order, index, sortedArray) => {
                                const runningTotal = sortedArray
                                    .slice(0, index + 1)
                                    .reduce((acc, b) => acc + b[1], 0);
                                const maxSize = Math.max(
                                    ...sortedArray.map((b) => b[1])
                                );
                                const sizePercentage =
                                    (order[1] / maxSize) * 100;

                                const isNewOrder = newOrders.some(
                                    (newOrder) =>
                                        areFloatsEqual(newOrder[0], order[0]) &&
                                        areFloatsEqual(newOrder[1], order[1])
                                );

                                const textColor = isNewOrder
                                    ? "text-orange-300"
                                    : orderColor.textColor;

                                return (
                                    <tr key={index}>
                                        <td
                                            className={`border border-gray-300 p-[10px] ${textColor} ${
                                                isNewOrder
                                                    ? "font-bold"
                                                    : "font-semibold"
                                            }`}
                                            style={{
                                                background: `linear-gradient(to right, ${orderColor.background} ${sizePercentage}%, transparent ${sizePercentage}%)`,
                                            }}
                                        >
                                            {order[0]}
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-[10px] ${textColor} opacity-70 hover:opacity-100  ${
                                                isNewOrder
                                                    ? "font-bold"
                                                    : "opacity-70"
                                            }`}
                                            style={{
                                                background: `linear-gradient(to right, ${orderColor.background} ${sizePercentage}%, transparent ${sizePercentage}%)`,
                                            }}
                                        >
                                            {order[1]}
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-[10px] ${textColor}  hover:opacity-100 ${
                                                isNewOrder
                                                    ? "font-bold"
                                                    : "opacity-70"
                                            }`}
                                            style={{
                                                background: `linear-gradient(to right, ${orderColor.background} ${sizePercentage}%, transparent ${sizePercentage}%)`,
                                            }}
                                        >
                                            {runningTotal.toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
