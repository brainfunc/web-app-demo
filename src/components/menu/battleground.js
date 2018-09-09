import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from '../common/header';
import Footer from '../common/footer';
import {ITEM_TYPE} from '../../constants/constants';

import InstructionsComponent from './battleground/instructions';
import BattleCoreComponent from './battleground/battle_core';
import ResultsComponent from './battleground/results';

import * as Collectibles from '../../utils/data/collectibles';
import * as Utils from '../../utils/utils';
import * as Constants from '../../utils/data';
import * as Instructions from '../../utils/data/battles/instructions';
import {ItemFetcher} from '../../modules/blockchain/item_fetcher';

import Divider from './my_collectibles/common/divider';

import * as CONFIG from "../../contracts/config";

export default class Battleground extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentBattleState: "ready",
      userCombination: [],
      battleId: -1,
      isBrainpartsSet: false
    }

    this.StartBattle = this.StartBattle.bind(this);
    this.EndBattle = this.EndBattle.bind(this);
    this.StartNewBattle = this.StartNewBattle.bind(this);

    this.RenderBody = this.RenderBody.bind(this);

    this.SetBrainparts = this.SetBrainparts.bind(this);
    // this.FetchTotalSupply = this.FetchTotalSupply.bind(this);
    // this.FetchItemsOwned = this.FetchItemsOwned.bind(this);
    // this.FetchItemOwners = this.FetchItemOwners.bind(this);
    // this.FetchItemTokenIds = this.FetchItemTokenIds.bind(this);
    // this.FetchItemsData = this.FetchItemsData.bind(this);

    // this.FetchAndSetBrainparts = this.FetchAndSetBrainparts.bind(this);
  }

  componentDidMount() {
    const self = this;
    const itemFetcherInstance = new ItemFetcher(ITEM_TYPE.BRAINPART, (err, res) => {
      if(err) { console.log("Error while fetching brainparts"); return; }
      self.SetBrainparts(res.items)
    });
    itemFetcherInstance.fetchItems();
  }

  SetBrainparts(brainparts) {
    console.log("Setting brainparts!");
    console.log("Brainparts", brainparts);
    this.setState({ isBrainpartsSet: true,
      battleId: Utils.GetCurrentBattleId(),
      brainparts });
  }

  StartBattle() {
    this.setState({
      currentBattleState: "started",
      userCombination: []
    });
  }

  EndBattle(combination, battleId) {
    console.log("Submitted Combination", combination);
    this.setState({
      currentBattleState: "ended",
      userCombination: combination
    });
  }

  StartNewBattle() {
    this.setState({currentBattleState: "ready"});
  }

  RenderBody() {
    if(this.state.currentBattleState == "ready") {
      return(<InstructionsComponent
              battleId = {this.state.battleId}
              StartBattleFunction={this.StartBattle}/>)
    } else  if(this.state.currentBattleState == "started") {
      return(<BattleCoreComponent
              brainparts={this.state.brainparts}
              battleId = {this.state.battleId}
              EndBattleFunction={this.EndBattle}/>);
    } else if(this.state.currentBattleState == "ended") {
      return(<ResultsComponent
              submittedCombination={this.state.userCombination}
              battleId = {this.state.battleId}
              StartNewBattleFunction={this.StartNewBattle}/>);
    }
  }

  render() {
    // if(!this.state.isBrainpartsSet) {
    //   return(
    //     <div className='battleground__container'>
    //       <div className='loader-container'>
    //         <img className='loader' src="/style/images/loader.gif"/>
    //       </div>
    //     </div>
    //   );
    // }
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
