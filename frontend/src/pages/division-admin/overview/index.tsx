import { DivisionAdminDashboardView } from "@/sections/division-admin/overview/view";
import { Helmet } from "react-helmet";

const DashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Division Admin : Dashboard</title>
      </Helmet>
      <DivisionAdminDashboardView />
    </>
  );
};

export default DashboardPage;
