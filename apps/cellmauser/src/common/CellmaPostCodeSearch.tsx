import {
  ClipboardEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";

import { Autocomplete, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { useSelector } from "react-redux";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";

import translate from "../assets/translationFiles/commonTranslation";

interface Props {
  type: string;
  size?: any;
  data?: any;
  setIsSaveButtonDisabled?(paramter: any): unknown;
  setPermanentAddressLatitude?: any;
  setPermanentAddressLongitude?: any;
  setTemporaryAddressLatitude?: any;
  setTemporaryAddressLongitude?: any;
  maxLength?: any;
  textTransform?:
    | "none"
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "full-width"
    | "full-size-kana";
  onBlur?:
    | FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
  onKeyPress?: KeyboardEventHandler<HTMLDivElement> | undefined;
  onPaste?: ClipboardEventHandler<HTMLDivElement> | undefined;
  country?: any;
}

const CellmaPostCodeSearch: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const { language } = useSelector((state: any) => state.language);

  const {
    value,
    suggestions: { data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 100,
  });

  const handleInput = (event: any, data: FormikProps<any>) => {
    if (props.type === "permanentAddress" || props.type === "postcodeSearch") {
      data.setFieldValue("district", "");
      data.setFieldValue("town", "");
      data.setFieldValue("county", "");
      data.setFieldValue("country", "");
      data.setFieldValue("postcode", "");
      data.setFieldValue("iSOCountryCode", "");
      data.setFieldValue("iCAOCountryCode", "");
    } else if (
      props.type === "temporaryAddress" ||
      props.type === "postcodeSearchTemp"
    ) {
      data.setFieldValue("tempDistrict", "");
      data.setFieldValue("tempTown", "");
      data.setFieldValue("tempCounty", "");
      data.setFieldValue("tempCountry", "");
      data.setFieldValue("tempPostcode", "");
      data.setFieldValue("tempISOCountryCode", "");
      data.setFieldValue("tempICAOCountryCode", "");
    }
    setValue(event?.target.value);
  };

  const handleSelect = (description: any, data: FormikProps<any>) => {
    setValue(description?.structured_formatting?.main_text, false);
    clearSuggestions();
    getGeocode({ address: description.description }).then((results: any) => {
      if (props?.type === "permanentAddress") {
        props?.setPermanentAddressLatitude(
          results[0]?.geometry?.location?.lat()
        );
        props?.setPermanentAddressLongitude(
          results[0]?.geometry?.location?.lng()
        );
      } else if (props?.type === "temporaryAddress") {
        props?.setTemporaryAddressLatitude(
          results[0]?.geometry?.location?.lat()
        );
        props?.setTemporaryAddressLongitude(
          results[0]?.geometry?.location?.lng()
        );
      }

      if (
        props.type === "permanentAddress" ||
        props.type === "postcodeSearch"
      ) {
        // Get Town
        data.setFieldValue(
          "town",
          results[0]?.address_components?.filter(
            (ac: any) => ~ac.types?.indexOf("locality")
          )[0]?.long_name
        );

        // Get County
        data.setFieldValue(
          "county",
          results[0]?.address_components?.filter(
            (ac: any) => ~ac.types?.indexOf("administrative_area_level_2")
          )[0]?.long_name
        );

        // Get Postal_Code
        data.setFieldValue(
          "postcode",
          results[0]?.address_components?.filter(
            (ac: any) => ~ac.types?.indexOf("postal_code")
          )[0]?.long_name
        );

        // Get District
        data.setFieldValue(
          "district",
          results[0]?.address_components?.filter(
            (ac: any) => ~ac.types?.indexOf("administrative_area_level_3")
          )[0]?.long_name
        );

        // Get Country
        const searchCountry = results[0]?.address_components?.filter(
          (ac: any) => ~ac.types?.indexOf("country")
        )[0]?.long_name;

        if (searchCountry === "United Kingdom") {
          data.setFieldValue(
            "country",
            "United Kingdom of Great Britain and Northern Ireland"
          );
          props?.country.map((country: any) => {
            if (
              country.couCountry ===
              "United Kingdom of Great Britain and Northern Ireland"
            ) {
              data.setFieldValue("iSOCountryCode", country?.couCountryCode);
              data.setFieldValue(
                "iCAOCountryCode",
                country?.couIcaoCountryCode
              );
            }
          });
        } else if (searchCountry === "United States") {
          data.setFieldValue("country", "United States of America");
          props?.country.map((country: any) => {
            if (country.couCountry === "United States of America") {
              data.setFieldValue("iSOCountryCode", country?.couCountryCode);
              data.setFieldValue(
                "iCAOCountryCode",
                country?.couIcaoCountryCode
              );
            }
          });
        } else {
          data.setFieldValue("country", searchCountry);
          props?.country.map((country: any) => {
            if (country.couCountry === searchCountry) {
              data.setFieldValue("iSOCountryCode", country?.couCountryCode);
              data.setFieldValue(
                "iCAOCountryCode",
                country?.couIcaoCountryCode
              );
            }
          });
        }
      } else if (
        props.type === "temporaryAddress" ||
        props.type === "postcodeSearchTemp"
      ) {
        // Get Town
        data.setFieldValue(
          "tempTown",
          results[0]?.address_components?.filter(
            (ac: any) => ~ac.types?.indexOf("locality")
          )[0]?.long_name
        );

        // Get County
        data.setFieldValue(
          "tempCounty",
          results[0]?.address_components?.filter(
            (ac: any) => ~ac.types?.indexOf("administrative_area_level_2")
          )[0]?.long_name
        );

        // Get Postal_Code
        data.setFieldValue(
          "tempPostcode",
          results[0]?.address_components?.filter(
            (ac: any) => ~ac.types?.indexOf("postal_code")
          )[0]?.long_name
        );

        // Get District
        data.setFieldValue(
          "tempDistrict",
          results[0]?.address_components?.filter(
            (ac: any) => ~ac.types?.indexOf("administrative_area_level_3")
          )[0]?.long_name
        );

        // Get Country
        const searchCountry = results[0]?.address_components?.filter(
          (ac: any) => ~ac.types?.indexOf("country")
        )[0]?.long_name;

        if (searchCountry === "United Kingdom") {
          data.setFieldValue(
            "tempCountry",
            "United Kingdom of Great Britain and Northern Ireland"
          );
          props?.country.map((country: any) => {
            if (
              country.couCountry ===
              "United Kingdom of Great Britain and Northern Ireland"
            ) {
              data.setFieldValue("tempISOCountryCode", country?.couCountryCode);
              data.setFieldValue(
                "tempICAOCountryCode",
                country?.couIcaoCountryCode
              );
            }
          });
        } else if (searchCountry === "United States") {
          data.setFieldValue("tempCountry", "United States of America");
          props?.country.map((country: any) => {
            if (country.couCountry === "United States of America") {
              data.setFieldValue("tempISOCountryCode", country?.couCountryCode);
              data.setFieldValue(
                "tempICAOCountryCode",
                country?.couIcaoCountryCode
              );
            }
          });
        } else {
          data.setFieldValue("tempCountry", searchCountry);
          props?.country.map((country: any) => {
            if (country.couCountry === searchCountry) {
              data.setFieldValue("tempISOCountryCode", country?.couCountryCode);
              data.setFieldValue(
                "tempICAOCountryCode",
                country?.couIcaoCountryCode
              );
            }
          });
        }
      }
    });
  };

  return (
    <Autocomplete
      size={props?.size ? props?.size : "small"}
      freeSolo
      open={open}
      onOpen={(event) => {
        if (event.type !== "mousedown" && event.type !== "focus") {
          setOpen(true);
        }
      }}
      onClose={() => setOpen(false)}
      options={data.map((place: any) => place)}
      getOptionLabel={(place: any) => place.description ?? ""}
      onChange={(event: any, value: any) => {
        handleSelect(value, props?.data);
        const setSave = props?.setIsSaveButtonDisabled
          ? props?.setIsSaveButtonDisabled
          : () => {};

        setSave(!event?.target.value && event?.target.value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(event: any) => handleInput(event, props?.data)}
          value={value}
          name="postcodeSearch"
          label={translate("postcodeSearch", language)}
          inputProps={{
            "data-testid": "postcodeSearch",
            ...params.inputProps,
            maxLength: props?.maxLength,
            style: { textTransform: props?.textTransform, marginRight: "30px" },
          }}
          autoComplete="off"
          onBlur={props?.onBlur}
          onKeyPress={props?.onKeyPress}
          onPaste={props?.onPaste}
        />
      )}
    />
  );
};

export default CellmaPostCodeSearch;
