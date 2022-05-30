/////////////////////////////////////////////////////////////
// Importaciones

const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
var axios = require('axios');
var qs = require('qs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var myHeaders = new Headers();
const Request = require('request');






/////////////////////////////////////////////////////////////
// Funciones Controllers de Usuario



//GET /api/usuarios
const usuarioGet = async (req = request, res = response) => {


    var options = {
        'method': 'POST',
        'rejectUnauthorized': false,
        'url': 'https://api.amazon.com/auth/o2/token',
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          'grant_type': 'refresh_token',
          'refresh_token': 'Atzr|IwEBIE5efpmYwCnICUsBMNtVSGnhk_NoFFumtaEugEmXh81OYQYkb0fFezqAj-wZb3tITXqGGwTo4ejvVzqQPioWIBeVEd0dc7Qrfm1HvygDUJUeRUbpmPKrhWnDJpOyJ-2JMbPkB2ppTUVJsw9TiyN9bxXnxu42xorpVOzuG1xHQRXXOJDL8ZBHbT_OJSKVsOwWMZJBcfr8erRmama6LDv5IWYP0X0_YOOrwaqNixj16uAUh9VNzQQYDp1pmr2LDhlZ2Mi44GrILbj3xO0HYcWNdpzDdEfnlIRIMWZpKk6M12ElbQ',
          'client_id': 'amzn1.application-oa2-client.45e8bf7652834007ba7f78f02d601c79',
          'client_secret': 'ba23aca4bc11bc333514c85ff2847c7eb90bed85f2f81f7719d59ae3e6c93128'
        }
      };

      Request(options, function (error, response) {
        if (error) 
            throw new Error(error);
        else {
            console.log(response.body);
             return res.status(200).json({
                "Message": "GET /api/usuarios",
                "Response": JSON.parse(response.body)
            });

        }
        
      });
      

}

/*

//POST /api/usuarios
const usuarioPost = async(req, res) => {

    console.log("POST /api/usuarios");


    const { nombre, correo, password, rol } = req.body
    const usuarioObj = {
        nombre,
        correo,
        password,
        rol
    }


    //Encrypt
    const salt = bcryptjs.genSaltSync();
    usuarioObj.password = bcryptjs.hashSync(password, salt);

    const usuario = new Usuarios(usuarioObj);
    await usuario.save();

    res.status(201).json({
        "Message": "POST /usuarios",
        usuario
    });
}


//PUT /api/usuarios/:id
const usuarioPut = async(req = request, res) => {

    console.log("PUT /api/usuarios/:id");

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        //Encrypt
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuarios.findByIdAndUpdate(id, resto)


    res.status(200).json({
        "Message": "Put Mil Fleurs",
        usuarioDB
    });
}


//DELETE /api/usuarios
const usuarioDelete = async (req, res) => {

    console.log("DELETE /api/usuarios")

    const {id}= req.params;

    //Eliminar fisicamente el record
    //const usuario = await Usuarios.findByIdAndDelete(id);

    //Cambiamos el estado = false
    //Es para mantener la integridad de los datos
    const usuario = await Usuarios.findByIdAndUpdate(id, {estado: false});


    res.status(200).json({ 
        "Message": "DELETE /api/usuarios",
        usuario
    });
}




const usuarioPath = (req, res) => {
    res.json({ 
        "Message": "DELETE /api/usuarios"    });
}


*/

/////////////////////////////////////////////////////////////
// Exportaciones

module.exports = {
    usuarioGet
}