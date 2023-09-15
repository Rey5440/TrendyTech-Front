import {  useEffect, useState } from 'react';
import ValidationForm from './Valitation.js';
import axios from 'axios';
const Create = () =>{
    const [error, setError] = useState({});
    // const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        price:0,
        images: [],
        description: '',
        stock: 0,
        brand: '',
        color: '',
        type: ''
    });
    
    useEffect(()=>{

    },[form,error])

    // HANDLERS
    const handleChange=(event)=>{
        if(event.target.name=='price' || event.target.name=='stock'){
            if(!isNaN(event.target.value)){
                setForm({
                    ...form,
                    [event.target.name]: Number(event.target.value)
                })
            }
        }else{
            setForm({
            ...form,
            [event.target.name]: event.target.value
            })
        }
        
        
        const errores=ValidationForm(form);
        setError(errores)
        
    }

    const handleChangeImg=(event)=>{
        const files = event.target.files;
        const imagesArray = Array.from(files);
        const uploadImage=[]

        imagesArray.map(async (img)=>{
            const data = new FormData();
            data.append("file", img);
            data.append("upload_preset", "trendyImg");
            try {
                const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dntrwijx5/image/upload",data
                    );
                uploadImage.push(response.data.secure_url)
            } catch (error) {
                console.log(error);
            }
            
        })
                // Limitar a un máximo de 3 imágenes
            if (uploadImage.length <= 3 ) {
                setForm({
                    ...form, 
                    images:uploadImage});
                const errores=ValidationForm(form); 
                setError(errores);
                
            } else {
                error.alert='No puedes agregar más de 3 imágenes.Vuelve a cargar las imagenes';
                setForm({...form, images:[]});
            }
        }
    
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(form)
        if (Object.keys(error).length > 0){
            setError({submit:"Hay errores en el formulario"});
        }
        else{
            // posteo al backend
            const post = async () => {
                try {
                    const response = await axios.post('http://localhost:3004/products/create',form);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {error.submit && <p>{error.submit}</p>}
                {/* NOMBRE  */}
                <div>
                    <label>Nombre</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} maxLength="100" />
                    {error.name && <p>{error.name}</p>}
                </div>

                {/* PRECIO */}
                <div>
                    <label>Precio</label>
                    <input type="text" name="price" value={form.price} onChange={handleChange}/>
                    {error.price && <p>{error.price}</p>}
                </div>

                {/* DESCRIPCION */}
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

                {/* STOCK */}
                <div>
                    <label>stock</label>
                    <input type="text" name="stock" value={form.stock} onChange={handleChange}/>
                    {error.stock && <p>{error.stock}</p>}   
                </div>

                {/* BRAND */}
                <div>
                    <label>brand</label>
                    <input type="text" name="brand" value={form.brand} onChange={handleChange}/>
                    {error.brand && <p>{error.brand}</p>}   
                </div>
                {/* TYPE */}
                <div>
                    <label>type</label>
                    <input type="text" name="type" value={form.type} onChange={handleChange}/>
                    {error.type && <p>{error.type}</p>}   
                </div>
                {/* COLOR */}
                <div>
                    <label>color</label>
                    <input type="text" name="color" value={form.color} onChange={handleChange}/>
                    {error.color && <p>{error.color}</p>}   
                </div>
                {/* IMAGENES */}
                <div>
                    <label>Imagen</label>
                    <input type="file" name="image"  multiple accept="image/*" onChange={handleChangeImg}/>
                    {Array.isArray(error.image) && error.image.map((img,index)=>(
                        <span key={index}>{img}</span>
                    ))}
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Create;