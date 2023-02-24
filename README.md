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
  
#### Manual Firebase deployment  
>> - add the following to the package.json file:
>> - "buildDeploy": "npm build && firebase deploy --only hosting"
>> - run the command: npm buildDeploy
