import Compressor from "compressorjs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import { setSnackbar } from "../../../store/SnackbarAction";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";
import * as validations from "../../../utils/Validations";
import translate from "../assets/translationFiles/patientDemographicsTranslation";
import { PATIENT_PHOTO, PATIENT_PHOTO_UPLOAD } from "../config";

type PhotoUploadObject = {
  patId: string;
  imageBase64: string;
};

export const useUploadPatientPhoto = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { language } = useSelector((state: any) => state.language);

  const uploadPhoto = (photoObject: PhotoUploadObject) => {
    return axiosInstance.post(PATIENT_PHOTO_UPLOAD, photoObject);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
    queryClient.invalidateQueries(PATIENT_PHOTO);
  };

  const { mutate, isLoading, data } = useMutation(uploadPhoto, { onSuccess });

  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const loadPatientPhoto = (event: any, patientId: string) => {
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

        return false;
      }
      console.log("loading patient photo... ");
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
              console.log("processing 1");
              mutate({ patId: patientId, imageBase64: res });
            });
          } else {
            console.log("processing 2");
            mutate({ patId: patientId, imageBase64: image.src });
          }
          console.log(result.size);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  };

  return { loadPatientPhoto, isLoading, data, mutate };
};

export const useGetPatientPhoto = (patientId: number) => {
  const axiosInstance = useAxios();

  const getPatientPhoto = (patId: any) => {
    return axiosInstance.get(PATIENT_PHOTO, {
      params: { patId },
    });
  };

  const select = (response: any) => {
    if (
      response.status === 200 &&
      response?.data?.entity?.patientPhoto !== undefined
    ) {
      return `data:image/jpeg;base64,${response?.data?.entity?.patientPhoto}`;
    }
  };

  return useQuery(PATIENT_PHOTO, () => getPatientPhoto(patientId), {
    cacheTime: 0,
    select,
  });
};
