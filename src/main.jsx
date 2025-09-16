// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from "react";
import ReactDom from "react-dom/client";
import'./index.css';
import App from './App'
import { DataProvider } from "./components/dataProvider/DataProvider";
import { initialState,reducer } from "./utility/Reducer";
const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider reducerreducer initialState={initialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);