import Card from "../card/card";

const Cards = ({currentProduct}) => {
    return (
        <div>
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