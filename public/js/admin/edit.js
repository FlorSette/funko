const categorySelect = document.getElementById('categoria')
const licenseSelect = document.getElementById('licencia') 
const inputNameProduct = document.getElementById('nombre')
const inputDescription = document.getElementById('descripcion')
const inputSku = document.getElementById('sku')
const inputPrice = document.getElementById('precio')
const inputStock = document.getElementById('stock')
const inputDiscount = document.getElementById('descuento')
const inputDues = document.getElementById('cuotas')
const modifiedProductBtn = document.getElementById('modifiedProduct')
const inputFileImg = document.getElementById('fileImg')
const imgFrontElement = document.getElementById('imgFront')
const imgBackElement = document.getElementById('imgBack')

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

const getImgFrontAndBackToSend = () => {
    let imgFrontToSend = imgFrontElement.src
    let imgBackToSend = imgBackElement.src
    const pathInitialImg = getPathInitial();
    if (imgNames.length == 1 ){
        imgFrontToSend = pathInitialImg + imgNames[0]
    } else if (imgNames.length == 2 ){
        imgFrontToSend = pathInitialImg + imgNames[0]
        imgBackToSend = pathInitialImg + imgNames[1]
    }
    return {imgFrontToSend, imgBackToSend}
}

const sendProductModifications = () => {
    if (!areOkInputs() ){
        return;
    }
    const {imgFrontToSend, imgBackToSend} = getImgFrontAndBackToSend()
    console.log("imgFrontToSend: ",imgFrontToSend, "imgBackToSend: ",  imgBackToSend)
    const productId = parseInt( window.location.pathname.split('/').pop()) 
    // parseo la url y obtengo el ultimo elemento q es justo el id del producto.
    console.log('Los datos estan ingresados de forma correcta se procede a realizar el fetch con el PUT.')
    
    fetch(`/admin/edit/${productId}`,{
        method:'PUT',
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
          aFrontImg: imgFrontToSend,
          aBackImg: imgBackToSend,
        }),
      })
      .then( (res) => {
        window.alert("Producto modificado en la tabla product con exito!\n");
        return res.json()
      })
      .catch( (error) => {
        console.error("Entro a la excepcion del fetch: Error:", error)
      })
}

modifiedProductBtn.addEventListener('click', sendProductModifications)
inputFileImg.addEventListener('change', getImgNames)


