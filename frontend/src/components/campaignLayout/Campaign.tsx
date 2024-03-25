import { useState } from "react";
import CampaignContent from "./CampaignContent";
import BalanceContent from "./balanceLayout/BalanceContent";

export default function Campaign() {
  const currentLocation = window.location.pathname;
  const [pagination, setPagination] = useState(1);
  const [recipients, setRecipients] = useState<IRecipient[]>([]);
  return (
    <div>
      {currentLocation == "/campaign" ? (
        <CampaignContent />
      ) : currentLocation == "/balance" ? (
        <BalanceContent />
      ) : null}
    </div>
  );
}
