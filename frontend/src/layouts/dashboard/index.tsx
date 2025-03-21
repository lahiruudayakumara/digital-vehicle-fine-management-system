import { ReactNode } from "react";
import SideBar from "@/components/side-bars/side-bar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
