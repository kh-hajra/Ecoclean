import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import "react-toastify/dist/ReactToastify.css";

const CLIENT_ID = "937974146084-sua70s8lv3nc5r4pa0tfjrl2l86njh90.apps.googleusercontent.com"; // Replace with your actual Google client ID

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
