import Help from "./components/HelpLayout/Help";
import Home from "./components/homeLayout/Home";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Settings from "./components/settingsLayout/Settings";

export default function App() {
  return (
    <div className="relative w-screen min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/campaign">
            <Route index element={<Home />} />
            <Route path="balance" element={<Home />} />
          </Route>
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
