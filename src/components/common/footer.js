import React,{Component} from 'react';
import {Links} from '../../constants/constants';

// Code for copyright notice
// <div className='divider'></div>
// <div className='sub-section notice'>
//   © Tejas Nikumbh 2018. All rights reserved.
// </div>

// Code for terms and privacy
// <div className='sub-section notice'>
//   <div className='component left'>
//     Terms of use
//   </div>
//   <div className='component right'>
//     Privacy
//   </div>
// </div>

class Footer extends Component {

  render() {
    return (
      <div>
        <div className='aae-section__container footer'>
          <div className='sub-section footer'>
            <ul>
              <li className='list-heading'> About </li>
              <li><a target='_blank' href={Links.footer.about.team}> Team </a></li>
              <li><a target='_blank' href={Links.footer.about.blog}> Blog </a></li>
              <li><a target='_blank' href={Links.footer.about.jobs}> Jobs </a></li>
              <li><a target='_blank' href={Links.footer.about.faqs}> FAQs </a></li>
              <li><a href={Links.footer.about.contact}> Contact </a></li>
            </ul>
          </div>
          <div className='sub-section footer'>
            <ul>
              <li className='list-heading'> Community </li>
              <li><a target='_blank' href={Links.footer.community.facebook}> Facebook </a></li>
              <li><a target='_blank' href={Links.footer.community.twitter}> Twitter </a></li>
              <li><a target='_blank' href={Links.footer.community.telegram}> Telegram </a></li>
              <li><a target='_blank' href={Links.footer.community.reddit}> Reddit </a></li>
              <li><a target='_blank' href={Links.footer.community.youtube}> Youtube </a></li>
              <li><a target='_blank' href={Links.footer.community.linkedin}> Linkedin </a></li>
            </ul>
          </div>
          <div className='sub-section footer'>
          <ul>
            <li className='list-heading'> Gameplay </li>
            <li><a target='_blank' href={Links.footer.gameplay.overview}> Overview </a></li>
            <li><a target='_blank' href={Links.footer.gameplay.concepts}> Concepts </a></li>
            <li><a target='_blank' href={Links.footer.gameplay.collectibles}> Collectibles </a></li>
            <li><a target='_blank' href={Links.footer.gameplay.marketplace}> Marketplace </a></li>
            <li><a target='_blank' href={Links.footer.gameplay.metamask}> Metamask </a></li>
          </ul>
          </div>
          <div className='sub-section footer'>
            <div className='tech-message-wrapper'>
              <div className='tech-message'> Powered Using </div>
            </div>
            <div className='tech-image-wrapper'>
              <img className='tech-image' src={`../../style/images/template/react_gray.svg`}/>
              <img className='tech-image' src={`../../style/images/template/node_gray.svg`}/>
              <img className='tech-image' src={`../../style/images/template/solidity_gray.svg`}/>
            </div>
          </div>
        </div>
        <div className='aae-section__container notice'>
          <div className='sub-section notice'>
            © All rights are reserved by Tejas Nikumbh (2018)
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
