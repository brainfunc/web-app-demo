import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Links} from '../../constants/constants';

class SectionTypeZero extends Component {

  render() {
    return (
      <div className='aae-section__container section-type-zero'>
        <div className='wrapper'>
          <img className='feature__image card' src={`../../style/images/${this.props.logoImage}`}/>
        </div>
        <div className='wrapper'>
          <div className='title'> {this.props.title} </div>
          <div className='sub-title'> {this.props.subTitle} </div>
          <div className='signup-button-wrapper'>
            <Link className='signup-button' to={Links.header.marketplace}>
                Get Started
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionTypeZero;
