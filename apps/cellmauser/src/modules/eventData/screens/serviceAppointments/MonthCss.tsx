const styles = {
  box: {
    minHeight: "120px",
    position: "relative",
    border: 1,
    borderColor: "grey.200",
    "&:hover": {
      backgroundColor: "secondary.main",
      boxShadow: 3,
    },
  },
  linkGrid: { paddingX: "5px" },
  cellBox: {
    maxHeight: "90px",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  leaveTypography: {
    minWidth: "100px",
    fontSize: "10px",
    color: "error.main",
  },
  divider: { marginRight: "50px" },
  typography: {
    fontSize: "10px",
    minWidth: "100px",
    color: "primary.main",
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
};

export default styles;
