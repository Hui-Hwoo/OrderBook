import { areFloatsEqual } from "../utils";

export type OrderItem = [number, number];

type OrderTableProps = {
    orderType: "bids" | "asks";
    newOrders: OrderItem[];
    existingOrders: OrderItem[];
};

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

                                const textColorClass = isNewOrder
                                    ? "text-orange-300"
                                    : "text-gray-500"; // default gray text

                                // const hoverTextColor = orderColor.textColor; // green or red
                                const hoverTextColor =
                                    orderType === "asks"
                                        ? "group-hover:text-red-600"
                                        : "group-hover:text-green-600";

                                return (
                                    <tr
                                        key={index}
                                        className={`group relative font-mono`}
                                        style={{
                                            background: `linear-gradient(to right, ${orderColor.background} ${sizePercentage}%, transparent ${sizePercentage}%)`, // Tailwind gray-100
                                        }}
                                    >
                                        <td
                                            className={`border border-gray-300 p-[10px] ${hoverTextColor} ${
                                                isNewOrder
                                                    ? "text-orange-300"
                                                    : orderColor.textColor
                                            }`}
                                        >
                                            {order[0]}
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-[10px] opacity-70 hover:opacity-100  ${hoverTextColor} ${
                                                isNewOrder
                                                    ? "text-orange-300"
                                                    : textColorClass
                                            }`}
                                        >
                                            {order[1]}
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-[10px] opacity-70 hover:opacity-100  ${hoverTextColor} ${
                                                isNewOrder
                                                    ? "text-orange-300"
                                                    : textColorClass
                                            }`}
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
