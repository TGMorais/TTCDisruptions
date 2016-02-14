require('normalize.css');
require('styles/App.css');

import React from 'react';
import {observer} from "mobservable-react";
import DisruptionContainer from "./containers/DisruptionContainer"
import DisruptionsList from "./DisruptionsList"


@observer
class AppComponent extends React.Component {
  render() {

    let {appStore} = this.props;

    return (
      <div className="app-container absolute-center">
        <DisruptionContainer appStore={appStore}></DisruptionContainer>
        <hr/>
        <DisruptionsList appStore={appStore}></DisruptionsList>
      </div>
    );
  }
}

export default AppComponent;
