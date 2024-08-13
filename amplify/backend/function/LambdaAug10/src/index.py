import json


     
   
def handler(event, context):
  print('received event: ', event)
  get_raw_path    = ''
  create_raw_path = '/postP'
  #target_resource = '/picture/{pictureId}'
  target_resource = '/test'  
  time = "Aug 08: 3 pm"
  message = {"f_name":"AAAAAAA", "l_name":"BBBBBBBBBB"}
  print (event)
  '''
  if event['path'] == get_raw_path:
    # call database
    pid = event['queryStringParameters']['p_id']
    print ("Using GEEEEEEEETTTTT")
    print ("received number: ", pid, type(pid), int(pid)+5)
    print ('Hello from your new Amplify Python lambda GET !' + time)
    #return { "aaaaaaaaaaaaaaaaa": "bbbbbbbbb"  }
    #message = {"f_name":"AAAAAAA", "l_name":"BBBBBBBBBB"}
    # not worked:
    #return {"f_name":"AAAAAAA", "l_name":"BBBBBBBBBB"} 
    # worked
    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET' }, 'body': json.dumps( message )#'Hello from your new Amplify Python lambda GET !' + time)
          }
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
    f_name = "George"#body['f_name']
    l_name = "Posttter"#body['l_name']
    print ("received names:  ",  f_name, l_name)
    print ('Hello from your new Amplify Python lambda- POST!'  + f_name + l_name)
    picture_id = event['pathParameters']['pictureId']
    
    # Convert the picture_id to an integer
    picture_id_int = int(picture_id)
    
    # Add 100 to the integer
    result = str(picture_id_int + 100 )    
    # return {"f_name_received": f_name}
    print ('Hi from your new Amplify Python lambda: ' + time + "-"  + result)      
    #worked
    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET' }, 'body': json.dumps(result)
          }
    
          

            
