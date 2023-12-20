const db = require('../mysql/connectionDB')

const getProductsOrderById = async () => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT * FROM product p INNER JOIN licence l ON l.licence_id = p.licence_id ORDER BY p.product_id ASC LIMIT 100;'
    db.connection.query(aQuery, function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getProducts:\n');
        throw error;
      }
      resuelta(results);  // Asigno el results a resuelta. 
    } )
  });  
}

const deleteAProductQuery = async (productId) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'DELETE FROM product p WHERE p.product_id = ?;'
    db.connection.query(aQuery, [productId], function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> deleteAProductQuery:\n');
        throw error;
      }
      resuelta(results);  // Asigno el results a resuelta. 
    } )
  });  
}


const getCategoryIdByName = async (aDataProduct) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT category_id AS categoryId FROM category WHERE category_name = ?;' 
    db.connection.query(aQuery, [aDataProduct['aCategory']],  function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> addNewProduct:\n');
        throw error;
      }
      resuelta(JSON.parse(JSON.stringify(results))[0]['categoryId']);
    } )
  });  
}

const getLicenseIdByName = async (aDataProduct) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT licence_id AS licenseId FROM licence WHERE licence_name = ?;' 
    db.connection.query(aQuery, [aDataProduct['aLicense']],  function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> addNewProduct:\n');
        throw error;
      }
      resuelta(JSON.parse(JSON.stringify(results))[0]['licenseId']);
    } )
  });  
}

const addNewProduct = async (aDataProduct) => {
  return new Promise( async (resuelta, rechazada) => {
    const aCategoryId = await getCategoryIdByName(aDataProduct)
    const aLicenseId = await getLicenseIdByName(aDataProduct)
    console.log('aCategoryId', aCategoryId, 'aLicenseId', aLicenseId)
    const aQuery = 'INSERT INTO product (product_name, product_description, price, stock,' +
      'discount, sku, dues, image_front, image_back, create_time, licence_id, category_id) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ' 
    db.connection.query(aQuery, [aDataProduct['aNameProduct'], aDataProduct['aDescription'],
      aDataProduct['aPrice'], aDataProduct['aStock'], aDataProduct['aDiscount'], aDataProduct['aSku'],
      aDataProduct['aDues'], aDataProduct['aFrontImg'], aDataProduct['aBackImg'], aDataProduct['aCreationTime'],
      aLicenseId, aCategoryId] ,  function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> addNewProduct:\n');
        throw error;
      }
      resuelta(results);
    } )
  });  
}

const getCategorys = async () => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT category_name as CategoryName from category c GROUP BY category_name;'
    db.connection.query(aQuery, function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getCategorys:\n');
        throw error;
      }
      resuelta(results);  // Asigno el results a resuelta. 
    } )
  });  
}

const getLicences = async () => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT licence_name as LicenseName FROM product p INNER JOIN licence l ON p.licence_id = l.licence_id GROUP BY licence_name;'
    db.connection.query(aQuery, function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getLicences:\n');
        throw error;
      }
      resuelta(results);  // Asigno el results a resuelta. 
    } )
  });  
}


const getCategoryNameSelect = async (aProductId) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT category_name as categoryName FROM product p INNER JOIN category c ON p.category_id = c.category_id WHERE product_id = ?;'
    db.connection.query(aQuery, [aProductId], function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getCategorySelect:\n');
        throw error;
      }
      resuelta(JSON.parse(JSON.stringify(results))[0]['categoryName']);  // Asigno el results a resuelta. 
    })
  });  
}


const getLicenseNameSelect = async (aProductId) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = ' SELECT licence_name as licenceName FROM product p INNER JOIN licence l ON p.licence_id = l.licence_id WHERE product_id = ?;'
    db.connection.query(aQuery, [aProductId], function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getCategorySelect:\n');
        throw error;
      }
      resuelta(JSON.parse(JSON.stringify(results))[0]['licenceName']);  // Asigno el results a resuelta. 
    })
  });  
}


const getOtherCategorysName = async (aCategory) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT category_name as categoryName FROM category c WHERE c.category_name != ?;'
    db.connection.query(aQuery, [aCategory], function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getCategorySelect:\n');
        throw error;
      }
      resuelta(results);  // Asigno el results a resuelta. 
    })
  });  
}


const getOtherLicenseName = async (aLicense) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT licence_name as licenseName FROM licence l WHERE l.licence_name != ?;'
    db.connection.query(aQuery, [aLicense], function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getCategorySelect:\n');
        throw error;
      }
      resuelta(results);  // Asigno el results a resuelta. 
    })
  });  
}

const getDataProduct = async (aProductId) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT * FROM product p WHERE p.product_id = ?'
    db.connection.query(aQuery, [aProductId], function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getCategorySelect:\n');
        throw error;
      }
      resuelta(results);  // Asigno el results a resuelta. 
    })
  });  
}

const getDueSelect = async (aProductId) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'SELECT dues FROM product WHERE product_id = ?;'
    db.connection.query(aQuery, [aProductId], function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> getCategorySelect:\n');
        throw error;
      }
      resuelta(JSON.parse(JSON.stringify(results))[0]['dues']);  // Asigno el results a resuelta. 
    })
  });  
}


const updateAProduct = async (aProductId, dataProduct) => {
  return new Promise( async (resuelta, rechazada) => {
    const aCategoryId = await getCategoryIdByName(dataProduct)
    const aLicenseId = await getLicenseIdByName(dataProduct)
    const aQuery = 'UPDATE product SET product_name = ?, product_description = ?, price = ?, stock = ?, discount = ?,'
                 + 'sku = ?, dues = ?, image_front = ?, image_back = ?, licence_id = ?, category_id = ?  where product_id = ?;'                 
    
    db.connection.query(aQuery, [dataProduct['aNameProduct'], dataProduct['aDescription'], dataProduct['aPrice'],
    dataProduct['aStock'], dataProduct['aDiscount'], dataProduct['aSku'], dataProduct['aDues'], dataProduct['aFrontImg'],
    dataProduct['aBackImg'], aLicenseId, aCategoryId, aProductId ] , function(error, results, fields){
    if (error) {
        console.error('Error al ejecutar la consulta -> updateAProduct:\n');
        throw error;
    }
      resuelta(results);  // Asigno el results a resuelta. 
    })
  });  
}

module.exports = {deleteAProductQuery, addNewProduct, getCategorys,
                  getLicences, getCategoryNameSelect, getLicenseNameSelect,
                  getOtherCategorysName, getOtherLicenseName, getDataProduct,
                  getDueSelect, updateAProduct, getProductsOrderById }