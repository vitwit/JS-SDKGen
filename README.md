# vGen

vGen is API SDK generator, based on json file generated for api docs by Swagger or Goland or optionally your own json file with any shape with transform function. It can run in both browser(a tool can be made) and node.

```
//index.js
const generateSDK = require('vGen');
const docsJsonFile = require('./somepath');
generateSDK(options)
```

you can provide following options

| key                                                                     | value                                                                                                                    |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `jsonFile`                                                              | a json file                                                                                                              |
| `isGoGenerated`                                                         | boolean                                                                                                                  |
| `isSwaggerGenerated`                                                    | boolean                                                                                                                  |
| `transformOperations`(next version)                                     | object with each key with operation name which take new version data structure and return old version                    |
| `transformFunction`                                                     | your json file will be called as argument to this function this funtion it should return a array of obj with below keys. |
| operationName                                                           | requestMethod                                                                                                            | url | isFormData |
| --------                                                                | --------                                                                                                                 | -------- | ---------- |
| this will be the method name available through SDK for calling this api | requestMethod                                                                                                            | path, in path placeholder should follow convention of curly braces around that like this -`"/order/{orderId}/org/{orgId}"` |  |

Now calling generateSDK will generate a js file with name apiSDK default exporting a class you can use this file in you fronted directly or publish as a package.

## Using Generated SDK

```
import MySDK from './path-of-file';
import axiosInstance from './path-of-file';

const myApp = new MySDK(axiosInstance);
export { myApp }
```

now any where in your application

```
import myApp from './path-of-file';
async function handleSignIn(name,password){
  const {data,error}= await my.signIn({
   name,
   password
  })
}

async function getUser(){
  const {data,error}= await my.signIn({
    ...otherdata,
   _params:{
   //any query paramater
   },
   _pathParams:{
     userId:'fdkfdslfj' // this key should be same as in path i.e '/users/{userId}'
   }
  })
}
```

###### note: It will handle error for you, so you will not get errors catch block but in response only.

### What's so cool about this?

You don't have to deal with calling API's, managing API constants, handling errors, approriate headers, params,path params etc.
On top of that if can change data structure of response if they want and provide a object `transformOperations` with key as operation which
will take current data structure and provide the previous one for one who opt to use old version.

### What Next

- make it a cli tool
- make a browser tool
- make it generate Reducers for react, handle calling them using action creator internally
- a fixed format of for error obj
