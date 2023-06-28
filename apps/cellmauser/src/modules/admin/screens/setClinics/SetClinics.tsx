import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import SetClinicsAddInputFields from "./SetClinicsAddInputFields";
import SetClinicsSearchInputFields from "./SetClinicsSearchInputFields";
import SetClinicsTable from "./SetClinicsTable";
import { setIsDrawerOpen } from "../../../../store/CommonAction";
import { setSnackbar } from "../../../../store/SnackbarAction";
import t from "../../assets/translationFiles/setClinicsTranslation";

const SetClinics = () => {
  const [isShowTable, setIsShowTable] = useState(false);
  const [mode, setMode] = useState("add");
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
    setTitle(t("setClinics"));
    setDrawerName("siteAdmin");
    setIsLink(true);
    setScreenName("");
  }, [language]);

  useEffect(() => {
    dispatch(setIsDrawerOpen(true));
  }, []);

  return (
    <Mui.Grid container spacing={5}>
      <Mui.Grid xs={12} item>
        <SetClinicsSearchInputFields />
      </Mui.Grid>
      <Mui.Grid xs={12} item>
        <SetClinicsAddInputFields
          handleAdd={() => {
            setIsShowTable(true);
            dispatch(
              setSnackbar(true, "success", t("clinicAddedSuccessfully"), 4)
            );
          }}
          handleSave={() => {
            setMode("add");
            dispatch(
              setSnackbar(true, "success", t("clinicUpdatedSuccessfully"), 4)
            );
          }}
          mode={mode}
        />
      </Mui.Grid>
      {isShowTable && (
        <Mui.Grid xs={12} item>
          <SetClinicsTable handleEdit={() => setMode("edit")} />
        </Mui.Grid>
      )}
    </Mui.Grid>
  );
};

export default SetClinics;
