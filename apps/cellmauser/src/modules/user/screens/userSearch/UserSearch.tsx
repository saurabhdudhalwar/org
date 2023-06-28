//  Page Name : "userList"
// Page Id : "c4user2"

import { useEffect, useState } from "react";

import * as Mui from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as yup from "yup";

import UserListTable from "./UserListTable";
import * as Common from "../../../../common/CommonComponentsIndex";
import {
  isUndefinedOrNullOrEmpty,
  resetPageNumber,
} from "../../../../utils/GeneralUtils";
import * as validations from "../../../../utils/Validations";
import { useGetUserDetails, useGetUserDisplay } from "../../api/useUser";
import * as dummyData from "../../assets/dummyData/userSearchDummyData";
import translate from "../../assets/translationFiles/usersListsTranslation";
import { setActiveScreenName } from "../../store/UserAction";

const UserSearch = () => {
  const { language } = useSelector((state: any) => state.language);
  const { pageNumber } = useSelector((state: any) => state.patient);
  const { useExport } = useSelector((state: any) => state.user);
  const [isUsers, setIsUsers] = useState(false);
  const [formData, setFormData] = useState<any>();
  const [userCount, setUserCount] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    setTitle,
    setIsLink,
    setDrawerName,
    setScreenName,
  }: { setTitle: any; setIsLink: any; setDrawerName: any; setScreenName: any } =
    useOutletContext(); // <-- access context value

  const { data: getUserDisplayResponse } = useGetUserDisplay();

  const clinicList = getUserDisplayResponse?.clinicList ?? [];
  const settings = getUserDisplayResponse?.settings ?? [];
  const currentActiveUsers =
    !isUndefinedOrNullOrEmpty(
      getUserDisplayResponse?.currentActiveUsersCount
    ) && getUserDisplayResponse?.currentActiveUsersCount;
  const maxLoginAttempts =
    !isUndefinedOrNullOrEmpty(settings?.estFailedLogonThreshold) &&
    settings?.estFailedLogonThreshold;
  const maximumUsers = settings?.estSeatsAvailable;

  useEffect(() => {
    if (useExport === "yes") getUserDetailsRefetch();
  }, []);

  const {
    refetch: getUserDetailsRefetch,
    data: getUserDetailsResponse,
    isLoading: userListLoading,
  } = useGetUserDetails({
    useUsername: formData?.useUsername,
    useFirstname: formData?.useFirstname,
    useSurname: formData?.useSurname,
    useActive: formData?.useActive,
    useCliId: formData?.useCliId?.cliId,
    pageNumber,
    useExport,
  });

  const usersList = getUserDetailsResponse?.usersList ?? [];

  useEffect(() => {
    if (isUsers) {
      getUserDetailsRefetch()
        .then((response: any) => {
          if (response?.data?.userCount)
            setUserCount(response?.data?.userCount);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [formData, pageNumber, getUserDetailsRefetch]);

  useEffect(() => {
    setTitle(translate("usersList", language));
    setIsLink(true);
    setDrawerName("UserDrawer");
    setScreenName("");
    dispatch(setActiveScreenName("userSearch"));
    // eslint-disable-next-line
  }, [language]);

  return (
    <>
      {userListLoading && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress color="primary" disableShrink />
        </Mui.Backdrop>
      )}
      <Formik
        initialValues={{
          useUsername: "",
          useFirstname: "",
          useSurname: "",
          useActive: "",
          useCliId: {},
        }}
        validationSchema={yup.object().shape({})}
        onSubmit={(values: any) => {
          resetPageNumber(dispatch);
          setFormData(values);
          setIsUsers(true);
        }}
      >
        {(data: FormikProps<any>) => {
          return (
            <form onSubmit={data.handleSubmit}>
              <Mui.Grid container spacing={3}>
                <Mui.Grid item container>
                  <Mui.Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                    gap={10}
                  >
                    <Mui.Typography variant="h2">
                      {translate("activeUsers", language)} &nbsp;
                      {currentActiveUsers}
                    </Mui.Typography>
                    <Mui.Typography variant="h2">
                      {translate("maximumUsers", language)} &nbsp;{" "}
                      {maximumUsers}
                    </Mui.Typography>
                  </Mui.Grid>
                </Mui.Grid>

                <Mui.Grid
                  item
                  container
                  spacing={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Mui.Grid item xs={2}>
                    <Common.CellmaInputField
                      label={translate("username", language)}
                      name="useUsername"
                      value={data.values.useUsername}
                      onHandleChange={data.handleChange}
                      onBlur={data.handleBlur}
                      maxLength="40"
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={2}>
                    <Common.CellmaInputField
                      label={translate("givenName", language)}
                      name="useFirstname"
                      value={data.values.useFirstname}
                      onHandleChange={data.handleChange}
                      onBlur={data.handleBlur}
                      maxLength="15"
                      onKeyPress={validations.allowCharHyphenApostropheSpace}
                      onPaste={
                        validations.restrictPasteEventForSpecialCharactersAndNumbersAndSpaces
                      }
                      style={{ textTransform: "capitalize" }}
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={2}>
                    <Common.CellmaInputField
                      label={translate("familyName", language)}
                      name="useSurname"
                      value={data.values.useSurname}
                      onHandleChange={data.handleChange}
                      onBlur={data.handleBlur}
                      maxLength="20"
                      onKeyPress={validations.allowCharHyphenApostropheSpace}
                      onPaste={
                        validations.restrictPasteEventForSpecialCharactersAndNumbers
                      }
                      style={{ textTransform: "capitalize" }}
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={2}>
                    <Common.CellmaAutoSelectField
                      label={translate("userStatus", language)}
                      name="useActive"
                      onChange={(event: any, value: any) => {
                        data.setFieldValue("useActive", value?.value);
                      }}
                      options={dummyData.USER_STATUS}
                      getOptionLabel={(option: any) => option.name}
                      renderOption={(props: any, option: any) => (
                        <li {...props}>{option.name}</li>
                      )}
                    />
                  </Mui.Grid>
                  <Mui.Grid item xs={2}>
                    <Common.CellmaAutoSelectField
                      label={translate("userService", language)}
                      name="useCliId"
                      value={data?.values?.useCliId}
                      onChange={(event: any, value: any) => {
                        data.setFieldValue("useCliId", value);
                      }}
                      options={clinicList}
                      getOptionLabel={(option: any) => option.cliName ?? ""}
                      renderOption={(props: any, option: any) => (
                        <li {...props}>{option.cliName}</li>
                      )}
                    />
                  </Mui.Grid>
                  <Mui.Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    gap={1}
                  >
                    <Common.CellmaButton
                      label={translate("search", language)}
                      type="submit"
                    />
                    <Common.CellmaButton
                      label={translate("addUser", language)}
                      onClick={() =>
                        navigate("/cellmaUser/user/addUserWizard", {
                          state: "addUserList",
                        })
                      }
                    />
                  </Mui.Grid>
                </Mui.Grid>
                {isUsers && (
                  <Mui.Grid item xs={12}>
                    <UserListTable
                      usersList={usersList}
                      listCount={userCount}
                      maxLoginAttempts={maxLoginAttempts}
                    />
                  </Mui.Grid>
                )}
              </Mui.Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default UserSearch;
