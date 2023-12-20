const db = require('../mysql/connectionDB')

const checkUserExists = async (mail, password) => {
    return new Promise( (resuelta, rechazada) => {
      const aQuery = 'SELECT COUNT(*) AS userQuantity FROM user WHERE email= ? AND password = ?;'
      db.connection.query(aQuery, [mail, password],  function(error, results, fields){
        if (error) {
          console.error('Error al ejecutar la consulta -> tryLoginUser:\n');
          throw error;
        }
        // paso el rowDataPacket a un objeto JsonString con stringfy (claves con "") y luego paso a un objeto Json posta con JSON.parse. 
        const quantity = JSON.parse(JSON.stringify(results))[0]['userQuantity']
        let answer = 'USER_EXISTS'
        if (quantity == 0 ){
            answer = 'NO_USER_EXISTS'
        }
        resuelta(answer);
      })
    });  
  }
  
  

const checkEmailExists = async (mail) => {
    return new Promise( (resuelta, rechazada) => {
      const aQuery = 'SELECT COUNT(*) AS userQuantity FROM user WHERE email= ?'
      db.connection.query(aQuery, [mail],  function(error, results, fields){
        if (error) {
          console.error('Error al ejecutar la consulta -> tryLoginUser:\n');
          throw error;
        }
        // paso el rowDataPacket a un objeto JsonString con stringfy (claves con "") y luego paso a un objeto Json posta con JSON.parse. 
        const quantity = JSON.parse(JSON.stringify(results))[0]['userQuantity']
        let answer = 'USER_EXISTS'
        if (quantity == 0 ){
            answer = 'NO_USER_EXISTS'
        }
        resuelta(answer);
      })
    });  
  }


const tryRegisterANewUser = async (userData) => {
    const answerUserExists = await checkEmailExists(userData['aMail'])
    if (answerUserExists == 'USER_EXISTS'){
      return 'USER_EXISTS';
    }
    const answerRegister = await registerANewUser(userData)
    await registerLastUserRole()
    return answerRegister    
}

const registerANewUser = async (userData) => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'INSERT INTO user (name, lastname, email, password, create_time) VALUES (?, ?, ?, ?, ?);'
    db.connection.query(aQuery, [userData['aName'], userData['aLastName'], userData['aMail'],
                       userData['aPassword'], userData['aCreationTime'] ],  function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> tryLoginUser:\n');
        throw error;
      }
      resuelta(results);
    })
  });
}

const registerLastUserRole = async () => {
  return new Promise( (resuelta, rechazada) => {
    const aQuery = 'INSERT INTO user_has_role(user_user_id, role_role_id) ' + 
                   'VALUES((SELECT user_id AS userId from user ORDER BY user_id DESC LIMIT 1), 1)'
    db.connection.query(aQuery, function(error, results, fields){
      if (error) {
        console.error('Error al ejecutar la consulta -> registerLastUserInUserHasRole:\n');
        throw error;
      }
      resuelta(results);
    })
  });
}


module.exports = { checkUserExists, tryRegisterANewUser }

