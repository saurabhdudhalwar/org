import * as Mui from "@mui/material";

const ViewReferralDocuments = () => {
  return (
    <Mui.Grid container sx={styles.popupGridContainer}>
      <Mui.Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        Under Construction
      </Mui.Grid>
      <Mui.Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        (User will see document here)
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default ViewReferralDocuments;

export const styles = {
  popupGridContainer: {
    justifyContent: "center",
    justifyItems: "center",
    paddingY: "10px",
    paddingX: "35px",
  },
};
