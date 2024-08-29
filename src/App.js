import './App.css';
import { get } from 'aws-amplify/api';
import { useState } from 'react'
import { Amplify } from "aws-amplify";

//import WebCam from './components/MyWebCam';
import Photo_capture_from_scratch from  './components/MyWebCam2';
//import UploadPicture from './components/UploadPic'
//import UploadPicture2 from './components/UploadPic2'
//import PhotoDisplay from './components/PhotoFromLambda'

//import Photo_capture_from_scratch2 from  './components/MyWebCam3';



const myAPI = "ApiAug10"
//const myAPI = "ApiAug08" // aug_08_24/test
 
const path = "/picture"; // .. /{pictureId}
//const path = "/picture2"
//const myEndpoint = "https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev" //  "https://0kl0o417d5.execute-api.us-west-2.amazonaws.com/dev",

// testing a new functions:

const myEndpoint = "https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/Aug2924Test" 

const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_cloud_logic_custom": [
        {
            "name": myAPI,
            "endpoint": myEndpoint,
            "region": "us-west-2"
        }
    ]
}; 
/*
const awsmobile = {
    "aws_project_region": "us-west-1",
    "aws_cloud_logic_custom": [
        {
            "name": "ApiAug08",
            "endpoint": "https://ekidbibwk0.execute-api.us-west-2.amazonaws.com/dev",
            "region": "us-west-1"
        }
    ]
};  */ 



Amplify.configure(awsmobile);

const App = () => {
  const [input, setInput] = useState("")
  const [customers, setCustomers] = useState([])

  async function getCustomer(e) {
    let customerId = e.input
    const restOperation = get({apiName: myAPI, path: path + "/" + customerId})
    const { body } = await restOperation.response;
    const response = await body.json();
    console.log(response)
    let newCustomers = [...customers]
    newCustomers.push(response)
    setCustomers(newCustomers)
  }
  
  

  return (
    
    <div className="App">         
     
      <Photo_capture_from_scratch />
       
      <div>
          <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getCustomer({input})}>Get Customer From Backend</button>

      <h2 style={{visibility: customers.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
       customers.map((thisCustomer, index) => {
         return (
        <div key={thisCustomer.customerId}>
          <span><b>CustomerId:</b> {thisCustomer.customerId} - <b>CustomerName</b>: {thisCustomer.customerName}</span>
        </div>)
       })
      }
      
   
      
    </div>
  )
}

export default App;


