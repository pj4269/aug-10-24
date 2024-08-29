import json
from PIL import Image
#import tflite_runtime.interpreter as tflite
#import pandas as pd


'''  Aug 20, 24: 
import base64

def lambda_handler(event, context):
    # Assuming body contains base64-encoded data
    photo_base64 = event.get('body', '')
    
    # Decode if necessary
    try:
        photo_bytes = base64.b64decode(photo_base64)
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'image/jpeg'},  # Adjust content type as needed
            'body': photo_bytes,
            'isBase64Encoded': True
        }
    except Exception as e:
        return {
            'statusCode': 400,
            'body': str(e)
        }


'''     
   
def handler(event, context):


  #print('received event: ', event)
  image = Image.new('RGB', (100, 100), color = 'red')
  print ("Pillow image - Aug 29, 24 - 1:55 pm : ", type(image)  )
  get_raw_path    = ''
  create_raw_path = '/postP'
  #target_resource = '/picture/{pictureId}'
  target_resource = '/test'  
  time = "Aug 08: 3 pm"
  message = {"f_name":"AAAAAAA", "l_name":"BBBBBBBBBB"}
  print ("Konichiwa there: ", event)
  data_back = event['body']
  print ("Hi", data_back )
  print ( "Using Python 3.10" )

  '''          
          
  if event['resource'] == target_resource:

    # Extract the pictureId from the path parameters
    picture_id = event['pathParameters']['pictureId']
    
    # Convert the picture_id to an integer
    picture_id_int = int(picture_id)
    
    # Add 100 to the integer
    result = str(picture_id_int + 100 )
    
  
    print ('Hi from your new Amplify Python lambda: ' + time + "-"  + result)  
    
    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',


          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'  },  'body': json.dumps('Hello from your new Amplify Python lambda- Aug 8, 24 - 9:51 am: '  + result) }
  else: 
    print ("ELSE:::::::::")
    
    #body = json.loads(event['body'])  # Here I'm getting an error

    picture_id = event['pathParameters']['pictureId']
    
    # Convert the picture_id to an integer
    picture_id_int = int(picture_id)
    
    # Add 100 to the integer
    result = str(picture_id_int + 100 )    
    # return {"f_name_received": f_name}
    print ('New Number Amplify Python lambda: ' + time + "-"  + result)      
    #worked
    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET' }, 'body': json.dumps(result)
          }
  '''
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET' }, 'body': json.dumps(event )
          }        
    
          

            
