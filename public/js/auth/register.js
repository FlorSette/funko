const inputName = document.getElementById('nombre')
const inputLastName = document.getElementById('apellido')
const inputMail = document.getElementById('email')
const inputPassword = document.getElementById('contraseña')
const inputPasswordRepeat = document.getElementById('confirmacion')
const boxCondition = document.getElementById('condiciones')
const formElement = document.getElementById('aForm')


const areOkInputs = () => {
    if (inputName.value == '' || inputLastName.value == '' || inputMail.value == '' 
         || inputPassword.value == '' || inputPasswordRepeat.value == ''){
        alert('Error: Complete todos los campos para poder registrarse ! \n')
        return false;
    }
    return true;
}

const areOkPasswordAndBox = (event) => {
    if (inputPassword.value != inputPasswordRepeat.value){
        alert('Error: Las contraseñas no coinciden. Revisa ambos campos\n')
        return false 
    } else if(! boxCondition.checked){
        alert('Necesita aceptar los terminos y condiciones para poder crearse una cuenta\n')
        return false
    }
    return true
}

const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    now.setMinutes(now.getMinutes() - offset);
    const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDateTime;
}

const handlerSubmitForm = (event) => {
    event.preventDefault(); // Evitamos recargar la pagina. 
    if(!areOkInputs() || ! areOkPasswordAndBox() ){
        return;
    }
    fetch(`/auth/register`,{
        method:'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          aName: inputName.value,
          aLastName: inputLastName.value,
          aMail: inputMail.value, 
          aPassword: inputPassword.value, 
          aCreationTime: getCurrentDateTime()
        }),
      }).then( async (res) => {
        const resJson = await res.json();
        console.log('resJson.message', resJson.message, resJson)
        if(resJson.message == 'USER_EXISTS'){
            alert(`Error: el email:\n ${inputMail.value}\n ya se encuentra en uso. Intenta con otro email.`)
        } else {
            alert('Usuario registrado con exito!')
        }        
        window.location.href = '/auth/register';        
      }).catch( (error) => {
        console.error("Entro a la excepcion del fetch: Error:", error)
      })
}

formElement.addEventListener('submit', handlerSubmitForm )
