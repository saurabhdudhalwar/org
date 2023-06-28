import React, { MouseEventHandler } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { useRepeatSchedule } from "../../api/useHpDiary";
import translate from "../../assets/translationFiles/setHPDiaryTranslation";

interface Props {
  handleCancel: MouseEventHandler<SVGSVGElement> | undefined;
  handleSave(): unknown;
  selectedSchedule?: any;
  hpScheduleDetailsRefetch?: any;
}

const RepeatSchedulePopup: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const { mutate: updateRepeatSchedule } = useRepeatSchedule();

  const repeatScheduleForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      endDate: "",
    },
    validationSchema: yup.object().shape({
      endDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidDate", language))
        .max(new Date("12/31/2050"), translate("invalidDate", language))
        .typeError(translate("invalidDate", language)),
    }),
    onSubmit: (values: any) => {
      const obj = {
        hpdId: [props?.selectedSchedule],
        endDate: moment(values?.endDate).format("DD/MM/yyyy"),
      };
      updateRepeatSchedule(obj, {
        onSuccess: (response: any) => {
          if (response.status === 200) {
            props?.handleSave();
            dispatch(
              setSnackbar(
                true,
                "success",
                translate("scheduleSetSuccessfully", language),
                4
              )
            );
            props?.hpScheduleDetailsRefetch();
          }
        },
      });
    },
  });

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={translate("endDate", language)}
        handleCancel={props.handleCancel}
      >
        <form onSubmit={repeatScheduleForm?.handleSubmit} noValidate>
          <Mui.Grid item xs={12} sx={{ margin: "20px" }}>
            <Common.CellmaDatePicker
              label={translate("endDate", language)}
              name="endDate"
              maxDate={new Date("12/31/2050")}
              zIndex={1400}
              value={repeatScheduleForm?.values?.endDate}
              onChange={(newDate: Date | null) => {
                repeatScheduleForm?.setFieldValue("endDate", newDate);
              }}
              onBlur={repeatScheduleForm?.handleBlur}
              error={
                repeatScheduleForm?.touched?.endDate &&
                repeatScheduleForm?.errors?.endDate
              }
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={{ ...styles.alignEnd, marginX: "20px" }}>
            <Common.CellmaButton
              label={translate("save", language)}
              type="submit"
            />
          </Mui.Grid>
        </form>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default RepeatSchedulePopup;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  alignEnd: { display: "flex", justifyContent: "flex-end" },
  headerText: { my: "15px" },
};
