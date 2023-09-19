import "./filter.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { filterAll } from "../../redux/actions";
import AlertTech from "../../components/alert/alert";

const Filter = () => {
  const dispatch = useDispatch();
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filtro, setFiltro] = useState({
    type: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/products/types`
        );
        const { data } = response;
        setTypes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/products/brands`
        );
        const { data } = response;
        setBrands(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrands();
  }, []);

  const handleTypes = (event) => {
    setFiltro({ ...filtro, type: event.target.value });
    // dispatch(filterAll(filtro))
    /*  const array = []
    allProducts1.forEach((prod) => {
      brands.forEach((brand) => {
        if(brand.id === prod.brandId){
          array.push(brand.name)
        }
      })
    })
    console.log(array)
    setBrands(result) */
  };
  const handleBrands = (event) => {
    setFiltro({ ...filtro, brand: event.target.value });
  };
  const submit = async () => {
    try {
      const response = await axios(
        `http://localhost:3004/products/filter?color=&type=${filtro.type}&brand=${filtro.brand}&minPrice=${filtro.minPrice}&maxPrice=${filtro.maxPrice}`
      );
      console.log(response.data);
      if (response) {
        dispatch(filterAll(response.data));
      }
    } catch (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };


  const handleMinPrice = (event) => {
    setFiltro({ ...filtro, minPrice: event.target.value });
  };
  const handleMaxPrice = (event) => {
    setFiltro({ ...filtro, maxPrice: event.target.value });
  };

  return (
    <div className="FilterTech">
      {showAlert && (
        <AlertTech
          message="No hay coincidencias con los filtros asignados"
          type="error"
        />
      )}
      <div className="subdiv_filter">
        <label>
          Categorias
          <select onChange={handleTypes}>
            {types[0] &&
              types.map((type, index) => (
                <option key={index} value={type.id}>
                  {type.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div className="subdiv_filter">
        <label>
          Marcas
          <select onChange={handleBrands}>
            {brands[0] &&
              brands.map((brand, index) => (
                <option key={index} value={brand.id}>
                  {brand.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div className="subdiv_filter">
        <label>
          min price $
          <input
            type="number"
            value={filtro.minPrice}
            onChange={handleMinPrice}
          ></input>
        </label>
      </div>
      <div className="subdiv_filter">
        <label>
          max price $
          <input
            type="number"
            value={filtro.maxPrice}
            onChange={handleMaxPrice}
          ></input>
        </label>
      </div>
      <div className="div_button_filter">
        <button onClick={submit} className="button_submit_filter">
          submit
        </button>
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
