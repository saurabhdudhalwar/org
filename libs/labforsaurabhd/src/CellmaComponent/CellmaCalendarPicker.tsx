import React from "react";

import * as Mui from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
  date: any;
  onChange: any;
  label: any;
  maxDate?: any;
  minDate?: any;
}

export const CellmaCalendarPicker: React.FC<Props> = (props) => {
  return (
    <Mui.Box sx={{ width: "300px" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          data-testid={props?.label}
          openTo="day"
          views={["year", "month", "day"]}
          value={props.date}
          onChange={props.onChange}
          minDate={props?.minDate}
          maxDate={props?.maxDate}
          renderInput={(params) => <Mui.TextField {...params} />}
        />
      </LocalizationProvider>
    </Mui.Box>
  );
};

export default CellmaCalendarPicker;
