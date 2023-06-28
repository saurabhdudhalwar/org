// Page Name : "addPatientPipCustom"
// Page Id : "c4pat15"

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
import {
  setCreatePatientActiveStep,
  setIsCustomizeView,
} from "../../store/PatientAction";

const defaultInputFields = [
  { id: 0, name: "title", type: "select", required: 0 },
  { id: 1, name: "familyName", type: "text", required: 1 },
  { id: 2, name: "givenName", type: "text", required: 1 },
  { id: 3, name: "middleName", type: "text", required: 0 },
  { id: 4, name: "born", type: "date", required: 0 },
  { id: 5, name: "sex", type: "text", required: 0 },
  { id: 6, name: "ethnicity", type: "select", required: 0 },
  { id: 7, name: "occupation", type: "select", required: 0 },
  { id: 8, name: "mobile", type: "text", required: 0 },
  { id: 9, name: "email", type: "text", required: 0 },
  { id: 10, name: "relationship", type: "text", required: 1 },
  { id: 11, name: "nextOfKin", type: "select", required: 0 },
  { id: 12, name: "familyAwareOfIllness", type: "select", required: 0 },
  { id: 13, name: "identifierType", type: "select", required: 0 },
  { id: 14, name: "identifierNumber", type: "text", required: 0 },
  { id: 15, name: "externalProfessional", type: "text", required: 0 },
  { id: 16, name: "professionalTitle", type: "text", required: 0 },
  { id: 17, name: "receivePatientLetter", type: "select", required: 0 },
  { id: 18, name: "receiveAppointmentLetters", type: "select", required: 0 },
  {
    id: 19,
    name: "printPartnerDetailsOnBirthRegistrationForm",
    type: "select",
    required: 0,
  },
  { id: 20, name: "sendPatientText/Email", required: 0, type: "checkbox" },
  { id: 21, name: "isReferrer", required: 0, type: "checkbox" },
];
const AddPipCustomizable = () => {
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
      pageName: "add patient interested parties details",
      domainName: "patient",
      displayViewType: "custom",
    });

  let displayFields: any[] = [];
  const hiddenFields: any[] = [];
  const customViewJson = { customViewJson: { displayFields, hiddenFields } };
  useEffect(() => {
    getCustomDetails();
    setTitle(translate("addPipCustomizableView", language));
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
        dispatch(setCreatePatientActiveStep(2));
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
      displayFields.push({
        id: element.id,
        name: element.name,
        type: element.type,
        required: element.required,
      });
    });

    updatedList?.forEach((element: any) => {
      hiddenFields.push({
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
      pageName: "add patient interested parties details",
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
        {list.map((item, index) => (
          <Grid
            item
            sx={{ marginTop: "auto" }}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.id}
          >
            <Box
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragOver={(e) => e.preventDefault()}
              sx={{
                "&:hover": {
                  cursor: "grab",
                },
              }}
            >
              {item.type !== "checkbox" && (
                <Common.CellmaInputField
                  label={translate(item.name, language)}
                  cancelField={item.required !== 1 && true}
                  disabled
                  required={item.required === 1 && true}
                  handleSelect={() => handleSelect(item.id)}
                />
              )}
              {item.type === "checkbox" && (
                <Common.CellmaCheckbox
                  label={translate(item.name, language)}
                  disabled
                  cancelField={item.required !== 1 && true}
                  required={item.required === 1 && true}
                  handleSelect={() => handleSelect(item.id)}
                />
              )}
            </Box>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography>{translate("removedFields", language)}</Typography>
        </Grid>
        {updatedList?.length !== 0 &&
          updatedList?.map((item: any) => (
            <Grid item xs={12} md={4} lg={2} key={item?.id}>
              <Box>
                {item.type !== "checkbox" && (
                  <Common.CellmaInputField
                    label={translate(item.name, language)}
                    cancelField
                    disabled
                    selected
                    handleSelect={() => handleUnselect(item.id)}
                  />
                )}
                {item.type === "checkbox" && (
                  <Common.CellmaCheckbox
                    label={translate(item.name, language)}
                    cancelField
                    disabled
                    selected
                    handleSelect={() => handleUnselect(item.id)}
                  />
                )}
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

export default AddPipCustomizable;
