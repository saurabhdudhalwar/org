import {
  ChangeEventHandler,
  ClipboardEventHandler,
  CSSProperties,
  FormEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useState,
} from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import * as Mui from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  rows?: string | number | undefined;
  minRows?: string | number | undefined;
  onClick?: MouseEventHandler<HTMLParagraphElement> | undefined;
  FormHelperText?: ReactNode;
  selected?: boolean;
  handleSelect?(): unknown;
  cancelField?: boolean;
  variant?: any;
  size?: any;
  errorText?: any;
  required?: boolean | undefined;
  label?: string | undefined;
  disabled?: any;
  onHandleChange?:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onBlur?: any;
  value?: string | number | null;
  name?: string | undefined;
  type?: string | undefined;
  autoComplete?: any;
  onKeyDown?:
    | KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  defaultValue?: unknown;
  placeholder?: string | undefined;
  multiline?: boolean | undefined;
  maxLength?: any;
  style?: CSSProperties | undefined;
  onInput?: FormEventHandler<HTMLDivElement> | undefined;
  onCopy?: ClipboardEventHandler<HTMLDivElement> | undefined;
  onPaste?: ClipboardEventHandler<HTMLDivElement> | undefined;
  onCut?: ClipboardEventHandler<HTMLDivElement> | undefined;
  onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined;
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  endIcon?: ReactNode;
  id?: any; // correct
  inputProps?: any; // correct
  autoFocus?: boolean | undefined;
  htmlFor?: any;
  ariaLabel?: any;
}

export const CellmaInputField: React.FC<Props> = (props) => {
  const [isSelected, setIsSelected] = useState(props?.selected);
  const select = props?.handleSelect ? props?.handleSelect : () => {};

  const handleSelect = () => {
    select();
    setIsSelected(!isSelected);
  };

  return (
    <Mui.Stack sx={{ width: "100%" }}>
      {props?.cancelField && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: "-10px",
            mr: "-10px",
          }}
        >
          <CancelIcon
            onClick={handleSelect}
            sx={{
              color: isSelected ? "warning.dark" : "grey.600",
              zIndex: 1000,
              "&:hover": {
                color: "warning.dark",
              },
            }}
          />
        </Box>
      )}
      <Mui.FormControl
        variant={props.variant ? props.variant : "outlined"}
        size={props.size ? props.size : "small"}
        sx={{
          borderRadius: "5px",
          backgroundColor: props?.disabled ? "grey.200" : "transparent",
        }}
      >
        <Mui.InputLabel
          id={props?.label}
          htmlFor={props?.ariaLabel ? props?.ariaLabel : props?.label}
          error={!!props?.errorText}
          required={props?.required}
          disabled={props?.disabled && !props?.value}
          sx={{
            "& .MuiInputLabel-asterisk": {
              color: "error.dark",
            },
            color: props?.disabled && props?.value && "common.black",
          }}
        >
          {props.label}
        </Mui.InputLabel>
        <Mui.OutlinedInput
          id={props?.label}
          disabled={!!props?.disabled}
          sx={{
            color: "common.black",
            fontSize: 16,
            "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
          }}
          onChange={props?.onHandleChange}
          onBlur={props?.onBlur}
          value={props?.value}
          name={props?.name}
          rows={props?.rows}
          minRows={props?.minRows}
          type={props?.type}
          error={!!props?.errorText}
          autoComplete={props?.autoComplete ? props?.autoComplete : "off"}
          autoFocus={props?.autoFocus}
          onKeyDown={props?.onKeyDown}
          defaultValue={props?.defaultValue}
          placeholder={props?.placeholder}
          multiline={props?.multiline}
          inputProps={{
            "aria-label": props.label,
            "aria-multiline": props.multiline,
            "data-testid": props?.label,
            id: props?.ariaLabel ? props?.ariaLabel : props?.label,
            maxLength: props.maxLength,
            style: props.style,
          }}
          onInput={props?.onInput}
          onCopy={props?.onCopy}
          onPaste={props?.onPaste}
          onCut={props?.onCut}
          onKeyPress={props?.onKeyPress}
          fullWidth
          endAdornment={
            <Mui.InputAdornment position="end">
              {props?.endIcon && (
                <Mui.IconButton
                  onClick={props?.handleClick}
                  edge="end"
                  aria-label="end icon"
                >
                  {props?.endIcon}
                </Mui.IconButton>
              )}
            </Mui.InputAdornment>
          }
          label={props?.label}
        />

        {props?.FormHelperText && (
          <Mui.FormHelperText
            onClick={props.onClick}
            sx={{ color: "primary.main" }}
          >
            {props?.FormHelperText}
          </Mui.FormHelperText>
        )}
      </Mui.FormControl>
      {props.errorText && (
        <Mui.Typography sx={{ fontSize: 12, color: "warning.dark" }}>
          {props?.errorText}
        </Mui.Typography>
      )}
    </Mui.Stack>
  );
};

export default CellmaInputField;
