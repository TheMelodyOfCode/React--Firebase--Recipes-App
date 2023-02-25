import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {ErrorBoundary} from 'react-error-boundary'
import {
  // BrowserRouter, 
  createRoutesFromElements,
  createBrowserRouter,   
  RouterProvider,
  Route,
 } from 'react-router-dom';

import './main.scss';
import App from './App';

import ErrorFallback from './components/errorFallback/errorFallback';
import { UserProvider } from './contexts/user.context';
import ResetEmail from './components/resetEmail/resetEmail';
import Recipies from './routes/recipies';
import PageNotFound from './components/pageNotFound/pageNotFound';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
    path="/"
    // element={<Navigation />}
    errorElement={<PageNotFound />}
    >
        <Route errorElement={<PageNotFound />}>
            <Route index element={<App />} />
            <Route path="/recipies" element={<Recipies />} />
            <Route path="/reset" element={<ResetEmail />} />
        </Route>
    </Route>
  )
);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} >
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();