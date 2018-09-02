import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Collectibles from '../../../utils/data/collectibles';
import * as Utils from '../../../utils/utils';

import * as Tasks from '../../../utils/data/battles/tasks';

import BrainpartCard from './common/brainpart_card';

export const BattleTaskComponent = function(props) {
  return(
    <div className='battle-task'>
      <div className='title'>
        Which parts could be involved in this activity?
      </div>
      <div className='task-image-container'>
        <img className='task-image' src={Tasks.Data.tasks[props.battleId].image}/>
      </div>
      <div className='task-title'>
        {Tasks.Data.tasks[props.battleId].title}
      </div>
      <div className='task-description'>
        {Tasks.Data.tasks[props.battleId].description}
      </div>
    </div>
  );
}

export const BrainpartCardsRow = function(props) {
  console.log(props);
  var cardsArr = []
  for(var i = 0; i < props["number"]; i++) {
    cardsArr.push(
      <BrainpartCard key={i}
      part={props.brainparts[i]}
      selectFunction={props.selectFunction}
      deselectFunction={props.deselectFunction}/>
    );
  }
  return (cardsArr);
}

export const BrainpartCardsComponent = function(props) {
  // const start = (props.page-1) * 8;
  // const end = props.brainparts.length <
  // (start + 8) ? (props.brainparts.length) : (start + 8);
  // const lastRowNumber = end - start - 4;
  // console.log(start, end);
  return(
    <div className="cards_container-4">
      <div className="card_row-4">
        <BrainpartCardsRow number={4}
        brainparts={props.brainparts.slice(0, 4)}
        selectFunction={props.selectFunction}
        deselectFunction={props.deselectFunction}/>
      </div>
      <div className="card_row-4">
        <BrainpartCardsRow number={4}
        brainparts={props.brainparts.slice(4, 8)}
        selectFunction={props.selectFunction}
        deselectFunction={props.deselectFunction}/>
      </div>
      <div className="card_row-4">
        <BrainpartCardsRow number={4}
        brainparts={props.brainparts.slice(8, 12)}
        selectFunction={props.selectFunction}
        deselectFunction={props.deselectFunction}/>
      </div>
      <div className="card_row-4">
        <BrainpartCardsRow number={2}
        brainparts={props.brainparts.slice(12, 14)}
        selectFunction={props.selectFunction}
        deselectFunction={props.deselectFunction}/>
      </div>
    </div>
  );
}

export default class BattleCoreComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      partsSelected: [],
      selectedPage: 1,
      brainparts: this.props.brainparts
      .sort(Utils.GetSortOrder("strength"))
      .reverse()
    }

    this.AddToSelectedBrainparts = this.AddToSelectedBrainparts.bind(this);
    this.RemoveFromSelectedBrainparts = this.RemoveFromSelectedBrainparts.bind(this);
  }

  AddToSelectedBrainparts(part) {
    console.log("Selected", part);
    //console.log(`${index} selected`);
    var selectedParts = this.state.partsSelected;
    if(!selectedParts.includes(part.subcategoryIndex)) {
      selectedParts.push(part.subcategoryIndex);
    }
  }

  RemoveFromSelectedBrainparts(part){
    console.log("Unselected", part);
    var selectedParts = this.state.partsSelected;
    if(selectedParts.includes(part.subcategoryIndex)) {
      for(var i = selectedParts.length - 1; i >= 0; i--) {
          if(selectedParts[i] == part.subcategoryIndex) {
             selectedParts.splice(i, 1);
          }
      }
    }
    this.setState({
      partsSelected: selectedParts
    })
  }

  render(){
    // onsole.log("Battle Core State", this.state.partsSelected);
    return(
      <div className='body'>

        <div className='battle_core'>
          <BattleTaskComponent
            battleId = {this.props.battleId}/>
          <div className='part-chooser'>

            <div className='title'>
              Choose Parts
            </div>
            <div className='subtitle'>
              {`These are the parts available in your stash. Click on a part to
                select it. Once you're confident about the combination you have
                selected, click on submit.
              `}
            </div>
            <div className='parts-container'>
              <BrainpartCardsComponent
                page={this.state.selectedPage}
                brainparts={this.state.brainparts}
                selectFunction={this.AddToSelectedBrainparts}
                deselectFunction={this.RemoveFromSelectedBrainparts}/>
            </div>

            <div className='submit-container'>
              <div className='footer-image-container left'>
                <img className='footer-image'
                src={`/style/images/icons/submission_footer.png`}/>
              </div>
              <div className='submit-button-wrapper'>
                <button className='submit-button'
                onClick= {() => this.props.EndBattleFunction(
                  this.state.partsSelected, 0)}>
                  Submit
                </button>
              </div>
              <div className='footer-image-container right'>
                <img className='footer-image'
                src={`/style/images/icons/submission_footer.png`}/>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}
