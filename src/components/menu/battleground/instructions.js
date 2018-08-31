import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Instructions from '../../../utils/data/battles/instructions';

export default class InstructionsComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='body'>
        <div className='instructions'>
          <div className='instruction-item'>
            <div className='instruction-bullet-image-wrapper'>
              <img className='instruction-bullet-image' src={`/style/images/template/tick.png`}/>
            </div>
            <div className='instruction-text'> {Instructions.Data.Instructions[0].text}
            </div>
          </div>
          <div className='instruction-item'>
            <div className='instruction-bullet-image-wrapper'>
              <img className='instruction-bullet-image' src={`/style/images/template/tick.png`}/>
            </div>
            <div className='instruction-text'> {Instructions.Data.Instructions[1].text}
            </div>
          </div>
          <div className='instruction-item'>
            <div className='instruction-bullet-image-wrapper'>
              <img className='instruction-bullet-image' src={`/style/images/template/tick.png`}/>
            </div>
            <div className='instruction-text'> {Instructions.Data.Instructions[2].text}
            </div>
          </div>
          <div className='instruction-item'>
            <div className='instruction-bullet-image-wrapper'>
              <img className='instruction-bullet-image' src={`/style/images/template/tick.png`}/>
            </div>
            <div className='instruction-text'> {Instructions.Data.Instructions[3].text}
            </div>
          </div>
          <div className='instruction-item'>
            <div className='instruction-bullet-image-wrapper'>
              <img className='instruction-bullet-image' src={`/style/images/template/tick.png`}/>
            </div>
            <div className='instruction-text'> {Instructions.Data.Instructions[4].text}
            </div>
          </div>
        </div>
        <div className='start-footer'>
          <div className='footer-image-container left'>
            <img className='footer-image' src={`/style/images/icons/submission_footer.png`}/>
          </div>
          <div className='start-button-wrapper'>
            <button className='start-button'
            onClick= {() => this.props.StartBattleFunction()}>
              Start
            </button>
          </div>
          <div className='footer-image-container right'>
            <img className='footer-image' src={`/style/images/icons/submission_footer.png`}/>
          </div>
        </div>
      </div>
    );
  }

}
