/*
import React, { useState, useEffect, useRef } from 'react';

function Photo_capture_from_scratch() {
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  const [height, setHeight] = useState(0);

  const [IsUploading, setIsUploading] = useState(false);  // take it out
  // new: Jun 29, 24
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [photoSrc, setPhotoSrc] = useState('');

  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
  
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    videoRef.current.srcObject = stream;
    // Apr 13, 24: Play() error:  By adding the oncanplay event listener, you ensure that playback is initiated only after the browser has loaded enough data to 
    // start playing the video. This should resolve the interruption error you're encountering.
    videoRef.current.oncanplay = () => {
       videoRef.current.play();
    };
  })
  .catch(err => console.error("An error occurred: " + err));
  
  }, []);
  
  

  
  // Apr 13, 24: OK this works!
  const handleTakePicture = async () => {
  const context = canvasRef.current.getContext('2d');
  context.drawImage(videoRef.current, 0, 0, 320, height);
  // photoRef = responsible for Screenshot being captured to appear in a box on React frontpage!
  photoRef.current.src = canvasRef.current.toDataURL('image/png');
  // Convert the canvas image to a Blob (binary large object)
  canvasRef.current.toBlob(async (blob) => {
    // Create a File object from the Blob
    const file = new File([blob], "photo_from_react.webp", { type: "image/webp", lastModified: new Date() });
    
    // Call handleSubmit, passing the captured image as a File object
    await handleSubmit(file);
      // webp is sending file much faster than PNG!
  }, 'image/webp', 1); //reducing quality to improve transfer speed
};



  



  // New function to send the picture over API
  const handleSubmit = async (capturedFile) => {
  setIsUploading(true);

  // Jul 31, 24: Sending a test number - works

  try {
    // sending data to Lambda     
    
    // Jul 30th, 24 - sending and adding a test number = 3 and returns 103
    
    const data = "3";   

    const sendData = async () => {
      try {
        const response = await fetch(`https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture/${data}`, 
        //const response = await fetch(`https://ekidbibwk0.execute-api.us-west-2.amazonaws.com/dev/${data}`, 
        {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
          }
        });
    
      //        const result = await response.json();


      const result = await response.json();
      console.log("Aug 08, 24: ", result);
        } catch (error) {
        console.error("Error sending data:", error);
                        }
                                 };
    // Aug 02 - commented out: works 
    sendData();
    
    
    //

    // New: Jun 29, 24 : Receiving Photo from Lambda
    setUploadSuccess(true);
    // Aug 02: commented out
    //const imageSrc = await fetchPhotoFromLambda();
    //console.log("Received Data from Lambda", imageSrc);
    //setPhotoSrc(imageSrc); // Update state with the fetched photo   
    
    
    
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    setIsUploading(false);
  }



  const formData2 = new FormData();
  
  // For caching: 
  const timestamp = Date.now();
  formData2.append("file", capturedFile, `${timestamp}_${capturedFile.name}`);  
  console.log( "Hi ", formData2 )
  const requestOptions = {
    method: "POST",
    body: formData2,
  };

  try {
    // sending data to Lambda
    //const response = await fetch( `https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture`, {    
    const response = await fetch("https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture/", requestOptions);    
    const responseData = await response.json(); // if you expect a JSON response
    console.log( "MyWebCam2  worked just fine!  10:47 am   -   Jun 29, 24")    
    
    // New: Jun 29, 24 : Receiving Photo from Lambda
    setUploadSuccess(true);
    const imageSrc = await fetchPhotoFromLambda();
    console.log("Received Data from Lambda", imageSrc);
    setPhotoSrc(imageSrc); // Update state with the fetched photo   
    
    
    
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    setIsUploading(false);
  }
};



  const handleDownload = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'webcam_photo.png';
    link.click();
  };

  const handleLogConsole = () => {
    console.log(typeof videoRef.current); 
  };

  const handleClearPhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    photoRef.current.src = '';
  };

// Handles Video Streaming!
  const handleCanPlay = () => {
    if (!streaming) {
      const height = videoRef.current.videoHeight / (videoRef.current.videoWidth / 320);
      //new
      setHeight(height);
      
      videoRef.current.setAttribute('width', 320);
      videoRef.current.setAttribute('height', height);
      canvasRef.current.setAttribute('width', 320);
      canvasRef.current.setAttribute('height', height);
      setStreaming(true);
    }
  };
// Make sure Video plays without error
const handleCanPlayThrough = () => {
  videoRef.current.play()
    .then(() => {
      console.log('Video playback started successfully'); 
    })
    .catch(error => {
      console.error('Error playing video:', error); 
    });
};


// new : Jun 29, 24

    const fetchPhotoFromLambda = async () => {
        try {
            const response = await fetch("https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture/");
            if (!response.ok) {
                throw new Error('Not getting anything from the backend!');
            }
            //const data = await response.json();
            //const base64Photo = data;
            //return `data:image/jpeg;base64,${base64Photo}`;
            const blob = await response.blob();
            
            const url = URL.createObjectURL(blob);
            
            console.log("hi there: ", url)
            const link = document.createElement('a');
            link.href = url;
            link.download = 'downloaded_photo';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
            
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error fetching photo:', error);
            throw error; // Propagate the error to handle it in the caller function
        }
    };




  return (
    <div className="contentarea">
      <h1>Photo Capturing using React</h1>
      <div className="camera">
        <video ref={videoRef} id="video" onCanPlayThrough={handleCanPlay} >//  onCanPlay={handleCanPlayThrough} >
        
          Video stream not available.
        </video>
        

    <div>  sending a pic from fastApi. This photo needs to be processed!  => 
      {imageUrl ? (
        <img src={imageUrl} alt="Image from FastAPI" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>         
      </div>
      
             <div>  Jun 29, 24: 
            <input type="file" onChange={(e) => handleSubmit(e.target.files[0])} />
            {uploadSuccess && (
                <div>
                    <p>Upload successful!</p>
                    {photoSrc && <img src={photoSrc} alt="Uploaded" style={{ maxWidth: '100%' }} />}
                </div>
            )}
        </div>
      
      
      <div>
        <button onClick={handleTakePicture}>Take photo</button>
        <button onClick={handleDownload}>Download</button>
      </div>
      <canvas ref={canvasRef} id="canvas" style={{ display: 'none' }} /> 
      <div className="output">
        <img ref={photoRef} id="photo" alt="The screen capture will appear in this box." />
      </div>
      <button onClick={handleClearPhoto}>Clear Photo</button>
      <button onClick={handleLogConsole}>View Console</button>
    </div>
  );
}


export default Photo_capture_from_scratch;
*/

import React, { useState, useEffect, useRef } from 'react';

function Photo_capture_from_scratch() {
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  const [height, setHeight] = useState(0);

  const [IsUploading, setIsUploading] = useState(false);  // take it out
  // new: Jun 29, 24
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [photoSrc, setPhotoSrc] = useState('');

  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
  
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    videoRef.current.srcObject = stream;
    // Apr 13, 24: Play() error:  By adding the oncanplay event listener, you ensure that playback is initiated only after the browser has loaded enough data to 
    // start playing the video. This should resolve the interruption error you're encountering.
    videoRef.current.oncanplay = () => {
       videoRef.current.play();
    };
  })
  .catch(err => console.error("An error occurred: " + err));
  
  }, []);
  
  

  
  // Apr 13, 24: OK this works!
  const handleTakePicture = async () => {
  const context = canvasRef.current.getContext('2d');
  context.drawImage(videoRef.current, 0, 0, 320, height);
  // photoRef = responsible for Screenshot being captured to appear in a box on React frontpage!
  photoRef.current.src = canvasRef.current.toDataURL('image/png');
  // Convert the canvas image to a Blob (binary large object)
  canvasRef.current.toBlob(async (blob) => {
    // Create a File object from the Blob
    const file = new File([blob], "photo_from_react.webp", { type: "image/webp", lastModified: new Date() });
    console.log(file)
    // Call handleSubmit, passing the captured image as a File object
    await handleSubmit(file);
      // webp is sending file much faster than PNG!
  }, 'image/webp', 1); //reducing quality to improve transfer speed
};



  



  // New function to send the picture over API
  const handleSubmit = async (capturedFile) => {
  setIsUploading(true);

  const formData2 = new FormData();
  
  // For caching: 
  const timestamp = Date.now();
  formData2.append("file", capturedFile, `${timestamp}_${capturedFile.name}`);  
  //console.log( "Hi ", formData2 )
  const requestOptions = {
    method: "POST",
    body: formData2
  };
  
  // Aug 02, 24: sending a photo
  // Aug 16, 24: error message:   I might have to remove:  
  /*
  {
    "message": "Could not parse request body into json: Could not parse payload into json: Unexpected character (\'-\' (code 45)) in numeric value: 
    expected digit (0-9) to follow minus sign, for valid numeric value\n at [Source: (byte[])\"------WebKitFormBoundaryukoQcjzfKv46mYCG\r\nContent-Disposition: 
    form-data; name=\"file\"; filename=\"1723831132883_photo_from_react.webp\"\r\nContent-Type:
     image\/webp\r\n\r\nRIFFrp\u0001\u0000WEBPVP8X\n\u0000\u0000\u0000 \u0000\u0000\u0000?\u0001\u0000\uFFFD\u0000\u0000ICCP\uFFFD\u0001\u0000\u0000\u0000\
     u0000\u0001\uFFFD\u0000\u0000\u0000\u0000\u00040\u0000\u0000mntrRGB XYZ \u0007\uFFFD\u0000\u0001\u0000\u0001\u0000\u0000\u0000\u0000\u0000\u0000acsp\u0000

     [truncated 169444 bytes]; line: 1, column: 3]"
}
  */
  
  //try {
                     // This works - Aug 19, 24
                     /*
    const response = await fetch('https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture2/', requestOptions); 
    const result = await response.json();
    console.log("Response from server2:", result); 
    */
    // new: 
    const userId = '12345'; // replace with your actual test user_id
    const url = `https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture/${userId}`;

    try {
							const response = await fetch(url, requestOptions);
							const data = await response.json(); // or response.text(), depending on your response type
							console.log(data); // handle the response data
						} catch (error) {
							console.error('Error:', error);
						}

        //const response = await fetch(`https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture/${data}`);
        /*
        const response = await fetch(`https://ekidbibwk0.execute-api.us-west-2.amazonaws.com/dev/${data}`, 
        {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
          }
        }); */ 
          
   

    /*
    const response = await fetch( 'https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture/', {
      method: 'POST',
      body: formData2,
      headers: {
      "Access-Control-Allow-Origin": "*"
      }
      // Don't set Content-Type header, let the browser set it with the correct boundary for FormData
    });  */

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    //const result = await response.json();
    //console.log("Response from server:", result);    
    setIsUploading(false);
    //  } 
    //catch (error) {
    //console.error("Error sending data:", error);
    //setIsUploading(false);
    // Handle error here (e.g., show error message to user)
    //             }
    

  // Jul 31, 24: Sending a test number - works

  try {
    // sending data to Lambda     
    
    // Jul 30th, 24 - sending and adding a test number = 3 and returns 103
    
    const data = "3";   

    const sendData = async () => {
      try {
        const response = await fetch(`https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture/${data}/requestOptions`, 
        //const response = await fetch(`https://ekidbibwk0.execute-api.us-west-2.amazonaws.com/dev/${data}`, 
        {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
          }
        });
    
      //        const result = await response.json();


      const result = await response.json();
      console.log("Aug 08, 24: ", result);
        } catch (error) {
        console.error("Error sending data:", error);
                        }
                                 };
    // Aug 02 - commented out: works 
    sendData();
    
    
    //

    // New: Jun 29, 24 : Receiving Photo from Lambda
    setUploadSuccess(true);
    // Aug 02: commented out
    //const imageSrc = await fetchPhotoFromLambda();
    //console.log("Received Data from Lambda", imageSrc);
    //setPhotoSrc(imageSrc); // Update state with the fetched photo   
    
    
    
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    setIsUploading(false);
  }
};



  const handleDownload = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'webcam_photo.png';
    link.click();
  };

  const handleLogConsole = () => {
    console.log(typeof videoRef.current); 
  };

  const handleClearPhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    photoRef.current.src = '';
  };

// Handles Video Streaming!
  const handleCanPlay = () => {
    if (!streaming) {
      const height = videoRef.current.videoHeight / (videoRef.current.videoWidth / 320);
      //new
      setHeight(height);
      
      videoRef.current.setAttribute('width', 320);
      videoRef.current.setAttribute('height', height);
      canvasRef.current.setAttribute('width', 320);
      canvasRef.current.setAttribute('height', height);
      setStreaming(true);
    }
  };
// Make sure Video plays without error
const handleCanPlayThrough = () => {
  videoRef.current.play()
    .then(() => {
      console.log('Video playback started successfully'); 
    })
    .catch(error => {
      console.error('Error playing video:', error); 
    });
};


// new : Jun 29, 24

    const fetchPhotoFromLambda = async () => {
        try {
            const response = await fetch ("https://300fh0i2f6.execute-api.us-west-2.amazonaws.com/dev/picture/");
            //const response = await fetch("https://ekidbibwk0.execute-api.us-west-2.amazonaws.com/dev");
            
            if (!response.ok) {
                throw new Error('Not getting anything from the backend!');
            }
            //const data = await response.json();
            //const base64Photo = data;
            //return `data:image/jpeg;base64,${base64Photo}`;
            const blob = await response.blob();
            
            const url = URL.createObjectURL(blob);
            
            console.log("hi there: ", url)
            const link = document.createElement('a');
            link.href = url;
            link.download = 'downloaded_photo';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
            
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error fetching photo:', error);
            throw error; // Propagate the error to handle it in the caller function
        }
    };




  return (
    <div className="contentarea">
      <h1>Photo Capturing using React</h1>
      <div className="camera">
        <video ref={videoRef} id="video" onCanPlayThrough={handleCanPlay} >//  onCanPlay={handleCanPlayThrough} >
        
          Video stream not available.
        </video>
        

    <div>  sending a pic from fastApi. This photo needs to be processed!  => 
      {imageUrl ? (
        <img src={imageUrl} alt="Image from FastAPI" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>         
      </div>
      
             <div>  Jun 29, 24: 
            <input type="file" onChange={(e) => handleSubmit(e.target.files[0])} />
            {uploadSuccess && (
                <div>
                    <p>Upload successful!</p>
                    {photoSrc && <img src={photoSrc} alt="Uploaded" style={{ maxWidth: '100%' }} />}
                </div>
            )}
        </div>
      
      
      <div>
        <button onClick={handleTakePicture}>Take photo</button>
        <button onClick={handleDownload}>Download</button>
      </div>
      <canvas ref={canvasRef} id="canvas" style={{ display: 'none' }} /> 
      <div className="output">
        <img ref={photoRef} id="photo" alt="The screen capture will appear in this box." />
      </div>
      <button onClick={handleClearPhoto}>Clear Photo</button>
      <button onClick={handleLogConsole}>View Console</button>
    </div>
  );
}

export default Photo_capture_from_scratch;

