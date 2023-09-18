import './filter.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { filterAll } from '../../redux/actions';

const Filter = () => {
  const dispatch = useDispatch();
  const allProducts1 = useSelector(state => state.allProducts1);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filtro, setFiltro] = useState({
    type:'',
    brand:'',
    minPrice:'',
    maxPrice:''
  })
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/products/types`
        );
        const { data } = response;
        setTypes(data);
      } catch (error) {
        console.log(error)
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
        console.log(error)
      }
    };
    fetchBrands();
  }, []);

  const handleTypes = (event) => {
    setFiltro({...filtro, type: event.target.value})
    dispatch(filterAll(filtro))
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
  }
  const handleBrands = (event) => {
    setFiltro({...filtro, brand: event.target.value})
  }
  const submit = ()=>{
    dispatch(filterAll(filtro));
  }

  return (
    <div className="FilterTech">
      <div>
        <select onChange={handleTypes}>
          {types[0] && types.map((type, index) => (
            <option
              key={index}
              value={type.id}
            >
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select onChange={handleBrands}>
          {brands[0] && brands.map((brand, index) => (
            <option
              key={index}
              value={brand.id}
            >
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>min price $
          <input type='number'></input>
        </label>
      </div>
      <div>
        <label>max price $
          <input type='number'></input>
        </label>
      </div>
      <div>
        <button onClick={submit}>submit</button>
      </div>
    </div>
  )
}

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
