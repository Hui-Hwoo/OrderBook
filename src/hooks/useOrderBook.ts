import { useEffect, useRef, useState } from "react";

type OrderTuple = [number, number];

type OrderBookType = {
    asks: OrderTuple[];
    bids: OrderTuple[];
};

type OrderTableType = {
    asks: OrderTuple[];
    bids: OrderTuple[];
    newAsks: OrderTuple[];
    newBids: OrderTuple[];
};

function areFloatsEqual(a: number, b: number, epsilon = 0.0001): boolean {
    return Math.abs(a - b) < epsilon;
}

export function useOrderBook(frequency: number = 1000): OrderTableType {
    const [order, setOrder] = useState<OrderTableType>({
        asks: [],
        bids: [],
        newAsks: [],
        newBids: [],
    });
    const url = "https://zo-devnet.n1.xyz/orderbook?market_id=4";

    const previousOrderRef = useRef<OrderBookType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const newOrder: OrderBookType = await response.json();

                const previousOrder = previousOrderRef.current;

                const previousAsks = previousOrder?.asks ?? [];
                const previousBids = previousOrder?.bids ?? [];

                const newAsks: OrderTuple[] = [];
                const existingAsks: OrderTuple[] = [];

                for (const ask of newOrder.asks) {
                    const exists = previousAsks.some(
                        (prev) =>
                            areFloatsEqual(prev[0], ask[0]) &&
                            areFloatsEqual(prev[1], ask[1])
                    );
                    if (exists) {
                        existingAsks.push(ask);
                    } else {
                        newAsks.push(ask);
                    }
                }

                const newBids: OrderTuple[] = [];
                const existingBids: OrderTuple[] = [];

                for (const bid of newOrder.bids) {
                    const exists = previousBids.some(
                        (prev) =>
                            areFloatsEqual(prev[0], bid[0]) &&
                            areFloatsEqual(prev[1], bid[1])
                    );
                    if (exists) {
                        existingBids.push(bid);
                    } else {
                        newBids.push(bid);
                    }
                }

                // Simulate fake new orders
                // newAsks.push([Math.floor(200000 + Math.random() * 100), 0]);
                // newBids.push([Math.floor(200000 + Math.random() * 100), 0]);

                // Save current order for next comparison
                previousOrderRef.current = newOrder;

                setOrder({
                    asks: existingAsks,
                    bids: existingBids,
                    newAsks,
                    newBids,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, frequency);
        return () => clearInterval(interval);
    }, [url]);

    return order;
}
