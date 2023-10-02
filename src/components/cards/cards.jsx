import Card from "../card/card";
import { Box } from "@mui/system";
import Empty from "./emptyCards";
import { useEffect, useState } from "react";
import useAuth from "../../context-client/hooks/useAuth";
import { useAuth0 } from "@auth0/auth0-react";

const Cards = ({ currentProduct }) => {
  const [client, setClient] = useState({});
  const { auth } = useAuth();
  const { user } = useAuth0();
  useEffect(() => {
    const fetchData = async () => {
      let emailToSend;
      if (auth && auth.email) {
        emailToSend = auth.email;
      } else if (user && user.email) {
        emailToSend = user.email;
      }

      if (emailToSend) {
        try {
          const result = await axios.post(
            "http://localhost:3004/users/emailuser",
            {
              email: emailToSend,
            }
          );
          setClient(result.data);
        } catch (error) {
          console.error("Error al obtener datos del usuario", error);
        }
      }
    };

    fetchData();
  }, [auth, user]);
  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 3,
        width: "100%",
        margin: "1%",
        marginLeft: "6%",
        rowGap: 3,
        gridTemplateColumns: "repeat(5, 1fr)",
      }}>
      {currentProduct.length ? (
        currentProduct?.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            images={product.images} //ver si image es un array con imagenes
            price={product.price}
            brand={product.brand}
            product={product}
            client={client}
          />
        ))
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default Cards;
