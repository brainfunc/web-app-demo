import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Constants from '../../../utils/data';

const MAX_BUY_QUANTITY = 1;
const MIN_BUY_QUANTITY = 0;

export default class MarketplaceDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buyQty: 0
    }

    this.IsBuyEnabled = this.IsBuyEnabled.bind(this);
    this.IncrementItem = this.IncrementItem.bind(this);
    this.DecreaseItem = this.DecreaseItem.bind(this);
  }

  IsBuyEnabled() {
    return this.state.buyQty != 0;
    // if(this.state.buyQty != 0) { return "enabled" }
    // else { return "disabled" }
  }

  IncrementItem = () => {
    if(this.state.buyQty < MAX_BUY_QUANTITY) {
      this.setState({ buyQty: this.state.buyQty + 1 });
      this.props.UpdateRootState(this.state.buyQty + 1);
    } else {
      // TODO:- Replace this log by modal
      console.log("You can buy only one neuron at a time");
    }
  }

  DecreaseItem = () => {
    if(this.state.buyQty > MIN_BUY_QUANTITY) {
      this.setState({ buyQty: this.state.buyQty - 1 });
      this.props.UpdateRootState(this.state.buyQty - 1);
    }
  }

  render() {
    return (
      <div className='details-wrapper'>
        <div className='details-image-wrapper'>
          <img className='details-image'
          src={`/style/images/${Constants.menuData.marketplace.images.pack[this.props.type]}`}/>
        </div>
        <div className='details-description-wrapper'>
          <div className='title'> {Constants.menuData.marketplace.details[this.props.type].title} </div>
          <div className='subtitle'> {Constants.menuData.marketplace.details[this.props.type].subtitle} </div>
          <div className='description'>
            {Constants.menuData.marketplace.details[this.props.type].description}
          </div>
          <div className='price-wrapper'>
            <div className='quantity'>
              <button className='qty decrement'
                onClick={this.DecreaseItem}> - </button>
              <div className='qty number'> {this.state.buyQty} </div>
              <button className='qty increment'
                onClick={this.IncrementItem}> + </button>
            </div>
            <div className='total-price'>
              Total Price:
              {` ${Number(Constants.menuData.marketplace.details[this.props.type].price
                * this.state.buyQty).toFixed(2)}`}
              Eth
            </div>
          </div>
          <div className='buy-wrapper'>
            <button className='buy' disabled={!this.IsBuyEnabled()}
            onClick={this.props.BuyNeuronsClicked}> Buy Neuron </button>
          </div>
        </div>
      </div>
    );
  }

}
