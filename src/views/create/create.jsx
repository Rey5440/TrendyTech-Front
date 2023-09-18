import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav/nav.jsx";
import validation from "./validation.js";
import axios from "axios";
import "./create.css";
import validationForm from "./validation.js";
const Create = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [imageCloudinary, setImageCloudinary] = useState([]);
  const [imageError, setImageError] = useState({});
  // const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    images: [],
    description: "",
    stock: 0,
    brand: "",
    color: "",
    type: "",
  });

  useEffect(() => { }, [form, error]);
  useEffect(() => { }, [imageCloudinary]);
  // HANDLERS
  const handleChange = (event) => {
    if (event.target.name == "price" || event.target.name == "stock") {
      if (!isNaN(event.target.value)) {
        setForm({
          ...form,
          [event.target.name]: Number(event.target.value),
        });
      }
    } else {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }

    const errores = validation(form);
    setError(errores);
  };

  const handleChangeImg = async (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files);
    const uploadImage = [];
    const uploadPromises = imagesArray.map(async (img) => {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "trendyImg");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dntrwijx5/image/upload",
          data
        );
        uploadImage.push(response.data.secure_url);
      } catch (error) {
        console.log(error);
      }
    });
    await Promise.all(uploadPromises);

    // Limitar a un máximo de 3 imágenes
    if (uploadImage.length <= 3 || imagesArray.length <= 3) {
      setImageCloudinary(uploadImage);
      setForm({
        ...form,
        images: uploadImage,
      });
      const errores = validation(form, imagesArray);
      setError(errores);
      console.log("hola estoy EN EL LIMITE : ", errores)
    } else {
      error.alert =
        "No puedes agregar más de 3 imágenes.Vuelve a cargar las imagenes";
      setForm({ ...form, images: [] });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      error.name.length > 0 ||
      error.price.length > 0 ||
      error.description.length > 0 ||
      error.stock.length > 0 ||
      error.brand.length > 0 ||
      error.color.length > 0 ||
      error.type.length > 0 ||
      error.image.length > 0 ||
      error.imageFiles > 0
    ) {
      return setError({
        ...error,
        submit: "Hay errores en el formulario"
      });
    } else {
      // posteo al backend
      const response = await axios.post(
        "http://localhost:3004/products/create",
        form
      );
      const { data } = response;
      navigate(`/detail/${data.id}`)
    }
  }
  return (
    <div className="divcontainer">
      <Nav />
      <div className="title_container">
        <h1>Crear un producto</h1>
      </div>

      <div className="divcontainer_form_formimage">
        <form onSubmit={handleSubmit} className="divcontainer_form">
          {error.submit && <p className="error">{error.submit}</p>}
          {/* NOMBRE  */}
          <div className="divlabel_input_create">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength="100"
              className="input_create"
            />
            {error.name && <p className="error">{error.name}</p>}
          </div>

          <div className="div_precio_stock">
            {/* PRECIO */}
            <div className="divlabel_input_create">
              <label>Precio</label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="input_create_num"
              />
              {error.price && <p className="error">{error.price}</p>}
            </div>

            {/* STOCK */}
            <div className="divlabel_input_create">
              <label>Cantidad</label>
              <input
                type="text"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="input_create_num"
              />
              {error.stock && <p className="error">{error.stock}</p>}
            </div>
          </div>

          {/* DESCRIPCION */}
          <div className="divlabel_input_create">
            <label>Descripción</label>
            <textarea
              id="comentario"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="textarea_create"
              placeholder="Describe tu producto."
            ></textarea>
            {error.description && <p className="error">{error.description}</p>}
          </div>

          {/* BRAND */}
          <div className="divlabel_input_create">
            <label>Marca</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="input_create"
            />
            {error.brand && <p className="error">{error.brand}</p>}
          </div>
          {/* TYPE */}
          <div className="divlabel_input_create">
            <label>Categoría</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input_create"
            />
            {error.type && <p className="error">{error.type}</p>}
          </div>
          {/* COLOR */}
          <div className="divlabel_input_create">
            <label>Color</label>
            <input
              type="text"
              name="color"
              value={form.color}
              onChange={handleChange}
              className="input_create"
            />
            {error.color && <p className="error">{error.color}</p>}
          </div>
          {/* IMAGENES */}
          <div className="divlabel_input_create_img_btn">
            <div className="divlabel_input_create">
              <label>Imagen</label>
              <input
                type="file"
                name="image"
                multiple
                accept="image/*"
                onChange={handleChangeImg}
                className="input_create_files"
              />
              <div className="error_images_container">
                {Array.isArray(error.image) &&
                  error.image.map((img, index) => <span className="error" key={index}>{img}</span>)}
                {Array.isArray(error.imageFiles) &&
                  error.imageFiles.map((img, index) => <span className="error" key={index}>{img}</span>)}
              </div>
            </div>

            <button type="submit" className="buttonsubmit_create">
              Crear producto
            </button>
          </div>
          
        </form>
        <div className="divcontainer_images_form">
          <h2 className="title_images">Imagenes seleccionadas</h2>
          <div className="images_container">
            {imageCloudinary[0] ? <img src={imageCloudinary[0]} alt="" loading="lazy" className="image" /> : <span className="imagen_ph">Imagen 1</span>}
          </div>
          <div className="images_container">
            {imageCloudinary[1] ? <img src={imageCloudinary[1]} alt="" loading="lazy" className="image" /> : <span className="imagen_ph">Imagen 2</span>}
          </div>
          <div className="images_container">
            {imageCloudinary[2] ? <img src={imageCloudinary[2]} alt="" loading="lazy" className="image" /> : <span className="imagen_ph">Imagen 3</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
