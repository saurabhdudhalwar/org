import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import ServiceReferralsInputfields from "./ServiceReferralsInputfields";
import { setIsDrawerOpen } from "../../../../store/CommonAction";
import t from "../../assets/translationFiles/addReferralTranslation";
import { setActiveScreenName, setIsCustomizeView } from "../../store/ReferralAction";
import ReferralTable from "../addReferral/ReferralTable";

const ServiceReferrals = () => {
  const [isShowTable, setIsShowTable] = useState(false);
  const [contactTypePopup, setContactTypePopup] = useState(false);

  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const {
    setTitle,
    setIsLink,
    setScreenName,
    setDrawerName,
    setCustomizableViewPath,
  }: {
    setTitle: any;
    setIsLink: any;
    setScreenName: any;
    setDrawerName: any;
    setCustomizableViewPath: any;
  } = useOutletContext(); // <-- access context value

  useEffect(() => {
    setTitle(t("serviceReferrals"));
    setIsLink(true);
    setDrawerName("ServiceAppointmentDrawer");
    dispatch(setActiveScreenName("serviceReferrals"));
    setScreenName("serviceReferral");
    setCustomizableViewPath("/cellmaUser/referral/serviceReferralsCustom");
  }, [language, contactTypePopup]);

  useEffect(() => {
    dispatch(setIsCustomizeView(false));
    dispatch(setIsDrawerOpen(true));
  }, []);

  return (
    <Mui.Grid container spacing={2}>
      <Mui.Grid item xs={12}>
        <ServiceReferralsInputfields
          handleShowTable={() => setIsShowTable(true)}
        />
      </Mui.Grid>
      {isShowTable && (
        <Mui.Grid item xs={12}>
          <ReferralTable
            HandleContactTypePopup={(data: any) => {
              setContactTypePopup(data);
            }}
          />
        </Mui.Grid>
      )}
    </Mui.Grid>
  );
};

export default ServiceReferrals;
