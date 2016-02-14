require('skeleton-scss/scss/skeleton.scss');

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';

import AppStore from "./stores/AppStore"
import API from "./helpers/API"

//enable react dev tools
if (typeof window !== 'undefined') {
    window.React = React;
}

let APILayer = new API( "http://localhost:5000" )
let appStore = new AppStore( APILayer )


// Render the main component into the dom
ReactDOM.render(
      <App appStore={appStore} />,
      document.getElementById('app'));
