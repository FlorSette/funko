const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const quantity = document.querySelector('#quantity');

// Aumentar la cantidad
add.addEventListener('click', () => {
  let newQuantity = Number(quantity.value) + 1;
  quantity.value = newQuantity;
  validateQuantity();
});

// Disminuir la cantidad
subtract.addEventListener('click', () => {
  let newQuantity = Number(quantity.value) - 1;
  if (newQuantity >= 0) {
    quantity.value = newQuantity;
  }
  validateQuantity();
});


// Validar la cantidad en el evento "change"
quantity.addEventListener('change', () => {
  validateQuantity();
});

// Función para validar y asegurarse de que la cantidad no sea menor a 0
function validateQuantity() {
  let cantidad = parseInt(quantity.value);
  if (isNaN(cantidad) || cantidad < 0) {
    quantity.value = 0;
  }
}


// Evento add to the cart:-------------------------------------------------- 

const addToTheCartBtn = document.querySelector('#addToTheCart')


const handlerAddToCart = () => {
  const currentValue = Number((document.querySelector('#quantity')).value);
  const productIdStr = window.location.pathname.split('/').pop(); // parseo la url y obtengo el ultimo elemento q es justo el productId.
  const productId = parseInt(productIdStr);

  console.log(currentValue);
  if(currentValue == 0 ){
    console.log("Nothing to do ")
    return;
  }
  
  // Uso un fetch porque necesito mandar DATOS a la cantidad de producto a la ruta q me piden 'shop/item/:productId/add'
  console.log("productID y Quantity", productId, currentValue)
  fetch(`/shop/item/${productId}/add`,{
    method:'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      productQuantity:currentValue,
    }),
  })
  .then( (res) => {
    console.log("Producto agregado al carrito con Exito")
    if (currentValue == 1){
      window.alert("Producto agregado al carrito con Exito!");
    } else { 
      window.alert("Productos agregados al carrito con Exito!");
    }
    document.querySelector('#quantity').value = 0;
    return res.json()
  })
  .catch( (error) => {
    console.error("Entro a la excepcion del fetch: Error:", error)
  })

} 

addToTheCartBtn.addEventListener('click', handlerAddToCart )



