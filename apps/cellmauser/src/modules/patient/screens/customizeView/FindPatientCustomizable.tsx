// Page Name : "patientSearchCustom"
// Page Id : "c4pat14"

import { useEffect, useRef, useState } from "react";

import { Box, Divider, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import * as Common from "../../../../common/CommonComponentsIndex";
import responseCodeMessages from "../../../../config/ResponseCodeMessages";
import { setSnackbar } from "../../../../store/SnackbarAction";
import dispatchSnackbar from "../../../../utils/ResponseCodeHandler";
import {
  useAddCustomPatientDetails,
  useGetCustomPatientDetails,
} from "../../api/useCustomPatient";
import translate from "../../assets/translationFiles/patientSearchTranslation";
import ResetToDefaultViewPopup from "../../common/ResetToDefaultViewPopup";
import { setIsCustomizeView } from "../../store/PatientAction";

const defaultInputFields = [
  { orderId: 0, name: "mpiNumber", mandatory: 0 },
  { orderId: 1, name: "barcode", mandatory: 0 },
  { orderId: 2, name: "card", mandatory: 0 },
  { orderId: 3, name: "nhsNumber", mandatory: 0 },
  { orderId: 4, name: "hospitalRef", mandatory: 0 },
  { orderId: 5, name: "givenName", mandatory: 0 },
  { orderId: 6, name: "familyName", mandatory: 0 },
  { orderId: 7, name: "sex", mandatory: 0 },
  { orderId: 8, name: "born", mandatory: 0 },
  { orderId: 9, name: "mobile", mandatory: 0 },
  { orderId: 10, name: "postcode", mandatory: 0 },
  { orderId: 11, name: "mrnNumber", mandatory: 0 },
  { orderId: 12, name: "identificationId", mandatory: 0 },
  { orderId: 13, name: "patientNameInOtherLanguage", mandatory: 0 },
  { orderId: 14, name: "patientSeenInLastDays", mandatory: 0 },
  {
    orderId: 15,
    name: "includeDeceasedPatients",
    type: "checkbox",
    mandatory: 0,
  },
  {
    orderId: 16,
    name: "includeDeceasedService",
    type: "checkbox",
    mandatory: 0,
  },
  { orderId: 17, name: "soundex", type: "checkbox", mandatory: 0 },
];

const FindPatientCustomizable = () => {
  const draggingPos = useRef<any>(null);
  const dragOverPos = useRef<any>(null);
  const [list, setList] = useState<any>(
    defaultInputFields.sort((a, b) => a.orderId - b.orderId)
  );
  const [updatedList, setUpdatedList] = useState<any>([]);
  const [isResetToDefaultView, setIsResetToDefaultView] = useState(false);
  const { language } = useSelector((state: any) => state.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setTitle, setIsLink, setIsLeftOutlinedIcon } =
    useOutletContext() as any; // <-- access context value

  const displayFields: any[] = [];
  const hiddenFields: any[] = [];
  const customViewJson = { customViewJson: { displayFields, hiddenFields } };

  const { mutate: addCustomDetails, data: addCustomResponse } =
    useAddCustomPatientDetails();

  const { refetch: getCustomDetails, data: getCustomDetailsResponse } =
    useGetCustomPatientDetails({
      pageName: "patient search",
      domainName: "patient",
      displayViewType: "custom",
    });

  useEffect(() => {
    getCustomDetails();
    setTitle(translate("findPatientCustomizableView", language));
    setIsLink(false);
    setIsLeftOutlinedIcon(true);
  }, [language]);

  const handleSelect = (orderId: any) => {
    setList(list.filter((item: any) => item.orderId !== orderId));

    defaultInputFields.map((item: any) => {
      if (item.orderId === orderId) {
        setUpdatedList([...updatedList, defaultInputFields[orderId]]);
      }
    });
  };

  const handleUnselect = (orderId: any) => {
    setUpdatedList(updatedList.filter((item: any) => item.orderId !== orderId));

    defaultInputFields.map((item: any) => {
      if (item.orderId === orderId) {
        setList([...list, defaultInputFields[orderId]]);
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
        orderId: element.orderId,
        name: element.name,
        type: element.type,
        mandatory: element.mandatory,
      });
    });

    updatedList?.forEach((element: any) => {
      hiddenFields.push({
        orderId: element.orderId,
        name: element.name,
        type: element.type,
        mandatory: element.mandatory,
      });
    });

    Object.assign(customViewJson.customViewJson.displayFields, {
      customViewJson: displayFields,
    });

    Object.assign(customViewJson.customViewJson.hiddenFields, {
      customViewJson: hiddenFields,
    });

    addCustomDetails({
      pageName: "patient search",
      domainName: "patient",
      displayViewType: "custom",
      displayFieldJson: JSON.stringify(customViewJson).toString(),
    });
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

  return (
    <Box>
      <Grid container sx={{ marginY: "30px" }}>
        <Grid item xs={3}>
          <Common.CellmaInputField
            label={translate("searchAdditionalField", language)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {list.map((item: any, index: any) => (
          <Grid item xs={2} key={item.orderId}>
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
                  cancelField
                  disabled
                  required={item.mandatory === 1}
                  handleSelect={() => handleSelect(item.orderId)}
                />
              )}
              {item.type === "checkbox" && (
                <Common.CellmaCheckbox
                  label={translate(item.name, language)}
                  disabled
                  cancelField
                  required={item?.mandatory !== 1}
                  handleSelect={() => handleSelect(item.orderId)}
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
            <Grid item xs={2} key={item?.orderId}>
              <Box>
                {item.type !== "checkbox" && (
                  <Common.CellmaInputField
                    label={translate(item.name, language)}
                    cancelField
                    disabled
                    selected
                    handleSelect={() => handleUnselect(item.orderId)}
                  />
                )}
                {item.type === "checkbox" && (
                  <Common.CellmaCheckbox
                    label={translate(item.name, language)}
                    cancelField
                    disabled
                    selected
                    handleSelect={() => handleUnselect(item.orderId)}
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

export default FindPatientCustomizable;
