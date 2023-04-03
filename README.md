# Recipes App  
> This is a simple recipes app that allows users to manage  
  and share their favorite recipes. The app is built using   
  React, Sass, and hosted with Firebase via Github Actions.  

### Features  
> **User Authentication with Firebase**  
> - Login required to access the app
> - Sign up for new users
> - Password reset
> - Email confirmation  

> **Recipe Management**  
> - Add, edit, and update recipes
> - Recipe owner can only edit their recipes
> - Unpublished recipes are only visible to the recipe owner
> - Option to generate a recipe name using AI
  
> **Recipe Browsing**  
> - Sort recipes by category
> - Sort recipes by newest to oldest or oldest to newest
> - Pagination to navigate through the list of recipes
> - Load more recipes per page
  
> **Storage and Hosting**  
> - Content is stored in Firestore
> - User can upload recipe images, which are stored in Firebase Storage
> - Hosted with GitHub Actions and Firebase
  
### Minimal Dependencies  
> The main goal of this project was to create a functional recipes app  
  using only React, Sass, and Firebase, without relying on too many external libraries.
  
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

### Contributing  
> Feel free to submit pull requests or create issues   
  if you find any bugs or have suggestions for improvements.

### Credits
> This project was influenced by
> - https://github.com/JaredPotter