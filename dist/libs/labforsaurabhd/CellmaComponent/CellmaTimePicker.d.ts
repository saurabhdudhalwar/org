import { FocusEventHandler, KeyboardEventHandler, ReactNode } from "react";
interface Props {
    label?: ReactNode;
    value?: any;
    onChange?: any;
    inputFormat?: any;
    mask?: any;
    name?: string | undefined;
    onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined;
    error?: any;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    disabled?: boolean;
    ariaLabel?: any;
    required?: boolean | undefined;
    onClose?: any;
    zIndex?: any;
}
export declare const CellmaTimePicker: React.FC<Props>;
export default CellmaTimePicker;
