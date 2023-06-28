import { ClipboardEventHandler, KeyboardEventHandler } from "react";
interface Props {
    data?: any;
    maxLength?: any;
    textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";
    onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined;
    onPaste?: ClipboardEventHandler<HTMLDivElement> | undefined;
    setIsSaveButtonDisabled?(parameter: any): unknown;
    useDistrictSearch: any;
    translate: any;
}
export declare const CellmaDistrictSearch: React.FC<Props>;
export default CellmaDistrictSearch;
