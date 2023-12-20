const express = require('express')
const adminController  = require('../controllers/adminControllers')

const adminRouter = express.Router()

adminRouter.get('/', adminController.renderAdminPage)

adminRouter.delete('/delete/:productId', adminController.deleteAProduct)

adminRouter.get('/create', adminController.renderCreatePage)

adminRouter.post('/create', adminController.addNewProduct)

adminRouter.get('/edit/:productId', adminController.renderEditPage)

adminRouter.put('/edit/:productId', adminController.updateAProduct)


module.exports = {adminRouter}

