import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from '../common/header';
import Footer from '../common/footer';

import * as Constants from '../../utils/data';
import MarketplaceDetails from './marketplace/marketplace_details';
import MarketplaceStash from './marketplace/marketplace_stash';
import MarketplacePacks from './marketplace/marketplace_packs';

import * as CONFIG from "../../contracts/config";
import * as Utils from '../../utils/utils';

const CATEGORY_INDEX_MAPPING = {
  "cerebrum": 0,
  "cerebellum": 1,
  "brainstem": 2,
  "arterial": 3
}

// const subcategoryIndexMapping = {
//   ""
// }
export default class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPack: "cerebrum",
      buyQuantity: 0,
      currentState: "default"
    };
    this.SwitchSelectedPack = this.SwitchSelectedPack.bind(this);
    this.BuyNeuronsClicked = this.BuyNeuronsClicked.bind(this);
    this.UpdateRootState = this.UpdateRootState.bind(this);

    this.GetTotalAmountToPay = this.GetTotalAmountToPay.bind(this);
    this.GetTotalAmountToPay = this.GetTotalAmountToPay.bind(this);

    this.startListeningForEvents = this.startListeningForEvents.bind(this);
  }

  componentDidMount() {
    this.startListeningForEvents();
  }

  startListeningForEvents() {
    console.log("Starting to listen for events...");
    // Instantiating neuron contract
    const {web3} = window;
    const neuronContract = web3.eth.contract(
      CONFIG.CONTRACTS.NEURON.ABI);
    const neuronContractInstance = neuronContract.at(
      CONFIG.CONTRACTS.NEURON.ADDRESS);
    // Or pass a callback to start watching immediately
    var currentComponent = this;
    var events = neuronContractInstance.allEvents(function(error, log) {
      if (!error) {
        console.log(log);
        if(log.event == "Transfer") {
          currentComponent.setState({currentState: "bought"});
        }
      }
    });
  }

  SwitchSelectedPack = (packType) => {
    // console.log(packType);
    this.setState({ selectedPack: packType });
  }

  GetTotalAmountToPay = () => {
    // Calculate total amount to pay based on state
    const priceForState = Constants.PRICE_MAP[this.state.selectedPack];
    const totalPrice = priceForState * this.state.buyQuantity;
    console.log("Buy Quantity", this.state.buyQuantity);
    return  totalPrice;
  }

  GetNeuronUri = () => {
    //TODO:- Migrate Proper URI later ON including category and sub category index
    return `{
      'owner':'<SampleOwner>',
      'dna':'<SampleDna>',
      'category': '<SampleCategoryIndex>',
      'subcategory': '<SampleSubcategoryIndex>',
      'image': '<SampleImageUri>'
    }`;
  }

  BuyNeuronsClicked = () => {
    console.log("Buying Neurons...");
    // Instantiating neuron contract
    const {web3} = window;
    const neuronContract = web3.eth.contract(
      CONFIG.CONTRACTS.NEURON.ABI);
    const neuronContractInstance = neuronContract.at(
      CONFIG.CONTRACTS.NEURON.ADDRESS);
    // console.log(neuronContractInstance);
    // console.log(web3.eth.defaultAccount);
    const categoryIndex = CATEGORY_INDEX_MAPPING[this.state.selectedPack];
    const subcategoryIndex = Utils.GenerateSubCategoryIndex(categoryIndex);
    console.log("categoryIndex", categoryIndex);
    console.log("subcategoryIndex", subcategoryIndex);
    neuronContractInstance.createNeuron(
      "<SampleTimestamp>", `${categoryIndex}`, `${subcategoryIndex}`,
      this.GetNeuronUri(),
      web3.eth.defaultAccount,
      {
        from:CONFIG.CONTRACTS.NEURON.CREATOR,
        value:web3.toWei(
          `${this.GetTotalAmountToPay()}`,
          "ether")
      },
      (err,res) => {
      if(err) {
        console.log("Error:", err);
        return;
      }
      console.log("Transaction Hash: ", res);
      this.setState({currentState: "buying"});
    });
  }

  UpdateRootState = (qty) => {
    console.log("Updating buyQuantity...");
    this.setState({ buyQuantity: qty })
  }

  render() {
    return (
      <div className="marketplace__container">
        <div className='heading'> Buying Neurons</div>
        <div className='description-wrapper'>
          <div className='description'>
            Neurons packs give you the ability to construct brain parts. Neurons
            are available in 4 current categories, viz - Cerebrum, Cerebellum,
            Brainstem and Arterial. Each type will help you construct a part of
            the relevant category. The part you can construct will depend on the
            subcategory that you get, which will be randomly allotted out of the 13
            available types.
          </div>
        </div>
        <MarketplacePacks
          SwitchSelectedPack= {this.SwitchSelectedPack}/>
        <MarketplaceDetails
          type = {this.state.selectedPack}
          IncrementItem = {this.IncrementItem}
          DecreaseItem = {this.DecreaseItem}
          BuyNeuronsClicked = {this.BuyNeuronsClicked}
          UpdateRootState = {this.UpdateRootState}/>
      </div>
    );
  }

}
