import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import RejectedServiceInputFieldGroup from "./RejectedServiceInputFieldGroup";
import RejectedServiceOnReferralsTable from "./RejectedServiceOnReferralsTable";
import ReReferPopup from "./ReReferPopup";
import {
  setIsDrawerOpen,
  setIsUnderConstruction,
} from "../../../../store/CommonAction";
import { setSnackbar } from "../../../../store/SnackbarAction";
import t from "../../assets/translationFiles/rejectedServiceOnReferral";
import { setActiveScreenName } from "../../store/ReferralAction";

const RejectedServiceOnReferrals = () => {
  const [isShowTable, setIsShowTable] = useState(false);
  const [isReReferPopup, setIsReReferPopup] = useState(false);

  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const {
    setTitle,
    setIsLink,
    setScreenName,
    setDrawerName,
  }: { setTitle: any; setIsLink: any; setScreenName: any; setDrawerName: any } =
    useOutletContext(); // <-- access context value

  useEffect(() => {
    setTitle(t("rejectedServiceOnReferral"));
    setIsLink(true);
    setScreenName("");
    setDrawerName("ServiceAppointmentDrawer");
    dispatch(setActiveScreenName("rejectedServiceOnReferrals"));
  }, [language]);

  useEffect(() => {
    dispatch(setIsDrawerOpen(true));
  }, []);

  return (
    <Mui.Grid container spacing={5}>
      <Mui.Grid item container>
        <RejectedServiceInputFieldGroup
          handleSearch={() => setIsShowTable(true)}
        />
      </Mui.Grid>
      {isShowTable && (
        <Mui.Grid item container>
          <RejectedServiceOnReferralsTable
            handleReRefer={() => setIsReReferPopup(true)}
          />
        </Mui.Grid>
      )}
      {isReReferPopup && (
        <ReReferPopup
          handleCancel={() => setIsReReferPopup(false)}
          handleSearch={() => dispatch(setIsUnderConstruction(true))}
          handleAdd={() => {
            setIsReReferPopup(false);
            dispatch(
              setSnackbar(true, "success", t("referralAddedSuccessfully"), 4)
            );
          }}
        />
      )}
    </Mui.Grid>
  );
};

export default RejectedServiceOnReferrals;
