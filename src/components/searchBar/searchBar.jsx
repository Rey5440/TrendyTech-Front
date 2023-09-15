import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SearchBar.css';

const SearchBar = () =>{
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleInput = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        dispatch(action(searchTerm));
        console.log("producto buscado: ", searchTerm)
        setSearchTerm('');
    }

    return (
        <div className='SearchBar_Container'>
            <input placeholder='Search...' className='SearchBar_Input' onChange={handleInput} value={searchTerm}/>
            <button type='search' className='SearchBar_Button' onClick={handleSearch}><SearchIcon sx={{fontSize: 30}} className='SearchBar_ButtonIcon'/></button>
        </div>
    )
}

export default SearchBar;