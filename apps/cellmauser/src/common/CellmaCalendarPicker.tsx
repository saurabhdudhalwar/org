import React from "react";

import * as Mui from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

interface Props {
  date: any;
  onChange: any;
  label: any;
  maxDate?: any;
  minDate?: any;
}

moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

const CellmaCalendarPicker: React.FC<Props> = (props) => {
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
          dayOfWeekFormatter={(day) => `${day}`}
          renderInput={(params) => <Mui.TextField {...params} />}
        />
      </LocalizationProvider>
    </Mui.Box>
  );
};

export default CellmaCalendarPicker;
