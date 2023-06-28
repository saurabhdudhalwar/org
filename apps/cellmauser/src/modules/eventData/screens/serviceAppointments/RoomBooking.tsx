// Page Name : "roomBooking"
// Page Id : "c4eve13"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/ServiceAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceAppointmentTranslation";
import { setActiveScreenName } from "../../store/EventDataAction";

const RoomBooking = () => {
  const [room, setRoom] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useSelector((state: any) => state.language);

  const { setTitle, setIsLink, setSelectDateAndHp, setScreenName } =
    useOutletContext() as any;

  setTitle(t("roomBooking"));
  setIsLink(true);
  setScreenName("");
  setSelectDateAndHp(false);
  dispatch(setActiveScreenName("serviceAppointmentsScreen"));

  const handleOptionSelect = (event: any, newValue: any) => {
    setRoom(newValue);
  };

  useEffect(() => {}, [language]);
  return (
    <Mui.Grid
      container
      sx={{ display: "flex", alignItems: "center" }}
      spacing={2}
    >
      <Mui.Grid item xs={4}>
        <Common.CellmaAutoSelectField
          dummyData
          label={t("room")}
          name="room"
          options={dummyData.ROOM}
          onChange={handleOptionSelect}
          getOptionLabel={(room: any) => room.label}
          renderOption={(props: any, room: any) => (
            <li {...props}>{room.label}</li>
          )}
        />
      </Mui.Grid>
      <Mui.Grid item xs={1}>
        <Common.CellmaButton
          label={t("select")}
          onClick={() =>
            room.length !== 0 && navigate("/cellmaUser/eventData/roomDiary")
          }
        />
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default RoomBooking;
