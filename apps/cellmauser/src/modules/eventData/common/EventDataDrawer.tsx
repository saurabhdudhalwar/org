import { useSelector } from "react-redux";

import CellmaDrawer from "../../../common/CellmaDrawer";

interface Props {
  open: boolean;
}

const EventDataDrawer: React.FC<Props> = () => {
  const { isDrawerOpen } = useSelector((state: any) => state.common);
  return <CellmaDrawer open={isDrawerOpen} />;
};

export default EventDataDrawer;
