import { useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import useCountriesLists from "../../../api/useCountriesList";
import useEstablishmentListItems from "../../../api/useEstablishmentListItems";
import * as Common from "../../../common/CommonComponentsIndex";
import informationSnackbar from "../../../utils/InformationCodeHandler";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import { useAddPatientIdentifier } from "../api/usePatientIdentifierDetails";
import translate from "../assets/translationFiles/commonPatientTranslation";

const AddPatientUniqueIdentifier = (props: any) => {
  const [uniqueIdentificationValue, setUniqueIdentificationValue] =
    useState(null);
  const [uniqueIdentificationNumber, setUniqueIdentificationNumber] =
    useState("");
  const [uniqueIdentificationCountry, setUniqueIdentificationCountry] =
    useState(null);

  const [photoIdentificationValue, setPhotoIdentificationValue] =
    useState(null);
  const [photoIdentificationNumber, setPhotoIdentificationNumber] =
    useState("");
  const [photoIdentificationCountry, setPhotoIdentificationCountry] =
    useState(null);

  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const ClearInputFields = () => {
    setPhotoIdentificationNumber("");
    setUniqueIdentificationNumber("");
    setUniqueIdentificationValue(null);
    setUniqueIdentificationCountry(null);
    setPhotoIdentificationValue(null);
    setPhotoIdentificationCountry(null);
  };

  const { data: countryList } = useCountriesLists();
  const { data: listItems } = useEstablishmentListItems([
    "patient identifiers",
  ]);
  const { mutate: addPatientIdentifier, isLoading: patientIdentifierLoading } =
    useAddPatientIdentifier();

  return (
    <Mui.Grid container spacing={2}>
      {patientIdentifierLoading && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress />
        </Mui.Backdrop>
      )}
      <Mui.Grid
        item
        container
        columnSpacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Mui.Grid item xs={3.5}>
          <Common.CellmaSelectField
            label={translate("uniqueIdentification", language)}
            name="uniqueIdentification"
            ariaLabel="uniqueIdentification"
            value={uniqueIdentificationValue}
            changeevent={(event: any) => {
              setUniqueIdentificationValue(event.target.value);
            }}
            list={listItems?.["patient identifiers"]?.map(
              (patientWeb: any) =>
                patientWeb.eliIdentifierType !==
                  "Photographic Identification" &&
                patientWeb.eliIdentifierType !== null && (
                  <Mui.MenuItem
                    key={patientWeb.eliId}
                    value={patientWeb.eliId}
                    sx={{ whiteSpace: "unset" }}
                  >
                    {patientWeb.eliText}
                  </Mui.MenuItem>
                )
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={3.5}>
          <Common.CellmaInputField
            label={translate("number", language)}
            ariaLabel="numberUnique"
            value={uniqueIdentificationNumber}
            onHandleChange={(event: any) => {
              setUniqueIdentificationNumber(event.target.value);
            }}
          />
        </Mui.Grid>
        <Mui.Grid item xs={3.5}>
          <Common.CellmaSelectField
            label={translate("issuingCountry", language)}
            name="issuingCountry"
            ariaLabel="issuingCountryUnique"
            value={uniqueIdentificationCountry}
            changeevent={(event: any) => {
              setUniqueIdentificationCountry(event.target.value);
            }}
            list={countryList?.map((patientWeb: any) => (
              <Mui.MenuItem
                key={patientWeb.couId}
                value={patientWeb.couId}
                sx={{ whiteSpace: "unset" }}
              >
                {patientWeb.couCountry}
              </Mui.MenuItem>
            ))}
          />
        </Mui.Grid>
        <Mui.Grid
          item
          xs={1.5}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Common.CellmaButton
            label={translate("add", language)}
            disabled={
              uniqueIdentificationValue === null ||
              uniqueIdentificationNumber === "" ||
              !uniqueIdentificationNumber ||
              uniqueIdentificationCountry === null
            }
            onClick={() => {
              if (uniqueIdentificationCountry && uniqueIdentificationValue)
                addPatientIdentifier(
                  {
                    pidTypeEliId: uniqueIdentificationValue,
                    pidPatId: props?.patientId,
                    pidValue: uniqueIdentificationNumber,
                    pidIssuingCountryCode: uniqueIdentificationCountry,
                  },
                  {
                    onSuccess: (response: any) => {
                      ClearInputFields();
                      if (
                        response?.data?.validationCode ===
                        "patient.identifier.add.success"
                      ) {
                        dispatchSnackbar(response, dispatch, language);
                        props?.getPatientDetailsRefetch();
                      } else if (
                        response?.data?.validationCode ===
                        "patient.identifier.add.fail"
                      ) {
                        informationSnackbar(
                          response?.data?.informationMessages,
                          dispatch,
                          language
                        );
                      }
                    },
                  }
                );
            }}
          />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid
        item
        container
        columnSpacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Mui.Grid item xs={3.5}>
          <Common.CellmaSelectField
            label={translate("photoIdentification", language)}
            name="photoIdentification"
            ariaLabel="photoIdentification"
            value={photoIdentificationValue}
            changeevent={(event: any) => {
              setPhotoIdentificationValue(event.target.value);
            }}
            list={listItems?.["patient identifiers"]?.map(
              (patientWeb: any) =>
                patientWeb.eliIdentifierType !== "Unique Identification" &&
                patientWeb.eliIdentifierType !== null && (
                  <Mui.MenuItem
                    key={patientWeb.eliId}
                    value={patientWeb.eliId}
                    sx={{ whiteSpace: "unset" }}
                  >
                    {patientWeb.eliText}
                  </Mui.MenuItem>
                )
            )}
          />
        </Mui.Grid>
        <Mui.Grid item xs={3.5}>
          <Common.CellmaInputField
            label={translate("number", language)}
            ariaLabel="numberPhotoIdentification"
            onHandleChange={(event: any) =>
              setPhotoIdentificationNumber(event.target.value)
            }
            value={photoIdentificationNumber}
          />
        </Mui.Grid>
        <Mui.Grid item xs={3.5}>
          <Common.CellmaSelectField
            label={translate("issuingCountry", language)}
            name="issuingCountry"
            ariaLabel="issuingCountryPhotoIdentification"
            value={photoIdentificationCountry}
            changeevent={(event: any) => {
              setPhotoIdentificationCountry(event.target.value);
            }}
            list={countryList?.map((patientWeb: any) => (
              <Mui.MenuItem
                key={patientWeb.couId}
                value={patientWeb.couId}
                sx={{ whiteSpace: "unset" }}
              >
                {patientWeb.couCountry}
              </Mui.MenuItem>
            ))}
          />
        </Mui.Grid>
        <Mui.Grid
          item
          xs={1.5}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Common.CellmaButton
            label={translate("add", language)}
            disabled={
              photoIdentificationValue === null ||
              photoIdentificationNumber === "" ||
              !photoIdentificationNumber ||
              photoIdentificationCountry === null
            }
            onClick={() => {
              if (photoIdentificationValue && photoIdentificationCountry)
                addPatientIdentifier(
                  {
                    pidTypeEliId: photoIdentificationValue,
                    pidPatId: props?.patientId,
                    pidValue: photoIdentificationNumber,
                    pidIssuingCountryCode: photoIdentificationCountry,
                  },
                  {
                    onSuccess: (response: any) => {
                      ClearInputFields();
                      if (
                        response?.data?.validationCode ===
                        "patient.identifier.add.success"
                      ) {
                        dispatchSnackbar(response, dispatch, language);
                        props?.getPatientDetailsRefetch();
                      } else if (
                        response?.data?.validationCode ===
                        "patient.identifier.add.fail"
                      ) {
                        informationSnackbar(
                          response?.data?.informationMessages,
                          dispatch,
                          language
                        );
                      }
                    },
                  }
                );
            }}
          />
        </Mui.Grid>
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default AddPatientUniqueIdentifier;
