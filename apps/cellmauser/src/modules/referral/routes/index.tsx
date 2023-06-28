import { lazy } from "react";

import { Route, Routes } from "react-router-dom";

import ReferralCard from "../common/ReferralCard";
import OurPendingOnReferrals from "../screens/ourPendingOnReferrals/OurPendingOnReferrals";
import RejectedServiceOnReferrals from "../screens/rejectedServiceOnReferrals/RejectedServiceOnReferrals";
import ServiceReferrals from "../screens/serviceReferrals/ServiceReferrals";

const AddReferral = lazy(() => import("../screens/addReferral/AddReferral"));
const ServiceReferralCustomizable = lazy(
  () =>
    import("../screens/customizeServiceReferral/ServiceReferralCustomizable")
);

const ReferralRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ReferralCard />}>
        <Route path="/addReferral" element={<AddReferral />} />
        <Route path="/serviceReferrals" element={<ServiceReferrals />} />
        <Route
          path="/serviceReferralsCustom"
          element={<ServiceReferralCustomizable />}
        />
        <Route
          path="/rejectedServiceOnReferrals"
          element={<RejectedServiceOnReferrals />}
        />
        <Route
          path="/ourPendingOnReferrals"
          element={<OurPendingOnReferrals />}
        />
      </Route>
    </Routes>
  );
};

export default ReferralRoutes;
