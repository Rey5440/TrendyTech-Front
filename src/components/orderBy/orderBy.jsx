import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const OrderBy = ({ orderBy, setOrderBy }) => {

  const searchOn = useSelector((state) => state.searchOn);

  useEffect(()=> {
    setOrderBy(false)
  },[searchOn])
  //-----------ordenamiento--------------//

  const handleChange = (event) => {
    setOrderBy(event.target.value);
  };
  //-------------------------------------//
  return (
    <Grid container sx={{ padding: "6px" }}>
      <Grid
        item
        xs={8}
        sm={9}
        md={9}
        lx={9}
      ></Grid>
      <Grid item xs={4} sm={3} md={3} lx={3}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="demo-simple-select-label">ORDEN</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderBy}
            label="order"
            onChange={handleChange}
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
