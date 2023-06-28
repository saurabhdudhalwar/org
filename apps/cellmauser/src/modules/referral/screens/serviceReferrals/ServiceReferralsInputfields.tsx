import React, { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch } from "react-redux";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/serviceReferralDummyData";
import t from "../../assets/translationFiles/addReferralTranslation";
import { setServiceReferralStatus } from "../../store/ReferralAction";

const GridItem = (props: any) => {
  return (
    <Mui.Grid item xs={12 / 4} sx={{ display: "flex", alignItems: "center" }}>
      <Mui.Grid item xs={12}>
        {props.children}
      </Mui.Grid>
    </Mui.Grid>
  );
};

interface Props {
  handleShowTable: any;
}

const ServiceReferralsInputfields: React.FC<Props> = (props: any) => {
  const [renameIdentifierFieldToPayrollNo] = useState<any>(1);

  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [startTime, setStartTime] = useState<any>("");
  const [endTime, setEndTime] = useState<any>("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setServiceReferralStatus(""));
  }, []);

  return (
    <Mui.Grid
      container
      spacing={2}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Mui.Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center" }}
        padding={1}
      >
        <Mui.Typography variant="h2">
          {t("service")}: General Medicine
        </Mui.Typography>
      </Mui.Grid>
      <GridItem>
        <Common.CellmaDatePicker
          label={t("startDate")}
          required
          value={startDate}
          onChange={(newDate: any) => setStartDate(newDate)}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaDatePicker
          label={t("endDate")}
          required
          value={endDate}
          onChange={(newDate: any) => setEndDate(newDate)}
        />
      </GridItem>
      {/* NOTE: If Default Preference setting "Rename identifier Field to Payroll
      No" is set to 1, then Identifier field will be called as Payroll No. on
      Service Referrals page. If this is set to 0, then that field and column
      will be called as "Identifier" */}
      <GridItem>
        <Common.CellmaInputField
          label={
            renameIdentifierFieldToPayrollNo === 1
              ? t("payrollNo")
              : t("Identifier")
          }
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          label={t("team")}
          name="team"
          options={dummyData.TEAM}
          getOptionLabel={(team: any) => team.label}
          renderOption={(props: any, team: any) => (
            <li {...props}>{team.label}</li>
          )}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          label={t("clinicLocation")}
          ariaLabel="clinicLocationInput"
          name="clinicLocation"
          options={dummyData.CLINIC_LOCATION}
          getOptionLabel={(clinicLocation: any) => clinicLocation.label}
          renderOption={(props: any, clinicLocation: any) => (
            <li {...props}>{clinicLocation.label}</li>
          )}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          label={t("clinicType")}
          name="clinicType"
          ariaLabel="clinicTypeInput"
          options={dummyData.CLINIC_TYPE}
          getOptionLabel={(clinicType: any) => clinicType.label}
          renderOption={(props: any, clinicType: any) => (
            <li {...props}>{clinicType.label}</li>
          )}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          label={t("status")}
          name="status"
          required
          options={dummyData.STATUS}
          getOptionLabel={(status: any) => status.label}
          renderOption={(props: any, status: any) => (
            <li {...props}>{status.label}</li>
          )}
          onChange={(event: any, value: any) => {
            dispatch(setServiceReferralStatus(value?.label.toString()));
            // console.log(value.label);
          }}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          label={t("clinicalPriority")}
          name="clinicalPriority"
          ariaLabel="clinicalPriorityInput"
          options={dummyData.CLINICAL_PRIORITY}
          getOptionLabel={(clinicalPriority: any) => clinicalPriority.label}
          renderOption={(props: any, clinicalPriority: any) => (
            <li {...props}>{clinicalPriority.label}</li>
          )}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          label={t("referralReason")}
          ariaLabel="referralReason"
          name="referralReason"
          options={dummyData.REASON}
          getOptionLabel={(referralReason: any) => referralReason.label}
          renderOption={(props: any, referralReason: any) => (
            <li {...props}>{referralReason.label}</li>
          )}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaInputField label={t("patientFamilyName")} />
      </GridItem>
      <GridItem>
        <Common.CellmaInputField label={t("barcode")} />
      </GridItem>
      <GridItem>
        <Common.CellmaTimePicker
          label={t("startTime")}
          value={startTime}
          onChange={(newTime: any) => setStartTime(newTime)}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaTimePicker
          label={t("endTime")}
          value={endTime}
          onChange={(newTime: any) => setEndTime(newTime)}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          label={t("hp")}
          name="hp"
          options={dummyData.HP}
          getOptionLabel={(hp: any) => hp.label}
          renderOption={(props: any, hp: any) => <li {...props}>{hp.label}</li>}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaCheckbox label={t("saveAsDefault")} />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          label={t("displayExternalReferrals")}
          ariaLabel="displayExternalReferrals"
          name="displayExternalReferrals"
          options={dummyData.EXTERNAL_REFERRALS}
          getOptionLabel={(displayExternalReferrals: any) =>
            displayExternalReferrals.label
          }
          renderOption={(props: any, displayExternalReferrals: any) => (
            <li {...props}>{displayExternalReferrals.label}</li>
          )}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaButton
          label={t("search")}
          onClick={props.handleShowTable}
        />
      </GridItem>
    </Mui.Grid>
  );
};

export default ServiceReferralsInputfields;
