import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Collectibles from '../../../utils/data/collectibles';
import * as Utils from '../../../utils/utils';
import StashBase from "./common/stash_base";
import PagingBar from "./common/paging_bar";

import * as CONFIG from "../../../contracts/config";
import {ITEM_TYPE} from '../../../constants/constants';
import {ItemFetcher} from '../../../modules/blockchain/item_fetcher';

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
  }

  componentDidMount() {
    console.log("Component mounted!");
    if(!this.props.isNeuronsSet){
      console.log("Fetching and Setting Neurons...");
      const {web3} = window;
      const self = this;
      const itemFetcherInstance
      = new ItemFetcher(ITEM_TYPE.NEURON,
        web3.eth.defaultAccount,
        (err, res) => {
        if(err) { console.log("Error while fetching brainparts"); return; }
        self.props.SetNeurons(res.items)
      });
      itemFetcherInstance.fetchItems();
    }
  }

  SetSelectedPage(page) {
    console.log("Page Switched!", page);
    this.setState({ selectedPage: page })
  }

  render() {
    // Logging the state
    // if(!this.props.isNeuronsSet) {
    //   return(
    //     <div className='neuron_stash__container'>
    //       <div className='loader-container'>
    //         <img className='loader' src="/style/images/loader.gif"/>
    //       </div>
    //     </div>
    //   );
    // }

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
