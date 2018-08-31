import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Divider extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='divider'>
        <div className='image-wrapper'>
        <img src='/style/images/icons/submission_footer.png'/>
        </div>
        <div className='image-wrapper'>
        <img src='/style/images/icons/submission_footer.png'/>
        </div>
        <div className='image-wrapper'>
        <img src='/style/images/icons/submission_footer.png'/>
        </div>
      </div>
    );
  }
}
