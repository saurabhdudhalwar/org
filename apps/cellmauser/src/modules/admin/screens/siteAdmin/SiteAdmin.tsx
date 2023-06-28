import React, { useEffect } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import { setIsDrawerOpen } from "../../../../store/CommonAction";
import t from "../../assets/translationFiles/siteAdminTranslation";
import { setActiveScreenName } from "../../store/AdminAction";

const SiteAdmin = () => {
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
    setTitle(t("siteAdmin"));
    setDrawerName("siteAdmin");
    setIsLink(true);
    setScreenName("");
    dispatch(setActiveScreenName("siteAdmin"));
  }, [language]);

  useEffect(() => {
    dispatch(setIsDrawerOpen(true));
  }, []);

  return (
    <Mui.Grid container>
      <Mui.Grid xs={12} item sx={{ display: "flex", justifyContent: "center" }}>
        {t("pageUnderConstructionMessage")}
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default SiteAdmin;
