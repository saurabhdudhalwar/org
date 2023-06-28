import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Common from "../../../common/CommonComponentsIndex";
import { isUndefinedOrNullOrEmpty } from "../../../utils/GeneralUtils";
import usePatientBanner from "../api/usePatientBanner";
import translate from "../assets/translationFiles/patientBannerTranslation";
import { setIsBannerOpen } from "../store/PatientAction";

interface Props {
  isBannerOpen: any; // is this correct ?
}

const PatientBanner: React.FC<Props> = (props) => {
  const { isBannerOpen, estTopbarTargetDate } = useSelector(
    (state: any) => state.patient
  );
  const { patientId } = useSelector((state: any) => state.patient);
  const { data: patientBannerInfo } = usePatientBanner(patientId, true);
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Mui.Backdrop
      open={isBannerOpen}
      sx={{ display: "flex", alignItems: "flex-start", mt: "60px" }}
    >
      <Mui.Grid
        container
        sx={{
          backgroundColor: "common.white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Mui.Grid item container xs={2.5} md={1.8}>
          <Mui.Grid item container sx={styles.topGrid}>
            <Mui.Grid item xs={12} sx={styles.titleGrid}>
              <Mui.Typography variant="h2">
                {translate("address", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid item container xs={12} sx={styles.gridContent}>
              <Mui.Grid item xs={12}>
                <Mui.Typography variant="h5" sx={{ wordWrap: "break-word" }}>
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.patTitle
                  )
                    ? `${patientBannerInfo?.entity?.patientBannerJson?.patTitle}\u00A0`
                    : ""}
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.patFirstname
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.patFirstname
                    : ""}
                  &nbsp;
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.patMiddlename
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson
                        ?.patMiddlename
                    : ""}
                  &nbsp;
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.patSurname
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.patSurname
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.Typography variant="h5">Permanent Address</Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addAddress1
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addAddress1
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addAddress2
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addAddress2
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addAddress3
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addAddress3
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addAddress4
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addAddress4
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addAddress5
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addAddress5
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={12}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addAddress6
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addAddress6
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.linkGrid}>
            <Common.CellmaLink
              label={translate("viewAllAddresses", language)}
              variant="h5"
              onClick={async () => {
                await dispatch(setIsBannerOpen(false));
                navigate("/cellmaUser/patient/demographics");
              }}
            >
              {translate("viewAllAddresses", language)}
            </Common.CellmaLink>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Divider orientation="vertical" flexItem />

        <Mui.Grid item container xs={4.4} md={1.9}>
          <Mui.Grid item container sx={styles.topGrid}>
            <Mui.Grid item xs={12} sx={styles.titleGrid}>
              <Mui.Typography variant="h2">
                {translate("contactDetails", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid container item xs={12} sx={styles.gridContent}>
              <Mui.Grid item xs={4}>
                <Mui.Typography variant="h5">
                  {translate("phone", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={8}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addPhone
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addPhone
                    : "Not Recorded"}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={4}>
                <Mui.Typography variant="h5">
                  {translate("work", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={8}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addWorkPhone
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addWorkPhone
                    : "Not Recorded"}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={4}>
                <Mui.Typography variant="h5">
                  {translate("mobile", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={8}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addMobile
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addMobile
                    : "Not Recorded"}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={4}>
                <Mui.Typography variant="h5">
                  {translate("email", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={8}>
                <Mui.Typography variant="h5" sx={{ wordWrap: "break-word" }}>
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.addEmail
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.addEmail
                    : "Not Recorded"}
                </Mui.Typography>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.linkGrid}>
            <Common.CellmaLink
              label={translate("viewAllContactDetails", language)}
              variant="h5"
              onClick={() => {
                dispatch(setIsBannerOpen(false));
                navigate("/cellmaUser/patient/demographics");
              }}
            >
              {translate("viewAllContactDetails", language)}
            </Common.CellmaLink>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Divider orientation="vertical" flexItem />

        <Mui.Grid item container xs={5} md={2}>
          <Mui.Grid item container sx={styles.topGrid}>
            <Mui.Grid item xs={12} sx={styles.titleGrid}>
              <Mui.Typography variant="h2">
                {translate("admissionDetails", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              item
              container
              columnSpacing={2}
              xs={12}
              sx={styles.gridContent}
            >
              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {translate("previousAdmission", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity.patientBannerJson
                      ?.previousAdmissions
                  )
                    ? patientBannerInfo?.entity.patientBannerJson
                        ?.previousAdmissions
                    : "0"}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {translate("admissionTime", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.admissionTime
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson
                        ?.admissionTime
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {translate("admissionDate", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.admissionDate
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson
                        ?.admissionDate
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {translate("patientType", language)}
                </Mui.Typography>
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.patType
                  )
                    ? patientBannerInfo?.entity?.patientBannerJson?.patType
                    : ""}
                </Mui.Typography>
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Divider orientation="vertical" flexItem />

        <Mui.Grid item container xs={2.5} md={2.2}>
          <Mui.Grid item container sx={styles.topGrid}>
            <Mui.Grid item xs={12} sx={styles.titleGrid}>
              <Mui.Typography variant="h2">
                {translate("patientIdentifiers", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid container xs={12} sx={styles.gridContent}>
              {!isUndefinedOrNullOrEmpty(
                patientBannerInfo?.entity?.patientBannerJson?.patMpiNumber
              ) && (
                <>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {translate("mpiNumber", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography
                      variant="h5"
                      sx={{ wordWrap: "break-word" }}
                    >
                      {
                        patientBannerInfo?.entity.patientBannerJson
                          ?.patMpiNumber
                      }
                    </Mui.Typography>
                  </Mui.Grid>
                </>
              )}
              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {translate("barcode", language)}
                </Mui.Typography>
              </Mui.Grid>

              <Mui.Grid item xs={6}>
                <Mui.Typography variant="h5">
                  {props.isBannerOpen
                    ? patientBannerInfo?.entity?.patientBannerJson?.patBarcode
                    : patientBannerInfo?.entity?.patientBannerJson?.patId
                    ? patientBannerInfo?.entity?.patientBannerJson?.patId + 1000
                    : null}
                </Mui.Typography>
              </Mui.Grid>

              {!isUndefinedOrNullOrEmpty(
                patientBannerInfo?.entity?.patientBannerJson?.patNhsRef
              ) && (
                <>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {translate("nhsRef", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {patientBannerInfo?.entity?.patientBannerJson?.patNhsRef}
                    </Mui.Typography>
                  </Mui.Grid>
                </>
              )}
              {!isUndefinedOrNullOrEmpty(
                patientBannerInfo?.entity?.patientBannerJson?.patIdentifier
              ) && (
                <>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {translate("identifier", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {
                        patientBannerInfo?.entity.patientBannerJson
                          ?.patIdentifier
                      }
                    </Mui.Typography>
                  </Mui.Grid>
                </>
              )}
              {!isUndefinedOrNullOrEmpty(
                patientBannerInfo?.entity?.patientBannerJson?.patHospitalRef
              ) && (
                <>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {translate("hospitalRef", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {
                        patientBannerInfo?.entity.patientBannerJson
                          ?.patHospitalRef
                      }
                    </Mui.Typography>
                  </Mui.Grid>
                </>
              )}
              {!isUndefinedOrNullOrEmpty(
                patientBannerInfo?.entity?.patientBannerJson?.consultantFullname
              ) && (
                <>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {translate("consultantFullName", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {
                        patientBannerInfo?.entity.patientBannerJson
                          ?.consultantFullname
                      }
                    </Mui.Typography>
                  </Mui.Grid>
                </>
              )}
              {!isUndefinedOrNullOrEmpty(
                patientBannerInfo?.entity?.patientBannerJson?.gpFullname
              ) && (
                <>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {translate("gp", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid item xs={6}>
                    <Mui.Typography variant="h5">
                      {patientBannerInfo?.entity?.patientBannerJson?.gpFullname}
                    </Mui.Typography>
                  </Mui.Grid>
                </>
              )}
            </Mui.Grid>
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.linkGrid}>
            <Common.CellmaLink
              label={translate("viewAllDetails", language)}
              variant="h5"
              onClick={() => {
                dispatch(setIsBannerOpen(false));
                navigate("/cellmaUser/patient/demographics");
              }}
            >
              {translate("viewAllDetails", language)}
            </Common.CellmaLink>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Divider orientation="vertical" flexItem />

        {isUndefinedOrNullOrEmpty(
          patientBannerInfo?.entity?.patientBannerJson?.pregnancyEndDate
        ) ? (
          <>
            <Mui.Grid item container xs={4.4} md={2.2}>
              <Mui.Grid item container sx={styles.topGrid}>
                <Mui.Grid item xs={12} sx={styles.titleGrid}>
                  {estTopbarTargetDate === 1 ? (
                    <Mui.Typography variant="h2">
                      {translate("tdi", language)}
                    </Mui.Typography>
                  ) : (
                    <Mui.Typography variant="h2">
                      {translate("tid", language)}
                    </Mui.Typography>
                  )}
                </Mui.Grid>
                <Mui.Grid
                  item
                  container
                  xs={12}
                  sx={{
                    ...styles.gridContent,
                    overflowY: "scroll",
                    height: "200px",
                    position: "relative",
                  }}
                >
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity.patientBannerJson
                      ?.cttNoOfDaysLeftThirdTarget
                  ) &&
                    estTopbarTargetDate === 1 && (
                      <>
                        <Mui.Grid item xs={6}>
                          <Mui.Typography variant="h5">
                            {translate("noOfDaysLeftThirdTarget", language)}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <Mui.Typography variant="h5">
                            {
                              patientBannerInfo?.entity.patientBannerJson
                                ?.cttNoOfDaysLeftThirdTarget
                            }
                          </Mui.Typography>
                        </Mui.Grid>
                      </>
                    )}
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity.patientBannerJson
                      ?.cttNoOfDaysLeftFourthTarget
                  ) &&
                    estTopbarTargetDate === 1 && (
                      <>
                        <Mui.Grid item xs={6}>
                          <Mui.Typography variant="h5">
                            {translate("noOfDaysLeftFourthTarget", language)}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <Mui.Typography variant="h5">
                            {
                              patientBannerInfo?.entity.patientBannerJson
                                ?.cttNoOfDaysLeftFourthTarget
                            }
                          </Mui.Typography>
                        </Mui.Grid>
                      </>
                    )}
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity.patientBannerJson
                      .physicalSignsDetails
                  )
                    ? Object.entries(
                        patientBannerInfo?.entity.patientBannerJson
                          .physicalSignsDetails
                      ).map(([key, value]: [key: string, value: any]) => (
                        <Mui.Grid item container xs={12}>
                          <Mui.Grid item container xs={6}>
                            <Mui.Typography key={key} variant="h5">
                              {key}
                            </Mui.Typography>
                          </Mui.Grid>
                          <Mui.Grid item container xs={6}>
                            <Mui.Typography key={key} variant="h5">
                              {!isUndefinedOrNullOrEmpty(value) ? value : ""}
                            </Mui.Typography>
                          </Mui.Grid>
                        </Mui.Grid>
                      ))
                    : ""}
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.clinicDate
                  ) && (
                    <>
                      <Mui.Grid item xs={6}>
                        <Mui.Typography variant="h5">
                          {translate("clinicDate", language)}
                        </Mui.Typography>
                      </Mui.Grid>
                      <Mui.Grid item xs={6}>
                        <Mui.Typography variant="h5">
                          {
                            patientBannerInfo?.entity.patientBannerJson
                              ?.clinicDate
                          }
                        </Mui.Typography>
                      </Mui.Grid>
                    </>
                  )}
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Grid>
            <Mui.Divider orientation="vertical" flexItem />
          </>
        ) : (
          <>
            <Mui.Grid item container xs={5} md={2}>
              <Mui.Grid item container sx={styles.topGrid}>
                <Mui.Grid item xs={12} sx={styles.titleGrid}>
                  <Mui.Typography variant="h2">
                    {translate("pregnancyEdd", language)}
                    {!isUndefinedOrNullOrEmpty(
                      patientBannerInfo?.entity.patientBannerJson
                        ?.pregnancyEndDate
                    )
                      ? patientBannerInfo?.entity.patientBannerJson
                          ?.pregnancyEndDate
                      : ""}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid
                  item
                  container
                  columnSpacing={2}
                  xs={12}
                  sx={styles.gridContent}
                >
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.pregnancyWeek
                  ) && (
                    <>
                      <Mui.Grid item xs={6}>
                        <Mui.Typography variant="h5">
                          {translate("pregnancyWeek", language)}
                        </Mui.Typography>
                      </Mui.Grid>
                      <Mui.Grid item xs={6}>
                        <Mui.Typography variant="h5">
                          {
                            patientBannerInfo?.entity.patientBannerJson
                              ?.pregnancyWeek
                          }
                        </Mui.Typography>
                      </Mui.Grid>
                    </>
                  )}
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.daysLeft
                  ) && (
                    <>
                      <Mui.Grid item xs={6}>
                        <Mui.Typography variant="h5">
                          {translate("daysLeft", language)}
                        </Mui.Typography>
                      </Mui.Grid>
                      <Mui.Grid item xs={6}>
                        <Mui.Typography variant="h5">
                          {
                            patientBannerInfo?.entity.patientBannerJson
                              ?.daysLeft
                          }
                        </Mui.Typography>
                      </Mui.Grid>
                    </>
                  )}
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity.patientBannerJson
                      .physicalSignsDetails
                  )
                    ? Object.entries(
                        patientBannerInfo?.entity.patientBannerJson
                          .physicalSignsDetails
                      ).map(([key, value]: [key: string, value: any]) => (
                        <Mui.Grid item container xs={12}>
                          <Mui.Grid item container xs={6}>
                            <Mui.Typography key={key} variant="h5">
                              {key}
                            </Mui.Typography>
                          </Mui.Grid>
                          <Mui.Grid item container xs={6}>
                            <Mui.Typography key={key} variant="h5">
                              {!isUndefinedOrNullOrEmpty(value) ? value : ""}
                            </Mui.Typography>
                          </Mui.Grid>
                        </Mui.Grid>
                      ))
                    : ""}
                  {!isUndefinedOrNullOrEmpty(
                    patientBannerInfo?.entity?.patientBannerJson?.clinicDate
                  ) && (
                    <>
                      <Mui.Grid item xs={6}>
                        <Mui.Typography variant="h5">
                          {translate("clinicDate", language)}
                        </Mui.Typography>
                      </Mui.Grid>
                      <Mui.Grid item xs={6}>
                        <Mui.Typography variant="h5">
                          {
                            patientBannerInfo?.entity.patientBannerJson
                              ?.clinicDate
                          }
                        </Mui.Typography>
                      </Mui.Grid>
                    </>
                  )}
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Grid>
            <Mui.Divider orientation="vertical" flexItem />
          </>
        )}

        <Mui.Grid item container xs={5} md={1.8}>
          <Mui.Grid item xs={12} sx={styles.titleGrid}>
            <Mui.Typography variant="h2">
              {translate("allergies", language)}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid
            item
            container
            sx={{
              ...styles.topGrid,
              overflowY: "scroll",
              height: "150px",
              position: "relative",
            }}
          >
            {patientBannerInfo?.entity.patientAllergies?.map(
              (item: string, index: number) => (
                <Mui.Grid key={index} item xs={12} sx={{ display: "flex" }}>
                  <Mui.Typography variant="h5" sx={{ color: "error.main" }}>
                    {item}
                  </Mui.Typography>
                </Mui.Grid>
              )
            )}
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.linkGrid}>
            <Common.CellmaLink
              variant="h5"
              label={translate("viewAllAllergies", language)}
            >
              {translate("viewAllAllergies", language)}
            </Common.CellmaLink>
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Backdrop>
  );
};

export default PatientBanner;

const styles = {
  titleGrid: {
    backgroundColor: "secondary.dark",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
  },
  gridContent: { display: "flex", padding: "10px" },
  topGrid: { display: "flex", alignSelf: "flex-start" },
  linkGrid: { display: "flex", alignItems: "flex-end", padding: "10px" },
};
