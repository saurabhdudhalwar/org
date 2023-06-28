import React, { useState } from "react";

import { DeleteOutline, Edit } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import DeleteSetRoomsPopup from "./DeleteSetRoomsPopup";
import RepeatSchedulePopup from "./RepeatSchedulePopup";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { showOverflowTooltip } from "../../../../utils/GeneralUtils";
import { SET_ROOM_ROWS } from "../../assets/dummyData/setRoomsDummyData";
import t from "../../assets/translationFiles/setRoomsTranslation";

interface Props {
  handleEditMode(): any;
}

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <Mui.Box
      role="tabpanel"
      hidden={value !== index}
      id={`setRoomTab-${index}`}
      aria-labelledby={`setRoomTab-${index}`}
      {...other}
    >
      {value === index && <Mui.Box marginTop={1}>{children}</Mui.Box>}
    </Mui.Box>
  );
};

const SetRoomsTable: React.FC<Props> = (props) => {
  const [roomTabValue, setRoomTabValue] = useState(0);
  const [isScheduleSelected, setIsScheduleSelected] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState([] as any);
  const [isRepeatSchedulePopup, setIsRepeatSchedulePopup] = useState(false);
  const [isDeleteSetRoomPopup, setIsDeleteSetRoomPopup] = useState(false);

  // Function for change tab
  const handleChangeTab = (event: any, newValue: number) => {
    setRoomTabValue(newValue);
    setSelectedSchedule([]);
  };

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 70,
      hide: true,
    },
    {
      field: "col1",
      headerName: t("location"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col2",
      headerName: t("zone"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 133,
    },

    {
      field: "col3",
      headerName: t("rooms"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <Common.CellmaLink
            label="Room"
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              navigate("/cellmaUser/eventData/roomDiary");
            }}
          >
            {params.value}
          </Common.CellmaLink>
        );
      },
    },
    {
      field: "col13",
      headerName: t("activityType"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      hide: roomTabValue === 0,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col4",
      headerName: t("startDate"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "col5",
      headerName: t("endDate"),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 120,
      minWidth: 100,
    },
    {
      field: "col6",
      headerName: t("startTime"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
    },
    {
      field: "col7",
      headerName: t("endTime"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
    },
    {
      field: "col8",
      headerName: t("roomStatus"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "col9",
      headerName: t("reason"),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => showOverflowTooltip(params),
    },
    {
      field: "col10",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      sortable: false,
      renderCell: () => {
        return (
          <Mui.IconButton
            sx={styles.iconStyle}
            aria-label="edit"
            title={t("edit")}
            onClick={(e: any) => {
              e.stopPropagation();
              props.handleEditMode();
            }}
          >
            <Edit sx={{ color: "success.dark" }} />
          </Mui.IconButton>
        );
      },
    },
    {
      field: "col11",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      sortable: false,
      renderCell: () => {
        return (
          <Mui.IconButton
            sx={styles.iconStyle}
            aria-label="delete"
            title={t("delete")}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              setIsDeleteSetRoomPopup(true);
            }}
          >
            <DeleteOutline sx={{ color: "warning.dark" }} />
          </Mui.IconButton>
        );
      },
    },

    {
      field: "col12",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 60,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Common.CellmaLink
            label="Checkbox"
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
              setIsScheduleSelected(!isScheduleSelected);
              if (selectedSchedule?.includes(params?.id)) {
                selectedSchedule?.pop(params?.id);
              } else selectedSchedule?.push(params?.id);
            }}
          >
            <Mui.Checkbox />
          </Common.CellmaLink>
        );
      },
    },
  ];

  return (
    <Mui.Grid container item xs={12}>
      <Mui.Box sx={styles.tabsBox}>
        <Mui.Box sx={styles.tabs}>
          <Mui.Tabs value={roomTabValue} onChange={handleChangeTab}>
            <Mui.Tab label={t("roomAvailability")} />
            <Mui.Tab label={t("roomSchedule")} />
          </Mui.Tabs>
        </Mui.Box>
        <TabPanel value={roomTabValue} index={0}>
          <CellmaTable
            searchField
            rows={SET_ROOM_ROWS}
            columns={columns}
            noRecordsMessage={t("noRecordsFound")}
          />
        </TabPanel>
        <TabPanel value={roomTabValue} index={1}>
          <CellmaTable
            searchField
            rows={SET_ROOM_ROWS}
            columns={columns}
            noRecordsMessage={t("noRecordsFound")}
          />
        </TabPanel>
      </Mui.Box>
      <Mui.Grid item xs={12} sx={styles.alignEnd}>
        <Common.CellmaButton
          disabled={selectedSchedule?.length === 0}
          onClick={() => {
            setIsRepeatSchedulePopup(true);
          }}
          label={t("repeatSchedule")}
        />
      </Mui.Grid>
      {isDeleteSetRoomPopup && (
        <DeleteSetRoomsPopup
          handleCancel={() => setIsDeleteSetRoomPopup(false)}
          handleSave={() => setIsDeleteSetRoomPopup(false)}
        />
      )}
      <Mui.Grid container item xs={12}>
        {isRepeatSchedulePopup && (
          <RepeatSchedulePopup
            handleCancel={() => {
              setIsRepeatSchedulePopup(false);
            }}
            handleSave={() => setIsRepeatSchedulePopup(false)}
          />
        )}
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default SetRoomsTable;

const styles = {
  alignEnd: { display: "flex", justifyContent: "flex-end" },
  tabs: { borderBottom: 1, borderColor: "divider" },
  tabsBox: { width: "100%" },
  iconStyle: { display: "flex", justifyContent: "center", width: "100%" },
};
