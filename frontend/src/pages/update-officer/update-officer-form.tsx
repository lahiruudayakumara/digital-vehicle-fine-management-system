import { Helmet } from "react-helmet";
import UpdateOfficerView from "@sections/auth/division-admin/view/division-admin-update-officer";



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
