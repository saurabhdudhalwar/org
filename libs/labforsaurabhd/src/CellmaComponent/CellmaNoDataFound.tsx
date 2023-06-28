import { Typography } from "@mui/material";
// import { useSelector } from "react-redux";

// import translate from "../assets/translationFiles/commonTranslation";

interface Props {
  message?: any; 
  translate:any;
}

export const CellmaNoDataFound: React.FC<Props> = (props) => {
  return (
    <Typography sx={{ fontWeight: 400, color: "grey.500", margin: "10px" }}>
      {props.message
        ? props.message
        : props.translate("noPatientAvailable")}
    </Typography>
  );
};

export default CellmaNoDataFound;
