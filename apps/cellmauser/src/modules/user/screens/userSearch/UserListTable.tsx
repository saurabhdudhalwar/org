import React, { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import * as Mui from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { UserExportList } from "./UserExportList";
import CellmaTable from "../../../../common/CellmaTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import PASSWORD_REGEX from "../../../../utils/RegExpressions";
import { restrictSpaceAtStart } from "../../../../utils/Validations";
import { setPageNumber } from "../../../patient/store/PatientAction";
import useResetPassword from "../../api/useResetPassword";
import * as dummyData from "../../assets/dummyData/userSearchDummyData";
import translate from "../../assets/translationFiles/usersListsTranslation";
import { setSelectedUsername, setUseExport } from "../../store/UserAction";

interface Props {
  // insert props
  usersList: any;
  listCount: any;
  maxLoginAttempts: any;
}

const UserListTable: React.FC<Props> = (props) => {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const { language } = useSelector((state: any) => state.language);
  const { selectedUsername } = useSelector((element: any) => element.user);
  const { userRoles } = useSelector((element: any) => element.auth);
  const [value, setValue] = useState("");
  const [nextLoginValue] = useState({ id: 2, name: "No" });
  const [isExport, setIsExport] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // Api call reset user password
  const { mutate: resetPassword } = useResetPassword();

  const handleClose = () => {
    setOpen(false);
  };
  const columns: GridColDef[] = [
    {
      field: "useUsername",
      headerName: translate("username", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Tooltip title={params?.row?.useUsername}>
          <Mui.Typography>
            {params?.row?.useUsername ? params?.row?.useUsername : "-"}
          </Mui.Typography>
        </Mui.Tooltip>
      ),
    },
    {
      field: "useFirstname",
      headerName: translate("givenName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Tooltip title={params?.row?.useFirstname}>
          <Mui.Typography>
            {params?.row?.useFirstname ? params?.row?.useFirstname : "-"}
          </Mui.Typography>
        </Mui.Tooltip>
      ),
    },
    {
      field: "useSurname",
      headerName: translate("familyName", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 100,
      renderCell: (params: any) => (
        <Mui.Tooltip title={params?.row?.useSurname}>
          <Mui.Typography>
            {params?.row?.useSurname ? params?.row?.useSurname : "-"}
          </Mui.Typography>
        </Mui.Tooltip>
      ),
    },
    {
      field: "col3",
      headerName: translate("userService", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Tooltip title={params?.row?.cliName}>
          <Mui.Typography>
            {params?.row?.cliName ? params?.row?.cliName : "-"}
          </Mui.Typography>
        </Mui.Tooltip>
      ),
    },
    {
      field: "useProfession",
      headerName: translate("profession", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Mui.Tooltip title={params?.row?.useProfession}>
          <Mui.Typography>
            {params?.row?.useProfession ? params?.row?.useProfession : "-"}
          </Mui.Typography>
        </Mui.Tooltip>
      ),
    },
    {
      field: "useActive",
      headerName: translate("active", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,

      renderCell: (params) => {
        return (
          <CircleIcon
            sx={{
              color: params?.row?.useActive === 1 ? "success.dark" : "grey.400",
              fontSize: "10px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          />
        );
      },
    },
    {
      field: "col6",
      headerName: translate("locked", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      renderCell: (params: any) => (
        <Mui.Typography>
          {props?.maxLoginAttempts - params?.row?.useLoginAttempts <= 0
            ? "Yes"
            : "No"}
        </Mui.Typography>
      ),
    },
    {
      field: "col7",
      headerName: translate("resetPassword", language),
      headerClassName: "tableHeader",
      flex: 10,
      minWidth: 70,
      maxWidth: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <Mui.Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Common.CellmaLink
              label={translate("reset", language)}
              onClick={(e: any) => {
                e.stopPropagation(); // don't select this row after clicking
                dispatch(setSelectedUsername(params?.row?.useUsername));
                setIsResetPassword(true);
              }}
            >
              {translate("reset", language)}
            </Common.CellmaLink>
          </Mui.Box>
        );
      },
    },
    {
      field: "useLoggedIn",
      headerName: translate("online", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      renderCell: (params) => {
        return params?.row?.useLoggedIn === 1 ? (
          <DoneIcon
            sx={{
              color: "success.dark",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          />
        ) : (
          <CloseIcon
            sx={{
              color: "error.dark",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          />
        );
      },
    },
    {
      field: "col9",
      headerName: translate("edit", language),
      headerClassName: "tableHeader",
      flex: 1,
      minWidth: 60,
      maxWidth: 70,
      sortable: false,
      renderCell: (params) => {
        return (
          <Mui.IconButton
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            aria-label="edit"
            title={translate("edit", language)}
            onClick={(e: any) => {
              e.stopPropagation(); // don't select this row after clicking
            }}
          >
            <EditIcon
              sx={{ color: "success.dark" }}
              onClick={() => {
                dispatch(setSelectedUsername(params?.row?.useUsername));
                navigate("/cellmaUser/user/addUserWizard", {
                  state: "editUserList",
                });
              }}
            />
          </Mui.IconButton>
        );
      },
    },
  ];
  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12}>
        <CellmaTable
          searchField
          rows={props?.usersList}
          columns={columns}
          listCount={props?.listCount}
          getRowId={(row: any) => row.useUsername}
          noRecordsMessage={translate("noUserFound", language)}
        />
      </Mui.Grid>
      <Mui.Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Common.CellmaButton
          label={translate("exportList", language)}
          onClick={() => {
            dispatch(setPageNumber(1));
            dispatch(setUseExport("yes"));
            if (props?.listCount > 1000) {
              setOpen(true);
            } else {
              setIsExport(true);
            }
          }}
        />
      </Mui.Grid>
      {isResetPassword && (
        <Mui.Backdrop open>
          <Common.CellmaPopup
            title={translate("resetPassword", language)}
            handleCancel={() => {
              setIsResetPassword(false);
              setIsShowPassword(false);
              setIsShowConfirmPassword(false);
            }}
          >
            <Mui.Box>
              <Formik
                initialValues={{
                  newPassword: "",
                  confirmPassword: "",
                  nextLogin: nextLoginValue,
                }}
                validationSchema={yup.object().shape({
                  newPassword: yup
                    .string()
                    .required(translate("newPasswordRequired", language))
                    .min(8, translate("minCharacterPassword", language))
                    .matches(
                      PASSWORD_REGEX,
                      translate("validatePassword", language)
                    ),
                  confirmPassword: yup
                    .string()
                    .oneOf(
                      [yup.ref("newPassword"), null],
                      translate("confirmPasswordValMsg", language)
                    )
                    .required(translate("confirmPasswordRequired", language))
                    .min(8, translate("minCharacterConfirmPassword", language))
                    .matches(
                      PASSWORD_REGEX,
                      translate("validateConfirmPassword", language)
                    ),
                })}
                onSubmit={(values: any) => {
                  resetPassword(
                    {
                      useUsername: selectedUsername,
                      usePassword: values.confirmPassword,
                      useResetPasswordOnLogin: values.nextLogin.name,
                    },
                    {
                      onSuccess: (response: any) => {
                        if (response.status === 200) {
                          if (
                            response?.data?.validationCode ===
                            "user.password.resetsuccess"
                          )
                            setIsResetPassword(false);
                        }
                      },
                    }
                  );
                  setIsShowPassword(false);
                  setIsShowConfirmPassword(false);
                  if (value === "Yes") {
                    setValue("Yes");
                  } else {
                    setValue("No");
                  }
                }}
              >
                {(data: FormikProps<any>) => {
                  return (
                    <form onSubmit={data.handleSubmit}>
                      <Mui.Grid
                        container
                        spacing={3}
                        sx={styles.popupGridContainer}
                      >
                        <Mui.Grid item xs={12}>
                          <Mui.Typography
                            variant="h2"
                            sx={{ display: "flex", justifyContent: "left" }}
                          >
                            {translate("changePasswordFor", language)}
                            {selectedUsername}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={12}>
                          <Mui.Typography
                            variant="h2"
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            {translate("passwordMessage", language)}
                          </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={12} sm={7}>
                          <Common.CellmaInputField
                            type={!isShowPassword ? "password" : "text"}
                            label={translate("newPassword", language)}
                            name="newPassword"
                            endIcon={
                              !isShowPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )
                            }
                            autoComplete="off"
                            value={data.values.newPassword}
                            onHandleChange={data.handleChange}
                            onBlur={data.handleBlur}
                            onKeyPress={restrictSpaceAtStart}
                            errorText={
                              data.touched.newPassword &&
                              data.errors.newPassword
                            }
                            handleClick={() =>
                              setIsShowPassword(!isShowPassword)
                            }
                          />
                        </Mui.Grid>
                        <Mui.Grid item xs={12} sm={7}>
                          <Common.CellmaInputField
                            type={!isShowConfirmPassword ? "password" : "text"}
                            label={translate("confirmPassword", language)}
                            name="confirmPassword"
                            endIcon={
                              !isShowConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )
                            }
                            autoComplete="off"
                            value={data.values.confirmPassword}
                            onHandleChange={data.handleChange}
                            onBlur={data.handleBlur}
                            onKeyPress={restrictSpaceAtStart}
                            errorText={
                              data.touched.confirmPassword &&
                              data.errors.confirmPassword
                            }
                            handleClick={() =>
                              setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                          />
                        </Mui.Grid>
                        <Mui.Grid item xs={12} sm={7}>
                          <Common.CellmaAutoSelectField
                            label={translate("nextLogin", language)}
                            name="nextLogin"
                            value={data?.values?.nextLogin}
                            onBlur={data.handleBlur}
                            onChange={(event: any, value: any) => {
                              data.setFieldValue("nextLogin", value);
                            }}
                            options={dummyData.PATIENT_MARK}
                            getOptionLabel={(option: any) => option.name}
                            renderOption={(props: any, option: any) => (
                              <li {...props}>{option.name}</li>
                            )}
                          />
                        </Mui.Grid>
                      </Mui.Grid>
                      <Mui.Grid container item xs={12}>
                        <Mui.Grid item xs={12} sx={styles.popupButton}>
                          <Common.CellmaButton
                            label={translate("save", language)}
                            type="submit"
                            disabled={!(data.dirty && data.isValid)}
                          />
                        </Mui.Grid>
                      </Mui.Grid>
                    </form>
                  );
                }}
              </Formik>
            </Mui.Box>
          </Common.CellmaPopup>
        </Mui.Backdrop>
      )}
      {open && (
        <Common.CellmaPopup
          title={translate("exportRecords", language)}
          handleCancel={handleClose}
        >
          <Mui.Grid container sx={{ padding: "20px" }}>
            <Mui.Grid item>
              <Mui.Typography variant="h3">
                {translate("exportRecordMessage", language)}
              </Mui.Typography>
            </Mui.Grid>
            <Mui.Grid
              item
              container
              xs={12}
              spacing={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Mui.Grid item>
                <Common.CellmaButton
                  label={translate("ok", language)}
                  onClick={() => {
                    setIsExport(true);
                  }}
                />
              </Mui.Grid>
              <Mui.Grid item>
                <Common.CellmaButton
                  onClick={handleClose}
                  label={translate("cancel", language)}
                />
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Grid>
        </Common.CellmaPopup>
      )}
      {(userRoles.includes("User Admin") ||
        userRoles.includes("Administrator")) &&
        isExport && (
          <UserExportList
            usersList={props?.usersList}
            listCount={props?.listCount}
            handleCancel={() => {
              setOpen(false);
              setIsExport(false);
              dispatch(setUseExport("no"));
              dispatch(setPageNumber(1));
            }}
          />
        )}
    </Mui.Grid>
  );
};

export const styles = {
  popupGridContainer: {
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

export default UserListTable;
