import { Pagination } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";

// import { setPaginationNumber } from "../store/CommonAction";
interface Props {
  listCount: any;
  maxLength: any;
  dispatch: any;
  setPaginationNumber: any;
}
export const CellmaPagination: React.FC<Props> = (props) => {
  const count = Math.ceil(props.listCount / props.maxLength);

  return (
    <Pagination
      color="primary"
      count={count}
      onChange={(event, value) => {
        props.dispatch(props.setPaginationNumber(value));
      }}
    />
  );
};

export default CellmaPagination;
