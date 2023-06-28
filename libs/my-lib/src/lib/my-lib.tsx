import { ReactNode, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Grid, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  onClick?: any;
  type?: "button" | "submit" | "reset" | "cancel" | undefined;
  variant?: any;
  size?: any;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  disabled?: boolean | undefined;
  backgroundColor?: any;
  color?: any;
  borderRadius?: any;
  borderColor?: any;
  label: ReactNode;
  minWidth?: string; // error
  cancelField?: boolean; // recently added
  required?: any; // recently added
  selected?: any; // recently added
  handleSelect?: any; // recently added
  tooltipTitle?: any;
  onLabelClick?: any;
  testid?: any;
  height?: any;
  marginY?: any;
}

export const CellmaButton: React.FC<Props> = (props: any) => {
  const [isSelected, setIsSelected] = useState(props?.selected);

  const handleSelect = () => {
    props?.handleSelect();
    setIsSelected(!isSelected);
  };
  return (
    <Box>
      {props.cancelField && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: "-20px",
            mr: "-5px",
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
        </Box>
      )}
      <Tooltip
        title={props.tooltipTitle ? props.tooltipTitle : ""}
        arrow
        placement="top"
      >
        <Button
          onClick={props.onClick}
          type={props.type}
          variant={props.variant ? props.variant : "contained"}
          size={props.size ? props.size : "small"}
          endIcon={props.endIcon}
          startIcon={props.startIcon}
          disabled={props.disabled}
          disableElevation
          data-testid={props?.testid ? props.testid : props?.label}
          sx={{
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : "primary.main",
            color: props.color ? props.color : "common.white",
            minWidth: "80px",
            height: props.height,
            marginY: props?.marginY ? props?.marginY : "10px",
            border: 1,
            borderRadius: props.borderRadius ? props.borderRadius : "",
            borderColor: props.borderColor ? props.borderColor : "",
            "&:hover": {
              backgroundColor: props.backgroundColor
                ? props.backgroundColor
                : "primary.main",
              boxShadow: 2,
              borderColor: "primary.dark",
            },
          }}
        >
          <Grid item onClick={props.onLabelClick}>
            {props.label}
          </Grid>
        </Button>
      </Tooltip>
    </Box>
  );
};

export default CellmaButton;
