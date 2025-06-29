import { CurrencyCircleDollarIcon } from "@phosphor-icons/react";

export const OrderHeader = () => {
    return (
        <div className="w-full text-left px-12 pt-8">
            <div className="flex flex-column items-center">
                <div className="mr-2">
                    <CurrencyCircleDollarIcon
                        size={24}
                        weight="fill"
                        color="white"
                    />
                </div>
                <div className="text-2xl font-bold font-mono hover:text-orange-300 transition-all duration-200 cursor-default hover:scale-105">
                    BTC-USDC
                </div>
            </div>

            <p className="text-gray-200/90 text-sm mt-2 max-w-[840px] cursor-default">
                Real-time order book displaying live BTC-USDC trading data.
                <span className="text-orange-300 border border-transparent hover:border-orange-300 hover:bg-orange-100/5 rounded-sm px-1 py-0.5 cursor-pointer mx-0.5 font-semibold">
                    New orders
                </span>
                are highlighted in
                <span className="hover:text-orange-300 rounded-sm pl-1 py-0.5">
                    orange
                </span>
                ,
                <span className="text-red-700 border border-transparent hover:text-red-600 hover:border-red-700 rounded-sm px-1 py-0.5 cursor-pointer mx-0.5 font-semibold">
                    Asks
                </span>
                (sell orders) in
                <span className="hover:text-red-700 rounded-sm pl-1 py-0.5">
                    red
                </span>
                , and
                <span className="text-green-600 border border-transparent hover:text-green-600 hover:border-green-700 rounded-sm px-1 py-0.5 cursor-pointer mx-0.5 font-semibold">
                    Bids
                </span>
                (buy orders) in
                <span className="hover:text-green-600 rounded-sm pl-1 py-0.5">
                    green
                </span>
                . Data refreshes every second to show current market depth and
                activity.
            </p>
            <div className="border-b border-gray-300/50 mt-4"></div>
        </div>
    );
};
