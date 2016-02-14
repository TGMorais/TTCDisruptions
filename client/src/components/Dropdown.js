require('styles/disruption-container.scss');

import React from 'react';
import {observer} from "mobservable-react";



@observer
class Dropdown extends React.Component {

  constructor(props) {
    super(props)

  }


  render() {
    let {appStore, options, label, onChange} = this.props;

    // let options = options;
    return (
      <div className={this.props.className}>
        <label> {label} </label>
        <select style={{width: '100%'}} onChange={this.props.onChange}>
          { options.map(this.renderOption) }
          </select>
      </div>
    );
  }

  renderOption(option, idx) {
    return (
      <option value={option.name} key={idx}> {option.name} </option>
    )
  }
}

export default Dropdown;
