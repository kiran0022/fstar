import React from "react";
import Navbar from "./Navbar";
import Section from "./Section";
import CampaignContent from "../campaignLayout/CampaignContent";

import BalanceContent from "../campaignLayout/balanceLayout/BalanceContent";

export default function Home() {
  const currentLocation = window.location.pathname;

  return (
    <main className="">
      <Navbar />
      <div className="flex gap-20">
        <Section />
        {currentLocation == "/campaign" ? (
          <CampaignContent />
        ) : currentLocation == "/balance" ? (
          <BalanceContent />
        ) : null}
      </div>
    </main>
  );
}
