const db = require('../mysql/connectionDB')

const getProducts = async () => {
    return new Promise( (resuelta, rechazada) => {
      const aQuery = 'SELECT * FROM product p INNER JOIN licence l ON l.licence_id = p.licence_id ORDER BY p.price DESC LIMIT 100;'
      db.connection.query(aQuery, function(error, results, fields){
        if (error) {
          console.error('Error al ejecutar la consulta -> getProducts:\n');
          throw error;
        }
        resuelta(results);  // Asigno el results a resuelta. 
      } )
    });  
}


// Usamos el '?' para marcar la posicion esto implica que tenemos que crear un array donde la posicion de cada ?
//  corresponde a cada elemento en el array que pasamos. 
const getInfoProduct = async (aProductId) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = "SELECT * FROM product p INNER JOIN licence l ON l.licence_id = p.licence_id WHERE product_id = ?;" 
    db.connection.query(aQuery, [aProductId], function(error, results, fields){
    if (error){
        console.error('Error al ejecutar la consulta -> getInfoProduct:\n');
        throw error;
    }
    resuelta(results)
    })
  });
}

const get3ProductsExceptIdProduct = async (idDelete) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = "SELECT * FROM product p INNER JOIN licence l ON l.licence_id = p.licence_id WHERE product_id !=? ORDER BY RAND() LIMIT 3;"  
    db.connection.query(aQuery, [idDelete], function(error, results, fields){
    if (error){
        console.error('Error al ejecutar la consulta -> get3ProductsExceptIdProduct:\n');
        throw error;
    }
    resuelta(results)
    })
  });
}

const isThereProductIdInTheCart = (idProduct) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = "SELECT COUNT(*) as QuantityProduct FROM cart WHERE product_id = ?"
    db.connection.query(aQuery, [idProduct], function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> isThereProductIdInTheCart:\n');
        throw error;
      }
      resuelta(JSON.parse(JSON.stringify(results))[0]['QuantityProduct'])
    })
  })
}


const addNewProductToTheCart = async (idProduct, quantityProduct) => {
  return new Promise( async (resuelta, rechazada) => {
    const priceTotal =  await getPriceTotalProduct(idProduct, quantityProduct);

    const aQuery = "INSERT INTO cart(cart_id, product_id, quantity, total_price_product) VALUES (1, ?, ?, ?)"              
    
    db.connection.query(aQuery, [idProduct, quantityProduct, priceTotal], function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> addNewProductToTheCart:\n');
        throw error;
      }
      resuelta(results)
    })
  })
}

const getPriceTotalProduct = async (idProduct, quantityProduct) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = "SELECT p.price * ? as priceTotal FROM product p WHERE p.product_id = ?;"
    db.connection.query(aQuery, [quantityProduct, idProduct], function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> getPriceTotalProduct:\n');
        throw error;
      }
      resuelta(JSON.parse(JSON.stringify(results))[0]['priceTotal'])
    })
  })
}

const getQuantityProduct = async (idProduct) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = "SELECT quantity FROM cart where product_id = ?;"
    db.connection.query(aQuery, [idProduct], function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> getQuantityProduct:\n');
        throw error;
      }
      resuelta( JSON.parse(JSON.stringify(results))[0]['quantity']  )
    })
  })
}


const modifyProductInCart = async (idProduct, quantityProduct) => {
  return new Promise( async (resuelta, rechazada) => {
    const quantityOld = await getQuantityProduct(idProduct)
    const quantityFinal = quantityOld + quantityProduct;
    const priceTotal =  await getPriceTotalProduct(idProduct, quantityFinal)

    const aQuery = "UPDATE cart SET quantity = ?, total_price_product = ? WHERE product_id = ?"
    db.connection.query(aQuery, [quantityFinal, priceTotal, idProduct], function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> modifyProductInCart:\n');
        throw error;
      }
      resuelta(results)
    })
  })
}

const addProductToTheCart = async (idProduct, quantityProduct) => {
  const numberProductsWithId = await isThereProductIdInTheCart(idProduct);
  // paso la rspt(RowData) a un array de json()[claves con ""] y luego a un array de javascript [Claves sin "" ]
  if(numberProductsWithId == 0 ){
    addNewProductToTheCart(idProduct, quantityProduct) 
  } else {
    modifyProductInCart(idProduct, quantityProduct)
  }
}


const getProductsInCart = async (idProduct, quantityProduct) => {
  return new Promise( async (resuelta, rechazada) => {
    const aQuery = "SELECT * FROM cart c INNER JOIN product p INNER JOIN licence l ON p.product_id = c.product_id AND p.licence_id = l.licence_id;"
    db.connection.query(aQuery, function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> getProductsInCart:\n');
        throw error;
      }
      resuelta(results)
    })
  })
}

const getFinalTotalPrice = async () => {
  return new Promise( async (resuelta, rechazada) => {
    const aQuery = "SELECT SUM(total_price_product) as FinalTotalPrice FROM cart;"
    db.connection.query(aQuery, function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> getFinalTotalPrice:\n');
        throw error;
      }
      resuelta(JSON.parse(JSON.stringify(results))[0]['FinalTotalPrice'])
    })
  })
}

const getTotalQuantityProds = async () => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = "SELECT SUM(quantity) as totalQuantity FROM cart;"
    db.connection.query(aQuery, function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> getFinalTotalPrice:\n');
        throw error;
      }
      resuelta(JSON.parse(JSON.stringify(results))[0]['totalQuantity'])
    })
  })
}


const updateProductInTheCart = async (idProduct, aQuantityProduct) => {
  return new Promise( async (resuelta, rechazada) => {
    const aNewPriceProduct = await getPriceTotalProduct(idProduct, aQuantityProduct)
    const aQuery = "UPDATE cart SET quantity = ?, total_price_product = ? WHERE product_id = ?"
    db.connection.query(aQuery, [aQuantityProduct, aNewPriceProduct, idProduct] ,function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> updateProductInTheCart:\n');
        throw error;
      }
      resuelta(results)
    })
  })
}

const deleteProductInTheCart = async (idProduct) => {
  return new Promise( async (resuelta, rechazada) => {
    const aQuery = "DELETE FROM cart WHERE product_id = ?;"
    db.connection.query(aQuery, [idProduct] ,function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> deleteProductInTheCart:\n');
        throw error;
      }
      resuelta(results)
    })
  })
}


const payCartQuery = async () => {
  return new Promise( async (resuelta, rechazada) => {
    const aQuery = "DELETE FROM cart;"
    db.connection.query(aQuery, function(error, results, fields){
      if (error){
        console.error('Error al ejecutar la consulta -> payCartQuery:\n');
        throw error;
      }
      resuelta(results)
    })
  })
}


module.exports = {getProducts, getInfoProduct, get3ProductsExceptIdProduct,
                   addProductToTheCart, getProductsInCart, getFinalTotalPrice,
                   getTotalQuantityProds, updateProductInTheCart,
                    deleteProductInTheCart, payCartQuery}


