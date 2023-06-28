import { useEffect, useReducer, useState } from "react";

import { useMutation, useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import useDispatchSnackbar from "../../../hooks/useDispatchSnackbar";
import { ADD_GP_DETAILS, LOCAL_GP, NATIONAL_GP, PATIENT_GP } from "../config";

const useNationalGPList = (
  searchQuery: any,
  pageNumber: number,
  enabled: boolean
) => {
  const axiosInstance = useAxios();
  const [listCount, setListCount] = useState(0);
  const dispatchSnackbar = useDispatchSnackbar();

  const getNationalGPLists = (nationalGPDetails: any) => {
    return axiosInstance.get(NATIONAL_GP, {
      params: { ...nationalGPDetails, pageNumber },
    });
  };

  const onSuccess = (response: any) => {
    dispatchSnackbar(response.response);
  };

  const select = (response: any) => {
    return {
      count: response?.data?.entity?.nationalGpCount,
      nationalGPList: response?.data?.entity?.nationalGpList,
      response,
    };
  };

  const { data, isLoading, refetch } = useQuery(
    [NATIONAL_GP, searchQuery, pageNumber],
    () => getNationalGPLists(searchQuery),
    { select, onSuccess, enabled, cacheTime: 0 }
  );

  useEffect(() => {
    if (data?.count) setListCount(data.count);
  }, [data?.count]);

  const nationalGpList = data?.nationalGPList || [];

  return { listCount, nationalGpList, isLoading, refetch };
};

const useLocalGPList = (
  searchQuery: any,
  pageNumber: number,
  enabled: boolean
) => {
  const axiosInstance = useAxios();
  const dispatchSnackbar = useDispatchSnackbar();
  const [listCount, setListCount] = useState(0);

  const getLocalGPLists = (localGPDetails: any) => {
    return axiosInstance.post(LOCAL_GP, localGPDetails);
  };

  const select = (response: any) => {
    return {
      count: response?.data?.entity?.totalCount,
      localGpList: response?.data?.entity?.establishmentGpList,
      response,
    };
  };
  const onSuccess = (response: any) => {
    dispatchSnackbar(response.response);
  };

  // because the endpoint is being used to fetch data, even though it is a post
  // request I felt it best to use useQuery because of the ability to transform data
  const { data, isLoading, refetch, status } = useQuery(
    [LOCAL_GP, searchQuery, pageNumber],
    () => getLocalGPLists(searchQuery),
    { select, onSuccess, enabled, cacheTime: 0 }
  );

  useEffect(() => {
    if (data?.count) setListCount(data.count);
  }, [data?.count]);

  const localGpList = data?.localGpList || [];

  return { listCount, localGpList, isLoading, refetch, status };
};

type GPQuery = {
  familyName?: string;
  gpFullName?: string;
  gpCode?: string;
  practiceName?: string;
  towncity?: string;
  postcode?: string;
  ccg?: string;
};

type GPState = {
  gpList: string[];
  gpCount: number;
  listType: string;
  status: string;
};

const gpReducer = (state: GPState, action: any) => {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        gpList: action.payload.gpList,
        gpCount: action.payload.gpCount,
        listType: action.payload.listType,
        status: "success",
      };
    case "updateList":
      return {
        ...state,
        gpList: action.payload,
      };
    case "updateStatus":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return { ...state };
  }
};

export const useGPList = (searchQuery: GPQuery, pageNumber: number) => {
  const [gpState, updateGPState] = useReducer(gpReducer, {
    gpList: [],
    gpCount: 0,
    listType: "",
    status: "",
  });

  const localGpListSearch = {
    egpSurname: searchQuery?.familyName,
    egpFullname: searchQuery?.gpFullName,
    egpGpCode: searchQuery?.gpCode,
    egpCcg: searchQuery?.ccg,
    addressJson: {
      addAddress1: searchQuery?.practiceName,
      address34: searchQuery?.towncity,
      addAddress5: searchQuery?.postcode,
    },
    searchMode: "true",
    pageNumber,
  };

  const nationalGpSearch = {
    apdSurname: searchQuery?.familyName,
    apdFullname: searchQuery?.gpFullName,
    apdGpCode: searchQuery?.gpCode,
    apdPracticeName: searchQuery?.practiceName,
    apdAddress3: searchQuery?.towncity,
    apdPostcode: searchQuery?.postcode,
    pageNumber,
  };

  const { refetch: localRefetch, isLoading: localGPListIsLoading } =
    useLocalGPList(localGpListSearch, pageNumber, false);

  const { refetch: nationalRefetch, isLoading: nationalGpListIsLoading } =
    useNationalGPList(nationalGpSearch, pageNumber, false);

  const refetch = async () => {
    const localResult = await localRefetch();

    if (localResult?.data?.count) {
      return updateGPState({
        type: "setData",
        payload: {
          gpList: localResult.data.localGpList,
          gpCount: localResult.data.count,
          listType: "local Gp",
        },
      });
    }
    const nationalResult = await nationalRefetch();
    if (nationalResult?.data?.count) {
      return updateGPState({
        type: "setData",
        payload: {
          gpList: nationalResult.data.nationalGPList,
          gpCount: nationalResult.data.count,
          listType: "national Gp",
        },
      });
    }

    return updateGPState({
      type: "updateStaus",
      payload: nationalResult.status,
    });
  };

  const paginatedRequest = async () => {
    if (gpState.listType === "local Gp") {
      const localResult = await localRefetch();
      return updateGPState({
        type: "updateList",
        payload: localResult?.data?.localGpList,
      });
    }
    if (gpState.listType === "national Gp") {
      const nationalResult = await nationalRefetch();
      return updateGPState({
        type: "updateList",
        payload: nationalResult?.data?.nationalGPList,
      });
    }
  };

  useEffect(() => {
    if (pageNumber > 1) {
      paginatedRequest();
    }
  }, [pageNumber]);

  const { gpList, gpCount, listType, status } = gpState;
  const isLoading = nationalGpListIsLoading || localGPListIsLoading;

  return { gpList, gpCount, refetch, isLoading, listType, status };
};

export const usePatientGP = (patientID: number) => {
  const axiosInstance = useAxios();

  const getPatientGP = (patId: number) => {
    return axiosInstance.get(PATIENT_GP, { params: { patId } });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      if (response?.data?.validationCode === "establishmentgp.get.success")
        return response.data.entity;
    }
  };

  return useQuery([PATIENT_GP, patientID], () => getPatientGP(patientID), {
    select,
  });
};

type AddGpToPatient = {
  patId: number;
  apdId: number;
};

export const useAddNationalGpToPatient = () => {
  const axiosInstance = useAxios();

  const addGpToPatient = (request: AddGpToPatient) => {
    return axiosInstance.post(NATIONAL_GP, null, { params: { ...request } });
  };

  return useMutation(addGpToPatient);
};

type AddLocalGpToPatient = {
  patId: number;
  egpId: number;
};

export const useAddLocalGpToPatient = () => {
  const axiosInstance = useAxios();

  const addGpToPatient = (request: AddLocalGpToPatient) => {
    return axiosInstance.post(ADD_GP_DETAILS, null, {
      params: { ...request },
    });
  };

  return useMutation(addGpToPatient);
};
