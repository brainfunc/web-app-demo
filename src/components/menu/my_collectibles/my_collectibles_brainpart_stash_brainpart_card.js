import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Collectibles from '../../../utils/data/collectibles';
import * as Utils from '../../../utils/utils';

import StashBase from "./common/stash_base";

export default class BrainpartCard extends Component {
  constructor(props) {
    super(props);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick() {
    console.log('Brain part image clicked!');
    this.props.selectFunction(this.props.part);
  }

  handleBoostClick() {
    console.log("Boost brainpart clicked!");
  }

  render() {
    var imageSrc = "";
    const neuronItem = Utils.GetNeuronItemWithSubCategoryInArray(
      this.props.part.subcategoryIndex, this.props.neurons)

    if (this.props.part.strength == 0) {
      if(neuronItem.quantity == 0){
        imageSrc = "/style/images/collectibles/brainparts/lockedBrainpart5.png"
      } else {
        imageSrc = "/style/images/collectibles/brainparts/unlockableBrainpart.png"
      }
    } else { imageSrc = this.props.part.image }
    console.log("This", this.props.part);
    return(
      <div className="card-4">
        <img className="image"
        src={imageSrc}
        onClick={this.handleImageClick}/>
        <div className="title"> {this.props.part.subcategory} </div>
        <div className="description"> Strength Level {this.props.part.strength} </div>
      </div>
    );
  }
}
