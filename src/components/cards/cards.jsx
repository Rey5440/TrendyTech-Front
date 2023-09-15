import Card from "../card/card";
import './cards.css';

const Cards = ({currentProduct}) => {
    return (
        <div className="CardsTech">
        {currentProduct?.map((product) => (

            <Card 
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images} //ver si image es un array con imagenes
              price={product.price}
              brand={product.brand}
            />

        ))}
      </div>
    )
};

export default Cards;

