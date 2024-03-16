import { BarChartBig, CircleHelp, Settings } from "lucide-react";
import React from "react";

export default function Section() {
  // optimze the repeting buttn with array values passing as buton componnet arguments

  // optimize by @apply taiwind methods
  return (
    <div className="h-[100%] border flex flex-col gap-3 w-56">
      <button className="flex gap-4 p-4 focus:border-l-4 focus:bg-blue-300/35 focus:text-primary focus:border-l-primary rounded-md">
        <BarChartBig className="inline-block focus:text-primary text-gray-400" />
        <span className=" font-medium">Campaigns</span>
      </button>
      <button className="flex gap-4 p-4 focus:border-l-4 focus:bg-blue-300/35 focus:text-primary focus:border-l-primary rounded-md">
        <CircleHelp className="inline-block text-gray-400 focus:text-primary " />
        <span className=" font-medium">Help center</span>
      </button>
      <button className="flex gap-4 p-4 focus:border-l-4 focus:bg-blue-300/35 focus:text-primary focus:border-l-primary rounded-md">
        <Settings className="inline-block text-gray-400 focus-within:text-primary" />
        <span className=" font-medium">settings</span>
      </button>
    </div>
  );
}
