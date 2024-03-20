import React from "react";
import { Button } from "../ui/button";
import { FileDown } from "lucide-react";

import CampaignTable from "../campaignLayout/CampaignTable";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import InputCSV from "./InputCSV";


export default function Content() {
  return (
    <aside className="max-w-max max-h-min p-5 ring-2 ring-gray-200 shadow-md rounded-md ">
      <div className="flex justify-between">
        <div>
          <h3 className=" font-semibold">Campaigns</h3>
          <p>Assigned to you</p>
        </div>

        <div className="flex gap-4">
         <InputCSV />
          <Button variant="outline">
            <span>
              <input
                type="file"
                className="absolute w-40 h-8 bg-transparent opacity-0 "
                accept=""
              />
              <FileDown className="inline-block" /> create campaign
            </span>
          </Button>
        </div>
      </div>

      <div className="p-5">
        <CampaignTable />
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </aside>
  );
}
