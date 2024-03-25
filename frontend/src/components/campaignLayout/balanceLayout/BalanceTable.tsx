import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useCampaignStore } from "@/store/campaignStore";
import { Copy, Send } from "lucide-react";

enum AVG_BALANCE {
  LOW = 20000,
  PROFIT = 50000,
  NEUTRAL = 0,
  //   COMPLETED = "completed",
}

enum STATUS {
  PENDING = "pending",
  CONDITIONAL = "conditional",
  DECLINEd = "declined",
  ACCEPETED = "accepted",
}

export default function BalanceTable({ pagination }) {
  const recipientsData = useCampaignStore((state) => state.recipientsData);
  console.log(recipientsData);

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow className=" uppercase bg-secondary tracking-wider text-xs hover:bg-secondary">
          <TableHead className="w-[200px] pl-5 font-semibold text-black">
            db code
          </TableHead>
          <TableHead className="w-[150px]  font-semibold text-black">
            balance
          </TableHead>
          <TableHead className="w-[180px] font-semibold  text-black">
            cust. mobile
          </TableHead>
          <TableHead className="w-[400px] font-semibold text-black">
            e-mail
          </TableHead>
          <TableHead className="w-[150px] text-center font-semibold  text-black">
            status
          </TableHead>
          <TableHead className=" text-black font-semibold"> actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipientsData.length > 0 ? (
          recipientsData
            .slice(pagination * 6 - 6, pagination * 6)
            .map((recipient: IParsedRecipient, _idx: any) => (
              <TableRow key={_idx} className="border-b-0">
                <TableCell className="">{recipient.db_code}</TableCell>
                <TableCell
                  className={cn(
                    recipient.balance >= AVG_BALANCE.PROFIT
                      ? "bg-emerald-500/50"
                      : recipient.balance <= AVG_BALANCE.NEUTRAL
                      ? "bg-blue-500/50"
                      : "bg-red-500/50"
                  )}
                >
                  {recipient.balance === 0
                    ? "$" + recipient.balance
                    : "$" +
                      `${parseInt(
                        recipient.balance.toString().substring(0, 3)
                      )} ${parseInt(
                        recipient.balance.toString().substring(3)
                      )}`}
                </TableCell>
                <TableCell>
                  {"+91 " +
                    `${parseInt(
                      recipient.campaign_mobile.toString().substring(0, 2)
                    )} ${parseInt(
                      recipient.campaign_mobile.toString().substring(2)
                    )}`}
                </TableCell>
                <TableCell>{recipient.campaign_email}</TableCell>
                <TableCell
                  className={cn(
                    "text-center capitalize",

                    recipient.status === STATUS.ACCEPETED
                      ? "bg-emerald-500/50"
                      : recipient.status === STATUS.DECLINEd
                      ? "bg-red-500/45"
                      : recipient.status === STATUS.CONDITIONAL
                      ? "bg-yellow-500/50"
                      : "bg-gray-500/20"
                  )}
                >
                  {recipient.status}
                </TableCell>
                <TableCell className="flex gap-5">
                  <Copy
                    className={
                      recipient.final_action
                        ? "text-primary "
                        : "text-zinc-500/40"
                    }
                  />
                  <Send
                    className={
                      recipient.final_action
                        ? "text-primary "
                        : "text-zinc-500/40"
                    }
                  />
                </TableCell>
              </TableRow>
            ))
        ) : (
          <TableRow className="border-b-0">
            <TableCell colSpan={6} className="text-center">
              Empty Data{" "}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  );
}
