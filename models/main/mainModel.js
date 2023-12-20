const db = require('../mysql/connectionDB')

// Creo una promesa entonces la funcion debe ser async
const getLicences = async () => {
  return new Promise( (resuelta, rechazada) => {
    db.connection.query('SELECT * FROM licence', function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getLicences:\n');
        throw error;
      }
      resuelta(results);  // Asigno el results a resuelta. 
    } )
  });
}

const getProductsTop6 = async () => {
  return new Promise( (resuelta, rechazada) => {
    db.connection.query('SELECT * FROM product p INNER JOIN licence l ON l.licence_id = p.licence_id ORDER BY RAND() LIMIT 6;' , function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getProductsTop6:\n');
        throw error;
      }
      resuelta(results);  // Asigno el results a resuelta. 
    } )
  });  
}

const getProductForCarrousel = async () => {
    const sixProducts = await getProductsTop6();
    return [sixProducts.splice(3,3), sixProducts.splice(0,3)];
}

module.exports = { getLicences, getProductForCarrousel};