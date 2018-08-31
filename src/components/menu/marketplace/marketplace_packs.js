import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import posed from "react-pose";

import * as Constants from '../../../utils/data';

// Animation related components
const Pack = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 0.94 },
  transition: {
    duration: 600,
    ease: 'circInOut'
  }
})
export default class MarketplacePacks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hovering: {
        cerebrum: false,
        cerebellum: false,
        brainstem: false,
        arterial: false
      }
    }
  }

  SetHovered(type, condition) {
    var activeState = {
      hovering: {
        cerebrum: false,
        cerebellum: false,
        brainstem: false,
        arterial: false
      }
    }
    activeState.hovering[type] = condition;
    this.setState(activeState);
  }

  render() {
    return (
      <div className='packs-wrapper'>
        <Pack className='pack yellow'
          pose = { this.state.hovering.cerebrum ? "hovered": "idle" }
          onMouseOver = { () =>  this.SetHovered("cerebrum", true) }
          onMouseLeave = { () =>  this.SetHovered("cerebrum", false) }
          onClick={ () => this.props.SwitchSelectedPack("cerebrum")}>
          <div className='title'> Cerebrum </div>
          <img className='pack_image'
            src={`/style/images/${Constants.menuData.marketplace.images.pack.cerebrum}`}/>
          <div className='pack_description'>
            <div className='number'> Neural Price </div>
            <div className='price'> {Constants.menuData.marketplace.details.cerebrum.price} Eth</div>
          </div>
        </Pack>
        <Pack className='pack green'
          pose = { this.state.hovering.cerebellum ? "hovered": "idle" }
          onMouseOver = { () =>  this.SetHovered("cerebellum", true) }
          onMouseLeave = { () =>  this.SetHovered("cerebellum", false) }
          onClick={ () => this.props.SwitchSelectedPack("cerebellum")}>
          <div className='title'> Cerebellum </div>
          <img className='pack_image'
            src={`/style/images/${Constants.menuData.marketplace.images.pack.cerebellum}`}/>
          <div className='pack_description'>
            <div className='number'> Neural Price</div>
            <div className='price'> {Constants.menuData.marketplace.details.cerebellum.price} Eth</div>
          </div>
        </Pack>
        <Pack className='pack blue'
          pose = { this.state.hovering.brainstem ? "hovered": "idle" }
          onMouseOver = { () =>  this.SetHovered("brainstem", true) }
          onMouseLeave = { () =>  this.SetHovered("brainstem", false) }
          onClick={ () => this.props.SwitchSelectedPack("brainstem")} >
          <div className='title'> BrainStem </div>
          <img
            className='pack_image'
            src={`/style/images/${Constants.menuData.marketplace.images.pack.brainstem}`}/>
          <div className='pack_description'>
            <div className='number'> Neural Price</div>
            <div className='price'> {Constants.menuData.marketplace.details.brainstem.price} Eth</div>
          </div>
        </Pack>
        <Pack className='pack purple'
          pose = { this.state.hovering.arterial ? "hovered": "idle" }
          onMouseOver = { () =>  this.SetHovered("arterial", true) }
          onMouseLeave = { () =>  this.SetHovered("arterial", false) }
          onClick={ () => this.props.SwitchSelectedPack("arterial")}>
          <div className='title'> Areterial </div>
          <img className='pack_image'
            src={`/style/images/${Constants.menuData.marketplace.images.pack.arterial}`}/>
          <div className='pack_description'>
            <div className='number'> Neural Price</div>
            <div className='price'> {Constants.menuData.marketplace.details.arterial.price} Eth</div>
          </div>
        </Pack>
      </div>
    );
  }

}
