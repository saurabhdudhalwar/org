// Page Name : "addPatient"
// Page Id : "c4pat3"

import { useEffect } from "react";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  Grid,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  styled,
} from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useOutletContext } from "react-router-dom";

import AddAddress from "./AddAddress";
import AddDetails from "./AddDetails";
import AddPip from "./AddPip";
import GpList from "./GpList";
import PrintIdCard from "./PrintIdCard";
import translate from "../../assets/translationFiles/createPatientTranslation";
import { setCreatePatientActiveStep } from "../../store/PatientAction";

const CreatePatientStepper = () => {
  const { language } = useSelector((state: any) => state.language);
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    setTitle,
    setIsLink,
    setIsArrowCircleButton,
    setIsLeftOutlinedIcon,
    setScreenName,
    setCustomizableViewPath,
  } = useOutletContext() as any; // <-- access context value

  useEffect(() => {
    setTitle(translate("addPatientWizard", language));
    setIsLink(false);
    setIsArrowCircleButton(false);
    setIsLeftOutlinedIcon(false);
    if (activeStep === 0) {
      setScreenName("addDetailsCustomizable");
      setCustomizableViewPath("/cellmaUser/patient/addDetailsCustom");
    } else if (activeStep === 2) {
      setScreenName("addPipCustomizable");
      setCustomizableViewPath("/cellmaUser/patient/addPatientPipCustom");
    } else {
      setScreenName("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [][language]);

  const steps = [
    translate("addDetails", language),
    translate("addAddress", language),
    translate("addPip", language),
    translate("addGP", language),
    translate("printIdCard", language),
  ];
  const { activeStep } = useSelector((state: any) => state.patient);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          padding: { xs: "10px", sm: "20px" },
          justifyContent: "center",
          display: "block",
          justifyItems: "center",
        }}
      >
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorLibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorLibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12}>
        {activeStep === 0 && (
          <AddDetails
            duplicateCheckFormValues={location}
            handleStep={(AddDetailSteps: any) =>
              dispatch(setCreatePatientActiveStep(AddDetailSteps))
            }
            mode="addPatient"
          />
        )}
        {activeStep === 1 && (
          <AddAddress
            handleStep={(AddAddressSteps: any) =>
              dispatch(setCreatePatientActiveStep(AddAddressSteps))
            }
            mode="addPatient"
          />
        )}
        {activeStep === 2 && (
          <AddPip
            handleStep={(AddPipSteps: any) =>
              dispatch(setCreatePatientActiveStep(AddPipSteps))
            }
            mode="addPatient"
          />
        )}
        {activeStep === 3 && (
          <GpList
            handleStep={(GpListSteps: any) =>
              dispatch(setCreatePatientActiveStep(GpListSteps))
            }
            mode="addPatient"
          />
        )}
        {activeStep === 4 && <PrintIdCard mode="addPatient" />}
      </Grid>
    </Grid>
  );
};

export default CreatePatientStepper;

const ColorLibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: "20px",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "grey.500",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "grey.500",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorLibStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  return (
    <ColorLibStepIconRoot
      sx={{
        width: "40px",
        height: "40px",
      }}
      ownerState={{ completed, active }}
    >
      <PersonOutlineOutlinedIcon />
    </ColorLibStepIconRoot>
  );
};

const ColorLibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[500],
  zIndex: 1,
  color: "#fff",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#1976D2",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#2E7D32",
  }),
}));
