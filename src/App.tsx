import { OrderTable } from "./component/OrderTable";
import { OrderChart } from "./component/OrderChart";
import { useOrderBook } from "./hooks/useOrderBook";
import "./App.css";

function App() {
    const orders = useOrderBook(
        1000 // fetch interval in milliseconds
    );

    return (
        <div className="w-full h-full p-12 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center lg:flex-row gap-12 w-full">
                {/* Asks Table */}
                <div className="w-full lg:w-1/4">
                    <OrderTable
                        orderType="asks"
                        newOrders={orders.newAsks}
                        existingOrders={orders.asks}
                    />
                </div>
                <div className="w-full lg:w-1/2">
                    <OrderChart
                        orderType="asks"
                        orders={orders.asks.concat(orders.newAsks)}
                    />
                    <OrderChart
                        orderType="bids"
                        orders={orders.bids.concat(orders.newBids)}
                    />
                </div>

                {/* Bids Table */}
                <div className="w-full lg:w-1/4">
                    <OrderTable
                        orderType="bids"
                        newOrders={orders.newBids}
                        existingOrders={orders.bids}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
