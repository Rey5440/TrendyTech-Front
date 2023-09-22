import "./filter.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAll, getAllProducts } from "../../redux/actions";
import Slider from 'react-slider';


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
  return (
    <div className="FilterTech">
      <div>
        <select
          onChange={handleType}
          defaultValue=""
        >
          <option value="" selected hidden>
            Seleccione una categoria
          </option>
          {allProducts1.length > 0 &&
            Array.from(
              new Set(allProducts1.map((product) => product.type))
            ).map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <select onChange={handleBrand} /* value='' */ defaultValue="">
          <option value="" selected hidden>
            Seleccione una marca
          </option>
          {allProducts1.length > 0 &&
            Array.from(
              new Set(allProducts1.map((product) => product.brand))
            ).map((brand, index) => {
              return (
                <option key={index} value={brand}>
                  {brand}
                </option>
              );
            })}
        </select>
      </div>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Price Range</h2>
        <p>Use the slider to select a price range:</p>
        <Slider
          className="slider"
          value={values}
          onChange={handleRange}
          min={MIN}
          max={MAX}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <label htmlFor="minPrice">Min Price:</label>
            <input
              type="number"
              id="minPrice"
              value={values[0]}
              onChange={(e) => handleChange([+e.target.value, values[1]])}
            />
          </div>
          <div>
            <label htmlFor="maxPrice">Max Price:</label>
            <input
              type="number"
              id="maxPrice"
              value={values[1]}
              onChange={(e) => handleChange([values[0], +e.target.value])}
            />
          </div>
        </div>
      </div>
      <div>
        <button onClick={handleClear}>Clear filters</button>
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

