const inputMail = document.getElementById('email')
const inputPassword = document.getElementById('password')
const formElement = document.getElementById('aForm')

const handlerSubmitForm = (event) => {
    if(inputMail.value == '' || inputPassword.value == ''){
        window.alert('Error: Debe completar los campos email y contraseña no pueden estar vacios.\n');
        event.preventDefault(); // Evitamos recargar la pagina. 
        return;
    }
    event.preventDefault();
    fetch(`/auth/login`,{
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        aMail: inputMail.value,
        aPassword: inputPassword.value 
      }),
    }).then( async (res) => {
      const resJson = await res.json();
      if(resJson.message == 'NO_USER_EXISTS'){
        window.alert("Error: El nombre de usario y contraseña que ingresastes no esta conectado a una cuenta\n")
      } else{ 
        window.location.href = '/admin';
      }
    }).catch( (error) => {
      console.error("Entro a la excepcion del fetch: Error:", error)
    })
}

formElement.addEventListener('submit', handlerSubmitForm)



