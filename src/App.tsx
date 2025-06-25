import { OrderTable } from "./component/OrderTable";
import { useOrderBook } from "./hooks/useOrderBook";
import "./App.css";

function App() {
    const order = useOrderBook(
        1000 // fetch interval in milliseconds
    );

    return (
        <div className="w-full h-full p-12 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center lg:flex-row gap-12 w-full">
                {/* Asks Table */}
                <div className="w-full lg:w-1/3">
                    <OrderTable
                        orderType="asks"
                        newOrders={order.newAsks}
                        existingOrders={order.asks}
                    />
                </div>

                {/* Bids Table */}
                <div className="w-full lg:w-1/3">
                    <OrderTable
                        orderType="bids"
                        newOrders={order.newBids}
                        existingOrders={order.bids}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
