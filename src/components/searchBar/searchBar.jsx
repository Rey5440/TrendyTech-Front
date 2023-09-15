import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../redux/actions';
import './searchBar.css';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

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

    const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

    return (

        <div className='SearchBar_Container'>
            <input placeholder='Search...' className='SearchBar_Input' onChange={handleInput} value={product}/>
            <button type='search' className='SearchBar_Button' onClick={handleSearch}><SearchIcon sx={{fontSize: 30}} className='SearchBar_ButtonIcon'/></button>
        </div>
    )
}

export default SearchBar;