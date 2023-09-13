import React from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import PriceChart from "~~/components/PriceChart";

const TokenPriceChart: NextPage = () => {
  const router = useRouter();
  const { tokenName } = router.query;

  if (!tokenName || Array.isArray(tokenName)) {
    return null;
  }

  return <PriceChart tokenName={tokenName} />;
};

export default TokenPriceChart;
