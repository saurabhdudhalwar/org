import React, { useEffect, useRef, useState } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import * as Common from "../../../../common/CommonComponentsIndex";
import {
  handleDragEnter,
  handleDragStart,
  handleSelect,
  handleUnselect,
} from "../../../../utils/GeneralUtils";
import ResetToDefaultViewPopup from "../../../patient/common/ResetToDefaultViewPopup";
import t from "../../assets/translationFiles/addReferralTranslation";
import {
  setActiveScreenName,
  setIsCustomizeView,
} from "../../store/ReferralAction";

const defaultInputFields = [
  { orderId: 0, name: "startDate", mandatory: 0 },
  { orderId: 1, name: "endDate", mandatory: 0 },
  { orderId: 2, name: "payrollNo", mandatory: 0 },
  { orderId: 3, name: "team", mandatory: 0 },
  { orderId: 4, name: "clinicLocation", mandatory: 0 },
  { orderId: 5, name: "clinicType", mandatory: 0 },
  { orderId: 6, name: "status", mandatory: 0 },
  { orderId: 7, name: "clinicalPriority", mandatory: 0 },
  { orderId: 8, name: "referralReason", mandatory: 0 },
  { orderId: 9, name: "patientFamilyName", mandatory: 0 },
  { orderId: 10, name: "barcode", mandatory: 0 },
  { orderId: 11, name: "startTime", mandatory: 0 },
  { orderId: 12, name: "endTime", mandatory: 0 },
  { orderId: 13, name: "hp", mandatory: 0 },
  { orderId: 14, name: "saveAsDefault", mandatory: 1, type: "checkbox" },
  { orderId: 15, name: "displayExternalReferrals", mandatory: 0 },
];

const ServiceReferralCustomizable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    setTitle,
    setIsLink,
    setScreenName,
    setDrawerName,
  }: { setTitle: any; setIsLink: any; setScreenName: any; setDrawerName: any } =
    useOutletContext();

  const { language } = useSelector((state: any) => state.language);

  useEffect(() => {
    setTitle(t("serviceReferralCustomizable"));
    setScreenName("serviceReferralCustomizable");
    setIsLink(false);
    setDrawerName("");
    dispatch(setActiveScreenName("serviceReferralCustomizable"));
  }, [language]);

  const [isResetToDefaultView, setIsResetToDefaultView] = useState(false);

  const [list, setList] = useState<any>(
    defaultInputFields.sort(
      (firstValue, secondValue) => firstValue.orderId - secondValue.orderId
    )
  );
  const [updatedList, setUpdatedList] = useState<any>([]);
  const draggingPos = useRef<any>(null);
  const dragOverPos = useRef<any>(null);

  const handleSave = () => {
    dispatch(setIsCustomizeView(false));
    navigate("/cellmaUser/referral/serviceReferrals");
    // write function to rearrange the fields
  };

  return (
    <Mui.Grid container>
      <Mui.Grid container item sx={{ marginY: "30px" }}>
        <Mui.Grid item xs={4}>
          <Common.CellmaInputField label={t("searchAdditionalField")} />
        </Mui.Grid>
      </Mui.Grid>
      <Mui.Grid container spacing={3}>
        {list.map((item: any, index: any) => (
          <Mui.Grid
            container
            item
            xs={3}
            sx={{ display: "flex", alignItems: "center" }}
            key={index}
          >
            <Mui.Grid item xs={12} key={item.orderId}>
              <Mui.Box
                draggable
                onDragStart={() => handleDragStart(index, draggingPos)}
                onDragEnter={() =>
                  handleDragEnter(
                    index,
                    list,
                    setList,
                    draggingPos,
                    dragOverPos
                  )
                }
                onDragOver={(e) => e.preventDefault()}
                sx={{
                  "&:hover": {
                    cursor: "grab",
                  },
                }}
              >
                {item.type !== "checkbox" && (
                  <Common.CellmaInputField
                    label={t(item.name)}
                    cancelField
                    disabled
                    required={item.mandatory === 1}
                    handleSelect={() =>
                      handleSelect(
                        item.orderId,
                        setList,
                        list,
                        defaultInputFields,
                        setUpdatedList,
                        updatedList
                      )
                    }
                  />
                )}
                {item.type === "checkbox" && (
                  <Common.CellmaCheckbox
                    label={t(item.name)}
                    disabled
                    cancelField={item.mandatory !== 1}
                    required={item?.mandatory !== 1}
                    handleSelect={() =>
                      handleSelect(
                        item.orderId,
                        setList,
                        list,
                        defaultInputFields,
                        setUpdatedList,
                        updatedList
                      )
                    }
                  />
                )}
              </Mui.Box>
            </Mui.Grid>
          </Mui.Grid>
        ))}
        <Mui.Grid item xs={12}>
          <Mui.Divider />
        </Mui.Grid>
        <Mui.Grid item xs={12}>
          <Mui.Typography>{t("removedFields")}</Mui.Typography>
        </Mui.Grid>
        {updatedList?.length !== 0 &&
          updatedList?.map((item: any) => (
            <Mui.Grid item xs={3} key={item?.orderId}>
              <Mui.Box>
                {item.type !== "checkbox" && (
                  <Common.CellmaInputField
                    label={t(item.name)}
                    cancelField
                    disabled
                    selected
                    handleSelect={() =>
                      handleUnselect(
                        item.orderId,
                        setUpdatedList,
                        updatedList,
                        defaultInputFields,
                        setList,
                        list
                      )
                    }
                  />
                )}
                {item.type === "checkbox" && (
                  <Common.CellmaCheckbox
                    label={t(item.name)}
                    cancelField
                    disabled
                    selected
                    handleSelect={() =>
                      handleUnselect(
                        item.orderId,
                        setUpdatedList,
                        updatedList,
                        defaultInputFields,
                        setList,
                        list
                      )
                    }
                  />
                )}
              </Mui.Box>
            </Mui.Grid>
          ))}
        <Mui.Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Common.CellmaButton
            label={t("resetToDefaultView")}
            onClick={() => setIsResetToDefaultView(true)}
          />
          <Common.CellmaButton label={t("save")} onClick={handleSave} />
        </Mui.Grid>
        {isResetToDefaultView && (
          <ResetToDefaultViewPopup
            handleCancel={() => setIsResetToDefaultView(false)}
            handleOk={() => setIsResetToDefaultView(false)}
          />
        )}
      </Mui.Grid>
    </Mui.Grid>
  );
};

export default ServiceReferralCustomizable;
