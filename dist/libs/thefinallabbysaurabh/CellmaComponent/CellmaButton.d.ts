import { ReactNode } from "react";
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
    minWidth?: string;
    cancelField?: boolean;
    required?: any;
    selected?: any;
    handleSelect?: any;
    tooltipTitle?: any;
    onLabelClick?: any;
    testid?: any;
    height?: any;
    marginY?: any;
}
export declare const CellmaButton: React.FC<Props>;
export default CellmaButton;
