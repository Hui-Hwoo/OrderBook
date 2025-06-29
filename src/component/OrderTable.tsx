import type { OrderItem } from "../types/order";

type OrderTableProps = {
    asks: OrderItem[];
    bids: OrderItem[];
};

export const OrderTable = (props: OrderTableProps) => {
    const { asks, bids } = props;

    return (
        <div className="w-full h-full flex flex-col">
            <div className="mb-0">
                <div
                    className="overflow-y-scroll border-0"
                    style={{ height: "calc((100vh - 112px) / 2)" }}
                >
                    <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                        className="w-full border-0"
                    >
                        <thead className="sticky top-0 bg-[#1c1c1c] z-10">
                            <tr>
                                <th className="text-gray-300/80 border border-gray-500/20 p-0.5 text-sm bg-[#1c1c1c] w-[46%]">
                                    Price
                                </th>
                                <th className="text-gray-300/80 border border-gray-500/20 p-0.5 text-sm bg-[#1c1c1c] w-[30%]">
                                    Size
                                </th>
                                <th className="text-gray-300/80 border border-gray-500/20 p-0.5 text-sm bg-[#1c1c1c] w-[34%]">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {asks
                                .sort((a, b) => b.price - a.price)
                                .map((order, index, sortedArray) => {
                                    const runningTotal = sortedArray
                                        .slice(0, index + 1)
                                        .reduce((acc, b) => acc + b.size, 0);
                                    const maxSize = Math.max(
                                        ...sortedArray.map((b) => b.size)
                                    );
                                    const sizePercentage =
                                        (order.size / maxSize) * 100;
                                    const isNewOrder = order.isNew;

                                    return (
                                        <tr
                                            key={index}
                                            className="group relative font-mono text-sm"
                                            style={{
                                                background: `linear-gradient(to right, rgba(255, 0, 0, 0.15) ${sizePercentage}%, transparent ${sizePercentage}%)`,
                                            }}
                                        >
                                            <td
                                                className={`border border-gray-500/20 p-0.5 group-hover:text-red-600 w-[35%] ${
                                                    isNewOrder
                                                        ? "text-orange-300"
                                                        : "text-red-700"
                                                }`}
                                            >
                                                {order.price.toFixed(2)}
                                            </td>
                                            <td
                                                className={`border border-gray-500/20 p-0.5 opacity-70 hover:opacity-100 group-hover:text-white w-[30%] ${
                                                    isNewOrder
                                                        ? "text-orange-300"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {order.size.toFixed(2)}
                                            </td>
                                            <td
                                                className={`border border-gray-500/20 p-0.5 opacity-70 hover:opacity-100 group-hover:text-white w-[35%] ${
                                                    isNewOrder
                                                        ? "text-orange-300"
                                                        : "text-gray-500"
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

            {/* Bids Table - Bottom Half */}
            <div className="mt-0">
                <div
                    className="overflow-y-scroll border-0"
                    style={{ height: "calc((100vh - 172px) / 2)" }}
                >
                    <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                        className="w-full border-0"
                    >
                        <thead className="sticky top-0 z-10">
                            <tr>
                                <th className="text-gray-300/80 border border-gray-500/20 p-1 text-sm bg-[#1c1c1c] w-[46%]">
                                    Price
                                </th>
                                <th className="text-gray-300/80 border border-gray-500/20 p-1 text-sm bg-[#1c1c1c] w-[30%]">
                                    Size
                                </th>
                                <th className="text-gray-300/80 border border-gray-500/20 p-1 text-sm bg-[#1c1c1c] w-[34%]">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bids
                                .sort((a, b) => b.price - a.price)
                                .map((order, index, sortedArray) => {
                                    const runningTotal = sortedArray
                                        .slice(0, index + 1)
                                        .reduce((acc, b) => acc + b.size, 0);
                                    const maxSize = Math.max(
                                        ...sortedArray.map((b) => b.size)
                                    );
                                    const sizePercentage =
                                        (order.size / maxSize) * 100;
                                    const isNewOrder = order.isNew;

                                    return (
                                        <tr
                                            key={index}
                                            className="group relative font-mono text-sm"
                                            style={{
                                                background: `linear-gradient(to right, rgba(0, 128, 0, 0.15) ${sizePercentage}%, transparent ${sizePercentage}%)`,
                                            }}
                                        >
                                            <td
                                                className={`border border-gray-500/20 p-1 group-hover:text-green-600 w-[35%] ${
                                                    isNewOrder
                                                        ? "text-orange-300"
                                                        : "text-green-700"
                                                }`}
                                            >
                                                {order.price.toFixed(2)}
                                            </td>
                                            <td
                                                className={`border border-gray-500/20 p-1 opacity-70 hover:opacity-100 group-hover:text-white w-[30%] ${
                                                    isNewOrder
                                                        ? "text-orange-300"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {order.size.toFixed(2)}
                                            </td>
                                            <td
                                                className={`border border-gray-500/20 p-1 opacity-70 hover:opacity-100 group-hover:text-white w-[35%] ${
                                                    isNewOrder
                                                        ? "text-orange-300"
                                                        : "text-gray-500"
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
        </div>
    );
};
