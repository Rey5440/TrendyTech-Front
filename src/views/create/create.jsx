import { useEffect, useState } from 'react';
import {ValidationForm} from './Valitation.js';
const Create = () =>{
    const useDispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        price: '',
        image: [],
        description: '',
        stock: '',
    });
    const[image, setImage] = useState([]);
    const [error, setError] = useState({});
    const handleChange=(event)=>{
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        setError(ValidationForm(form))
    }
    const handleChangeImg=(event)=>{
        setImage({
            ...image,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if (Object.keys(error).length >0){
            return alert('Hay errores');
        }{
            setForm({...form, image: image})
        }
        // posteo al backend
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}/>
                    {error.name && <p>{error.name}</p>}
                </div>
                <div>
                    <label>Precio</label>
                    <input type="text" name="price" value={form.price} onChange={handleChange}/>
                    {error.price && <p>{error.price}</p>}
                </div>
                <div>
                    <label>Descripcion</label>
                    <textarea
                        id="comentario"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        ></textarea>
                    {error.description && <p>{error.description}</p>}
                </div>
                <div>
                    <label>stock</label>
                    <input type="number" name="stock" value={form.stock} onChange={handleChange}/>
                    {error.stock && <p>{error.stock}</p>}   
                </div>

                <div>
                    <label>Imagen</label>
                    <input type="file" name="image" value={image[0]} onChange={handleChangeImg}/>
                    <input type="file" name="image" value={image[1]} onChange={handleChangeImg}/>
                    <input type="file" name="image" value={image[2]} onChange={handleChangeImg}/>
                    {(error.image.length>0) && error.image.map((item, index)=>{
                        return <p key={index}>{item}</p>
                    })}   
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Create;