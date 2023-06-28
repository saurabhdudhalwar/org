import React, { MouseEventHandler } from "react";

import * as Mui from "@mui/material";
import { useDispatch } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import t from "../../assets/translationFiles/setClinicsTranslation";

interface Props {
  handleCancel: MouseEventHandler<SVGSVGElement> | undefined;
  handleDelete(): unknown;
}

const DeleteClinicPopup: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={t("deleteRecord")}
        handleCancel={props.handleCancel}
      >
        <Mui.Grid item xs={12} sx={{ margin: "20px" }}>
          <Mui.Typography variant="h2">
            {t("deleteRecordMessage")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={{ ...styles.alignEnd, marginX: "20px" }}>
          <Common.CellmaButton
            onClick={() => {
              props.handleDelete();
              dispatch(
                setSnackbar(true, "success", t("recordDeletedMessage"), 4)
              );
            }}
            label={t("yes")}
          />
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default DeleteClinicPopup;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  alignEnd: { display: "flex", justifyContent: "flex-end" },
  headerText: { my: "15px" },
};
