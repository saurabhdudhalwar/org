import qs from "qs";
import { useQuery } from "react-query";

import useAxios from "../hooks/useAxios";
import { ESTABLISHMENT_LIST_ITEM } from "../modules/authentication/config";

const useEstablishmentListItems = (names: string[]) => {
  const axiosInstance = useAxios();

  type AppItem = {
    eliId: number;
    eliText: string;
    eliNumericValue: number | null;
    eliShow: number;
    eliEstId: number;
    eliCliId: number | null;
    estListId: number | null;
    appName: string;
    eliIdentifierType: string | null;
  };

  const nameType = [...names] as const;

  type AppItems = {
    [K in (typeof nameType)[number]]: AppItem[];
  };

  const createEmptyObject = (): AppItems => {
    const defaultObject = {} as AppItems;
    names.forEach((name) => {
      defaultObject[name] = [];
    });
    return defaultObject;
  };

  const getEstablishmentListItems = (appName: string[]) => {
    return axiosInstance.get(ESTABLISHMENT_LIST_ITEM, {
      params: appName,
      paramsSerializer: {
        serialize: (params) => {
          return qs.stringify({ appName: params }, { arrayFormat: "repeat" });
        },
      },
    });
  };

  const select = (response: any) => {
    if (response.status === 200) {
      const responseCode = response?.data?.validationCode;
      if (responseCode === "establishmentlistitem.found") {
        const obj = {} as AppItems;

        names.forEach((name) => {
          const AppItems: AppItem[] =
            response?.data?.entity?.establishmentListItems?.[name];
          AppItems?.sort((a, b) => {
            const x = a?.eliText?.toLowerCase();
            const y = b?.eliText?.toLowerCase();
            if (x > y) return 1;
            if (x < y) return -1;
            return 0;
          });

          obj[name] = AppItems ?? [];
        });

        return obj as AppItems;
      }
    }
    return null;
  };

  const emptyObject: AppItems = createEmptyObject();

  const { data: listItems, isLoading } = useQuery(
    [ESTABLISHMENT_LIST_ITEM, names],
    () => getEstablishmentListItems(names),
    {
      cacheTime: 0,
      select,
      refetchOnMount: true,
    }
  );

  const data = listItems || emptyObject;

  return { data, isLoading };
};

export default useEstablishmentListItems;
