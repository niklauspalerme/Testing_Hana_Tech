/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const dbClass = require("sap-hdbext-promisfied")
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const { TruncatedHanaDB, insertHanaDB } = require("../database/slmDBFunctions");
const { RequestPPG } = require("../database/Microservice_PPG");
const { postPPG, getDataPPG, getDataEPH } = require("../controllers/slmController");
const router = Router();


/////////////////////////////////////////////////////////////
// Implementation


//Get data from Services
router.get('/ppg', getDataPPG);

router.get('/eph', getDataEPH);


/////////////////////////////////////////////////////////////
// Exports

module.exports = router