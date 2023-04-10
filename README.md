# Recipes App  
> This is a simple recipes app that allows users to manage and share their favorite recipes.  
 The app is built using React, Sass, and Firebase.  

### Minimal Dependencies  
> The main goal of this project was to create a functional recipes app  
  using only React, Sass, and Firebase, without relying on too many external libraries.  

### Firebase Features  
> My personal opinion is that Firebase is a great tool for  
  building web apps. It provides a lot of useful features  
  to build a functional app without having to write a lot of backend code.  
  The following are some of the Firebase features that are used in this project:   

> **Authentication with Firebase**
> - Login required to access the app
> - Sign up for new users
> - Password reset
> - Email confirmation  

> **Hosting**
> - Firebase Hosting integrated with GitHub Actions to deploy the app automatically when a new commit is pushed to the main branch.  

> **Firebase Storage**
> - User can upload their Recipe Images  

> **Firebase Cloud Functions**
> - Functions are used to remove img from storage when a recipe gets deleted / updated
> - Count recipes by how many are published and how many are there all together.   
> - Use cron job to change recipe status from unpublished to published.  

### General App Features  

> **Recipe Management**  
> - Add, edit, and update recipes
> - Recipe owner can only edit their recipes
> - Unpublished recipes are only visible to the recipe owner

> **OpenAI GPT-3 Recipe Name Generator**  
> - Option to generate a cool recipe name using AI
  
> **Recipe Browsing**  
> - Sort recipes by category
> - Sort recipes by newest to oldest or oldest to newest
> - Pagination to navigate through the list of recipes
> - Load more recipes per page
  
### Getting Started  
> Clone the repository  
> Install the required dependencies 
> - cd recipes-app 
> - npm install
  
> Create a .env file in the root directory of the project  
  and add your Firebase configuration details: 
   
> - REACT_APP_API_KEY="your_firebase_api_key"
> - REACT_APP_AUTH_DOMAIN="your_firebase_auth_domain"
> - REACT_APP_PROJECT_ID="your_firebase_project_id"
> - REACT_APP_STORAGE_BUCKET="your_firebase_storage_bucket"
> - REACT_APP_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
> - REACT_APP_APP_ID="your_firebase_app_id"
> - REACT_APP_MEASUREMENT_ID="your_firebase_measurement_id"
> - REACT_APP_OPENAI_API_KEY="your_openai_api_key"
  
> Run the development server:  
> - npm start
  
> Open your browser and navigate to   
> - http://localhost:3000 to view the app.

### Deployment
> The app is temporarily hosted on https://themelodyofcode.com/

### Contributing  
> Feel free to submit pull requests or create issues   
  if you find any bugs or have suggestions for improvements.

### Credits
> This project was influenced by
> - https://github.com/JaredPotter
> - I have used some of his code as a reference. But I have also added my own features and made many changes to the code since his original version is more then 3 years old and some of the code is deprecated. Nevertheless, I would like to thank him for his work and inspiration.  