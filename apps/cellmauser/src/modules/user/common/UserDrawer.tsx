import { useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CellmaDrawer from "../../../common/CellmaDrawer";
import { setIsUnderConstruction } from "../../../store/CommonAction";
import Setup from "../assets/icons/Setup.png";
import UserManagement from "../assets/icons/UserManagement.png";
import translate from "../assets/translationFiles/userDrawerTranslation";
import { setIsUserSelected } from "../store/UserAction";

interface Props {
  open: boolean; // correct ?
}

const UserDrawer: React.FC<Props> = () => {
  const [isSetUpOpen, setIsSetUpOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(true);
  const [isHpNonHpServiceOpen, setIsHpNonHpServiceOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);
  const { isDrawerOpen } = useSelector((state: any) => state.common);
  const { administration } = useSelector((state: any) => state.auth);

  return (
    <CellmaDrawer open={isDrawerOpen}>
      <Mui.Grid container sx={styles.mainGrid}>
        <Mui.Grid item xs={12} sx={styles.alignCenter}>
          <Mui.ListItemButton
            onClick={() => setIsUserManagementOpen(!isUserManagementOpen)}
            selected={isUserManagementOpen}
            sx={styles.listItemButton}
          >
            <Mui.Avatar
              variant="square"
              src={UserManagement}
              alt="UserManagement Image Avatar"
              sx={styles.avatar}
            />
            <Mui.ListItemText
              sx={styles.infoTitle}
              primary={translate("userManagement", language)}
            />
            {isUserManagementOpen ? (
              <ExpandLess />
            ) : (
              <ExpandMore sx={{ color: "success.dark" }} />
            )}
          </Mui.ListItemButton>
        </Mui.Grid>
        {isUserManagementOpen && (
          <Mui.Grid item container sx={styles.openGrid}>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse
                in={isUserManagementOpen}
                timeout="auto"
                unmountOnExit
              >
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() => navigate("/cellmaUser/user/userSearch")}
                  >
                    <Mui.Typography variant="h5">
                      {translate("searchUser", language)}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse
                in={isUserManagementOpen}
                timeout="auto"
                unmountOnExit
              >
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {translate("userGroups", language)}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse
                in={isUserManagementOpen}
                timeout="auto"
                unmountOnExit
              >
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {translate("userGroupGrouping", language)}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse
                in={isUserManagementOpen}
                timeout="auto"
                unmountOnExit
              >
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {translate("serviceGroups", language)}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse
                in={isUserManagementOpen}
                timeout="auto"
                unmountOnExit
              >
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {translate("userMonitoring", language)}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.Collapse
                in={isUserManagementOpen}
                timeout="auto"
                unmountOnExit
              >
                <Mui.List component="div" disablePadding>
                  <Mui.ListItemButton
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Typography variant="h5">
                      {translate("trainingPortalUser", language)}
                    </Mui.Typography>
                  </Mui.ListItemButton>
                </Mui.List>
              </Mui.Collapse>
            </Mui.Grid>
            <Mui.Grid item xs={12} sx={styles.gridItem}>
              <Mui.ListItemButton
                onClick={() => setIsHpNonHpServiceOpen(!isHpNonHpServiceOpen)}
                sx={styles.listItemButton}
                selected={isHpNonHpServiceOpen}
              >
                <Mui.Typography variant="h4">
                  {translate("hpNonHpService", language)}
                </Mui.Typography>
                {isHpNonHpServiceOpen ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore sx={{ color: "success.dark" }} />
                )}
              </Mui.ListItemButton>
            </Mui.Grid>
            {isHpNonHpServiceOpen && (
              <Mui.Grid item xs={12} sx={styles.gridItem}>
                <Mui.Collapse
                  in={isUserManagementOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <Mui.List component="div" disablePadding>
                    <Mui.ListItemButton
                      onClick={() => {
                        navigate("/cellmaUser/user/setHPDiary");
                        dispatch(setIsUserSelected(false));
                      }}
                    >
                      <Mui.Typography variant="h5">
                        {translate("healthcareProfessions", language)}
                      </Mui.Typography>
                    </Mui.ListItemButton>
                  </Mui.List>
                </Mui.Collapse>
              </Mui.Grid>
            )}
          </Mui.Grid>
        )}
        {administration >= 3 && (
          <>
            <Mui.Grid item xs={12} sx={styles.alignCenter}>
              <Mui.ListItemButton
                onClick={() => setIsSetUpOpen(!isSetUpOpen)}
                selected={isSetUpOpen}
                sx={styles.listItemButton}
              >
                <Mui.Avatar
                  variant="square"
                  src={Setup}
                  alt="Setup Image Avatar"
                  sx={styles.avatar}
                />
                <Mui.ListItemText
                  sx={styles.infoTitle}
                  primary={translate("setup", language)}
                />
                {isSetUpOpen ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore sx={{ color: "success.dark" }} />
                )}
              </Mui.ListItemButton>
            </Mui.Grid>
            {isSetUpOpen && (
              <Mui.Grid item container sx={styles.openGrid}>
                <Mui.Grid item xs={12} sx={styles.gridItem}>
                  <Mui.Collapse in={isSetUpOpen} timeout="auto" unmountOnExit>
                    <Mui.List component="div" disablePadding>
                      <Mui.ListItemButton
                        onClick={() =>
                          navigate("/cellmaUser/user/listItemList")
                        }
                      >
                        <Mui.Typography variant="h5">
                          {translate("list", language)}
                        </Mui.Typography>
                      </Mui.ListItemButton>
                    </Mui.List>
                  </Mui.Collapse>
                </Mui.Grid>
              </Mui.Grid>
            )}
          </>
        )}
      </Mui.Grid>
    </CellmaDrawer>
  );
};

export default UserDrawer;

const styles = {
  mainGrid: {
    display: "flex",
    justifyContent: "center",
    mt: "90px",
    paddingX: "5px",
  },
  pinIconGrid: { display: "flex", justifyContent: "flex-end" },
  alignCenter: { display: "flex", justifyContent: "center", my: "5px" },
  infoTitle: {
    ml: "1px",
  },
  listItemButton: {
    borderRadius: "10px",
    color: "grey.900",
    "&.Mui-selected": {
      backgroundColor: "secondary.dark",
      color: "common.black",
    },
    ":hover": {
      backgroundColor: "secondary.dark",
    },
  },
  gridItem: {
    maxWidth: "100%",
    // whiteSpace: "initial"
    overflowWrap: "break-word",
    ":hover": {
      backgroundColor: "secondary.dark",
    },
  },
  openGrid: {
    paddingX: "20px",
  },
  avatar: { height: "24px", marginRight: "10px", width: "24px" },
};
