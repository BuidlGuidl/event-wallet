import React, { useEffect, useRef, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import scaffoldConfig from "~~/scaffold.config";

type TPricePoint = { price: string; timestamp: number };

const PriceChart = ({
  tokenName,
  tokenEmoji,
  navigator,
  rangeSelector,
  scrollbar,
  height,
}: {
  tokenName: string;
  tokenEmoji: string;
  navigator?: boolean;
  rangeSelector?: boolean;
  scrollbar?: boolean;
  height?: number;
}) => {
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
              text: tokenEmoji,
              style: {
                fontSize: "1.3em",
              },
            },
            chart: {
              events: {
                load: function () {
                  // set up the updating of the chart each second
                  const series = this.series[0];
                  setInterval(async function () {
                    const response = await fetch(`/api/recent-price/${tokenName}`, {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });

                    if (response.ok) {
                      const rawPrice = await response.json();
                      console.log("rawPrice", rawPrice);
                      const formatedPrice = [rawPrice.timestamp, parseFloat(rawPrice.price)];
                      try {
                        series.addPoint(formatedPrice, true, true);
                      } catch (e) {
                        // console.log("Error adding point: ", e);
                      }
                    }
                  }, scaffoldConfig.tokenLeaderboardPollingInterval);
                },
              },
              height: height || null,
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
            navigator: {
              enabled: navigator || false,
            },
            scrollbar: { enabled: scrollbar || false },
            rangeSelector: {
              enabled: rangeSelector || false,
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
              selected: 4,
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
