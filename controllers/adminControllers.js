const adminModel = require('../models/admin/adminModel')

const renderAdminPage = async (req, res) => {
	const queryProducts = await adminModel.getProductsOrderById();
	res.render('admin/admin',{ 
		products :queryProducts
	})
}

const deleteAProduct = async(req, res) => {
	await adminModel.deleteAProductQuery(req.params.productId)
	res.status(200).json({ message: 'Producto eliminado de la tabla de productos exitosamente' });    
}

const renderCreatePage = async (req, res) => {
	const categorysProducts = await adminModel.getCategorys()
	const licencesProducts = await adminModel.getLicences()
	res.render('pages/admin/create',{
		categorys: categorysProducts,
		licenses: licencesProducts  
	})
}

const addNewProduct = async (req, res) => {
	const dataProducts = {
		aCategory: req.body.aCategory,
		aLicense: req.body.aLicense,
		aNameProduct: req.body.aNameProduct,
		aDescription: req.body.aDescription,
		aSku: req.body.aSku,
		aPrice: req.body.aPrice,
		aStock: req.body.aStock,
		aDiscount: req.body.aDiscount,
		aDues: req.body.aDues,
		aFrontImg: req.body.aFrontImg,
		aBackImg: req.body.aBackImg,
		aCreationTime: req.body.aCreationTime
	};
	await adminModel.addNewProduct(dataProducts)
	res.status(200).json({ message: 'Producto agregado a la tabla de productos exitosamente\n'});    
}


const renderEditPage = async (req, res) => {
	const productId = req.params.productId
	const categorySelect = await adminModel.getCategoryNameSelect(productId)
	const licenseSelect = await adminModel.getLicenseNameSelect(productId)
	const otherCategorys = await adminModel.getOtherCategorysName(categorySelect)
	const otherLicenses = await adminModel.getOtherLicenseName(licenseSelect)
	const dataProduct = await adminModel.getDataProduct(productId)
	const dueSelect = await adminModel.getDueSelect(productId)
	let otherDues = 3
	if(dueSelect == 3){
		otherDues = 6
	}

	res.render('pages/admin/edit', {
		aCategory : categorySelect,
		aLicense : licenseSelect, 
		categorys: otherCategorys,
		licenses: otherLicenses,
		aProduct :dataProduct[0],
		aDues : dueSelect,
		anotherDues : otherDues
	})
}

const updateAProduct = async (req, res) => {
	const productId = req.params.productId
	const dataUpdateProduct = {
		aCategory: req.body.aCategory,
		aLicense: req.body.aLicense,
		aNameProduct: req.body.aNameProduct,
		aDescription: req.body.aDescription,
		aSku: req.body.aSku,
		aPrice: req.body.aPrice,
		aStock: req.body.aStock,
		aDiscount: req.body.aDiscount,
		aDues: req.body.aDues,
		aFrontImg: req.body.aFrontImg,
		aBackImg: req.body.aBackImg,
	}
	console.log(dataUpdateProduct)
	await adminModel.updateAProduct(productId, dataUpdateProduct)
	res.status(200).json({ message: 'Producto agregado a la tabla de productos exitosamente\n'});
}

module.exports = { renderAdminPage, deleteAProduct, renderCreatePage,
	 				addNewProduct, renderEditPage, updateAProduct}

					