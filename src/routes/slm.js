/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();


/////////////////////////////////////////////////////////////
// Implementación


router.post('/', (req,resp) =>{

    const client = req.db;

    client.exec("SELECT TOP 1 * FROM NA_CUSTOM.AMZN_VENDORCENTRAL_KC_ECOM_DLY_SALES_DIAGNOSTIC_CA_TMP", (err, rs) => {
        if (err) 
            return resp.end('Error: ' + err.message);
        resp.end(JSON.stringify(rs));
        });
})



/*
router.get('/', usuarioGet);

router.post('/',[
    check('nombre', 'The name is empty').not().isEmpty(),
    check('correo', 'The email is invalid').isEmail(),
    check('correo').custom(validarEmailRepetido),
    check('password', 'The password must be more 6 characters').isLength({ min: 6 }),
    check('rol').custom(esRoleValido),
    validarCampos],
    usuarioPost);

router.put('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRoleValido),
    validarCampos],
    usuarioPut);

router.delete('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos],
    usuarioDelete);

router.patch('/', usuarioPath);
*/


/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router