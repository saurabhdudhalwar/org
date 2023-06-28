import { useState } from "react";

import * as Mui from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import CellmaButton from "./CellmaButton";
import CellmaPopup from "./CellmaPopup";
import UnderConstruction from "../Assets/UnderConstruction.png";
// import translate from "../assets/translationFiles/commonTranslation";
// import { setIsUnderConstruction } from "../store/CommonAction";

interface Props {
  isUnderConstruction: any;
  navigate: any;
  dispatch: any;
  translate: any;
  setIsUnderConstruction: any;
}

export const CellmaUnderConstruction: React.FC<Props> = (props) => {
  const [loadingImage, setLoadingImage] = useState(true);
  // const { isUnderConstruction } = useSelector((state: any) => state.common);
  // const { language } = useSelector((state: any) => state.language);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const showLoader = () => {
    return <Mui.CircularProgress />;
  };

  return (
    <Mui.Backdrop open={props.isUnderConstruction}>
      <CellmaPopup
        title={props.translate("underConstruction")}
        fullScreen
        handleCancel={() => {
          props.dispatch(props.setIsUnderConstruction(false));
        }}
      >
        <Mui.Grid container item spacing={3} sx={{ p: "20px" }}>
          <Mui.Grid xs={12} item sx={styles.alignCenter}>
            <Mui.Typography variant="subtitle1">
              {props.translate("pageUnderConstructionMessage")}
            </Mui.Typography>
          </Mui.Grid>
          {loadingImage && (
            <Mui.Grid xs={12} item sx={styles.alignCenter}>
              {showLoader()}
            </Mui.Grid>
          )}
          <Mui.Grid xs={12} item sx={styles.alignCenter}>
            <Mui.Box
              component="img"
              sx={{ borderRadius: "20px", maxHeight: "250px" }}
              alt="Under Construction."
              src={UnderConstruction}
              onLoad={() => setLoadingImage(false)}
            />
          </Mui.Grid>
          <Mui.Grid xs={12} container spacing={2} item sx={styles.alignCenter}>
            <Mui.Grid item>
              <CellmaButton
                label={props.translate("goToHome")}
                onClick={() => {
                  props.navigate("/cellmaUser/home");
                  props.dispatch(props.setIsUnderConstruction(false));
                }}
              />
            </Mui.Grid>
            <Mui.Grid item>
              <CellmaButton
                label={props.translate("cancel")}
                onClick={() => {
                  props.dispatch(props.setIsUnderConstruction(false));
                }}
              />
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Grid>
      </CellmaPopup>
    </Mui.Backdrop>
  );
};

export default CellmaUnderConstruction;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
  },
};
