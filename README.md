# OrderBook

Fetch order information from `https://zo-devnet.n1.xyz/orderbook?market_id=4` api and display it in a table.

## Features

-   Show ask/bid price, size and total size (sorted by price from high to low)
-   Show percentage of total size for each ask/bid
-   Highlight the newly added ask/bid (orange)

> Added fake data with price higher than 200,000 to test the highlight feature.

## Screenshots

<div align="center">
    <img src="screenshot.png" alt="Screenshot" width="600">
</div>

## How to run

1. Clone the repository:
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```
