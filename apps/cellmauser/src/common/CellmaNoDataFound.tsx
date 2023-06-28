import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

import translate from "../assets/translationFiles/commonTranslation";

interface Props {
  message?: any;
}

const CellmaNoDataFound: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);

  return (
    <Typography sx={{ fontWeight: 400, color: "grey.500", margin: "10px" }}>
      {props.message
        ? props.message
        : translate("noPatientAvailable", language)}
    </Typography>
  );
};

export default CellmaNoDataFound;
