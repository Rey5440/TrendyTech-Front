import Card from "../card/card";
import { Box } from "@mui/system";
import Empty from "./emptyCards";
import { Grid } from "@mui/material";
const Cards = ({ currentProduct }) => {
  return (
    <Grid container sx={{ padding: "5px" }}>
      {currentProduct.length ? (
        currentProduct?.map((product) => (
          <Grid
          key={product.id}
            item
            sm={4}
            xs={6}
            md={4}
            lg={3}
            xl={3}
            sx={{padding: "8px" }}
          >
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
              brand={product.brand}
            />
          </Grid>
        ))
      ) : (
        <Empty />
      )}
    </Grid>
  );
};

export default Cards;
