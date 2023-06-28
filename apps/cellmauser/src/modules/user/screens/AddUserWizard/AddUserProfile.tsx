import { useCallback, useEffect, useRef, useState } from "react";

import { PhotoCamera } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import * as Mui from "@mui/material";
import Compressor from "compressorjs";
import { Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as validations from "../../../../utils/Validations";
import useUploadUserPhoto from "../../api/useUserPhoto";
import translate from "../../assets/translationFiles/addUserWizardTranslation";

const videoConstraints = {
  width: 120,
  height: 160,
};

interface Props {
  selectedUsername: string;
  AddNewPhoto(imageState: string): unknown;
  handleCancel: any;
}

const AddUserProfile: React.FC<Props> = (props) => {
  const [imageState, setImageState] = useState("");
  const [file, setFile] = useState<string | Blob>("");

  const [isTakePicture, setIsTakePicture] = useState(false);
  const [value, setValue] = useState("Yes");
  const uploadImageInput = useRef<any>();
  const { language } = useSelector((state: any) => state.language);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // API call user photo upload
  const { mutate: uploadPhoto } = useUploadUserPhoto();

  // Function to convert blob to base64
  function blobToBase64(blob: Blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  // used to load photo or file
  const loadFile = (event: any) => {
    // let allowedFileResolution = true;

    if (event.target.files) {
      const file = event.target.files[0];

      const allowedFileTypes = ["jpg", "png", "bmp", "gif", "jpe", "jpeg"];
      const size = 100000000;

      const validateFile = validations.validateFileTypeAndSize(
        file,
        allowedFileTypes,
        size
      );

      if (validateFile !== "") {
        dispatch(
          setSnackbar(true, "error", translate(validateFile, language), 4)
        );
        setImageState("");
        setFile("");
        return false;
      }

      // eslint-disable-next-line no-new
      const compressor = new Compressor(file, {
        quality: 0.8,
        height: 160,
        width: 120,
        convertSize: 400000,
        success: (result) => {
          const image = new Image();
          image.src = URL.createObjectURL(result);
          if (image?.src.indexOf("blob") > -1) {
            blobToBase64(event.target.files[0]).then((res: any) => {
              setImageState(res);
            });
          } else {
            setImageState(image?.src);
          }
          setFile(file);
        },
      });
    }
  };

  const validateImage = () => {
    if (!(file === ""))
      uploadPhoto({
        useUsername: props?.selectedUsername,
        imageBase64: imageState,
      });
  };

  props.AddNewPhoto(imageState);

  // passing reference
  const webcamRef = useRef(null) as any;

  // this function used to capture
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageState(imageSrc);

    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file1 = new File([blob], "File name", { type: "image/jpg" });
        setFile(file1);
      });

    setIsTakePicture(false);
  }, [webcamRef]);

  return (
    <Formik
      initialValues={{
        file: "",
      }}
      onSubmit={() => {}}
    >
      {(data: FormikProps<any>) => {
        return (
          <form onSubmit={data.handleSubmit} noValidate>
            <Mui.Grid container sx={styles.alignCenter} rowGap={2}>
              <Mui.Grid
                item
                xs={11}
                sx={{
                  paddingY: "10px",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Mui.Paper
                  variant="outlined"
                  sx={{ width: "120px", height: "160px" }}
                >
                  <Mui.Grid container>
                    {!isTakePicture && (
                      <Mui.Grid item xs={12}>
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          id="file"
                          onChange={(event: any) => {
                            loadFile(event);
                          }}
                          style={{ display: "none" }}
                          onClick={(event: any) => {
                            event.target.value = null;
                          }}
                        />
                        {imageState && (
                          <img
                            style={{ width: "120px", height: "160px" }}
                            alt="profile Pic"
                            src={imageState}
                            id="output"
                          />
                        )}
                        {imageState.length === 0 && (
                          <label
                            htmlFor="file"
                            style={{
                              cursor: "pointer",
                              width: "120px",
                              height: "160px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <PhotoCamera sx={styles.photoCamera} />
                          </label>
                        )}
                      </Mui.Grid>
                    )}
                    {isTakePicture && (
                      <Mui.Grid container item xs={12}>
                        <Mui.Grid
                          item
                          xs={12}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Webcam
                            width="120px"
                            height="160px"
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                          />
                        </Mui.Grid>
                        <Mui.Grid
                          item
                          xs={11}
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mt: "-40px",
                          }}
                        >
                          <Mui.IconButton onClick={capture}>
                            <Mui.Tooltip title="Capture" arrow placement="top">
                              <AddAPhotoIcon sx={{ color: "primary.main" }} />
                            </Mui.Tooltip>
                          </Mui.IconButton>
                        </Mui.Grid>
                      </Mui.Grid>
                    )}
                  </Mui.Grid>
                </Mui.Paper>
              </Mui.Grid>

              <Mui.Grid item container spacing={1.5} sx={styles.alignCenter}>
                <Mui.Grid item sx={styles.alignCenter}>
                  <Common.CellmaButton
                    label={translate("takePicture", language)}
                    size="small"
                    onClick={() => setIsTakePicture(true)}
                  />
                </Mui.Grid>
                <Mui.Grid item sx={styles.alignCenter}>
                  <Common.CellmaButton
                    label={translate("resetCamera", language)}
                    size="small"
                    onClick={() => {
                      setImageState("");
                      setIsTakePicture(false);
                    }}
                  />
                </Mui.Grid>
                <Mui.Grid item sx={styles.alignCenter}>
                  {!isTakePicture && imageState === "" ? (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        aria-label="uploadImage"
                        ref={uploadImageInput}
                        onChange={(event) => loadFile(event)}
                      />
                      <Common.CellmaButton
                        label={translate("upload", language)}
                        disabled={value === "No"}
                        size="small"
                        onClick={() => {
                          uploadImageInput.current?.click();
                        }}
                      />
                    </div>
                  ) : (
                    <Common.CellmaButton
                      label={translate("upload", language)}
                      disabled={value === "No"}
                      size="small"
                      onClick={() => {
                        validateImage();
                        props.handleCancel();
                      }}
                    />
                  )}
                </Mui.Grid>
              </Mui.Grid>

              <Mui.Grid item container xs={12} sx={styles.alignCenter}>
                <Mui.Grid item xs={12} sm={9} sx={styles.alignCenter}>
                  <Mui.Typography sx={styles.textContent}>
                    {translate("patientImageShould", language)}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item xs={12} sm={9} sx={styles.alignCenter}>
                  <Mui.Typography sx={styles.typographyText}>
                    {translate("shouldHaveResolution", language)}
                  </Mui.Typography>
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Grid>
          </form>
        );
      }}
    </Formik>
  );
};
export default AddUserProfile;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
  },
  photoCamera: {
    color: "gray",
    padding: "80px",
  },
  textContent: { color: "grey.500", textAlign: "center" },
  typographyText: { paddingY: "10px", color: "grey.500", textAlign: "center" },
};
