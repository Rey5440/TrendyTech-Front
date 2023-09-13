import { NavLink } from "react-router-dom";

const Card = ({ image, id, name, price, brand }) => {

    return (
        // el id va a servir para utilizar el NavLink que lleva al detail
        <NavLink to={`detail/${id}`}>
        <div>
            <img src={image[0]} alt={name} width={"300px"} />
            <h4 >{name}</h4>
            <h3 >{brand}</h3>
            <h2 >$ {price}</h2>
        </div>
        </NavLink>
    )
}

export default Card;