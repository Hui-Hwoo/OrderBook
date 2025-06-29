import { OrderTable } from "./component/OrderTable";
import { OrderChart } from "./component/OrderChart";
import { OrderHeader } from "./component/OrderHeader";
import { OrderBookStats } from "./component/OrderBookStats";
import { useOrderBook } from "./hooks/useOrderBook";
import { DepthChart } from "./component/DepthChart";

import "./App.css";

function App() {
    const { orders, rawData } = useOrderBook(
        10000 // fetch interval in milliseconds
    );

    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Title at the top */}
            <OrderHeader />

            {/* Main content */}
            <div className="w-full flex-1 flex flex-col justify-center lg:flex-row gap-0">
                <div className="w-full lg:w-[calc(100vw - 320px)] flex flex-col lg:border-r border-gray-200/50">
                    <div className="flex-1 px-18 pt-6 m-0">
                        <OrderChart orders={orders.asks.concat(orders.bids)} />
                    </div>
                    <div className="flex px-12 lg:pb-12 lg:flex-row gap-4 m-0">
                        <div className="lg:w-2/3">
                            <DepthChart orderBook={rawData} />
                        </div>
                        <div className="lg:w-1/3 lg:pr-6">
                            <OrderBookStats orderBook={rawData} />
                        </div>
                    </div>
                </div>
                {/* Order Table */}
                <div className="w-full lg:w-[320px] lg:pr-12 px-12 lg:pl-0 lg:pt-0 pt-12">
                    <OrderTable asks={orders.asks} bids={orders.bids} />
                </div>
            </div>
        </div>
    );
}

export default App;
