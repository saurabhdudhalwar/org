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
    maxWidth: "40px",
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
  hpText: {
    backgroundColor: "primary.light",
    border: 1,
    borderColor: "grey.200",
  },
  mainGrid: {
    width: "100%",
    maxHeight: "400px",
    overflow: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": { width: "3px" },
    "&::-webkit-scrollbar-track": { backgroundColor: "grey.100" },
    "&::-webkit-scrollbar-thumb": { backgroundColor: "grey.400" },
  },
  unblockButtonGrid: {
    display: "flex",
    justifyContent: "flex-end",
    height: "12px",
    marginTop: "-33px",
  },
  userSlotGrid: {
    display: "flex",
    alignItems: "center",
    marginTop: "2px",
  },
};

export default styles;
