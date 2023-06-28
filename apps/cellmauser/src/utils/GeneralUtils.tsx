
import * as Mui from "@mui/material";
import { differenceInCalendarDays } from "date-fns";
import { FormikProps } from "formik";
import moment from "moment";
import Geocode from "react-geocode";

import { GOOGLE_API_KEY } from "../config";
import { setPageNumber } from "../modules/patient/store/PatientAction";
import { setIsUnderConstruction } from "../store/CommonAction";

export const getGender = (sex: any) => {
  switch (sex) {
    case "M":
      return "Male";
    case "F":
      return "Female";
    case "I":
      return "Indeterminate";
    case "U":
      return "Unknown";
    case "N":
      return "NotAsked";
    default:
      return "";
  }
};

export const ageCount = (selectedDate: Date) => {
  return differenceInCalendarDays(new Date(), selectedDate) + 1;
};

// this function sets the address fields on select of "unknownNoFixedAbodeorOverseasVisitor" dropdown field.
export const setAddressForUnknownSelect = (
  event: any,
  data: FormikProps<any>,
  setDisabled: any
) => {
  const { value } = event.target;
  data.setFieldValue("unknownNoFixedAbodeorOverseasVisitor", value);

  if (value === "askedButNotGiven" || value === "notAsked") {
    data.setFieldValue("postcode", "ZZ99 3VZ");
    data.setFieldValue("numberRoad", "Not Known");
    data.setFieldValue(
      "country",
      "United Kingdom of Great Britain and Northern Ireland"
    );
    data.setFieldTouched("numberRoad", false);
    data.setFieldTouched("country", false);
    data.setFieldTouched("postcode", false);
    setDisabled(true);
  } else if (value === "noFixedAbode") {
    data.setFieldValue("postcode", "ZZ99 3WZ");
    data.setFieldValue("numberRoad", "Not Known");
    data.setFieldValue(
      "country",
      "United Kingdom of Great Britain and Northern Ireland"
    );
    data.setFieldTouched("numberRoad", false);
    data.setFieldTouched("country", false);
    data.setFieldTouched("postcode", false);
  } else if (value === "overseasVisitor") {
    data.setFieldValue("postcode", "ZZ99 ***");
    data.setFieldValue("numberRoad", "Not Known");
    data.setFieldValue(
      "country",
      "United Kingdom of Great Britain and Northern Ireland"
    );
    data.setFieldTouched("numberRoad", false);
    data.setFieldTouched("country", false);
    data.setFieldTouched("postcode", false);
  } else if (value === "pleaseSelect") {
    data.setFieldValue("numberRoad", "");
    data.setFieldValue("postcode", "");
    data.setFieldValue("district", "");
    data.setFieldValue("town", "");
    data.setFieldValue("county", "");
    data.setFieldValue("country", "");
    setDisabled(false);
  }
};

export const fullAddressString = (addressResponse: any) => {
  let fullAddress;
  if (
    addressResponse?.addAddress1 !== undefined &&
    addressResponse?.addAddress1 !== ""
  ) {
    fullAddress = addressResponse?.addAddress1;
  }

  if (
    addressResponse?.addAddress2 !== undefined &&
    addressResponse?.addAddress2 !== ""
  ) {
    fullAddress = `${fullAddress}, ${addressResponse?.addAddress2}`;
  }

  if (
    addressResponse?.addAddress3 !== undefined &&
    addressResponse?.addAddress3 !== ""
  ) {
    fullAddress = `${fullAddress}, ${addressResponse?.addAddress3}`;
  }

  if (
    addressResponse?.addAddress4 !== undefined &&
    addressResponse?.addAddress4 !== ""
  ) {
    fullAddress = `${fullAddress}, ${addressResponse?.addAddress4}`;
  }

  if (
    addressResponse?.addAddress5 !== undefined &&
    addressResponse?.addAddress5 !== ""
  ) {
    fullAddress = `${fullAddress}, ${addressResponse?.addAddress5}`;
  }

  if (
    addressResponse?.addAddress6 !== undefined &&
    addressResponse?.addAddress6 !== ""
  ) {
    fullAddress = `${fullAddress}, ${addressResponse?.addAddress6}`;
  }
  if (fullAddress === undefined) {
    return "-";
  }

  return fullAddress;
};

/* This function is used to set the page number 1 */
export const resetPageNumber = (dispatch: any) => {
  dispatch(setPageNumber(1));
};

/* this function is used to set the address from google map which is pointed */
export const setAddressByGoogleMap = (
  latitude: any,
  longitude: any,
  data: FormikProps<any>,
  type: string,
  country?: any
) => {
  data.setFieldValue(
    type === "permanent" ? "numberRoad" : "tempNumberRoad",
    ""
  );
  data.setFieldValue(type === "permanent" ? "town" : "tempTown", "");
  data.setFieldValue(type === "permanent" ? "county" : "tempCounty", "");
  data.setFieldValue(type === "permanent" ? "country" : "tempCountry", "");
  data.setFieldValue(type === "permanent" ? "postcode" : "tempPostcode", "");
  data.setFieldValue(type === "permanent" ? "district" : "tempDistrict", "");
  data.setFieldTouched(
    type === "permanent" ? "numberRoad" : "tempNumberRoad",
    false
  );
  data.setFieldTouched(type === "permanent" ? "town" : "tempTown", false);
  data.setFieldTouched(type === "permanent" ? "county" : "tempCounty", false);
  data.setFieldTouched(type === "permanent" ? "country" : "tempCountry", false);
  data.setFieldTouched(
    type === "permanent" ? "postcode" : "tempPostcode",
    false
  );
  data.setFieldTouched(
    type === "permanent" ? "district" : "tempDistrict",
    false
  );
  Geocode.setApiKey(GOOGLE_API_KEY);
  Geocode.fromLatLng(String(latitude), String(longitude)).then((results) => {
    // Number & road
    data.setFieldValue(
      type === "permanent" ? "numberRoad" : "tempNumberRoad",
      results.results[0]?.address_components?.filter(
        (ac: any) => ~ac.types?.indexOf("route")
      )[0]?.long_name
    );

    // Get Town
    data.setFieldValue(
      type === "permanent" ? "town" : "tempTown",
      results.results[0]?.address_components?.filter(
        (ac: any) => ~ac.types?.indexOf("locality")
      )[0]?.long_name
    );

    // Get County
    data.setFieldValue(
      type === "permanent" ? "county" : "tempCounty",
      results.results[0]?.address_components?.filter(
        (ac: any) => ~ac.types?.indexOf("administrative_area_level_2")
      )[0]?.long_name
    );

    // Get Country
    const searchCountry = results.results[0]?.address_components?.filter(
      (ac: any) => ~ac.types?.indexOf("country")
    )[0]?.long_name;
    data.setFieldValue(
      type === "permanent" ? "country" : "tempCountry",
      searchCountry
    );
    if (searchCountry === "United States") {
      data.setFieldValue(
        type === "permanent" ? "country" : "tempCountry",
        "United States of America"
      );
      country.map((country: any) => {
        if (country.couCountry === "United States of America") {
          data.setFieldValue(
            type === "permanent" ? "iSOCountryCode" : "tempISOCountryCode",
            country?.couCountryCode
          );
          data.setFieldValue(
            type === "permanent" ? "iCAOCountryCode" : "tempICAOCountryCode",
            country?.couIcaoCountryCode
          );
        }
      });
    } else if (searchCountry === "United Kingdom") {
      data.setFieldValue(
        type === "permanent" ? "country" : "tempCountry",
        "United Kingdom of Great Britain and Northern Ireland"
      );
      country.map((country: any) => {
        if (
          country.couCountry ===
          "United Kingdom of Great Britain and Northern Ireland"
        ) {
          data.setFieldValue(
            type === "permanent" ? "iSOCountryCode" : "tempISOCountryCode",
            country?.couCountryCode
          );
          data.setFieldValue(
            type === "permanent" ? "iCAOCountryCode" : "tempICAOCountryCode",
            country?.couIcaoCountryCode
          );
        }
      });
    } else {
      data.setFieldValue(
        type === "permanent" ? "country" : "tempCountry",
        searchCountry
      );
      country.map((country: any) => {
        if (country.couCountry === searchCountry) {
          data.setFieldValue(
            type === "permanent" ? "iSOCountryCode" : "tempISOCountryCode",
            country?.couCountryCode
          );
          data.setFieldValue(
            type === "permanent" ? "iCAOCountryCode" : "tempICAOCountryCode",
            country?.couIcaoCountryCode
          );
        }
      });
    }

    // Get Postal_Code
    data.setFieldValue(
      type === "permanent" ? "postcode" : "tempPostcode",
      results.results[0]?.address_components?.filter(
        (ac: any) => ~ac.types?.indexOf("postal_code")
      )[0]?.long_name
    );

    // Get District
    data.setFieldValue(
      type === "permanent" ? "district" : "tempDistrict",
      results.results[0]?.address_components?.filter(
        (ac: any) => ~ac.types?.indexOf("administrative_area_level_3")
      )[0]?.long_name
    );
  });
};

/**
 * To filter table data
 * @param value
 * @param setRows
 * @param rows
 */
export const handleSearch = (value: string, setRows: any, rows: any) => {
  let searchValue = value.toLowerCase();
  if (value !== "" || value !== null) {
    searchValue = searchValue.replace("female", "f");
    searchValue = searchValue.replace("male", "m");
    if (value.includes("/")) {
      searchValue = moment(searchValue, "DD/MM/YYYY").format("YYYY-MM-DD");
    }
    const FilteredRows = rows.filter((item: any) => {
      const attributes = Object.values(item);
      let attribute;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= attributes.length; i++) {
        attribute = attributes[i];
        if (typeof attribute === "number") attribute = attribute.toString();
        if (typeof attribute === "string")
          if (attribute.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
          }
      }
    });
    setRows(FilteredRows);
  } else {
    setRows(rows);
  }
};

export const isUndefinedOrNullOrEmpty = (data: any) => {
  return data === undefined || data === null || data === "";
};

/* Function to check if touched or any error on field */
export const isError = (data: any, key: any) => {
  const error = data?.touched[key] && data?.errors[key];
  return error;
};

export const showOverflowTooltip = (params: any) => {
  return (
    <Mui.Tooltip title={params?.value}>
      <Mui.Box
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {params?.value}
      </Mui.Box>
    </Mui.Tooltip>
  );
};

export const openInNewTab = (url: any, title: any, width: any, height: any) => {
  const horizontalScreen = window.outerHeight / 2 + window.screenY - height / 2;
  const verticalScreen = window.outerWidth / 2 + window.screenX - width / 2;
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${horizontalScreen}, left=${verticalScreen}`
  );
};

/* This function is used to set the dynamic values to messages */
export const dynamicInformationMessage = (message: any, key: any) => {
  const values = message.match(/\{.*?\}/g);
  if (values) {
    for (const element of values) {
      const value = Number(element.match(/(\d)/)[0]);
      message = message.replace(element, key[value] || "");
    }
    return message;
  }
  return message;
};

export const lowerCaseAllWordsExceptFirstLetters = (string: string) =>
  string.replaceAll(
    /\S*/g,
    (word: string) => `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
  );

export const getDatefromSqlDate = (date: any) => {
  return new Date(
    date.substring(0, 4), // day
    date.substring(5, 7) - 1, // month  javascript counts months from 0 to 11 hence subtarcting 1
    date.substring(8) // year
  );
};

export const getDateFromHours = (time: any) => {
  return new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    ...time.split(":")
  );
};

export const getImgURL = (item: string) => {
  return new URL(item, import.meta.url).toString();
};

export const fetchNavigationPath = (
  item: string,
  navigationType: string,
  json: any,
  dispatch: any,
  navigate: any
) => {
  let navigationData: { [item: string]: string } = {};
  navigationData = json.navigationPath;

  if (navigationData[item] === "") {
    dispatch(setIsUnderConstruction(true));
  } else if (navigationType === "newWindow") {
    openInNewTab(navigationData[item], "New Window", 700, 500);
  } else {
    navigate(navigationData[item]);
  }
};

export const getLanguageIndex = () => {
  const language = localStorage?.getItem("language");
  return language === "EN"
    ? 0
    : language === "MR"
    ? 1
    : language === "ES"
    ? 2
    : language === "FR"
    ? 3
    : 0;
};

// Functions for Customizable View

export const handleDragStart = (position: any,draggingPos: any) => {
  draggingPos.current = position;
};

export const handleDragEnter = (position: any, list: any, setList: any,draggingPos:any,dragOverPos:any) => {
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

export const handleSelect = (
  orderId: any,
  setList: any,
  list: any,
  defaultInputFields: any,
  setUpdatedList: any,
  updatedList: any
) => {
  setList(list.filter((item: any) => item.orderId !== orderId));

  defaultInputFields.map((item: any) => {
    if (item.orderId === orderId) {
      setUpdatedList([...updatedList, defaultInputFields[orderId]]);
    }
  });
};

export const handleUnselect = (
  orderId: any,
  setUpdatedList: any,
  updatedList: any,
  defaultInputFields: any,
  setList: any,
  list: any
) => {
  setUpdatedList(updatedList.filter((item: any) => item.orderId !== orderId));

  defaultInputFields.map((item: any) => {
    if (item.orderId === orderId) {
      setList([...list, defaultInputFields[orderId]]);
    }
  });
};
