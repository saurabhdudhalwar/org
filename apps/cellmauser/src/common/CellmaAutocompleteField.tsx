import {
  ClipboardEventHandler,
  CSSProperties,
  FocusEventHandler,
  KeyboardEventHandler,
  SyntheticEvent,
  useState,
} from "react";

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

interface Props {
  id?: any;
  label: string | undefined;
  size?: any;
  ariaLabel?: any;
  getOptionLabel?: ((option: any) => string) | undefined;
  options?: any;
  value?: any;
  maxLength?: any;
  style?: CSSProperties | undefined;
  onChange?:
    | ((
        event: SyntheticEvent<Element, Event>,
        value: any,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<any> | undefined
      ) => void)
    | undefined;
  onBlur?: FocusEventHandler<HTMLDivElement> | undefined;
  onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined;
  onPaste?: ClipboardEventHandler<HTMLDivElement> | undefined;
  name?: any;
  disabled?: boolean; // correct
  required?: any;
  error?: any;
}

const CellmaAutocompleteField: React.FC<Props> = (props: any) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <Autocomplete
      id={props.id ? props.id : props.label}
      data-testid={props.id ? props.id : props.label}
      multiple={props.multiple}
      disableClearable={!props.clearable}
      size={props.size ? props.size : "small"}
      aria-label={props.ariaLabel ? props.ariaLabel : props?.label}
      open={openDropdown}
      onOpen={(event) => {
        if (event.type !== "mousedown" && event.type !== "focus") {
          setOpenDropdown(true);
        }
      }}
      onClose={() => setOpenDropdown(false)}
      getOptionLabel={props?.getOptionLabel}
      options={props?.options}
      value={props?.value}
      disabled={props?.disabled}
      renderInput={(params: any) => (
        <TextField
          {...params}
          label={props.label}
          sx={{
            "& .MuiSvgIcon-root": {
              backgroundColor: props?.disabled ? "grey.200" : "common.white",
              zIndex: "1000",
            },
            "& .MuiInputLabel-outlined.Mui-disabled": {
              color: props?.disabled && props?.value && "common.black",
            },

            borderRadius: "5px",
            backgroundColor: props?.disabled ? "grey.200" : "transparent",
          }}
          inputProps={{
            ...params.inputProps,
            maxLength: props.maxLength,
            style: props.style,
          }}
          required={props?.required}
          error={props?.error}
        />
      )}
      onChange={props?.onChange}
      onBlur={props?.onBlur}
      onKeyPress={props?.onKeyPress}
      onPaste={props?.onPaste}
    />
  );
};

export default CellmaAutocompleteField;
