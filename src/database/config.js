/////////////////////////////////////////////////////////////
// Importaciones


const { config } = require('dotenv');
const hana = require('@sap/hana-client');


/////////////////////////////////////////////////////////////
// Funciones

const dbConnection = async() => {

    try {

        config();

        let conn = await hana.createConnection();

        await conn.connect({
            host    : 'dev-hana.kcc.com',
            port    : '30115',
            uid     : 'APP_API_KCNA_SALES_C',
            pwd     : 'Doos2aN$jef',
            sslValidateCertificate: "false"
          });


        await conn.exec("SELECT TOP 1 * FROM NA_CUSTOM.AMZN_VENDORCENTRAL_KC_ECOM_DLY_SALES_DIAGNOSTIC_CA_TMP", (err, rows) => {
            if (err) 
                throw err;
            else{
                console.log('Rows:', rows);
                console.log("HANA Connected :D");
                conn.disconnect();
                return rows

            }
               
                
          });

          

        //
       
        

    } catch (error) {
        console.log(error)
        throw new Error("Error to Connect DB HANA");
    }

}


const dbTest = (data) => {

    console.log(typeof(data));

}




//SELECT * FROM NA_CUSTOM.AMZN_VENDORCENTRAL_KC_ECOM_DLY_SALES_DIAGNOSTIC_CA_TMP
//SELECT TOP 1 * FROM NA_CUSTOM.AMZN_VENDORCENTRAL_KC_ECOM_DLY_SALES_DIAGNOSTIC_CA_TMP


/////////////////////////////////////////////////////////////
// Exportaciones

module.exports = {
    dbConnection
}