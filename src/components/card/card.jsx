
const Card = ({ images, id, name, price, brand }) => {
    return (
        // el id va a servir para utilizar el NavLink que lleva al detail
        <div>
            <img src={images[0]} alt={name} width={"300px"} />
            <h4 >{name}</h4>
            <h3 >{brand}</h3>
            <h2 >$ {price}</h2>
        </div>
    )
}

export default Card;