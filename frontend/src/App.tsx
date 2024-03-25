import Help from "./components/HelpLayout/Help";
import Home from "./components/homeLayout/Home";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Settings from "./components/settingsLayout/Settings";
import CampaignPdf from "./components/campaignLayout/CampaignPdf";
import RecipientPage from "./components/campaignLayout/RecipientPage";

export default function App() {
  return (
    <div className="relative w-screen min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/campaign">
            <Route index element={<Home />} />

            <Route path="recipientPage" element={<RecipientPage />} />
            {/* <Route path="viewPdf/:src" element={<CampaignPdf />} /> */}
          </Route>
          <Route path="/balance" element={<Home />} />
          <Route path="/help-center" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          {/* v6 depreciated thea arr method in path do we are using map to acheive it*/}
          {["/", "/home"].map((path) => (
            <Route key={"Home"} path={path} element={<Home />} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
