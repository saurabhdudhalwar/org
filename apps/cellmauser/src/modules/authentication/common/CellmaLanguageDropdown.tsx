import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import translate from "../../../assets/translationFiles/commonTranslation";
import { setSnackbar } from "../../../store/SnackbarAction";
import { setLanguage } from "../../../store/TranslationAction";
import { openInNewTab } from "../../../utils/GeneralUtils";

interface Props {
  open: boolean;
  onClose: any;
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
}

const CellmaLanguageDropdown: React.FC<Props> = (props: any) => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const chooseLanguageHandler = (value: string) => {
    dispatch(setLanguage(value));
  };

  const localStorageLang = localStorage.getItem("language");

  return (
    <Mui.Backdrop open={props.open} sx={{ zIndex: 1300 }}>
      <Mui.FormControl>
        <Mui.RadioGroup>
          <Mui.Menu
            open={props.open}
            onClose={props.onClose}
            onClick={props.onClose}
            anchorEl={props.anchorEl}
            PaperProps={{
              style: {
                width: 200,
              },
              sx: {
                overflow: "visible",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 180,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 1500,
                },
              },
            }}
          >
            <Mui.MenuItem sx={styles.menuItem}>
              <Mui.FormControlLabel
                onClick={() => chooseLanguageHandler("EN")}
                value="english"
                control={<Mui.Radio checked={localStorageLang === "EN"} />}
                label="English"
                data-testid="English"
                sx={{ m: "-5px" }}
              />
            </Mui.MenuItem>
            <Mui.Divider variant="middle" />
            <Mui.MenuItem sx={styles.menuItem}>
              <Mui.FormControlLabel
                onClick={() => chooseLanguageHandler("MR")}
                value="मराठी"
                control={<Mui.Radio checked={localStorageLang === "MR"} />}
                label="मराठी"
                data-testid="मराठी"
                sx={{ m: "-5px" }}
              />
            </Mui.MenuItem>
            <Mui.MenuItem sx={styles.menuItem}>
              <Mui.FormControlLabel
                onClick={() => {
                  chooseLanguageHandler("SP");
                  dispatch(
                    setSnackbar(
                      true,
                      "warning",
                      "Spanish Language is only integrated for Patient GP tab",
                      4
                    )
                  );
                }}
                value="Spanish"
                control={<Mui.Radio checked={localStorageLang === "SP"} />}
                label="Spanish"
                data-testid="Spanish"
                sx={{ m: "-5px" }}
              />
            </Mui.MenuItem>
            <Mui.MenuItem sx={styles.menuItem} disabled>
              <Mui.FormControlLabel
                onClick={() => {
                  chooseLanguageHandler("FR");
                }}
                value="French"
                control={<Mui.Radio checked={localStorageLang === "FR"} />}
                label="French"
                data-testid="French"
                sx={{ m: "-5px" }}
              />
            </Mui.MenuItem>

            <Mui.MenuItem sx={styles.menuItem}>
              <Mui.Typography>
                <Mui.Link
                  data-testid="learnMore"
                  href="/cellmaUser/learnMore"
                  onClick={() =>
                    openInNewTab(
                      "/cellmaUser/learnMore",
                      "Learn More",
                      700,
                      500
                    )
                  }
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  {translate("learnMore", language)}
                </Mui.Link>
              </Mui.Typography>
            </Mui.MenuItem>
          </Mui.Menu>
        </Mui.RadioGroup>
      </Mui.FormControl>
    </Mui.Backdrop>
  );
};

export default CellmaLanguageDropdown;

const styles = {
  menuItem: {
    color: "grey.900",
    "&:hover": { backgroundColor: "secondary.main" },
  },
};
