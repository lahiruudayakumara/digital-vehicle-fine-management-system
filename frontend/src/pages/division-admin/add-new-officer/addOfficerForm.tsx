import { AddNewOfficerView } from "@/sections/division-admin/add-new/view";
import { Helmet } from "react-helmet";

const NewOfficerPage = () => {
  return (
    <>
      <Helmet>
        <title>Division Admin : Add New Officer</title>
      </Helmet>
      <AddNewOfficerView />
    </>
  );
};

export default NewOfficerPage;