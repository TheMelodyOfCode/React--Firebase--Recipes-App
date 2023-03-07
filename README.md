# Recepies App

### Description
> This is mainly a Firebase project about:  
> - Firebase Web App Hosting  
> - Firebase Firestore  
> - Firebase Storage  
> - Firebase Functions  

#### React APP
> Run the app from the client folder - npm start  
> Runs on localhost:3000  

#### VPN - Proxy (possible error)
> In case you get the following Error:  
 - Invalid options object. 
 - Dev Server has been initialized using an options object that does not match the API schema.    
 - options.allowedHosts[0] should be a non-empty string.  
> make sure to turn off proxy or vpn if you have one


#### Dependencies to install
##### Node Version v18.14.0
##### NPM version: 9.4.1

> Sass  
> - npm i sass  

> React Error Boundary    
> - npm i react-error-boundary  
> React Router DOM 
>> npm i react-router-dom 
> React Icons
>> npm install react-icons --save

> @emotion/css / @emotion/styled
> The css function accepts styles as a template literal, object, or array of objects and returns a class name. It is the foundation of emotion.  
> - npm i @emotion/css  
> - npm i @emotion/styled  

> Firebase
> - npm install firebase  

#### Firebase Tools  
> Firebase Tools  
> - npm i firebase-tools 
>> type ***firebase --help*** to see if it works 
>> In case of error ***you might need to Set-ExecutionPolicy***  
>> - Set-ExecutionPolicy Bypass -scope Process -Force  
>> - firebase login  
#### Firebase Tools Setup ***after login you can set up a variety of things***     
>> - ***Hosting***     
>> - firebase init  
>> - Hosting: Configure and deploy Firebase Hosting sites 
>> - choose a project or create one 
>> - go to the process and choose build insted of public for REACT  
>> - ***run this command to generate the production build of your REACT app:***  
>> - npm run build  
>> - ***To deploy the app run this command.***  
>> - firebase deploy  
>> - Hosting URL: https://recepies-64384.web.app  
  
#### Automatic Firebase deployment through Github Actions   
>> - ***Github Action Deploy***     
>> - firebase init  
>> - go to the process and choose the following  
>> - Hosting with Gitub Action Deploy  
>> - N - run build script before every deploy
>> - automtic deploy on push to main branch  
>> - choose repository to deploy from *username/repo-name*  
>> - N - don't run a buils script beforehand  
>> - automatic deploy when PR is merged to main branch
>> - ***In the github folder* are 2 files now**  
>> - ***.github/workflows/firebase-hosting-merge.yml***
>> - ***.github/workflows/firebase-hosting-pull-request.yml***
>> - insert in bothe files under steps:
      - run: npm install
      - run: npm run build
>> - push everything to your repo and check the actions tab in github  
  
>> - ***Add secrets to actions***  
>> - go to the repo settings  
>> - go to secrets  
>> - add the firebase configuration:  
>> - enter the variables form the env. file under github workflow in both .yml files  
>> - put under runs-on: ubuntu-latest the follwoing example
      - env:  
            FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}  
            FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}  
            FIREBASE_PROJECT_NUMBER: ${{ secrets.FIREBASE_PROJECT_NUMBER }}  
            FIREBASE_CLIENT_EMAIL: ${{ secrets.FIREBASE_CLIENT_EMAIL }}  
            FIREBASE_CLIENT_ID: ${{ secrets.FIREBASE_CLIENT_ID }}  
            FIREBASE_AUTH_URI: ${{ secrets.FIREBASE_AUTH_URI }}  
            FIREBASE_TOKEN_URI: ${{ secrets.FIREBASE_TOKEN_URI }}  
            FIREBASE_AUTH_PROVIDER_X509_CERT_URL: ${{ secrets.FIREBASE_AUTH_PROVIDER_X509_CERT_URL }}  
            FIREBASE_CLIENT_X509_CERT_URL: ${{ secrets.FIREBASE_CLIENT_X509_CERT_URL }}  
  
#### Manual Firebase deployment  
>> - add the following to the package.json file:  
>> - "buildDeploy": "npm build && firebase deploy --only hosting"  
>> - run the command: npm run buildDeploy  


#### Firestore Security Rules  
>> - Authorization  
      *Annyone authenticated or not can read*     
      - allow read: if true;  
      *Only authenticated users can create, update, delete*    
      - allow create, update, delete: if request.auth != null;  
>> -  Sanitization  (only very specific fields can be used and no additional fields)
>> -  Data Validation (the allowed fiels have to be of a specific type or range)  
-  Example:  
  
rules_version = '2';  
service cloud.firestore {  
  match /databases/{database}/documents {  
    match /{document=**} {  
// sanitization of requests  
     function recipeHasOnlyAllowedFields(){  
      let requiredFields = ['category', 'directions', 'ingredients', 'isPublished', 'name', 'publishDate'];  
      let keys = request.resource.data.keys();  
// these ensures that the fields ar on the request and ONLY on the request   
      return keys.hasAll(requiredFields) && keys.hasOnly(requiredFields);  
			}  
// validation of requests  
      function isRecipeValid(){  
      let data = request.resource.data;  
      
      return data.name is string && data.name != '' &&  
      data.category is string && data.category != '' &&  
      data.directions is string && data.directions != '' &&  
      data.isPublished is bool &&  
      data.publishDate is timestamp &&  
      data.ingredients.size() > 0                    
      }
// anyone authenticated or not can read  
      allow read: if true;  
// only authenticated users can doe this     
       allow create, update: if request.auth != null && recipeHasOnlyAllowedFields() && isRecipeValid();  
       
			allow delete: if request.auth != null;  
    }  
  }  
}  

consol.trace('Hello World');