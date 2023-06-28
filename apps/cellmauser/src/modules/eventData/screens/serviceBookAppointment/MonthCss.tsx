const styles = {
  cellBox: {
    minHeight: "120px",
    position: "relative",
    border: 1,
    borderColor: "grey.200",

    display: "flex",
    alignContent: "flex-start",
    "&:hover": {
      backgroundColor: "secondary.main",
      boxShadow: 3,
      cursor: "pointer",
    },
  },
  slotGrid: {
    height: "52px",
    overflowY: "hidden",
    overflowX: "hidden",
    display: "flex",
    alignContent: "flex-start",
  },
  slotTimeGrid: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "secondary.dark",
    marginY: "1px",
    padding: "1px",
  },
  headerIcon: { color: "primary.contrastText", fontSize: "18px" },
  divider: { marginRight: "50px" },
  typography: {
    fontSize: "15px",
    color: "primary.dark",
    display: "flex",
    justifyContent: "center",
  },
  link: {
    fontSize: "12px",
    color: "warning.dark",
  },
  monthBox: {
    backgroundColor: "primary.main",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    boxShadow: 15,
  },
  headerDays: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "primary.light",
    minHeight: "25px",
  },
  blockTypography: {
    fontSize: "14px",
    color: "common.black",
    display: "flex",
    justifyContent: "center",
  },
};

export default styles;
