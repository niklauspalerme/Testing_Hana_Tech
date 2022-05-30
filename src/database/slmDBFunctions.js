/////////////////////////////////////////////////////////////
// Imports y Requeriments


const dbClass = require("sap-hdbext-promisfied")


/////////////////////////////////////////////////////////////
// Functions


const TruncatedHanaDB = async (dbReq) =>{

    try {
        
        let db = new dbClass(dbReq);

        const statement = await db.preparePromisified("SELECT TOP 1 * FROM NA_CUSTOM.AMZN_VENDORCENTRAL_KC_ECOM_DLY_SALES_DIAGNOSTIC_CA_TMP");

        const results = await db.statementExecPromisified(statement, []);

        //console.log(results);
        //let result = JSON.stringify({results})

        return results
        
        //res.type("application/json").status(200).send(results)


    } catch (error) {

        console.log(error);
        return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)

    }

}


/////////////////////////////////////////////////////////////
// Exports

module.exports={
    TruncatedHanaDB 
}