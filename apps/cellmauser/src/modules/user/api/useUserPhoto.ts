import { useMutation } from "react-query";

import useAxios from "../../../hooks/useAxios";
import useDispatchSnackbar from "../../../hooks/useDispatchSnackbar";
import { USER_UPLOAD_PHOTO } from "../config";

type PhotoUploadObject = {
  useUsername: string;
  imageBase64: string;
};

const useUploadUserPhoto = () => {
  const axiosInstance = useAxios();
  const dispatchSnackbar = useDispatchSnackbar();

  const uploadPhoto = (photoObject: PhotoUploadObject) => {
    return axiosInstance.post(USER_UPLOAD_PHOTO, photoObject);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response);
  };

  return useMutation(uploadPhoto, { onSuccess });
};

export default useUploadUserPhoto;
