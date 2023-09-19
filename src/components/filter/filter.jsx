import './filter.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const Filter = () => {
  const dispatch = useDispatch();
  const allProducts1 = useSelector(state => state.allProducts1);
  const [selectedType, setSelectedType] = useState('')

  const handleType = (event) => {
    setSelectedType(event.target.value)
  }
  console.log(selectedType)

  return (
    <div className="FilterTech">
      <div>
        <select on onChange={handleType}>
        <option value="" style={{color: 'gray'}}>Categorias</option>
          {allProducts1.length > 0 && allProducts1.map((producto, index) => {
            return <option key={index} value={producto.type}>{producto.type}</option>;
          })}
        </select>
      </div>
      <div>
        <select>
          {allProducts1.length > 0 && allProducts1.map((producto, index) => {
            return <option key={index}>{producto.brand}</option>;
          })}
        </select>
      </div>
      <div>
        <button >Clear filters</button>
      </div>
    </div>
  );
};

export default Filter;