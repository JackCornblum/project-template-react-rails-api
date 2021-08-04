import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';


const LoadingIndicator = props => {

  const { promiseInProgress } = usePromiseTracker()

  return (
    promiseInProgress &&
    <>
    <div id="loader">
      <h4>Loading Results</h4>
    </div>
      <div id="loader">
        <Loader type="ThreeDots" color="#2B395A" height="100" width="100" />
      </div>
    </>
  )
}


ReactDOM.render(
  <Router>
    <App />
    <LoadingIndicator />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
