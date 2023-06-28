import React, { useRef, useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { isError } from "../../../../utils/GeneralUtils";
import { usePatientReferralDisplay } from "../../api/usePatientReferral";
import * as dummyData from "../../assets/dummyData/addReferralDummyData";
import t from "../../assets/translationFiles/addReferralTranslation";

const ReferTo = ({
  addReferralForm,
  establishmentListItem,
  acceptReferral,
  isAddReferralMode,
  continueForMoreDetails,
  setContinueForMoreDetails,
}: any) => {
  const { patientId } = useSelector((state: any) => state.patient);
  const { data: displayPatientReferral } = usePatientReferralDisplay(patientId);
  const clinic = displayPatientReferral?.entity?.clinic ?? {};
  const clinicList = [clinic];
  const consultantList = displayPatientReferral?.entity?.consultantList ?? [];
  const settings = displayPatientReferral?.settings ?? {};

  const showMoreFields = () => {
    setContinueForMoreDetails(true);
  };

  return (
    <>
      <Mui.Grid container item>
        <Mui.Grid item xs={12} sx={styles.referralHeader}>
          <Mui.Typography variant="h2">{t("referTo")}</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid container item spacing={4}>
        <Mui.Grid item xs={3}>
          <Common.CellmaSelectField
            label={t("service")}
            name="service"
            required
            value={addReferralForm.values.service ?? ""}
            changeevent={addReferralForm.handleChange}
            onBlur={addReferralForm.handleBlur}
            list={clinicList?.map((service: any) => (
              <Mui.MenuItem
                key={service.cliId}
                value={service.cliId}
                sx={{ whiteSpace: "unset" }}
              >
                {service.cliName}
              </Mui.MenuItem>
            ))}
            error={isError(addReferralForm, "service")}
          />
        </Mui.Grid>
        {isAddReferralMode === "createOnReferral" &&
          !continueForMoreDetails && (
            <Mui.Grid item xs={3}>
              <Common.CellmaButton
                label={t("continue")}
                marginY="4px"
                onClick={showMoreFields}
              />
            </Mui.Grid>
          )}
        {continueForMoreDetails && (
          <>
            <Mui.Grid item xs={3}>
              <Common.CellmaSelectField
                label={t("clinicType")}
                name="clinicType"
                value={addReferralForm.values.clinicType ?? ""}
                onBlur={addReferralForm.handleBlur}
                changeevent={addReferralForm.handleChange}
                list={establishmentListItem?.["clinic type"].map(
                  (clinicType: any) => (
                    <Mui.MenuItem
                      key={clinicType.eliId}
                      value={clinicType.eliText}
                      sx={{ clinicType: "unset" }}
                    >
                      {clinicType.eliText}
                    </Mui.MenuItem>
                  )
                )}
                error={isError(addReferralForm, "clinicType")}
              />
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                label={t("clinicLocation")}
                name="clinicLocation"
                required={
                  isAddReferralMode === "createOnReferral"
                    ? true
                    : settings?.estServiceLocation === 1
                }
                options={establishmentListItem?.["clinic location"]}
                value={addReferralForm?.values?.clinicLocation ?? ""}
                onChange={(event: any, value: any) => {
                  addReferralForm?.setFieldValue("clinicLocation", value);
                }}
                getOptionLabel={(clinicLocation: any) =>
                  clinicLocation.eliText ?? ""
                }
                renderOption={(props: any, clinicLocation: any) => (
                  <li {...props}>{clinicLocation.eliText}</li>
                )}
                error={isError(addReferralForm, "clinicLocation")}
              />
            </Mui.Grid>
            {(settings?.estUseSpecialityAndRegion === 1 ||
              isAddReferralMode === "createOnReferral") && (
              <Mui.Grid item xs={3}>
                <Common.CellmaAutoSelectField
                  label={t("team")}
                  name="team"
                  required
                  options={establishmentListItem?.["HP Region"]}
                  value={addReferralForm?.values?.team ?? ""}
                  onBlur={addReferralForm.handleBlur}
                  onChange={(event: any, value: any) => {
                    addReferralForm?.setFieldValue("team", value);
                  }}
                  getOptionLabel={(team: any) => team.eliText ?? ""}
                  renderOption={(props: any, team: any) => (
                    <li {...props}>{team.eliText}</li>
                  )}
                  error={isError(addReferralForm, "team")}
                />
              </Mui.Grid>
            )}
            {isAddReferralMode === "createOnReferral" && (
              <Mui.Grid item xs={3}>
                <Common.CellmaAutoSelectField
                  label={t("healthCareProf")}
                  name="healthCareProf"
                  options={dummyData.REFERRED_BY}
                  getOptionLabel={(REFERRED_BY: any) => REFERRED_BY.label ?? ""}
                  renderOption={(props: any, REFERRED_BY: any) => (
                    <li {...props}>{REFERRED_BY.label}</li>
                  )}
                />
              </Mui.Grid>
            )}
            {isAddReferralMode === "createOnReferral" && (
              <Mui.Grid item xs={3}>
                <Common.CellmaAutoSelectField
                  label={t("patientType")}
                  name="patientType"
                  options={dummyData.PATIENT_TYPE ?? []}
                  value={addReferralForm?.values?.patientCare ?? ""}
                  getOptionLabel={(PATIENT_TYPE: any) =>
                    PATIENT_TYPE.name ?? ""
                  }
                  renderOption={(props: any, PATIENT_TYPE: any) => (
                    <li {...props}>{PATIENT_TYPE.name}</li>
                  )}
                />
              </Mui.Grid>
            )}
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                label={t("patientCare")}
                name="patientCare"
                options={dummyData.PATIENT_CARE ?? []}
                value={addReferralForm?.values?.patientCare ?? ""}
                onChange={(event: any, value: any) => {
                  addReferralForm?.setFieldValue("patientCare", value);
                }}
                getOptionLabel={(patientCare: any) => patientCare.label ?? ""}
                renderOption={(props: any, patientCare: any) => (
                  <li {...props}>{patientCare.label}</li>
                )}
              />
            </Mui.Grid>
            {isAddReferralMode === "addReferralMode" && (
              <Mui.Grid item xs={3}>
                <Common.CellmaSelectField
                  label={t("preferredSexForAssessment")}
                  name="preferredSexForAssessment"
                  value={addReferralForm.values.preferredSexForAssessment ?? ""}
                  changeevent={addReferralForm.handleChange}
                  list={dummyData.PREFERRED_SEX_OF_EXAMINER.map(
                    (patientWeb: any) => (
                      <Mui.MenuItem
                        key={patientWeb.id}
                        value={patientWeb.name}
                        sx={{ whiteSpace: "unset" }}
                      >
                        {t(`${patientWeb.name}`)}
                      </Mui.MenuItem>
                    )
                  )}
                />
              </Mui.Grid>
            )}
            {(acceptReferral === "awaitReferralAcceptance" ||
              isAddReferralMode === "createOnReferral") && (
              <Mui.Grid item xs={3}>
                <Common.CellmaAutoSelectField
                  label={t("clinicalPriority")}
                  name="clinicalPriority"
                  options={establishmentListItem?.["Clinical Priority"]}
                  value={addReferralForm?.values?.clinicalPriority ?? ""}
                  onChange={(event: any, value: any) => {
                    addReferralForm?.setFieldValue("clinicalPriority", value);
                  }}
                  getOptionLabel={(clinicalPriority: any) =>
                    clinicalPriority.eliText ?? ""
                  }
                  renderOption={(props: any, clinicalPriority: any) => (
                    <li {...props}>{clinicalPriority.eliText}</li>
                  )}
                />
              </Mui.Grid>
            )}
            <Mui.Grid item xs={3}>
              <Common.CellmaSelectField
                label={t("consultant")}
                ariaLabel="consultantReferTo"
                name="consultant"
                required={settings?.cliConsultantMandatory === 1}
                value={addReferralForm.values.consultant ?? ""}
                onBlur={addReferralForm.handleBlur}
                changeevent={addReferralForm.handleChange}
                list={consultantList?.map((consultant: any) => (
                  <Mui.MenuItem
                    key={consultant.espId}
                    value={consultant.espId}
                    sx={{ whiteSpace: "unset" }}
                  >
                    {consultant?.espTitle} {consultant?.espFirstname}{" "}
                    {consultant?.espSurname}
                  </Mui.MenuItem>
                ))}
                error={isError(addReferralForm, "consultant")}
              />
            </Mui.Grid>
          </>
        )}
      </Mui.Grid>
    </>
  );
};

export default ReferTo;

export const styles = {
  referralHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
};
