import { useEffect } from "react";

import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";

import HomeIcons from "./HomeIcons";
import * as Common from "../../../common/CommonComponentsIndex";
import {
  setIsDrawerOpen,
  setIsUnderConstruction,
} from "../../../store/CommonAction";
import { isUndefinedOrNullOrEmpty } from "../../../utils/GeneralUtils";
import { setIsPinSelected } from "../../patient/store/PatientAction";
import useHome from "../api/useHome";
import Cellma3 from "../assets/icons/Cellma3.png";
import t from "../assets/translationFiles/homeTranslation";
import HomeDrawer from "../common/HomeDrawer";
import HomeModuleCard from "../common/HomeModuleCard";

const Home = () => {
  const { isDrawerOpen } = useSelector((state: any) => state.common);
  const { data: userHomeIcons } = useHome();
  const dispatch = useDispatch();
  const { isPinSelected } = useSelector((state: any) => state.patient);
  const homePageIconDisplay = userHomeIcons?.entity ?? [];

  const cookies = new Cookies();

  useEffect(() => {
    if (isPinSelected) {
      dispatch(setIsPinSelected(!isPinSelected));
    } else {
      dispatch(setIsPinSelected(isPinSelected));
    }
    dispatch(setIsDrawerOpen(false));
  }, []);

  return (
    <Mui.Box sx={{ display: "flex" }}>
      <HomeDrawer open={isDrawerOpen} />
      <Common.CellmaCard>
        <Mui.Typography variant="subtitle1" sx={styles.headerText}>
          {homePageIconDisplay?.establishmentName}:&nbsp;&nbsp;
          {homePageIconDisplay?.clinicName}
        </Mui.Typography>
        <Mui.Grid container>
          <HomeIcons iconList={homePageIconDisplay?.homePageIcon} />
          <Mui.Grid item xs={6} sm={4} md={2.4} lg={2} sx={styles.iconGrid}>
            <HomeModuleCard
              iconPath={Cellma3}
              alt="Cellma3 Image Avatar"
              moduleName={t("cellma3")}
              tooltipLabel={t("cellma3")}
              onClick={() => {
                let cellmaDomain = "";
                let token = "";
                let refreshToken = "";
                if (
                  !isUndefinedOrNullOrEmpty(
                    userHomeIcons?.settings?.cellmaDomain
                  )
                ) {
                  cellmaDomain = userHomeIcons?.settings?.cellmaDomain;
                }

                if (
                  cookies?.get("token") !== undefined &&
                  cookies?.get("token") !== null
                ) {
                  token = cookies?.get("token");
                }

                if (
                  cookies?.get("refreshToken") !== undefined &&
                  cookies?.get("refreshToken") !== null
                ) {
                  refreshToken = cookies?.get("refreshToken");
                }
                window.open(
                  `http://${cellmaDomain}cellmaThreeLogin.do?jwtToken=${token}&refreshToken=${refreshToken}`
                );
              }}
            />
          </Mui.Grid>
        </Mui.Grid>
      </Common.CellmaCard>
    </Mui.Box>
  );
};

const styles = {
  headerText: {
    color: "grey.600",
    padding: "10px",
  },
  iconGrid: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
};

export default Home;
