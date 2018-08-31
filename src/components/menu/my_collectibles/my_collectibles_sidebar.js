import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Constants from '../../../utils/data';

export default class SideBar extends Component {

  constructor(props) {
    super(props);
  }

  buttonSelection(component_name) {
    if(this.props.activeComponent == component_name) {
      return "selected";
    }
  }

  render() {
    return (
      <div className="sidebar">
        <div
          className={`neurons_button sidebar-button
          ${this.buttonSelection("neuron_stash")}`}
          onClick={this.props.displayNeuronStash}>
        Neurons
        </div>
        <div
          className={`brainparts_button sidebar-button
          ${this.buttonSelection("brainpart_stash")}`}
          onClick={this.props.displayBrainpartStash}>
        Brain Parts
        </div>
        <div
          className={`exchange_button sidebar-button
          ${this.buttonSelection("exchange")}`}
          onClick={this.props.displayExchange}>
        Game Universe
        </div>
      </div>
    );
  }
}
