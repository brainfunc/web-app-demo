import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Collectibles from '../../../utils/data/collectibles';
import * as Utils from '../../../utils/utils';
import StashBase from "./common/stash_base";
import PagingBar from "./common/paging_bar";

import * as CONFIG from "../../../contracts/config";

export const NeuronCard = function(props) {
  var imageSrc = "";
  if (props.quantity == "0") {
    imageSrc = "/style/images/collectibles/neurons/unavailableNeuron.png"
  } else { imageSrc = props.image; }
  return (
    <div className="card-4">
      <img className="image"
      src={imageSrc}/>
      <div className="title">{props.subcategory}</div>
      <div className="description">
        <div className="category"> {props.category} </div>
        <div className="quantity"> {props.quantity} </div>
      </div>
    </div>
  );
}

export const NeuronCardsRow = function(props) {
  // console.log(props);
  var cardsArr = []
  for(var i = 0; i < props["number"]; i++) {
    cardsArr.push(
      <NeuronCard key={i}
      category={props.neurons[i].category}
      subcategory={props.neurons[i].subcategory}
      quantity={props.neurons[i].quantity}
      image={props.neurons[i].image}/>
    );
  }
  return (cardsArr);
}

export const NeuronCardsComponent = function(props) {
  const start = (props.page-1) * 8;
  const end = props.neurons.length <
  (start + 8) ? (props.neurons.length) : (start + 8);
  const lastRowNumber = end - start - 4;
  // console.log(start, end);
  return(
    <div className="cards_container-4">
      <div className="card_row-4">
        <NeuronCardsRow number={4}
        neurons={props.neurons.slice(start,start + 4)}/>
      </div>
      <div className="card_row-4">
        <NeuronCardsRow number={lastRowNumber}
        neurons={props.neurons.slice(start + 4, end)}/>
      </div>
    </div>
  );
}

export default class NeuronStash extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 1,
      neurons: Collectibles.Data.Neurons,
      itemsOwned:[]
    }

    this.SetSelectedPage = this.SetSelectedPage.bind(this);

    this.FetchTotalSupply = this.FetchTotalSupply.bind(this);
    this.FetchItemsOwned = this.FetchItemsOwned.bind(this);
    this.FetchItemOwners = this.FetchItemOwners.bind(this);
    this.FetchItemTokenIds = this.FetchItemTokenIds.bind(this);
    this.FetchItemsData = this.FetchItemsData.bind(this);

    this.FetchAndSetNeurons = this.FetchAndSetNeurons.bind(this);
  }

  componentDidMount() {
    if(!this.props.isNeuronsSet){
      this.FetchAndSetNeurons()
    }
  }

  FetchAndSetNeurons() {
    console.log("Loading...");
    // Fetch neurons owned using smart contracts
    // use total supply and owner of
    const {web3} = window;
    const neuronContract = web3.eth.contract(
      CONFIG.CONTRACTS.NEURON.ABI);
    const neuronContractInstance = neuronContract.at(
      CONFIG.CONTRACTS.NEURON.ADDRESS);
    // console.log(neuronContractInstance);
    // console.log(web3.eth.defaultAccount);

    var fetchItemsOwnedCallback = function(err, totalSupply) {
      if(err) { console.log(err); console.log("Loading failed.") ;return; }
      // console.log("Total Supply", totalSupply);
      this.FetchItemsOwned(neuronContractInstance, totalSupply);
    }
    fetchItemsOwnedCallback = fetchItemsOwnedCallback.bind(this);

    this.FetchTotalSupply(neuronContractInstance,fetchItemsOwnedCallback);
    // set the state
  }

  FetchTotalSupply(neuronContractInstance, callback) {
    neuronContractInstance.totalSupply(function(err, res) {
      if(err) { callback(err, null); console.log("Loading failed.") ;return;}
      const totalSupply = res.c[0];
      callback(null, totalSupply);
    });
  }

  FetchItemsOwned(neuronContractInstance, totalSupply) {
    // console.log("Fetching Items Owned by User...");
    // console.log("Total Supply", totalSupply);

    var neuronOwnershipMap = [];
    for(var i = 0;i < totalSupply; i++) {
      neuronOwnershipMap.push("");
    }

    this.FetchItemOwners(
      neuronOwnershipMap, neuronContractInstance, totalSupply);

    //console.log(neuronOwnershipMap);
  }

  FetchItemOwners(
    neuronOwnershipMap, neuronContractInstance, totalSupply) {
    const {web3} = window;
    var counter = 0;
    var instance = this;
    // Usage of let is important here!
    for(let i = 0; i < totalSupply; i++){
      neuronContractInstance.ownerOf(i,
        function(err, res) {
          if(err) {console.log(err); console.log("Loading failed.") ;return;}
          //console.log("Owner", i, res);
          neuronOwnershipMap[i] = res;
          counter += 1;
          if(counter == totalSupply) {
            instance.FetchItemTokenIds(
              neuronOwnershipMap, web3.eth.defaultAccount, neuronContractInstance)
          }
        }// end of callback
      );//end of ownerOf
    } // end of for loop
  }

  FetchItemTokenIds(map, accountID, neuronContractInstance) {
    // Logic to compute items owned by current address
    var itemTokenIds = [];
    for(var i = 0; i < map.length; i++) {
      if(map[i] == accountID) {
        itemTokenIds.push(i);
      }
    }
    if(itemTokenIds.length == 0) { console.log("Loading finished!"); return; }
    this.FetchItemsData(itemTokenIds, neuronContractInstance);
  }

  FetchItemsData(neuronTokenIds, neuronContractInstance) {
    //console.log("Owned Neuron Ids", neuronTokenIds);

    var counter = 0;
    var neurons = Collectibles.Data.Neurons;
    var self = this;
    // console.log(self);
    var neuronFetchCallback = function(err, res) {
      if(err) {console.log(err); console.log("Loading failed.") ;return;}
      // console.log("Neuron Data", res, counter);
      const cIndex = res[1]; const scIndex = res[2];
      // error handling for bad sub categories
      counter += 1;
      if(scIndex == "" || Number(scIndex) == undefined ||
      !Utils.NeuronSubCategoryCheck(cIndex, scIndex)) { return; }
      neurons[scIndex].quantity += 1;

      if(counter == neuronTokenIds.length) {
        self.props.SetNeurons(
          neurons.sort(Utils.GetSortOrder("quantity")).reverse());
        // console.log(this);
        console.log("Loading finished!");
      }
    }
    neuronFetchCallback.bind(this);

    for(let i = 0; i < neuronTokenIds.length; i++) {
      neuronContractInstance.neurons(neuronTokenIds[i], neuronFetchCallback);
    }
  }

  // SetNeurons(neurons) {
  //   console.log("Loading finished!");
  //   this.setState({
  //     neurons: neurons.sort(Utils.GetSortOrder("quantity")).reverse()})
  // }

  SetSelectedPage(page) {
    console.log("Page Switched!", page);
    this.setState({ selectedPage: page })
  }

  render() {
    // Logging the state

    return (
      <div className='neuron_stash__container'>
        <div className='title'> Neuron Collectibles </div>
        <div className='subtitle'>
          Here are the neuron collectibles that you own
        </div>
        <NeuronCardsComponent
        neurons={this.props.neurons}
        page={this.state.selectedPage}/>
        <PagingBar selectFunction={this.SetSelectedPage}/>
      </div>
    );
  }
}
