/////////////////////////////////////////////////////////////
// Imports & Requeriments


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const https = require('https');
const myHeaders = new Headers();
const { config } = require('dotenv');


/////////////////////////////////////////////////////////////
// Functions 

const RequestEPH = async () => {

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

    const response = await fetch(process.env.MICROCALL_CERTIFICATE_HOST_EPH, requestOptions)
      .then(response => response.json())
      .then(result => result)
      //.catch(error => console.log('Error Fetch', error));

    console.log("Step #6 - Request Hecho a EPH");

      return response
    
  } catch (error) {
      console.log('Error Catch', error)
      return error
  }

}


/////////////////////////////////////////////////////////////
// Exports


module.exports={
  RequestEPH
}


