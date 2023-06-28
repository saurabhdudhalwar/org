import { useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import translate from "../../../assets/translationFiles/commonTranslation";
import * as Common from "../../../common/CommonComponentsIndex";
import { useDeselectPatient } from "../../authentication/api/useDeselectPatient";
import {
  setIsContactTypeSelected,
  setIsPatientSelected,
} from "../store/PatientAction";

interface Props {
  handleClose(): unknown;
}

const ExitPatientPopup: React.FC<Props> = (props: any) => {
  const { language } = useSelector((state: any) => state.language);
  const { patientId, sgrId } = useSelector((state: any) => state.patient);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCloseContact, setIsCloseContact] = useState(false);

  // API call deselect patient
  const { refetch: deselectPatient } = useDeselectPatient(
    parseInt(patientId, 10),
    sgrId,
    isCloseContact
  );

  return (
    <Mui.Box>
      <Mui.Backdrop open>
        <Common.CellmaPopup
          title={translate("exit", language)}
          handleCancel={() => {
            props.handleClose();
          }}
        >
          <Mui.Grid container spacing={3} sx={styles.popupGridContainer}>
            <Mui.Grid item xs={12}>
              <Mui.Typography
                variant="h4"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {translate("closeContact", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "right" }}
              gap={2}
            >
              <Common.CellmaButton
                label={translate("yes", language)}
                onClick={() => {
                  dispatch(setIsPatientSelected(false));
                  dispatch(setIsContactTypeSelected(false));
                  setIsCloseContact(true);
                  deselectPatient();
                  navigate("/cellmaUser/home");
                  props.handleClose();
                }}
              />
              <Common.CellmaButton
                label={translate("no", language)}
                onClick={() => {
                  dispatch(setIsPatientSelected(false));
                  dispatch(setIsContactTypeSelected(false));
                  setIsCloseContact(false);
                  deselectPatient();
                  navigate("/cellmaUser/home");
                  props.handleClose();
                }}
              />
            </Mui.Grid>
          </Mui.Grid>
        </Common.CellmaPopup>
      </Mui.Backdrop>
    </Mui.Box>
  );
};

export default ExitPatientPopup;

const styles = {
  popupGridContainer: {
    justifyContent: "left",
    justifyItems: "left",
    paddingY: "15px",
    paddingX: "35px",
  },
};
