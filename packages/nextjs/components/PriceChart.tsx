import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

type TPricePoint = { price: string; timestamp: number };

const PriceChart = ({ tokenName }: { tokenName: string }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<Highcharts.Options>({});

  useEffect(() => {
    const updatePrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/price/${tokenName}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const rawPrices = await response.json();
          const formatedPrices = rawPrices.map((price: TPricePoint) => {
            return [price.timestamp, parseFloat(price.price)];
          });
          setOptions({
            title: {
              text: `${tokenName} Price`,
            },
            series: [
              {
                name: "Price",
                type: "line",
                data: formatedPrices,
              },
            ],
            credits: {
              enabled: false,
            },
            rangeSelector: {
              buttons: [
                {
                  count: 1,
                  type: "minute",
                  text: "1M",
                },
                {
                  count: 5,
                  type: "minute",
                  text: "5M",
                },
                {
                  count: 15,
                  type: "minute",
                  text: "15M",
                },
                {
                  count: 30,
                  type: "minute",
                  text: "30M",
                },
                {
                  count: 1,
                  type: "hour",
                  text: "1H",
                },
                {
                  type: "all",
                  text: "All",
                },
              ],
              inputEnabled: false,
              selected: 0,
            },
            time: {
              useUTC: false,
            },
          });
        }
      } catch (e) {
        console.log("Error getting prices: ", e);
      } finally {
        setLoading(false);
      }
    };

    if (tokenName) {
      updatePrices();
    }
  }, [tokenName]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
          ref={chartComponentRef}
        />
      )}
    </>
  );
};

export default PriceChart;
