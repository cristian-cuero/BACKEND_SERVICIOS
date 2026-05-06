const { login } = require("../controller/user.controller")
const { loginSchema } = require("../schema/userSchema")


module.exports =  (fastify) => {

fastify.post("/login",{
    schema: loginSchema
}, login)
}