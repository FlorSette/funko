const express = require('express')
const shopRouter = express.Router()

const shopController  = require('../controllers/shopControllers')

shopRouter.get('/', shopController.renderShopPage)

shopRouter.get('/item/:productId', shopController.renderItemId)

shopRouter.post('/item/:productId/add', shopController.addProduct)

shopRouter.get('/cart', shopController.renderCartPage)

shopRouter.put('/item/:productId/update', shopController.updateProductInCart)

shopRouter.delete('/cart', shopController.deleteProductInCart)

shopRouter.post('/cart',shopController.payCart)

module.exports = {
	shopRouter,
}


//shopRouter.get('/cart', shopController.renderCartPage)

//shopRouter.post('/cart', shopController.buyProduct)

/*
shopRouter.use((_req, res) => {
	res.status(404).send('Called /shop with wrong HTTP method or path')
})

*/