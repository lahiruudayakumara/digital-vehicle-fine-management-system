import { DivisionAdminPaymentView } from "@/sections/division-admin/payment/view";
import { Helmet } from "react-helmet";

const PaymentPage = () => {
  return (
    <>
      <Helmet>
        <title>Division Admin : Payment</title>
      </Helmet>
      <DivisionAdminPaymentView />
    </>
  );
};

export default PaymentPage;
