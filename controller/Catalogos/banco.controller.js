const { getBancosSql } = require("../../database/repositories/bancos/bamcos.repositories");
const { validarTenant } = require("../../helpers/requestValidator");

const getBancos = async (req, reply) => {
  try {
    const paramatros = req.query;
    const tenant = req.tenant;

    if (!validarTenant(reply, tenant)) {
      return;
    }

    const datos = await getBancosSql(tenant.subdominio , paramatros );

    reply.status(200).send(datos)
  } catch (error) {
 console.log('error :>> ', error);
    reply.status(400).send(error)
  }
};

module.exports ={
    getBancos
}
