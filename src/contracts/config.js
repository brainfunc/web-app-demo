//var ROOT_SERVER_URL = 'http://localhost:3000';
import {NEURON_CONTRACT_ABI} from "./abi/neuron";
import {BRAINPART_CONTRACT_ABI} from "./abi/brainpart";

export const NETWORK_ID = "4";
export const ROOT_SERVER_URL = 'https://brainfunc-landing-page-server.herokuapp.com';
export const CONTRACTS = {
  NEURON: {
    "CREATOR": "0xe0e8ae3c99784bdaac966ae0a0f1e0ac87d43384",
    "ADDRESS": "0xd63b2f5c8ab714f68fb81d2b4b063fc0a500695e",
    "ABI": NEURON_CONTRACT_ABI
  },
  BRAINPART : {
    "CREATOR": "0xe0e8ae3c99784bdaac966ae0a0f1e0ac87d43384",
    "ADDRESS": "0x93b433cdbc5ea314a143ce8ee97f064b8da0b19c",
    "ABI": BRAINPART_CONTRACT_ABI

  }
}
