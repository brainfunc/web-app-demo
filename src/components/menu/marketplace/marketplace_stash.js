import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Constants from '../../../utils/data';

export const Parts = function (props) {
    var partsArr = []
    for(var i = 0; i < props["number"]; i++) {
      partsArr.push(
        <div className='part' key={`${i}`}>
          <img className='part-image'
          src={`/style/images/${Constants.menuData.marketplace.images.pack[props.type]}`}/>
          <div className='part-qty'>
            <div className='text'>Quantity:</div>
            <div className='number'> 0 </div>
          </div>
        </div>
      );
    }
    console.log(partsArr);
    return (
      partsArr
    );
}

export default class MarketplaceStash extends Component {

  constructor(props) {
    super(props);
    this.getHeading = this.getHeading.bind(this);
  }

  getHeading() {
    if(this.props.currentState == "bought") {
      return "Your freshly minted Neurons are here!";
    } else if (this.props.currentState == "buying") {
      return "Minting your Neurons...";
    } else { // currentState is "default" here
      return "...Buy Neurons to Unlock...";
    }
  }

  render() {
    return (
      <div className='stash-wrapper'>
        <div className='title-wrapper'>
          <div className='lock left'>
            <img src={`/style/images/${Constants.templateData.images.lock}`}/>
          </div>
          <div className='title'> {this.getHeading()}</div>
          <div className='lock right'>
            <img src={`/style/images/${Constants.templateData.images.lock}`}/>
          </div>

        </div>
        <div className='parts-wrapper'>
          <Parts
          number={Constants.menuData.marketplace.details[this.props.type].neurons}
          type={this.props.type}/>
        </div>
      </div>
    );
  }

}
