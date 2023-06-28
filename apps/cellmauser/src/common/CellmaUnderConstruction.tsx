import { useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CellmaButton from "./CellmaButton";
import * as Common from "./CommonComponentsIndex";
import UnderConstruction from "../assets/images/UnderConstruction.png";
import translate from "../assets/translationFiles/commonTranslation";
import { setIsUnderConstruction } from "../store/CommonAction";

const CellmaUnderConstruction = () => {
  const [loadingImage, setLoadingImage] = useState(true);
  const { language } = useSelector((state: any) => state.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showLoader = () => {
    return <Mui.CircularProgress />;
  };

  return (
    <Common.CellmaPopup
      title={translate("underConstruction", language)}
      fullScreen
      handleCancel={() => {
        dispatch(setIsUnderConstruction(false));
      }}
    >
      <Mui.Grid container item spacing={3} sx={{ p: "20px" }}>
        <Mui.Grid xs={12} item sx={styles.alignCenter}>
          <Mui.Typography variant="subtitle1">
            {translate("pageUnderConstructionMessage", language)}
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
              label={translate("goToHome", language)}
              onClick={() => {
                navigate("/cellmaUser/home");
                dispatch(setIsUnderConstruction(false));
              }}
            />
          </Mui.Grid>
          <Mui.Grid item>
            <CellmaButton
              label={translate("cancel", language)}
              onClick={() => {
                dispatch(setIsUnderConstruction(false));
              }}
            />
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
    </Common.CellmaPopup>
  );
};

export default CellmaUnderConstruction;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
  },
};
