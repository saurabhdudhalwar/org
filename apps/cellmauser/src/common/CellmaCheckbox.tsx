import { ChangeEvent, MouseEventHandler, useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import * as Mui from "@mui/material";

interface Props {
  selected?: boolean;
  handleSelect?(): unknown;
  cancelField?: boolean;
  label?: string | undefined;
  value?: unknown;
  name?: string | undefined;
  inputName?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  checked?: boolean | undefined;
  onHandleChange?:
    | ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
  defaultChecked?: boolean | undefined;
  disabled?: boolean | undefined;
  labelPlacement?: any;
  onBlur?: any; // correct
  required?: any; // correct
  color?: any;
}

const CellmaCheckbox: React.FC<Props> = (props) => {
  const [isSelected, setIsSelected] = useState(props?.selected);
  const select = props?.handleSelect ? props?.handleSelect : () => {};

  const handleSelect = () => {
    select();
    setIsSelected(!isSelected);
  };

  return (
    <Mui.FormControl fullWidth>
      {props.cancelField && (
        <Mui.Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: "-15px",
            mr: "-10px",
          }}
        >
          <CancelIcon
            aria-label="Cancel Icon"
            onClick={handleSelect}
            sx={{
              color: isSelected ? "warning.dark" : "grey.600",
              zIndex: 1000,
              "&:hover": {
                color: "warning.dark",
              },
            }}
          />
        </Mui.Box>
      )}
      <Mui.FormControlLabel
        aria-label={props.label}
        data-testid={props?.label}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: props.color ? props.color : "grey.600",
          alignItems: "center",
          m: "0px",
        }}
        value={props.value}
        name={props.name}
        control={
          <Mui.Checkbox
            sx={{
              padding: "0px",
            }}
            name={props.inputName}
            data-testid={props?.label}
            value={props.value}
            onClick={props.onClick}
            checked={props.checked}
            onChange={props.onHandleChange}
            defaultChecked={props.defaultChecked}
            disabled={props.disabled}
          />
        }
        label={props.label === "hideLabel" ? null : props.label}
        labelPlacement={props.labelPlacement ? props.labelPlacement : "start"}
      />
    </Mui.FormControl>
  );
};

export default CellmaCheckbox;
