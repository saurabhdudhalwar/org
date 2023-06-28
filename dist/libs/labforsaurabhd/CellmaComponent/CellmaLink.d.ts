import React, { ReactNode } from "react";
interface Props {
    disabled?: any;
    variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined;
    onClick?: any;
    children?: ReactNode;
    href?: any;
    target?: any;
    sx?: any;
    selected?: any;
    type?: any;
    underline?: any;
    onChange?: any;
    label: any;
    fontSize?: any;
}
export declare const CellmaLink: React.FC<Props>;
export default CellmaLink;
