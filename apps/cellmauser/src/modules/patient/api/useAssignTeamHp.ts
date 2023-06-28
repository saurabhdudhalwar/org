import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { ASSIGN_TEAM, ASSIGN_TEAM_DISPLAY } from "../../../config";
import useAxios from "../../../hooks/useAxios";
import dispatchSnackbar from "../../../utils/ResponseCodeHandler";

export const useAssignTeamDisplay = (phlId?: number) => {
  const axiosInstance = useAxios();
  const getAssignTeamDisplay = (id?: number) => {
    return axiosInstance.get(ASSIGN_TEAM_DISPLAY, {
      params: { phlId: id ?? null },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (response?.data?.validationCode === "assigned.team.display.success") {
        if (response?.data?.entity) {
          return {
            clinicList: response?.data?.entity?.clinicList,
            consultantList: response?.data?.entity?.consultantList,
            patientHpLinkingList: response?.data?.entity?.patientHpLinkingList,
          };
        }
      }
    }
  };

  return useQuery(
    [ASSIGN_TEAM_DISPLAY, phlId],
    () => getAssignTeamDisplay(phlId),
    {
      select,
      cacheTime: 0,
    }
  );
};

type ParameterList = {
  espId?: number;
  regionEliId?: number;
  patId: number;
  startDate?: string;
  endDate?: string;
  speciality?: string;
};

export const useAssignTeamDetails = (parameterList: ParameterList) => {
  const axiosInstance = useAxios();

  const getAssignTeamDetails = (parameterList: ParameterList) => {
    return axiosInstance.get(ASSIGN_TEAM, {
      params: parameterList,
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      return response?.data?.entity?.patientHpLinkingDetailsList;
    }
  };

  return useQuery(ASSIGN_TEAM, () => getAssignTeamDetails(parameterList), {
    select,
    cacheTime: 0,
  });
};

export const usePostAssignTeam = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const postAssignTeam = (assignTeamDetails: object) => {
    return axiosInstance.post(ASSIGN_TEAM, assignTeamDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
  };

  return useMutation(postAssignTeam, { onSuccess });
};

export const usePutAssignTeam = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const { language } = useSelector((state: any) => state.language);

  const putAssignTeam = (assignTeamDetails: any) => {
    return axiosInstance.put(ASSIGN_TEAM, assignTeamDetails);
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response, dispatch, language);
  };

  return useMutation(putAssignTeam, { onSuccess });
};

export const useDeleteAssignTeamDetails = () => {
  const axiosInstance = useAxios();

  const deleteAssignTeamDetails = (Id: string) => {
    return axiosInstance.delete(ASSIGN_TEAM, {
      params: { phlId: Id },
    });
  };

  return useMutation(deleteAssignTeamDetails);
};
