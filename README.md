# JS-SDKGen

JS-SDKGen is JavaScript API SDK Code generator, based on json file generated for api docs by Swagger or Goland or optionally your own json file with any shape with transform function. It just requires a apidoc definition (swagger/godac style supported now) and it generates the JavaScript SDK for you. Thus eliminate the work of writing your own SDK. It can run in both browser(a tool can be made) and node.

clone the repo

```sh
npm install -g js-sdkgen
js-sdkgen --json-file=api-docs.json name=MySDK --version=1.0.0 base-url=http://vitwit.com/api --requiredHeaders accoundId,key --optionalHeaders name
```

Below are parameter available for node cli while generating SDK.

| param               | use                                                                                          | optional or required                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `--json-file`       | path of json                                                                                 | required (if not provided will look for 'api-docs.json' file in current directory)                               |
| `--js-file`         | path of a js file which named exports two function `transformJson` and `transformOperations` | not required if json is already in below mentioned format or no operation's response data need to be transformed |  |
| `--base-url`        | base url of your app, will be passed axios instance                                          | required                                                                                                         |
| `--name`            | it will be name of generated sdk class                                                       | optional                                                                                                         |
| `--version`         | version of sdk                                                                               | optional                                                                                                         |
| `--requiredHeaders` | requirdHeaders params will berequired to pass when initiate the sdk class on frontend        |
| `--optionalHeaders` |                                                                                              |

any other parameter passed will be added to configs.headers which will be passed to axios instance. All the headers will be used as default headers for every request.

```js //usage
const mySDK = new MySDK({
  MandatoryHeader1: "Header1Value",
  MandatoryHeader2: "Header2Value"
});
```

### Mandatory Headers & Optional Headers?

This is a tricky part in the SDK generation. As we are automating the SDK generation, we need to understand, what are all the headers we need for our APIs. For example, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY are the required configuration credentials to use AWS SDKs. In the same way, if your SDK needs any credentials that need to be sent for every API request, you need to mention them as mandatory headers in headers configuration.

Optional Headers, as name suggest, they are optional or required only for certain APIs. SDK will send those headers only after they are set. For example, if API requires, Authorization token for some APIs and not for all other APIs, it can be set as optional header. There are two functions to set & clear these Optional Headers. Optional headers are useful when we need to deal with login/logout kind of scenarios. Few methods from SDK's can be used optionally and when user logged into the system, SDK should send authorization tokens from then. For this kind of cases, you can make use of OptionalHeaders and `set` & `clear` functions.

```js
//to set the headers
mySDK.setHeader("OptionalHeader1", "OptionalHeaderValue");

//to clear the headers
mySDK.clearHeader("OptionalHeader1");

//to check if the header is present or not
mySDK.getHeader("Header1");
```

Example cli parameters to set MandatoryHeader1, MandatoryHeader2 as required headers, you just need to keep `true` after the header name. If the variable is set to `false` or left blank, it will be considered as Optional Header by the program.

```sh
js-sdkgen --json-file api-docs.json --name=MySDK --version=1.0.0 --base-url=http://vitwit.com/api  --requiredHeaders a,b,c --optionalHeaders d,e,f
```

these configs can overridden or more configs can be passed from frontend before intiating the class as below.

```js
//To set header parameters, ex: Authorization with Bearer token
mySDK.setHeader("Authorization", "Bearer <yourtokenhere>");

//override existing config, i.e., baseUrl
mySDK.setBaseUrl("http://api.vitwit.com/v2");

// you can also get any header value set by you calling getHeader
mySDK.getHeader("Authorization");
```

The json file mentioned above should have following data structure.(make sure you write `operationId` in your node backend inline comments for swagger generated API docs)

```json
[
  {
    "operationName": "createUser",
    "requestMethod": "POST",
    "url": "/users/create",
    "isFormData": "true"
  },
  {
    "operationName": "updateUser",
    "requestMethod": "PUT",
    "url": "/users/{userId}",
    "isFormData": "true"
  }
]
```

If not, you should provide a JavaScript file which will be called with provided json file,
it should return that file in above format.
This JavaScript file can name export these two function.

| function name        | use                                                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transformJson`      | as mention above it will be called with given json file                                                                                                                                |
|                      | will be passed the data coming from backend,                                                                                                                                           |  |
| `transformOperatons` | it should be a object with operationName as methods whichshould returned the desired format(might be helpful when backend might change format but frontend still consuming old format) |

## Using Generated SDK

any where in your application you can call sdk methods like this, provide it body data obj while calling, you can pass formdata same as this and it will internally will do `(new FormData).append(key,value)` wherever needed.

```js
import mySDK from "./path-of-file";
async function handleSignIn(name, password) {
  const { data, error } = await mySDK.signIn({
    name,
    password
  });
}
```

To pass path params and query params you have `_params` and `-pathParams` that you can pass in same object. They are automatically extracted from other body params. `_pathParams` keys are placeholders in api path i.e for path `orgs/{orgId}/users/{userId}` `orgId` and `userId` are `_pathParams`.

###### note: In your json file of api docs path should follow this same structure for placeholder all others like /orgs/:orgId or orgs/ORGID/ will result in silent errors.

```js
async function getUser() {
  const { data, error } = await my.signIn({
    ...otherdata,
    _params: {
      //any query paramater
    },
    _pathParams: {
      userId: "5ef23df923a3453edfa9ed35fe" // this key should be same as in path i.e '/users/{userId}'
    }
  });
}
```

###### note: It will handle error for you, so you will not get errors in catch block but in response only.

### What's so cool about this?

You don't have to deal with calling API's, managing API constants, handling errors, approriate headers, params,path params etc.
On top of that if backend change data structure of response, they can provide a object `transformOperations` with key as operationName functions which
will take current data structure and provide the previous version for one who opt to use old version.

### What Next

- make a browser tool
- make it generate Reducers for react, handle calling them using action creator internally
