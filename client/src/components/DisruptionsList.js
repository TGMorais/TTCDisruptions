require('styles/disruptions-list.scss');

import React from 'react';
import {observer} from "mobservable-react";

@observer
class DisruptionsList extends React.Component {

  constructor(props) {
    super(props)

    this.onItemDelete = this.onItemDelete.bind(this);
  }



  onItemDelete(e) {
    if( e.target.dataset.id )
      this.props.appStore.removeDisruption( e.target.dataset.id )
  }


  render() {
    let {appStore} = this.props;

    let disruptions = appStore.disruptions;

    return (
      <div className="disruptions-list">
        <p> Current disruptions: </p>
         {this.renderDisruptionsList( disruptions )}
      </div>
    );
  }

  renderDisruptionsList( items ) {
    return (
        <ul>
          { items.map( this.renderDisruptionItem.bind(this) )}
        </ul>
    )
  }

  renderDisruptionItem( item, idx ) {
    return (
      <li className="disruption-item row" key={idx}>
        <span className="three columns">{item.description}</span>
        <span className="three columns"> {item.start}</span>
        <span className="three columns">  {item.end}</span>
        <button className="two columns" onClick={this.onItemDelete} data-id={item.id}> delete </button>
      </li>
    )
  }


}

export default DisruptionsList;
