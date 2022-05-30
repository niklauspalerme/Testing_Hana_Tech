/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const dbClass = require("sap-hdbext-promisfied")
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const { TruncatedHanaDB } = require("../database/slmDBFunctions");
const router = Router();


/////////////////////////////////////////////////////////////
// Implementation


router.post('/',  async (req,res) =>{


    try {

        const results = await TruncatedHanaDB(req.db)

        return res.type("application/json").status(200).send(results)


    } catch (error) {
        return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)

    }

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
// Exports

module.exports = router