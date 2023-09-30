import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByName } from "../../redux/actions";
import "./searchBar.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate, useLocation } from "react-router-dom";
import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();
  const allProducts2 = useSelector((state) => state.allProducts2);

  const handleInput = (event) => {
    console.log(event.target.value);
    setProduct(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setProduct("");
    location.pathname != "/home" ? navigate("/home") : null;
    dispatch(searchByName(product));
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch(event);
    }
  };

  return (
    <Grid
      item
      sx={{
        display: "flex",
      }} /* className="SearchBar_Container" */
    >
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "#ebebeb",
          borderRadius: "6px",
          border: "3px solid #e76000",
        }}
      >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={allProducts2.map((option) => option.name)}
          // value={product}
          onKeyDown={handleKeyDown}
          onInputChange={(event, newValue) => {
            setProduct(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Busca un producto"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>
      <Button type="search" onClick={handleSearch}>
        <SearchIcon sx={{ fontSize: 40 }} />
      </Button>
    </Grid>
  );
};

export default SearchBar;
