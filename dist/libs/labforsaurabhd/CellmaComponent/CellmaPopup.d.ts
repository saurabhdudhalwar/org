import { MouseEventHandler, ReactNode } from "react";
interface Props {
    fullScreen?: any;
    title?: string;
    handleCancel?: MouseEventHandler<SVGSVGElement> | undefined;
    variant?: any;
    children?: ReactNode;
}
export declare const CellmaPopup: React.FC<Props>;
export default CellmaPopup;
