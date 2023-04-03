import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {ErrorBoundary} from 'react-error-boundary'

import './main.scss';
import './utils/openAI/openAI';
import App from './App';
import { UserProvider } from './contexts/user.context';
import ErrorFallback from './components/errorHandling/errorFallback/errorFallback';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback} >
            <UserProvider>
                  <App />
            </UserProvider>
        </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();