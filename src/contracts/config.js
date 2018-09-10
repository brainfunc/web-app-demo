//var ROOT_SERVER_URL = 'http://localhost:3000';
import {NEURON_CONTRACT_ABI} from "./abi/neuron";
import {BRAINPART_CONTRACT_ABI} from "./abi/brainpart";

export const NETWORK_ID = "4";
export const ROOT_SERVER_URL = 'https://brainfunc-landing-page-server.herokuapp.com';
export const CONTRACTS = {
  NEURON: {
    "CREATOR": "0x78178a717dc08e33e2ad3cdd98fb1f4e2ae23f37",
    "ADDRESS": "0xbfaa71432520a347ef3971a4b35b6d2d18f0629f",
    "ABI": NEURON_CONTRACT_ABI
  },
  BRAINPART : {
    "CREATOR": "0x78178a717dc08e33e2ad3cdd98fb1f4e2ae23f37",
    "ADDRESS": "0x8e32e526dc11e33eade0a4e796cce247fb981ae1",
    "ABI": BRAINPART_CONTRACT_ABI

  }
}
