import "./filter.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAll, getAllProducts } from "../../redux/actions";
import Slider from "react-slider";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Filter = () => {
  const dispatch = useDispatch();
  const allProducts1 = useSelector((state) => state.allProducts1);
  const allProducts2 = useSelector((state) => state.allProducts2);
  const getLowestPrice = (products) => {
    return Math.min(...products.map((product) => product.price));
  };
  const getHighestPrice = (products) => {
    return Math.max(...products.map((product) => product.price));
  };
  const MIN = getLowestPrice(allProducts2);
  const MAX = getHighestPrice(allProducts2);
  const [values, setValues] = useState([MIN, MAX]);

  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleType = (event) => {
    const typeFilter = allProducts1.filter(
      (product) => product.type === event.target.value
    );
    dispatch(filterAll(typeFilter));
    const min = getLowestPrice(typeFilter);
    const max = getHighestPrice(typeFilter);
    setValues([min, max]);
    setSelectedType(event.target.value);
  };

  const handleBrand = (event) => {
    const brandFilter = allProducts1.filter(
      (product) => product.brand === event.target.value
    );
    dispatch(filterAll(brandFilter));
    const min = getLowestPrice(brandFilter);
    const max = getHighestPrice(brandFilter);
    setValues([min, max]);
    setSelectedBrand(event.target.value);
  };

  const handleClear = () => {
    dispatch(getAllProducts());
    setValues([MIN, MAX]);
    setSelectedType("");
    setSelectedBrand("");
  };

  const handleRange = (newValues) => {
    setValues(newValues);
    let filterPrice = allProducts2.filter(
      (product) =>
        product.price >= newValues[0] && product.price <= newValues[1]
    );
    if (selectedType !== "") {
      const filterPriceType = filterPrice.filter(
        (product) => product.type === selectedType
      );
      filterPrice = filterPriceType;
    }
    if (selectedBrand !== "") {
      const filterPriceBrand = filterPrice.filter(
        (product) => product.brand === selectedBrand
      );
      filterPrice = filterPriceBrand;
    }

    dispatch(filterAll(filterPrice));
  };

  const handleDisabled = () => {
    return allProducts1.length ? "true" : "false";
  };
  return (
    <div className="FilterTech">
      <FormControl
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <InputLabel>Seleccione una categoria</InputLabel>
        {allProducts1.length ? (
          <Select
            sx={{ width: "15rem" }}
            onChange={handleType}
            defaultValue=""
            label="Seleccione una categoria"
            color="warning"
            // disabled={allProducts1.length ? "false" : "false"}
          >
            {allProducts1.length > 0 &&
              Array.from(
                new Set(allProducts1.map((product) => product.type))
              ).map((type, index) => {
                return (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                );
              })}
          </Select>
        ) : (
          <Select sx={{ width: "15rem" }} variant="filled" disabled></Select>
        )}
      </FormControl>

      <FormControl
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5px",
        }}
      >
        <InputLabel>Seleccione una marca</InputLabel>
        {allProducts1.length ? (
          <Select
            sx={{ width: "15rem" }}
            onChange={handleBrand}
            defaultValue=""
            label="Seleccione una marca"
            color="warning"
          >
            {allProducts1.length > 0 &&
              Array.from(
                new Set(allProducts1.map((product) => product.brand))
              ).map((brand, index) => {
                return (
                  <MenuItem key={index} value={brand}>
                    {brand}
                  </MenuItem>
                );
              })}
          </Select>
        ) : (
          <Select sx={{ width: "15rem" }} variant="filled" disabled></Select>
        )}
      </FormControl>
      <div
        style={{
          marginTop: "10px",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3>Rango de precio</h3>
        <Slider
          className="slider"
          value={values}
          onChange={handleRange}
          min={MIN}
          max={MAX}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              paddingRight: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="minPrice">Min</label>
            <span>$ {values[0]}</span>
          </div>
          <div
            style={{
              paddingLeft: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="maxPrice">Max</label>
            <span>$ {values[1]}</span>
          </div>
        </div>
      </div>
      <div>
        <Button variant="contained" onClick={handleClear}>
          Eliminar filtros
        </Button>
      </div>
    </div>
  );
};

export default Filter;

/* 0
: 
{id: 1, name: 'Keyboard', createdAt: '2023-09-17T23:43:47.653Z', updatedAt: '2023-09-17T23:43:47.653Z'}
1
: 
{id: 2, name: 'Headset', createdAt: '2023-09-17T23:43:47.658Z', updatedAt: '2023-09-17T23:43:47.658Z'}
2
: 
{id: 3, name: 'Keyboard', createdAt: '2023-09-17T23:43:47.659Z', updatedAt: '2023-09-17T23:43:47.659Z'}
3
: 
{id: 4, name: 'Smartphone', createdAt: '2023-09-17T23:43:47.660Z', updatedAt: '2023-09-17T23:43:47.660Z'}
4
: 
{id: 5, name: 'Gaming Console', createdAt: '2023-09-17T23:43:47.660Z', updatedAt: '2023-09-17T23:43:47.660Z'}
5
: 
{id: 6, name: 'Laptop', createdAt: '2023-09-17T23:43:47.661Z', updatedAt: '2023-09-17T23:43:47.661Z'}
6
: 
{id: 7, name: 'Headphones', createdAt: '2023-09-17T23:43:47.661Z', updatedAt: '2023-09-17T23:43:47.661Z'}
7
: 
{id: 8, name: 'Monitor', createdAt: '2023-09-17T23:43:47.662Z', updatedAt: '2023-09-17T23:43:47.662Z'}
8
: 
{id: 9, name: 'Action Camera', createdAt: '2023-09-17T23:43:47.663Z', updatedAt: '2023-09-17T23:43:47.663Z'}
9
: 
{id: 10, name: 'Mouse', createdAt: '2023-09-17T23:43:47.664Z', updatedAt: '2023-09-17T23:43:47.664Z'}
10
: 
{id: 11, name: 'Fitness Tracker', createdAt: '2023-09-17T23:43:47.702Z', updatedAt: '2023-09-17T23:43:47.702Z'}
length
: 
11
[[Prototype]]
: 
Array(0) */
