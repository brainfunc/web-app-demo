import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Utils from '../../../utils/utils';
import * as Tasks from '../../../utils/data/battles/tasks';
import * as Collectibles from '../../../utils/data/collectibles';

export const ProgressBar = function(props) {
  // TODO:- Increase or decrase based on props
  var barClass;
  if(props.status == "correct") { barClass = "increase"; }
  else { barClass = "decrease"; }
  console.log("Bar Class", barClass);
  return(
    <div className='progress-container'>
      <div className={`progress-base ${barClass}`}>
        <div className='progress-previous'>
          <div className='progress-current'>
          </div>
        </div>
      </div>
    </div>
  );
}

export const PartResultCard = function(props) {
  console.log("Card Props", props);
  var tickImageSrc, description;
  if(props.status == "correct") {
    tickImageSrc = `/style/images/icons/tick.png`;
    description = `Congrats! You chose this part correctly. You have
      strengthened your brainpart. You can see the progress indicator until
      you level up to the next strength level to your right. `;
  } else {
    tickImageSrc = `/style/images/icons/wrong.png`;
    description = `Sorry! You chose this part incorrectly. You have
      weakened your brainpart. You can see the progress indicator until
      you level up to the next strength level to your right. `;
  }
  const part = Utils.GetBrainPartItemWithSubcategoryInArray(
    props.partSubcategory, Collectibles.Data.Brainparts);
  console.log("Part", part);
  return (
    <div className='part-result-card'>
      <div className='brainpart-image-container'>
        <img className='brainpart' src={part.image}/>
        <img className='result' src={tickImageSrc}/>
      </div>
      <div className='result-description-container'>
        <div className='title'>{part.subcategory} </div>
        <div className='subtitle'>{part.category} • Strength Level {part.strength}</div>
        <div className='text'>{description}</div>
      </div>
      <div className='level-up-details-container'>
        <img className='stars' src={`/style/images/icons/stars.png`}/>
        <ProgressBar status={props.status}/>
      </div>
    </div>
  );
}

export const PartResultCards = function(props) {
  console.log("Parts Results", props);
  var cardsArr = [];
  const correctParts = props.result.correct;
  const incorrectParts = props.result.incorrect;
  for(var i = 0; i < correctParts.length; i++) {
    cardsArr.push(
      <PartResultCard key={i}
      status="correct" partSubcategory={correctParts[i]}/>
    );
  }
  for(var i = 0; i < incorrectParts.length; i++) {
    cardsArr.push(
      <PartResultCard key={i + correctParts.length}
      status="incorrect" partSubcategory={incorrectParts[i]}/>
    );
  }
  return (cardsArr);
}

export default class ResultsComponent extends Component {

  constructor(props) {
    super(props);

    this.HandleTakeAgainClicked = this.HandleTakeAgainClicked.bind(this);
  }

  componentDidMount() {
    //console.log(this.state);
    console.log("Props", this.props);
  }

  HandleTakeAgainClicked() {
    console.log("Take again clicked");
  }

  render(){
    //console.log(Tasks.Data.tasks[this.props.battleId].correctCombination);
    const submittedCombination = this.props.submittedCombination;
    const correctCombination = Tasks.Data.tasks[this.props.battleId].correctCombination;
    const result = Utils.GetResultOfBattle("23",
      this.props.submittedCombination,
      Tasks.Data.tasks[this.props.battleId].correctCombination);
    const score = Number(result.correct.length).toFixed(1);
    const percentage = Number(score/(correctCombination.length*1.0) * 100).toFixed(2);
    console.log("Result", result);
    return(
      <div className='body'>
        <div className='results'>
          <div className='heading'> Score Card </div>
          <div className='description-wrapper'>
            <div className='description'>
              Overall Score - {score}
            </div>
            <div className='description'>
              Overall Percentile - {percentage}%
            </div>
          </div>
          <div className='button-wrapper'>
            <button className="take-again" onClick={this.HandleTakeAgainClicked}>
              Fight New Battle
            </button>
          </div>
          <div className='subheading'> Details </div>
          <div className='partwise-results-container'>
            <PartResultCards result={result}/>
          </div>
        </div>
      </div>
    );
  }
}
