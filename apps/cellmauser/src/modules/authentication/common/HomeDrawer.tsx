import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useHomePageSidebar from "../../../api/useHomePageSidebar";
import CellmaDrawer from "../../../common/CellmaDrawer";
import {
  setAddReferralMode,
  setIsUnderConstruction,
} from "../../../store/CommonAction";
import { isUndefinedOrNullOrEmpty } from "../../../utils/GeneralUtils";
import Alerts from "../assets/icons/Alerts.png";
import Appointments from "../assets/icons/Appointments.png";
import Chat from "../assets/icons/Chat.png";
import ExpireRisk from "../assets/icons/ExpireRisk.png";
import Inbox from "../assets/icons/Inbox.png";
import Letters from "../assets/icons/Letters.png";
import Messages from "../assets/icons/Messages.png";
import PendingRef from "../assets/icons/OurPendingOnReferrals.png";
import PendingStockTransfer from "../assets/icons/PendingStockTransfer.png";
import Referrals from "../assets/icons/Referrals.png";
import Refund from "../assets/icons/Refund.png";
import RejectedRef from "../assets/icons/RejectedRef.png";
import StockLevel from "../assets/icons/StockLevel.png";
import StockRequisitions from "../assets/icons/StockRequisitions.png";
import StockRequisitionsReceived from "../assets/icons/StockRequisitionsReceived.png";
import Tasks from "../assets/icons/Tasks.png";
import t from "../assets/translationFiles/homeTranslation";

const drawerType = "fixedDrawer";

interface Props {
  open?: any;
}

const HomeDrawer: React.FC<Props> = (props) => {
  const { open } = props;
  const { patientId, isPatientSelected } = useSelector(
    (state: any) => state.patient
  );
  const { userRoles, administration } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: homePageSidebar, isLoading: homePageSidebarIsLoading } =
    useHomePageSidebar(
      patientId !== null && isPatientSelected ? "select" : "deselectPatient"
    );

  return (
    <>
      {administration !== 1 && homePageSidebarIsLoading && (
        <Mui.Backdrop sx={{ zIndex: "1500" }} open>
          <Mui.CircularProgress />
        </Mui.Backdrop>
      )}

      <CellmaDrawer open={open} type={drawerType}>
        <Mui.Box sx={{ my: "60px" }}>
          <Mui.List>
            <Mui.Tooltip title={t("tasks")} placement="right" arrow>
              <Mui.ListItem
                data-testid="tasks"
                sx={styles.ListStyle}
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Badge
                  color="success"
                  variant="dot"
                  invisible={homePageSidebar?.count.tasks > 0 && false}
                >
                  <Mui.Avatar
                    sx={styles.avatar}
                    variant="square"
                    src={Tasks}
                    alt="Tasks Image Avatar"
                  />
                </Mui.Badge>
                <Mui.ListItemText
                  sx={styles.listItemText}
                  primary={
                    <Mui.Typography
                      variant="h5"
                      sx={{
                        whiteSpace: "initial",
                        display: open ? "flex" : "none",
                      }}
                    >
                      {t("tasks")}
                    </Mui.Typography>
                  }
                />
                {homePageSidebar?.count.tasks > 0 && (
                  <Mui.Chip
                    label={homePageSidebar?.count.tasks}
                    sx={styles.drawerChip}
                    size="small"
                  />
                )}
              </Mui.ListItem>
            </Mui.Tooltip>
            <Mui.Tooltip title={t("alerts")} placement="right" arrow>
              <Mui.ListItem
                data-testid="alerts"
                sx={styles.ListStyle}
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Badge
                  color="success"
                  variant="dot"
                  invisible={homePageSidebar?.count.alerts > 0 && false}
                >
                  <Mui.Avatar
                    sx={styles.avatar}
                    variant="square"
                    src={Alerts}
                    alt="Alerts Image Avatar"
                  />
                </Mui.Badge>
                <Mui.ListItemText
                  sx={styles.listItemText}
                  primary={
                    <Mui.Typography
                      variant="h5"
                      sx={{
                        whiteSpace: "initial",
                        display: open ? "flex" : "none",
                      }}
                    >
                      {t("alerts")}
                    </Mui.Typography>
                  }
                />
                {homePageSidebar?.count.alerts > 0 && (
                  <Mui.Chip
                    label={homePageSidebar?.count.alerts}
                    sx={styles.drawerChip}
                    size="small"
                  />
                )}
              </Mui.ListItem>
            </Mui.Tooltip>
            {administration >= 3 && (
              <Mui.Tooltip title={t("messages")} placement="right" arrow>
                <Mui.ListItem
                  data-testid="messages"
                  sx={styles.ListStyle}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Badge color="success">
                    <Mui.Avatar
                      sx={styles.avatar}
                      variant="square"
                      src={Messages}
                      alt="Messages Image Avatar"
                    />
                  </Mui.Badge>
                  <Mui.ListItemText
                    sx={styles.listItemText}
                    primary={
                      <Mui.Typography
                        variant="h5"
                        sx={{
                          whiteSpace: "initial",
                          display: open ? "flex" : "none",
                        }}
                      >
                        {t("messages")}
                      </Mui.Typography>
                    }
                  />
                </Mui.ListItem>
              </Mui.Tooltip>
            )}

            <Mui.Tooltip title={t("appointments")} placement="right" arrow>
              <Mui.ListItem
                data-testid="appointments"
                sx={styles.ListStyle}
                onClick={() =>
                  navigate("/cellmaUser/eventData/serviceAppointments")
                }
              >
                <Mui.Badge
                  color="success"
                  variant="dot"
                  invisible={homePageSidebar?.count.appointment <= 0}
                >
                  <Mui.Avatar
                    sx={styles.avatar}
                    variant="square"
                    src={Appointments}
                    alt="Appointments Image Avatar"
                    onClick={() => {
                      navigate("/cellmaUser/eventData/serviceAppointments");
                    }}
                  />
                </Mui.Badge>
                <Mui.ListItemText
                  sx={styles.listItemText}
                  primary={
                    <Mui.Typography
                      variant="h5"
                      sx={{
                        whiteSpace: "initial",
                        display: open ? "flex" : "none",
                      }}
                    >
                      {t("appointments")}
                    </Mui.Typography>
                  }
                />
                {homePageSidebar?.count.appointment > 0 && (
                  <Mui.Chip
                    label={homePageSidebar?.count.appointment}
                    sx={styles.drawerChip}
                    size="small"
                  />
                )}
              </Mui.ListItem>
            </Mui.Tooltip>
            {!isUndefinedOrNullOrEmpty(
              homePageSidebar?.settings.estUsesCcLetters
            ) &&
              homePageSidebar?.settings.estUsesCcLetter === 1 && (
                <Mui.Tooltip title={t("inbox")} placement="right" arrow>
                  <Mui.ListItem
                    data-testid="inbox"
                    sx={styles.ListStyle}
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Badge
                      color="success"
                      variant="dot"
                      invisible={homePageSidebar?.count.inbox <= 0 && true}
                    >
                      <Mui.Avatar
                        sx={styles.avatar}
                        variant="square"
                        src={Inbox}
                        alt="Inbox Image Avatar"
                      />
                    </Mui.Badge>
                    <Mui.ListItemText
                      sx={styles.listItemText}
                      primary={
                        <Mui.Typography
                          variant="h5"
                          sx={{
                            whiteSpace: "initial",
                            display: open ? "flex" : "none",
                          }}
                        >
                          {t("inbox")}
                        </Mui.Typography>
                      }
                    />
                    {homePageSidebar?.count.inbox > 0 && (
                      <Mui.Chip
                        label={homePageSidebar?.count.inbox}
                        sx={styles.drawerChip}
                        size="small"
                      />
                    )}
                  </Mui.ListItem>
                </Mui.Tooltip>
              )}
            <Mui.Tooltip title={t("letters")} placement="right" arrow>
              <Mui.ListItem
                data-testid="letters"
                sx={styles.ListStyle}
                onClick={() => dispatch(setIsUnderConstruction(true))}
              >
                <Mui.Badge
                  color="success"
                  variant="dot"
                  invisible={homePageSidebar?.count.letters <= 0}
                >
                  <Mui.Avatar
                    sx={styles.avatar}
                    variant="square"
                    src={Letters}
                    alt="Letters Image Avatar"
                  />
                </Mui.Badge>
                <Mui.ListItemText
                  sx={styles.listItemText}
                  primary={
                    <Mui.Typography
                      variant="h5"
                      sx={{
                        whiteSpace: "initial",
                        display: open ? "flex" : "none",
                      }}
                    >
                      {t("letters")}
                    </Mui.Typography>
                  }
                />
                {homePageSidebar?.count.letters > 0 && (
                  <Mui.Chip
                    label={homePageSidebar?.count.letters}
                    sx={styles.drawerChip}
                    size="small"
                  />
                )}
              </Mui.ListItem>
            </Mui.Tooltip>
            {userRoles.includes("Stock") && (
              <>
                <Mui.Tooltip title={t("stockLevels")} placement="right" arrow>
                  <Mui.ListItem
                    data-testid="stockLevels"
                    sx={styles.ListStyle}
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Badge
                      color="success"
                      variant="dot"
                      invisible={homePageSidebar?.count.stockLvl <= 0 && true}
                    >
                      <Mui.Avatar
                        sx={styles.avatar}
                        variant="square"
                        src={StockLevel}
                        alt="Stock Levels Image Avatar"
                      />
                    </Mui.Badge>
                    <Mui.ListItemText
                      sx={styles.listItemText}
                      primary={
                        <Mui.Typography
                          variant="h5"
                          sx={{
                            whiteSpace: "initial",
                            display: open ? "flex" : "none",
                          }}
                        >
                          {t("stockLevels")}
                        </Mui.Typography>
                      }
                    />
                    {homePageSidebar?.count.stockLvl > 0 && (
                      <Mui.Chip
                        label={homePageSidebar?.count.stockLvl}
                        sx={styles.drawerChip}
                        size="small"
                      />
                    )}
                  </Mui.ListItem>
                </Mui.Tooltip>
                <Mui.Tooltip
                  title={t("stockExpiryRisk")}
                  placement="right"
                  arrow
                >
                  <Mui.ListItem
                    data-testid="stockExpiryRisk"
                    sx={styles.ListStyle}
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Badge
                      color="success"
                      variant="dot"
                      invisible={homePageSidebar?.count.expRisk <= 0 && true}
                    >
                      <Mui.Avatar
                        sx={styles.avatar}
                        variant="square"
                        src={ExpireRisk}
                        alt="Stock Expiry Risk Image Avatar"
                      />
                    </Mui.Badge>
                    <Mui.ListItemText
                      sx={styles.listItemText}
                      primary={
                        <Mui.Typography
                          variant="h5"
                          sx={{
                            whiteSpace: "initial",
                            display: open ? "flex" : "none",
                          }}
                        >
                          {t("stockExpiryRisk")}
                        </Mui.Typography>
                      }
                    />
                    {homePageSidebar?.count.expRisk > 0 && (
                      <Mui.Chip
                        label={homePageSidebar?.count.expRisk}
                        sx={styles.drawerChip}
                        size="small"
                      />
                    )}
                  </Mui.ListItem>
                </Mui.Tooltip>
              </>
            )}
            <Mui.Tooltip title={t("referrals")} placement="right" arrow>
              <Mui.ListItem
                data-testid="referrals"
                sx={styles.ListStyle}
                onClick={() => {
                  navigate("/cellmaUser/referral/serviceReferrals");
                }}
              >
                <Mui.Badge
                  color="success"
                  variant="dot"
                  invisible={homePageSidebar?.count.referrals <= 0 && true}
                >
                  <Mui.Avatar
                    sx={styles.avatar}
                    variant="square"
                    src={Referrals}
                    alt="Referrals Image Avatar"
                  />
                </Mui.Badge>
                <Mui.ListItemText
                  sx={styles.listItemText}
                  primary={
                    <Mui.Typography
                      variant="h5"
                      sx={{
                        whiteSpace: "initial",
                        display: open ? "flex" : "none",
                      }}
                    >
                      {t("referrals")}
                    </Mui.Typography>
                  }
                />
                {homePageSidebar?.count.referrals > 0 && (
                  <Mui.Chip
                    label={homePageSidebar?.count.referrals}
                    sx={styles.drawerChip}
                    size="small"
                  />
                )}
              </Mui.ListItem>
            </Mui.Tooltip>
            <Mui.Tooltip
              title={t("ourPendingOnReferral")}
              placement="right"
              arrow
            >
              <Mui.ListItem
                data-testid="ourPendingOnReferral"
                sx={styles.ListStyle}
                onClick={() =>
                  navigate("/cellmaUser/referral/serviceReferrals")
                }
              >
                <Mui.Badge
                  color="success"
                  variant="dot"
                  invisible={homePageSidebar?.count.referrals <= 0 && true}
                >
                  <Mui.Avatar
                    sx={styles.avatar}
                    variant="square"
                    src={PendingRef}
                    alt="Pending Ref Image Avatar"
                  />
                </Mui.Badge>
                <Mui.ListItemText
                  sx={styles.listItemText}
                  primary={
                    <Mui.Typography
                      variant="h5"
                      sx={{
                        whiteSpace: "initial",
                        display: open ? "flex" : "none",
                      }}
                    >
                      {t("ourPendingOnReferral")}
                    </Mui.Typography>
                  }
                />
              </Mui.ListItem>
            </Mui.Tooltip>
            {userRoles.includes("Stock Admin") ||
              (userRoles.includes("StockAdmin") && (
                <>
                  <Mui.Tooltip
                    title={t("stockRequisitionsAwaiting")}
                    placement="right"
                    arrow
                  >
                    <Mui.ListItem
                      data-testid="stockRequisitionsAwaiting"
                      sx={styles.ListStyle}
                      onClick={() => dispatch(setIsUnderConstruction(true))}
                    >
                      <Mui.Badge
                        color="success"
                        variant="dot"
                        invisible={
                          homePageSidebar?.count.stockRequisitionPending <= 0 &&
                          true
                        }
                      >
                        <Mui.Avatar
                          sx={styles.avatar}
                          variant="square"
                          src={StockRequisitions}
                          alt="Stock RA Image Avatar"
                        />
                      </Mui.Badge>
                      <Mui.ListItemText
                        sx={styles.listItemText}
                        primary={
                          <Mui.Typography
                            variant="h5"
                            sx={{
                              whiteSpace: "initial",
                              display: open ? "flex" : "none",
                            }}
                          >
                            {t("stockRequisitionsAwaiting")}
                          </Mui.Typography>
                        }
                      />
                      {homePageSidebar?.count.stockRequisitionPending > 0 && (
                        <Mui.Chip
                          label={homePageSidebar?.count.stockRequisitionPending}
                          sx={styles.drawerChip}
                          size="small"
                        />
                      )}
                    </Mui.ListItem>
                  </Mui.Tooltip>
                  <Mui.Tooltip
                    title={t("stockRequisitionsReceived")}
                    placement="right"
                    arrow
                  >
                    <Mui.ListItem
                      data-testid="stockRequisitionsReceived"
                      sx={styles.ListStyle}
                      onClick={() => dispatch(setIsUnderConstruction(true))}
                    >
                      <Mui.Badge
                        color="success"
                        variant="dot"
                        invisible={
                          homePageSidebar?.count.stockRequisitionReceived <=
                            0 && true
                        }
                      >
                        <Mui.Avatar
                          sx={styles.avatar}
                          variant="square"
                          src={StockRequisitionsReceived}
                          alt="Stock RR Image Avatar"
                        />
                      </Mui.Badge>
                      <Mui.ListItemText
                        sx={styles.listItemText}
                        primary={
                          <Mui.Typography
                            variant="h5"
                            sx={{
                              whiteSpace: "initial",
                              display: open ? "flex" : "none",
                            }}
                          >
                            {t("stockRequisitionsReceived")}
                          </Mui.Typography>
                        }
                      />
                      {homePageSidebar?.count.stockRequisitionReceived > 0 && (
                        <Mui.Chip
                          label={
                            homePageSidebar?.count.stockRequisitionReceived
                          }
                          sx={styles.drawerChip}
                          size="small"
                        />
                      )}
                    </Mui.ListItem>
                  </Mui.Tooltip>
                </>
              ))}
            {userRoles.includes("Stock") && (
              <Mui.Tooltip
                title={t("pendingStockTransfer")}
                placement="right"
                arrow
              >
                <Mui.ListItem
                  data-testid="pendingStockTransfer"
                  sx={styles.ListStyle}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Badge
                    color="success"
                    variant="dot"
                    invisible={homePageSidebar?.count.stockTr <= 0 && true}
                  >
                    <Mui.Avatar
                      sx={styles.avatar}
                      variant="square"
                      src={PendingStockTransfer}
                      alt="Stock TR Image Avatar"
                    />
                  </Mui.Badge>
                  <Mui.ListItemText
                    sx={styles.listItemText}
                    primary={
                      <Mui.Typography
                        variant="h5"
                        sx={{
                          whiteSpace: "initial",
                          display: open ? "flex" : "none",
                        }}
                      >
                        {t("pendingStockTransfer")}
                      </Mui.Typography>
                    }
                  />
                  {homePageSidebar?.count.stockTr > 0 && (
                    <Mui.Chip
                      label={homePageSidebar?.count.stockTR}
                      sx={styles.drawerChip}
                      size="small"
                    />
                  )}
                </Mui.ListItem>
              </Mui.Tooltip>
            )}

            {userRoles.includes("Communication") && (
              <Mui.Tooltip title={t("chat")} placement="right" arrow>
                <Mui.ListItem
                  data-testid="chat"
                  sx={styles.ListStyle}
                  onClick={() => dispatch(setIsUnderConstruction(true))}
                >
                  <Mui.Badge
                    color="success"
                    variant="dot"
                    invisible={homePageSidebar?.count.chat <= 0 && true}
                  >
                    <Mui.Avatar
                      sx={styles.avatar}
                      variant="square"
                      src={Chat}
                      alt="Chat Image Avatar"
                    />
                  </Mui.Badge>
                  <Mui.ListItemText
                    sx={styles.listItemText}
                    primary={
                      <Mui.Typography
                        variant="h5"
                        sx={{
                          whiteSpace: "initial",
                          display: open ? "flex" : "none",
                        }}
                      >
                        {t("chat")}
                      </Mui.Typography>
                    }
                  />
                  {homePageSidebar?.count.chat > 0 && (
                    <Mui.Chip
                      label={homePageSidebar?.count.chat}
                      sx={styles.drawerChip}
                      size="small"
                    />
                  )}
                </Mui.ListItem>
              </Mui.Tooltip>
            )}

            <Mui.Tooltip
              title={t("ourRejectedReferrals")}
              placement="right"
              arrow
            >
              <Mui.ListItem
                data-testid="ourRejectedReferrals"
                sx={styles.ListStyle}
                onClick={() =>
                  navigate("/cellmaUser/referral/rejectedServiceOnReferrals")
                }
              >
                <Mui.Badge
                  color="success"
                  variant="dot"
                  invisible={
                    homePageSidebar?.count.rejectedReferral <= 0 && true
                  }
                >
                  <Mui.Avatar
                    sx={styles.avatar}
                    variant="square"
                    src={RejectedRef}
                    alt="Reject Ref Image Avatar"
                  />
                </Mui.Badge>
                <Mui.ListItemText
                  sx={styles.listItemText}
                  primary={
                    <Mui.Typography
                      variant="h5"
                      sx={{
                        whiteSpace: "initial",
                        display: open ? "flex" : "none",
                      }}
                    >
                      {t("ourRejectedReferrals")}
                    </Mui.Typography>
                  }
                />
                {homePageSidebar?.count.rejectedReferral > 0 && (
                  <Mui.Chip
                    label={homePageSidebar?.count.rejectedReferral}
                    sx={styles.drawerChip}
                    size="small"
                  />
                )}
              </Mui.ListItem>
            </Mui.Tooltip>
            {userRoles.includes("Finance") &&
              userRoles.includes("View Refund Request") &&
              userRoles.includes("Finance Admin") &&
              !isUndefinedOrNullOrEmpty(
                homePageSidebar?.settings.estPatientPortalPaymentMethod
              ) &&
              homePageSidebar?.settings.estPatientPortalPaymentMethod ===
                "worldpay" && (
                <Mui.Tooltip title={t("refund")} placement="right" arrow>
                  <Mui.ListItem
                    data-testid="refund"
                    sx={styles.ListStyle}
                    onClick={() => dispatch(setIsUnderConstruction(true))}
                  >
                    <Mui.Badge color="success" variant="dot" invisible>
                      <Mui.Avatar
                        sx={styles.avatar}
                        variant="square"
                        src={Refund}
                        alt="Refund Image Avatar"
                      />
                    </Mui.Badge>
                    <Mui.ListItemText
                      sx={styles.listItemText}
                      primary={
                        <Mui.Typography
                          variant="h5"
                          sx={{
                            whiteSpace: "initial",
                            display: open ? "flex" : "none",
                          }}
                        >
                          {t("refund")}
                        </Mui.Typography>
                      }
                    />
                    {homePageSidebar?.count.refund > 0 && (
                      <Mui.Chip
                        label={homePageSidebar?.count.refund}
                        sx={styles.drawerChip}
                        size="small"
                      />
                    )}
                  </Mui.ListItem>
                </Mui.Tooltip>
              )}
          </Mui.List>
        </Mui.Box>
      </CellmaDrawer>
    </>
  );
};

export default HomeDrawer;

const styles = {
  ListStyle: {
    border: 1,
    borderColor: "common.white",
    borderRadius: "20px",
    "&:hover": { backgroundColor: "secondary.main" },
  },

  menuIcon: { mr: "20px", ml: "5px" },
  mainBox: {
    display: "flex",
  },
  drawerBox: {
    flexShrink: 0,
    overflow: "hidden",
    border: "none",
    boxShadow: 2,
    display: "flex",
    backgroundColor: "common.black",
  },
  iconGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "primary.main",
  },
  sectionText: {
    color: "common.black",
    textDecorationLine: "underline",
    fontWeight: "550",
  },
  listItemText: {
    m: "5px",
    ml: "20px",
    fontWeight: "200",
    fontSize: "12px",
    "&:hover": { fontWeight: "900", color: "primary.dark" },
  },

  fixDrawer: {
    display: { xs: "none", sm: "block" },
    boxShadow: 0,
    "& .MuiDrawer-paper": {
      backgroundColor: "common.white",
      outline: 0,
      border: "none",
      overflowY: "auto",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },

  drawerChip: { backgroundColor: "success.light", color: "common.white" },
  avatar: {
    width: "28px",
    height: "28px",
    border: 1,
    padding: "5px",
    borderRadius: "5px",
    borderColor: "primary.light",
    "&:hover": {
      borderColor: "primary.main",
      backgroundColor: "secondary.main",
      boxShadow: 2,
    },
  },
};
