import React, { ReactNode } from "react";

import * as Mui from "@mui/material";

interface Props {
  disabled?: any;
  variant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | undefined;
  onClick?: any;
  children?: ReactNode;
  href?: any; // correct ?
  target?: any; // correct ?
  sx?: any; // correct
  selected?: any;
  type?: any;
  underline?: any;
  onChange?: any;
  label: any;
  fontSize?: any;
}

export const CellmaLink: React.FC<Props> = (props) => {
  return (
    <Mui.Link
      type={props?.type}
      data-testid={props?.label}
      variant={props?.variant}
      underline={props.underline ? props.underline : "hover"}
      sx={{
        color: props?.disabled
          ? "grey.500"
          : props.selected
          ? "success.light"
          : "primary.dark",
        cursor: "pointer",
        fontSize: props?.fontSize ? props?.fontSize : "16px",
      }}
      onClick={props?.disabled ? null : props?.onClick}
      onChange={props?.onChange}
    >
      {props.children}
    </Mui.Link>
  );
};

export default CellmaLink;
