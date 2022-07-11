/////////////////////////////////////////////////////////////
// Imports & Requeriments


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const https = require('https');
const myHeaders = new Headers();
const { config } = require('dotenv');


/////////////////////////////////////////////////////////////
// Functions 

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

    const response = await fetch(process.env.MICROCALL_CERTIFICATE_HOST_PPG, requestOptions)
      .then(response => response.json())
      .then(result => result)
      //.catch(error => console.log('Error Fetch', error));

    console.log("Step #2 - Request Hecho a PPG");

      return response
    
  } catch (error) {
      console.log('Error Catch', error)
      return error
  }

}


/////////////////////////////////////////////////////////////
// Exports


module.exports={
  RequestPPG
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
*/



