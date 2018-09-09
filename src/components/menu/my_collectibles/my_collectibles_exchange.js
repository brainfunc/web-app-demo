import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Collectibles from '../../../utils/data/collectibles';
import * as Utils from '../../../utils/utils';

import * as Constants from '../../../utils/data';
import GameStashCard from './common/game_stash_card';
import ItemExchanger from './common/item_exchanger';
import Divider from './common/divider';
import * as OwnershipContract from '../../../contracts/contracts/Ownership';
import * as CONFIG from "../../../contracts/config";
import {ITEM_TYPE} from '../../../constants/constants';
import {ItemFetcher} from '../../../modules/blockchain/item_fetcher';


export const BackButton = function(props) {
  return(
    <div className='action-button-footer'>
      <div className='footer-image-container left'>
        <img className='footer-image' src={`/style/images/icons/submission_footer.png`}/>
      </div>
      <div className='action-button-wrapper'>
        <button className='action-button' onClick={() => {props.selectFunction()}}>
          Back to Universe
        </button>
      </div>
      <div className='footer-image-container right'>
        <img className='footer-image'
        src={`/style/images/icons/submission_footer.png`}/>
      </div>
    </div>
  );
}

export const TitlePage = function(props) {
  const typesOwned = props.typesOwnedComputer(props.altoStashMap);
  return(
    <div className='exchange__container'>
      <div className='title'> What is this? </div>
      <div className='description'>
        {`The BrainFunc Game Universe is meant to be a place where you can use
        collectible items earned in other games inside BrainFunc. Right now, you can
        construct Brainparts (if you don't have them already) using the Alto Challenge Loot.
        For now, we support 5 items from the Loot. Sound exciting? Select the card
        to get started!`}
      </div>
      <Divider/>
      <div className='game_stash__container'>
        <GameStashCard SelectCard={props.SelectCard} items={typesOwned}/>
      </div>
    </div>
  );
}
export default class Exchange extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: "title",
      selectedCard: "none",
      altoStashMap: []
    }

    this.ComputeAltoStash = this.ComputeAltoStash.bind(this);
    this.ComputeAltoTypesOwned = this.ComputeAltoTypesOwned.bind(this);

    this.SelectCard = this.SelectCard.bind(this);
    this.SwitchToTitlePage = this.SwitchToTitlePage.bind(this);

    this.StartListeningForEvents = this.StartListeningForEvents.bind(this);
  }

  componentDidMount() {
    // console.log("Component Mounted");
    if(!this.props.isAltoStashMapSet) {
      this.StartListeningForEvents();
    }
    if(!this.props.isBrainpartsSet){
      console.log("Fetching and Setting Brainparts...");
      const {web3} = window;
      const self = this;
      const itemFetcherInstance
      = new ItemFetcher(ITEM_TYPE.BRAINPART,
        web3.eth.defaultAccount,
        (err, res) => {
        if(err) { console.log("Error while fetching brainparts"); return; }
        self.props.SetBrainparts(res.items)
      });
      itemFetcherInstance.fetchItems();
    }
  }

  StartListeningForEvents() {
    console.log("Starting to listen for events...");
    const data = OwnershipContract.Data;
    const networkID = CONFIG.NETWORK_ID; // "4 for Rinkeby Network"

    // Instantiating ownership contract
    const {web3} = window;
    const ownershipInstance = web3.eth.contract(data.abi)
    .at(data.networks[networkID].address);
    const userWalletID = web3.eth.defaultAccount;
    ownershipInstance.itemsOf(userWalletID, (err, res) => {
      if(err){ console.log(err); console.log("Alto fetching failed."); return; }
      // item def id of ith owned crypto asset
      // console.log(res[0][i].c[0]);
      this.ComputeAltoStash(res[0]);
    })
    // console.log(userWalletID);
    // var getItemsOwned = (walletID) => new Promise((resolve, reject) => {
    //   ownershipInstance.itemsOf(walletID, async (err, result) => {
    //     if (err) return reject(err);
    //     return resolve(result);
    //   });
    // });
    // console.log(ownershipInstance);
    //const neuronContract = web3.eth.contract(
    //   CONFIG.CONTRACTS.NEURON.ABI);
    // const neuronContractInstance = neuronContract.at(
    //   CONFIG.CONTRACTS.NEURON.ADDRESS);
    // // Or pass a callback to start watching immediately
    // var currentComponent = this;
    // var events = neuronContractInstance.allEvents(function(error, log) {
    //   if (!error) {
    //     console.log(log);
    //     if(log.event == "Transfer") {
    //       currentComponent.setState({currentState: "bought"});
    //     }
    //   }
    // });
  }

  ComputeAltoTypesOwned(stashMap) {
    var types = 0;
    // console.log("Computing Alto Types Owned");
    // console.log(stashMap);
    const integratedChallengeLoot = [2,8,19,25,46];
    for(var i = 1; i < 50;i++){
      // array is incorporated challenge loot
      // console.log(i);
      // console.log(stashMap[i]);
      // console.log(integratedChallengeLoot);
      if(stashMap[i] > 0 && (integratedChallengeLoot.includes(i))) {
        types += 1
      }
    }
    return types;
  }

  ComputeAltoStash(itemsArr) {
    var altoStashMap = [];
    // 49 items in alto stash
    for(var i = 0; i< 50; i++) {
      altoStashMap[i] = 0;
    }
    altoStashMap[0] = -1;

    for(var i = 0;i < itemsArr.length; i++){
      const item = itemsArr[i];
      const itemDefinitionID = item.c[0];
      altoStashMap[itemDefinitionID] += 1;
    }
    this.props.SetAltoStashMap(altoStashMap);
  }

  SelectCard() {
    console.log("Alto loot selected!");
    this.setState({
      currentPage: "exchanger",
      selectedCard: "alto" });
  }

  SwitchToTitlePage() {
    this.setState({
      currentPage: "title",
      selectedCard: "none"
    })
  }

  render() {
    if(this.state.currentPage == "title") {
      return <TitlePage SelectCard={this.SelectCard}
      altoStashMap={this.props.altoStashMap}
      typesOwnedComputer={this.ComputeAltoTypesOwned}/>
    } else if(this.state.currentPage == "exchanger") {
      return(
        <div className='exchange__container'>
          <div className='title'> Transmorgification Chamber </div>
          <div className='description'>
            {`You can transmorgify the 5 parts from the challenge loot shown below
              in order to unlock the associated brainparts. After you do, you will
              get a freshly minted brainpart of Strength Level 1. You can use this
              part to fight in battles. Remember, you need to own at least one alto
              item of a kind in order to unlock the associated brain part.`}
          </div>
          <ItemExchanger
          altoStashMap={this.props.altoStashMap}
          brainparts={this.props.brainparts}
          isBrainpartsSet={this.props.isBrainpartsSet}
          SetBrainparts={this.props.SetBrainparts}/>
          <BackButton selectFunction={this.SwitchToTitlePage}/>
        </div>
      );
    }

  }
}
