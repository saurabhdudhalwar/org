import { ChangeEvent, MouseEventHandler } from "react";
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
    onHandleChange?: ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined;
    defaultChecked?: boolean | undefined;
    disabled?: boolean | undefined;
    labelPlacement?: any;
    onBlur?: any;
    required?: any;
    color?: any;
}
export declare const CellmaCheckbox: React.FC<Props>;
export default CellmaCheckbox;
