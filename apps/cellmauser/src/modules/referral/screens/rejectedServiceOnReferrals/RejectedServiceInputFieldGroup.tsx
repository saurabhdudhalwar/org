import * as Mui from "@mui/material";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/rejectedServiceOnReferralDummyData";
import t from "../../assets/translationFiles/rejectedServiceOnReferral";
import { useState } from "react";

const GridItem = (props: any) => {
  return (
    <Mui.Grid item xs={12 / 5} sx={{ display: "flex", alignItems: "center" }}>
      <Mui.Grid item xs={12}>
        {props.children}
      </Mui.Grid>
    </Mui.Grid>
  );
};

interface Props {
  handleSearch: any;
}

const RejectedServiceInputFieldGroup: React.FC<Props> = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <Mui.Grid container spacing={2}>
      <Mui.Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Mui.Typography variant="h2">
          {t("service")}: General Medicine
        </Mui.Typography>
      </Mui.Grid>
      <GridItem>
        <Common.CellmaInputField
          label={t("patientFamilyName")}
          name="patientFamilyName"
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          options={dummyData.CLINIC_LOCATION}
          label={t("clinicLocations")}
          name="clinicLocations"
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          options={dummyData.CLINIC_TYPE}
          label={t("clinicType")}
          name="clinicType"
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          options={dummyData.STATUS}
          label={t("status")}
          name="status"
        />
      </GridItem>
      <GridItem>
        <Common.CellmaAutoSelectField
          dummyData
          options={dummyData.CLINICAL_PRIORITY}
          label={t("clinicalPriority")}
          name="clinicalPriority"
        />
      </GridItem>
      <GridItem>
        <Common.CellmaDatePicker
          label={t("startDate")}
          name="startDate"
          value={startDate}
          onChange={(newDate: any) => setStartDate(newDate)}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaDatePicker
          label={t("endDate")}
          name="endDate"
          value={endDate}
          onChange={(newDate: any) => setEndDate(newDate)}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaTimePicker
          label={t("startTime")}
          name="startTime"
          value={startTime}
          onChange={(newTime: any) => setStartTime(newTime)}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaTimePicker
          label={t("endTime")}
          name="endTime"
          value={endTime}
          onChange={(newTime: any) => setEndTime(newTime)}
        />
      </GridItem>
      <GridItem>
        <Common.CellmaButton label={t("search")} onClick={props.handleSearch} />
      </GridItem>
    </Mui.Grid>
  );
};

export default RejectedServiceInputFieldGroup;
