import Card from "../card/card";
import { Box, Container } from "@mui/system";

const Cards = ({ currentProduct }) => {
  return (
    <Box sx={{
      display: 'grid',
      columnGap: 0,
      width: '75%',
      margin: '1%',
      marginLeft: '6%',
      rowGap: 1,
      gridTemplateColumns: 'repeat(5, 1fr)',
    }}>
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
    </Box>
  );
};

export default Cards;
