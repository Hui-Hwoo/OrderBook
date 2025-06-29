export type RawOrderTuple = [number, number];

export type OrderBookType = {
    asks: RawOrderTuple[];
    bids: RawOrderTuple[];
};

export type OrderItem = {
    id: string;
    price: number;
    size: number;
    isNew: boolean;
    type: "ask" | "bid";
};
