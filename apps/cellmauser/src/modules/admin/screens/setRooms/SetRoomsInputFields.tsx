import React, { useEffect } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/setRoomsDummyData";
import t from "../../assets/translationFiles/setRoomsTranslation";

interface Props {
  handleSetRoomTable(): any;
}

const SetRoomsInputFields: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);

  const searchRoomForm = useFormik({
    initialValues: {
      location: "",
      zone: "",
      rooms: "",
    },
    onSubmit: (values: any) => {
      props.handleSetRoomTable();
      console.log(values);
    },
  });

  useEffect(() => {
    if (Object.values(searchRoomForm?.errors).length !== 0) {
      window.scrollTo(0, 0);
      searchRoomForm.validateForm(searchRoomForm?.values);
    }
  }, [language]);

  return (
    <form onSubmit={searchRoomForm.handleSubmit} noValidate>
      <Mui.Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Mui.Grid item xs={2.5}>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("location")}
            name="location"
            ariaLabel="roomLocation"
            options={dummyData.LOCATIONS}
            getOptionLabel={(location: any) => location.label ?? ""}
            renderOption={(props: any, location: any) => (
              <li {...props}>{location.label}</li>
            )}
            value={searchRoomForm.values.location ?? ""}
            onChange={(event: any, value: any) => {
              searchRoomForm.setFieldValue("location", value);
            }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.5}>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("zone")}
            ariaLabel="roomZone"
            options={dummyData.ZONE}
            getOptionLabel={(zone: any) => zone.label ?? ""}
            renderOption={(props: any, zone: any) => (
              <li {...props}>{zone.label}</li>
            )}
            value={searchRoomForm.values.zone ?? ""}
            onChange={(event: any, value: any) => {
              searchRoomForm.setFieldValue("zone", value);
            }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.5}>
          <Common.CellmaAutoSelectField
            dummyData
            label={t("rooms")}
            ariaLabel="rooms"
            options={dummyData.ROOM}
            getOptionLabel={(rooms: any) => rooms.label ?? ""}
            renderOption={(props: any, rooms: any) => (
              <li {...props}>{rooms.label}</li>
            )}
            value={searchRoomForm.values.rooms ?? ""}
            onChange={(event: any, value: any) => {
              searchRoomForm.setFieldValue("rooms", value);
            }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2.5}>
          <Common.CellmaButton label={t("search")} type="submit" />
        </Mui.Grid>
      </Mui.Grid>
    </form>
  );
};

export default SetRoomsInputFields;
