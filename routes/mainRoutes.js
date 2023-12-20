const express = require('express')
const mainRouter = express.Router() // Router para operar con las rutas 

const mainController = require("../controllers/mainControllers")

// Routes.js aca haremos los get, post, put, delete necesarios para todas las paginas. 

mainRouter.get("/", mainController.renderHome)

mainRouter.get("/contact", mainController.renderContactPage)

/*
mainRouter.use((req, res, next) => {
    res.status(404).send("No existe esta Ruta\n")
} )
*/

// creas el router e inmediatamente lo exportamos. exportamos un objeto lo estructuro. 
module.exports = {mainRouter};

