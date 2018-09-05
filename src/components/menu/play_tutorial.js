import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from '../common/header';
import Footer from '../common/footer';

import * as Constants from '../../utils/data';

export default class PlayTutorial extends Component {

  render() {
    return (

      <div className="aae__container">
        <Header/>
        <div className="play_tutorial__container">
          Play Tutorial
        </div>
        <Footer
          ref= 'footer'
          title={Constants.footerData.title}
          leadCaptureMessage = {Constants.footerData.leadCaptureMessage}
          notice={Constants.footerData.notice}/>
      </div>
    );
  }

}
