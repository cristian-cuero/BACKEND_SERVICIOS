const bcrypt = require('bcrypt');
const { userLogin } = require('../database/repositories/user.repositories');
const { hashPassword, normalizeRow } = require('../helpers/normalizeUTF8');

async function loginUser(data) {
  try {
    // Llamar a la función userLogin para obtener el usuario de la base de datos
    const user = await userLogin(data);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
    const  hashedInpunt =  String(hashPassword(data.password)).trim();
    
    if (hashedInpunt != user[0].password) {
      throw new Error("Contraseña incorrecta o usuario no encontrado");
    }
    const { password, ...userWithoutPassword } = user[0]; // Eliminar la contraseña del objeto de usuario antes de devolverlo  
    
    return normalizeRow(userWithoutPassword);

  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginUser,
};
