require('styles/disruption-container.scss');

import React from 'react';
import {observable, transaction } from "mobservable";
import {observer} from "mobservable-react";

import Dropdown from '../Dropdown';


//viewmodel to handle this component's specific state
class viewmodel {
  @observable start;
  @observable end;
  @observable description;
  @observable isLoading;
  @observable errorMsg;

  constructor() {
    this.reset();
  }
  get data() {
    return {
      start: this.start,
      end: this.end,
      id: -1,
      description: this.description
    }
  }

  validate() {
    if ( this.empty(this.start) || this.empty(this.end) || this.empty(this.description) ) {
      this.errorMsg = "Please fill all the fields first!";

      return false;
    }
    //todo
    //check same station
    //check incorrect station order
    return true;
  }

  reset() {
    transaction(() => {
      this.description = "";
      this.errorMsg = "";
    })
  }

  empty( val ) {
    return !val || val.length < 1;
  }
}

//COMPONENENT
@observer
class DisruptionContainer extends React.Component {

  static defaultProps = {
    vm: new viewmodel()
  }

  constructor(props) {
    super(props)

    this.onLineClick  = this.onLineClick.bind(this);
    this.onConfirmDisruption = this.onConfirmDisruption.bind(this);
  }

  render() {

    let {appStore, vm} = this.props;

    let lines = appStore.lines;
    let stations = appStore.stations;

    return (
      <div className="disruption-container container">
        <p> {appStore.isLoading ? "Loading data..." : ""} </p>
        <p className="error-msg network-error"> {appStore.error} </p>
        <h5>Add a new disruption to the network</h5>

        { this.renderTransportLines(lines) }
        { this.renderStationPickers(stations) }

        <div>
          <label>Description:</label>
          <textarea style={{width: "100%"}} value={vm.description} onChange={this.onHandleInputChange.bind(this, "description")}/>
        </div>

        <button className="button button-green" onClick={this.onConfirmDisruption}> Confirm </button>
        <div className="error-msg"> {vm.errorMsg} </div>

      </div>
    );
  }

  renderStationPickers(stations) {
    return (
      <div>
        <p>The service is interrupted between:</p>
        <div className="row">
          <Dropdown options={stations} className="six columns" label="Pick station" onChange={this.onHandleInputChange.bind(this, "start")}></Dropdown>
          <Dropdown options={stations} className="six columns" label="Pick station" onChange={this.onHandleInputChange.bind(this, "end")}></Dropdown>
        </div>
      </div>
    )
  }

  renderTransportLines(lines) {
    return (
      <div className="row lines" onClick={this.onLineClick}>
        { lines.map( this.renderTransportLine ) }
      </div>
    )
  }

  renderTransportLine( line, idx ) {
      return (
        <div className="three columns transport-line " key={idx} data-idx={idx} data-selected={line.selected}>
          {line.name}
        </div>
      )
  }

  //events
  onLineClick(e) {
    let {appStore} = this.props;
    if(appStore && e.target.dataset.idx) {
      appStore.toggleLine( e.target.dataset.idx )
    }
  }

  onConfirmDisruption(e) {
    let {appStore, vm} = this.props;
    if( appStore && vm.validate() ) {
      let line = appStore.getSelectedLine() || {};
      let data = { ...vm.data, linename: line.name }

      appStore.addDisruption( data )
      vm.reset()
    }
  }

  onHandleInputChange(key, e) {
    var {vm} = this.props;
    vm[key] = e.target.value;
  }
}

export default DisruptionContainer;
