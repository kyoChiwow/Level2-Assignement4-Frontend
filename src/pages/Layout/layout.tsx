import Navbar from "@/components/navbar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar Here */}
      <div>
        <Navbar />
      </div>
      {/* Navbar Here */}

      {/* Outlet Here */}
      <div className="max-w-7xl mx-auto mt-10">
        <Outlet />
      </div>
      {/* Outlet Here */}
    </div>
  );
}
