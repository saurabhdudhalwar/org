import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import * as Mui from "@mui/material";

const ColorlibConnector = Mui.styled(Mui.StepConnector)(({ theme }) => ({
  [`&.${Mui.stepConnectorClasses.alternativeLabel}`]: {
    top: "20px",
  },
  [`&.${Mui.stepConnectorClasses.active}`]: {
    [`& .${Mui.stepConnectorClasses.line}`]: {
      backgroundImage: "grey.500",
    },
  },
  [`&.${Mui.stepConnectorClasses.completed}`]: {
    [`& .${Mui.stepConnectorClasses.line}`]: {
      backgroundImage: "grey.500",
    },
  },
  [`& .${Mui.stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = Mui.styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: "grey.500" ? theme.palette.grey[500] : "#ccc",
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
const ColorlibStepIcon = (props: Mui.StepIconProps) => {
  const { active, completed } = props;

  return (
    <ColorlibStepIconRoot
      sx={{
        width: "40px",
        height: "40px",
      }}
      ownerState={{ completed, active }}
    >
      <PersonOutlineOutlinedIcon />
    </ColorlibStepIconRoot>
  );
};

interface Props {
  activeStep: any;
  steps: any;
}

export const CellmaStepper: React.FC<Props> = (props) => {
  return (
    <Mui.Stepper
      alternativeLabel
      activeStep={props.activeStep}
      connector={<ColorlibConnector />}
    >
      {props.steps.map((label: any) => (
        <Mui.Step key={label} data-testid={label}>
          <Mui.StepLabel StepIconComponent={ColorlibStepIcon}>
            {label}
          </Mui.StepLabel>
        </Mui.Step>
      ))}
    </Mui.Stepper>
  );
};

export default CellmaStepper;
