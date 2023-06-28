// Page Name : "addToList"
// Page Id : "c4user8"

import { useEffect, useRef, useState } from "react";

import * as Mui from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import {
  isError,
  isUndefinedOrNullOrEmpty,
} from "../../../../utils/GeneralUtils";
import { validateFileType } from "../../../../utils/Validations";
import useGetApplicationList from "../../api/useApplicationList";
import useGetClinicList from "../../api/useClinicList";
import { useUpdateCodeDetails } from "../../api/useCode";
import {
  useAddListDetails,
  useGetListDetails,
  useUpdateListDetails,
} from "../../api/useListDetails";
import * as dummyData from "../../assets/dummyData/addUserWizardDummyData";
import translate from "../../assets/translationFiles/listScreenTranslation";

const GridItem = (props: any) => {
  return (
    <Mui.Grid
      container
      item
      xs={12 / 4}
      sx={{ display: "flex", alignContent: "baseline" }}
    >
      <Mui.Grid item xs={12}>
        {props.children}
      </Mui.Grid>
    </Mui.Grid>
  );
};

const AddToList = () => {
  const { language } = useSelector((state: any) => state.language);
  const { setTitle, setScreenName, setDrawerName } = useOutletContext<any>(); // <-- access context value
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { eliID, cliID, appID } = useSelector((element: any) => element.user);

  const { data: getClinicList } = useGetClinicList();
  const clinicList = getClinicList ?? [];

  const { data: getApplicationList } = useGetApplicationList();
  const applicationList = getApplicationList ?? [];

  const { mutate: addListDetails } = useAddListDetails();

  const { refetch: getListDetailsRefetch, data: listDetails } =
    useGetListDetails({
      eliId: parseInt(eliID, 10),
    });

  const { mutate: updateListDetails } = useUpdateListDetails();

  const { mutate: updateCodeDetails } = useUpdateCodeDetails();

  const addToListMapImageInput = useRef<HTMLInputElement | null | any>(null);
  const addToListButtonImageInput = useRef<HTMLInputElement | null | any>(null);
  const [mapImageFile, setMapImageFile] = useState("");
  const [buttonImageFile, setButtonImageFile] = useState("");
  const loadFile = (event: any) => {
    if (event.target.files) {
      const file = event.target.files[0];

      const allowedFileTypes = ["jpg", "png", "gif", "jpeg"];
      return validateFileType(file, allowedFileTypes);
    }
  };
  useEffect(() => {
    setTitle(translate("addToList", language));
    window.scrollTo(0, 0);
    setScreenName("");
    setDrawerName("UserDrawer");
    if (!isUndefinedOrNullOrEmpty(applicationList)) {
      applicationList?.filter((element: any) => {
        if (element?.appId === Number(appID)) {
          addToListForm.setFieldValue("applicationList", element);
        }
        if (state === "addListItem") {
          addToListForm.setFieldValue(
            "applicationList",
            {
              appId: 486,
              appName: "Accomodation Type",
            },
            true
          );
          addToListForm.setFieldTouched("applicationList", true, true);
        }
      });
    }
  }, [language]);

  const handleSave = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "establishmentlistitem.add.success") {
      addToListForm?.resetForm();
      navigate("/cellmaUser/user/listItemList");
    }
  };

  const handleUpdate = (response: any) => {
    const responseCode = response?.data?.validationCode;
    if (responseCode === "establishment.list.item.update.success") {
      addToListForm?.resetForm();
      navigate("/cellmaUser/user/listItemList");
    }
  };

  useEffect(() => {
    if (!isUndefinedOrNullOrEmpty(eliID)) {
      getListDetailsRefetch();
    }
  }, [getListDetailsRefetch, eliID]);

  const addToListForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      service: state === "editListItem" ?? "",
      applicationList: state === "editListItem" ?? "",
      text:
        state === "editListItem"
          ? listDetails?.establishmentListItem?.eliText
          : "",
      textOtherLanguage:
        state === "editListItem"
          ? listDetails?.establishmentListItem?.eliTextOtherLang
          : "",
      code:
        state === "editListItem"
          ? listDetails?.establishmentListItem?.codeJson?.codCodingSystemCode
          : "",
      codeText:
        state === "editListItem"
          ? listDetails?.establishmentListItem?.codeJson?.codCodingSystemText
          : "",
      codeType: state === "editListItem" ?? "",
      numericValue:
        state === "editListItem"
          ? listDetails?.establishmentListItem?.eliNumericValue
          : "",
      hexColour: "",
      mapImage: null,
    },
    validationSchema: yup.object().shape({
      text: yup.string().required(translate("textRequired", language)),
      code: yup.string().when([], {
        is: () => Object.keys(addToListForm?.values?.codeType).length !== 0,
        then: yup.string().required(translate("codeRequired", language)),
        otherwise: yup.string().notRequired(),
      }),
      codeType: yup
        .object()
        .nullable()
        .when([], {
          is: () => addToListForm?.values?.code,
          then: yup
            .object()
            .nullable()
            .required(translate("codeTypeRequired", language)),
          otherwise: yup.object().nullable().notRequired(),
        }),
    }),
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
        eliNumericValue: values?.numericValue ? values?.numericValue : "",
        codeJson: {
          eliId: listDetails?.establishmentListItem?.eliId ?? "",
          codId: listDetails?.establishmentListItem?.codeJson?.codId ?? "",
          codCodingSystemCode: values?.code ? values?.code : "",
          codCodingSystemText: values?.codeText ? values?.codeText : "",
          codingSystemCodeType: values?.codeType?.value
            ? values?.codeType?.value
            : "",
        },
      };
      if (state === "addListItem") {
        addListDetails(obj, { onSuccess: handleSave });
      } else if (state === "editListItem") {
        updateListDetails(obj, { onSuccess: handleUpdate });
        updateCodeDetails(obj?.codeJson);
      }
    },
  });

  useEffect(() => {
    if (state === "editListItem") {
      if (
        !isUndefinedOrNullOrEmpty(
          listDetails?.establishmentListItem?.codeJson?.codingSystemCodeType
        )
      ) {
        dummyData?.CODE_TYPE?.filter((element: any) => {
          if (
            element.value ===
            listDetails?.establishmentListItem?.codeJson?.codingSystemCodeType
          ) {
            addToListForm.setFieldValue("codeType", element);
          }
        });
      }

      if (!isUndefinedOrNullOrEmpty(clinicList)) {
        clinicList?.filter((element: any) => {
          if (element?.cliId === Number(cliID)) {
            addToListForm.setFieldValue("service", element);
          }
        });
      }

      if (!isUndefinedOrNullOrEmpty(applicationList)) {
        applicationList?.filter((element: any) => {
          if (element?.appId === Number(appID)) {
            addToListForm.setFieldValue("applicationList", element);
          }
        });
      }
    }
  }, [
    addToListForm?.values?.service,
    addToListForm?.values?.applicationList,
    addToListForm?.values?.codeType,
  ]);

  return (
    <form onSubmit={addToListForm.handleSubmit} noValidate>
      <Mui.Grid container spacing={3}>
        <GridItem>
          <Common.CellmaAutoSelectField
            label={translate("service", language)}
            name="service"
            value={addToListForm?.values?.service ?? ""}
            options={clinicList}
            getOptionLabel={(service: any) => service?.cliName ?? ""}
            onChange={(event: any, value: any) => {
              addToListForm.setFieldValue("service", value);
            }}
            renderOption={(props: any, service: any) => (
              <li {...props}>{service?.cliName}</li>
            )}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            label={translate("applicationList", language)}
            name="applicationList"
            value={addToListForm?.values?.applicationList ?? ""}
            options={applicationList}
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
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("text", language)}
            required
            name="text"
            value={addToListForm.values.text ?? ""}
            onHandleChange={addToListForm?.handleChange}
            maxLength="100"
            onBlur={addToListForm?.handleBlur}
            errorText={isError(addToListForm, "text")}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("textOtherLanguage", language)}
            name="textOtherLanguage"
            value={addToListForm.values.textOtherLanguage ?? ""}
            onHandleChange={addToListForm.handleChange}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("numericValue", language)}
            name="numericValue"
            value={addToListForm.values.numericValue ?? ""}
            onHandleChange={addToListForm.handleChange}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaAutoSelectField
            label={translate("codeType", language)}
            name="codeType"
            required={addToListForm?.values?.code}
            value={addToListForm?.values?.codeType ?? ""}
            options={dummyData.CODE_TYPE}
            getOptionLabel={(userCodeType: any) => userCodeType?.label ?? ""}
            onChange={(event: any, value: any) => {
              addToListForm.setFieldValue("codeType", value);
            }}
            onBlur={addToListForm?.handleBlur}
            error={isError(addToListForm, "codeType")}
            renderOption={(props: any, userCodeType: any) => (
              <li {...props}>{userCodeType?.label}</li>
            )}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("code", language)}
            required={Object.keys(addToListForm?.values?.codeType).length !== 0}
            name="code"
            value={addToListForm.values.code ?? ""}
            onHandleChange={addToListForm.handleChange}
            onBlur={addToListForm?.handleBlur}
            errorText={isError(addToListForm, "code")}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("codeText", language)}
            name="codeText"
            value={addToListForm.values.codeText ?? ""}
            onHandleChange={addToListForm.handleChange}
          />
        </GridItem>
        <GridItem>
          <Common.CellmaInputField
            label={translate("hexColour", language)}
            name="hexColour"
            value={addToListForm.values.hexColour ?? ""}
            onHandleChange={addToListForm.handleChange}
          />
        </GridItem>

        <Mui.Grid item container xs={12 / 4}>
          <Mui.Grid item xs={5} sx={{ alignItems: "center", display: "flex" }}>
            <Mui.Typography variant="h3">
              {translate("mapImage", language)}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={7} sx={styles.fileChoseButtonText}>
            <input
              aria-label="mapImageAddToList"
              type="file"
              accept=".jpg,.png,.gif,.jpeg"
              ref={addToListMapImageInput}
              style={{ display: "none" }}
              onChange={(event: any) => {
                const validateFile = loadFile(event);
                if (validateFile !== "" && validateFile !== undefined) {
                  setMapImageFile("");
                  addToListMapImageInput.current.value = "";
                  dispatch(
                    setSnackbar(
                      true,
                      "warning",
                      translate(validateFile, language),
                      4
                    )
                  );
                } else {
                  addToListForm?.setFieldValue(
                    "mapImage",
                    event.target.files[0]
                  );
                  if (event.target.files[0].name.length > 25) {
                    setMapImageFile(`${event.target.files[0].name.toString()}`);
                  } else {
                    setMapImageFile(event.target.files[0].name);
                  }
                }
              }}
            />
            <Common.CellmaButton
              marginY="0px"
              label={translate("chooseFile", language)}
              onClick={() => addToListMapImageInput.current?.click()}
            />{" "}
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.fileChoseButtonText}>
            {mapImageFile !== "" ? (
              <Mui.Tooltip title={mapImageFile}>
                <Mui.Typography>
                  {mapImageFile?.substring(0, 15)}
                </Mui.Typography>
              </Mui.Tooltip>
            ) : (
              <Mui.Typography variant="h5" color="primary.main">
                {translate("noFileChosen", language)}
              </Mui.Typography>
            )}
          </Mui.Grid>
        </Mui.Grid>

        <Mui.Grid item container xs={12 / 4}>
          <Mui.Grid item xs={5} sx={{ alignItems: "center", display: "flex" }}>
            <Mui.Typography variant="h3">
              {translate("buttonImage", language)}
            </Mui.Typography>
          </Mui.Grid>
          <Mui.Grid item xs={7} sx={styles.fileChoseButtonText}>
            <input
              aria-label="buttonImageAddToList"
              type="file"
              accept=".jpg,.png,.gif,.jpeg"
              ref={addToListButtonImageInput}
              style={{ display: "none" }}
              onChange={(event: any) => {
                const validateFile = loadFile(event);
                if (validateFile !== "" && validateFile !== undefined) {
                  setButtonImageFile("");
                  addToListButtonImageInput.current.value = "";
                  dispatch(
                    setSnackbar(
                      true,
                      "warning",
                      translate(validateFile, language),
                      4
                    )
                  );
                } else {
                  addToListForm?.setFieldValue(
                    "buttonImage",
                    event.target.files[0]
                  );
                  if (event.target.files[0].name.length > 25) {
                    setButtonImageFile(
                      `${event.target.files[0].name.toString()}`
                    );
                  } else {
                    setButtonImageFile(event.target.files[0].name);
                  }
                }
              }}
            />
            <Common.CellmaButton
              marginY="0px"
              label={translate("chooseFile", language)}
              onClick={() => addToListButtonImageInput.current?.click()}
            />{" "}
          </Mui.Grid>
          <Mui.Grid item xs={12} sx={styles.fileChoseButtonText}>
            {buttonImageFile !== "" ? (
              <Mui.Tooltip title={buttonImageFile}>
                <Mui.Typography>
                  {buttonImageFile?.substring(0, 15)}
                </Mui.Typography>
              </Mui.Tooltip>
            ) : (
              <Mui.Typography variant="h5" color="primary.main">
                {translate("noFileChosen", language)}
              </Mui.Typography>
            )}
          </Mui.Grid>
        </Mui.Grid>

        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Common.CellmaButton
            label={translate("save", language)}
            type="submit"
          />
        </Mui.Grid>
      </Mui.Grid>
    </form>
  );
};

export const styles = {
  fileChoseButtonText: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default AddToList;
