// Page Name : "listItemList"
// Page Id : "c4user7"

import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import ClinicLocationAddressPopup from "./ClinicLocationAddressPopup";
import useEstablishmentListItems from "../../../../api/useEstablishmentListItems";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import { isError, resetPageNumber } from "../../../../utils/GeneralUtils";
import useGetApplicationList from "../../api/useApplicationList";
import { useAddCode, useGetCodeDetails } from "../../api/useCode";
import useGetListItemList from "../../api/useGetListItemList";
import * as dummyData from "../../assets/dummyData/addUserWizardDummyData";
import translate from "../../assets/translationFiles/listScreenTranslation";
import {
  setAppId,
  setCliId,
  setCodeId,
  setEliID,
} from "../../store/UserAction";

const ListItemList = () => {
  const [isCodetype, setIsCodeType] = useState(false);
  const [isClinicAddress, setIsClinicAddress] = useState(false);
  const [count, setCount] = useState<any>();
  const [eliId, setEliId] = useState<any>();
  const [applicationList, setApplicationList] = useState("");
  const { setTitle, setScreenName, setDrawerName } = useOutletContext<any>(); // <-- access context value
  const { language } = useSelector((state: any) => state.language);

  const navigate = useNavigate();

  const { data: getResponse } = useGetApplicationList();
  const chooseList = getResponse ?? [];

  const [eliAppId, setEliAppId] = useState<any>();
  const { pageNumber } = useSelector((state: any) => state.patient);
  const dispatch = useDispatch();

  const { codeDetails } = useGetCodeDetails(eliId);

  const { refetch: listItemListRefetch, data: listItemList } =
    useGetListItemList({
      eliAppId: eliAppId || 0,
      pageNo: pageNumber,
    });

  const rows = listItemList?.establishmentListItemList ?? [];

  const chooseForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      eliAppId: "",
    },
    onSubmit: (values: any) => {
      resetPageNumber(dispatch);
      setEliAppId(values?.eliAppId?.appId);
    },
  });

  const { data: establishmentListItem } = useEstablishmentListItems([
    "Profession",
  ]);

  const { mutate: saveCode } = useAddCode();

  const handleReset = () => {
    setEliId("");
    addCodeForm.resetForm();
  };

  const addCodeForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      useProfession: "",
      codCodingSystemCode: "",
      codCodingSystemText: "",
      codingSystemCodeType: "",
      ...codeDetails.codesDetails,
    },
    validationSchema: yup.object().shape({
      codingSystemCodeType: yup
        .object()
        .nullable()
        .required(translate("enterCodeType", language)),
      codCodingSystemCode: yup
        .string()
        .required(translate("enterCode", language)),
    }),
    onSubmit: (values: any) => {
      const obj = {
        eliId: eliId !== undefined ? eliId : "",
        useProfession: values?.useProfession
          ? values?.useProfession?.eliId
          : "",
        codCodingSystemCode: values?.codCodingSystemCode
          ? values?.codCodingSystemCode
          : "",
        codCodingSystemText: values?.codCodingSystemText
          ? values?.codCodingSystemText
          : "",
        codingSystemCodeType: values?.codingSystemCodeType
          ? values?.codingSystemCodeType?.value
          : "",
      };
      if (codeDetails?.codesDetails === undefined) {
        saveCode(obj, {
          onSuccess: (response: any) => {
            if (response.status === 200) {
              handleReset();
            }
          },
        });
      }
      closeCodePopup();
    },
  });
  useEffect(() => {
    if (
      establishmentListItem?.Profession !== null &&
      codeDetails?.userProfessionEliId !== undefined
    ) {
      establishmentListItem?.Profession?.filter((element: any) => {
        if (element.eliId === codeDetails?.userProfessionEliId) {
          addCodeForm.setFieldValue("useProfession", element);
        }
      });
    }
    if (codeDetails?.codesDetails?.codCodingSystemType !== undefined) {
      dummyData?.CODE_TYPE?.filter((element: any) => {
        if (element.value === codeDetails?.codesDetails?.codCodingSystemType) {
          addCodeForm.setFieldValue("codingSystemCodeType", element);
        }
      });
    }
  }, [
    isCodetype,
    establishmentListItem?.Profession,
    codeDetails?.userProfessionEliId,
    codeDetails?.codesDetails?.codingSystemCodeType,
  ]);

  useEffect(() => {
    setTitle(translate("listItemList", language));
    window.scrollTo(0, 0);
    setScreenName("");
    setDrawerName("UserDrawer");
  }, [language]);

  const handelCodePopup = () => {
    setIsCodeType(true);
  };

  const closeCodePopup = () => {
    setEliId("");
    setIsCodeType(false);
  };

  const handelOpenClinicPopup = () => {
    setIsClinicAddress(true);
  };

  const handelCloseClinicPopup = () => {
    setIsClinicAddress(false);
  };

  useEffect(() => {
    listItemListRefetch().then((response) => {
      if (response?.data?.establishmentListItemsCount)
        setCount(response?.data?.establishmentListItemsCount);
    });
  }, [listItemListRefetch, pageNumber, eliAppId]);

  // This function for table header title
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: translate("scope", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 150,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.scope ? params?.row?.scope : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "eliAppName",
      headerName: translate("applicationList", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "codeID",
      headerName: translate("codeID", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Mui.Box sx={styles.viewLink}>
            <Common.CellmaLink
              label={translate("view", language)}
              onClick={() => {
                setEliId(params?.row?.eliId);
                handelCodePopup();
              }}
            >
              {translate("view", language)}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "eliText",
      headerName: translate("text", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "eliNumericValue",
      headerName: translate("numericValue", language),
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 230,
      minWidth: 130,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.eliNumericValue !== null
            ? params?.row?.eliNumericValue
            : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "address",
      headerName: translate("address", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Mui.Box sx={styles.viewLink}>
            <Common.CellmaLink
              label={translate("address", language)}
              onClick={() => {
                handelOpenClinicPopup();
              }}
            >
              {translate("address", language)}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "workList",
      headerName: translate("workList", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 160,
      maxWidth: 270,
      renderCell: (params: any) => (
        <Mui.Typography>
          {params?.row?.workList ? params?.row?.workList : "-"}
        </Mui.Typography>
      ),
    },
    {
      field: "edit",
      headerName: "",
      headerClassName: "tableHeader",
      flex: 1,
      maxWidth: 60,
      minWidth: 60,
      sortable: false,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={styles.iconButton}
            aria-label="edit"
            title="Edit List Item"
            onClick={() => {
              dispatch(setEliID(params?.row?.eliId));
              dispatch(setCliId(params?.row?.eliCliId));
              dispatch(setAppId(params?.row?.eliAppId));
              dispatch(setCodeId(params?.row?.eliCodId));
              navigate("/cellmaUser/user/addToList", {
                state: "editListItem",
              });
            }}
          >
            <EditIcon sx={{ color: "success.dark" }} />
          </Mui.IconButton>
        );
      },
    },
  ];

  return (
    <form onSubmit={chooseForm?.handleSubmit} noValidate>
      <Mui.Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Mui.Grid item xs={3}>
          <Common.CellmaAutoSelectField
            label={translate("choose", language)}
            options={chooseList}
            getOptionLabel={(userChoose: any) => userChoose.appName ?? ""}
            name="eliAppId"
            value={chooseForm?.values?.eliAppId}
            onChange={(event: any, value: any) => {
              chooseForm.setFieldValue("eliAppId", value);
              setApplicationList(value?.appName);
            }}
            renderOption={(props: any, userChoose: any) => (
              <li {...props}>{userChoose.appName}</li>
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={2} sx={styles.filterButtonGrid}>
          <Common.CellmaButton
            label={translate("filter", language)}
            type="submit"
          />
        </Mui.Grid>

        <Mui.Grid item xs={12} sx={{ marginTop: "30px" }}>
          <CellmaTable
            searchField
            rows={rows}
            columns={columns}
            listCount={count}
            getRowId={(row: any) => row?.eliId}
            noRecordsMessage={translate("noDataFound", language)}
          />
        </Mui.Grid>
        <Mui.Grid item xs={12} sx={styles.buttonGrid}>
          <Common.CellmaButton
            label={translate("addListItem", language)}
            type="submit"
            onClick={() => {
              navigate("/cellmaUser/user/addToList", {
                state: "addListItem",
              });
            }}
          />
        </Mui.Grid>
        {/* Add Code PopupStart */}
        {isCodetype && (
          <Mui.Grid>
            <Common.CellmaPopup
              title={translate("addCode", language)}
              handleCancel={() => {
                setIsCodeType(false);
                handleReset();
              }}
            >
              <form onSubmit={addCodeForm.handleSubmit} noValidate>
                <Mui.Grid container sx={styles.popupContainer}>
                  <Mui.Grid item xs={12} sx={styles.popup}>
                    <Common.CellmaAutoSelectField
                      label={translate("codeType", language)}
                      options={dummyData.CODE_TYPE}
                      required
                      disabled={codeDetails?.codesDetails}
                      name="codingSystemCodeType"
                      value={addCodeForm?.values?.codingSystemCodeType}
                      onChange={(event: any, value: any) => {
                        addCodeForm?.setFieldValue(
                          "codingSystemCodeType",
                          value
                        );
                      }}
                      getOptionLabel={(userCodeType: any) =>
                        userCodeType.label ?? ""
                      }
                      renderOption={(props: any, userCodeType: any) => (
                        <li {...props}>{userCodeType.label}</li>
                      )}
                      onBlur={addCodeForm.handleBlur}
                      error={isError(addCodeForm, "codingSystemCodeType")}
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={12} sx={styles.popup}>
                    <Common.CellmaInputField
                      label={translate("code", language)}
                      required
                      name="codCodingSystemCode"
                      disabled={codeDetails?.codesDetails}
                      value={addCodeForm?.values?.codCodingSystemCode}
                      onHandleChange={addCodeForm?.handleChange}
                      onBlur={addCodeForm.handleBlur}
                      errorText={isError(addCodeForm, "codCodingSystemCode")}
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={12} sx={styles.popup}>
                    <Common.CellmaInputField
                      label={translate("codeText", language)}
                      name="codCodingSystemText"
                      disabled={codeDetails?.codesDetails}
                      value={addCodeForm?.values?.codCodingSystemText}
                      onHandleChange={addCodeForm?.handleChange}
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={12} sx={styles.popup}>
                    <Common.CellmaAutoSelectField
                      label={translate("profession", language)}
                      options={establishmentListItem?.Profession}
                      name="useProfession"
                      value={addCodeForm?.values?.useProfession}
                      onChange={(event: any, value: any) => {
                        addCodeForm?.setFieldValue("useProfession", value);
                      }}
                      getOptionLabel={(userProfession: any) =>
                        userProfession.eliText ?? ""
                      }
                      renderOption={(props: any, userProfession: any) => (
                        <li {...props}>{userProfession.eliText}</li>
                      )}
                    />
                  </Mui.Grid>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.popupButton}>
                  <Common.CellmaButton
                    type="submit"
                    label={translate("save", language)}
                    disabled={codeDetails?.codesDetails}
                  />
                </Mui.Grid>
              </form>
            </Common.CellmaPopup>
          </Mui.Grid>
        )}

        {/* Add code for clinic Loaction Address Popup  */}
        {isClinicAddress && (
          <ClinicLocationAddressPopup
            handelCloseClinicPopup={handelCloseClinicPopup}
          />
        )}
      </Mui.Grid>
    </form>
  );
};

const styles = {
  buttonGrid: { display: "flex", justifyContent: "flex-end" },
  filterButtonGrid: {
    display: "flex",
    justifyContent: "center",
  },
  iconButton: { display: "flex", justifyContent: "center", width: "100%" },
  viewLink: { display: "flex", justifyContent: "left", width: "100%" },
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
};

export default ListItemList;
