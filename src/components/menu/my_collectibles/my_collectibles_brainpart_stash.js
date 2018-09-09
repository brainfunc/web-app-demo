import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Collectibles from '../../../utils/data/collectibles';
import * as Utils from '../../../utils/utils';

import BrainpartCard from "./my_collectibles_brainpart_stash_brainpart_card";
import PagingBar from "./common/paging_bar";

import * as CONFIG from "../../../contracts/config";
import {ITEM_TYPE} from '../../../constants/constants';
import {ItemFetcher} from '../../../modules/blockchain/item_fetcher';

export const BrainpartCardsRow = function(props) {
  // console.log(props);
  var cardsArr = []
  for(var i = 0; i < props["number"]; i++) {
    cardsArr.push(
      <BrainpartCard key={i}
      neurons = {props.neurons}
      part={props.brainparts[i]}
      selectFunction={props.selectFunction}/>
    );
  }
  return (cardsArr);
}

export const BrainpartCardsComponent = function(props) {
  const start = (props.page-1) * 8;
  const end = props.brainparts.length <
  (start + 8) ? (props.brainparts.length) : (start + 8);
  const lastRowNumber = end - start - 4;
  // console.log(start, end);
  return(
    <div className="cards_container-4">
      <div className="card_row-4">
        <BrainpartCardsRow number={4}
        neurons = {props.neurons}
        brainparts={props.brainparts.slice(start, start + 4)}
        selectFunction={props.selectFunction}/>
      </div>
      <div className="card_row-4">
        <BrainpartCardsRow number={lastRowNumber}
        neurons = {props.neurons}
        brainparts={props.brainparts.slice(start + 4, end)}
        selectFunction={props.selectFunction}/>
      </div>
    </div>
  );
}


export default class BrainpartStash extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 1,
      selectedBrainpart: Collectibles.Data.Brainparts[0],
      selectedBrainpartState: "locked",
      brainparts: Collectibles.Data.Brainparts
    }

    this.GetSelectedBrainpartState = this.GetSelectedBrainpartState.bind(this);
    this.SetSelectedBrainpart = this.SetSelectedBrainpart.bind(this);
    this.SetSelectedPage = this.SetSelectedPage.bind(this);

    this.HandleConstructClick = this.HandleConstructClick.bind(this);
    this.UnlockSelectedBrainpart = this.UnlockSelectedBrainpart.bind(this);
    this.StartListeningForEvents = this.StartListeningForEvents.bind(this);
  }

  componentDidMount() {
    console.log("Component mounted!");
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
    this.StartListeningForEvents();
  }

  StartListeningForEvents() {
    console.log("Starting to listen for events...");
    // Instantiating neuron contract
    const {web3} = window;
    const brainpartContract = web3.eth.contract(
      CONFIG.CONTRACTS.BRAINPART.ABI);
    const brainpartContractInstance = brainpartContract.at(
      CONFIG.CONTRACTS.BRAINPART.ADDRESS);
    // Or pass a callback to start watching immediately
    var self = this;
    var events = brainpartContractInstance.allEvents(function(error, log) {
      if (!error) {
        console.log(log);
        if(log.event == "Transfer") {
          // self.props.SetBrainparts();
          console.log("Unlocked!");
        }
      }
    });
  }

  SetSelectedPage(page) {
    console.log("Page Switched!", page);
    this.setState({ selectedPage: page })
  }

  SetSelectedBrainpart(part) {
    //console.log(part);
    this.setState({ selectedBrainpart: part })
  }

  GetSelectedBrainpartState() {
    const neuronItem = Utils.GetNeuronItemWithSubCategoryInArray(
      this.state.selectedBrainpart.subcategoryIndex, this.props.neurons);
    if(this.state.selectedBrainpart.strength > 0) { return "owned"; }
    else if(neuronItem.quantity > 0) { return "unlockable"; }
    else { return "locked"; }
  }

  HandleConstructClick() {
    console.log("Construct Clicked!");
    const brainpartStatus = this.GetSelectedBrainpartState();
    if(brainpartStatus == "owned" || brainpartStatus == "locked") {
      console.log("Locked or already owned");
      return;
    }
    // Unlockable state
    this.UnlockSelectedBrainpart();
  }

  UnlockSelectedBrainpart() {
    const {web3} = window;
    const brainpartContract = web3.eth.contract(
      CONFIG.CONTRACTS.BRAINPART.ABI);
    const brainpartContractInstance = brainpartContract.at(
      CONFIG.CONTRACTS.BRAINPART.ADDRESS);

    const unlockItem
    = this.state.selectedBrainpart;
    const categoryIndex = `${unlockItem.categoryIndex}`;
    const subcategoryIndex =`${unlockItem.subcategoryIndex}`;
    const strength = "1"; // 1 since we are only unlocking

    console.log(unlockItem);

    var self = this;
    brainpartContractInstance.createBrainpart(
      "ts",categoryIndex,subcategoryIndex,strength,
      "<SampleUri>"
      ,web3.eth.defaultAccount,
      { from: CONFIG.CONTRACTS.BRAINPART.CREATOR },
      function(err, res) {
        if(err) { console.log(err); return; }
        // self.setState({currentState: "unlocking"})
        console.log("Initiated unlock using neurons...");
        console.log("Transaction hash:", res);
      })
  }

  render() {
    console.log(this.props);
    var imageSrc, boostOrUnlockButtonText,boostOrUnlockButtonClass,
    description,lockLabelClass, lockLabelDivText;
    //console.log("BPSELEcted", this.state.selectedBrainpart);
    const neuronItem = Utils.GetNeuronItemWithSubCategoryInArray(
      this.state.selectedBrainpart.subcategoryIndex, this.props.neurons)
    if (this.state.selectedBrainpart.strength == "0") {
      imageSrc = "/style/images/collectibles/brainparts/lockedBrainpart5.png";
      boostOrUnlockButtonText = "Construct";
      boostOrUnlockButtonClass = "locked";
      lockLabelClass = "locked";
      lockLabelDivText = "Locked";
      description = Collectibles.GeneralData.Brainparts.lockedDescription;
      if(neuronItem.quantity > 0) {
        imageSrc = "/style/images/collectibles/brainparts/unlockableBrainpart.png";
        lockLabelClass = "unlockable";
        lockLabelDivText = "Unlockable";
        boostOrUnlockButtonClass="unlockable";
      }
    } else {
      imageSrc = this.state.selectedBrainpart.image;
      boostOrUnlockButtonText = "Boost";
      boostOrUnlockButtonClass = "boostable";
      lockLabelClass = "owned";
      lockLabelDivText = "Owned";
      description = this.state.selectedBrainpart.description;
    }

    var universeImgSrc, universeTitle, universeDesc;
    if(neuronItem.quantity == "0" && lockLabelClass == "owned") {
      universeImgSrc = `/style/images/icons/universe.png`;
      universeTitle = "Game Universe";
      universeDesc = "This part was created via Game Universe";
    } else {
      if(neuronItem.quantity == "0") {
        universeImgSrc = `/style/images/icons/lock.png`;
        universeTitle = "Neurons Unvailable";
        universeDesc = `You have no neurons of this type`;
      } else {
        universeImgSrc = `/style/images/icons/neurons_qty_brainstash.png`;
        universeTitle = "Neurons Available";
        universeDesc = `You have ${neuronItem.quantity} neurons of this type`;
      }
    }
    return (

      <div className='brainpart_stash__container'>
        <div className="brainpart_detail_container">
          <div className="image_container">
            <img src={imageSrc}/>
            <button className={`boost ${boostOrUnlockButtonClass}`}
            onClick = {this.HandleConstructClick}> {boostOrUnlockButtonText} </button>
          </div>
          <div className="description_container">
            <div className="name">
              {this.state.selectedBrainpart.subcategory}
            </div>
            <div className="details">
              <div className="level">
                <div className="increase-level-txt">
                  Strength Level {this.state.selectedBrainpart.strength}
                </div>
                <div className={`${lockLabelClass}`}>
                  {lockLabelDivText}
                </div>
              </div>
              <div className="text">
                {description}
              </div>
              <div className="neurons">
                <img src={universeImgSrc}/>
                <div className="lbl"> {universeTitle}</div>
                <div className="qty">
                  {universeDesc}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="title"> Brainpart Collectibles </div>
        <div className="subtitle">
          Click on the parts to see details above
        </div>
        <BrainpartCardsComponent
          page={this.state.selectedPage}
          neurons = {this.props.neurons}
          brainparts={this.props.brainparts}
          selectedBrainpart = {this.props.selectedBrainpart}
          selectFunction={this.SetSelectedBrainpart}/>
        <PagingBar
          selectFunction={this.SetSelectedPage}/>
      </div>
    );
  }
}
