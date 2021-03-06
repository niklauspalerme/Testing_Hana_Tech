/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const dbClass = require("sap-hdbext-promisfied")
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const { RequestPPG } = require("../database/Microservice_PPG");
const { postPPG, getDataHanaPPG, getDataHanaEPH } = require("../controllers/slmController");
const router = Router();


/////////////////////////////////////////////////////////////
//Routes & Methods 


router.post('/',  postPPG);
router.get ('/hana/ppg', getDataHanaPPG);
router.get('/hana/eph', getDataHanaEPH);


/////////////////////////////////////////////////////////////
// Exports

module.exports = router