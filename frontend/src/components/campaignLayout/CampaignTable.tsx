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
    name: "INV001",
    duration: "Paid",
    startDate: "$250.00",
    createdBy: "Credit Card",
    status: "ongoing",
    actions: {
      copy: true,
      send: true,
    },
  },
  {
    name: "INV001",
    duration: "Paid",
    startDate: "$250.00",
    createdBy: "Credit Card",
    status: "active",
    actions: {
      copy: true,
      send: false,
    },
  },
  {
    name: "INV001",
    duration: "Paid",
    startDate: "$250.00",
    createdBy: "Credit Card",
    status: "inactive",
    actions: {
      copy: false,
      send: true,
    },
  },
  {
    name: "INV001",
    duration: "Paid",
    startDate: "$250.00",
    createdBy: "Credit Card",
    status: "aborted",
    actions: {
      copy: false,
      send: true,
    },
  },
  {
    name: "INV001",
    duration: "Paid",
    startDate: "$250.00",
    createdBy: "Credit Card",
    status: "completed",
    actions: {
      copy: false,
      send: true,
    },
  },
];

enum STATUS {
  ONGOING = "ongoing",
  INACTVE = "inactive",
  ABORTED = "aborted",
  COMPLETED = "completed",
}

export default function CampaignTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow className=" uppercase bg-secondary tracking-wider text-xs hover:bg-secondary">
          <TableHead className="w-[200px] pl-5 font-semibold text-black">
            campaign name
          </TableHead>
          <TableHead className="w-[150px]  font-semibold text-black">
            duration
          </TableHead>
          <TableHead className="w-[150px] font-semibold  text-black">
            start date
          </TableHead>
          <TableHead className="w-[500px] font-semibold text-black">
            created by
          </TableHead>
          <TableHead className="w-[150px] text-center font-semibold  text-black">
            status
          </TableHead>
          <TableHead className=" w-[200px] text-end text-black font-semibold">
            {" "}
            actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.name} className="border-b-0">
            <TableCell className="">{invoice.name}</TableCell>
            <TableCell>{invoice.duration}</TableCell>
            <TableCell>{invoice.startDate}</TableCell>
            <TableCell>{invoice.createdBy}</TableCell>
            <TableCell
              className={cn(
                "text-center capitalize",
                invoice.status === STATUS.ONGOING
                  ? "bg-yellow-400/50"
                  : invoice.status === STATUS.COMPLETED
                  ? "bg-emerald-500/50"
                  : invoice.status === STATUS.ABORTED
                  ? "bg-red-500/45"
                  : "bg-gray-400/20"
              )}
            >
              {invoice.status}
            </TableCell>
            <TableCell className="flex float-end gap-5">
              <Copy
                className={
                  invoice.actions.copy ? "text-primary " : "text-zinc-500/40"
                }
              />
              <Send
                className={
                  invoice.actions.send ? "text-primary " : "text-zinc-500/40"
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
