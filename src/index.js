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
import { UserProvider } from './contexts/user.context';
import ErrorFallback from './components/errorHandling/errorFallback/errorFallback';
import ResetPassword from './components/authentication/resetPassword/resetPassword';
import RouteError from './components/errorHandling/routeErros/routeErrors';
import AuthenticatedApp from './routes/authenticatedApp';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
    path="/"
    element={<App />}
    errorElement={<RouteError />}
    >
        <Route errorElement={<RouteError />}>
            <Route index element={<App />} />
            <Route path="/reset" element={<ResetPassword />} />
            {/* <Route path="/recepies" element={<AuthenticatedApp />} /> */}
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