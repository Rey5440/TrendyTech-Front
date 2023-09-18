
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../redux/actions";
import "./filter.css";

const Filter = () => {
  const dispatch = useDispatch();

  const [filterOptions, setFilterOptions] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    colorId: "", // Agrega colorId
    typeId: "",  // Agrega typeId
  });

  const handleBrandSelect = (event) => {
    const brand = event.target.value;
    setFilterOptions((prevOptions) => ({ ...prevOptions, brand }));
    dispatch(
      filterProducts(
        filterOptions.colorId, // Pasa colorId
        filterOptions.typeId,  // Pasa typeId
        brand,
        filterOptions.minPrice,
        filterOptions.maxPrice
      )
    );
  };

  const handlePriceFilter = () => {
    const { brand, minPrice, maxPrice, colorId, typeId } = filterOptions;
    dispatch(filterProducts(colorId, typeId, brand, minPrice, maxPrice));
  };

  return (
    <div className="navbar navbar-expand-lg bg-body-tertiary containerFilter">
      <h4>Brand</h4>
      <select
        className="form-select"
        name="selectedBrand"
        onChange={handleBrandSelect}
        value={filterOptions.brand}
      >
        <option disabled>Select brand</option>
        {/* Tu código para mapear las opciones de marca aquí */}
      </select>

      <h4>Price</h4>
      <div className="containerPrice">
        <label>
          <input
            className="inputPrice"
            type="number"
            min="0"
            name="minPrice"
            value={filterOptions.minPrice}
            onChange={(e) =>
              setFilterOptions((prevOptions) => ({
                ...prevOptions,
                minPrice: e.target.value,
              }))
            }
            placeholder="Price Min"
          />
          <input
            className="inputPrice"
            type="number"
            min="0"
            name="maxPrice"
            value={filterOptions.maxPrice}
            onChange={(e) =>
              setFilterOptions((prevOptions) => ({
                ...prevOptions,
                maxPrice: e.target.value,
              }))
            }
            placeholder="Price Max"
          />
        </label>
      </div>
      <button className="btnPrice" onClick={handlePriceFilter}>
        Search
      </button>
    </div>
  );
};

export default Filter;

// import { useState } from "react";
// import {  useDispatch } from "react-redux";
// import {  filterProducts } from "../../redux/actions";
// import "./filter.css";

// const Filter = () => {

//   const dispatch = useDispatch();

//   //Estado inicial de brand y price
//   const [filterOptions, setFilterOptions] = useState({
//     brand: "",
//     minPrice: "",
//     maxPrice: "",
//   });


//   const filterBrands = [];



//   const handleBrandSelect = (event) => {
//     //toma el valor de la marca seleccionada
//     const brand = event.target.value;
//     //Lo manda a filterOptions y lo almacena en el pbjeto de peticion
//     setFilterOptions((prevOptions) => ({ ...prevOptions, brand }));
//     //despacha el filtrado que puede o no tener precios
//     dispatch(filterProducts(brand, filterOptions.minPrice, filterOptions.maxPrice));
//     // onPageChange(1)
//   };

//   const handlePriceFilter = () => {
//     // toma brand y prices del estado filterOptions
//     const { brand, minPrice, maxPrice } = filterOptions;
//     //Se llama al dispatch con los argumentos brand minPrice y max price, brand puede o no estar
//     dispatch(filterProducts(brand, parseInt(minPrice), parseInt(maxPrice)));
//     // onPageChange(1)
//   };
  
//   return (
//     <div className="navbar navbar-expand-lg bg-body-tertiary containerFilter">
//       <h4>Order</h4>
//       {/* <select className="form-select" name="order" onChange={handleOrderSelect}>
//         <option value="" disabled>
//           Order by Name
//         </option>
//         <option value="1">Name A-Z</option>
//         <option value="2">Name Z-A</option>
//       </select> */}

//       <h4>Brand</h4>
//       <select
//         className="form-select"
//         name="selectedBrand"
//         onChange={handleBrandSelect}
//         value={filterOptions.brand}
//       >
//         <option disabled>Select brand</option>
//         {filterBrands.map((brand, index) => (
//           <option key={index} value={brand}>
//             {brand}
//           </option>
//         ))}
//       </select>
//       <h4>Price</h4>
//       <div className="containerPrice">
//         <label>

//         <input
//             className="inputPrice"
//             type="number"
//             min="0"
//             name="minPrice"
//             value={filterOptions.minPrice}
//             onChange={(e) =>
//               setFilterOptions((prevOptions) => ({
//                 ...prevOptions,
//                 minPrice: e.target.value,
//               }))
//             }
//             placeholder="Price Min"
//         />
//         <input
//           className="inputPrice"
//           type="number"
//           min="0"
//           name="maxPrice"
//           //lo vinculamos al objeto filterOptions
//           value={filterOptions.maxPrice}
//           //Actualiza el estado 
//           onChange={(e) =>
//             setFilterOptions((prevOptions) => ({
//               ...prevOptions,
//               maxPrice: e.target.value,
//             }))
//           }
//           placeholder="Price Max"
//         />
          
//         </label>
//       </div>
//       <button className="btnPrice" onClick={handlePriceFilter}>
//         Search
//       </button>
//     </div>
//   );
// };

// export default Filter;

// import { useSelector } from 'react-redux';
// import './filter.css';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Filter = () => {
//     const [brands, setBrands] = useState([]);
//     const [types, setTypes] = useState([]);

//     useEffect(() => {
//         const fetchBrands = async () => {
//           try {
//             const response = await axios.get(
//               `http://localhost:3004/products/brands`
//             );
//             const { data } = response;
//             setBrands(data);
//           } catch (error) {
//             console.log(error)
//           }
//         };
//         fetchBrands();
//       }, []);

//       useEffect(() => {
//         const fetchTypes = async () => {
//           try {
//             const response = await axios.get(
//               `http://localhost:3004/products/types`
//             );
//             const { data } = response;
//             setTypes(data);
//           } catch (error) {
//             console.log(error)
//           }
//         };
//         fetchTypes();
//       }, []);



//     return (
//         <div className="FilterTech">
//             <div>
//                 <select>
//                 {types[0] && types.map((type, index) => (
//           <option 
//             key={index} 
//             value={type.id}
//           >
//             {type.name}
//           </option>
//         ))}
//                 </select>
//             </div>
//             <div>
//                 <label>min price $
//                     <input type='number'></input>
//                 </label>
//             </div>
//             <div>
//                 <label>max price $
//                     <input type='number'></input>
//                 </label>
//             </div>
//             <div>
//                 <select>
//                 {brands[0] && brands.map((brand, index) => (
//           <option 
//             key={index} 
//             value={brand.id}
//           >
//             {brand.name}
//           </option>
//         ))}
//                 </select>
//             </div>
//         </div>
//     )
// }

