import { Outlet } from "react-router-dom";
import { Navbar } from "../features/home/components/Navbar";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#14161B]">
      <Navbar />
      <Outlet />
    </div>
  );
};
