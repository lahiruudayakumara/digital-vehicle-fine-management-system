import { DivisionAdminBlackListView } from "@/sections/division-admin/black-list/view";
import { Helmet } from "react-helmet";

const BlackListPage = () => {
  return (
    <>
      <Helmet>
        <title>Division Admin : Black List</title>
      </Helmet>
      <DivisionAdminBlackListView />
    </>
  );
};

export default BlackListPage;
