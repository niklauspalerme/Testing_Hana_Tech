/////////////////////////////////////////////////////////////
// Imports y Requeriments


const dbClass = require("sap-hdbext-promisfied")


/////////////////////////////////////////////////////////////
// Functions


//#1
const TruncatedHanaDB = async (dbReq) =>{

    try {
        let db = new dbClass(dbReq);
        const statement = await db.preparePromisified("TRUNCATE TABLE NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING");
        await db.statementExecPromisified(statement, []);
        console.log("Step #1 -DB Borrada PPG");
    } catch (error) {
        console.log(error);
        return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)
    }

}


//#2
const TruncatedHanaDbEPH = async (dbReq) =>{

    try {
        let db = new dbClass(dbReq);
        const statement = await db.preparePromisified("TRUNCATE TABLE NA_CUSTOM.SLM_SAP_EPH_KC_TMV_WKLY_PRICING");
        await db.statementExecPromisified(statement, []);
        console.log("Step #5 -DB Borrada EPH");
    } catch (error) {
        console.log(error);
        return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)
    }

}

//#3
const insertHanaDB = async (dbReq, payload) =>{

    let db = new dbClass(dbReq);

    let results =  await payload.map(object => {
        
        const result = [
            object.PromPrcGrp,
            object.PrcTyp,
            object.Country,
            object.Uom,
            object.LstPrcEftvDt,
            object.LstPrcEftvEndDt,
            object.Value,
            object.Currency,
            object.CreatedUserId,
            object.CreatedDatetime,
            object.LastUpdatedUserId,
            object.LastUpdatedDatetime,
            object.Guid]
        
        return result
        
        }
    )

    console.log("Step #3 - Mapeo Listo");

    //const statement = await db.preparePromisified("TRUNCATE TABLE NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING");
    //const statement = await db.preparePromisified("SELECT TOP 1 * FROM NA_CUSTOM.AMZN_VENDORCENTRAL_KC_ECOM_DLY_SALES_DIAGNOSTIC_CA_TMP");
    //const statement = await db.preparePromisified("SELECT * FROM NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING");
    //const aja = await db.statementExecPromisified(statement, []);
    
    const statement = await db.preparePromisified(`INSERT INTO NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING 
        (
            PROM_PRC_GRP, 
            PRC_TYP,
            COUNTRY, 
            UOM, 
            LAST_PRICE_EFFECTIVE_DATE, 
            LAST_PRICE_EFFECTIVE_END_DATE, 
            VALUE, 
            CURRENCY,
            CREATED_USER_ID,
            CREATED_DATETIME, 
            LAST_UPDATED_USER_ID, 
            LAST_UPDATED_DATETIME, 
            GUID
        ) 
        VALUES
        (
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?, 
            ?
        )`
    );

    await db.statementExecPromisified(statement,results);


}

//4
const insertHanaDbEPH = async (dbReq, payload) =>{

    let db = new dbClass(dbReq);

    let results =  await payload.map(object => {
        const result = [
            object.Zprdhal6,
            object.Zprdhal7,
            object.Zprdhal8,
            object.Zprdhal9,
            object.Zprdhal10,
            object.LstPrcEftvDt,
            object.LstPrcEftvEndDt,
            object.PromPrcGrp,
            object.CreatedUserId,
            object.CreatedDatetime,
            object.LastUpdatedUserId,
            object.LastUpdatedDatetime,
            object.Guid
        ]
        return result
        }
    )

    console.log("Step #7 - Mapeo Listo EPH");

    //const statement = await db.preparePromisified("TRUNCATE TABLE NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING");
    //const statement = await db.preparePromisified("SELECT TOP 1 * FROM NA_CUSTOM.AMZN_VENDORCENTRAL_KC_ECOM_DLY_SALES_DIAGNOSTIC_CA_TMP");
    //const statement = await db.preparePromisified("SELECT * FROM NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING");
    //const aja = await db.statementExecPromisified(statement, []);
    
    const statement = await db.preparePromisified(`Insert into NA_CUSTOM.SLM_SAP_EPH_KC_TMV_WKLY_PRICING
    (
        ZPRDHAL6, 
        ZPRDHAL7, 
        ZPRDHAL8,
        ZPRDHAL9, 
        ZPRDHAL10, 
        LAST_PRICE_EFFECTIVE_DATE,    
        LAST_PRICE_EFFECTIVE_END_DATE, 
        PROM_PRICE_GRP,
        CREATED_USER_ID, 
        CREATED_DATETIME, 
        LAST_UPDATED_USER_ID,
        LAST_UPDATED_DATETIME, 
        GUID
    ) 
    VALUES
    (
        ?, 
        ?,  
        ?, 
        ?,  
        ?,  
        ?,    
        ?,  
        ?, 
        ?, 
        ?, 
        ?, 
        ?,
        ? 
    )`
    );

    await db.statementExecPromisified(statement,results);


}


//3
const getHanaPPGTable  = async (dbReq) =>{

    try {
        
        let db = new dbClass(dbReq);

        const statement = await db.preparePromisified("SELECT * FROM NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING");
        const results = await db.statementExecPromisified(statement, []);


        return results
        
    } catch (error) {

        console.log(error);
        return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)

    }

}


//
const getHanaEPHTable = async (dbReq) =>{

    try {
        
        let db = new dbClass(dbReq);

        const statement = await db.preparePromisified("SELECT * FROM NA_CUSTOM.SLM_SAP_EPH_KC_TMV_WKLY_PRICING");
        const results = await db.statementExecPromisified(statement, []);


        return results
        
    } catch (error) {

        console.log(error);
        return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)

    }

}

/////////////////////////////////////////////////////////////
// Exports

module.exports={
    TruncatedHanaDB,
    TruncatedHanaDbEPH,
    insertHanaDB,
    insertHanaDbEPH,
    getHanaPPGTable,
    getHanaEPHTable
}




/*

    const statement = await db.preparePromisified(`Insert into NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING (
    PROM_PRC_GRP, 
    PRC_TYP,
    COUNTRY, 
    UOM, 
    LAST_PRICE_EFFECTIVE_DATE, 
    LAST_PRICE_EFFECTIVE_END_DATE, 
    VALUE, 
    CURRENCY,
    CREATED_USER_ID,
    CREATED_DATETIME, 
    LAST_UPDATED_USER_ID, 
    LAST_UPDATED_DATETIME, 
    GUID
    ) values 
    (?, ?, ?, ? , ?, ?, ?, ?, ?, ? , ?, ?, ?`);

    let aja = await db.statementExecPromisified(statement, [
        "DEPEND-EPACK-SILHOUETTE FOR WOMEN L/XL",
        "LAC",
        "US",
        "ZPU",
        "2020-02-04T00:00:00",
        "2099-12-31T00:00:00",
        45.49,
        "USD",
        "Andy Boivin",
        "2020-02-10T00:00:00",
        "Andy Boivin",
        "2020-02-10T00:00:00",
        75
    ]);

    */



/*


 
        const result = [{
            "PROM_PRC_GRP": object.PromPrcGrp,
            "PRC_TYP": object.PrcTyp,
            "COUNTRY": object.Country,
            "UOM": object.Uom,
            "LAST_PRICE_EFFECTIVE_DATE": object.LstPrcEftvDt,
            "LAST_PRICE_EFFECTIVE_END_DATE": object.LstPrcEftvEndDt,
            "VALUE": object.Value,
            "CURRENCY": object.Currency,
            "CREATED_USER_ID": object.CreatedUserId,
            "CREATED_DATETIME" : object.CreatedDatetime,
            "LAST_UPDATED_USER_ID" : object.LastUpdatedUserId,
            "LAST_UPDATED_DATETIME" : object.LastUpdatedDatetime,
            "GUID" : object.Guid,
            //"ProductYear" : object.LstPrcEftvDt
            }]
        

*/



/*

Insert Individual

const statement = await db.preparePromisified(`INSERT INTO NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING 
    (
    PROM_PRC_GRP, 
    PRC_TYP,
    COUNTRY
    ) 
    VALUES
    ('DEPEND-EPACK-SILHOUETTE FOR WOMEN L/XL', 'LAC', 'US');`);

    let aja = await db.statementExecPromisified(statement, [])



*/




/*
    const statement = await db.preparePromisified(`INSERT INTO NA_CUSTOM.SLM_SAP_KC_TMV_WKLY_PRICING 
    (
    PROM_PRC_GRP, 
    PRC_TYP,
    COUNTRY
    ) 
    VALUES
    (?,?,?);`);

    let aja = await db.statementExecPromisified(statement, ['DEPEND-EPACK-SILHOUETTE FOR WOMEN L/XL', 'LAC', 'US'])

    console.log(aja);
    */





    /*

    Funciono BB

    let aja = await db.statementExecPromisified(statement,  [[
        'KLEENEX FT-OTG-POCKET PACK 3PK',
        'LAC',
        'US',
        'ZPU',
        '2020-02-04T00:00:00',
        '2099-12-31T00:00:00',
        0.52,
        'USD',
        'Andy Boivin',
        '2020-02-10T00:00:00',
        'Andy Boivin',
        '2020-02-10T00:00:00',
        545
      ],
      [
        'KLEENEX FT-OTG-POCKET PACK 6PK',
        'LAC',
        'US',
        'ZPU',
        '2020-02-04T00:00:00',
        '2099-12-31T00:00:00',
        1.06,
        'USD',
        'Andy Boivin',
        '2020-02-10T00:00:00',
        'Andy Boivin',
        '2020-02-10T00:00:00',
        550
      ]
      ]
    )

    */