import React, { Suspense, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, FileDown, SendHorizonal } from "lucide-react";

import CampaignTable from "./CampaignTable";
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
import { Link } from "react-router-dom";
import { useCampaignStore } from "@/store/campaignStore";
import { usePapaParse } from "react-papaparse";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function CampaignContent() {
  const dataPerPage = 5;
  const [pagination, setPagination] = useState(1);
  const [recipients, setRecipients] = useState<IRecipient[]>([]);
  console.log(recipients);

  const setRecipientData = useCampaignStore((state) => state.setRecipientData);
  const recipientsData = useCampaignStore((state) => state.recipientsData);

  console.log(recipientsData);

  // recipients.map((recipient) => {
  //   setRecipientData(recipient);
  // });

  const sendEmails = async () => {
    console.log("froenend emali rige");
    try {
      // const response = await axios.get("http://localhost:8080/sendMail");
      // below is resend method
      const response = await axios.get("http://localhost:8080/sendEmailResend");
      console.log(response.data);
      console.log("response json");
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  useEffect(() => {
    if (recipients.length > 0) {
      recipients.map((recipient) => {
        setRecipientData(recipient);
      });
    }
  }, [recipients, setRecipients]);

  // const upadateRecipient = (newData) => {
  //   console.log(newData);
  //   setRecipients((prevData) => [
  //     ...prevData,
  //     newData.map((item) => {
  //       console.log(item);
  //       return { ...item };
  //     }),
  //   ]);
  // };

  return (
    <aside className="max-w-max max-h-min p-5 ring-2 ring-gray-200 shadow-md rounded-md ">
      <div className="flex justify-between">
        <div>
          <h3 className=" font-semibold">Campaigns</h3>
          <p>Assigned to you</p>
        </div>
        <Link to={"/balance"}>
          <ArrowRight />
        </Link>

        <div className="flex gap-4">
          <InputCSV setRecipients={setRecipients} />
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

          {/* send email trigger  */}

          <Button variant="outline" onClick={sendEmails}>
            <SendHorizonal className="inline-block" /> send mail
          </Button>
        </div>
      </div>

      <div className="p-5">
        <CampaignTable
          recipients={recipientsData}
          setPagination={setPagination}
          pagination={pagination}
        />
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
                (page, index) => {
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
                onClick={() => setPagination((page) => page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </aside>
  );
}
