const mysql = require('mysql');

let connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'userToy',
  password : '123456',
  database : 'funkoDB'
});
 
connection.connect(function(err) {
  if (err) {
	console.log("Entre a la excepcion\n");
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});



module.exports = {connection}

