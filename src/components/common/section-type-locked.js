import React,{Component} from 'react';
import {connect} from 'react-redux';

const InfoComponent = ({lockState}) => {
  if(lockState == 'notInstalled') {
    return(
      <a className='info-button'
          target='_blank'
          href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'>
        <img src={`../../style/images/template/download_metamask.png`}/>
      </a>
    );
  }
  if(lockState == 'incorrectSetup') {
    return (
      <a className='info-button'
          target='_blank'
          href='https://www.youtube.com/watch?v=6Gf_kRE4MJU'>
        <button> Setup Metamask </button>
      </a>
    );
  }
  return (<span/>);
}
class SectionTypeLocked extends Component {

  render() {
    return (
      <div className='aae-section__container type-locked'>
        <div className='wrapper'>
          <img className='feature__image card neuron'
           src={`../../style/images/${this.props.image}`}/>
        </div>
        <div className='wrapper'>
          <div className='feature__action'>{this.props.titles[0]}</div>
          <div className='feature__action'>{this.props.titles[1]}</div>
          <div className='feature__result'>
            {this.props.description}
          </div>
          <div className='install-button-container'>
            <InfoComponent
              lockState = {this.props.lockState}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionTypeLocked;
