
const validate = (value) => {
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ.,()-]*$/;
    return regex.test(value);
};

const validationForm = (form) => {
    const { name, price, description, stock, brand, color, type, } = form;
    const error = {
        name: "",
        price: "",
        description: "",
        stock: "",
        brand: "",
        color: "",
        type: "",
        imageFiles: "",
    };

    // Validación de nombre
    if (typeof name !== "string") {
        error.name = "El nombre debe ser una cadena de caracteres";
    } else if (name.length == 0) {
        error.name = "El nombre no puede estar vacío";
    } else if (name.length > 50) {
        error.name = "El nombre no puede tener más de 50 caracteres";
    } else if (!validate(name)) {
        error.name = "El nombre contiene caracteres especiales no permitidos";
    } else if (name.length <= 2) {
        error.name = "El nombre no puedo contener menos de 2 caracteres"
    } else {
        error.name = "";
    }

    // Validacion de precio
    if (typeof price !== "number") {
        error.price = "El precio debe ser un número";
    } else if (price < 0) {
        error.price = "El precio no puede ser negativo";
    } else if (price == 0) {
        error.price = "El precio no puede ser 0";
    } else if (price > 800000) {
        error.price = "El precio no puede ser mayor a 800000";
    } else if (price <= 100) {
        error.price = "El precio no puede ser menor a 100"
    } else {
        error.price = "";
    }

    // Validacion de descripcion
    if (typeof description !== "string") {
        error.description = "La descripción debe ser una cadena de caracteres";
    } else if (description.length == 0) {
        error.description = "La descripción no puede estar vacía";
    } else if (description.length > 200) {
        error.description = "La descripción no puede tener más de 200 caracteres";
    } else if (!validate(description)) {
        error.description = "La descripción contiene caracteres especiales no permitidos"
    } else {
        error.description = "";
    }

    // Validacion de stock
    if (typeof stock != "number") {
        error.stock = "El stock debe ser un número";
    } else if (stock < 0) {
        error.stock = "El stock no puede ser negativo";
    } else if (stock == 0) {
        error.stock = "El stock no puede estar vacio";
    } else if (stock > 500) {
        error.stock = "El stock no puede ser mayor a 500 unidades";
    } else if (stock <= 10) {
        error.stock = "El stock no puede ser menor a 10 unidades"
    } else {
        error.stock = "";
    }
    // Validacion de brand
    if (typeof brand !== "string") {
        error.brand = "La marca debe ser una cadena de caracteres";
    } else if (brand.length > 15) {
        error.brand = "La marca no puede tener más de 15 caracteres";
    } else if (brand.length == 0) {
        error.brand = "La marca no puede estar vacío";
    } else if (brand.length <= 1) {
        error.brand = "La marca no puede tener menos de 1 caracter"
    } else if (!validate(brand)) {
        error.brand = "La marca contiene caracteres especiales no permitidos"
    } else {
        error.brand = "";
    }

    // Validacion de color
    if (typeof color !== "string") {
        error.color = "El color debe ser una cadena de caracteres";
    } else if (color.length > 15) {
        error.color = "El color no puede tener más de 15 caracteres";
    } else if (color.length == 0) {
        error.color = "El color no puede estar vacío";
    } else if (color.length <= 1) {
        error.color = "El color no puede tener menos de 1 caracter";
    } else if (!validate(color)) {
        error.color = "El color contiene caracteres especiales no permitidos";
    } else {
        error.color = "";
    }

    // Validacion de type
    if (typeof type !== "string") {
        error.type = "El tipo debe ser una cadena de caracteres";
    } else if (type.length > 15) {
        error.type = "El tipo no puede tener más de 15 caracteres";
    } else if (type.length == 0) {
        error.type = "El tipo no puede estar vacío";
    } else if (type.length <= 1) {
        error.type = "El tipo no puede tener menos de un caracter"
    } else if (!validate(type)) {
        error.type = "El tipo contiene caracteres especiales no permitidos"
    } else {
        error.type = "";
    }


    return error;
};
export default validationForm;
