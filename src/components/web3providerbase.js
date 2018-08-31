import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './common/header';
import Footer from './common/footer';
import SectionTypeLocked from './common/section-type-locked';

import MyCollectibles from './menu/my_collectibles';
import Marketplace from './menu/marketplace';
import Battleground from './menu/battleground';
import Library from './menu/library';

import * as Constants from '../utils/data';
import * as CONFIG from "../contracts/config";

const RouteSpecificComponent = ({route}) => {
  if(route == '/library') {
    return (
      <Library/>
    );
  }
  if(route == '/battleground') {
    return (
      <Battleground/>
    );
  }
  if(route == '/my_collectibles') {
    return (
      <MyCollectibles/>
    );
  }
  if(route == '/marketplace') {
    return (
      <Marketplace/>
    );
  }
}

export default class Web3ProviderBase extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userAccount:'',
      metamaskState: ''
    }
    this.getWeb3Accounts = this.getWeb3Accounts.bind(this);
  }

   getWeb3Accounts() {
     const { web3 } = window;
     var periodicFunction = (function(){
       web3.eth.getAccounts((err, res) => {
         if(err) {
           console.log(err.message);
           return;
         }
         var account = res[0];
         if(account !== this.state.userAccount) {
           this.setState({
             userAccount: account,
             metamaskState: 'Active'
           });
         }
       })
     }).bind(this);
     var accountInterval = setInterval(periodicFunction, 1000);
   }

  // For other network parameters
  // refer:- https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md
  startMonitoringIfOnRinkebyTestNetwork(callback) {
    const { web3 } = window;
    web3.version.getNetwork((err, netId) => {
      switch (netId) {
       case CONFIG.NETWORK_ID:
         callback(null);
         return true;
       default:
         callback(new Error('Not the Rinkeby test network'));
         return false;
      }
    })
  }

  componentDidMount() {
    const { web3 } = window;
    if (typeof web3 == 'undefined') {
      // no web3, use fallback, can tell to install metamask or mist
      this.setState({ metamaskState: 'NotInstalled' });
      return;
    }

    this.startMonitoringIfOnRinkebyTestNetwork((function(err) {
      if(err) {
        console.log(err.message);
        return;
      }
      // Success! Unlocked, installed and on rinkeby Test Network
      console.log('Success! User is on Rinkeby Test Network');
      this.getWeb3Accounts();
    }).bind(this))
  }

  renderSuccessScreen() {
    return (
      <div className="aae__container">
        <Header/>
        <RouteSpecificComponent
          route={this.props.location.pathname}/>
        <Footer
          ref= 'footer'
          title={Constants.footerData.title}
          leadCaptureMessage = {Constants.footerData.leadCaptureMessage}
          notice={Constants.footerData.notice}/>
      </div>
    );
  }

  renderMetamaskNotInstalledScreen() {
    return (
      <div className="aae__container">
        <Header/>
        <SectionTypeLocked
          image={Constants.lockedSection.image}
          titles={Constants.lockedSection.notInstalled.titles}
          description={Constants.lockedSection.notInstalled.description}
          lockState="notInstalled"
        />
        <Footer
          ref= 'footer'
          title={Constants.footerData.title}
          leadCaptureMessage = {Constants.footerData.leadCaptureMessage}
          notice={Constants.footerData.notice}/>
      </div>
    );
  }

  renderIncorrectSetupScreen() {
    return (
      <div className="aae__container">
        <Header/>
        <SectionTypeLocked
          image={Constants.lockedSection.image}
          titles={Constants.lockedSection.incorrectSetup.titles}
          description={Constants.lockedSection.incorrectSetup.description}
          lockState="incorrectSetup"
        />
        <Footer
          ref= 'footer'
          title={Constants.footerData.title}
          leadCaptureMessage = {Constants.footerData.leadCaptureMessage}
          notice={Constants.footerData.notice}/>
      </div>
    );
  }

  render() {
    console.log('Active User Account:-', this.state.userAccount);
    // console.log(this.props);
    // Active user account is undefined in case of logout
    if(!this.state.userAccount) {
      if(this.state.metamaskState == 'NotInstalled') {
        return this.renderMetamaskNotInstalledScreen();
      }
      return this.renderIncorrectSetupScreen();
    }
    if(this.state.metamaskState == 'Active') {
      return this.renderSuccessScreen();
    }
  }

}
