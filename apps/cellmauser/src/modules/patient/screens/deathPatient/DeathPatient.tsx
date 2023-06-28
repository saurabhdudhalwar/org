// Page Name : "deathPatient"
// Page Id : "c4pat13"

import { useEffect, useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import * as Mui from "@mui/material";
import { differenceInCalendarYears } from "date-fns";
import { Formik, FormikProps } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import * as Common from "../../../../common/CommonComponentsIndex";
import { isError } from "../../../../utils/GeneralUtils";
import informationSnackbar from "../../../../utils/InformationCodeHandler";
import dispatchSnackbar from "../../../../utils/ResponseCodeHandler";
import { timeValidation } from "../../../../utils/Validations";
import {
  useCauseOfDeath,
  useGetPatientDeath,
  usePostPatientDeathDetails,
  usePutPatientDeathDetails,
} from "../../api/usePatientDeath";
import * as dummyData from "../../assets/dummyData/deathPatientDummyData";
import translate from "../../assets/translationFiles/deathPatientTranslation";
import { setIsPatientDeath } from "../../store/PatientAction";

const GridItem = (props: any) => {
  return (
    <Mui.Grid item xs={12} sm={3.25}>
      {props.children}
    </Mui.Grid>
  );
};

interface Props {
  // insert props here
}

const DeathPatient: React.FC<Props> = () => {
  const { language } = useSelector((state: any) => state.language);
  const [isNoService, setIsNoService] = useState(false);
  const [isDeathPatientPage, setIsDeathPatientPage] = useState(true);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [openStatus, setIsOpenStatus] = useState<boolean>(false);
  const [selectedOtherCauseOfDeathType, setSelectedOtherCauseOfDeathType] =
    useState<any>([]);
  const [otherCauseOfDeath, setOtherCauseOfDeath] = useState<any>({});
  const [searchCode, setSearchCode] = useState("");
  const [searchString, setSearchString] = useState("");
  const searchType = useRef("");
  // const searchString = useRef("");
  // const searchCode = useRef("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTitle }: { setTitle: any } = useOutletContext(); // <-- access context value
  const { patientId, patientInformation } = useSelector(
    (state: any) => state.patient
  );
  const [deletedCauseOfDeath, setDeletedCauseOfDeath] = useState<any>([]);
  const { patientCauseOfDeath } = useCauseOfDeath(
    searchType.current,
    searchString,
    searchCode
  );

  // Function for get age at death
  const ageAtDeath = (date: any, data: FormikProps<any> | null) => {
    const birthDate = new Date(patientInformation?.patDob);
    const now = new Date(date);
    const month = date?.getMonth();
    const day = date?.getDay();
    const age = differenceInCalendarYears(now, birthDate);

    let ageString = "";
    if (age <= 1) {
      ageString = ` ${month} months ${day} days `;
    } else if (age > 1 && age <= 10) {
      ageString = `${age} years ${month} months `;
    } else if (age > 10) {
      ageString = `${age} years `;
    }

    if (data == null) {
      return ageString;
    }
    setAgeOfDeath(ageString, data);
  };

  const setAgeOfDeath = (ageString: string, data: FormikProps<any>) => {
    data.setFieldValue("ageAtDeath", ageString);
  };

  const {
    isLoading: postPatientDeathIsLoading,
    mutate: savePatientDeathDetails,
  } = usePostPatientDeathDetails();
  const {
    isLoading: putPatientDeathIsLoading,
    mutate: updatePatientDeathDetails,
  } = usePutPatientDeathDetails();

  let isEditMode = false;

  const { data: patDeathDetails } = useGetPatientDeath(patientId);
  const immediateCauses = patDeathDetails?.mainDeath ?? [];
  const otherCausesOfDeath = patDeathDetails?.otherDeaths ?? [];
  isEditMode = !!(immediateCauses.length > 0 || otherCausesOfDeath.length > 0);

  const handleChangeOtherCauseOfDeathType = (event: any, value: any) => {
    setSelectedOtherCauseOfDeathType(value);

    const localCauseOfDeath: any = otherCauseOfDeath;
    value.some((item: any) => {
      if (!localCauseOfDeath[item.eliId]) {
        localCauseOfDeath[item.eliId] = [[]];
        return localCauseOfDeath;
      }
    });
    setOtherCauseOfDeath(localCauseOfDeath);
  };

  const handleChangeOtherCauseOfDeath = (
    eliId: any,
    eliText: any,
    value: any
  ) => {
    // value = value.map((element: any) => ({
    //   deathType: "other",
    //   causeOfDeathTypeEliId: eliId,
    //   cause: element.fullySpecifiedName,
    //   causeOfDeathTypeEliText: eliText,
    //   causeCode: element.code,
    //   causeCodeType: element.prifix,
    // }));

    setOtherCauseOfDeath((prevState: any) => {
      return { ...prevState, [eliId]: [value] };
    });
  };

  const handleRemoveOtherCauseOfDeath = (eliId: string, code: any) => {
    const foundItem = otherCauseOfDeath[eliId][0].filter(
      (item: any) => item.code === code
    );
    setDeletedCauseOfDeath((prevState: any) => [
      ...prevState,
      ...[foundItem[0]?.podId],
    ]);
    setOtherCauseOfDeath((prevState: any) => {
      return {
        ...prevState,
        [eliId]: [
          prevState[eliId][0].filter((item: any) => item.code !== code),
        ],
      };
    });
  };

  useEffect(() => {
    setTitle(translate("patientDeath", language));
  }, [language, setTitle]);

  // button for patient is set to dead
  const setButtonHandler = () => {
    setIsNoService(true);
    setIsDeathPatientPage(false);
    dispatch(setIsPatientDeath(true));
  };

  // handler Mark Patient Dead
  const handleMarkPatientDead = (event: any) => {
    const { value } = event.target;
    if (value === "yes") {
      setIsShowPopup(true);
    } else {
      setIsShowPopup(false);
    }
  };

  // handler for close status popup modal
  const handleCloseStatus = () => {
    setIsOpenStatus(false);
  };

  // Api call for establishment list items
  const { data: establishmentListItem } = useEstablishmentListItems([
    "cause of death type",
  ]);
  const otherCauseOfDeathEstList =
    establishmentListItem?.["cause of death type"] ?? [];

  const otherCauses: any = [];
  for (const [key, value] of Object.entries(otherCauseOfDeath)) {
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        item.forEach((innerItem: any) => {
          otherCauses.push(innerItem);
        });
      });
    }
  }

  useEffect(() => {
    // set data to form for other cause of death
    if (otherCauseOfDeathEstList.length > 0) {
      const mergedCOD = otherCausesOfDeath.reduce((a: any, b: any) => {
        a[b.causeOfDeathTypeEliId] = a[b.causeOfDeathTypeEliId] || [];
        a[b.causeOfDeathTypeEliId].push(b);
        return a;
      }, Object.create(null));

      Object.keys(mergedCOD).forEach((item) => {
        setSelectedOtherCauseOfDeathType((prevState: any) => {
          const data = [
            ...prevState,
            ...otherCauseOfDeathEstList.filter((el: any) => el.eliId === +item),
          ];
          return data;
        });

        const valOfItem = mergedCOD[item];
        const valOfItemMap = valOfItem.map((el: any) => ({
          podId: el.podId,
          code: el.causeCode,
          prifix: el.causeCodeType,
          fullySpecifiedName: el.cause,
        }));

        setOtherCauseOfDeath((prevState: any) => {
          return {
            ...prevState,
            ...{ [item]: [valOfItemMap] },
          };
        });
      });
    }
  }, [otherCausesOfDeath, otherCauseOfDeathEstList]);

  return (
    <>
      {postPatientDeathIsLoading && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress />
        </Mui.Backdrop>
      )}
      {/* <Mui.Typography>{JSON.stringify(otherCauseOfDeath)}</Mui.Typography> */}
      <Formik
        enableReinitialize
        initialValues={{
          searchImmediateCauseOfDeath: immediateCauses,
          otherCauseOfDeath: otherCauses.length !== 0 ? otherCauses : "",
          deathNotes: patDeathDetails?.otherData?.deathNotes || "",
          dateOfDeath: patDeathDetails?.otherData?.dateOfDeath || null,
          timeOfDeath: null,
          ageAtDeath: patDeathDetails?.otherData?.ageAtDeath || "",
          patientIsDied: patDeathDetails?.otherData?.patientIsDied || "no",
          causesOfDeath: "",
        }}
        validationSchema={yup.object().shape({
          dateOfDeath: yup
            .date()
            .nullable()
            .min(new Date("01/01/1900"), translate("invalidDate", language))
            .max(new Date(), translate("futureDateAlert", language))
            .typeError(translate("invalidDate", language)),
          timeOfDeath: yup
            .date()
            .nullable()
            .typeError(translate("invalidTime", language)),
          searchImmediateCauseOfDeath: yup
            .array()
            .min(1, "Search immediate cause of death required")
            .required("Search immediate cause of death required"),
        })}
        onSubmit={(values: any) => {
          const localCOD: any = [];
          Object.keys(otherCauseOfDeath).forEach((item) => {
            const el = otherCauseOfDeath[item][0];
            el.some((elItem: any) => {
              localCOD.push({
                podId: elItem.podId,
                deathType: "other",
                causeOfDeathTypeEliId: item,
                causeOfDeathTypeEliText: otherCauseOfDeathEstList.filter(
                  (ocodel: any) => ocodel.eliId
                )[0].eliText,
                cause: elItem.fullySpecifiedName,
                causeCode: elItem.code,
                causeCodeType: elItem.prifix,
              });
            });
          });

          values.causesOfDeath = [
            ...values.searchImmediateCauseOfDeath.map((item: any) => ({
              podId: item.podId,
              deathType: "immidiate",
              cause: item.fullySpecifiedName,
              causeCode: item.code,
              causeCodeType: item.prifix,
            })),
            ...localCOD,
          ];

          const obj: any = {
            patId: parseInt(patientId, 10),
            causeOfDeath: values?.causesOfDeath ?? "",
            deathNotes: values?.deathNotes ?? "",
            dateOfDeath: values?.dateOfDeath
              ? moment(values?.dateOfDeath).format("DD/MM/YYYY")
              : null,
            timeOfDeath: values?.timeOfDeath
              ? moment(values?.timeOfDeath).format("hh:mm")
              : null,
            ageAtDeath: values?.ageAtDeath ?? "",
            patientIsDied: values?.patientIsDied === "yes" ? "1" : "0",
          };

          if (!isEditMode) {
            savePatientDeathDetails(obj, {
              onSuccess: (response: any) => {
                if (response.status === 200) {
                  if (
                    response?.data?.validationCode ===
                    "patient.death.add.success"
                  ) {
                    setButtonHandler();
                  }
                }
                dispatchSnackbar(response, dispatch, language);
                informationSnackbar(
                  response?.data?.informationMessages,
                  dispatch,
                  language
                );
              },
            });
          } else {
            obj.deletedCauseOfDeath = deletedCauseOfDeath;
            updatePatientDeathDetails(obj, {
              onSuccess: (response: any) => {
                if (response.status === 200) {
                  if (
                    response?.data?.validationCode ===
                    "patient.death.update.success"
                  ) {
                    setButtonHandler();
                  }
                }
                dispatchSnackbar(response, dispatch, language);
              },
            });
          }
        }}
      >
        {(data: FormikProps<any>) => {
          return (
            <form onSubmit={data.handleSubmit} noValidate>
              {isDeathPatientPage && (
                <Mui.Grid container spacing={4}>
                  <Mui.Grid item container xs={12} spacing={3}>
                    <Mui.Grid item xs={12} sm={3.25} sx={{ minWidth: "350px" }}>
                      <Common.CellmaAutoSelectField
                        label={translate(
                          "searchImmediateCauseOfDeath",
                          language
                        )}
                        name="searchImmediateCauseOfDeath"
                        multiple
                        required
                        options={patientCauseOfDeath}
                        value={data.values.searchImmediateCauseOfDeath}
                        getOptionLabel={(option: any) =>
                          option.fullySpecifiedName
                        }
                        onChange={(event: any, value: any) => {
                          data.setFieldValue(
                            "searchImmediateCauseOfDeath",
                            value
                          );
                        }}
                        renderOption={(
                          props: any,
                          option: any,
                          { selected }: { selected: any }
                        ) => (
                          <li {...props}>
                            <Mui.Checkbox checked={selected} />
                            {option.fullySpecifiedName}
                          </li>
                        )}
                        onInputChange={(event: any) => {
                          searchType.current = "searchByName";
                          setTimeout(() => {
                            setSearchString(event?.target?.value);
                          }, 1000);
                        }}
                        error={isError(data, "searchImmediateCauseOfDeath")}
                      />
                    </Mui.Grid>
                    <Mui.Grid item xs={12} sm={0.5}>
                      <Mui.Typography sx={styles.orText}>
                        {translate("or", language)}
                      </Mui.Typography>
                    </Mui.Grid>
                    <Mui.Grid item xs={12} sm={3.25} sx={{ minWidth: "350px" }}>
                      <Common.CellmaAutoSelectField
                        label={translate("searchImmediateDeathCode", language)}
                        name="searchImmediateDeathCode"
                        multiple
                        limitTags={3}
                        options={patientCauseOfDeath}
                        value={data.values.searchImmediateCauseOfDeath}
                        getOptionLabel={(option: any) => option.code}
                        onChange={(event: any, value: any) => {
                          data.setFieldValue(
                            "searchImmediateCauseOfDeath",
                            value
                          );
                        }}
                        renderOption={(
                          props: any,
                          option: any,
                          { selected }: { selected: any }
                        ) => (
                          <li {...props}>
                            <Mui.Checkbox checked={selected} />
                            {option.code}
                          </li>
                        )}
                        onInputChange={(event: any) => {
                          searchType.current = "searchByCode";
                          setTimeout(() => {
                            setSearchCode(event?.target?.value);
                          }, 1000);
                        }}
                      />
                    </Mui.Grid>
                  </Mui.Grid>

                  {/* Immediate Cause Of Death Map */}
                  {data.values.searchImmediateCauseOfDeath.map((cause: any) => (
                    <Mui.Grid
                      key={cause.code}
                      item
                      container
                      xs={12}
                      spacing={3}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <GridItem>
                        <Common.CellmaInputField
                          disabled
                          label={translate("immediateCauseOfDeath", language)}
                          value={cause.fullySpecifiedName}
                        />
                      </GridItem>
                      <Mui.Grid item sm={0.5} />
                      <GridItem>
                        <Common.CellmaInputField
                          disabled
                          label={translate("code", language)}
                          value={cause.code}
                        />
                      </GridItem>
                      <GridItem>
                        <Mui.IconButton
                          onClick={() => {
                            data.setFieldValue(
                              "searchImmediateCauseOfDeath",
                              data?.values?.searchImmediateCauseOfDeath.filter(
                                (item: any) => item.code !== cause.code
                              )
                            );
                          }}
                        >
                          <Mui.Tooltip title={translate("remove", language)}>
                            <CloseIcon sx={{ color: "warning.dark" }} />
                          </Mui.Tooltip>
                        </Mui.IconButton>
                      </GridItem>
                    </Mui.Grid>
                  ))}

                  <Mui.Grid item xs={12}>
                    <Mui.Divider />
                  </Mui.Grid>

                  {/* Other Cause Of Death Map */}
                  <Mui.Grid item container xs={12} spacing={3}>
                    <GridItem>
                      <Common.CellmaAutoSelectField
                        label={translate("otherCauseOfDeathType", language)}
                        name="Other Cause of Death Type"
                        multiple
                        options={otherCauseOfDeathEstList}
                        value={selectedOtherCauseOfDeathType}
                        getOptionLabel={(option: any) => option.eliText}
                        onChange={handleChangeOtherCauseOfDeathType}
                        renderOption={(
                          props: any,
                          option: any,
                          { selected }: { selected: any }
                        ) => (
                          <li {...props}>
                            <Mui.Checkbox checked={selected} />
                            {option.eliText}
                          </li>
                        )}
                      />
                    </GridItem>
                  </Mui.Grid>

                  {selectedOtherCauseOfDeathType.map(
                    (selectedOtherCauseOfDeathValue: any) =>
                      otherCauseOfDeath &&
                      otherCauseOfDeath[
                        selectedOtherCauseOfDeathValue.eliId
                      ]?.map((otherCauseOfDeathValue: any) => (
                        <Mui.Grid
                          item
                          container
                          xs={12}
                          spacing={3}
                          key={selectedOtherCauseOfDeathValue.eliId}
                        >
                          <Mui.Grid
                            item
                            xs={12}
                            sm={3.25}
                            sx={{ minWidth: "350px" }}
                          >
                            {/* <Mui.Typography>
                              {JSON.stringify(otherCauseOfDeathValue)}
                            </Mui.Typography> */}
                            <Common.CellmaAutoSelectField
                              label={`Search ${selectedOtherCauseOfDeathValue.eliText} cause of Death`}
                              multiple
                              options={patientCauseOfDeath}
                              value={otherCauseOfDeathValue}
                              getOptionLabel={(option: any) =>
                                option.fullySpecifiedName
                              }
                              onChange={(event, value) =>
                                handleChangeOtherCauseOfDeath(
                                  selectedOtherCauseOfDeathValue.eliId,
                                  selectedOtherCauseOfDeathValue.eliText,
                                  value
                                )
                              }
                              renderOption={(
                                props: any,
                                option: any,
                                { selected }: { selected: any }
                              ) => (
                                <li {...props}>
                                  <Mui.Checkbox checked={selected} />
                                  {option.fullySpecifiedName}
                                </li>
                              )}
                              onInputChange={(event: any) => {
                                searchType.current = "searchByName";
                                setTimeout(() => {
                                  setSearchString(event?.target?.value);
                                }, 1000);
                              }}
                            />
                          </Mui.Grid>
                          <Mui.Grid item xs={12} sm={0.5}>
                            <Mui.Typography sx={styles.orText}>
                              {translate("or", language)}
                            </Mui.Typography>
                          </Mui.Grid>
                          <Mui.Grid
                            item
                            xs={12}
                            sm={3.25}
                            sx={{ minWidth: "350px" }}
                          >
                            <Common.CellmaAutoSelectField
                              label={`Search ${selectedOtherCauseOfDeathValue.eliText} cause of Death Code`}
                              multiple
                              limitTags={3}
                              options={patientCauseOfDeath}
                              value={otherCauseOfDeathValue}
                              getOptionLabel={(option: any) => option.code}
                              onChange={handleChangeOtherCauseOfDeath}
                              renderOption={(
                                props: any,
                                option: any,
                                { selected }: { selected: any }
                              ) => (
                                <li {...props}>
                                  <Mui.Checkbox checked={selected} />
                                  {option.code}
                                </li>
                              )}
                              onInputChange={(event: any) => {
                                searchType.current = "searchByCode";
                                setTimeout(() => {
                                  setSearchCode(event?.target?.value);
                                }, 1000);
                              }}
                            />
                          </Mui.Grid>

                          {otherCauseOfDeathValue?.map((cause: any) => (
                            <Mui.Grid
                              key={cause.code}
                              item
                              container
                              xs={12}
                              spacing={3}
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <GridItem>
                                <Common.CellmaInputField
                                  disabled
                                  label={`${selectedOtherCauseOfDeathValue.eliText} of Death`}
                                  value={cause.fullySpecifiedName}
                                />
                              </GridItem>
                              <Mui.Grid item sm={0.5} />
                              <GridItem>
                                <Common.CellmaInputField
                                  disabled
                                  label={translate("code", language)}
                                  value={cause.code}
                                />
                              </GridItem>
                              <GridItem>
                                <Mui.IconButton
                                  onClick={() =>
                                    handleRemoveOtherCauseOfDeath(
                                      selectedOtherCauseOfDeathValue.eliId,
                                      cause.code
                                    )
                                  }
                                >
                                  <Mui.Tooltip
                                    title={translate("remove", language)}
                                  >
                                    <CloseIcon sx={{ color: "warning.dark" }} />
                                  </Mui.Tooltip>
                                </Mui.IconButton>
                              </GridItem>
                            </Mui.Grid>
                          ))}
                          <Mui.Grid item xs={12}>
                            <Mui.Divider />
                          </Mui.Grid>
                        </Mui.Grid>
                      ))
                  )}

                  <Mui.Grid item container xs={12} spacing={3}>
                    <Mui.Grid item xs={6.5}>
                      <Mui.TextField
                        fullWidth
                        rows="2"
                        multiline
                        label={translate("additionalNotes", language)}
                        name="deathNotes"
                        value={data.values.deathNotes}
                        onChange={data.handleChange}
                      />
                    </Mui.Grid>
                  </Mui.Grid>
                  <Mui.Grid item container xs={12} spacing={3}>
                    <GridItem>
                      <Common.CellmaDatePicker
                        label={translate("dateOfDeath", language)}
                        name="dateOfDeath"
                        maxDate={new Date()}
                        value={data.values.dateOfDeath}
                        onChange={(newDate: Date | null) => {
                          data.setFieldValue("dateOfDeath", newDate);
                          ageAtDeath(newDate, data);
                        }}
                        onBlur={data.handleBlur}
                        error={
                          data.touched.dateOfDeath && data.errors.dateOfDeath
                        }
                      />
                    </GridItem>

                    <GridItem>
                      <Common.CellmaTimePicker
                        label={translate("timeOfDeath", language)}
                        onChange={(newTime: Date | null) => {
                          data.setFieldValue("timeOfDeath", newTime);
                        }}
                        name="timeOfDeath"
                        value={data.values.timeOfDeath}
                        onKeyPress={timeValidation}
                        onBlur={data.handleBlur}
                        error={
                          data.touched.timeOfDeath && data.errors.timeOfDeath
                        }
                      />
                    </GridItem>
                    <GridItem>
                      <Common.CellmaInputField
                        label={translate("ageAtDeath", language)}
                        disabled
                        name="ageAtDeath"
                        value={data.values.ageAtDeath}
                        onHandleChange={data.handleChange}
                      />
                    </GridItem>
                  </Mui.Grid>
                  <Mui.Grid item container xs={12} spacing={3}>
                    <GridItem>
                      <Common.CellmaSelectField
                        label={translate("markPatientDead", language)}
                        name="patientIsDied"
                        value={data.values.patientIsDied}
                        changeevent={(event: any) => {
                          data.handleChange("patientIsDied")(event);
                          handleMarkPatientDead(event);
                        }}
                        list={dummyData.PATIENT_MARK.map((patientWeb: any) => (
                          <Mui.MenuItem
                            sx={{ whiteSpace: "unset" }}
                            key={patientWeb.id}
                            value={patientWeb.name}
                            onClick={handleCloseStatus}
                          >
                            {translate(`${patientWeb.name}`, language)}
                          </Mui.MenuItem>
                        ))}
                      />
                    </GridItem>
                  </Mui.Grid>
                  <Mui.Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Common.CellmaButton
                      label={translate("set", language)}
                      type="submit"
                      onClick={() => {
                        if (data?.errors) {
                          window.scrollTo(0, 0);
                        }
                      }}
                    />
                  </Mui.Grid>

                  {!openStatus && isShowPopup && (
                    <Mui.Backdrop open>
                      <Common.CellmaPopup
                        title={translate("status", language)}
                        handleCancel={() => {
                          setIsOpenStatus(!openStatus);
                        }}
                      >
                        <Mui.Box>
                          <Mui.Grid
                            container
                            spacing={3}
                            sx={styles.statusPopupContainerGrid}
                          >
                            <Mui.Grid item xs={12}>
                              <Mui.Typography variant="h2">
                                {translate("statusText", language)}
                              </Mui.Typography>
                            </Mui.Grid>
                          </Mui.Grid>
                          <Mui.Grid
                            container
                            item
                            xs={12}
                            sx={styles.statusPopupButton}
                          >
                            <Mui.Grid
                              item
                              xs={12}
                              sx={{
                                display: "flex",
                                justifyContent: "start",
                              }}
                            >
                              <Common.CellmaButton
                                label={translate("ok", language)}
                                onClick={() => {
                                  setIsShowPopup(false);
                                }}
                              />
                            </Mui.Grid>
                          </Mui.Grid>
                        </Mui.Box>
                      </Common.CellmaPopup>
                    </Mui.Backdrop>
                  )}
                </Mui.Grid>
              )}

              {isNoService && (
                <Mui.Grid container spacing={4}>
                  <Mui.Grid item xs={12}>
                    <Mui.Typography variant="h4">
                      {translate("notInService", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Mui.Typography variant="h4">
                      {translate("notCurrentlyService", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                  <Mui.Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Common.CellmaButton
                      label={translate("readOnly", language)}
                      onClick={() =>
                        navigate("/cellmaUser/patient/contactTypeScreen")
                      }
                    />
                  </Mui.Grid>
                </Mui.Grid>
              )}
            </form>
          );
        }}
      </Formik>
    </>
  );
};
const styles = {
  statusPopupContainerGrid: {
    paddingY: "15px",
    paddingX: "35px",
  },
  statusPopupButton: {
    paddingLeft: "500px",
  },
  orText: {
    display: "flex",
    justifyContent: "center",
    mt: "10px",
  },
};

export default DeathPatient;
