const styles = {
  hourBox: {
    minHeight: "25px",
    display: "flex",
    minWidth: "100%",
  },

  cellBox: {
    border: 1,
    borderColor: "grey.200",
    "&:hover": {
      border: 1,
      borderColor: "grey.400",
      boxShadow: 5,
    },
  },
  timeGrid: {
    paddingX: "5px",
    border: 1,
    borderColor: "grey.200",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  timeTypography: {
    minHeight: "25px",
    display: "flex",
    alignItems: "center",
    color: "grey.500",
  },
  dayHeader: {
    backgroundColor: "primary.main",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dayHeaderText: {
    display: "flex",
    justifyContent: "center",
    color: "primary.contrastText",
  },
  headerIcon: { color: "primary.contrastText", fontSize: "18px" },
  mainGrid: {
    width: "100%",
    maxHeight: "400px",
    overflow: "auto",
    minHeight: "100px",
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
