import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { common } from "@mui/material/colors";
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HpTotalAppointmentCount from "./HpTotalAppointmentCount";
import CellmaCalendarPicker from "../../../../common/CellmaCalendarPicker";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isUndefinedOrNullOrEmpty } from "../../../../utils/GeneralUtils";
import { setSelectedDate } from "../../../user/store/HpDiaryAction";
import {
  useGetClinicLocation,
  useGetClinicType,
  useGetRoomsList,
} from "../../api/useAppointment";
import {
  useGetTeamList,
  useHealthProfessionalList,
  useSidebarAppointmentCount,
  useSidebarAppointmentDetails,
  useSidebarSpecialtyList,
} from "../../api/useServiceAppointmentSidebar";
import t from "../../assets/translationFiles/commonEventDataTranslation";
import {
  setIsEnableBlockingMode,
  setIsNextAvailableAppointment,
} from "../../store/EventDataAction";

const SelectDateAndHp = () => {
  const [isHpSearched, setIsHpSearched] = useState(false);
  const [slotBooked, setSlotBooked] = useState();
  const [isShowHpAppointment, setIsShowHpAppointment] = useState(false);
  const [selectedHp, setSelectedHp] = useState("");
  const [specialtyEliId, setSpecialtyEliId] = useState<any>();
  const [clinicTypeEliId, setClinicTypeEliId] = useState<any>();
  const [serviceLocationId, setServiceLocationId] = useState<any>();
  const [serviceLocationName, setServiceLocationName] = useState<any>();
  const [espId, setEspId] = useState<any>();
  const [formData, setFormData] = useState<any>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patientId } = useSelector((state: any) => state.patient);
  const { selectedDate } = useSelector((state: any) => state?.HpDiary);
  const {
    isUseSpecialtyAndRegionSetting,
    isEnableBlockingMode,
    isNextAvailableAppointment,
    activeScreenName,
  } = useSelector((state: any) => state.eventDataReducer);
  const { userRoles, cliID } = useSelector((element: any) => element.auth);
  const [serviceCliId, setServiceCliId] = useState<number>();

  // Included All Specialties option for Specialty dropdown
  const allSpecialty = {
    ctlSpecialityEliId: 0,
    ctlSpecialityEliText: "All Specialties",
  };

  // Included All Teams option for Team dropdown
  const allTeams = { ctlRegionEliId: 0, ctlRegionEliText: "All Teams" };

  // API call for get specialty list
  const { specialtyList } = useSidebarSpecialtyList(serviceCliId ?? cliID);

  useEffect(() => {
    if (specialtyList?.length !== 0) {
      specialtyList.unshift(allSpecialty);
      specialtyList.forEach((element: any) => {
        if (
          !specialtyList?.find(
            (item: any) =>
              item.ctlSpecialityEliId === element.ctlSpecialityEliId
          )
        ) {
          specialtyList?.push(element);
        }
      });
    }
  }, [specialtyList]);

  // API call for get clinic type
  const { clinicType, refetch: getClinicTypeRefetch } =
    useGetClinicType(specialtyEliId);

  // API call for get clinic location
  const { clinicLocation, refetch: getClinicLocationRefetch } =
    useGetClinicLocation(clinicTypeEliId);

  // API call for get team
  const { clinicTypesLocationList, refetch: getTeamRefetch } = useGetTeamList({
    clinicTypeEliId,
    serviceLocationId,
    specialityEliId: specialtyEliId || 0,
  });

  useEffect(() => {
    if (clinicTypesLocationList?.length !== 0) {
      clinicTypesLocationList.unshift(allTeams);
      clinicTypesLocationList.forEach((element: any) => {
        if (
          !clinicTypesLocationList?.find(
            (item: any) => item.ctlRegionEliId === element.ctlRegionEliId
          )
        ) {
          clinicTypesLocationList?.push(element);
        }
      });
    }
  }, [clinicTypesLocationList]);

  // API call for get health professionals
  const { healthProfessionalList, refetch: getHealthProfessionalRefetch } =
    useHealthProfessionalList({
      speciality: formData?.specialty?.ctlSpecialityEliId ?? 0,
      clinicType: formData?.clinicType?.ctlClinicTypeId,
      team: formData?.team?.ctlRegionEliId ?? 0,
      serviceLocation: formData?.clinicLocation?.ctlClinicLocationId,
    });

  // API call for get available rooms list
  const {
    refetch: getappointmentRoomListDetails,
    data: appointmentRoomListResponse,
  } = useGetRoomsList({
    arsSpecialityEliId: formData?.specialty?.ctlSpecialityEliId,
    arsClinicTypeId: formData?.clinicType?.ctlClinicTypeId,
    arsClinicLocationId: formData?.clinicLocation?.ctlClinicLocationId,
    arsRegionEliId: formData?.team?.ctlRegionEliId ?? 0,
  });

  const appointmentRoomList =
    appointmentRoomListResponse?.appointmentRoomList ?? [];

  // API call for get appointment count
  const { appointmentCount, refetch: getSidebarAppointmentCountRefetch } =
    useSidebarAppointmentCount({
      espId,
      clinicLocationEliId: formData?.clinicLocation?.ctlClinicLocationId,
      date: moment(selectedDate).format("DD/MM/YYYY"),
    });

  // API call for get appointment sidebar details
  const {
    appointmentDetails,
    settings,
    refetch: getSidebarAppointmentDetails,
  } = useSidebarAppointmentDetails(patientId || "");

  useEffect(() => {
    getSidebarAppointmentDetails();
    dispatch(
      setIsNextAvailableAppointment(settings?.cliNextAvailableAppHide === 0)
    );
  }, [appointmentDetails, isUseSpecialtyAndRegionSetting]);

  // handler for Select Hp
  const handlerServiceBookAppointment = () => {
    setIsHpSearched(true);
    navigate("/cellmaUser/eventData/serviceBookAppointment", {
      state: {
        hpDetails: {
          espName: "",
          clinicLocationEliText: "",
        },
      },
    });
  };

  // handler for book an appointment
  const handlerShowHp = (hpId: string, hpName: string) => {
    setIsShowHpAppointment(true);
    setSelectedHp(hpName);
    navigate("/cellmaUser/eventData/serviceBookAppointment", {
      state: {
        hpDetails: {
          espId: hpId ?? "",
          espName: hpName ?? "",
          clinicTypeEliId: formData?.clinicType?.ctlClinicTypeId ?? "",
          clinicTypeLocationEliId:
            formData?.clinicLocation?.ctlClinicLocationId ?? "",
          durationModifier: 1,
          clinicLocationEliText:
            formData?.clinicLocation?.ctlClinicLocationText ?? "",
          clinicTypeEliText: formData?.clinicType?.ctlClinicTypeText ?? "",
        },
      },
    });
  };

  useEffect(() => {
    getClinicLocationRefetch();
    getClinicTypeRefetch();
    if (
      clinicTypeEliId !== undefined &&
      !isUndefinedOrNullOrEmpty(serviceLocationId)
    )
      getTeamRefetch();
  }, [clinicTypeEliId, specialtyEliId, serviceLocationId]);

  useEffect(() => {
    if (formData !== "") getappointmentRoomListDetails();
    if (formData !== "") getHealthProfessionalRefetch();
    if (
      !isUndefinedOrNullOrEmpty(espId) &&
      !isUndefinedOrNullOrEmpty(
        formData?.clinicLocation?.ctlClinicLocationId
      ) &&
      !isUndefinedOrNullOrEmpty(selectedDate)
    ) {
      getSidebarAppointmentCountRefetch();
    }
  }, [formData, espId, selectedDate]);

  const handleDisable = () => {
    /* When clinics are present and UseSpeacilityRegion setting is off
     and all fields are filled accept specialty and team */
    if (
      appointmentDetails?.openClinics !== undefined &&
      appointmentDetails?.openClinics?.length &&
      appointmentDetails?.allowDisplay === "true" &&
      selectDateAndHpForm?.values?.clinicType !== "" &&
      selectDateAndHpForm?.values?.clinicLocation !== "" &&
      selectDateAndHpForm?.values?.service !== "" &&
      isUseSpecialtyAndRegionSetting === false
    ) {
      return false;
    }
    /* When clinics are present and UseSpeacilityRegion setting is on
     and all fileds are filled */
    if (
      isUseSpecialtyAndRegionSetting === true &&
      appointmentDetails?.openClinics !== undefined &&
      appointmentDetails?.openClinics?.length &&
      appointmentDetails?.allowDisplay === "true" &&
      selectDateAndHpForm?.values?.service !== "" &&
      selectDateAndHpForm?.values?.team !== "" &&
      selectDateAndHpForm?.values?.specialty !== "" &&
      selectDateAndHpForm?.values?.clinicType !== "" &&
      selectDateAndHpForm?.values?.clinicLocation !== ""
    ) {
      return false;
    }
    /* When clinics are not  present and UseSpeacilityRegion setting is off
    and all fields are filled accept service,specialty and team  */
    if (
      isUseSpecialtyAndRegionSetting === false &&
      appointmentDetails?.openClinics === undefined &&
      appointmentDetails?.allowDisplay !== "true" &&
      selectDateAndHpForm?.values?.service === "" &&
      selectDateAndHpForm?.values?.team === "" &&
      selectDateAndHpForm?.values?.specialty === "" &&
      selectDateAndHpForm?.values?.clinicType !== "" &&
      selectDateAndHpForm?.values?.clinicLocation !== ""
    ) {
      return false;
    }
    /* When clinics are not  present and UseSpeacilityRegion setting is on
      and all fields are filled accept service */
    if (
      isUseSpecialtyAndRegionSetting === true &&
      appointmentDetails?.openClinics === undefined &&
      appointmentDetails?.allowDisplay !== "true" &&
      selectDateAndHpForm?.values?.service === "" &&
      selectDateAndHpForm?.values?.team !== "" &&
      selectDateAndHpForm?.values?.specialty !== "" &&
      selectDateAndHpForm?.values?.clinicType !== "" &&
      selectDateAndHpForm?.values?.clinicLocation !== ""
    ) {
      return false;
    }
    return true;
  };
  const selectDateAndHpForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      service: "",
      selectDateForAppointment: "",
      specialty: "",
      clinicType: "",
      clinicLocation: "",
      team: "",
    },
    onSubmit: (values: any) => {
      setFormData(values);
      setSelectedHp("");
    },
  });

  useEffect(() => {
    if (appointmentDetails?.openClinics !== undefined) {
      appointmentDetails?.openClinics?.filter((element: any) => {
        if (element?.cliId === Number(cliID)) {
          selectDateAndHpForm?.setFieldValue("service", element);
        }
      });
    }
  }, [appointmentDetails?.openClinics]);

  return (
    <form onSubmit={selectDateAndHpForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={1}>
        <Mui.Grid item xs={12}>
          <Mui.Typography variant="h2">
            {t("selectDateForAppointment")}
          </Mui.Typography>
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={{ marginLeft: "-20px" }}>
          <CellmaCalendarPicker
            label="selectDateForAppointment"
            date={dayjs(selectedDate)}
            minDate={dayjs(`01/01/${new Date().getFullYear() - 4}`)}
            maxDate={dayjs(`12/31/${new Date().getFullYear() + 4}`)}
            onChange={(newDate: any) => {
              const today = new Date();
              if (
                selectedDate.getFullYear() !== newDate?.$y &&
                newDate?.$y === today.getFullYear()
              ) {
                dispatch(setSelectedDate(today));
              } else {
                if (
                  moment(newDate.$d).format("yyyy/MM/DD") <
                  moment(today).format("yyyy/MM/DD")
                ) {
                  dispatch(
                    setSnackbar(true, "warning", t("selectedDateAlert"), 4)
                  );
                  dispatch(setSelectedDate(today));
                }
                dispatch(setSelectedDate(newDate.$d));
              }
            }}
          />
        </Mui.Grid>

        {isNextAvailableAppointment === true &&
          isUseSpecialtyAndRegionSetting === false &&
          activeScreenName !== "roomDiary" && (
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Common.CellmaButton
                label={t("nextAvailableAppointment")}
                onClick={() => {
                  // passed hardcoded value for visualization purpose
                  handlerShowHp("1", "Dr.John");
                }}
              />
            </Mui.Grid>
          )}
        {userRoles.includes("ECA") === true &&
          appointmentDetails?.openClinics !== undefined &&
          appointmentDetails?.openClinics?.length !== 0 &&
          appointmentDetails?.allowDisplay === "true" &&
          activeScreenName !== "roomDiary" && (
            <Mui.Grid item xs={10}>
              <Common.CellmaAutoSelectField
                label={t("service")}
                name="service"
                options={appointmentDetails?.openClinics ?? []}
                value={selectDateAndHpForm?.values?.service ?? ""}
                onChange={(event: any, value: any) => {
                  setServiceCliId(value?.cliId);
                  selectDateAndHpForm?.setFieldValue("service", value);
                  selectDateAndHpForm?.setFieldValue("specialty", "");
                  selectDateAndHpForm.setFieldValue("clinicType", "");
                  selectDateAndHpForm.setFieldValue("clinicLocation", "");
                  selectDateAndHpForm.setFieldValue("team", "");
                  handleDisable();
                }}
                getOptionLabel={(clinic: any) => clinic?.cliName ?? ""}
                renderOption={(props: any, clinic: any) => (
                  <li {...props}>{clinic?.cliName}</li>
                )}
              />
            </Mui.Grid>
          )}
        {isUseSpecialtyAndRegionSetting && activeScreenName !== "roomDiary" && (
          <Mui.Grid item xs={10}>
            <Common.CellmaAutoSelectField
              label={t("specialty")}
              name="specialty"
              options={specialtyList ?? []}
              value={selectDateAndHpForm?.values?.specialty ?? ""}
              onChange={(event: any, value: any) => {
                selectDateAndHpForm?.setFieldValue("specialty", value);
                setSpecialtyEliId(value?.ctlSpecialityEliId);
                selectDateAndHpForm.setFieldValue("clinicType", "");
                selectDateAndHpForm.setFieldValue("clinicLocation", "");
                selectDateAndHpForm.setFieldValue("team", "");
                handleDisable();
              }}
              getOptionLabel={(specialty: any) =>
                specialty.ctlSpecialityEliText ?? ""
              }
              renderOption={(props: any, specialty: any) => (
                <li {...props}>{specialty.ctlSpecialityEliText}</li>
              )}
            />
          </Mui.Grid>
        )}

        {activeScreenName !== "roomDiary" && (
          <Mui.Grid item xs={10}>
            <Common.CellmaAutoSelectField
              label={t("clinicType")}
              name="clinicType"
              ariaLabel="clinicType"
              options={clinicType ?? []}
              value={selectDateAndHpForm?.values?.clinicType ?? ""}
              onChange={(event: any, value: any) => {
                selectDateAndHpForm?.setFieldValue("clinicType", value);
                setClinicTypeEliId(value?.ctlClinicTypeId);
                selectDateAndHpForm.setFieldValue("clinicLocation", "");
                selectDateAndHpForm.setFieldValue("team", "");
                handleDisable();
              }}
              getOptionLabel={(clinicType: any) =>
                clinicType?.ctlClinicTypeText ?? ""
              }
              renderOption={(props: any, clinicType: any) => (
                <li {...props}>{clinicType?.ctlClinicTypeText}</li>
              )}
            />
          </Mui.Grid>
        )}
        {activeScreenName !== "roomDiary" && (
          <Mui.Grid item xs={10}>
            <Common.CellmaAutoSelectField
              label={t("clinicLocation")}
              name="clinicLocation"
              ariaLabel="clinicLocation"
              options={clinicLocation ?? []}
              value={selectDateAndHpForm?.values?.clinicLocation ?? ""}
              onChange={(event: any, value: any) => {
                setServiceLocationName(value?.ctlClinicLocationText);
                selectDateAndHpForm?.setFieldValue("clinicLocation", value);
                setServiceLocationId(value?.ctlClinicLocationId);
                selectDateAndHpForm.setFieldValue("team", "");
                handleDisable();
              }}
              getOptionLabel={(clinicLocation: any) =>
                clinicLocation.ctlClinicLocationText ?? ""
              }
              renderOption={(props: any, clinicLocation: any) => (
                <li {...props}>{clinicLocation.ctlClinicLocationText}</li>
              )}
            />
          </Mui.Grid>
        )}
        {isUseSpecialtyAndRegionSetting && activeScreenName !== "roomDiary" && (
          <Mui.Grid item xs={10}>
            <Common.CellmaAutoSelectField
              label={t("team")}
              name="team"
              options={clinicTypesLocationList ?? []}
              value={selectDateAndHpForm?.values?.team ?? ""}
              onChange={(event: any, value: any) => {
                selectDateAndHpForm?.setFieldValue("team", value);
                handleDisable();
              }}
              getOptionLabel={(team: any) => team?.ctlRegionEliText ?? ""}
              renderOption={(props: any, team: any) => (
                <li {...props}>{team?.ctlRegionEliText}</li>
              )}
            />
          </Mui.Grid>
        )}
        {activeScreenName !== "roomDiary" && (
          <Mui.Grid item xs={12} sx={styles.gridItem}>
            <Common.CellmaButton
              label={t("search")}
              onClick={handlerServiceBookAppointment}
              disabled={handleDisable()}
              type="submit"
            />
          </Mui.Grid>
        )}
        {isHpSearched && (
          <Mui.Grid item container spacing={1}>
            {isUseSpecialtyAndRegionSetting &&
              selectDateAndHpForm?.values?.clinicType !== "" && (
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.Typography variant="h2">
                    {t("roomAvailableAt")} {serviceLocationName}
                  </Mui.Typography>
                </Mui.Grid>
              )}
            {isUseSpecialtyAndRegionSetting &&
              selectDateAndHpForm?.values?.clinicType !== "" && (
                <Mui.Grid item container sx={styles.scrollBar}>
                  {appointmentRoomList?.map((roomAvailable: any) => (
                    <Mui.Grid
                      item
                      xs={4}
                      key={roomAvailable.arsRoomEliId}
                      sx={styles.slotButtonGrid}
                    >
                      <Common.CellmaButton
                        label={roomAvailable.arsName}
                        borderColor={common.white}
                        color={
                          slotBooked === roomAvailable.arsName
                            ? "primary.dark"
                            : "common.black"
                        }
                        backgroundColor={
                          slotBooked === roomAvailable.arsName
                            ? "primary.light"
                            : "grey.200"
                        }
                        borderRadius={5}
                        onClick={() => {
                          setSlotBooked(roomAvailable.arsName);
                        }}
                      />
                    </Mui.Grid>
                  ))}
                </Mui.Grid>
              )}
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Typography variant="h2">
                {t("healthProfessionals")}
              </Mui.Typography>
            </Mui.Grid>
            {!isUseSpecialtyAndRegionSetting &&
              healthProfessionalList.length !== 0 &&
              healthProfessionalList?.map((healthProfessional: any) => (
                <Mui.Grid
                  item
                  xs={12}
                  sx={styles.gridItem}
                  key={healthProfessional?.padEspId}
                >
                  <Common.CellmaLink
                    label="HP Name"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setEspId(healthProfessional?.padEspId);
                      handlerShowHp(
                        healthProfessional?.padEspId,
                        healthProfessional?.healthProfessionalsName
                      );
                    }}
                    selected={
                      selectedHp === healthProfessional?.healthProfessionalsName
                    }
                  >
                    {healthProfessional?.healthProfessionalsName}
                  </Common.CellmaLink>
                </Mui.Grid>
              ))}
            {(healthProfessionalList.length === 0 ||
              appointmentDetails?.establishmentProLinkedToPatientList
                ?.length === 0 ||
              (isUseSpecialtyAndRegionSetting === true &&
                selectDateAndHpForm?.values?.specialty === "")) && (
              <Mui.Grid item xs={12} sx={styles.gridItem}>
                <Mui.Typography>{t("noHpForThisService")}</Mui.Typography>
              </Mui.Grid>
            )}
            {isUseSpecialtyAndRegionSetting &&
              appointmentDetails?.establishmentProLinkedToPatientList
                ?.length !== 0 &&
              selectDateAndHpForm?.values?.specialty !== "" && (
                <Mui.Grid item container sx={styles.scrollBar}>
                  {healthProfessionalList?.map((healthProfessional: any) => (
                    <Mui.Grid
                      item
                      xs={12}
                      key={healthProfessional.padEspId}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Common.CellmaCheckbox
                        name={healthProfessional?.healthProfessionalsName}
                        label={healthProfessional?.healthProfessionalsName}
                        color="primary.dark"
                      />
                    </Mui.Grid>
                  ))}
                </Mui.Grid>
              )}
            {isUseSpecialtyAndRegionSetting && (
              <Mui.Grid item xs={12} sx={styles.gridItem}>
                <Common.CellmaButton
                  label={t("showCalender")}
                  onClick={() => {
                    window.scroll(0, 0);
                    // passed hardcoded value for visualization purpose
                    handlerShowHp("1", "Dr. Henry");
                  }}
                />
              </Mui.Grid>
            )}
          </Mui.Grid>
        )}
        {isShowHpAppointment &&
          isUseSpecialtyAndRegionSetting === false &&
          healthProfessionalList.length !== 0 && (
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Common.CellmaButton
                label={
                  isEnableBlockingMode
                    ? t("disableBlockingMode")
                    : t("enableBlockingMode")
                }
                tooltipTitle={
                  isEnableBlockingMode
                    ? t("blockingModeEnable")
                    : t("blockingModeDisable")
                }
                onClick={() => {
                  if (isEnableBlockingMode) {
                    dispatch(setIsEnableBlockingMode(false));
                  } else {
                    dispatch(setIsEnableBlockingMode(true));
                  }
                }}
              />
            </Mui.Grid>
          )}
        {isShowHpAppointment &&
          isNextAvailableAppointment === true &&
          !isUseSpecialtyAndRegionSetting &&
          healthProfessionalList.length !== 0 &&
          (activeScreenName === "DayCalender" ||
            activeScreenName !== "weekCalender") && (
            <HpTotalAppointmentCount appointmentCount={appointmentCount} />
          )}
      </Mui.Grid>
    </form>
  );
};

const styles = {
  gridItem: {
    display: "flex",
    justifyContent: "flex-start",
  },
  appointmentTypography: {
    color: "common.white",
  },
  typographyGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appointmentCountTypography: {
    color: "primary.main",
  },
  slotButtonGrid: {
    display: "flex",
    justifyContent: "center",
    marginY: "-8px",
    marginX: "-3px",
  },
  scrollBar: {
    maxHeight: 100,
    minWidth: 50,
    overflow: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "3px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "grey.100",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey.400",
    },
  },
};

export default SelectDateAndHp;
