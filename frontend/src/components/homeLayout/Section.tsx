import { cn } from "@/lib/utils";
import { BarChartBig, CircleHelp, Settings } from "lucide-react";
// import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
// import Campaign from "@/components/campaignLayout/Campaign";
// import Home from "./Home";
// import Navbar from "./Navbar";
import { useSearchParams } from "react-router-dom";

export default function Section() {
  // optimze the repeting buttn with array values passing as buton componnet arguments

  // optimize by @apply taiwind methods

  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const cuurentUrlLocation = window.location.pathname;
  console.log(cuurentUrlLocation);

  return (
    <div className="h-[100%] border flex flex-col gap-3 w-64">
      <Link
        to={"/campaign"}
        className={cn(
          "flex gap-4 p-4  rounded-md",
          cuurentUrlLocation === "/campaign" ? "btn-selected" : null
        )}
      >
        <BarChartBig className="inline-block focus:text-primary text-gray-400" />
        <span className=" font-medium">Campaigns</span>
      </Link>
      <Link
        to={"/help-center"}
        className={cn(
          "flex gap-4 p-4  rounded-md",
          cuurentUrlLocation === "/help-center" ? "btn-selected" : null
        )}
      >
        <CircleHelp className="inline-block text-gray-400 focus:text-primary " />
        <span className=" font-medium">Help center</span>
      </Link>
      <Link
        to={"/settings"}
        className={cn(
          "flex gap-4 p-4 rounded-md",
          cuurentUrlLocation === "/settings" ? "btn-selected" : null
        )}
      >
        <Settings className="inline-block text-gray-400 focus-within:text-primary" />
        <span className=" font-medium">settings</span>
      </Link>

      {/* <div>
        <Routes>
          <Route path="/campaign" element={<Campaign />} />
          <Route path="/nav" element={<Navbar />} />
          {["/", "/home"].map((path) => (
            <Route key={"Home"} path={path} element={<Home />} />
          ))}
          s
        </Routes>
      </div> */}
    </div>
  );
}
