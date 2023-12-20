
const authModel =  require('../models/auth/authModel')

const renderLoginPage = async (req, res) => {
	res.render('pages/auth/login',{})
}

const tryLoginUser = async (req, res) => {
    const aMail = req.body.aMail
    const aPassword = req.body.aPassword 
    console.log("aMail", aMail, "aPassword", aPassword)
    const answer = await authModel.checkUserExists(aMail, aPassword)
    if(answer == 'NO_USER_EXISTS'){
        res.status(404).json({ message: 'NO_USER_EXISTS'});    
    } else {
        res.status(200).json({message:'EXITO'})
    }
}

const renderRegisterPage = async(req, res) => {
    res.render('pages/auth/register', {})    
}

const tryRegisterANewUser = async(req, res) => {
    userData = { 
        aName: req.body.aName,
        aLastName: req.body.aLastName,
        aMail: req.body.aMail, 
        aPassword: req.body.aPassword, 
        aCreationTime: req.body.aCreationTime    
    }
    console.log(userData)
    const answer = await authModel.tryRegisterANewUser(userData)
    if (answer == 'USER_EXISTS'){
        res.status(406).json({message: 'USER_EXISTS'});
    } else{
        res.status(200).json({message: 'El usuario se ha registrado con exito!'})
    }
}

const renderLogoutPage = (req, res) => {
    res.render('pages/auth/logout', {})
}

module.exports = {renderLoginPage, tryLoginUser, renderRegisterPage, tryRegisterANewUser, renderLogoutPage}


