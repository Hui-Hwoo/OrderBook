import { useEffect, useRef, useState } from "react";
import type { OrderBookType, OrderItem } from "../types/order";

type OrderTableType = {
    asks: OrderItem[];
    bids: OrderItem[];
};

export function useOrderBook(frequency: number = 1000) {
    const [orders, setOrders] = useState<OrderTableType>({
        asks: [],
        bids: [],
    });
    const [rawData, setRawData] = useState<OrderBookType>({
        asks: [],
        bids: [],
    });
    const url = "https://zo-devnet.n1.xyz/orderbook?market_id=4";

    const previousOrderRef = useRef<OrderTableType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const newOrder: OrderBookType = await response.json();
                setRawData(newOrder);
                const { asks: previousAsks = [], bids: previousBids = [] } =
                    previousOrderRef.current || {};

                const newAsks: OrderItem[] = [];

                for (const ask of newOrder.asks) {
                    const askId = `${ask[0]}-${ask[1]}`;
                    const exists = previousAsks.some(
                        (prev) => prev.id === askId
                    );

                    const orderItem: OrderItem = {
                        id: askId,
                        price: ask[0],
                        size: ask[1],
                        isNew: !exists,
                        type: "ask",
                    };
                    newAsks.push(orderItem);
                }

                const newBids: OrderItem[] = [];

                for (const bid of newOrder.bids) {
                    const bidId = `${bid[0]}-${bid[1]}`;
                    const exists = previousBids.some(
                        (prev) => prev.id === bidId
                    );

                    const orderItem: OrderItem = {
                        id: bidId,
                        price: bid[0],
                        size: bid[1],
                        isNew: !exists,
                        type: "bid",
                    };
                    newBids.push(orderItem);
                }

                // Save current order for next comparison
                previousOrderRef.current = {
                    asks: newAsks,
                    bids: newBids,
                };

                setOrders({
                    asks: newAsks,
                    bids: newBids,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, frequency);
        return () => clearInterval(interval);
    }, [url]);

    return {
        orders,
        rawData,
    };
}
