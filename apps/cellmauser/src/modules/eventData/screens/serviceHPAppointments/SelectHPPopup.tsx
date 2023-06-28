import { useState } from "react";

import { CloseRounded } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Common from "../../../../common/CommonComponentsIndex";
import * as dummyData from "../../assets/dummyData/ServiceHPAppointmentsDummyData";
import t from "../../assets/translationFiles/serviceHPAppointmentTranslation";

const SelectHPPopup = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [selectedHP, setSelectedHP] = useState("");
  const [selectedHPList, setSelectedHPList] = useState([] as any);

  const navigate = useNavigate();

  return (
    <Mui.Backdrop open>
      <Common.CellmaPopup
        fullScreen
        title={t("hpNameList")}
        handleCancel={props?.handleCancel}
      >
        <Mui.Grid
          container
          xs={12}
          sx={{ p: "20px", display: "flex", justifyContent: "center" }}
        >
          <Mui.Grid item container xs={4} spacing={1}>
            <Mui.Grid item xs={12}>
              <Common.CellmaAutocompleteField
                label={t("hpName")}
                name="HP Name"
                options={dummyData.HP_NAME.map((option: any) => option.label)}
                onChange={(value: any, option: any) => setSelectedHP(option)}
                getOptionLabel={(option: any) => option.label ?? ""}
                // renderOption={(props: any, option: any) => (
                //   <li {...props}>{option.label}</li>
                // )}
              />
            </Mui.Grid>
            {selectedHP !== "" && (
              <Mui.Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Mui.Typography>{selectedHP}</Mui.Typography>
                <Mui.IconButton size="small" onClick={() => setSelectedHP("")}>
                  <CloseRounded sx={{ color: "warning.dark" }} />
                </Mui.IconButton>
              </Mui.Grid>
            )}

            <Mui.Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Common.CellmaButton
                label={t("add")}
                disabled={selectedHP === ""}
                onClick={() => {
                  selectedHP !== "" && selectedHPList.push(selectedHP);
                  setSelectedHP("");
                }}
              />
            </Mui.Grid>
            {selectedHPList.map((hp: any) => (
              <Mui.Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Common.CellmaLink
                  label={hp}
                  onClick={() => {
                    setLoading(true);
                    navigate("/cellmaUser/user/hpDiary");
                  }}
                >
                  {hp}
                </Common.CellmaLink>
                <Mui.Checkbox defaultChecked />
              </Mui.Grid>
            ))}
            {selectedHPList?.length !== 0 && (
              <Mui.Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Common.CellmaButton
                  label={t("save")}
                  onClick={props?.handleSave}
                />
              </Mui.Grid>
            )}
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaPopup>
    </Mui.Backdrop>
  );
};

export default SelectHPPopup;
