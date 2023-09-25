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

const updateProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios("http://localhost:3004/products");
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
    <TableContainer>
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
              Editar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody fullWidth>
          {allProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.color}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <EditButton product={{ ...product }} updatePage={updatePage} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default updateProduct;
