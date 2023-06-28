import {
  ClipboardEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";

import { Autocomplete, Box, TextField } from "@mui/material";
// import { FormikProps } from "formik";
// import { useSelector } from "react-redux";

// import useDistrictSearch from "../api/useDistrictSearch";
// import translate from "../assets/translationFiles/commonTranslation";

interface Props {
  data?: any;
  maxLength?: any;
  textTransform?:
    | "none"
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "full-width"
    | "full-size-kana";
  onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined;
  onPaste?: ClipboardEventHandler<HTMLDivElement> | undefined;
  setIsSaveButtonDisabled?(parameter: any): unknown;
  useDistrictSearch:any;
  translate:any;
}

export const CellmaDistrictSearch: React.FC<Props> = (props) => {
  const [district, setDistrict] = useState("");
  const districtQuery = useRef("");
  const [open, setOpen] = useState(false);
  // API call for district search
  const { districts } = props.useDistrictSearch(
    districtQuery.current,
    districtQuery.current !== ""
  );

  const handleDistrict = (newValue: any, data: any) => {
    data.setFieldValue("district", newValue.adlAddress2);
    data.setFieldValue("town", newValue.adlTown);
    data.setFieldValue("county", newValue.adlAddress4);
    data.setFieldValue("country", newValue.adlAddress6);
    data.setFieldValue("postcode", newValue.adlAddress5);
  };

  const handleInput = (data: any) => {
    data.setFieldValue("district", "");
    data.setFieldValue("town", "");
    data.setFieldValue("tempCounty", "");
    data.setFieldValue("country", "");
    data.setFieldValue("postcode", "");
  };

  return (
    <Autocomplete
      size="small"
      freeSolo
      open={open}
      onOpen={(event) => {
        if (event.type !== "mousedown" && event.type !== "focus") {
          setOpen(true);
        }
      }}
      onClose={() => setOpen(false)}
      options={districts}
      getOptionLabel={(district: any) => district.adlAddress2 ?? ""}
      renderOption={(props, district: any) => (
        <Box component="li" {...props} key={district.adlId}>
          {`${district.adlAddress2},${district.adlTown}, ${district.adlAddress4}, ${district.adlAddress6}`}
        </Box>
      )}
      onChange={(event: any, newValue: any) => {
        handleDistrict(newValue, props?.data);
        const setSave = props?.setIsSaveButtonDisabled
          ? props?.setIsSaveButtonDisabled
          : () => {};

        setSave(!event?.target.value && event?.target.value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(event: any) => {
            if (event?.target?.value !== "") {
              setTimeout(() => {
                districtQuery.current = event?.target?.value;
                handleInput(props?.data);
              }, 2000);
            }
          }}
          value={district}
          name="districtSearch"
          label={props.translate("districtSearch")}
          onBlur={() => {
            setDistrict("");
          }}
          inputProps={{
            ...params.inputProps,
            "data-testid": "districtSearch",
            maxLength: props?.maxLength,
            style: { textTransform: props?.textTransform, marginRight: "30px" },
          }}
          autoComplete="off"
          onKeyPress={props?.onKeyPress}
          onPaste={props?.onPaste}
        />
      )}
    />
  );
};

export default CellmaDistrictSearch;
