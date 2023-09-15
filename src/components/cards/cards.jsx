import Card from "../card/card";
import { Box, Container } from "@mui/system";

const Cards = ({ currentProduct }) => {
  return (
    <Container maxWidth="xl" sx={{alignItems: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
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
    </Container>
  );
};

export default Cards;
