import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import json from "./homeIconsUrl.json";
import {
  setIsDrawerOpen,
  setIsUnderConstruction,
} from "../../../store/CommonAction";
import t from "../assets/translationFiles/homeTranslation";
import HomeModuleCard from "../common/HomeModuleCard";

interface Props {
  iconList: string | any;
}

const GridItem = (props: any) => {
  return (
    <Mui.Grid
      key={props.key}
      item
      xs={6}
      sm={4}
      md={2.4}
      lg={2}
      sx={styles.iconGrid}
    >
      {props.children}
    </Mui.Grid>
  );
};

const HomeIcons: React.FC<Props> = (props) => {
  const { language } = useSelector((state: any) => state.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDrawerOpen } = useSelector((state: any) => state.common);

  const fetchNavigationPath = (item: string) => {
    let navigationData: { [item: string]: string } = {};
    navigationData = json.navigationPath;
    navigationData[item] === ""
      ? dispatch(setIsUnderConstruction(true))
      : navigate(navigationData[item]);
  };

  const fetchTranslation = (item: string, language: any): string => {
    let moduleName;
    switch (item) {
      case "Patients":
        moduleName = t("patients");
        break;

      case "Referrals":
        moduleName = t("referrals");
        break;

      case "Appointments":
        moduleName = t("appointments");
        break;

      case "Theatre":
        moduleName = t("theatre");
        break;

      case "A&E":
        moduleName = t("a&E");
        break;

      case "Dialysis":
        moduleName = t("dialysis");
        break;

      case "MDT":
        moduleName = t("mdt");
        break;

      case "Wards":
        moduleName = t("wards");
        break;

      case "Pharmacy":
        moduleName = t("pharmacy");
        break;

      case "Imaging":
        moduleName = t("imaging");
        break;

      case "Labs":
        moduleName = t("labs");
        break;

      case "Finance":
        moduleName = t("finance");
        break;

      case "POS":
        moduleName = t("pos");
        break;

      case "Dietetic":
        moduleName = t("dietetic");
        break;

      case "Stock":
        moduleName = t("stock");
        break;

      case "Blood":
        moduleName = t("bloodBank");
        break;

      case "MedicalNotes":
        moduleName = t("medicalNotes");
        break;

      case "Porter":
        moduleName = t("porter");
        break;

      case "Maintenance":
        moduleName = t("maintenance");
        break;

      case "Communication":
        moduleName = t("comms");
        break;

      case "Devices":
        moduleName = t("devices");
        break;

      case "MedicalCertificate":
        moduleName = t("medicalCertificates");
        break;

      case "Alerts":
        moduleName = t("alerts");
        break;

      case "PROMs":
        moduleName = t("proms");
        break;

      case "Infusions":
        moduleName = t("infusions");
        break;

      case "Feedback":
        moduleName = t("feedback");
        break;

      case "Services":
        moduleName = t("services");
        break;

      case "Admin":
        moduleName = t("admin");
        break;

      case "SelfCheckIn":
        moduleName = t("selfCheckIn");
        break;

      case "Help":
        moduleName = t("help");
        break;

      case "Trauma":
        moduleName = t("trauma");
        break;

      case "User":
        moduleName = t("user");
        break;

      default:
        throw Error(` The case ${item} is not applicable here`);
    }
    return moduleName;
  };

  const getImgURL = (item: string) => {
    return new URL(`../assets/icons/${item}.png`, import.meta.url).toString();
  };

  return props?.iconList?.map((item: string, index: number) => {
    return (
      <GridItem key={index}>
        <HomeModuleCard
          iconPath={getImgURL(item)}
          alt={`${item} Image Avatar`}
          moduleName={fetchTranslation(item, language)}
          onClick={() => {
            fetchNavigationPath(item);
          }}
          tooltipLabel={fetchTranslation(item, language)}
        />
      </GridItem>
    );
  });
};

export default HomeIcons;

const styles = {
  iconGrid: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
};
