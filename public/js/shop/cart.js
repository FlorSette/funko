// Validar la cantidad en el evento "change" -Función para validar y asegurarse de que la cantidad no sea menor a 0
const validateQuantity = (aQuantity) => {
	let cantidad = parseInt(aQuantity.value);
	if (isNaN(cantidad) || cantidad < 0) aQuantity.value = 0;
}

const sendUpdateProductToBackend = (aInputQuantity, positionBtn) => {
	const hrefWithProductId = document.querySelectorAll('.reference_product_id')[positionBtn];
	const productId = parseInt(hrefWithProductId.getAttribute('href').split('/').pop()) 
	const aQuantity = parseInt(aInputQuantity.value);
	console.log("Enviando un fetch con: (productId, aQuantity)", productId, aQuantity)
	fetch(`/shop/item/${productId}/update`,{
		method:'PUT',
		headers: {
		  'Content-type': 'application/json'
		},
		body: JSON.stringify({
		  productQuantity:aQuantity,
		}),
	  }).then( (res) => {
		console.log("Enviando el put con exito")
		return res.json()
	}).catch( (error) => {
		console.error("Entro a la excepcion del fetch: Error:", error)
	})
}

const updateFinalPriceTotalAndQuantity = () => {
	let finalPriceTotal = 0 
	document.querySelectorAll('.product-card__price').forEach( (priceProductElement) => {
		finalPriceTotal += parseFloat(priceProductElement.textContent.replace('$', '').trim()) 
	})

	let quantityTotalProducts = 0
	document.querySelectorAll('.quantityInput').forEach( (quantityProductElement) => {
		quantityTotalProducts += parseInt( quantityProductElement.value)
	} )
	document.querySelector('.finalQuantity').textContent = quantityTotalProducts
	document.querySelector('.finalSubTotalPrice').textContent = `$ ${finalPriceTotal.toFixed(2)}`
	document.querySelector('.finalTotalPrice').textContent = `$ ${finalPriceTotal.toFixed(2)}`
}

const updatePrices = (quantityInput, positionBtn, aOrigen) => {
	const priceElement = document.querySelectorAll('.product-card__price')[positionBtn]
	const priceUnit = document.querySelectorAll('.price')[positionBtn].textContent.trim()
	if(aOrigen == "OPERATION") quantityInput.dispatchEvent(new Event('change'));
	const finalPrice = parseFloat(quantityInput.value) * parseFloat(priceUnit)
	priceElement.textContent = `$ ${finalPrice.toFixed(2)}`;	
	updateFinalPriceTotalAndQuantity()
}

const applyHandlerPlusBtn = (aPlusBtn, positionBtn) => {
	aPlusBtn.addEventListener('click', () => {
		const quantityInput = document.querySelectorAll('.quantityInput')[positionBtn]
		quantityInput.value++
		updatePrices(quantityInput, positionBtn, "OPERATION")
	})
}

const applyHandlerMinusBtn = (aMinusBtn, positionBtn) => {
	aMinusBtn.addEventListener('click', () => {
		const quantityInput = document.querySelectorAll('.quantityInput')[positionBtn]
		quantityInput.value--
		updatePrices(quantityInput, positionBtn, "OPERATION")
		if(quantityInput.value < 0 ) return;
	})
}

const applyHandlerDeleteBtn = (aDeleteBtn, positionBtn) => {
	aDeleteBtn.addEventListener('click', () => {
		const hrefWithProductId = document.querySelectorAll('.reference_product_id')[positionBtn];
		const productIdToSend = hrefWithProductId.getAttribute('href').split('/').pop()
		console.log("Eliminado el producto del carrito :", productIdToSend)
		fetch(`/shop/cart`,{
			method:'DELETE',
			headers: {
			  'Content-type': 'application/json'
			},
			body: JSON.stringify({
			  productId:productIdToSend,
			}),
		  }).then( (res) => {
			console.log("Recibiendo respuesta del delete con exito \n")
			return res.json()
		}).then((data) => {
            console.log("Respuesta del servidor:", data);
            // Recargar la página después de la eliminación
            location.reload();
        }).catch( (error) => {
			console.error("Entro a la excepcion del fetch: Error:", error)
		})
	})
} 

document.querySelectorAll('.quantityInput').forEach( (aInputQuantity, positionBtn) => {
	aInputQuantity.addEventListener( 'change' , () => {
		validateQuantity(aInputQuantity)
		sendUpdateProductToBackend(aInputQuantity, positionBtn);
		updatePrices(aInputQuantity, positionBtn, "NO_OPERATION")
	})
})

document.querySelectorAll('.plus').forEach(applyHandlerPlusBtn)
document.querySelectorAll('.minus').forEach(applyHandlerMinusBtn)
document.querySelectorAll('.deleteX').forEach(applyHandlerDeleteBtn)


const handlerPayCartBtn = () => {
	console.log("Se hizo click en comprar el carrito todos los productos seran enviados a tu domicilio!.\n")
	// @TODO Supuesto supondremos que al hacer post se eliminaran todos los elementos del carrito porque fueron ya enviados al domicilio. 
	fetch(`/shop/cart`,{
		method:'POST',
		headers: {
		  'Content-type': 'application/json'
		},
	  }).then( (res) => {
		console.log("Recibiendo respuesta del Pay Cart con exito \n")
		return res.json()
	}).then((data) => {
		console.log("Respuesta del servidor:", data);
		location.reload();
		window.alert('Se compraron todos los productos del carrito con Exito!.\nLos productos seran enviados a tu domicilio!')
	}).catch( (error) => {
		console.error("Entro a la excepcion del fetch: Error:", error)
	})
}

const payCartBtn =  document.querySelector('.resume__button')
payCartBtn.addEventListener('click', handlerPayCartBtn)

/*
function operationStringNumber(numString, value) {
	let myNum = Number(numString)
	if (Number.isNaN(myNum)) myNum = 0
	let updatedNum = myNum + value
	if (updatedNum < 0) updatedNum = 0
	return updatedNum.toString()
}

const inputArray = document.querySelectorAll('.product-card__quantity')

inputArray.forEach(inputGroup => {
	const inputElement = inputGroup.querySelector('input')
	const buttonPlus = inputGroup.querySelector('.plus')
	const buttonMinus = inputGroup.querySelector('.minus')
	const productCard = inputGroup.closest('.product-card')

	if (!inputElement || !productCard) return

	buttonPlus?.addEventListener('click', () => {
		inputElement.value = operationStringNumber(inputElement.value, 1)
		updateResume()
	})

	buttonMinus?.addEventListener('click', () => {
		inputElement.value = operationStringNumber(inputElement.value, -1)
		updateResume()
	})

	inputElement.addEventListener('input', () => {
		updateResume()
	})
})

const productCards = document.querySelectorAll('.product-card')


function updatePrice(productCard) {
	const productPriceElement = productCard.querySelector('.product-card__details .price')
	const quantityElement = productCard.querySelector('.product-card__quantity input')
	const totalPriceElement = productCard.querySelector('.product-card__price p')

	const productPrice = Number(productPriceElement?.textContent) || 0
	const quantity = Number(quantityElement?.value) || 0

	const totalPrice = productPrice * quantity

	if (totalPriceElement) {
		totalPriceElement.textContent = totalPrice.toFixed(2)
	}
	return { totalPrice, quantity }
}

function updatePrices() {
	productCards?.forEach(productCard => {
		updatePrice(productCard)
	})
}

const resumeChart = {
	element: document.querySelector('.resume__chart'),
	quantity: document?.querySelector('.resume__chart .quantity .number'),
	subtotal: document?.querySelector('.resume__chart .subtotal .number'),
	shipping: document?.querySelector('.resume__chart .shipping .number'),
	total: document?.querySelector('.resume__chart .total .number'),
}

function updateResume() {
	let quantity = 0
	let subtotal = 0
	let shipping = 0
	let total = 0

	productCards?.forEach(productCard => {
		const { totalPrice: cardPrice, quantity: cardQuantity } = updatePrice(productCard)
		quantity += cardQuantity
		subtotal += cardPrice * cardQuantity
	})

	total = subtotal + shipping

	if (resumeChart.quantity && resumeChart.subtotal && resumeChart.shipping && resumeChart.total) {
		resumeChart.quantity.textContent = quantity.toString()
		resumeChart.subtotal.textContent = subtotal.toFixed(2)
		resumeChart.shipping.textContent = shipping.toFixed(2)
		resumeChart.total.textContent = total.toFixed(2)
	}
}

// updatePrices()
updateResume()
*/
