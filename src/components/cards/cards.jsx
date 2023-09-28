import Card from "../card/card";
import { Box } from "@mui/system";
import Empty from "./emptyCards";
const Cards = ({ currentProduct }) => {
  return (
    <Box sx={{
      display: 'grid',
      columnGap: 3,
      width: '100%',
      margin: '1%',
      marginLeft: '6%',
      rowGap: 3,
      gridTemplateColumns: 'repeat(4, 1fr)',
    }}>
      {currentProduct.length ? currentProduct?.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          name={product.name}
          images={product.images} //ver si image es un array con imagenes
          price={product.price}
          brand={product.brand}
        />
      )) : (<Empty/>)}
    </Box>
  );
};

export default Cards;
