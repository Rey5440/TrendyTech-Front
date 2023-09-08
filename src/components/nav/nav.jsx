import SearchBar from "../searchBar/searchBar";
import { NavLink } from "react-router-dom";
import Trendy_Tech_Logo from "../../assets/Trendy-Tech logo recortado.png";
import "./nav.css";

//Material Icons es una librería de la cual podemos importar iconos para usarlos en nuestros componentes
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Nav = ()=>{

    return (
        <div className="NavBar">
            <div className="Nav_LogoContainer">
                <img alt="Trendy Tech" src={Trendy_Tech_Logo} className="Nav_Logo"/>
            </div>
            <div className="Nav_SearchBarContainer">
                <SearchBar/>
            </div>
            <div className="Nav_ButtonsContainer">
                <NavLink to="/ruta-Carrito" className="Nav_IconoCarrito"><ShoppingCartIcon sx={{fontSize: 40}}/></NavLink>
                <NavLink to="/ruta_Perfil" className="Nav_IconoPerfil"><AccountCircleIcon sx={{fontSize: 40}}/></NavLink>
            </div>
        </div>
    )
}

export default Nav;