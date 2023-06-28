import React, { MouseEventHandler, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import t from "../../assets/translationFiles/setRoomsTranslation";

interface Props {
  handleCancel: MouseEventHandler<SVGSVGElement> | undefined;
  handleSave(): unknown;
}

const RepeatSchedulePopup: React.FC<Props> = (props) => {
  const [repeatScheduleDate, setRepeatScheduleDate] = useState<any>("");
  const dispatch = useDispatch();

  return (
    <Common.CellmaPopup title={t("endDate")} handleCancel={props.handleCancel}>
      <Mui.Grid item xs={12} sx={{ margin: "20px" }}>
        <Common.CellmaDatePicker
          label={t("endDate")}
          name="endDate"
          zIndex={1400}
          value={repeatScheduleDate}
          onChange={(newDate: any) => setRepeatScheduleDate(newDate)}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12} sx={styles.alignEnd}>
        <Common.CellmaButton
          label={t("save")}
          onClick={() => {
            props.handleSave();
            dispatch(
              setSnackbar(true, "success", t("scheduleRepeatedSuccessfully"), 4)
            );
          }}
        />
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default RepeatSchedulePopup;

const styles = {
  alignEnd: { display: "flex", justifyContent: "flex-end", marginX: "20px" },
};
