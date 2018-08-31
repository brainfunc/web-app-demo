import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as Constants from '../../../../utils/data';

export default class PagingBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedPage: 1
    }

    this.HandlePageSelection = this.HandlePageSelection.bind(this);
    this.GetPageSelectionClass = this.GetPageSelectionClass.bind(this);
  }

  HandlePageSelection(page) {
    this.setState({ selectedPage: page });
    this.props.selectFunction(page)
  }

  GetPageSelectionClass(number) {
    if(number == this.state.selectedPage) { return "selected" }
    else { return "" }
  }

  render() {

    return (
      <div className='paging__container'>
        <div className="previous">  </div>
        <div className={`page ${this.GetPageSelectionClass(1)}`}
        onClick={() => this.HandlePageSelection(1)}> 1 </div>
        <div className={`page ${this.GetPageSelectionClass(2)}`}
        onClick={() => this.HandlePageSelection(2)}> 2 </div>
        <div className="next"> </div>
      </div>
    );
  }
}
