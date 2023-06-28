import React, { MouseEventHandler } from "react";

import * as Mui from "@mui/material";
import { useDispatch } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import t from "../../assets/translationFiles/setRoomsTranslation";

interface Props {
  handleCancel: MouseEventHandler<SVGSVGElement> | undefined;
  handleSave(): unknown;
}

const DeleteSetRoomsPopup: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  return (
    <Common.CellmaPopup
      title={t("deleteRecord")}
      handleCancel={props.handleCancel}
    >
      <Mui.Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center" }}
        padding={2}
      >
        <Mui.Typography variant="h2">{t("deleteRecordTitle")}</Mui.Typography>
      </Mui.Grid>
      <Mui.Grid item xs={12} sx={styles.alignEnd}>
        <Common.CellmaButton
          onClick={() => {
            props.handleSave();
            dispatch(
              setSnackbar(true, "success", t("recordDeletedSuccessfully"), 4)
            );
          }}
          label={t("yes")}
        />
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default DeleteSetRoomsPopup;

const styles = {
  alignEnd: { display: "flex", justifyContent: "flex-end", marginX: "20px" },
};
