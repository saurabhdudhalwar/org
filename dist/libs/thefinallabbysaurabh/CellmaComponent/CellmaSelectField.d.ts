import { FocusEventHandler, MouseEventHandler, ReactEventHandler } from "react";
interface Props {
    size?: any;
    variant?: any;
    label?: string | undefined;
    required?: boolean | undefined;
    error?: any;
    id?: string | undefined;
    name?: string | undefined;
    ariaLabel?: any;
    value?: any;
    changeevent?: any;
    defaultValue?: any;
    blurevent?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    disabled?: any;
    clickevent?: MouseEventHandler<HTMLDivElement> | undefined;
    onSelect?: ReactEventHandler<HTMLDivElement> | undefined;
    list?: any;
    options?: any;
    onBlur?: any;
    maxLength?: any;
}
export declare const CellmaSelectField: React.FC<Props>;
export default CellmaSelectField;
