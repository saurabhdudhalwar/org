import { useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { BsFillPinAngleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import CellmaDrawer from "../../../common/CellmaDrawer";
import { usePatientGP } from "../api/useGP";
import { useGetPatientExistingAddress } from "../api/usePatientAddress";
import { useGetPatientPhoto } from "../api/usePatientPhoto";
import {
  usePatientSidebarDisplay,
  usePatientSideBarInfo,
  usePatientSidebarPIP,
} from "../api/usePatientSidebar";
import Patient from "../assets/icons/Patient.png";
import translate from "../assets/translationFiles/singlePatientDrawerTranslation";
import { setIsPinSelected } from "../store/PatientAction";

interface Props {
  open: any;
}

const SinglePatientDrawer: React.FC<Props> = (props) => {
  const [isOpenPatientInfo, setIsOpenPatientInfo] = useState(false);
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [isOpenPatientInterested, setIsOpenPatientInterested] = useState(false);
  const [isOpenPatientGP, setIsOpenPatientGP] = useState(false);

  const { open } = props;
  const dispatch = useDispatch();
  const { patientId } = useSelector((state: any) => state.patient);
  const { language } = useSelector((state: any) => state.language);
  const { isPinSelected } = useSelector((state: any) => state.patient);
  const { data: photoURL } = useGetPatientPhoto(parseInt(patientId, 10));
  const { data: patientAddress } = useGetPatientExistingAddress(
    parseInt(patientId, 10)
  );
  const { data: patientInfo } = usePatientSideBarInfo(parseInt(patientId, 10));
  const { data: patientPip } = usePatientSidebarPIP(parseInt(patientId, 10));
  const { data: patientDisplay } = usePatientSidebarDisplay(
    parseInt(patientId, 10)
  );
  const { data: patientGp } = usePatientGP(parseInt(patientId, 10));

  return (
    <CellmaDrawer open={open}>
      <Grid container sx={styles.mainGrid}>
        <Grid item xs={12} sx={styles.pinIconGrid}>
          <IconButton
            aria-label="pin"
            data-testid="Single patient drawer pin"
            title="Single patient drawer pin"
            size="medium"
            sx={{ color: isPinSelected ? "primary.main" : "" }}
            onClick={() => {
              dispatch(setIsPinSelected(!isPinSelected));
            }}
          >
            <BsFillPinAngleFill />
          </IconButton>
        </Grid>

        <Grid item xs={12} sx={styles.alignCenter}>
          <Avatar
            sx={styles.avatar}
            variant="square"
            src={photoURL || Patient}
            alt=" Patient Profile Avatar"
          />
        </Grid>
        <Grid item xs={12} sx={styles.alignCenter}>
          <Typography sx={{ color: "primary.main" }}>
            {patientDisplay?.patientFullName}
          </Typography>
        </Grid>

        <List>
          <Grid
            item
            xs={12}
            sx={{ ...styles.alignCenter, flexDirection: "column" }}
          >
            <ListItemButton
              data-testid={patientDisplay?.sidebarSections[0]}
              onClick={() => setIsOpenPatientInfo(!isOpenPatientInfo)}
              selected={isOpenPatientInfo}
              sx={styles.listItemButton}
            >
              <ListItemText primary={patientDisplay?.sidebarSections[0]} />
              {isOpenPatientInfo ? (
                <ExpandLess />
              ) : (
                <ExpandMore sx={{ color: "success.dark" }} />
              )}
            </ListItemButton>
            {isOpenPatientInfo && (
              <Grid item container rowGap={1} paddingX="10px">
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("sex", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">{patientInfo?.Sex}</Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("dateOfBirth", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientInfo?.["Date of Birth"]}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("maritalStatus", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientInfo?.["Marital Status"]}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("occupation", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientInfo?.Occupation}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("religion", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">{patientInfo?.Religion}</Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("practising", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientInfo?.Practising}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("nhsRef", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  {patientInfo?.["NHS Ref"]}
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("hospitalRef", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientInfo?.["Hospital Ref"]}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("identifier", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientInfo?.Identifier}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("bloodType", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientInfo?.["Blood Type"]}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("language", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">{patientInfo?.Language}</Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("disabled", language)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">{patientInfo?.Disabled}</Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("disability", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientInfo?.Disability}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("email", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">{patientInfo?.Email}</Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ ...styles.alignCenter, flexDirection: "column" }}
          >
            <ListItemButton
              data-testid={patientDisplay?.sidebarSections[1]}
              onClick={() => setIsOpenAddress(!isOpenAddress)}
              selected={isOpenAddress}
              sx={styles.listItemButton}
            >
              <ListItemText primary={patientDisplay?.sidebarSections[1]} />
              {isOpenAddress ? (
                <ExpandLess />
              ) : (
                <ExpandMore sx={{ color: "success.dark" }} />
              )}
            </ListItemButton>
            {isOpenAddress && (
              <Grid item container rowGap={1} paddingX="10px">
                <Grid item xs={12} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("permanentAddress", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientAddress?.entity?.permanentAddress?.addAddress1}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.permanentAddress?.addAddress2}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.permanentAddress?.addAddress3}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.permanentAddress?.addAddress4}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.permanentAddress?.addAddress5}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.permanentAddress?.addAddress6}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("addressNotes", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  {patientAddress?.entity?.permanentAddress?.addNotes
                    ? patientAddress?.entity?.permanentAddress?.addNotes
                    : "-"}
                </Grid>
                <Grid item xs={12} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("temporaryAddress", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientAddress?.entity?.temporaryAddress?.addAddress1}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.temporaryAddress?.addAddress2}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.temporaryAddress?.addAddress3}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.temporaryAddress?.addAddress4}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.temporaryAddress?.addAddress5}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.temporaryAddress?.addAddress6}
                  </Typography>
                  <Typography variant="h5">
                    {patientAddress?.entity?.temporaryAddress?.addEmail}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ ...styles.alignCenter, flexDirection: "column" }}
          >
            <ListItemButton
              data-testid={patientDisplay?.sidebarSections[2]}
              onClick={() =>
                setIsOpenPatientInterested(!isOpenPatientInterested)
              }
              selected={isOpenPatientInterested}
              sx={styles.listItemButton}
            >
              <ListItemText primary={patientDisplay?.sidebarSections[2]} />
              {isOpenPatientInterested ? (
                <ExpandLess />
              ) : (
                <ExpandMore sx={{ color: "success.dark" }} />
              )}
            </ListItemButton>
            {isOpenPatientInterested && (
              <Grid item container rowGap={1} paddingX="10px">
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("interestedParties", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientPip?.patientInterestedPartiesCount}
                  </Typography>
                </Grid>
                {patientPip?.patientInterestedPartiesDetails?.map(
                  (data: any) => (
                    <>
                      <Grid item xs={6} sx={styles.gridItem}>
                        <Typography variant="h5">
                          {translate("name", language)}:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={styles.gridItem}>
                        <Typography variant="h5">
                          {data?.pipFirstname}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={styles.gridItem}>
                        <Typography variant="h5">
                          {translate("relationship", language)}:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={styles.gridItem}>
                        <Typography variant="h5">
                          {data?.pipRelationship}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={styles.gridItem}>
                        <Typography variant="h5">
                          {translate("nextOfKin", language)}:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={styles.gridItem}>
                        <Typography variant="h5">
                          {data?.pipNextOfKin === 1 ? "Yes" : "No"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sx={styles.gridItem}>
                        <Typography variant="h5">
                          {patientPip?.patientInterestedPartiesDetails.length >
                          1 ? (
                            <Divider />
                          ) : (
                            ""
                          )}
                        </Typography>
                      </Grid>
                    </>
                  )
                )}
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ ...styles.alignCenter, flexDirection: "column" }}
          >
            <ListItemButton
              data-testid={patientDisplay?.sidebarSections[3]}
              onClick={() => setIsOpenPatientGP(!isOpenPatientGP)}
              selected={isOpenPatientGP}
              sx={styles.listItemButton}
            >
              <ListItemText primary={patientDisplay?.sidebarSections[3]} />
              {isOpenPatientGP ? (
                <ExpandLess />
              ) : (
                <ExpandMore sx={{ color: "success.dark" }} />
              )}
            </ListItemButton>
            {isOpenPatientGP && (
              <Grid item container rowGap={1} paddingX="10px">
                <Grid item xs={6} sx={styles.gridItem}>
                  {/* If default Preference setting is off "Show Familyname" */}
                  {patientGp?.gpInformation?.egpFullname === "" && (
                    <Typography variant="h5">
                      {translate("name", language)}
                    </Typography>
                  )}
                  {/* If default Preference setting is on "Show Show GP full name" */}
                  {patientGp?.gpInformation?.egpFullname !== "" && (
                    <Typography variant="h5">
                      {translate("gpFullName", language)}:
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  {patientGp?.gpInformation?.egpFullname === "" && (
                    <Typography variant="h5">
                      {patientGp?.gpInformation?.egpFullname}
                    </Typography>
                  )}
                  {patientGp?.gpInformation?.egpFullname !== "" && (
                    <Typography variant="h5">
                      {patientGp?.gpInformation?.egpFullname}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("gpCode", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientGp?.gpInformation?.egpGpCode}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("practiceName", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientGp?.gpInformation?.egpPctName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("address", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientGp?.gpAddress?.addAddress2}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("postcode", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientGp?.gpAddress?.addAddress5}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {translate("telephone", language)}:
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={styles.gridItem}>
                  <Typography variant="h5">
                    {patientGp?.gpAddress?.addPhone}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </List>
      </Grid>
    </CellmaDrawer>
  );
};

export default SinglePatientDrawer;

const styles = {
  drawer: {
    "& .MuiDrawer-paper": {
      backgroundColor: "common.white",
      outline: 0,
      border: "none",
      overflowY: "auto",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  mainGrid: {
    display: "flex",
    justifyContent: "center",
    mt: "60px",
    paddingX: "5px",
  },

  pinIconGrid: { display: "flex", justifyContent: "flex-end" },
  alignCenter: { display: "flex", justifyContent: "center", my: "5px" },

  listItemButton: {
    borderRadius: "10px",
    color: "grey.900",
    "&.Mui-selected": {
      backgroundColor: "secondary.dark",
      color: "common.black",
    },
    ":hover": {
      backgroundColor: "secondary.dark",
    },
  },

  gridItem: {
    maxWidth: "100%",
    whiteSpace: "initial",
    overflowWrap: "break-word",
  },
  avatar: { height: "160px", width: "120px" },
};
