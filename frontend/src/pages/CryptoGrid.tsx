import React, { useEffect, useState, useCallback, memo } from "react";
import axios from "axios";
import { Bitcoin } from "lucide-react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const coinIcons: Record<string, { bg: string; icon: JSX.Element }> = {
  btc: {
    bg: "#F7931A20",
    icon: <Bitcoin size={30} className="text-[#F7931A]" aria-label="Bitcoin" />,
  },
  eth: {
    bg: "#627EEA20",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        role="img"
        aria-label="Ethereum"
      >
        <g fill="none" fillRule="evenodd">
          <circle cx="16" cy="16" r="16" fill="#627EEA" />
          <g fill="#FFF" fillRule="nonzero">
            <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
            <path d="M16.498 4L9 16.22l7.498-3.35z" />
            <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
            <path d="M16.498 27.995v-6.028L9 17.616z" />
            <path
              fillOpacity=".2"
              d="M16.498 20.573l7.497-4.353-7.497-3.348z"
            />
            <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
          </g>
        </g>
      </svg>
    ),
  },
  usdt: {
    bg: "#53ae9420",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 2000 2000"
        role="img"
        aria-label="Tether"
      >
        <path
          d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.38,0,1000,447.68,0,1000,0"
          fill="#53ae94"
        />
        <path
          d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18"
          fill="#fff"
        />
      </svg>
    ),
  },
  xrp: {
    bg: "#23292F20",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        role="img"
        aria-label="XRP"
      >
        <path
          d="M21.96 11.216L19.193 6l-2.743 5.216h-2.277L17.18 6h-2.343l-3.388 6.602H9.18L11.343 6H9.09L5.913 11.216h-1.53l-1.928 3.728h9.091l1.515-2.927h1.515l-1.515 2.927h9.091z"
          fill="#23292F"
        />
      </svg>
    ),
  },
};

// Memoized Card for better performance
const CoinCard = memo(({ coin }: { coin: Coin }) => {
  const changeClass =
    coin.price_change_percentage_24h >= 0
      ? "bg-green-500/20 text-green-500"
      : "bg-red-500/20 text-red-500";

  return (
    <div
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
      role="region"
      aria-label={`${coin.name} crypto card`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: coinIcons[coin.symbol]?.bg }}
          >
            {coinIcons[coin.symbol]?.icon}
          </div>
          <div>
            <h4 className="font-bold">{coin.name}</h4>
            <span className="text-xs text-gray-400">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>
        <div
          className={`flex items-center px-2 py-1 rounded-full text-xs ${changeClass}`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
      <div className="flex justify-between items-end">
        <span className="text-2xl font-bold">
          ₹{coin.current_price.toLocaleString()}
        </span>
        <div className="h-10 w-24">
          <svg
            viewBox="0 0 100 30"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            <path
              d="M0,15 Q25,10 50,20 Q75,25 100,15"
              fill="none"
              stroke={
                coin.price_change_percentage_24h >= 0 ? "#22c55e" : "#ef4444"
              }
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});

const CryptoGrid: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get<Coin[]>(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "inr",
            ids: "bitcoin,ethereum,tether,ripple",
          },
        }
      );
      setCoins(res.data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading)
    return <p className="text-center mt-10">Loading cryptocurrencies...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default CryptoGrid;
