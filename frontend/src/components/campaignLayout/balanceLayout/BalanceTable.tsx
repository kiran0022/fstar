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
import { Copy, Send } from "lucide-react";

const invoices = [
  {
    dbCode: 456256,
    balance: 900452,
    custNo: 2256365256,
    email: "customer@email.com",
    status: "pending",
    actions: {},
  },
  {
    dbCode: 456256,
    balance: 10564,
    custNo: 2256365256,
    email: "customer@email.com",
    status: "accepted",
    actions: {},
  },
  {
    dbCode: 456256,
    balance: 62228,
    custNo: 2256365256,
    email: "customer@email.com",
    status: "declined",
    actions: {},
  },
  {
    dbCode: 456256,
    balance: 0,
    custNo: 2256365256,
    email: "customer@email.com",
    status: "conditional",
    actions: {},
  },
];

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

export default function BalanceTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.dbCode} className="border-b-0">
            <TableCell className="">{invoice.dbCode}</TableCell>
            <TableCell
              className={cn(
                invoice.balance >= AVG_BALANCE.PROFIT
                  ? "bg-emerald-500/50"
                  : invoice.balance <= AVG_BALANCE.NEUTRAL
                  ? "bg-blue-500/50"
                  : "bg-red-500/50"
              )}
            >
              {invoice.balance === 0
                ? "$" + invoice.balance
                : "$" +
                  `${parseInt(
                    invoice.balance.toString().substring(0, 3)
                  )} ${parseInt(invoice.balance.toString().substring(3))}`}
            </TableCell>
            <TableCell>
              {"+91 " +
                `${parseInt(
                  invoice.custNo.toString().substring(0, 2)
                )} ${parseInt(invoice.custNo.toString().substring(2))}`}
            </TableCell>
            <TableCell>{invoice.email}</TableCell>
            <TableCell
              className={cn(
                "text-center capitalize",

                invoice.status === STATUS.ACCEPETED
                  ? "bg-emerald-500/50"
                  : invoice.status === STATUS.DECLINEd
                  ? "bg-red-500/45"
                  : invoice.status === STATUS.CONDITIONAL
                  ? "bg-yellow-500/50"
                  : "bg-gray-500/20"
              )}
            >
              {invoice.status}
            </TableCell>
            <TableCell className="flex gap-5">
              <Copy
                className={
                  invoice.actions ? "text-primary " : "text-zinc-500/40"
                }
              />
              <Send
                className={
                  invoice.actions ? "text-primary " : "text-zinc-500/40"
                }
              />
            </TableCell>
          </TableRow>
        ))}
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
