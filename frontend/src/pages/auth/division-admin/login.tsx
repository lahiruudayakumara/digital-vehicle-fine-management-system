import { DivisionAdminLoginView } from "@/sections/auth/division-admin/view";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Division Admin : Login</title>
      </Helmet>
      <DivisionAdminLoginView />
    </>
  );
};

export default LoginPage;
