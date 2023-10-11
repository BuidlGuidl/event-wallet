import React from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import PriceChart from "~~/components/PriceChart";
import scaffoldConfig from "~~/scaffold.config";

const TokenPriceChart: NextPage = () => {
  const router = useRouter();
  const { tokenName } = router.query;

  if (!tokenName || Array.isArray(tokenName)) {
    return null;
  }

  const token = scaffoldConfig.tokens.find(t => t.name === tokenName);

  if (!token) {
    return null;
  }

  return <PriceChart tokenName={tokenName} tokenEmoji={token?.emoji} rangeSelector={true} navigator={true} />;
};

export default TokenPriceChart;
