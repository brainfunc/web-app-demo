import * as Collectibles from '../../utils/data/collectibles';
import * as Utils from '../../utils/utils';
import * as Constants from '../../utils/data';
import * as CONFIG from "../../contracts/config";


class ItemFetcher {

  constructor(type, callback){
    this.type = type;
    this.callback = callback;
  }

  FetchItems() {
    console.log("Loading...");
    // Fetch items owned using smart contracts
    // use total supply and owner of
    const {web3} = window;
    const itemContract = web3.eth.contract(
      CONFIG.CONTRACTS.BRAINPART.ABI);
    const itemContractInstance = itemContract.at(
      CONFIG.CONTRACTS.BRAINPART.ADDRESS);
    // console.log(ItemContractInstance);
    // console.log(web3.eth.defaultAccount);

    var fetchItemsOwnedCallback = function(err, totalSupply) {
      if(err) { console.log(err); console.log("Loading failed.") ;return; }
      // console.log("Total Supply", totalSupply);
      this.FetchItemsOwned(itemContractInstance, totalSupply);
    }
    fetchItemsOwnedCallback = fetchItemsOwnedCallback.bind(this);

    this.FetchTotalSupply(itemContractInstance,fetchItemsOwnedCallback);
    // set the state
  }

  FetchTotalSupply(itemContractInstance, callback) {
    itemContractInstance.totalSupply(function(err, res) {
      if(err) { callback(err, null); console.log("Loading failed."); return;}
      const totalSupply = res.c[0];
      callback(null, totalSupply);
    });
  }

  FetchItemsOwned(itemContractInstance, totalSupply) {
    // console.log("Fetching Items Owned by User...");
    // console.log("Total Supply", totalSupply);

    var itemOwnershipMap = [];
    for(var i = 0;i < totalSupply; i++) {
      itemOwnershipMap.push("");
    }

    this.FetchItemOwners(
      itemOwnershipMap, itemContractInstance, totalSupply);

    //console.log(itemOwnershipMap);
  }

  FetchItemOwners(
    itemOwnershipMap, itemContractInstance, totalSupply) {
    const {web3} = window;
    var counter = 0;
    var self = this;
    // Usage of let is important here!
    for(let i = 0; i < totalSupply; i++){
      itemContractInstance.ownerOf(i,
        function(err, res) {
          if(err) {console.log(err); console.log("Loading failed."); return;}
          //console.log("Owner", i, res);
          itemOwnershipMap[i] = res;
          counter += 1;
          if(counter == totalSupply) {
            self.FetchItemTokenIds(
              itemOwnershipMap, web3.eth.defaultAccount, itemContractInstance)
          }
        }// end of callback
      );//end of ownerOf
    } // end of for loop
  }

  FetchItemTokenIds(map, accountID, itemContractInstance) {
    // Logic to compute items owned by current address
    var itemTokenIds = [];
    for(var i = 0; i < map.length; i++) {
      if(map[i] == accountID) {
        itemTokenIds.push(i);
      }
    }
    if(itemTokenIds.length == 0) { console.log("Loading finished!"); return; }
    this.FetchItemsData(itemTokenIds, itemContractInstance);
  }

  FetchItemsData(itemTokenIds, itemContractInstance) {
    //console.log("Owned item Ids", itemTokenIds);

    var counter = 0;
    var items = Collectibles.Data.Brainparts;
    var self = this;
    // console.log(self);
    var itemFetchCallback = function(err, res) {
      if(err) {console.log(err); console.log("Loading failed."); return;}
      console.log("item Data", res, counter);
      const cIndex = res[1]; const scIndex = res[2]; const strength = res[3];
      // error handling for bad sub categories
      counter += 1;
      if(scIndex == "" || Number(scIndex) == undefined ||
      !Utils.ItemSubCategoryCheck(cIndex, scIndex)) { return; }
      items[scIndex].quantity += 1;
      items[scIndex].strength = strength;
      if(counter == itemTokenIds.length) {
        self.SetItems(
          items.sort(Utils.GetSortOrder("strength")).reverse());
        // console.log(this);
        console.log("Loading finished!");
      }
    }
    itemFetchCallback.bind(this);

    for(let i = 0; i < itemTokenIds.length; i++) {
      itemContractInstance.brainparts(
        itemTokenIds[i], itemFetchCallback);
    }
  }

  SetItems(items) {
    console.log("Set Items called from item fetcher");
    console.log("Items", items);
  }
}

module.exports.ItemFetcher = ItemFetcher
