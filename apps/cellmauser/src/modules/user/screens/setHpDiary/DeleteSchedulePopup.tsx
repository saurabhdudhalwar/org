import React, { MouseEventHandler, useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import {
  useDeleteClinicDiaryDetails,
  useDeleteHpDiaryDetails,
} from "../../api/useHpDiary";
import translate from "../../assets/translationFiles/setHPDiaryTranslation";

interface Props {
  handleCancel: MouseEventHandler<SVGSVGElement> | undefined;
  handleDelete(): unknown;
  selectedScheduleType: any;
  hpScheduleDetailsRefetch: any;
  clinicScheduleDetailsRefetch: any;
  combineScheduleDetailsRefetch: any;
  resetAll?: any;
  removeDelete?: any;
}

const DeleteSchedulePopup: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const { hpdID, hcdId, fieldArray, index } = useSelector(
    (element: any) => element.user
  );

  const { mutate: deleteHpDiarySchedule } = useDeleteHpDiaryDetails();

  const { mutate: deleteClinicDiaryDetails } = useDeleteClinicDiaryDetails();

  useEffect(() => {
    props?.hpScheduleDetailsRefetch();
    props?.clinicScheduleDetailsRefetch();
    props?.combineScheduleDetailsRefetch();
  }, [
    props?.hpScheduleDetailsRefetch,
    props?.clinicScheduleDetailsRefetch,
    props?.combineScheduleDetailsRefetch,
  ]);

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={translate("deleteRecord", language)}
        handleCancel={props.handleCancel}
      >
        <Mui.Grid item xs={12} sx={{ margin: "20px" }}>
          <Mui.Typography variant="h2">
            {props?.selectedScheduleType === "hp" &&
              translate("deleteHPScheduleMessage", language)}
            &nbsp;
            {translate("sureDeleteMessage", language)}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={{ ...styles.alignEnd, marginX: "20px" }}>
          <Common.CellmaButton
            onClick={() => {
              if (hpdID !== undefined && hpdID !== "") {
                props?.removeDelete();
                deleteHpDiarySchedule(hpdID, {
                  onSuccess: (response: any) => {
                    if (response.status === 200) {
                      props?.hpScheduleDetailsRefetch();
                      props?.clinicScheduleDetailsRefetch();
                      props?.combineScheduleDetailsRefetch();

                      props.handleDelete();
                      props?.resetAll?.resetForm();
                      props?.resetAll?.setFieldValue("hpStartDate", null);
                      props?.resetAll?.setFieldValue("hpEndDate", null);
                      props?.resetAll?.setFieldValue("hpStartTime", null);
                      props?.resetAll?.setFieldValue("hpEndTime", null);
                      dispatch(
                        setSnackbar(
                          true,
                          "success",
                          translate("recordDeleteMessage", language),
                          4
                        )
                      );
                    }
                  },
                });
              }

              if (hcdId !== undefined && hcdId !== "") {
                if (
                  fieldArray !== undefined &&
                  fieldArray !== "" &&
                  index !== ""
                ) {
                  if (fieldArray.form.values.hpClinicDiary?.length !== 1) {
                    fieldArray.remove(index);
                    fieldArray?.form?.resetForm();
                    fieldArray?.form?.setFieldValue("hpStartDate", null);
                    fieldArray?.form?.setFieldValue("hpEndDate", null);
                    fieldArray?.form?.setFieldValue("hpStartTime", null);
                    fieldArray?.form?.setFieldValue("hpEndTime", null);
                  } else {
                    fieldArray.remove(1);
                    fieldArray?.form?.resetForm();
                    fieldArray?.form?.setFieldValue("hpStartDate", null);
                    fieldArray?.form?.setFieldValue("hpEndDate", null);
                    fieldArray?.form?.setFieldValue("hpStartTime", null);
                    fieldArray?.form?.setFieldValue("hpEndTime", null);
                  }
                }

                deleteClinicDiaryDetails(hcdId, {
                  onSuccess: (response: any) => {
                    if (response.status === 200) {
                      props?.hpScheduleDetailsRefetch();
                      props?.clinicScheduleDetailsRefetch();
                      props?.combineScheduleDetailsRefetch();
                      props.handleDelete();
                      props?.resetAll?.resetForm();
                      props?.resetAll?.setFieldValue("hpStartDate", null);
                      props?.resetAll?.setFieldValue("hpEndDate", null);
                      props?.resetAll?.setFieldValue("hpStartTime", null);
                      props?.resetAll?.setFieldValue("hpEndTime", null);
                      dispatch(
                        setSnackbar(
                          true,
                          "success",
                          translate("recordDeleteMessage", language),
                          4
                        )
                      );
                    }
                  },
                });
              }
            }}
            label={translate("yes", language)}
            type="submit"
          />
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default DeleteSchedulePopup;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  alignEnd: { display: "flex", justifyContent: "flex-end" },
  headerText: { my: "15px" },
};
