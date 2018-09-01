import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from '../common/header';
import Footer from '../common/footer';

import InstructionsComponent from './battleground/instructions';
import BattleCoreComponent from './battleground/battle_core';
import ResultsComponent from './battleground/results';

import * as Utils from '../../utils/utils';
import * as Constants from '../../utils/data';
import * as Instructions from '../../utils/data/battles/instructions';
import Divider from './my_collectibles/common/divider';

export default class Battleground extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentBattleState: "ready",
      userCombination: [],
      battleId: -1
    }

    this.StartBattle = this.StartBattle.bind(this);
    this.EndBattle = this.EndBattle.bind(this);
    this.StartNewBattle = this.StartNewBattle.bind(this);

    this.RenderBody = this.RenderBody.bind(this);
  }

  StartBattle() {
    this.setState({
      currentBattleState: "started",
      userCombination: [],
      battleId: Utils.GetCurrentBattleId()
    });
  }

  EndBattle(combination, battleId) {
    console.log("Submitted Combination", combination);
    this.setState({
      currentBattleState: "ended",
      userCombination: combination,
      battleId
    });
  }

  StartNewBattle() {
    this.setState({currentBattleState: "ready"});
  }

  RenderBody() {
    if(this.state.currentBattleState == "ready") {
      return(<InstructionsComponent
              StartBattleFunction={this.StartBattle}/>)
    } else  if(this.state.currentBattleState == "started") {
      return(<BattleCoreComponent
              battleId={this.state.battleId}
              EndBattleFunction={this.EndBattle}/>);
    } else if(this.state.currentBattleState == "ended") {
      return(<ResultsComponent
              submittedCombination={this.state.userCombination}
              battleId = {this.state.battleId}
              StartNewBattleFunction={this.StartNewBattle}/>);
    }
  }

  render() {
    var title;
    if(this.state.currentBattleState == "ended") { title = "Results"; }
    else { title = "Battleground"}
    return (
      <div className="battleground__container">
        <div className="header">
          <img src={`/style/images/menu/battles/battle_icon.png`}/>
          <div className='title'> {title} </div>
          <img src={`/style/images/menu/battles/battle_icon.png`}/>
          <Divider/>
        </div>

        {this.RenderBody()}
      </div>
    );
  }

}
