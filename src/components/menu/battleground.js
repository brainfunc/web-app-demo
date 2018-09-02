import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from '../common/header';
import Footer from '../common/footer';

import InstructionsComponent from './battleground/instructions';
import BattleCoreComponent from './battleground/battle_core';
import ResultsComponent from './battleground/results';

import * as Collectibles from '../../utils/data/collectibles';
import * as Utils from '../../utils/utils';
import * as Constants from '../../utils/data';
import * as Instructions from '../../utils/data/battles/instructions';
import Divider from './my_collectibles/common/divider';

import * as CONFIG from "../../contracts/config";

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

    this.SetBrainparts = this.SetBrainparts.bind(this);
    this.FetchTotalSupply = this.FetchTotalSupply.bind(this);
    this.FetchItemsOwned = this.FetchItemsOwned.bind(this);
    this.FetchItemOwners = this.FetchItemOwners.bind(this);
    this.FetchItemTokenIds = this.FetchItemTokenIds.bind(this);
    this.FetchItemsData = this.FetchItemsData.bind(this);

    this.FetchAndSetBrainparts = this.FetchAndSetBrainparts.bind(this);
  }

  componentDidMount() {
    this.FetchAndSetBrainparts();
  }

  SetBrainparts(brainparts) {
    console.log("Setting brainparts!");
    this.setState({ brainparts });
  }

  FetchAndSetBrainparts() {
    console.log("Loading...");
    // Fetch Brainparts owned using smart contracts
    // use total supply and owner of
    const {web3} = window;
    const brainpartContract = web3.eth.contract(
      CONFIG.CONTRACTS.BRAINPART.ABI);
    const brainpartContractInstance = brainpartContract.at(
      CONFIG.CONTRACTS.BRAINPART.ADDRESS);
    // console.log(brainpartContractInstance);
    // console.log(web3.eth.defaultAccount);

    var fetchItemsOwnedCallback = function(err, totalSupply) {
      if(err) { console.log(err); console.log("Loading failed.") ;return; }
      // console.log("Total Supply", totalSupply);
      this.FetchItemsOwned(brainpartContractInstance, totalSupply);
    }
    fetchItemsOwnedCallback = fetchItemsOwnedCallback.bind(this);

    this.FetchTotalSupply(brainpartContractInstance,fetchItemsOwnedCallback);
    // set the state
  }

  FetchTotalSupply(brainpartContractInstance, callback) {
    brainpartContractInstance.totalSupply(function(err, res) {
      if(err) { callback(err, null); console.log("Loading failed."); return;}
      const totalSupply = res.c[0];
      callback(null, totalSupply);
    });
  }

  FetchItemsOwned(brainpartContractInstance, totalSupply) {
    // console.log("Fetching Items Owned by User...");
    // console.log("Total Supply", totalSupply);

    var brainpartOwnershipMap = [];
    for(var i = 0;i < totalSupply; i++) {
      brainpartOwnershipMap.push("");
    }

    this.FetchItemOwners(
      brainpartOwnershipMap, brainpartContractInstance, totalSupply);

    //console.log(brainpartOwnershipMap);
  }

  FetchItemOwners(
    brainpartOwnershipMap, brainpartContractInstance, totalSupply) {
    const {web3} = window;
    var counter = 0;
    var instance = this;
    // Usage of let is important here!
    for(let i = 0; i < totalSupply; i++){
      brainpartContractInstance.ownerOf(i,
        function(err, res) {
          if(err) {console.log(err); console.log("Loading failed."); return;}
          //console.log("Owner", i, res);
          brainpartOwnershipMap[i] = res;
          counter += 1;
          if(counter == totalSupply) {
            instance.FetchItemTokenIds(
              brainpartOwnershipMap, web3.eth.defaultAccount, brainpartContractInstance)
          }
        }// end of callback
      );//end of ownerOf
    } // end of for loop
  }

  FetchItemTokenIds(map, accountID, brainpartContractInstance) {
    // Logic to compute items owned by current address
    var itemTokenIds = [];
    for(var i = 0; i < map.length; i++) {
      if(map[i] == accountID) {
        itemTokenIds.push(i);
      }
    }
    if(itemTokenIds.length == 0) { console.log("Loading finished!"); return; }
    this.FetchItemsData(itemTokenIds, brainpartContractInstance);
  }

  FetchItemsData(brainpartTokenIds, brainpartContractInstance) {
    //console.log("Owned brainpart Ids", brainpartTokenIds);

    var counter = 0;
    var brainparts = Collectibles.Data.Brainparts;
    var self = this;
    console.log(self);
    var brainpartFetchCallback = function(err, res) {
      if(err) {console.log(err); console.log("Loading failed."); return;}
      console.log("brainpart Data", res, counter);
      const cIndex = res[1]; const scIndex = res[2]; const strength = res[3];
      // error handling for bad sub categories
      counter += 1;
      if(scIndex == "" || Number(scIndex) == undefined ||
      !Utils.BrainpartSubCategoryCheck(cIndex, scIndex)) { return; }
      brainparts[scIndex].quantity += 1;
      brainparts[scIndex].strength = strength;
      if(counter == brainpartTokenIds.length) {
        self.SetBrainparts(
          brainparts.sort(Utils.GetSortOrder("strength")).reverse());
        // console.log(this);
        console.log("Loading finished!");
      }
    }
    brainpartFetchCallback.bind(this);

    for(let i = 0; i < brainpartTokenIds.length; i++) {
      brainpartContractInstance.brainparts(brainpartTokenIds[i], brainpartFetchCallback);
    }
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
              brainparts={this.state.brainparts}
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
