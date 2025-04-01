import { Helmet } from "react-helmet";
import { OfficerManagementView } from "@/sections/division-admin/officer-management/view";

const OfficerManagePage = () => {
  return (
    <>
      <Helmet>
        <title>Division Admin : Officer Management</title>
      </Helmet>
      <OfficerManagementView />
    </>
  );
};

export default OfficerManagePage;
