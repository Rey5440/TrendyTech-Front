import { useSelector } from 'react-redux';
import './filter.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = () => {
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);

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



    return (
        <div className="FilterTech">
            <div>
                <select>
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
                <select>
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
        </div>
    )
}

export default Filter;