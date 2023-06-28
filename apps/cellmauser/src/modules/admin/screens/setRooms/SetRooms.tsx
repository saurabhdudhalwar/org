import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import RoomAvailability from "./RoomAvailability";
import SetRoomsInputFields from "./SetRoomsInputFields";
import SetRoomsTable from "./SetRoomsTable";
import { setIsDrawerOpen } from "../../../../store/CommonAction";
import t from "../../assets/translationFiles/setRoomsTranslation";

const SetRooms = () => {
  const [isShowSetRoomTable, setIsShowSetRoomTable] = useState(false);
  const [mode, setMode] = useState("add") as any;
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  const { setTitle, setIsLink }: { setTitle: any; setIsLink: any } =
    useOutletContext();

  useEffect(() => {
    setTitle(t("setRooms"));
    setIsLink(false);
  }, [language]);

  useEffect(() => {
    dispatch(setIsDrawerOpen(true));
  }, []);
  return (
    <Mui.Grid container spacing={2}>
      <Mui.Grid item xs={12}>
        <SetRoomsInputFields
          handleSetRoomTable={() => setIsShowSetRoomTable(true)}
        />
      </Mui.Grid>
      <Mui.Grid item xs={12}>
        <RoomAvailability
          mode={mode}
          handleResetMode={() => setMode("add")}
          handleSetRoomTable={() => setIsShowSetRoomTable(true)}
        />
      </Mui.Grid>
      {isShowSetRoomTable && (
        <Mui.Grid item xs={12}>
          <SetRoomsTable handleEditMode={() => setMode("edit")} />
        </Mui.Grid>
      )}
    </Mui.Grid>
  );
};

export default SetRooms;
