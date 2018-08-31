import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SectionTypeTwo from '../components/common/section-type-two';
import SectionTypeOne from '../components/common/section-type-one';
import SectionTypeZero from '../components/common/section-type-zero';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

import * as Constants from '../utils/data';

export default class Home extends Component {

  handleScrollToElement(event) {
    console.log(this.refs);
    const signupNode = ReactDOM.findDOMNode(this.refs.footer)

    var i = 10;
    var int = setInterval(function() {
      window.scrollTo(0, i);
      i += 20;
      if (i >= signupNode.offsetTop) clearInterval(int);
    }, 1);

  }

  render() {
    return (
      <div className="aae__container">
        <Header/>
        <SectionTypeZero
          logoImage={Constants.sectionData[0].logoImage}
          title={Constants.sectionData[0].title}
          subTitle={Constants.sectionData[0].subTitle}/>
        <SectionTypeOne
          image={Constants.sectionData[1].image}
          titles={Constants.sectionData[1].titles}
          description={Constants.sectionData[1].description}/>
        <SectionTypeTwo
          images={Constants.sectionData[2].images}
          titles={Constants.sectionData[2].titles}
          descriptions={Constants.sectionData[2].descriptions}/>
        <Footer
          ref= 'footer'
          title={Constants.footerData.title}
          leadCaptureMessage = {Constants.footerData.leadCaptureMessage}
          notice={Constants.footerData.notice}/>
      </div>
    );
  }
}
