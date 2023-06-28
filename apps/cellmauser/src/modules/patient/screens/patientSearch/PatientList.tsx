//  Page Name : "patientSearch"
//  Page Id : "c4pat1"

import { useEffect, useState } from "react";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import PatientInputFieldGroup from "./PatientInputFieldGroup";
import PatientListTable from "./PatientListTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { allowOnlyDigit } from "../../../../utils/Validations";
import useAddUnknownPatient from "../../api/useAddUnknownPatient";
import useGetPatientDisplay from "../../api/usePatientDisplay";
import * as dummyData from "../../assets/dummyData/CreatePatientDummyData";
import translate from "../../assets/translationFiles/patientSearchTranslation";
import { setActiveScreenName } from "../../store/PatientAction";
import { IPatientSearch, IUnknownPatient } from "../../types";

interface Props {
  isSearched?: boolean;
  list?: any;
  onPatientSelect?: any;
  pipId?: any;
  listCount?: any;
  refetchHandler?: any;
}
const PatientList: React.FC<Props> = (props: any) => {
  const [isUnknownPatientService, setIsUnknownPatientService] = useState(false);
  const [userRole, setUserRole] = useState("cellmaPatient");
  const [isSearched, setIsSearched] = useState(props?.isSearched);
  const navigate = useNavigate();
  const { language } = useSelector((state: any) => state.language);
  const { isPatientSelected } = useSelector((state: any) => state.patient);
  const [patientsList, setPatientsList] = useState([]);
  const dispatch = useDispatch();
  const [listCount, setListCount] = useState();
  const [btnVisible, setBtnVisible] = useState(false);
  const { data: displayData } = useGetPatientDisplay();

  const {
    setTitle,
    setIsLink,
    setIsLeftOutlinedIcon,
    setScreenName,
    setCustomizableViewPath,
  } = useOutletContext() as any; // <-- access context value
  const { mutate: addUnknowPatient, isLoading: unknownPatientIsLoading } =
    useAddUnknownPatient();

  const unknownPatientForm = useFormik({
    initialValues: { age: 0, birthMonth: 1, sex: "" },
    validationSchema: yup.object().shape({
      age: yup.string().required(translate("ageRequired", language)),
      birthMonth: yup
        .string()
        .required(translate("birthMonthRequired", language)),
    }),
    onSubmit: (values: IUnknownPatient) => {
      addUnknowPatient(values);
    },
  });

  useEffect(() => {
    if (isPatientSelected === false) {
      setTitle(translate("findPatient", language));
    } else {
      setTitle(translate("patientSearch", language));
    }
    dispatch(setActiveScreenName("patientSearchScreen"));
    setIsLink(true);
    setIsLeftOutlinedIcon(true);
    setScreenName("findPatientCustomizable");
    setCustomizableViewPath("/cellmaUser/patient/patientSearchCustom");
  }, [language, isPatientSelected]);

  const [formData, setFormData] = useState<IPatientSearch>();
  const addPatientHandler = (values: any) => {
    setFormData(values);
  };

  const searchPatientHandler = (
    patientsList: any,
    listCount: any,
    showCellmaTable: boolean
  ) => {
    setListCount(listCount);
    if (patientsList !== undefined) {
      setPatientsList(patientsList);
      if (showCellmaTable) setIsSearched(true);
    }
  };

  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <PatientInputFieldGroup
          onAddPatient={addPatientHandler}
          handleSearch={searchPatientHandler}
          setBtnVisible={setBtnVisible}
          identifierLabelSetting={
            displayData?.setting?.renamePatIdentifierToPayrollNo
          }
          identifierRequired={
            displayData?.setting?.estPatientSearchIdentifierMandatory
          }
          focusSetting={displayData?.setting?.estPatientSearchBarcodeNotFocus}
          estShowInServicePatient={
            displayData?.setting?.estShowInServicePatient
          }
          estPatientSearchIdentifierMandatory={
            displayData?.setting?.estPatientSearchIdentifierMandatory
          }
        />
      </Mui.Grid>

      {isSearched && (
        <Mui.Grid item container xs={12} columnGap={2}>
          <PatientListTable
            patientsList={props?.list ?? patientsList}
            listCount={props?.listCount ?? listCount}
            onClick={props?.onPatientSelect}
            pipId={props?.pipId}
            refetchHandler={props?.refetchHandler}
          />
          {!isUnknownPatientService &&
            userRole === "cellmaPatient" &&
            btnVisible &&
            !props?.isSearched && (
              <Mui.Grid item>
                <Common.CellmaButton
                  label={translate("addPatient", language)}
                  startIcon={<PersonAddAlt1Icon />}
                  onClick={() =>
                    navigate("/cellmaUser/patient/patientDuplicateCheck", {
                      state: formData,
                    })
                  }
                />{" "}
              </Mui.Grid>
            )}

          {/* {isUnknownPatientService && userRole === "UnknownPatient" && ( */}
          {displayData?.entity.showUnkownPatient && !props?.isSearched && (
            <Mui.Grid item>
              <Common.CellmaButton
                label={translate("addUnknownPatient", language)}
                startIcon={<PersonAddAlt1Icon />}
                onClick={() => {
                  setIsUnknownPatientService(true);
                }}
              />
            </Mui.Grid>
          )}

          {(isUnknownPatientService || unknownPatientIsLoading) && (
            <Mui.Backdrop open>
              <Common.CellmaPopup
                title={translate("addUnknownPatient", language)}
                handleCancel={() => {
                  setIsUnknownPatientService(false);
                }}
              >
                <Mui.Box>
                  <form onSubmit={unknownPatientForm.handleSubmit} noValidate>
                    <Mui.Grid
                      container
                      spacing={3}
                      sx={styles.popupGridContainer}
                    >
                      <Mui.Grid item xs={8}>
                        <Common.CellmaInputField
                          required
                          label={translate("age", language)}
                          name="age"
                          value={unknownPatientForm.values.age}
                          onHandleChange={unknownPatientForm.handleChange}
                          onBlur={unknownPatientForm.handleBlur}
                          errorText={
                            unknownPatientForm.touched.age &&
                            unknownPatientForm.errors.age
                          }
                          maxLength="4"
                          onKeyPress={allowOnlyDigit}
                        />
                      </Mui.Grid>
                      <Mui.Grid item xs={8}>
                        <Common.CellmaSelectField
                          label={translate("birthMonth", language)}
                          required
                          name="birthMonth"
                          value={unknownPatientForm.values.birthMonth}
                          changeevent={unknownPatientForm.handleChange}
                          blurevent={unknownPatientForm.handleBlur}
                          error={
                            unknownPatientForm.touched.birthMonth &&
                            unknownPatientForm.errors.birthMonth
                          }
                          list={dummyData.BIRTH_MONTH.map(
                            (patientBirthMonth: any) => (
                              <Mui.MenuItem
                                sx={{ whiteSpace: "unset" }}
                                key={patientBirthMonth.id}
                                value={patientBirthMonth.label}
                              >
                                {patientBirthMonth.label}
                              </Mui.MenuItem>
                            )
                          )}
                        />
                      </Mui.Grid>

                      <Mui.Grid item xs={8}>
                        <Common.CellmaSelectField
                          label={translate("sex", language)}
                          name="sex"
                          value={unknownPatientForm.values.sex}
                          changeevent={unknownPatientForm.handleChange}
                          blurevent={unknownPatientForm.handleBlur}
                          list={dummyData.PATIENT_GENDER.map(
                            (patientGender: any) =>
                              patientGender.label !== "all" && (
                                <Mui.MenuItem
                                  sx={{ whiteSpace: "unset" }}
                                  key={patientGender.id}
                                  value={patientGender.label}
                                >
                                  {translate(
                                    `${patientGender.label}`,
                                    language
                                  )}
                                </Mui.MenuItem>
                              )
                          )}
                        />
                      </Mui.Grid>
                    </Mui.Grid>
                    <Mui.Grid container item xs={12}>
                      <Mui.Grid item xs={12} sx={styles.popupButton}>
                        <Common.CellmaButton
                          label={translate("save", language)}
                          type="submit"
                        />
                      </Mui.Grid>
                    </Mui.Grid>
                  </form>
                  );
                </Mui.Box>
              </Common.CellmaPopup>
            </Mui.Backdrop>
          )}
        </Mui.Grid>
      )}
    </Mui.Grid>
  );
};

export const styles = {
  popupGridContainer: {
    width: { sm: "600px" },
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

export default PatientList;
