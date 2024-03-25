import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Copy, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import RecipientPage from "./RecipientPage";

enum STATUS {
  ONGOING = "ongoing",
  INACTVE = "inactive",
  ABORTED = "aborted",
  COMPLETED = "completed",
}

export default function CampaignTableData({ recipient }) {
  return (
    <TableRow className="border-b-2 border-white ">
      <TableCell className="">{recipient.campaign_name}</TableCell>
      <TableCell>{recipient.duration}</TableCell>
      <TableCell>{recipient.start_date}</TableCell>
      <TableCell>{recipient.created_by}</TableCell>
      <TableCell
        className={cn(
          "text-center capitalize",
          recipient.status === STATUS.ONGOING
            ? "bg-yellow-400/50"
            : recipient.status === STATUS.COMPLETED
            ? "bg-emerald-500/50"
            : recipient.status === STATUS.ABORTED
            ? "bg-red-500/45"
            : "bg-gray-400/20"
        )}
      >
        {recipient.status}
      </TableCell>
      <TableCell className="flex float-end gap-5">
        <Link
          to={`/campaign/recipientPage?email=${recipient.campaign_email}`}
          // onClick={() => <RecipientPage email={recipient.campaign_email} />}
        >
          <Copy
            className={
              // recipient.actions.copy
              recipient["actions/copy"] ? "text-primary " : "text-zinc-500/40"
            }
          />
        </Link>
        <Link to={`/campaign/sendEmail?email=${recipient.campaign_email}`}>
          <Send
            className={
              // recipient.actions.send
              recipient["actions/send"] ? "text-primary " : "text-zinc-500/40"
            }
          />
        </Link>
      </TableCell>
    </TableRow>
  );
}
