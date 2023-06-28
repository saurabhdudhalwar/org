import { MouseEventHandler, ReactNode } from "react";

import * as Mui from "@mui/material";

interface Props {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  title: NonNullable<ReactNode>;
  alt: string | undefined;
  iconPath: string | undefined;
  moduleName: ReactNode;
}

const ContactTypeScreenCard: React.FC<Props> = (props: any) => {
  return (
    <Mui.Box sx={{ padding: "30px" }} onClick={props.onClick}>
      <Mui.Tooltip title={props.title} placement="top" arrow>
        <Mui.Box sx={styles.icon}>
          <Mui.Avatar
            sx={styles.iconBox}
            variant="rounded"
            alt={props?.alt}
            src={props?.iconPath}
          />
        </Mui.Box>
      </Mui.Tooltip>
      <Mui.Typography sx={styles.iconCaption} noWrap>
        {props.moduleName}
      </Mui.Typography>
    </Mui.Box>
  );
};

export default ContactTypeScreenCard;

const styles = {
  iconCaption: {
    display: "flex",
    justifyContent: "center",
    mt: "10px",
    typography: {
      xs: "h6",
      sm: "h3",
    },
  },
  iconBox: {
    padding: "10px",
    width: {
      xs: "70px",
      sm: "60px",
    },
    minHeight: {
      xs: "70px",
      sm: "60px",
    },
    border: 1,
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    margin: "20px",
    borderColor: "secondary.light",
    flexDirection: "column",
    "&:hover": {
      border: 1,
      borderColor: "primary.main",

      boxShadow: 2,
    },
  },
  icon: {
    display: "flex",
    justifyContent: "center",
  },
};
