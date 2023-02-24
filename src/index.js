import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {ErrorBoundary} from 'react-error-boundary'

import './main.scss';
import App from './App';

import ErrorFallback from './components/errorFallback/errorFallback';
import { UserProvider } from './contexts/user.context';

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