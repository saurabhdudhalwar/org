import { useEffect, useRef, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import translate from "../../../assets/translationFiles/commonTranslation";
import * as Common from "../../../common/CommonComponentsIndex";

interface Props {
  handleCancel: any;
  handleOk: any;
}
const ResetToDefaultViewPopup: React.FC<Props> = (props: any) => {
  const { language } = useSelector((state: any) => state.language);

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        title={translate("resetToDefaultView", language)}
        handleCancel={props?.handleCancel}
      >
        <Mui.Grid
          container
          spacing={2}
          xs={12}
          sx={{ display: "flex", justifyContent: "center", p: "20px" }}
        >
          <Mui.Grid item>
            <Mui.Typography variant="h3">
              {translate("resetToDefaultViewMessage", language)}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid
            item
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Mui.Grid item>
              <Common.CellmaButton
                label={translate("ok", language)}
                onClick={props?.handleOk}
              />
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default ResetToDefaultViewPopup;
