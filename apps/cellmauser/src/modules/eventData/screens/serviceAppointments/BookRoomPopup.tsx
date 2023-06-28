import React, { useEffect } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isError } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";

interface Props {
  handleClose: any;
  handleSave(): any;
  handleReset(): any;
  selectedSlot: any;
  selectedSlotDate: any;
}
const BookRoomPopup: React.FC<Props> = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();
  useEffect(() => {
    props.handleReset();
  });

  const bookRoomForm = useFormik({
    initialValues: {
      appointmentDate: "",
      startTime: null,
      duration: "",
      reason: "",
    },
    validationSchema: yup.object().shape({
      duration: yup.string().required(t("durationRequired")),
      reason: yup.string().required(t("reasonRequired")),
    }),
    onSubmit: (values: any) => {
      dispatch(setSnackbar(true, "success", t("roomBookedSuccessfully"), 4));
      props.handleSave();
      props.handleClose();
    },
  });

  useEffect(() => {
    if (Object.values(bookRoomForm?.errors).length !== 0) {
      window.scrollTo(0, 0);
      bookRoomForm.validateForm(bookRoomForm?.values);
    }
  }, [language]);

  return (
    <Common.CellmaPopup
      title={t("bookRoom")}
      handleCancel={() => props.handleClose()}
    >
      <form onSubmit={bookRoomForm.handleSubmit} noValidate>
        <Mui.Grid container sx={styles.popupContainer}>
          <Mui.Grid item xs={12} sx={styles.popup}>
            <Common.CellmaDatePicker
              label={t("appointmentDate")}
              name="appointmentDate"
              disabled
              zIndex={1400}
              value={props.selectedSlotDate}
              onBlur={bookRoomForm?.handleBlur}
              onChange={(newDate: any) =>
                bookRoomForm.setFieldValue("appointmentDate", newDate)
              }
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.popup}>
            <Common.CellmaTimePicker
              label={t("startTime")}
              name="startTime"
              disabled
              zIndex={1400}
              value={moment(props.selectedSlot, "HH:mm")}
              onBlur={bookRoomForm?.handleBlur}
              onChange={(newTime: Date | null) => {
                bookRoomForm.setFieldValue("startTime", newTime);
              }}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.popup}>
            <Common.CellmaInputField
              label={t("duration")}
              name="duration"
              required
              value={bookRoomForm.values.duration}
              onHandleChange={bookRoomForm?.handleChange}
              onBlur={bookRoomForm?.handleBlur}
              errorText={isError(bookRoomForm, "duration")}
              onKeyPress={validations.restrictAlphabetsAndSpecialCharacters}
              onPaste={
                validations.restrictPasteEventForSpecialCharactersAndAlphabets
              }
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.popup}>
            <Common.CellmaInputField
              label={t("reason")}
              name="reason"
              required
              value={bookRoomForm.values.reason}
              onHandleChange={bookRoomForm?.handleChange}
              onBlur={bookRoomForm?.handleBlur}
              errorText={isError(bookRoomForm, "reason")}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.popupButton}>
          <Common.CellmaButton label={t("save")} type="submit" />
        </Mui.Grid>
      </form>
    </Common.CellmaPopup>
  );
};

export default BookRoomPopup;

const styles = {
  buttonGrid: { display: "flex", justifyContent: "flex-end" },
  filterButtonGrid: {
    display: "flex",
    justifyContent: "center",
  },
  iconButton: { display: "flex", justifyContent: "center", width: "100%" },
  viewLink: { display: "flex", justifyContent: "left", width: "100%" },
  popup: { marginY: "10px", marginX: "35px" },
  popupContainer: {
    display: "flex",
    justifyContent: "center",
    paddingX: "100px",
  },
  popupButton: {
    display: "flex",
    justifyContent: "flex-end",
    paddingX: "20px",
  },
};
