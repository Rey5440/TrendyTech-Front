import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderByPrice } from "../../redux/actions";

const OrderBy = () => {
  const [orderBy, setOrderBy] = useState("");
  const searchOn = useSelector((state) => state.searchOn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderByPrice(orderBy));
  }, [orderBy]);

  useEffect(() => {
    setOrderBy("");
  }, [searchOn]);
  //-----------ordenamiento--------------//

  const handleChange = (event) => {
    setOrderBy(event.target.value);
  };
  //-------------------------------------//
  return (
    <Grid container sx={{ padding: "6px" }}>
      <Grid item xs={8} sm={9} md={9} lx={9}></Grid>
      <Grid item xs={4} sm={3} md={3} lx={3}>
        <FormControl fullWidth variant="standard">
          <InputLabel color="warning" id="demo-simple-select-label">
            ORDEN
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderBy}
            label="order"
            onChange={handleChange}
            color="warning"
          >
            <MenuItem value={"asc"}>Mayor Precio</MenuItem>
            <MenuItem value={"desc"}>Menor precio</MenuItem>
            <MenuItem value={"dest"}>Destacados</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default OrderBy;
// import {
//   // Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
// } from "@mui/material";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// const OrderBy = ({ orderBy, setOrderBy }) => {
// const searchOn = useSelector((state) => state.searchOn);
// const [order, setOrder] = useState(orderBy);

//   useEffect(()=> {
//     setOrderBy(false)
//   },[searchOn])
//   //-----------ordenamiento--------------//

//   const handleChange = (event) => {
//     setOrderBy(event.target.value);
//     setOrder(event.target.value);
//   };
//   //-------------------------------------//
//   return (
//     <Grid container sx={{ padding: "6px" }}>
//       <Grid item xs={8} sm={9} md={9} lx={9}></Grid>
//       <Grid item xs={4} sm={3} md={3} lx={3}>
//         <FormControl fullWidth variant="standard">
//           <InputLabel color="warning" id="demo-simple-select-label">
//             ORDEN
//           </InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             value={order}
//             label="order"
//             onChange={handleChange}
//             color="warning"
//           >
//             <MenuItem value={"asc"}>Mayor Precio</MenuItem>
//             <MenuItem value={"desc"}>Menor precio</MenuItem>
//             <MenuItem value={"dest"}>Destacados</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//     </Grid>
//   );
// };
// export default OrderBy;
