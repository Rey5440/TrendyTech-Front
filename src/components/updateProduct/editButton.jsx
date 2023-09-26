import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import validationForm from "./validationUpdate";
import AlertTech from "../alert/alert";

const editButton = ({ product, updatePage }) => {
  const [open, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    ...product,
    name: product.name,
    price: product.price,
    images: [product.images],
    description: product.description,
    stock: product.stock,
    brand: product.brand,
    color: product.color,
    type: product.type,
  });
  const [formErrors, setFormErrors] = useState({});
  const [confirmationAlert, setConfirmationAlert] = useState(null);

  const showAlert = (type, message) => {
    // Mostrar la alerta
    setConfirmationAlert({ type, message });

    // Limpiar la alerta después de 3 segundos (3000 ms)
    setTimeout(() => {
      setConfirmationAlert(null);
    }, 5000);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const errors = validationForm(editedProduct);

    // Verificar si hay errores
    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
      console.log(errors);
    } else {
      // Si no hay errores, enviar la solicitud al servidor
      try {
        const response = await axios.put(
          "https://trendy-tech-back-8bm1.onrender.com/products/update",
          editedProduct
        );
        const { data } = response;
        updatePage(data);
        setFormErrors({});
        setOpen(false);
        setConfirmationAlert(true);
        showAlert("success", "Tu producto fue actualizado con exíto");
      } catch (error) {
        console.log("Error al actualizar el producto", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "price" || name === "stock") {
      if (!isNaN(value)) {
        setEditedProduct({
          ...editedProduct,
          [name]: Number(value),
        });
      }
    } else if (
      name === "name" ||
      name === "brand" ||
      name === "color" ||
      name === "type" ||
      name === "description"
    ) {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setEditedProduct({ ...editedProduct, [name]: capitalizedValue });
    } else {
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  return (
    <div>
      {confirmationAlert && (
        <AlertTech
          message={confirmationAlert.message}
          type={confirmationAlert.type}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Editar Producto</DialogTitle>

        <DialogContent>
          <hr
            style={{ backgroundColor: "#fc6933", width: "90%", height: "3px" }}
          />
          <TextField
            label="Nombre"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Precio"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!formErrors.price}
            helperText={formErrors.price}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Stock"
            name="stock"
            value={editedProduct.stock}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            required
            error={!!formErrors.stock}
            helperText={formErrors.stock}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Marca"
            name="brand"
            value={editedProduct.brand}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={!!formErrors.brand}
            helperText={formErrors.brand}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Tipo"
            name="type"
            value={editedProduct.type}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={!!formErrors.type}
            helperText={formErrors.type}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Color"
            name="color"
            value={editedProduct.color}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={!!formErrors.color}
            helperText={formErrors.color}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Descripción"
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={!!formErrors.description}
            helperText={formErrors.description}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "90%", height: "3px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default editButton;
