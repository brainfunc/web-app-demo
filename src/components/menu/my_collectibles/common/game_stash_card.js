import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import posed from "react-pose";

import * as Constants from '../../../../utils/data';

// Animation related components
const Card = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 0.94 },
  transition: {
    duration: 600,
    ease: 'circInOut'
  }
})

export default class GameStashCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hovering: {
        alto: false,
        other: false
      }
    }
  }

  SetHovered(type, condition) {
    var activeState = {
      hovering: {
        alto: false,
        other: false,
      }
    }

    activeState.hovering[type] = condition;
    this.setState(activeState);
  }

  render() {
    return (
      <div className='game_stash_card'>
        <Card className='card yellow'
          pose = { this.state.hovering.alto ? "hovered": "idle" }
          onMouseOver = { () =>  this.SetHovered("alto", true) }
          onMouseLeave = { () =>  this.SetHovered("alto", false) }
          onClick={ () => this.props.SelectCard("alto")}>
          <div className='title'> Alto Crypto Challenge Loot </div>
          <img className='card_image'
            src={`/style/images/cross-game/alto_loot.png`}/>
          <div className='card_description'>
            <div className='number'> Types Owned </div>
            <div className='price'> {this.props.items}/5 </div>
          </div>
        </Card>
        <div className='card-details'>
          <div className='title'>
            Alto Crypto Challenge Loot
          </div>
          <div className='description'>
            {`The Alto Crypto Challenge Loot is composed of 5 items right now, viz
              The Alchemical Mug
              Amulet of Dreams
              Arcanist's Tome of Spells
              Haste Drums
              Scroll of the Light's Watch
              .You can buy the challenge loot items offered by alto by clicking the button below`}

              <a href='https://rinkeby-loot.alto.io/store' target='_blank'>
                <button className='loot-explorer'>
                  Alto Challenge Loot
                </button>
              </a>

          </div>
        </div>
      </div>
    );
  }
}
