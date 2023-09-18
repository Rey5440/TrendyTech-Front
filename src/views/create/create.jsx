import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav/nav.jsx";
import validation from "./validation.js";
import axios from "axios";
import "./create.css";
const Create = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    name: "",
    price: "",
    images: "",
    imageFiles: "",
    description: "",
    stock: "",
    brand: "",
    color: "",
    type: "",
  });
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

  useEffect(() => {}, [form, error]);
  useEffect(() => {}, [imageCloudinary]);
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
      error.imageFiles.lenght > 0
    ) {
      return setError({
        ...error,
        submit: "Hay errores en el formulario",
      });
    } else {
      // posteo al backend
      const response = await axios.post(
        "http://localhost:3004/products/create",
        form
      );
      const { data } = response;
      navigate(`/detail/${data.id}`);
    }
  };

  return (
    <div>
      <Nav />
      <div className="divcontainer_form_formimage">
        <form onSubmit={handleSubmit} className="divcontainer_form">
          {error.submit && <p>{error.submit}</p>}
          {/* NOMBRE  */}
          <div className="divlabel_input_create">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength="70"
            />
            {error.name && <p>{error.name}</p>}
          </div>

          {/* PRECIO */}
          <div className="divlabel_input_create">
            <label>Precio</label>
            <input
              maxLength="7"
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
            {error.price && <p>{error.price}</p>}
          </div>

          {/* DESCRIPCION */}
          <div className="divlabel_input_create">
            <label>Descripcion</label>
            <textarea
              maxLength="500"
              id="comentario"
              name="description"
              value={form.description}
              onChange={handleChange}
            ></textarea>
            {error.description && <p>{error.description}</p>}
          </div>

          {/* STOCK */}
          <div className="divlabel_input_create">
            <label>stock</label>
            <input
              maxLength="3"
              type="text"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />
            {error.stock && <p>{error.stock}</p>}
          </div>

          {/* BRAND */}
          <div className="divlabel_input_create">
            <label>brand</label>
            <input
              maxLength="20"
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
            />
            {error.brand && <p>{error.brand}</p>}
          </div>
          {/* TYPE */}
          <div className="divlabel_input_create">
            <label>type</label>
            <input
              maxLength="20"
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
            />
            {error.type && <p>{error.type}</p>}
          </div>
          {/* COLOR */}
          <div className="divlabel_input_create">
            <label>color</label>
            <input
              maxLength="20"
              type="text"
              name="color"
              value={form.color}
              onChange={handleChange}
            />
            {error.color && <p>{error.color}</p>}
          </div>
          {/* IMAGENES */}
          <div className="divlabel_input_create">
            <label>Imagen</label>
            <input
              type="file"
              name="image"
              multiple
              accept="image/*"
              onChange={handleChangeImg}
            />
            {Array.isArray(error.image) &&
              error.image.map((img, index) => <span key={index}>{img}</span>)}
            {Array.isArray(error.imageFiles) &&
              error.imageFiles.map((img, index) => (
                <span key={index}>{img}</span>
              ))}
          </div>
          {!error.imageFiles.length > 0 ? (
            <button type="submit" className="buttonsubmit_create">
              Enviar
            </button>
          ) : (
            <button
              type="submit"
              className="buttonsubmit_create_disabled"
              disabled
            >
              Enviar
            </button>
          )}
        </form>
        <div className="divcontainer_images_form">
          {imageCloudinary.map((img, index) => (
            <div key={index}>
              <img src={img} alt="" key={index} width={"200px"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Create;
