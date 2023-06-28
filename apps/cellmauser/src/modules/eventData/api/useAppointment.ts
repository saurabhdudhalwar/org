import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import {
  SIDEBAR_CLINIC_LOCATION,
  SIDEBAR_CLINIC_TYPE,
  SIDEBAR_ROOMS_LIST,
} from "../config";

export const useGetClinicType = (ctlSpecialityEliId: any) => {
  const axiosInstance = useAxios();

  const getClinicType = (ctlSpecialityEliId: any) => {
    return axiosInstance.get(SIDEBAR_CLINIC_TYPE, {
      params: { ctlSpecialityEliId },
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      if (
        response?.data?.validationCode === "appointment.clinic.type.list.found"
      ) {
        return {
          clinicType: response?.data?.entity?.clinicType,
        };
      }
    }
  };

  const { data, refetch } = useQuery(
    [SIDEBAR_CLINIC_TYPE, ctlSpecialityEliId],
    () => getClinicType(ctlSpecialityEliId),
    {
      select,
    }
  );

  const clinicType = data?.clinicType ?? [];

  return { clinicType, refetch };
};

export const useGetClinicLocation = (ctlClinictypeid: any) => {
  const axiosInstance = useAxios();

  const getClinicLocation = (ctlClinictypeid: any) => {
    return axiosInstance.get(SIDEBAR_CLINIC_LOCATION, {
      params: { ctlClinictypeid },
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "cliniclocations.found") {
        return {
          clinicLocation: response?.data?.entity?.clinicTypesLocationList,
        };
      }
    }
  };
  const { data, refetch } = useQuery(
    [SIDEBAR_CLINIC_LOCATION, ctlClinictypeid],
    () => getClinicLocation(ctlClinictypeid),
    {
      select,
    }
  );
  const clinicLocation = data?.clinicLocation ?? [];
  return { clinicLocation, refetch };
};

type ParameterList = {
  arsSpecialityEliId: any;
  arsClinicTypeId: any;
  arsClinicLocationId: any;
  arsRegionEliId: any;
};

export const useGetRoomsList = (parameterList: ParameterList) => {
  const axiosInstance = useAxios();

  const getRoomsList = (parameterList: ParameterList) => {
    return axiosInstance.get(SIDEBAR_ROOMS_LIST, {
      params: parameterList,
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      return {
        appointmentRoomList: response?.data?.entity?.appointmentRoomList,
      };
    }
    return null;
  };
  return useQuery(SIDEBAR_ROOMS_LIST, () => getRoomsList(parameterList), {
    select,
    enabled: false,
    cacheTime: 0,
  });
};
