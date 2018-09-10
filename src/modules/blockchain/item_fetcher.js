import * as Collectibles from '../../utils/data/collectibles';
import * as Utils from '../../utils/utils';
import * as Constants from '../../utils/data';
import * as CONFIG from "../../contracts/config";

import {ITEM_TYPE} from '../../constants/constants';


class ItemFetcher {

  constructor(item, account, callback){
    this.item = item;
    this.callback = callback;
    this.totalSupply = -1;
    this.ownerAccount = account;
    this.itemTokenIdsOwned = [];
    this.itemOwnershipMap = [];

    this.setupItemContract(item);
  }

  setupItemContract(item) {
    const {web3} = window;
    if(item == ITEM_TYPE.BRAINPART) {
      this.itemContractInstance = web3.eth
      .contract(CONFIG.CONTRACTS.BRAINPART.ABI)
      .at(CONFIG.CONTRACTS.BRAINPART.ADDRESS);
    } else if(item == ITEM_TYPE.NEURON) {
      this.itemContractInstance = web3.eth
      .contract(CONFIG.CONTRACTS.NEURON.ABI)
      .at(CONFIG.CONTRACTS.NEURON.ADDRESS);
    }
  }

  fetchItems() {
    console.log("Loading...");
    var callback = function(err, totalSupply) {
      if(err) { console.log(err);
        console.log("Loading failed.") ;return; }
      // console.log("Total Supply", totalSupply);
      this.totalSupply = totalSupply;
      this.fetchItemsOwned();
    }
    callback = callback.bind(this);

    this.fetchTotalSupply(callback);
    // set the state
  }

  fetchTotalSupply(callback) {
    this.itemContractInstance
    .totalSupply(function(err, res) {
      if(err) { callback(err, null);
        console.log("Loading failed."); return;}
      const totalSupply = res.c[0];
      callback(null, totalSupply);
    });
  }



  fetchItemsOwned() {
    const {web3} = window;
    var counter = 0;
    var self = this;
    // Usage of let is important here!
    for(let i = 0; i < this.totalSupply; i++){
      this.itemContractInstance.ownerOf(i,
        function(err, res) {
          if(err) {console.log(err);
            console.log("Loading failed."); return;}
          //console.log("Owner", i, res);
          self.itemOwnershipMap[i] = res;
          counter += 1;
          if(counter == self.totalSupply) {
            self.setItemTokenIdsOwned(self.ownerAccount)
          }
        }// end of callback
      );//end of ownerOf
    } // end of for loop
  }

  setItemTokenIdsOwned(accountID) {
    for(var i = 0;i < this.totalSupply; i++) {
      this.itemOwnershipMap.push("");
    }
    // Logic to compute items owned by current address
    for(var i = 0; i < this.itemOwnershipMap.length; i++) {
      if(this.itemOwnershipMap[i] == accountID) {
        this.itemTokenIdsOwned.push(i);
      }
    }
    if(this.itemTokenIdsOwned.length == 0) {
      console.log("Loading finished!"); return; }
    this.fetchItemsDataOwned();
  }

  fetchItemsDataOwned() {
    //console.log("Owned item Ids", itemTokenIdsOwned);
    var callback;

    if(this.item == ITEM_TYPE.NEURON) {
      console.log("Fetching Neuron Data", this);
      callback = this.getNeuronItemsDataOwnedCallback();
    } else if(this.item == ITEM_TYPE.BRAINPART) {
      console.log("Fetching Brainpart Data", this);
      callback = this.getBrainpartItemsDataOwnedCallback();
    }
    callback.bind(this);

    for(let i = 0; i < this.itemTokenIdsOwned.length; i++) {
      if(this.item == ITEM_TYPE.NEURON) {
        this.itemContractInstance
        .neurons(this.itemTokenIdsOwned[i], callback);
        continue;
      }
      if(this.item == ITEM_TYPE.BRAINPART) {
        this.itemContractInstance
        .brainparts(this.itemTokenIdsOwned[i], callback);
        continue;
      }
    }
  }

  getBrainpartItemsDataOwnedCallback() {
    var counter = 0, self = this, items;
    items = Collectibles.Data.Brainparts;
    var callback = function(err, res) {
      if(err) {console.log(err);
        console.log("Loading failed."); return;}
      console.log("item Data", res, counter);
      const cIndex = res[1];
      const scIndex = res[2];
      const strength = res[3];
      // error handling for bad sub categories
      counter += 1;
      if(scIndex == "" || Number(scIndex) == undefined ||
      !Utils.ItemSubCategoryCheck(cIndex, scIndex)) { return; }
      items[scIndex].quantity += 1;
      items[scIndex].strength = strength;
      if(counter == self.itemTokenIdsOwned.length) {
        const itemsSortedByStrength =
        items.sort(Utils.GetSortOrder("strength"));
        self.SetItems(itemsSortedByStrength.reverse());
        // console.log(this);
        console.log("Loading finished!");
      }
    }
    return callback;
  }

  getNeuronItemsDataOwnedCallback() {
    var counter = 0, self = this, items;
    items = Collectibles.Data.Neurons;
    var callback = function(err, res) {
      if(err) {console.log(err); console.log("Loading failed.") ;return;}
      // console.log("Neuron Data", res, counter);
      const cIndex = res[1]; const scIndex = res[2];
      // error handling for bad sub categories
      counter += 1;
      if(scIndex == "" || Number(scIndex) == undefined ||
      !Utils.NeuronSubCategoryCheck(cIndex, scIndex)) { return; }
      items[scIndex].quantity += 1;

      if(counter == self.itemTokenIdsOwned.length) {
        self.SetItems(
          items.sort(Utils.GetSortOrder("quantity")).reverse());
        // console.log(this);
        console.log("Loading finished!");
      }
    }
    return callback;
  }


  SetItems(items) {
    console.log("Set Items called from item fetcher");
    console.log("Items fetched successfully:-", items);
    this.callback(null, {items});
  }

}

module.exports.ItemFetcher = ItemFetcher
