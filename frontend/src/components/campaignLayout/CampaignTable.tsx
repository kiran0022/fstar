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
import { useCampaignStore } from "@/store/campaignStore";
import { useEffect } from "react";
import csvjson from "csvjson";
import { usePapaParse } from "react-papaparse";
import Papa from "papaparse";
import CampaignTableData from "./CampaignTableData";
import { useHistory, useNavigate } from "react-router";
// const invoices = [
//   {
//     name: "INV001",
//     duration: "Paid",
//     startDate: "$250.00",
//     createdBy: "Credit Card",
//     status: "ongoing",
//     actions: {
//       copy: true,
//       send: true,
//     },
//   },
//   {
//     name: "INV001",
//     duration: "Paid",
//     startDate: "$250.00",
//     createdBy: "Credit Card",
//     status: "active",
//     actions: {
//       copy: true,
//       send: false,
//     },
//   },
//   {
//     name: "INV001",
//     duration: "Paid",
//     startDate: "$250.00",
//     createdBy: "Credit Card",
//     status: "inactive",
//     actions: {
//       copy: false,
//       send: true,
//     },
//   },
//   {
//     name: "INV001",
//     duration: "Paid",
//     startDate: "$250.00",
//     createdBy: "Credit Card",
//     status: "aborted",
//     actions: {
//       copy: false,
//       send: true,
//     },
//   },
//   {
//     name: "INV001",
//     duration: "Paid",
//     startDate: "$250.00",
//     createdBy: "Credit Card",
//     status: "completed",
//     actions: {
//       copy: false,
//       send: true,
//     },
//   },
// ];

export default function CampaignTable({
  recipients,
  pagination,
  setPagination,
}: any) {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
            actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipients.length > 0 ? (
          recipients
            .slice(pagination * 6 - 6, pagination * 6)
            .map((recipient: IParsedRecipient, _idx: any) => (
              <CampaignTableData recipient={recipient} key={_idx} />
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

/* 


data.slice(pagination * 5 - 5, pagination * 5).map((item) => {



<button
              onClick={() =>
                pagination === 1
                  ? setPagination(1)
                  : setPagination(pagination - 1)
              }
              disabled={pagination === 1}
              className={`${
                pagination === 1 ? "opacity-20 cursor-not-allowed" : ""
              }`}
            >
              <FaArrowLeft />
            </button>
            {[...Array(Math.ceil(data.length / 5))].map((page, index) => {
              return (
                <button onClick={() => setPagination(index + 1)}>
                  {index + 1}
                </button>
              );
            })}




*/
