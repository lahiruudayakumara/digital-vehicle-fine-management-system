import { Helmet } from "react-helmet";
import { OfficerManagementView } from "@sections/auth/division-admin/view";

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
