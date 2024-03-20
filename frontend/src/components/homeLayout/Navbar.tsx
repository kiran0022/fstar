import { Input } from "../ui/input";
import { BellIcon, ChevronDown, SearchIcon } from "lucide-react";
import profile from "@/assets/images/dogPrfile.jpg";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav
      className="flex justify-between w-s h-16
    place-items-center border mb-4 shadow-sm"
    >
      <h2 className="text-primary font-bold text-2xl pl-10">F-Star</h2>

      <div className="flex place-items-center w-[50%]">
        <label htmlFor="search" className="">
          <SearchIcon className="text-gray-500 inline-block w-6  text-end" />
        </label>
        <Input
          id="search"
          type="search"
          placeholder="search"
          className=" w-96 focus-visible:ring-0 focus:border-l-0 focus:border-t-0 focus-visible:ring-white outline-none  border-b-2 border-r-0 border-t-0 border-l-0"
        ></Input>
      </div>

      <div className="flex place-items-center">
        <div className="flex justify-between gap-6 place-items-center">
          <div className="relative flex">
            <BellIcon className="inline-block w-7 h-7" />
            <span className="absolute text-[10px] text-center bg-red-500 text-white w-3.5 h-3.5 font-semibold rounded-full ring-1 ring-white left-4">
              3
            </span>
          </div>

          <div>
            <img
              src={profile}
              className="w-8 h-8 rounded-full border border-gray-200"
            />
          </div>

          <div className="w-44 ">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="border-none outline-none focus-visible:outline-none"
              >
                <Button variant="link" className="border-none">
                  Open <ChevronDown />{" "}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-46 border">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Accordion type="single" collapsible className="w-full relative ">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
             
            </Accordion> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
