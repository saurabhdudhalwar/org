const styles = {
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
  hpText: {
    fontSize: "10px",
    color: "primary.main",
    width: "110px",
  },
  hpHeaderGrid: { maxWidth: "100%", display: "flex", flexDirection: "row" },
  headerIcon: { color: "primary.contrastText", fontSize: "18px" },
  mainGrid: {
    width: "100%",
    maxHeight: "400px",
    overflow: "auto",
    minHeight: "30px",
  },
  headerDays: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "primary.light",
    minHeight: "25px",
  },
  slotButtonGrid: {
    display: "flex",
    justifyContent: "center",
    marginY: "-8px",
  },
  slotsTextGrid: {
    color: "common.white",
    backgroundColor: "primary.main",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "24px",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100px",
  },
  slotsGridIem: {
    border: 1,
    borderColor: "grey.200",
    maxHeight: "150px",
    overflowY: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "grey.100",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey.400",
    },
  },
};

export default styles;
