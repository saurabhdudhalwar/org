import React, { useRef, useState } from "react";

import * as Mui from "@mui/material";
import { useSelector } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import { isError } from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import {
  usePatientReferralDisplay,
  useReferringProfessionalDetails,
} from "../../api/usePatientReferral";
import * as dummyData from "../../assets/dummyData/addReferralDummyData";
import t from "../../assets/translationFiles/addReferralTranslation";

const Referrer = ({
  addReferralForm,
  establishmentListItem,
  isAddReferralMode,
}: any) => {
  const referralQuery = useRef("");
  const { patientId } = useSelector((state: any) => state.patient);
  const { data: displayPatientReferral } = usePatientReferralDisplay(patientId);
  const professionalsList = displayPatientReferral?.entity?.professionals ?? [];
  const referralReasonsList =
    displayPatientReferral?.entity?.referralReasons ?? [];
  const patientInterestedPartyList =
    displayPatientReferral?.entity?.patientInterestedParty ?? [];
  const settings = displayPatientReferral?.settings ?? {};
  const { hpList } = useReferringProfessionalDetails(
    referralQuery.current,
    referralQuery.current !== ""
  );

  let professional = hpList ?? [];

  return (
    <>
      <Mui.Grid container item>
        <Mui.Grid item xs={12} sx={styles.referralHeader}>
          <Mui.Typography variant="h2">{t("referrer")}</Mui.Typography>
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid container item spacing={4}>
        {isAddReferralMode === "createOnReferral" && (
          <>
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                label={t("referredBy")}
                name="referredBy"
                options={dummyData.REFERRED_BY}
                getOptionLabel={(REFERRED_BY: any) => REFERRED_BY.label ?? ""}
                renderOption={(props: any, REFERRED_BY: any) => (
                  <li {...props}>{REFERRED_BY.label}</li>
                )}
              />
            </Mui.Grid>
            <Mui.Grid item xs={3}>
              <Common.CellmaAutoSelectField
                label={t("consultant")}
                ariaLabel="consultantReferrer"
                name="referredBy"
                options={dummyData.CONSULTANT}
                getOptionLabel={(CONSULTANT: any) => CONSULTANT.name ?? ""}
                renderOption={(props: any, CONSULTANT: any) => (
                  <li {...props}>{CONSULTANT.name}</li>
                )}
              />
            </Mui.Grid>
          </>
        )}
        {settings?.cliShowReferralToTreatmentDays === 1 &&
          isAddReferralMode === "addReferralMode" && (
            <>
              <Mui.Grid item xs={3}>
                <Common.CellmaDatePicker
                  label={t("receivedReferralDate")}
                  name="receivedReferralDate"
                  required
                  maxDate={new Date("12/31/2050")}
                  value={addReferralForm?.values?.receivedReferralDate}
                  onChange={(newDate: Date | null) => {
                    addReferralForm?.setFieldValue(
                      "receivedReferralDate",
                      newDate
                    );
                  }}
                  onBlur={addReferralForm?.handleBlur}
                  error={isError(addReferralForm, "receivedReferralDate")}
                />
              </Mui.Grid>
              <Mui.Grid item xs={3}>
                <Common.CellmaDatePicker
                  label={t("approvedReferralDate")}
                  name="approvedReferralDate"
                  required
                  maxDate={new Date("12/31/2050")}
                  value={addReferralForm?.values?.approvedReferralDate}
                  onChange={(newDate: Date | null) => {
                    addReferralForm?.setFieldValue(
                      "approvedReferralDate",
                      newDate
                    );
                  }}
                  onBlur={addReferralForm?.handleBlur}
                  error={isError(addReferralForm, "approvedReferralDate")}
                />
              </Mui.Grid>
            </>
          )}
        <Mui.Grid item xs={3}>
          <Common.CellmaDatePicker
            label={t("dateOfReferral")}
            name="dateOfReferral"
            maxDate={new Date("12/31/2050")}
            value={addReferralForm?.values?.dateOfReferral}
            onChange={(newDate: Date | null) => {
              addReferralForm?.setFieldValue("dateOfReferral", newDate);
            }}
            onBlur={addReferralForm?.handleBlur}
            error={isError(addReferralForm, "dateOfReferral")}
          />
        </Mui.Grid>
        {isAddReferralMode === "addReferralMode" && (
          <Mui.Grid item xs={3}>
            <Common.CellmaTimePicker
              label={t("timeOfReferral")}
              name="timeOfReferral"
              onChange={(newTime: Date | null) => {
                addReferralForm?.setFieldValue("timeOfReferral", newTime);
              }}
              value={addReferralForm?.values?.timeOfReferral}
              onKeyPress={validations?.timeValidation}
              onBlur={addReferralForm?.handleBlur}
              error={isError(addReferralForm, "timeOfReferral")}
            />
          </Mui.Grid>
        )}
        {isAddReferralMode === "addReferralMode" && (
          <Mui.Grid item xs={3}>
            <Common.CellmaSelectField
              label={t("sourceOfReferral")}
              name="sourceOfReferral"
              required
              value={addReferralForm.values.sourceOfReferral ?? ""}
              changeevent={addReferralForm?.handleChange}
              onBlur={addReferralForm.handleBlur}
              list={professionalsList?.map((sourceOfReferral: any) => (
                <Mui.MenuItem
                  key={sourceOfReferral?.espId}
                  value={sourceOfReferral?.espId}
                  sx={{ whiteSpace: "unset" }}
                >
                  {sourceOfReferral?.espExtClinicname}
                </Mui.MenuItem>
              ))}
              error={isError(addReferralForm, "sourceOfReferral")}
            />
          </Mui.Grid>
        )}
        <Mui.Grid item xs={3}>
          <Common.CellmaAutoSelectField
            label={t("referralType")}
            name="referralType"
            options={establishmentListItem?.["Referral Type"]}
            value={addReferralForm?.values?.referralType ?? ""}
            onChange={(event: any, value: any) => {
              addReferralForm?.setFieldValue("referralType", value);
            }}
            getOptionLabel={(referralType: any) => referralType.eliText ?? ""}
            renderOption={(props: any, referralType: any) => (
              <li {...props}>{referralType.eliText}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <Common.CellmaAutoSelectField
            label={t("referralReason")}
            name="referralReason"
            options={referralReasonsList}
            value={addReferralForm?.values?.referralReason ?? ""}
            onChange={(event: any, value: any) => {
              addReferralForm?.setFieldValue("referralReason", value);
            }}
            getOptionLabel={(profession: any) => profession.eliText ?? ""}
            renderOption={(props: any, profession: any) => (
              <li {...props}>{profession.eliText}</li>
            )}
          />
        </Mui.Grid>
        {isAddReferralMode === "addReferralMode" && (
          <Mui.Grid item xs={3}>
            <Common.CellmaAutoSelectField
              freeSolo
              clearable
              ariaLabel="referringProfessional"
              options={referralQuery.current !== "" ? professional : []}
              getOptionLabel={(referringProfessional: any) =>
                referringProfessional.espName ?? ""
              }
              renderOption={(props: any, referringProfessional: any) => (
                <Mui.Box
                  component="li"
                  {...props}
                  key={referringProfessional.ehpId}
                >
                  {referringProfessional.espName}
                </Mui.Box>
              )}
              onChange={(event: any, newValue: any) => {
                addReferralForm?.setFieldValue(
                  "referringProfessional",
                  newValue ?? ""
                );
                professional = [];
              }}
              name="referringProfessional"
              label={t("referringProfessional")}
              inputTextValue={
                addReferralForm.values.referringProfessional ?? ""
              }
              onInputChange={(event: any) => {
                addReferralForm.handleChange("referringProfessional")(event);

                referralQuery.current = event.target.value;
              }}
              onBlur={(event: any) => {
                addReferralForm.handleBlur("referringProfessional")(event);
                referralQuery.current = event.target.value;
              }}
              autoComplete="off"
            />
          </Mui.Grid>
        )}
        {isAddReferralMode === "addReferralMode" && (
          <Mui.Grid item xs={3}>
            <Common.CellmaSelectField
              label={t("referrerName")}
              name="referrerName"
              value={addReferralForm.values.referrerName ?? ""}
              changeevent={addReferralForm.handleChange}
              onBlur={addReferralForm.handleBlur}
              list={patientInterestedPartyList?.map((pip: any) => (
                <Mui.MenuItem
                  key={pip.pipId}
                  value={pip.pipId}
                  sx={{ whiteSpace: "unset" }}
                >
                  {pip?.pipFirstname} {pip?.pipSurname}
                </Mui.MenuItem>
              ))}
              error={isError(addReferralForm, "referrerName")}
            />
          </Mui.Grid>
        )}
        {isAddReferralMode === "addReferralMode" && (
          <Mui.Grid item xs={3}>
            <Common.CellmaSelectField
              label={t("modeOfReferral")}
              name="modeOfReferral"
              value={addReferralForm.values.modeOfReferral ?? ""}
              onBlur={addReferralForm.handleBlur}
              changeevent={addReferralForm.handleChange}
              list={establishmentListItem?.["Mode Of Referral"].map(
                (referralMode: any) => (
                  <Mui.MenuItem
                    key={referralMode.eliId}
                    value={referralMode.eliText}
                    sx={{ whiteSpace: "unset" }}
                  >
                    {referralMode.eliText}
                  </Mui.MenuItem>
                )
              )}
              error={isError(addReferralForm, "modeOfReferral")}
            />
          </Mui.Grid>
        )}
      </Mui.Grid>
    </>
  );
};

export default Referrer;

export const styles = {
  referralHeader: {
    backgroundColor: "primary.light",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px",
  },
};
