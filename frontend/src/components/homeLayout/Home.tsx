import React from "react";
import Navbar from "./Navbar";
import Section from "./Section";
import CampaignContent from "./CampaignContent";

import BalanceContent from "./BalanceContent";

export default function Home() {
  const currentLocation = window.location.pathname;

  return (
    <main className="">
      <Navbar />
      <div className="flex gap-20">
        <Section />
        {currentLocation == "/campaign" ? (
          <CampaignContent />
        ) : (
          <BalanceContent />
        )}
      </div>
    </main>
  );
}
