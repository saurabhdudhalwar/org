import { ClipboardEventHandler, CSSProperties, FocusEventHandler, KeyboardEventHandler, SyntheticEvent } from "react";
import { AutocompleteChangeDetails, AutocompleteChangeReason } from "@mui/material";
interface Props {
    id?: any;
    label: string | undefined;
    size?: any;
    ariaLabel?: any;
    getOptionLabel?: ((option: any) => string) | undefined;
    options?: any;
    value?: any;
    maxLength?: any;
    style?: CSSProperties | undefined;
    onChange?: ((event: SyntheticEvent<Element, Event>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void) | undefined;
    onBlur?: FocusEventHandler<HTMLDivElement> | undefined;
    onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined;
    onPaste?: ClipboardEventHandler<HTMLDivElement> | undefined;
    name?: any;
    disabled?: boolean;
    required?: any;
    error?: any;
}
export declare const CellmaAutocompleteField: React.FC<Props>;
export default CellmaAutocompleteField;
