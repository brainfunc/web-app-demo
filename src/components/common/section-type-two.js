import React,{Component} from 'react';
import {connect} from 'react-redux';

class SectionTypeTwo extends Component {
  render() {
    return (
      <div className='aae-section__container type-two'>
        <div className='wrapper'>
          <img className='feature__image'
           src={`../../style/images/${this.props.images[0]}`}/>
         <div className='feature__title'>{this.props.titles[0]}</div>
         <div className='feature__description'> {this.props.descriptions[0]} </div>
        </div>
        <div className='wrapper'>
          <img className='feature__image'
           src={`../../style/images/${this.props.images[1]}`}/>
         <div className='feature__title'>{this.props.titles[1]}</div>
         <div className='feature__description'> {this.props.descriptions[1]} </div>
        </div>
        <div className='wrapper'>
          <img className='feature__image'
           src={`../../style/images/${this.props.images[2]}`}/>
         <div className='feature__title'>{this.props.titles[2]}</div>
         <div className='feature__description'> {this.props.descriptions[2]} </div>
        </div>
      </div>
    );
  }
}

export default SectionTypeTwo;
