import { Helmet } from "react-helmet";
import { DivisionAdminDashboardView } from "@sections/auth/division-admin/view";

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
