import { ClipboardEventHandler, FocusEventHandler, KeyboardEventHandler } from "react";
interface Props {
    type: string;
    size?: any;
    data?: any;
    setIsSaveButtonDisabled?(paramter: any): unknown;
    setPermanentAddressLatitude?: any;
    setPermanentAddressLongitude?: any;
    setTemporaryAddressLatitude?: any;
    setTemporaryAddressLongitude?: any;
    maxLength?: any;
    textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";
    onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
    onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined;
    onPaste?: ClipboardEventHandler<HTMLDivElement> | undefined;
    country?: any;
    translate: any;
}
export declare const CellmaPostCodeSearch: React.FC<Props>;
export default CellmaPostCodeSearch;
