import { Helmet } from "react-helmet";
import { UpdateOfficerView } from "@/sections/division-admin/update/view";

const UpdateOfficerPage = () => {
    return (
        <>
            <Helmet>
                <title>Division Admin : Update Form</title>
            </Helmet>
            <UpdateOfficerView />
        </>
    );
};

export default UpdateOfficerPage;
