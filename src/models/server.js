/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const express = require('express');
const cors = require('cors');
const hdbext = require('@sap/hdbext');
//const { dbConnection } = require('../database/config')



/////////////////////////////////////////////////////////////
// Clases


class Server {


    ////////////////////////////////
    //Constructor

    constructor() {

        //Express
        this.app = express();

        //Path de las rutas
        this.slmPath = '/api/v1/movePricingData';

        // Hana Configuration
        this.hanaConfig= {
            host     : 'dev-hana.kcc.com',
            port     : '30115',
            user     : 'APP_API_KCNA_SALES_C',
            password : 'Doos2aN$jef'
          };

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

        
    }

    ////////////////////////////////
    //Metodos


    middlewares = () => {

        //Directorio Publico
        this.app.use(express.static('src/public'));

        //CORS
        this.app.use(cors());

        //Lectura y parseo de body
        this.app.use(express.json());

        //Middleware para Ejecutar HANA en el request
        this.app.use(hdbext.middleware(this.hanaConfig));

        //Conectar a la Database - Hana
        //this.connectionDatabase();

    }


    routes = () => {

        //POST --> http://localhost:3000/api/v1/movePricingData
        this.app.use(this.slmPath, require('../routes/slm'));

    }


    connectionDatabase = async () => {

        //let nico = await dbConnection();
        //console.log(this.hanaConfig);
        
    }


    listen = (port) => {

        this.app.listen(port, () => {
            console.log(`Server is listen the port ${port}`);
        })

    }

}


/////////////////////////////////////////////////////////////
// Exportamos

module.exports = Server