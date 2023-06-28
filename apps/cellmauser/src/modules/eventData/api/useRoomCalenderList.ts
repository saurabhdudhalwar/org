import qs from "qs";
import { useQuery } from "react-query";

import useAxios from "../../../hooks/useAxios";
import { ROOM_CALENDER_LIST } from "../config";

const useRoomCalenderList = (searchDate: string) => {
  const axiosInstance = useAxios();

  const getClinicType = (date: string) => {
    return axiosInstance.get(ROOM_CALENDER_LIST, {
      params: date,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify(
            {
              searchDate: params,
            },
            { arrayFormat: "repeat" }
          );
        },
      },
    });
  };
  const select = (response: any) => {
    if (response?.status === 200) {
      if (response?.data?.validationCode === "room.calender.list.found")
        return { roomList: response?.data?.entity?.roomList };
    }
    return null;
  };

  const { data, refetch } = useQuery(
    [ROOM_CALENDER_LIST, searchDate],
    () => getClinicType(searchDate),
    {
      select,
      refetchOnWindowFocus: true,
    }
  );

  const roomList = data?.roomList ?? [];

  return { roomList, refetch };
};

export default useRoomCalenderList;
