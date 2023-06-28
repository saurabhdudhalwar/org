import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setPaginationNumber } from "../store/CommonAction";

const CellmaPagination = (props: any) => {
  const dispatch = useDispatch();
  const count = Math.ceil(props.listCount / props.maxLength);

  return (
    <Pagination
      color="primary"
      count={count}
      onChange={(event, value) => {
        dispatch(setPaginationNumber(value));
      }}
    />
  );
};

export default CellmaPagination;
