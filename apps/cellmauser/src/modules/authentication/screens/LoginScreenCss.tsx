const styles = {
  imageCard: {
    width: {
      sm: "100%",
    },
    height: {
      xs: "34vh",
      sm: "70vh",
    },
    backgroundColor: "grey.300",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    margin: { xs: "20px", sm: "0px" },
  },

  popupContentGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginY: "10px",
  },

  popupButtonGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginY: "20px",
  },
  popupResendButtonGrid: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: { xs: "10px" },
  },
  loginHeaderText: {
    color: "text.primary",
    fontWeight: "bold",
    typography: { xs: "h4", sm: "subtitle1" },
  },
  popupContentTypography: {
    textAlign: "center",
  },

  alert: {
    color: "common.white",
    backgroundColor: "success.dark",
  },
  imageBox: {
    width: {
      xs: "100px",
      sm: "200px",
    },
    height: {
      xs: "100px",
      sm: "200px",
    },
  },
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "15px",
    paddingX: "35px",
  },
  popupButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginX: "20px",
  },
};

export default styles;
