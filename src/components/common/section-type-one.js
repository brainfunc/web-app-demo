import React,{Component} from 'react';
import {connect} from 'react-redux';

class SectionTypeOne extends Component {
  render() {
    return (
      <div className='aae-section__container type-one'>
        <div className='wrapper'>
          <img className='feature__image card neuron'
           src={`../../style/images/${this.props.image}`}/>
        </div>
        <div className='wrapper'>
          <div className='feature__action'>{this.props.titles[0]}</div>
          <div className='feature__action'>{this.props.titles[1]}</div>
          <div className='feature__action'>{this.props.titles[2]}</div>
          <div className='feature__result'>
            {this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

export default SectionTypeOne;
