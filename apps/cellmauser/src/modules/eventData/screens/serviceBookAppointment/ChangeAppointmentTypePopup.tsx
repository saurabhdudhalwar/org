import * as Mui from "@mui/material";
import { useFormik } from "formik";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/ServiceBookAppointmentDummyData";
import t from "../../assets/translationFiles/ServiceBookAppointmentTranslation";

const ChangeAppointmentTypePopup = (props: any) => {
  const changeAppointmentTypePopupForm = useFormik({
    initialValues: {
      appointmentType: "",
    },
    onSubmit: (values: any) => {
      props?.onChangeClick();
    },
  });

  return (
    <Common.CellmaPopup
      title={t("appointmentType")}
      handleCancel={() => props?.handleCancel()}
    >
      <form onSubmit={changeAppointmentTypePopupForm.handleSubmit} noValidate>
        <Mui.Grid
          container
          xs={12}
          sx={{ display: "flex", justifyContent: "center", p: "20px" }}
        >
          <Mui.Grid item xs={8}>
            <Common.CellmaAutoSelectField
              dummyData
              label={t("appointmentType")}
              options={dummyData.APPOINTMENT_TYPE}
              value={
                changeAppointmentTypePopupForm.values.appointmentType ?? ""
              }
              onChange={(event: any, value: any) => {
                changeAppointmentTypePopupForm.setFieldValue(
                  "appointmentType",
                  value
                );
              }}
              getOptionLabel={(appointmentType: any) =>
                appointmentType.label ?? ""
              }
              renderOption={(props: any, appointmentType: any) => (
                <li {...props}>{appointmentType.label}</li>
              )}
              ariaLabel="appointmentType"
            />
          </Mui.Grid>
          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", py: "20px" }}
          >
            <Common.CellmaButton
              label={t("change")}
              type="submit"
              borderColor="common.white"
            />
          </Mui.Grid>
        </Mui.Grid>
      </form>
    </Common.CellmaPopup>
  );
};

export default ChangeAppointmentTypePopup;
