/////////////////////////////////////////////////////////////
// Imports & Requeriments

const { RequestPPG } = require("../database/Microservice_PPG");
const {RequestEPH}= require("../database/Microservice_EPH");
const { TruncatedHanaDB, insertHanaDB, getHanaPPGTable, getHanaEPHTable, TruncatedHanaDbEPH, insertHanaDbEPH } = require("../database/slmDBFunctions");





/////////////////////////////////////////////////////////////
// Controllers Functions


//1
const postPPG = async (req,res) =>{


    try {

        // PPG Part 
        await TruncatedHanaDB(req.db)
        let results = await  RequestPPG();
        await  insertHanaDB (req.db, results.data)
        console.log("Step #4 - PPG Part Done");

        //EPH Part
        await TruncatedHanaDbEPH(req.db);
        let results2= await RequestEPH();
        await insertHanaDbEPH (req.db, results2.data)
        console.log("Step #8 - EPH Part Done");

        return res.status(200).json({
          "Message": "Process is DONE for PPG & EPH "    
        })

        //return res.status(200).type("application/json").send(results.data);


    } catch (error) {

        return res.status(500).json({"Error en la API: ": error})

    }

}


//2
const getDataPPG = async (req,res) =>{


  try {

      let response = await RequestPPG();
      res.status(200).json(response)


  } catch (error) {

      return res.status(500).json({"Error en la API: ": error})

  }

}

//3
const getDataEPH = async (req,res) =>{


  try {

      let response = await RequestEPH();
        

      res.status(200).json(response)


  } catch (error) {

      return res.status(500).json({"Error en la API: ": error})

  }

}


//
const getDataHanaPPG = async (req,res) =>{


  try {

      let response = await  getHanaPPGTable(req.db);

      res.status(200).json(response)


  } catch (error) {

      return res.status(500).json({"Error en la API: ": error})

  }

}


//
const getDataHanaEPH = async (req,res) =>{


  try {

      let response = await getHanaEPHTable(req.db);
      res.status(200).json(response)


  } catch (error) {

      return res.status(500).json({"Error en la API: ": error})

  }

}





/////////////////////////////////////////////////////////////
// Imports & Requeriments

module.exports = {
  postPPG,
  getDataHanaPPG,
  getDataHanaEPH,
  getDataEPH,
  getDataPPG

}















































/*
const RequestPPG = async () => {

  try {

    config();


    ////////////////////
    // Headers

    myHeaders.append("ClientId", process.env.MICROCALL_CERTIFICATE_CLIENTID);
    myHeaders.append("ClientSecret", process.env.MICROCALL_CERTIFICATE_CLIENTSECRET);
    myHeaders.append("Content-Type", "application/json");

    ////////////////////
    // Chain of my self signed certificate

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    ////////////////////
    // Body

    const raw = JSON.stringify({
      "highLevelGroup": "string",
      "tab": "string",
      "searchKeyword": [
        {
          "fieldName": "",
          "fieldValue": "",
          "OrderbyFieldName": "",
          "OrderbyDesc": true
        }
      ],
      "pagination": {
        "pageNum": 0,
        "perPage": 0,
        "totalPages": 0,
        "totalDataCount": 0
      }
    });

    ////////////////////
    // Request Options

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      agent: httpsAgent
    };

    ////////////////////
    // Fetch

    const response = await fetch(process.env.MICROCALL_CERTIFICATE_HOST, requestOptions)
      .then(response => response.json())
      .then(result => result)
      //.catch(error => console.log('Error Fetch', error));

      return response
    
  } catch (error) {
      console.log('Error Catch', error)
      return error
  }

}



/*
const RequestPPG = async () => {

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
    
    const url = "https://dev1.origin.slmtool-pricingservice.kcc.com/api/SlmAdminPricing/Slm_PPG";

    
    
    const headers = {
        'ClientId': "51909454-16C1-48FE-8FB1-D9BB16BEFDED",
        'ClientSecret': "64C533DC-3730-4352-BAB1-6D964207AC1A",
        'Content-Type': 'application/json'
    }
    
    const body = {
      "highLevelGroup": "string",
      "tab": "string",
      "searchKeyword": [
        {
          "fieldName": "",
          "fieldValue": "",
          "OrderbyFieldName": "",
          "OrderbyDesc": true
        }
      ],
      "pagination": {
        "pageNum": 0,
        "perPage": 0,
        "totalPages": 0,
        "totalDataCount": 0
      }
  }
    
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
        agent: httpsAgent,
      })
      .then(response => response)
      .then(result => result)
      .catch(error => console.log('error', error));
    
    console.log("Step #2 - Request Hecho a PPG");
    console.log(response);

    return response

}




module.exports={
  RequestPPG
}


*/