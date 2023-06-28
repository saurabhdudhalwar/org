import { MouseEventHandler, ReactNode } from "react";

import * as Mui from "@mui/material";

interface Props {
  title?: string | null;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  alt: string | undefined;
  iconPath: string | undefined;
  moduleName: ReactNode;
  tooltipLabel?: any;
}

const HomeModuleCard: React.FC<Props> = (props: any) => {
  return (
    <Mui.Tooltip
      title={props.tooltipLabel == null ? "" : props.tooltipLabel}
      placement="top"
      arrow
    >
      <Mui.Box
        sx={styles.iconBox}
        onClick={props.onClick}
        data-testid={props?.moduleName}
      >
        <Mui.Box sx={styles.icon}>
          <Mui.Avatar
            variant="rounded"
            alt={props?.alt}
            src={props?.iconPath}
          />
        </Mui.Box>
        <Mui.Typography variant="h5" sx={styles.iconCaption} align="center">
          {props.moduleName}
        </Mui.Typography>
      </Mui.Box>
    </Mui.Tooltip>
  );
};

export default HomeModuleCard;

const styles = {
  iconCaption: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    mt: "10px",
    wordWrap: "break-word",
  },
  iconBox: {
    border: 1,
    width: {
      xs: "100px",
      sm: "125px",
    },
    height: {
      xs: "100px",
      sm: "125px",
    },
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    margin: "20px",
    borderColor: "secondary.light",
    flexDirection: "column",
    "&:hover": {
      borderColor: "primary.main",
      backgroundColor: "secondary.main",
      boxShadow: 2,
    },
  },
  icon: {
    display: "flex",
    justifyContent: "center",
  },
};
