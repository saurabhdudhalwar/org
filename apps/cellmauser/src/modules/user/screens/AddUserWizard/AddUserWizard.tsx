// Page Name : "setHpDiary"
// Page Id : "c4user4"

import { useEffect, useRef, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import * as Mui from "@mui/material";
import { useFormik } from "formik";
import _without from "lodash/without";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import AddUserProfile from "./AddUserProfile";
import UserContactDetails from "./UserContactDetails";
import UserDetails from "./UserDetails";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import { isUndefinedOrNullOrEmpty } from "../../../../utils/GeneralUtils";
import PASSWORD_REGEX from "../../../../utils/RegExpressions";
import dispatchSnackbar from "../../../../utils/ResponseCodeHandler";
import { setUserRoles } from "../../../authentication/store/UserAuthAction";
import { useAddUser, useUpdateUserDetails } from "../../api/useAddUser";
import useAddUserFieldSettings from "../../api/useAddUserFieldSettings";
import useGetUserSignature from "../../api/useSignature";
import useGetUserGroupGroupings from "../../api/useUserGroupings";
import useGetUserRoles from "../../api/useUserRoles";
import * as dummyData from "../../assets/dummyData/addUserWizardDummyData";
import translate from "../../assets/translationFiles/addUserWizardTranslation";
import {
  setEspDetails,
  setIsUserSelected,
  setIsUseSpecialityAndRegion,
  setSelectedUsername,
} from "../../store/UserAction";

const AddUserWizard = () => {
  const [imageState, setImageState] = useState("");
  const [isShowContactsHidden, setIsShowContactsHidden] = useState(true);
  const [isShowUserAnHP, setIsShowUserAnHP] = useState(true);
  const [isChangeProfile, setIsChangeProfile] = useState(false);
  const [isGrouping, setIsGrouping] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState<any>([
    "Standard",
    "Default",
  ]);
  const [selectedUserGroup, setSelectedUserGroup] = useState<any>([]);
  const [contactsHidden, setContactsHidden] = useState(true);
  const [userAnHP, setUserAnHP] = useState(true);
  const [goingOnDiary, setGoingOnDiary] = useState(false);
  const [fileName, setFileName] = useState("");
  const [convertedFile, setConvertedFile] = useState<any>("");
  const { state } = useLocation();
  const { language } = useSelector((element: any) => element.language);
  const { selectedUsername } = useSelector((element: any) => element.user);
  const { data: getUserRoles } = useGetUserRoles();
  const { data: userGroupGroupingsList } = useGetUserGroupGroupings();

  const { data: userSignature } = useGetUserSignature({
    useUsername: selectedUsername,
  });
  const [disableNext, setDisableNext] = useState(true);
  // const [username, setUsername] = useState("");
  const {
    setTitle,
    setIsLink,
    setIsLeftOutlinedIcon,
    setScreenName,
    setCustomizableViewPath,
    setDrawerName,
  } = useOutletContext<any>(); // <-- access context value
  const digitalSignatureInput = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName, userRoles, estID, cliID } = useSelector(
    (element: any) => element.auth
  );
  const { data: userAddFieldSettings } = useAddUserFieldSettings(userName);
  const userRolesId: any[] = [];
  const userRolesName: any[] = [];
  const { mutate: addUserDetails, data: addUserDetailsResponse } = useAddUser();
  const { mutate: updateUserDetails, data: updateUserDetailsResponse } =
    useUpdateUserDetails();
  // api call for establishmentListitems list
  const { data: listItems } = useEstablishmentListItems([
    "Profession",
    "Title",
    "Speciality",
    "Referral Reason",
    "HP Region",
  ]);
  const { data: getUserDetails, refetch: fetchUserDetails } =
    useAddUserFieldSettings(selectedUsername);
  let userDetails = getUserDetails?.response ?? "";

  if (
    getUserDetails?.response !== undefined &&
    getUserDetails?.response !== ""
  ) {
    userDetails = getUserDetails?.response;
    setUserRoles(getUserDetails?.response?.userRoles);
  }

  useEffect(() => {
    if (Object.values(addUserForm?.errors).length !== 0) {
      if (addUserForm?.touched?.username === true) {
        addUserForm?.setFieldTouched("username", true);
      }

      if (addUserForm?.touched?.profession === true) {
        addUserForm?.setFieldTouched("profession", true);
      }

      if (addUserForm?.touched?.password === true) {
        addUserForm?.setFieldTouched("password", true);
      }

      if (addUserForm?.touched?.confirmPassword === true) {
        addUserForm?.setFieldTouched("confirmPassword", true);
      }

      if (addUserForm?.touched?.userExpiryDate === true) {
        addUserForm?.setFieldTouched("userExpiryDate", true);
      }

      if (addUserForm?.touched?.email === true) {
        addUserForm?.setFieldTouched("email", true);
      }

      if (addUserForm?.touched?.givenName === true) {
        addUserForm?.setFieldTouched("givenName", true);
      }

      if (addUserForm?.touched?.familyName === true) {
        addUserForm?.setFieldTouched("familyName", true);
      }
    }
  }, [language]);

  useEffect(() => {
    setTitle(translate("addUserWizard", language));
    window.scrollTo(0, 0);
    setIsLink(true);
    setIsLeftOutlinedIcon(true);
    setScreenName("userWizardCustomizable");
    setCustomizableViewPath("/cellmaUser/user/addUserWizardCustom");
    setDrawerName("UserDrawer");
  }, [language]);
  const hpHandler = (value: any) => {
    if (state === "addUserList" && value?.isUserAnHp === true) {
      return 0;
    }
    if (
      state === "editUserList" &&
      value?.isUserAnHp === true &&
      getUserDetails?.response?.establishmentProfessional?.espId
    ) {
      return getUserDetails?.response?.establishmentProfessional?.espId ?? 0;
    }
    return null;
  };
  useEffect(() => {
    if (state === "addUserList") {
      if (userAddFieldSettings?.services !== null) {
        userAddFieldSettings?.services?.filter((element: any) => {
          if (element?.cliId === Number(cliID)) {
            addUserForm?.setFieldValue("userService", element);
          }
        });
      }
    }
  }, [userAddFieldSettings?.services]);

  useEffect(() => {
    if (userAddFieldSettings?.settings?.useSpecialityAndRegion === 1) {
      dispatch(setIsUseSpecialityAndRegion(1));
      dispatch(
        setIsUseSpecialityAndRegion(
          userAddFieldSettings?.settings?.useSpecialityAndRegion
        )
      );
    } else {
      dispatch(setIsUseSpecialityAndRegion(0));
    }
  }, [userAddFieldSettings?.settings?.useSpecialityAndRegion]);
  let response = userAddFieldSettings?.response ?? "";
  if (
    userAddFieldSettings?.response !== undefined &&
    userAddFieldSettings?.response !== ""
  ) {
    response = userAddFieldSettings?.response;
  }
  const handleRoles = (values: any) => {
    const mergeArray = selectedUserGroup?.concat(selectedUserRole);
    mergeArray.forEach((roles: any) => {
      getUserRoles?.forEach((element: any) => {
        if (roles.toUpperCase() === element?.usgName.toUpperCase()) {
          userRolesId.push(element?.usgId);
        }
      });
    });

    handelSave(values);
  };
  // this function used to handel navigate event
  const handelNext = () => {
    navigate("/cellmaUser/user/setHPDiary");
    dispatch(setIsUserSelected(true));
    dispatch(setEspDetails(getUserDetails?.response));
    setScreenName("");
  };

  // this function used to dispatch snackbar and handel navigate event
  const handelSave = (values: any) => {
    const paramList = {
      useEstId: estID,
      useCliId: values?.userService?.cliId,
      useUsername: values?.username,
      useProfession: values?.profession?.eliText,
      useActive: values?.active.id,
      useDigitalSignatureFilename: values?.digitalSignature?.name,
      usePassword: values?.password,
      useExpires: values?.userExpiryDate
        ? moment(values?.userExpiryDate).format("DD/MM/YYYY")
        : null,
      useSubscribe: values?.subscribed?.id,
      useEmail: values?.email,
      useResetPasswordOnLogin: values?.userResetPassword?.label,
      useTitle: values?.title?.eliText,
      useMobile: values?.mobile,
      useNotes: values?.notes,
      useFirstname: values?.givenName,
      useSurname: values?.familyName,
      useMcrnNumber: values?.mcrnNumber,
      useSgdId: values?.userServiceGroup?.sgdId,
      useIsContactsHidden: contactsHidden === true ? 1 : 0,
      useReferenceId: values?.upn,
      useShowHpDiary: goingOnDiary === true ? "Yes" : "No",
      useDigitalSignature: convertedFile !== "" ? convertedFile : null,
      useSpeciality: values?.specialty?.eliText,
      useEspId:
        state === "editUserList" &&
        values?.isUserAnHp === false &&
        getUserDetails?.response?.establishmentProfessional?.espId
          ? getUserDetails?.response?.establishmentProfessional?.espId
          : hpHandler(values),
      establishmentProfessionalJson:
        values?.isUserAnHp === false
          ? null
          : {
              espId:
                state === "editUserList" &&
                getUserDetails?.response?.establishmentProfessional?.espId ===
                  undefined
                  ? 0
                  : hpHandler(values),
              espEstId: estID,
              espCliId: cliID,
              espAllowExternalReferral: values?.showOn?.label,
              espInitials: values?.initials,
              espLocal: values?.local?.label === "Local" ? "Yes" : "No",
              espSpecialty: values?.specialty?.eliText,
              espConsultant: values?.consultant?.label,
              espFirstConsultationValidity: values?.firstConsultation,
              espSurname: values?.promsDoctorSurname,
              espShow: values?.show?.label === "Show" ? "Yes" : "No",
              espConsultantCode: values?.consultantCode,
              espFollowUpConsultationValidity: values?.followUpConsultation,
              espCommisionLevel: values?.commissionLevel?.label,
              espNpiNumber: values?.npiNumber,
              espSendAppointmentTextEmail: values?.sendAppointmentText?.label,
              espEliId: values?.promsReason?.eliId,
              espNotAPerson: values?.genericHP?.label,
              espRegionEliId: values?.team?.eliId,
              espRegionEliText: values?.team?.eliText,
              espHpPromsCode: values?.promsNumber,
            },
      userRole: userRolesId,
    };
    if (state === "editUserList") {
      updateUserDetails(paramList);
    } else {
      addUserDetails(paramList);
    }
  };

  useEffect(() => {
    if (addUserDetailsResponse?.status === 200) {
      if (
        addUserDetailsResponse?.data?.validationCode === "user.create.success"
      ) {
        if (addUserForm.values?.isUserAnHp === true) {
          fetchUserDetails();
          dispatch(
            setSnackbar(true, "success", translate("userAndHp", language), 4)
          );
          navigate("/cellmaUser/user/addUserWizard", {
            state: "editUserList",
          });
          // setUsername(addUserDetailsResponse?.data?.entity?.useUsername);

          dispatch(
            setSelectedUsername(
              addUserDetailsResponse?.data?.entity?.useUsername
            )
          );
        } else {
          fetchUserDetails();
          dispatch(
            setSelectedUsername(
              addUserDetailsResponse?.data?.entity?.useUsername
            )
          );
          dispatch(
            setSnackbar(true, "success", translate("userCreated", language), 4)
          );
          navigate("/cellmaUser/user/addUserWizard", {
            state: "editUserList",
          });
        }
        setDisableNext(false);
      } else if (
        addUserDetailsResponse?.data?.validationCode ===
        "password.containsblacklistedword"
      ) {
        dispatch(
          setSnackbar(
            true,
            "warning",
            translate("passwordContainsBlacklistedWord", language),
            4
          )
        );
      } else if (
        addUserDetailsResponse?.data?.validationCode === "password.worst"
      ) {
        dispatch(
          setSnackbar(
            true,
            "warning",
            translate("userPasswordWorst", language),
            4
          )
        );
      } else {
        dispatchSnackbar(addUserDetailsResponse, dispatch, language);
      }
    }
  }, [addUserDetailsResponse]);
  useEffect(() => {
    if (state === "editUserList") {
      setFileName(userSignature?.fileName);
      setDisableNext(false);
    }
  }, [state, userSignature?.fileName]);
  useEffect(() => {
    if (updateUserDetailsResponse?.status === 200) {
      if (
        updateUserDetailsResponse?.data?.validationCode ===
        "user.update.success"
      ) {
        navigate("/cellmaUser/user/userSearch");
        dispatch(
          setSnackbar(true, "success", translate("userUpdated", language), 4)
        );
      }
      if (
        updateUserDetailsResponse?.data?.validationCode ===
        "password.containsblacklistedword"
      ) {
        dispatch(
          setSnackbar(
            true,
            "warning",
            translate("passwordContainsBlacklistedWord", language),
            4
          )
        );
      }
    }
  }, [updateUserDetailsResponse]);

  // this function use to handel choose file button action or event
  const digitalSignatureHandler = (event: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setConvertedFile(reader.result);
    };
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files[0].size > 300000) {
        setFileName("");
        digitalSignatureInput.current.value = "";
        dispatch(
          setSnackbar(
            true,
            "warning",
            translate("failToUploadFile", language),
            4
          )
        );
      } else {
        addUserForm?.setFieldValue("digitalSignature", event.target.files[0]);
        if (event.target.files[0].name.length > 25) {
          setFileName(`${event.target.files[0].name.toString()}`);
        } else {
          setFileName(event.target.files[0].name);
        }
      }
    }
  };

  // this function used to handel the state of selected image
  const loadPhoto = (imageState: any) => {
    setImageState(imageState);
  };

  // this function used to handel state of selected userRole
  const handleChangeUserRole = (event: any) => {
    const { value } = event.target;
    setSelectedUserRole(value);
  };

  // this function used to handel state of selected userGroup
  const handleChangeUserGroup = (event: any) => {
    const { value } = event.target;
    setSelectedUserGroup(value);
  };

  // this function used to handel data into chips
  const handleChipData = () => {
    setIsGrouping(false);
  };

  // this function use to delete selected user from chips
  const handleDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    setSelectedUserGroup((current: any) => _without(current, value));
    setSelectedUserRole((current: any) => _without(current, value));
  };

  // this function used to handel state of toggle button
  const handleContactsHidden = (event: any, newAlignment: any) => {
    addUserForm.setFieldValue("isContactHidden", newAlignment);
    setContactsHidden(newAlignment);
  };

  // this function used to handel state of toggle button
  const handleUserAnHP = (event: any, newAlignment: any) => {
    addUserForm.setFieldValue("isUserAnHp", newAlignment);
    setUserAnHP(newAlignment);
    setGoingOnDiary(newAlignment);
  };

  // this function used to handel state of toggle button
  const handleGoingOnDiary = (event: any, newAlignment: any) => {
    addUserForm.setFieldValue("isUserGoingOnDiary", newAlignment);
    setGoingOnDiary(newAlignment);
  };

  const addUserForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      profession: "",
      active: {
        id: 1,
        label: "Active",
      },
      digitalSignature: null,
      password: "",
      confirmPassword: "",
      userExpiryDate: null,
      subscribed: "",
      email: "",
      userResetPassword: {
        id: 0,
        label: "No",
      },
      title: "",
      mobile: "",
      showOn: "",
      notes: "",
      givenName: "",
      familyName: "",
      userService: "",
      mcrnNumber: "",
      userServiceGroup: [],
      upn: "",
      isContactHidden: "",
      isUserAnHp: true,
      isUserGoingOnDiary: "",
      initials: "",
      local: "",
      promsReason: "",
      promsNumber: "",
      specialty: "",
      consultant: "",
      firstConsultation: "",
      promsDoctorSurname: "",
      show: "",
      consultantCode: "",
      followUpConsultation: "",
      genericHP: "",
      team: "",
      commissionLevel: "",
      npiNumber: "",
      sendAppointmentText: "",
      userRoles: [],
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(translate("userNameRequired", language)),
      password: yup
        .string()
        .required(translate("passwordRequired", language))
        .min(8, translate("minCharacterPassword", language))
        .matches(PASSWORD_REGEX, translate("validatePassword", language)),
      profession: yup
        .object()
        .required(translate("professionRequired", language)),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          translate("confirmPasswordMessage", language)
        )
        .min(8, translate("minCharacterConfirmPassword", language))
        .required(translate("confirmPasswordRequired", language))
        .matches(
          PASSWORD_REGEX,
          translate("validateConfirmPassword", language)
        ),
      userExpiryDate: yup
        .date()
        .nullable()
        .min(new Date("01/01/1900"), translate("invalidDate", language))
        .max(new Date("12/31/2050"), translate("invalidDate", language))
        .typeError(translate("invalidDate", language)),
      email: yup
        .string()
        .email(translate("validEmail", language))
        .required(translate("emailRequired", language)),
      givenName: yup
        .string()
        .required(translate("givenNameRequired", language)),
      familyName: yup
        .string()
        .required(translate("familyNameRequired", language)),
    }),
    onSubmit: (values: any) => {
      handleRoles(values);
    },
  });
  useEffect(() => {
    if (state === "editUserList") {
      if (
        getUserDetails?.response?.establishmentProfessional?.espShow !==
        undefined
      ) {
        dummyData?.SEND_APPOINTMENT_TEXT_MAIL.filter((element: any) => {
          if (
            element.id ===
            getUserDetails?.response?.establishmentProfessional
              ?.espSendAppointmentTextEmail
          ) {
            addUserForm?.setFieldValue("sendAppointmentText", element);
          }
        });
      }

      if (
        getUserDetails?.response?.establishmentProfessional?.espShow !==
        undefined
      ) {
        dummyData?.COMMISSION_LEVEL.filter((element: any) => {
          if (
            element.label ===
            getUserDetails?.response?.establishmentProfessional
              ?.espCommisionLevel
          ) {
            addUserForm?.setFieldValue("commissionLevel", element);
          }
        });
      }

      if (
        listItems?.["HP Region"] !== null &&
        getUserDetails?.response?.user?.useTitle !== undefined
      ) {
        listItems?.["HP Region"]?.filter((element: any) => {
          if (
            element.eliId ===
            getUserDetails?.response?.establishmentProfessional?.espRegionEliId
          ) {
            addUserForm.setFieldValue("team", element);
          }
        });
      }

      if (
        getUserDetails?.response?.establishmentProfessional?.espShow !==
        undefined
      ) {
        dummyData?.GENERIC_HP.filter((element: any) => {
          if (
            element.id ===
            getUserDetails?.response?.establishmentProfessional?.espNotAPerson
          ) {
            addUserForm?.setFieldValue("genericHP", element);
          }
        });
      }

      if (
        getUserDetails?.response?.establishmentProfessional?.espShow !==
        undefined
      ) {
        dummyData?.SHOW.filter((element: any) => {
          if (
            element.id ===
            getUserDetails?.response?.establishmentProfessional?.espShow
          ) {
            addUserForm?.setFieldValue("show", element);
          }
        });
      }

      if (
        getUserDetails?.response?.establishmentProfessional
          ?.espAllowExternalReferral !== undefined
      ) {
        dummyData?.CONSULTANT.filter((element: any) => {
          if (
            element.id ===
            getUserDetails?.response?.establishmentProfessional?.espConsultant
          ) {
            addUserForm?.setFieldValue("consultant", element);
          }
        });
      }

      if (
        listItems?.["Referral Reason"] !== null &&
        getUserDetails?.response?.user?.useTitle !== undefined
      ) {
        listItems?.["Referral Reason"]?.filter((element: any) => {
          if (
            element.eliId ===
            getUserDetails?.response?.establishmentProfessional?.espEliId
          ) {
            addUserForm.setFieldValue("promsReason", element);
          }
        });
      }

      if (
        getUserDetails?.response?.establishmentProfessional?.espLocal !==
        undefined
      ) {
        dummyData?.LOCAL?.filter((element: any) => {
          if (
            element.id ===
            getUserDetails?.response?.establishmentProfessional?.espLocal
          ) {
            addUserForm?.setFieldValue("local", element);
          }
        });
      }

      if (
        getUserDetails?.response?.establishmentProfessional
          ?.espAllowExternalReferral !== undefined
      ) {
        dummyData?.SHOW_ON_EXTERNAL_REFERRAL_REQUEST.filter((element: any) => {
          if (
            element.id ===
            getUserDetails?.response?.establishmentProfessional
              ?.espAllowExternalReferral
          ) {
            addUserForm?.setFieldValue("showOn", element);
          }
        });
      }

      if (getUserDetails?.response?.user?.useActive !== undefined) {
        dummyData?.ACTIVE?.filter((element: any) => {
          if (element.id === getUserDetails?.response?.user?.useActive) {
            addUserForm?.setFieldValue("active", element);
          }
        });
      }

      if (getUserDetails?.response?.user?.useActive !== undefined) {
        dummyData?.SUBSCRIBED?.filter((element: any) => {
          if (element.id === getUserDetails?.response?.user?.useSubscribe) {
            addUserForm?.setFieldValue("subscribed", element);
          }
        });
      }

      if (
        getUserDetails?.response?.user?.useResetPasswordOnLogin !== undefined
      ) {
        dummyData?.USER_TO_PASSWORD_NEXT_LOGIN?.filter((element: any) => {
          if (
            element.id ===
            getUserDetails?.response?.user?.useResetPasswordOnLogin
          ) {
            addUserForm?.setFieldValue("userResetPassword", element);
          }
        });
      }

      if (
        listItems?.Profession !== null &&
        getUserDetails?.response?.user?.useProfession !== undefined
      ) {
        listItems?.Profession?.filter((element: any) => {
          if (
            element.eliText === getUserDetails?.response?.user?.useProfession
          ) {
            addUserForm?.setFieldValue("profession", element);
          }
        });
      }

      if (
        listItems?.Title !== null &&
        getUserDetails?.response?.user?.useTitle !== undefined
      ) {
        listItems?.Title?.filter((element: any) => {
          if (element.eliText === getUserDetails?.response?.user?.useTitle) {
            addUserForm.setFieldValue("title", element);
          }
        });
      }

      if (
        userAddFieldSettings?.services !== null &&
        getUserDetails?.response?.user?.useCliId !== undefined
      ) {
        userAddFieldSettings?.services?.filter((element: any) => {
          if (element.cliId === getUserDetails?.response?.user?.useCliId) {
            addUserForm?.setFieldValue("userService", element);
          }
        });
      }

      if (
        userAddFieldSettings?.response?.serviceGroupDetails !== null &&
        getUserDetails?.response?.user?.useSgdId !== undefined
      ) {
        userAddFieldSettings?.response?.serviceGroupDetails.filter(
          (element: any) => {
            if (element.sgdId === getUserDetails?.response?.user?.useSgdId) {
              addUserForm?.setFieldValue("userServiceGroup", element);
            }
          }
        );
      }
      if (
        listItems?.Speciality !== null &&
        getUserDetails?.response?.user?.useSpeciality !== undefined
      ) {
        listItems?.Speciality?.filter((element: any) => {
          if (
            element.eliText === getUserDetails?.response?.user?.useSpeciality
          ) {
            addUserForm?.setFieldValue("specialty", element);
          }
        });
      }

      if (getUserDetails?.response?.user?.useShowHpDiary !== undefined) {
        if (getUserDetails?.response?.user?.useShowHpDiary === 0) {
          addUserForm.setFieldValue("isUserGoingOnDiary", false);
          setGoingOnDiary(false);
          setDisableNext(true);
        } else {
          setGoingOnDiary(true);
        }
      }

      if (getUserDetails?.response?.userRoles !== undefined) {
        getUserDetails?.response?.userRoles.forEach((element: any) => {
          userRolesName.push(element?.usrName);
        });
      }
      setSelectedUserRole(userRolesName);
    }
  }, [
    listItems?.Profession,
    getUserDetails?.response?.user?.useProfession,
    listItems?.Title,
    getUserDetails?.response?.user?.useTitle,
    userAddFieldSettings?.services,
    getUserDetails?.response?.user?.useCliId,
    userAddFieldSettings?.response?.serviceGroupDetails,
    getUserDetails?.response?.user?.useSgdId,
    getUserDetails?.response?.establishmentProfessional
      ?.espAllowExternalReferral,
    getUserDetails?.response?.establishmentProfessional?.espLocal,
    getUserDetails?.response?.establishmentProfessional?.espConsultant,
    getUserDetails?.response?.establishmentProfessional?.espShow,
  ]);

  useEffect(() => {
    if (state === "editUserList") {
      if (getUserDetails?.response?.userPhoto) {
        setImageState(getUserDetails?.response?.userPhoto);
      } else {
        setImageState("");
      }
      addUserForm.setTouched(
        {
          ...addUserForm.touched,
          [(addUserForm.values.username,
          addUserForm.values.password,
          addUserForm.values.confirmPassword,
          addUserForm.values.email,
          addUserForm.values.givenName,
          addUserForm.values.familyName,
          addUserForm.values.profession)]: true,
        },
        false
      );

      if (getUserDetails?.response?.establishmentProfessional === undefined) {
        addUserForm?.setFieldValue("isUserAnHp", false);
        setIsShowUserAnHP(false);
        setUserAnHP(false);
      } else {
        addUserForm?.setFieldValue("isUserAnHp", true);
        setIsShowUserAnHP(true);
        setUserAnHP(true);
      }
      addUserForm?.setFieldValue(
        "username",
        getUserDetails?.response?.user?.useUsername
      );

      addUserForm?.setFieldValue(
        "digitalSignature",
        getUserDetails?.response?.user?.useDigitalSignatureFilename
      );

      addUserForm?.setFieldValue(
        "password",
        getUserDetails?.response?.user?.usePassword
      );

      addUserForm?.setFieldValue(
        "confirmPassword",
        getUserDetails?.response?.user?.usePassword
      );

      addUserForm?.setFieldValue(
        "email",
        getUserDetails?.response?.user?.useEmail
      );

      addUserForm?.setFieldValue(
        "mobile",
        getUserDetails?.response?.user?.useMobile
      );

      addUserForm?.setFieldValue(
        "notes",
        getUserDetails?.response?.user?.useNotes
      );

      addUserForm?.setFieldValue(
        "givenName",
        getUserDetails?.response?.user?.useFirstname
      );

      addUserForm?.setFieldValue(
        "familyName",
        getUserDetails?.response?.user?.useSurname
      );
      addUserForm?.setFieldValue(
        "mcrnNumber",
        getUserDetails?.response?.user?.useMcrnNumber
      );

      addUserForm?.setFieldValue(
        "initials",
        getUserDetails?.response?.establishmentProfessional?.espInitials
      );

      addUserForm?.setFieldValue(
        "initials",
        getUserDetails?.response?.establishmentProfessional?.espInitials
      );

      addUserForm?.setFieldValue(
        "promsNumber",
        getUserDetails?.response?.establishmentProfessional?.espHpPromsCode
      );

      addUserForm?.setFieldValue(
        "firstConsultation",
        getUserDetails?.response?.establishmentProfessional
          ?.espFirstConsultationValidity
      );

      addUserForm?.setFieldValue(
        "promsDoctorSurname",
        getUserDetails?.response?.establishmentProfessional?.espSurname
      );

      addUserForm?.setFieldValue(
        "consultantCode",
        getUserDetails?.response?.establishmentProfessional?.espConsultantCode
      );

      addUserForm?.setFieldValue(
        "followUpConsultation",
        getUserDetails?.response?.establishmentProfessional
          ?.espFollowUpConsultationValidity
      );
      addUserForm?.setFieldValue(
        "npiNumber",
        getUserDetails?.response?.establishmentProfessional?.espNpiNumber
      );
    }
    // eslint-disable-next-line
  }, [getUserDetails]);
  return (
    <form onSubmit={addUserForm.handleSubmit} noValidate>
      <Mui.Grid container sx={styles.alignCenter} spacing={2} rowGap={2}>
        <Mui.Grid container item sx={styles.alignCenter}>
          <Mui.Grid item>
            <Mui.Avatar variant="circular" sx={styles.imageAvatar}>
              {imageState && (
                <Mui.Avatar
                  sx={{ width: 120, height: 120 }}
                  alt="profile Photo"
                  src={imageState}
                  id="output"
                />
              )}
              {imageState?.length === 0 && (
                <Mui.Avatar sx={styles.patientEditIcon} />
              )}
            </Mui.Avatar>
          </Mui.Grid>
          <Mui.Grid item sx={styles.editProfile}>
            <Mui.Avatar sx={styles.editIcon}>
              <EditIcon
                onClick={() => setIsChangeProfile(true)}
                sx={styles.badgeEditIcon}
              />
            </Mui.Avatar>
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Mui.Typography variant="subtitle1" sx={{ color: "primary.main" }}>
            {translate("addProfilePhoto", language)}
          </Mui.Typography>
        </Mui.Grid>
        <UserDetails
          addUserForm={addUserForm}
          listItems={listItems}
          userAddFieldSettings={response}
          getUserDetails={getUserDetails}
        />
        <Mui.Grid container item xs={3} spacing={3} sx={styles.gridContainer}>
          {userAddFieldSettings?.settings?.showDigitalSignature === 1 && (
            <>
              <Mui.Grid
                xs={12}
                container
                item
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Mui.Grid xs={3.5} item>
                  <Mui.Typography sx={styles.signatureTypography}>
                    {translate("digitalSignature", language)}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid xs={5} item>
                  <input
                    aria-label="button"
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    ref={digitalSignatureInput}
                    onChange={(event: any) => {
                      digitalSignatureHandler(event);
                    }}
                    style={{ display: "none" }}
                  />
                  <Common.CellmaButton
                    label={translate("chooseFile", language)}
                    onClick={() => digitalSignatureInput.current?.click()}
                  />
                </Mui.Grid>

                <Mui.Grid xs={3.5} item sx={styles.typographyGrid}>
                  {fileName !== "" ? (
                    <Mui.Tooltip title={fileName}>
                      <Mui.Typography>
                        {fileName?.substring(0, 15)}
                      </Mui.Typography>
                    </Mui.Tooltip>
                  ) : (
                    <Mui.Typography sx={{ fontSize: "14px" }}>
                      {translate("noFileChosen", language)}
                    </Mui.Typography>
                  )}
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid xs={12} item>
                <Mui.Typography>
                  {translate("note", language)}
                  <Mui.Typography sx={styles.noteTypographyGrid}>
                    {translate("fileSizeShould", language)}
                  </Mui.Typography>
                </Mui.Typography>
              </Mui.Grid>
            </>
          )}
          <Mui.Grid xs={12} container item>
            <Mui.TextField
              label={translate("notes", language)}
              fullWidth
              rows="2"
              multiline
              name="notes"
              value={addUserForm.values.notes}
              onChange={addUserForm.handleChange}
              inputProps={{
                maxLength: 2000,
              }}
            />
          </Mui.Grid>
        </Mui.Grid>

        <Mui.Grid container item spacing={3}>
          <Mui.Grid item container xs={12} gap={3}>
            {translate("userGroupsGrouping", language)}
            <Common.CellmaLink
              label={translate("add", language)}
              onClick={() => setIsGrouping(true)}
            >
              {translate("add", language)}
            </Common.CellmaLink>
          </Mui.Grid>
          <Mui.Grid
            item
            sx={{ justifyContent: "space-between", display: "flex" }}
            xs={3}
          >
            <Mui.Typography>
              {" "}
              {translate("isContactsHidden", language)}
            </Mui.Typography>

            <Mui.ToggleButtonGroup
              value={contactsHidden}
              exclusive
              onChange={handleContactsHidden}
            >
              <Mui.ToggleButton
                value
                onClick={() => setIsShowContactsHidden(true)}
                sx={styles.toggleButton}
              >
                {translate("yes", language)}
              </Mui.ToggleButton>
              <Mui.ToggleButton
                value={false}
                onClick={() => setIsShowContactsHidden(false)}
                sx={styles.toggleButton}
              >
                {translate("no", language)}
              </Mui.ToggleButton>
            </Mui.ToggleButtonGroup>
          </Mui.Grid>

          <Mui.Grid
            item
            sx={{ justifyContent: "space-between", display: "flex" }}
            xs={3}
          >
            <Mui.Typography>{translate("userAnHP", language)}</Mui.Typography>

            <Mui.ToggleButtonGroup
              color="primary"
              value={userAnHP}
              exclusive
              onChange={handleUserAnHP}
              aria-label="Platform"
            >
              <Mui.ToggleButton
                value
                onClick={() => setIsShowUserAnHP(true)}
                sx={styles.toggleButton}
              >
                {translate("yes", language)}
              </Mui.ToggleButton>
              <Mui.ToggleButton
                value={false}
                onClick={() => setIsShowUserAnHP(false)}
                sx={styles.toggleButton}
              >
                {translate("no", language)}
              </Mui.ToggleButton>
            </Mui.ToggleButtonGroup>
          </Mui.Grid>
          {isShowUserAnHP && (
            <Mui.Grid
              item
              sx={{ justifyContent: "space-between", display: "flex" }}
              xs={3}
            >
              <Mui.Typography>
                {translate("isUserGoing", language)}
              </Mui.Typography>
              <Mui.ToggleButtonGroup
                color="primary"
                value={goingOnDiary}
                exclusive
                onChange={(event: any, newAlignment: any) =>
                  handleGoingOnDiary(event, newAlignment)
                }
                aria-label="Platform"
              >
                <Mui.ToggleButton value sx={styles.toggleButton}>
                  {translate("yes", language)}
                </Mui.ToggleButton>
                <Mui.ToggleButton
                  value={false}
                  // onClick={handelDiary}
                  sx={styles.toggleButton}
                >
                  {translate("no", language)}
                </Mui.ToggleButton>
              </Mui.ToggleButtonGroup>
            </Mui.Grid>
          )}
        </Mui.Grid>

        {isShowUserAnHP && (
          <UserContactDetails
            userAddFieldSettings={userAddFieldSettings}
            addUserForm={addUserForm}
            listItems={listItems}
          />
        )}
        <Mui.Grid item container spacing={2} xs={12}>
          <Mui.Grid xs={12} item sx={styles.userRoleContainer}>
            <Mui.Typography sx={{ paddingX: "5px" }} variant="h4">
              {translate("userRoles", language)}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid xs={12} item container spacing={2}>
            {selectedUserGroup.map((value: any) => (
              <Mui.Grid item key={value}>
                <Mui.Chip
                  label={value}
                  clickable
                  onDelete={(e) => handleDelete(e, value)}
                >
                  {selectedUserGroup}
                </Mui.Chip>
              </Mui.Grid>
            ))}
            {selectedUserRole.map((value: any) => (
              <Mui.Grid item key={value}>
                <Mui.Chip
                  label={value}
                  clickable
                  onDelete={(e) => handleDelete(e, value)}
                >
                  {selectedUserRole}
                </Mui.Chip>
              </Mui.Grid>
            ))}
          </Mui.Grid>
          <Mui.Grid item sx={{ width: "350px" }}>
            <Common.CellmaSelectFieldWithCheckbox
              label={translate("userRoles", language)}
              value={selectedUserRole}
              placeholder="please select"
              onChange={handleChangeUserRole}
              list={getUserRoles.map((roles: any) => (
                <Mui.MenuItem key={roles?.usgId} value={roles?.usgName}>
                  <Mui.ListItemIcon>
                    <Mui.Checkbox
                      checked={
                        !isUndefinedOrNullOrEmpty(
                          selectedUserRole?.includes(roles?.usgName)
                        )
                          ? selectedUserRole?.includes(roles?.usgName)
                          : ""
                      }
                    />
                  </Mui.ListItemIcon>
                  <Mui.ListItemText primary={roles?.usgName} />
                </Mui.MenuItem>
              ))}
            />
          </Mui.Grid>
        </Mui.Grid>
        <Mui.Grid item container>
          <Mui.Grid item xs={10}>
            <Common.CellmaButton
              variant="contained"
              label={translate("cancel", language)}
              onClick={() => navigate(-1)}
            />
          </Mui.Grid>
          <Mui.Grid item xs={2} sx={styles.saveButtonGrid}>
            <Common.CellmaButton
              variant="contained"
              label={translate("save", language)}
              type="submit"
              onClick={() => {
                if (
                  addUserForm?.errors &&
                  Object.keys(addUserForm?.errors).length !== 0
                ) {
                  window.scrollTo(0, 0);
                }
              }}
            />

            {userRoles.includes("HP Default Appt") &&
              userAddFieldSettings?.settings?.newApptFlow === "1" &&
              goingOnDiary && (
                <Common.CellmaButton
                  label={translate("next", language)}
                  variant="contained"
                  onClick={handelNext}
                  disabled={disableNext}
                />
              )}
          </Mui.Grid>
        </Mui.Grid>

        {/* add profile photo */}

        {isChangeProfile && (
          <Mui.Grid>
            <Common.CellmaPopup
              title={translate("profilePhoto", language)}
              handleCancel={() => {
                setIsChangeProfile(false);
              }}
            >
              <AddUserProfile
                selectedUsername={selectedUsername}
                AddNewPhoto={loadPhoto}
                handleCancel={() => {
                  setIsChangeProfile(false);
                }}
              />
            </Common.CellmaPopup>
          </Mui.Grid>
        )}

        {/* user Grouping popup start */}

        {isGrouping && (
          <Mui.Grid>
            <Common.CellmaPopup
              title={translate("addUserGroups", language)}
              handleCancel={() => {
                setIsGrouping(false);
              }}
            >
              <Mui.Grid container sx={styles.popupGridContainer}>
                <Mui.Grid container>
                  {selectedUserGroup.map((value: any) => (
                    <Mui.Chip
                      sx={{ margin: "5px" }}
                      key={value}
                      label={value}
                      clickable
                      onDelete={(e) => handleDelete(e, value)}
                    />
                  ))}
                </Mui.Grid>
                <Mui.Grid item xs={8} sx={{ paddingY: "10px" }}>
                  <Common.CellmaSelectFieldWithCheckbox
                    label={translate("group", language)}
                    placeholder="please select"
                    value={selectedUserGroup}
                    onChange={handleChangeUserGroup}
                    list={userGroupGroupingsList.map((groupings: any) => (
                      <Mui.MenuItem
                        key={groupings?.uggId}
                        value={groupings?.uggName}
                      >
                        <Mui.ListItemIcon>
                          <Mui.Checkbox
                            checked={
                              !isUndefinedOrNullOrEmpty(
                                selectedUserGroup?.includes(groupings?.uggName)
                              )
                                ? selectedUserGroup?.includes(
                                    groupings?.uggName
                                  )
                                : ""
                            }
                          />
                        </Mui.ListItemIcon>
                        <Mui.ListItemText primary={groupings?.uggName} />
                      </Mui.MenuItem>
                    ))}
                  />
                </Mui.Grid>
                <Mui.Grid item container sx={styles.popupAddButton}>
                  <Common.CellmaButton
                    label={translate("add", language)}
                    onClick={handleChipData}
                  />
                  <Mui.Grid xs={12}>
                    <Mui.Typography>
                      {translate("addGroupPopupNote", language)}
                    </Mui.Typography>
                  </Mui.Grid>
                </Mui.Grid>
              </Mui.Grid>
            </Common.CellmaPopup>
          </Mui.Grid>
        )}
      </Mui.Grid>
    </form>
  );
};

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
  },

  patientEditIcon: {
    height: "150px",
    width: "150px",
  },
  editIcon: {
    backgroundColor: "common.white",
    border: "1px solid ",
    color: "primary.main",
    borderColor: "grey.300",
    height: "25px",
    width: "25px",
  },
  badgeEditIcon: {
    height: "15px",
    width: "15px",
    color: "grey.800",
  },
  editProfile: {
    display: "flex",
    justifyContent: "center",
    ml: "-35px",
    mt: "90px",
  },

  typographyGrid: {
    color: "primary.main",
  },
  noteTypographyGrid: {
    color: "primary.main",
  },
  imageAvatar: { width: 120, height: 120 },
  gridContainer: { display: "flex", alignContent: "flex-start" },

  toggleButton: {
    width: "51px",
    height: "31px",
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "common.white",
      backgroundColor: "primary.main",
    },
  },
  saveButtonGrid: {
    justifyContent: "space-around",
    display: "flex",
    paddingX: "2px",
  },
  popupGridContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "30px",
  },
  popupAddButton: {
    display: "flex",
    justifyContent: "flex-end",
    paddingY: "10px",
  },
  userRoleContainer: { backgroundColor: "primary.light", paddingY: "10px" },
  signatureTypography: {
    display: "flex",
    textAlign: "start",
  },
};

export default AddUserWizard;
