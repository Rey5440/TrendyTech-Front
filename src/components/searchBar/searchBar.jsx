import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../redux/actions';
import './searchBar.css';

const SearchBar = () =>{
    const [product, setProduct] = useState('');
    const dispatch = useDispatch();

    const handleInput = (e) => {
        setProduct(e.target.value);
        console.log(product);
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        dispatch(searchByName(product));
        console.log("producto buscado: ", product);
        setProduct('');
    }

    return (
        <div className='SearchBar_Container'>
            <input placeholder='Search...' className='SearchBar_Input' onChange={handleInput} value={product}/>
            <button type='search' className='SearchBar_Button' onClick={handleSearch}><SearchIcon sx={{fontSize: 30}} className='SearchBar_ButtonIcon'/></button>
        </div>
    )
}

export default SearchBar;