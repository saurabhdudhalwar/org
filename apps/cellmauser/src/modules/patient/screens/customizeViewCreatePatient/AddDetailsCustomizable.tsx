// Page Name : "addDetailsCustom"
// Page Id : "c4pat17"

import { useEffect, useRef, useState } from "react";

import { Search } from "@mui/icons-material";
import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import * as Common from "../../../../common/CommonComponentsIndex";
import responseCodeMessages from "../../../../config/ResponseCodeMessages";
import { setSnackbar } from "../../../../store/SnackbarAction";
import {
  useAddCustomPatientDetails,
  useGetCustomPatientDetails,
} from "../../api/useCustomPatient";
import translate from "../../assets/translationFiles/createPatientTranslation";
import ResetToDefaultViewPopup from "../../common/ResetToDefaultViewPopup";
import { setIsCustomizeView } from "../../store/PatientAction";

const defaultInputFields = [
  { id: 0, name: "title", type: "select", required: 0 },
  { id: 1, name: "familyName", type: "text", required: 1 },
  { id: 2, name: "givenName", type: "text", required: 1 },
  { id: 3, name: "middleName", type: "text", required: 0 },
  { id: 4, name: "maidenName", type: "text", required: 0 },
  { id: 5, name: "ptNameInOtherLanguage", type: "text", required: 0 },
  { id: 6, name: "born", type: "date", required: 1 },
  { id: 7, name: "babyBornInHospital", type: "date", required: 1 },
  { id: 8, name: "sex", type: "select", required: 0 },
  { id: 9, name: "currentGender", type: "select", required: 1 },
  { id: 10, name: "maritalStatus", type: "select", required: 0 },
  { id: 11, name: "sexualOrientation", type: "select", required: 0 },
  { id: 12, name: "currentlyPregnant", type: "select", required: 0 },
  { id: 13, name: "ethnicity", type: "select", required: 0 },
  { id: 14, name: "occupation", type: "select", required: 0 },
  { id: 15, name: "religion", type: "select", required: 0 },
  { id: 16, name: "townOfBirth", type: "text", required: 0 },
  { id: 17, name: "countyOfBirth", type: "text", required: 0 },
  { id: 18, name: "countryOfBirth", type: "select", required: 0 },
  { id: 19, name: "nationality", type: "select", required: 0 },
  { id: 20, name: "regDisabled", type: "select", required: 0 },
  { id: 21, name: "primaryDisability", type: "select", required: 0 },
  { id: 22, name: "assistanceNeeded", type: "text", required: 0 },
  { id: 23, name: "disabilityNote", type: "text", required: 0 },
  { id: 24, name: "language", type: "select", required: 0 },
  { id: 25, name: "interpreterNeeded", type: "select", required: 0 },
  { id: 26, name: "interpreterType", type: "select", required: 0 },
  { id: 27, name: "nhsNo", type: "text", required: 0 },
  { id: 28, name: "hospitalRef", type: "text", required: 0 },
  { id: 29, name: "identifier", type: "text", required: 0 },
  { id: 30, name: "pasId", type: "text", required: 0 },
  { id: 31, name: "patientType", type: "select", required: 0 },
  { id: 32, name: "prisoner", type: "select", required: 0 },
  { id: 33, name: "bloodType", type: "select", required: 0 },
  { id: 34, name: "died", type: "date", required: 0 },
  { id: 35, name: "restrictedRegistration", type: "select", required: 0 },
  { id: 36, name: "patientWebAccess", type: "select", required: 0 },
];

const AddDetailsCustomizable = () => {
  const draggingPos = useRef<any>(null);
  const dragOverPos = useRef<any>(null);
  const [list, setList] = useState(
    defaultInputFields.sort((a, b) => a.id - b.id)
  );
  const [updatedList, setUpdatedList] = useState<any>([]);
  const [isResetToDefaultView, setIsResetToDefaultView] = useState(false);

  const { language } = useSelector((state: any) => state.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTitle, setIsLink, setIsLeftOutlinedIcon } =
    useOutletContext() as any; // <-- access context value

  const { mutate: addCustomDetails, data: addCustomResponse } =
    useAddCustomPatientDetails();

  const { refetch: getCustomDetails, data: getCustomDetailsResponse } =
    useGetCustomPatientDetails({
      pageName: "add patient details",
      domainName: "patient",
      displayViewType: "custom",
    });
  let displayFields: any[] = [];
  const hiddenFields: any[] = [];
  const customViewJson = { customViewJson: { displayFields, hiddenFields } };

  useEffect(() => {
    getCustomDetails();
    setTitle(translate("addDetailsCustomizableView", language));
    setIsLink(false);
    setIsLeftOutlinedIcon(true);
  }, [language]);
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
    if (getCustomDetailsResponse?.status === 200) {
      if (
        getCustomDetailsResponse?.data?.validationCode ===
        "customizabledispalyfield.found"
      ) {
        const cdfDisplayFieldJson = JSON.parse(
          getCustomDetailsResponse?.data?.entity?.cdfDisplayFieldJson
        );
        setList(cdfDisplayFieldJson?.customViewJson?.displayFields);
        setUpdatedList(cdfDisplayFieldJson?.customViewJson?.hiddenFields);
      }
    }
  }, [getCustomDetailsResponse]);

  const handleSelect = (id: any) => {
    setList(list.filter((item: any) => item.id !== id));

    defaultInputFields.map((item: any) => {
      if (item.id === id) {
        setUpdatedList([...updatedList, defaultInputFields[id]]);
      }
    });
  };

  const handleUnselect = (id: any) => {
    setUpdatedList(updatedList.filter((item: any) => item.id !== id));

    defaultInputFields.map((item: any) => {
      if (item.id === id) {
        setList([...list, defaultInputFields[id]]);
      }
    });
  };

  const handleDragStart = (position: any) => {
    draggingPos.current = position;
  };

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

  const handleSave = () => {
    list?.forEach((element: any) => {
      if (element.name !== "babyBornInHospital") {
        displayFields.push({
          id: element.id,
          name: element.name,
          type: element.type,
          required: element.required,
        });
      }
      if (element.name === "born") {
        displayFields?.push({
          id: 7,
          name: "babyBornInHospital",
          type: "date",
          required: 1,
        });
      }
    });

    updatedList?.forEach((element: any, index: any) => {
      hiddenFields.push({
        index,
        id: element.id,
        name: element.name,
        type: element.type,
        required: element.required,
      });
    });

    Object.assign(customViewJson.customViewJson.displayFields, {
      customViewJson: displayFields,
    });

    Object.assign(customViewJson.customViewJson.hiddenFields, {
      customViewJson: hiddenFields,
    });

    addCustomDetails({
      pageName: "add patient details",
      domainName: "patient",
      displayViewType: "custom",
      displayFieldJson: JSON.stringify(customViewJson).toString(),
    });
    displayFields = [];
  };

  return (
    <Box>
      <Grid container sx={{ marginY: "30px" }}>
        <Grid item sx={{ maxWidth: "600px" }}>
          <Common.CellmaInputField
            label={translate("searchAdditionalField", language)}
            endIcon={<Search />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {list.map(
          (item, index) =>
            item.name !== "babyBornInHospital" && (
              <Grid
                item
                sx={{ marginTop: "auto" }}
                xs={12}
                sm={6}
                md={4}
                lg={12 / 5}
                key={item.id}
              >
                <Box
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragOver={(e) => e.preventDefault()}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      cursor: "grab",
                    },
                  }}
                >
                  <Common.CellmaInputField
                    label={translate(item.name, language)}
                    cancelField={item.required !== 1 && true}
                    disabled
                    required={item.required === 1}
                    handleSelect={() => handleSelect(item.id)}
                  />
                </Box>
              </Grid>
            )
        )}

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography>{translate("removedFields", language)}</Typography>
        </Grid>
        {updatedList?.length !== 0 &&
          updatedList?.map((item: any) => (
            <Grid
              item
              xs={12}
              md={4}
              lg={12 / 5}
              key={item?.id}
              sx={{ alignItems: "center" }}
            >
              <Box>
                <Common.CellmaInputField
                  label={translate(item?.name, language)}
                  cancelField
                  disabled
                  selected
                  handleSelect={() => handleUnselect(item.id)}
                />
              </Box>
            </Grid>
          ))}
        <Grid
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
            onClick={handleSave}
          />
        </Grid>
        {isResetToDefaultView && (
          <ResetToDefaultViewPopup
            handleCancel={() => setIsResetToDefaultView(false)}
            handleOk={() => setIsResetToDefaultView(false)}
          />
        )}
      </Grid>
    </Box>
  );
};

export default AddDetailsCustomizable;
