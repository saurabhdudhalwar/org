import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/ServiceHPAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceHPAppointmentTranslation";

const DurationModifierPopup = (props: any) => {
  const durationModifierPopupForm = useFormik({
    initialValues: {
      new: "",
      review: "",
      walkIn: "",
      emergency: "",
    },
    onSubmit: (values: any) => {
      props?.handleCancel();
    },
  });

  return (
    <Common.CellmaPopup
      title={t("appointmentTypeDurationModifier")}
      handleCancel={props?.handleCancel}
    >
      <form onSubmit={durationModifierPopupForm.handleSubmit} noValidate>
        <Mui.Grid container spacing={3} xs={12} sx={{ p: "20px" }}>
          <Mui.Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            {t("new")}
          </Mui.Grid>
          <Mui.Grid item xs={8}>
            <Common.CellmaAutoSelectField
              label={t("durationModifier")}
              ariaLabel="newDurationModifier"
              name="new"
              value={durationModifierPopupForm.values.new ?? ""}
              onChange={(event: any, value: any) => {
                durationModifierPopupForm.setFieldValue("new", value);
              }}
              options={dummyData.DURATION}
              getOptionLabel={(service: any) => service.label ?? ""}
              renderOption={(prop: any, service: any) => (
                <li {...prop}>{service.label}</li>
              )}
            />
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            {t("review")}
          </Mui.Grid>
          <Mui.Grid item xs={8}>
            <Common.CellmaAutoSelectField
              label={t("durationModifier")}
              ariaLabel="reviewDurationModifier"
              name="review"
              value={durationModifierPopupForm.values.review ?? ""}
              onChange={(event: any, value: any) => {
                durationModifierPopupForm.setFieldValue("review", value);
              }}
              options={dummyData.DURATION}
              getOptionLabel={(service: any) => service.label ?? ""}
              renderOption={(prop: any, service: any) => (
                <li {...prop}>{service.label}</li>
              )}
            />
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            {t("walkIn")}
          </Mui.Grid>
          <Mui.Grid item xs={8}>
            <Common.CellmaAutoSelectField
              label={t("durationModifier")}
              ariaLabel="walkInDurationModifier"
              name="walkIn"
              value={durationModifierPopupForm.values.walkIn ?? ""}
              onChange={(event: any, value: any) => {
                durationModifierPopupForm.setFieldValue("walkIn", value);
              }}
              options={dummyData.DURATION}
              getOptionLabel={(service: any) => service.label ?? ""}
              renderOption={(prop: any, service: any) => (
                <li {...prop}>{service.label}</li>
              )}
            />
          </Mui.Grid>
          <Mui.Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            {t("emergency")}
          </Mui.Grid>
          <Mui.Grid item xs={8}>
            <Common.CellmaAutoSelectField
              label={t("durationModifier")}
              ariaLabel="emergencyDurationModifier"
              name="emergency"
              value={durationModifierPopupForm.values.emergency ?? ""}
              onChange={(event: any, value: any) => {
                durationModifierPopupForm.setFieldValue("emergency", value);
              }}
              options={dummyData.DURATION}
              getOptionLabel={(service: any) => service.label ?? ""}
              renderOption={(prop: any, service: any) => (
                <li {...prop}>{service.label}</li>
              )}
            />
          </Mui.Grid>
          <Mui.Grid
            xs={12}
            item
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Common.CellmaButton label={t("save")} type="submit" />
          </Mui.Grid>
        </Mui.Grid>
      </form>
    </Common.CellmaPopup>
  );
};

export default DurationModifierPopup;
