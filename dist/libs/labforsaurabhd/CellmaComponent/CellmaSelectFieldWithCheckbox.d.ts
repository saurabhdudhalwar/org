import { FocusEventHandler, MouseEventHandler, ReactEventHandler, ReactNode } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
interface Props {
    size?: any;
    variant?: any;
    label: string | undefined;
    required?: boolean | undefined;
    error?: boolean | undefined;
    id?: string | undefined;
    name?: string | undefined;
    value?: any;
    onChange?: ((event: SelectChangeEvent<any>, child: ReactNode) => void) | undefined;
    ariaLabel?: any;
    defaultValue?: any;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    disabled?: any;
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
    onSelect?: ReactEventHandler<HTMLDivElement> | undefined;
    list?: ReactNode;
    placeholder?: string;
    translate: any;
}
export declare const CellmaSelectFieldWithCheckbox: React.FC<Props>;
export default CellmaSelectFieldWithCheckbox;
