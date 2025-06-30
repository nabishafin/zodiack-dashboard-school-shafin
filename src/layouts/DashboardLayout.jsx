import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboardcomponents/DashboardSidebar";
import DashboardHeader from "../components/dashboardcomponents/DashboardHeader";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar - Hidden on mobile */}
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        <DashboardHeader />

        <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 border-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
