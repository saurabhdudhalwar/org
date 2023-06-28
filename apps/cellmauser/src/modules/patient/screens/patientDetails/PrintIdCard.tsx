// This page is merged with create patient/ PrintIdCard page and this page is for reference for react-team.
//  delete this page after integrating functionality

import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { PhotoCamera } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import * as Mui from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import Webcam from "react-webcam";

import * as Common from "../../../../common/CommonComponentsIndex";
import { setSnackbar } from "../../../../store/SnackbarAction";
import * as validations from "../../../../utils/Validations";
import {
  useGetPatientPhoto,
  useUploadPatientPhoto,
} from "../../api/usePatientPhoto";
import translate from "../../assets/translationFiles/patientDetailsTranslation";
import IDCard from "../../common/IDCard";
import { IFile } from "../../types";

const videoConstraints = {
  width: 120,
  height: 160,
};

const PrintIdCard = () => {
  const [imageState, setImageState] = useState("");
  const [value, setValue] = useState("Yes");
  const [isTakePicture, setIsTakePicture] = useState(false);
  const [isPrintButtonDisabled, setIsPrintButtonDisabled] = useState(true);
  const [file, setFile] = useState<string | Blob>("");
  const { language } = useSelector((state: any) => state.language);
  const { patientId } = useSelector((state: any) => state.patient);
  const uploadImageInput = useRef<any>();
  const { mutate: uploadPhoto, data: photoUploadResponse } =
    useUploadPatientPhoto();
  const dispatch = useDispatch();
  const { data: photoUrl } = useGetPatientPhoto(patientId);
  // API call for uploading user photo

  useEffect(() => {
    if (photoUploadResponse?.status === 200) {
      if (
        photoUploadResponse?.data?.validationCode === "patient.photo.uploaded"
      )
        setIsPrintButtonDisabled(false);
    }
  }, [photoUploadResponse]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  function blobToBase64(blob: Blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  const loadFile = (event: any) => {
    // let allowedFileResolution = true;

    if (event.target.files) {
      const file = event.target.files[0];

      // const image = new Image();
      // image.src = URL.createObjectURL(file);

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
        convertSize: 4000000,
        success: (result) => {
          const image = new Image();
          image.src = URL.createObjectURL(result);
          if (image.src.indexOf("blob") > -1) {
            blobToBase64(event.target.files[0]).then((res: any) => {
              uploadPhoto({ patId: patientId, imageBase64: res });
              setImageState(res);
            });
          } else {
            uploadPhoto({ patId: patientId, imageBase64: image.src });
            setImageState(image.src);
          }
          setFile(file);
        },
      });
    }
  };

  const validateImage = () => {
    if (!(file === ""))
      uploadPhoto({ patId: patientId, imageBase64: imageState });
  };

  const componentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentToPrint.current,
  });

  const webcamRef = React.useRef(null) as any;
  const capture = React.useCallback(() => {
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

  // API call fetch patient photo

  return (
    <Formik
      initialValues={{
        file: "",
      }}
      onSubmit={(values: IFile) => {}}
    >
      {(data: FormikProps<any>) => {
        return (
          <form onSubmit={data.handleSubmit} noValidate>
            <Mui.Grid container sx={styles.alignCenter} rowGap={2}>
              <Mui.Grid item xs={11} sx={styles.alignCenter}>
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
                          name="file"
                          id="file"
                          onChange={(event: any) => {
                            loadFile(event);
                          }}
                          style={{ display: "none" }}
                        />
                        {imageState && (
                          <img
                            style={{ width: "120px", height: "160px" }}
                            alt="profile Pic"
                            src={photoUrl}
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

              <Mui.Grid item xs={11} sx={styles.alignCenter}>
                <Mui.FormControl>
                  <Mui.Stack direction="row" spacing={4}>
                    <Mui.Grid sx={styles.text1}>
                      {translate("consentForPhotographs", language)}
                    </Mui.Grid>

                    <Mui.RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <Mui.FormControlLabel
                        value="Yes"
                        control={<Mui.Radio />}
                        label={translate("yes", language)}
                        checked={value === "Yes"}
                      />
                      <Mui.FormControlLabel
                        value="No"
                        control={<Mui.Radio />}
                        label={translate("no", language)}
                      />
                    </Mui.RadioGroup>
                  </Mui.Stack>
                </Mui.FormControl>
              </Mui.Grid>

              <Mui.Grid
                item
                container
                spacing={2}
                xs={12}
                md={6}
                sx={styles.alignCenter}
              >
                <Mui.Grid item sx={styles.alignCenter}>
                  <Common.CellmaButton
                    label={translate("takePicture", language)}
                    size="medium"
                    disabled={value === "No"}
                    onClick={() => {
                      setIsTakePicture(true);
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
                        ref={uploadImageInput}
                        onChange={(event) => loadFile(event)}
                      />
                      <Common.CellmaButton
                        label={translate("upload", language)}
                        disabled={value === "No"}
                        size="medium"
                        onClick={() => uploadImageInput.current?.click()}
                      />
                    </div>
                  ) : (
                    <Common.CellmaButton
                      label={translate("upload", language)}
                      disabled={value === "No"}
                      size="medium"
                      onClick={() => {
                        validateImage();
                      }}
                    />
                  )}
                </Mui.Grid>
                <Mui.Grid item sx={styles.alignCenter}>
                  <Common.CellmaButton
                    label={translate("upload", language)}
                    disabled={value === "No"}
                    size="medium"
                    onClick={() => {
                      validateImage();
                    }}
                  />
                </Mui.Grid>
              </Mui.Grid>

              <Mui.Grid item container xs={12} sx={styles.alignCenter}>
                <Mui.Grid item xs={12} sm={9} sx={styles.alignCenter}>
                  <Mui.Typography sx={{ color: "grey.500" }}>
                    {translate("patientImageShouldBe", language)}
                  </Mui.Typography>
                </Mui.Grid>
                <Mui.Grid item xs={12} sx={styles.alignCenter}>
                  <Mui.Typography sx={{ color: "grey.500" }}>
                    {translate("itShouldAlsoHaveResolution", language)}
                  </Mui.Typography>
                </Mui.Grid>
              </Mui.Grid>
              <Mui.Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <Common.CellmaButton
                  label={translate("printIDCard", language)}
                  size="medium"
                  onClick={handlePrint}
                  disabled={isPrintButtonDisabled}
                />
                <Common.CellmaButton
                  label={translate("save", language)}
                  type="submit"
                  size="medium"
                  onClick={() =>
                    dispatch(
                      setSnackbar(
                        true,
                        "success",
                        translate("updatedSuccessfully", language),
                        4
                      )
                    )
                  }
                />
              </Mui.Grid>
              <Mui.Grid sx={{ display: "none" }}>
                <Mui.Grid ref={componentToPrint}>
                  <IDCard />
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Grid>
          </form>
        );
      }}
    </Formik>
  );
};
export default PrintIdCard;

const styles = {
  alignCenter: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    gap: "2.5rem",
  },
  photoCamera: {
    color: "gray",
  },
  photoImg: {
    justifyContent: "center",
    mt: "20px",
  },
  textGrid: {
    justifyContent: "center",
    mt: "20px",
  },

  text1: {
    justifyContent: "center",
    mt: "10px",
  },
};
