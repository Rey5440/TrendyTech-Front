const regexUrl=/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
const ValidationForm = (form/* ,image */) => {
    const {name, price, description, image, stock}=form
    const error={};
    if(typeof name !== 'string') { error.name='El nombre debe ser una cadena de caracteres'}
    if(typeof price !== 'number'){ error.price='El precio debe ser un número'}
    if(typeof description !== 'string') { error.description='La descripción debe ser una cadena de caracteres'}
    if(typeof stock !== 'number'){ error.stock='El stock debe ser un número'}
    // Validación de imágenes
    if (Array.isArray(image)) {
        error.image = [];
        image.forEach((item, index) => {
        if (typeof item === 'string' && !regexUrl.test(item)) {
            error.image[index] = `La imagen nro ${index + 1} no es una URL válida`;
        } else if (typeof item !== 'string') {
            error.image[index] = `Tipo de dato incorrecto: La imagen nro ${index + 1} debe ser una cadena de caracteres y tenes una url`;
        }
      });
    }


     return error
}
export default ValidationForm;