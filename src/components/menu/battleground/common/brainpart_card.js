import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Collectibles from '../../../../utils/data/collectibles';
import * as Utils from '../../../../utils/utils';

export default class BrainpartCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    }

    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick() {
    console.log('Brain part image clicked...');
    // Locked part, simply return
    if(this.props.part.strength == "0") { return; }
    const currentState = this.state.selected;
    console.log(currentState);
    if(!this.state.selected) { // since we are toggling
      this.props.selectFunction(this.props.part);
    } else {
      this.props.deselectFunction(this.props.part);
    }
    this.setState({
      selected: !currentState
    })
  }

  render() {
    var imageSrc = "";
    var divClass = "card-4";
    if (this.props.part.strength == 0) {
      imageSrc = "/style/images/collectibles/brainparts/lockedBrainpart5.png";
    } else {
      imageSrc = this.props.part.image;
      if(this.state.selected) {
        divClass = "card-4 selected";
      } else {
        divClass = "card-4 not-selected";
      }
    }
    console.log(imageSrc);

    return(
      <div className={divClass}>
        <img className="image"
        src={imageSrc}
        onClick={this.handleImageClick}/>
        <div className="title"> {this.props.part.subcategory} </div>
        <div className="description"> Strength Level {this.props.part.strength} </div>
      </div>
    );
  }
}
