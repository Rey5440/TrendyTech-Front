import { useSelector } from 'react-redux';
import './filter.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = () => {
  const allBrands = useSelector((state) => state.allBrands1);
  const allTypes = useSelector((state) => state.allTypes1);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      if (brands.length < 1) {
        setBrands(allBrands)
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      if (types.length < 1) {
        setTypes(allTypes)
      }
    };
    fetchTypes();
  }, []);

  const handleBrands = (event) => {
    dispatch(filterByBrand(event.target.value));
    onPageChange(1);
  }



  return (
    <div className="FilterTech">
      <div>
        <select onChange={handleBrands}>
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

      {/*             <div>
                <label>select color 
                    {colors[0] && colors.map((color, index) => (
                        <div key={index}>
                            <label>{color.name}
                        <input type='checkbox'></input>
                        </label>
                        </div>
                    )) }
                </label>
            </div> */}
    </div>
  )
}

export default Filter;