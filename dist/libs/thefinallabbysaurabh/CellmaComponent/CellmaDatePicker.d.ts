import { FocusEventHandler, ReactNode } from "react";
interface Props {
    label?: ReactNode;
    value?: any;
    disabled?: any;
    inputFormat?: any;
    maxDate?: any;
    minDate?: any;
    mask?: any;
    onChange?: any;
    error?: any;
    size?: any;
    name?: string | undefined;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    required?: boolean | undefined;
    maxWidth?: any;
    sx?: any;
    ariaLabel?: any;
    zIndex?: any;
}
export declare const CellmaDatePicker: React.FC<Props>;
export default CellmaDatePicker;
