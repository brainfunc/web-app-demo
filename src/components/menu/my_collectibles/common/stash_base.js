import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Constants from '../../../../utils/data';

export default class StashBase extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='stash_base__container'>
        Stash Base
      </div>
    );
  }
}
