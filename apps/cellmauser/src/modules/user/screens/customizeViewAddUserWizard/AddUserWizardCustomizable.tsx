// Page Name : "addUserWizardCustomizableView"
// Page Id : "c4user6"

import { useEffect, useRef, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import * as Common from "../../../../common/CommonComponentsIndex";
import responseCodeMessages from "../../../../config/ResponseCodeMessages";
import { setSnackbar } from "../../../../store/SnackbarAction";
import ResetToDefaultViewPopup from "../../../patient/common/ResetToDefaultViewPopup";
import useGetApplicationList from "../../api/useApplicationList";
import useGetClinicList from "../../api/useClinicList";
import {
  useAddCustomUserDetails,
  useGetCustomUserDetails,
} from "../../api/useCustomUser";
import { useAddListDetails } from "../../api/useListDetails";
import * as dummyData from "../../assets/dummyData/addUserWizardDummyData";
import translate from "../../assets/translationFiles/addUserWizardTranslation";
import { setIsCustomizeView } from "../../store/UserAction";

const defaultInputFields = [
  { id: 0, name: "username", type: "text", required: 1 },
  {
    id: 1,
    name: "profession",
    type: "select",
    required: 0,
    FormHelperText: "Add List Item",
  },
  { id: 2, name: "active", type: "select", required: 0 },
  { id: 3, name: "password", type: "text", required: 1 },
  { id: 4, name: "userExpiryDate", type: "text", required: 0 },
  { id: 5, name: "subscribed", type: "select", required: 1 },
  { id: 6, name: "confirmPassword", type: "text", required: 1 },
  { id: 7, name: "email", type: "text", required: 1 },
  { id: 8, name: "userResetPassword", type: "select", required: 0 },
  {
    id: 9,
    name: "title",
    type: "select",
    required: 0,
    FormHelperText: "Add List Item",
  },
  { id: 10, name: "mobile", type: "text", required: 0 },
  { id: 11, name: "showOn", type: "text", required: 0 },
  { id: 12, name: "givenName", type: "text", required: 1 },
  { id: 13, name: "familyName", type: "text", required: 1 },
  { id: 14, name: "userService", type: "select", required: 0 },
  { id: 15, name: "mcrnNumber", type: "text", required: 0 },
  { id: 16, name: "userServiceGroup", type: "text", required: 0 },
  { id: 17, name: "upn", type: "text", required: 0 },
];

const defaultInputFieldsNewSet = [
  { id: 0, name: "initials", type: "select", required: 0 },
  { id: 1, name: "local", type: "select", required: 0 },
  { id: 2, name: "promsReason", type: "select", required: 0 },
  { id: 3, name: "promsNumber", type: "text", required: 0 },
  {
    id: 4,
    name: "specialty",
    type: "select",
    required: 0,
    FormHelperText: "Add List Item",
  },
  { id: 5, name: "consultant", type: "select", required: 0 },
  { id: 6, name: "firstConsultation", type: "text", required: 0 },
  { id: 7, name: "promsDoctorSurname", required: 0 },
  { id: 8, name: "show", type: "select", required: 0 },
  { id: 9, name: "consultantCode", type: "text", required: 0 },
  { id: 10, name: "followUpConsultation", type: "text", required: 0 },
  { id: 11, name: "genericHP", type: "select", required: 0 },
  { id: 12, name: "team", type: "select", required: 0 },
  {
    id: 13,
    name: "commissionLevel",
    required: 0,
    type: "select",
    FormHelperText: "Add List Item",
  },
  { id: 14, name: "npiNumber", type: "text", required: 0 },
  { id: 15, name: "sendAppointmentText", type: "select", required: 0 },
];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  // insert props here
}

const AddUserWizardCustomizable: React.FC<Props> = () => {
  const [isListItem, setIsListItem] = useState(false);
  const [updatedList, setUpdatedList] = useState<any>([]);
  const [updatedNewList, setUpdatedNewList] = useState<any>([]);
  const [list, setList] = useState(
    defaultInputFields.sort((a, b) => a.id - b.id)
  );
  const [newList, setNewList] = useState(
    defaultInputFieldsNewSet.sort((a, b) => a.id - b.id)
  );
  const [isResetToDefaultView, setIsResetToDefaultView] = useState(false);

  const { language } = useSelector((state: any) => state.language);
  const draggingPos = useRef<any>(null);
  const dragOverPos = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setTitle, setIsLink, setIsLeftOutlinedIcon } =
    useOutletContext<any>(); // <-- access context value
  const { mutate: addCustomDetails, data: addCustomResponse } =
    useAddCustomUserDetails();
  const { data: getCustomDetailsResponse, isLoading: isCustomDetailsLoading } =
    useGetCustomUserDetails({
      pageName: "add user details",
      domainName: "user",
      displayViewType: "custom",
    });
  const {
    data: getCustomUserGroupDetailsResponse,
    isLoading: isCustomUserGroupDetailsLoading,
  } = useGetCustomUserDetails({
    pageName: "add user group details",
    domainName: "user",
    displayViewType: "custom",
  });

  let displayUserFields: any[] = [];
  const hiddenUserFields: any[] = [];
  const customUserViewJson = {
    customUserViewJson: { displayUserFields, hiddenUserFields },
  };

  let displayUserGroupFields: any[] = [];
  const hiddenUserGroupFields: any[] = [];
  const customUserGroupViewJson = {
    customUserGroupViewJson: { displayUserGroupFields, hiddenUserGroupFields },
  };

  useEffect(() => {
    setTitle(translate("userWizardCustomizable", language));
    setIsLink(false);
    setIsLeftOutlinedIcon(true);
  }, [language]);

  // This function for open Add list item Popup
  const handelAddListItem = () => {
    setIsListItem(true);
  };

  // This function for close Add list item popup
  const closePopup = () => {
    setIsListItem(false);
  };

  // This function for select Dragging start position
  const handleDragStart = (position: any) => {
    draggingPos.current = position;
  };

  // This function for to select item from list
  const handleSelect = (id: any) => {
    setList(list.filter((item: any) => item.id !== id));
    defaultInputFields.forEach((item: any) => {
      if (item.id === id) {
        setUpdatedList([...updatedList, defaultInputFields[id]]);
      }
    });
  };

  // This function for to unselect item from list
  const handleUnselect = (id: any) => {
    setUpdatedList(updatedList.filter((item: any) => item.id !== id));
    defaultInputFields.forEach((item: any) => {
      if (item.id === id) {
        setList([...list, defaultInputFields[id]]);
      }
    });
  };

  // This function for to paste dragged item  to position
  const handleDragEnter = (position: any) => {
    dragOverPos.current = position;
    const newItems = [...list];
    const draggingItem = newItems[draggingPos.current];
    if (!draggingItem) return;

    newItems.splice(draggingPos.current, 1);
    newItems.splice(dragOverPos.current, 0, draggingItem);

    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    draggingPos.current = position;
    dragOverPos.current = null;

    setList(reorderedItems);
  };

  // This function for to select item from New set list
  const handleSelectNewSet = (id: any) => {
    setNewList(newList.filter((item: any) => item.id !== id));
    defaultInputFieldsNewSet.forEach((item: any) => {
      if (item.id === id) {
        setUpdatedNewList([...updatedNewList, defaultInputFieldsNewSet[id]]);
      }
    });
  };

  // This function for to unselect item from New set list
  const handleUnselectNewSet = (id: any) => {
    setUpdatedNewList(updatedNewList.filter((item: any) => item.id !== id));
    defaultInputFieldsNewSet.forEach((item: any) => {
      if (item.id === id) {
        setNewList([...newList, defaultInputFieldsNewSet[id]]);
      }
    });
  };

  // This function for to paste dragged item  to position
  const handleDragEnter2 = (position: any) => {
    dragOverPos.current = position;
    const newItems = [...newList];
    const draggingItem = newItems[draggingPos.current];
    if (!draggingItem) return;

    newItems.splice(draggingPos.current, 1);
    newItems.splice(dragOverPos.current, 0, draggingItem);

    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    draggingPos.current = position;
    dragOverPos.current = null;
    setNewList(reorderedItems);
  };

  // this handel save button of customize page
  const handleCustomize = () => {
    list?.forEach((element: any) => {
      displayUserFields.push({
        id: element.id,
        name: element.name,
        type: element.type,
        required: element.required,
        FormHelperText: element.FormHelperText,
      });
    });

    updatedList?.forEach((element: any, index: any) => {
      hiddenUserFields.push({
        index,
        id: element.id,
        name: element.name,
        type: element.type,
        required: element.required,
        FormHelperText: element.FormHelperText,
      });
    });

    Object.assign(customUserViewJson.customUserViewJson.displayUserFields, {
      customViewJson: displayUserFields,
    });

    Object.assign(customUserViewJson.customUserViewJson.hiddenUserFields, {
      customViewJson: hiddenUserFields,
    });

    addCustomDetails({
      pageName: "add user details",
      domainName: "user",
      displayViewType: "custom",
      displayFieldJson: JSON.stringify(customUserViewJson).toString(),
    });
    displayUserFields = [];
    newList?.forEach((element: any) => {
      displayUserGroupFields.push({
        id: element.id,
        name: element.name,
        type: element.type,
        required: element.required,
        FormHelperText: element.FormHelperText,
      });
    });

    updatedNewList?.forEach((element: any, index: any) => {
      hiddenUserGroupFields.push({
        index,
        id: element.id,
        name: element.name,
        type: element.type,
        required: element.required,
        FormHelperText: element.FormHelperText,
      });
    });

    Object.assign(
      customUserGroupViewJson.customUserGroupViewJson.displayUserGroupFields,
      {
        customViewJson: displayUserGroupFields,
      }
    );

    Object.assign(
      customUserGroupViewJson.customUserGroupViewJson.hiddenUserGroupFields,
      {
        customViewJson: hiddenUserGroupFields,
      }
    );

    addCustomDetails({
      pageName: "add user group details",
      domainName: "user",
      displayViewType: "custom",
      displayFieldJson: JSON.stringify(customUserGroupViewJson).toString(),
    });
    displayUserGroupFields = [];
  };
  useEffect(() => {
    if (addCustomResponse?.status === 200) {
      if (
        addCustomResponse?.data?.validationCode ===
        "customizabledispalyfield.add.success"
      ) {
        dispatch(
          setSnackbar(
            true,
            "success",
            translate(
              responseCodeMessages[addCustomResponse?.data?.validationCode]
                .messageTranslationKey,
              language
            ),
            4
          )
        );
        dispatch(setIsCustomizeView(false));
        navigate(-1);
      }
    }
  }, [addCustomResponse]);

  useEffect(() => {
    if (getCustomDetailsResponse !== undefined) {
      const cdfDisplayFieldJson = JSON.parse(
        getCustomDetailsResponse?.cdfDisplayFieldJson
      );
      setList(cdfDisplayFieldJson?.customUserViewJson?.displayUserFields);
      setUpdatedList(cdfDisplayFieldJson?.customUserViewJson?.hiddenUserFields);
    }
  }, [getCustomDetailsResponse]);

  useEffect(() => {
    if (getCustomUserGroupDetailsResponse !== undefined) {
      const cdfDisplayFieldJson = JSON.parse(
        getCustomUserGroupDetailsResponse?.cdfDisplayFieldJson
      );
      setNewList(
        cdfDisplayFieldJson?.customUserGroupViewJson?.displayUserGroupFields
      );
      setUpdatedNewList(
        cdfDisplayFieldJson?.customUserGroupViewJson?.hiddenUserGroupFields
      );
    }
  }, [getCustomUserGroupDetailsResponse]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { eliID } = useSelector((element: any) => element.user);

  const { data: getClinicList } = useGetClinicList();
  const clinicList = getClinicList ?? [];

  const { data: getApplicationList } = useGetApplicationList();
  const applicationList = getApplicationList ?? [];

  const { mutate: addListDetails } = useAddListDetails();

  const handleSave = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "establishmentlistitem.add.success") {
      closePopup();
    }
  };

  const addToListForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      service: "",
      applicationList: "",
      text: "",
      textOtherLanguage: "",
      codeType: "",
      code: "",
      codeText: "",
    },
    onSubmit: (values: any) => {
      const obj = {
        ...values,
        eliId: eliID,
        eliCliId: values?.service?.cliId ? values?.service?.cliId : "",
        eliAppId: values?.applicationList?.appId
          ? values?.applicationList?.appId
          : "",
        eliText: values?.text ? values?.text : "",
        eliTextOtherLang: values?.textOtherLanguage
          ? values?.textOtherLanguage
          : "",
        codeJson: {
          codCodingSystemCode: values?.code ? values?.code : "",
          codCodingSystemText: values?.codeText ? values?.codeText : "",
          codingSystemCodeType: values?.codeType?.value
            ? values?.codeType?.value
            : "",
        },
      };
      addListDetails(obj, { onSuccess: handleSave });
      addToListForm.resetForm();
    },
  });

  return (
    <>
      {(isCustomDetailsLoading || isCustomUserGroupDetailsLoading) && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress color="primary" disableShrink />
        </Mui.Backdrop>
      )}
      <Mui.Grid container rowGap={2}>
        <Mui.Grid item xs={3}>
          <Common.CellmaInputField
            label={translate("searchAdditionalField", language)}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.profileGridContainer}>
          <Mui.Avatar variant="circular" sx={styles.avatar} />
        </Mui.Grid>
        <Mui.Grid container item spacing={3}>
          {list?.map((item, index) => (
            <Mui.Grid item xs={3} key={item.id} sx={{ mt: "auto", mb: "10px" }}>
              <Mui.Box
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragOver={(event) => event.preventDefault()}
                sx={{
                  "&:hover": {
                    cursor: "grab",
                  },
                }}
              >
                <Mui.Grid container>
                  {item.type === "button" && (
                    <>
                      <Mui.Grid
                        item
                        xs={6}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Mui.Typography>
                          {translate("digitalSignature", language)}
                        </Mui.Typography>
                      </Mui.Grid>
                      <Mui.Grid item xs={6}>
                        <Common.CellmaButton
                          label={translate(item.name, language)}
                          cancelField
                          required={item.required === 1}
                          handleSelect={() => handleSelect(item.id)}
                        />
                      </Mui.Grid>
                    </>
                  )}
                </Mui.Grid>

                {item.type !== "button" && (
                  <Common.CellmaInputField
                    label={translate(item.name, language)}
                    disabled
                    cancelField={item.required !== 1}
                    required={item.required === 1}
                    handleSelect={() => handleSelect(item.id)}
                  />
                )}
              </Mui.Box>
              <Mui.Box>
                {item.FormHelperText && (
                  <Mui.Grid item xs={12} sx={{ marginBottom: "-22px" }}>
                    <Common.CellmaLink
                      label={translate("addListItem", language)}
                      onClick={handelAddListItem}
                    >
                      {item.FormHelperText === "Add List Item" && (
                        <Mui.Typography sx={{ fontSize: "12px" }}>
                          {translate("addListItem", language)}
                        </Mui.Typography>
                      )}
                    </Common.CellmaLink>
                  </Mui.Grid>
                )}
              </Mui.Box>
            </Mui.Grid>
          ))}
          <Mui.Grid />
        </Mui.Grid>

        <Mui.Grid item xs={12} sx={{ marginY: "10px" }}>
          <Mui.Divider />
        </Mui.Grid>

        <Mui.Grid container item spacing={3}>
          {newList?.map((item, index) => (
            <Mui.Grid item xs={3} key={item.id} sx={{ mt: "auto", mb: "10px" }}>
              <Mui.Box
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter2(index)}
                onDragOver={(event) => event.preventDefault()}
                sx={{
                  "&:hover": {
                    cursor: "grab",
                  },
                }}
              >
                <Common.CellmaInputField
                  label={translate(item.name, language)}
                  cancelField={item.required !== 1}
                  required={item.required === 1}
                  disabled
                  handleSelect={() => handleSelectNewSet(item.id)}
                />
              </Mui.Box>

              {item.FormHelperText && (
                <Mui.Grid item xs={12} sx={{ marginBottom: "-22px" }}>
                  <Common.CellmaLink
                    label={translate("addListItem", language)}
                    onClick={handelAddListItem}
                  >
                    {item.FormHelperText === "Add List Item" && (
                      <Mui.Typography sx={{ fontSize: "12px" }}>
                        {translate("addListItem", language)}
                      </Mui.Typography>
                    )}
                  </Common.CellmaLink>
                </Mui.Grid>
              )}
            </Mui.Grid>
          ))}
          <Mui.Grid />
        </Mui.Grid>
        <Mui.Grid container item spacing={3} sx={{ mt: "5px" }}>
          <Mui.Grid item xs={12}>
            <Mui.Typography>
              {translate("removedFields", language)}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={12}>
            <Mui.Divider />
          </Mui.Grid>

          {updatedList?.length !== 0 &&
            updatedList?.map((item: any) => (
              <Mui.Grid item xs={3} key={item?.id}>
                <Mui.Box>
                  {item.type !== "button" && (
                    <Common.CellmaInputField
                      label={translate(item.name, language)}
                      cancelField
                      disabled
                      selected
                      handleSelect={() => handleUnselect(item.id)}
                    />
                  )}

                  <Mui.Grid container>
                    {item.type === "button" && (
                      <>
                        <Mui.Grid item xs={6} sx={{ mt: "17px" }}>
                          <Mui.Typography>
                            {translate("digitalSignature", language)}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={6}>
                          <Common.CellmaButton
                            label={translate(item.name, language)}
                            cancelField
                            required={item.required === 0}
                            selected
                            handleSelect={() => handleUnselect(item.id)}
                          />
                        </Mui.Grid>
                      </>
                    )}
                  </Mui.Grid>
                </Mui.Box>
              </Mui.Grid>
            ))}
          {updatedNewList?.length !== 0 &&
            updatedNewList?.map((item: any) => (
              <Mui.Grid item xs={3} key={item?.id}>
                <Mui.Box>
                  {item.type !== "button" && (
                    <Common.CellmaInputField
                      label={translate(item.name, language)}
                      cancelField
                      disabled
                      selected
                      handleSelect={() => handleUnselectNewSet(item.id)}
                    />
                  )}
                  {item.type === "button" && (
                    <Common.CellmaButton
                      label={translate(item.name, language)}
                      cancelField
                      selected
                      handleSelect={() => handleUnselectNewSet(item.id)}
                    />
                  )}
                </Mui.Box>
              </Mui.Grid>
            ))}

          <Mui.Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Common.CellmaButton
              label={translate("resetToDefaultView", language)}
              onClick={() => setIsResetToDefaultView(true)}
            />
            <Common.CellmaButton
              label={translate("save", language)}
              onClick={handleCustomize}
            />
          </Mui.Grid>
          {isResetToDefaultView && (
            <ResetToDefaultViewPopup
              handleCancel={() => setIsResetToDefaultView(false)}
              handleOk={() => setIsResetToDefaultView(false)}
            />
          )}
        </Mui.Grid>
        {isListItem && (
          <Common.CellmaPopup
            title={translate("addToList", language)}
            handleCancel={() => {
              setIsListItem(false);
            }}
          >
            <form onSubmit={addToListForm.handleSubmit} noValidate>
              <Mui.Grid container sx={styles.popupContainer}>
                <Mui.Grid item xs={12} sx={styles.popup}>
                  <Common.CellmaAutoSelectField
                    label={translate("service", language)}
                    name="service"
                    value={addToListForm?.values?.service ?? ""}
                    options={clinicList ?? ""}
                    getOptionLabel={(service: any) => service?.cliName ?? ""}
                    onChange={(event: any, value: any) => {
                      addToListForm.setFieldValue("service", value);
                    }}
                    renderOption={(props: any, service: any) => (
                      <li {...props}>{service?.cliName}</li>
                    )}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.popup}>
                  <Common.CellmaAutoSelectField
                    label={translate("applicationList", language)}
                    name="applicationList"
                    value={addToListForm?.values?.applicationList ?? ""}
                    options={applicationList ?? ""}
                    getOptionLabel={(userApplicationList: any) =>
                      userApplicationList?.appName ?? ""
                    }
                    onChange={(event: any, value: any) => {
                      addToListForm.setFieldValue("applicationList", value);
                    }}
                    renderOption={(props: any, userApplicationList: any) => (
                      <li {...props}>{userApplicationList?.appName}</li>
                    )}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.popup}>
                  <Common.CellmaInputField
                    label={translate("text", language)}
                    name="text"
                    value={addToListForm.values.text ?? ""}
                    onHandleChange={addToListForm.handleChange}
                    maxLength="100"
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.popup}>
                  <Common.CellmaInputField
                    label={translate("textOtherLanguage", language)}
                    name="textOtherLanguage"
                    value={addToListForm.values.textOtherLanguage ?? ""}
                    onHandleChange={addToListForm.handleChange}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.popup}>
                  <Common.CellmaAutoSelectField
                    label={translate("codeType", language)}
                    name="codeType"
                    value={addToListForm?.values?.codeType ?? ""}
                    options={dummyData.CODE_TYPE ?? ""}
                    getOptionLabel={(userCodeType: any) =>
                      userCodeType?.label ?? ""
                    }
                    onChange={(event: any, value: any) => {
                      addToListForm.setFieldValue("codeType", value);
                    }}
                    renderOption={(props: any, userCodeType: any) => (
                      <li {...props}>{userCodeType?.label}</li>
                    )}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.popup}>
                  <Common.CellmaInputField
                    label={translate("code", language)}
                    name="code"
                    value={addToListForm.values.code ?? ""}
                    onHandleChange={addToListForm.handleChange}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.popup}>
                  <Common.CellmaInputField
                    label={translate("codeText", language)}
                    name="codeText"
                    value={addToListForm.values.codeText ?? ""}
                    onHandleChange={addToListForm.handleChange}
                  />
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid item xs={12} sx={styles.popupButton}>
                <Common.CellmaButton
                  label={translate("save", language)}
                  type="submit"
                />
              </Mui.Grid>
            </form>
          </Common.CellmaPopup>
        )}
      </Mui.Grid>
    </>
  );
};

const styles = {
  popup: { marginY: "10px", marginX: "35px" },
  popupContainer: {
    display: "flex",
    justifyContent: "center",
    paddingX: "100px",
  },
  popupButton: {
    display: "flex",
    justifyContent: "flex-end",
    paddingX: "20px",
  },
  saveButton: { display: "flex", justifyContent: "flex-end" },
  avatar: { width: "120px", height: "120px" },
  profileGridContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "50px",
  },
};

export default AddUserWizardCustomizable;
