import React, { useState } from "react";
import { Button } from "../../ui/button";
import { ArrowLeft, FileDown } from "lucide-react";

import CampaignTable from "../CampaignTable";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import InputCSV from "../InputCSV";
import BalanceScreen from "./BalanceTable";
import BalanceTable from "./BalanceTable";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCampaignStore } from "@/store/campaignStore";

export default function BalanceContent() {
  const dataPerPage = 5;
  const [pagination, setPagination] = useState(1);
  const recipientsData = useCampaignStore((state) => state.recipientsData);
  let page = useCampaignStore((state) => state.page);
  // page = pagination;

  return (
    <aside className="max-w-max max-h-min p-5 ring-2 ring-gray-200 shadow-md rounded-md ">
      <div className="flex justify-between">
        <div>
          <span className="">
            <Link to={"/campaign"}>
              <ArrowLeft className="inline-block" />
            </Link>
          </span>
          <h3 className=" font-semibold">Balances</h3>
          <p>Assigned to you</p>
        </div>

        {/* <div className="flex gap-4">
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
        </div> */}
      </div>

      <div className="p-5">
        <BalanceTable pagination={pagination} />
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={pagination === 1}
                onClick={() =>
                  pagination === 1
                    ? setPagination(1)
                    : setPagination(pagination - 1)
                }
                className={cn(
                  pagination === 1 && "opacity-20 cursor-not-allowed hidden"
                )}
              />
            </PaginationItem>
            <PaginationItem>
              {[...Array(Math.ceil(recipientsData.length / 5))].map(
                (_page, index) => {
                  return (
                    <PaginationLink
                      isActive={pagination === index + 1}
                      href="#"
                      onClick={() => setPagination(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  );
                }
              )}
            </PaginationItem>

            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext
                className={cn(
                  Math.ceil(recipientsData.length / dataPerPage) === pagination
                    ? `opacity-20 cursor-not-allowed hidden`
                    : null
                )}
                href="#"
                onClick={() => setPagination((_page) => page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </aside>
  );
}
