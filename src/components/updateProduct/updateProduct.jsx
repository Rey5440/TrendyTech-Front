const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditButton from "./editButton";
import axios from "axios";
import { toFormatPrice } from "../../helpers/toFormatPrice";

const updateProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios(`${VITE_BACKEND_URL}/products`);
      const { data } = response;
      setAllProducts(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const updatePage = () => {
    fetchData();
  };

  return (
    <TableContainer sx={{ marginTop: "20px" }}>
      <Table>
        <TableHead style={{ backgroundColor: "lightgray" }}>
          <TableRow>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Nombre
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Precio
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Descuento
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Stock
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Marca
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Tipo
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Color
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Descripción
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Imagen
            </TableCell>
            <TableCell style={{ fontFamily: "Poppins", fontSize: "18px" }}>
              Editar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody fullWidth>
          {allProducts.map((product) => {
            const price = toFormatPrice(product.price);

            return (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{product.discount}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <img
                    src={product.images[0]}
                    width="50px"
                    alt="images de producto"
                  />
                </TableCell>
                <TableCell>
                  <EditButton
                    product={{ ...product }}
                    updatePage={updatePage}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default updateProduct;
