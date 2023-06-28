import {
  FocusEventHandler,
  HTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from "react";

import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderOptionState,
} from "@mui/material";
import * as Mui from "@mui/material";

interface Props {
  multiple?: any;
  value?: any;
  limitTags?: any;
  label?: string | undefined;
  options: readonly any[];
  getOptionLabel?: ((option: any) => string) | undefined;
  onChange?:
    | ((
        event: SyntheticEvent<Element, Event>,
        value: any,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<any> | undefined
      ) => void)
    | undefined;
  onBlur?: FocusEventHandler<HTMLDivElement> | undefined;
  renderOption?:
    | ((
        props: HTMLAttributes<HTMLLIElement>,
        option: any,
        state: AutocompleteRenderOptionState
      ) => ReactNode)
    | undefined;
  onInputBlur?: any;
  clearable?: any;
  name?: string | undefined;
  required?: boolean | undefined;
  ariaLabel?: string;
  dummyData?: any;
  disabled?: any;
  onInputChange?: any;
  error?: any;
  isOptionEqualToValue?: any;
  inputValue?: any;
  freeSolo?: any;
  autoComplete?: any;
  inputTextValue?: any;
  clearOnBlur?: any;
}

export const CellmaAutoSelectField: React.FC<Props> = (props) => {
  return (
    <Mui.Stack>
      <Mui.Autocomplete
        freeSolo={props?.freeSolo}
        multiple={props?.multiple}
        size="small"
        PopperComponent={({ style, ...props }) => (
          <Mui.Popper {...props} style={{ ...style, zIndex: 1400 }} />
        )}
        disabled={props?.disabled}
        value={props?.value}
        limitTags={props?.limitTags ? props?.limitTags : 1}
        id={props?.ariaLabel ? props?.ariaLabel : props?.label}
        options={props?.options}
        fullWidth
        disableCloseOnSelect={props?.multiple}
        getOptionLabel={props?.getOptionLabel}
        isOptionEqualToValue={props?.isOptionEqualToValue}
        getOptionDisabled={(option) => {
          // Mention options which needs to be disable
          return props?.dummyData && option === props?.options[0];
        }}
        onChange={props?.onChange}
        onBlur={props?.onBlur}
        renderOption={props?.renderOption}
        disableClearable={!props?.clearable}
        clearOnBlur={props?.clearOnBlur}
        inputValue={props?.inputValue}
        renderInput={(params) => (
          <Mui.TextField
            {...params}
            id={props?.ariaLabel ? props?.ariaLabel : props?.label}
            name={props?.name}
            label={props?.label}
            required={props?.required}
            data-testid={props?.label}
            value={props?.inputTextValue}
            sx={{
              "& .MuiInputLabel-outlined.Mui-disabled": {
                color: props?.disabled && props?.value && "common.black",
              },
              "& .MuiInputLabel-asterisk": {
                color: "error.dark",
              },
              "& .MuiSvgIcon-root": {
                backgroundColor: props?.disabled ? "grey.200" : "common.white",
                zIndex: "1000",
              },
              borderRadius: "5px",
              backgroundColor: props?.disabled ? "grey.200" : "transparent",
            }}
            onBlur={props?.onInputBlur}
            onChange={props?.onInputChange}
            error={props?.error}
          />
        )}
      />
      {props?.error && (
        <Mui.Typography sx={{ fontSize: 12, color: "warning.dark" }}>
          {props?.error}
        </Mui.Typography>
      )}
    </Mui.Stack>
  );
};




export default CellmaAutoSelectField