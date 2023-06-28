import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import useAxios from "../../../hooks/useAxios";
import { PATIENT_BARCODE_DETAILS } from "../config";

type IPatientBarcodeDetails = {
  estName: string;
  patBarcode: number;
  patFullName: string;
  patientBarcode: string;
};

const usePatientBarcode = () => {
  const axiosInstance = useAxios();
  const { patientId } = useSelector((state: any) => state.patient);

  const getPatientBarcode = (patId: number) => {
    return axiosInstance.get(PATIENT_BARCODE_DETAILS, { params: { patId } });
  };

  const select = (response: any) => {
    if (response.status === 200)
      if (response.data.validationCode === "patient.idcard.print.success")
        return response.data.entity as IPatientBarcodeDetails;
  };

  return useQuery(
    [PATIENT_BARCODE_DETAILS, patientId],
    () => getPatientBarcode(patientId),
    { select, enabled: typeof patientId === "number" }
  );
};

export default usePatientBarcode;
