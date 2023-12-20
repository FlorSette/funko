const categorySelect = document.getElementById('categoria')
const licenseSelect = document.getElementById('licencia') 
const inputNameProduct = document.getElementById('nombre')
const inputDescription = document.getElementById('descripcion')
const inputSku = document.getElementById('sku')
const inputPrice = document.getElementById('precio')
const inputStock = document.getElementById('stock')
const inputDiscount = document.getElementById('descuento')
const inputDues = document.getElementById('cuotas')
const addProductBtn = document.getElementById('addProduct')
const cleanFieldsBtn = document.getElementById('cleanFields')
const inputFileImg = document.getElementById('fileImg')

const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    now.setMinutes(now.getMinutes() - offset);
    const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDateTime;
}

let currenImgType = 'Frente'
let imgNames = []

const getImgNames = () => {
    const aImgName = inputFileImg.value.replace('C:\\fakepath\\','') 
    if(currenImgType == 'Frente'){
        frenteLabel.style.display = 'inline'
        frenteFileName.style.display = 'inline'
        frenteFileName.textContent = aImgName
        currenImgType = 'Dorso'
        imgNames[0] = aImgName 
    } else if ( currenImgType == 'Dorso'){
        dorsoLabel.style.display = 'inline'
        dorsoFileName.style.display = 'inline'
        dorsoFileName.textContent = aImgName
        currenImgType = 'Frente'
        imgNames[1] = aImgName
    }
} 


const isAValidNumber = (aInputNumber, type) => {
    let value = parseFloat(aInputNumber.value)
    if(type == 'STOCK' || type == 'DISC'){
        value = parseInt(aInputNumber.value)
    } if( isNaN(value) ){
        return false
    } if (type == 'DISC' && (value < 0 || value >= 100) ){
        return false
    } if (type == '' && value <= 0){
        return false
    }
    return true
}

const areOkInputs = () => {
    if(categorySelect.value == 'Seleccionar' || licenseSelect.value == 'Seleccionar' 
        || inputNameProduct.value == '' || inputDescription.value == '' || (inputSku.value == '' || isFinite(inputSku.value)) 
        || !isAValidNumber(inputPrice, '') || ! isAValidNumber(inputStock,'STOCK') || !isAValidNumber(inputDiscount,'DISC') ){
        alert('Error en los datos: asegurate de completar de forma correcta todos los campos!')
        return false;
    }
    return true;
}

const getPathInitial = () => {
    const licenceName = licenseSelect.value;
    let pathInitialImg = '/img/pokemon/'
    if( licenceName.includes('Star Wars') ){
        pathInitialImg = '/img/star-wars/'
    } else if ( licenceName.includes('Harry Potter')){
        pathInitialImg = '/img/harry-potter/'
    }
    return pathInitialImg
}

const sendDataProduct = () => {
    if (!areOkInputs() || (imgNames.length < 2) ){
        return;
    }    
    const pathInitialImg = getPathInitial()
    console.log('Se ha ingresado con exito todos los datos del producto')
    fetch(`/admin/create`,{
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        aCategory: categorySelect.value,
        aLicense: licenseSelect.value,
        aNameProduct: inputNameProduct.value,
        aDescription: inputDescription.value,
        aSku: inputSku.value,
        aPrice: parseFloat(inputPrice.value),
        aStock: parseInt(inputStock.value),
        aDiscount: parseInt(inputDiscount.value),
        aDues: parseInt(inputDues.value),
        aFrontImg: (pathInitialImg + imgNames[0]),
        aBackImg: (pathInitialImg + imgNames[1]),
        aCreationTime: getCurrentDateTime()
      }),
    })
    .then( (res) => {
      window.alert("Producto agregado a la tabla producto con exito!\n");
      return res.json()
    })
    .catch( (error) => {
      console.error("Entro a la excepcion del fetch: Error:", error)
    })
}

const handlerCleanFieldsBtn = () => {
    categorySelect.value = 'Seleccionar'
    licenseSelect.value = 'Seleccionar' 
    inputNameProduct.value = ''
    inputDescription.value = ''
    inputSku.value = ''
    inputPrice.value = ''
    inputStock.value = ''
    inputDiscount.value = ''
    inputDues.value = '3'
}

addProductBtn.addEventListener('click', sendDataProduct)
cleanFieldsBtn.addEventListener('click', handlerCleanFieldsBtn)
inputFileImg.addEventListener('change', getImgNames )

module.exports = { isAValidNumber, areOkInputs }

