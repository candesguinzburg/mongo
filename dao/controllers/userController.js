const bcrypt = require('bcrypt')
const User = require("../models/user")

const findUserByUserName = async (username) =>{
    return await User.findOne({username})
}

const createUser = async (user) => {
    console.log('creando usuario', user)
    const newUser = new User(user)
    return await newUser.save()
}
const isValidCredentials = async (user) => {
    const userFound = await User.findOne({ mail: user.mail })
    if(userFound){
        const passwordMatched = await bcrypt.compare(user.password, userFound.password)
         if(passwordMatched){
          return {ok: true, userFound}
         }
        
    }return {ok: false, message:'no existe un usuario con esas credenciales'}
}

module.exports = {findUserByUserName, createUser, isValidCredentials}