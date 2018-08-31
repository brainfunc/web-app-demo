import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import Modal from '../../libs/react-awesome-modal/lib/index';

import {Links} from '../../constants/constants';


class Header extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visible: false,
        width: 0,
        height: 0
      };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // Deals with modal related methods
  showModal() {
    this.setState({
      visible: true
    })
  }

  hideModal() {
    this.setState({
      visible: false
    })
  }

  // Deals with window re-sizing
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div className="aae-section__container header">
        <Modal visible={this.state.visible}
          width="100%" height="100%"
          effect="fadeInUp"
          onClickAway={this.hideModal.bind(this)}
          style={{backgroundColor:'transparent'}}>
            <div className='modal__container'>
              <div className='menu-close'>
                <img src='../../style/images/template/cross.png'
                onClick={this.hideModal.bind(this)}/>
              </div>
              <div className='menu-item'><a target='_blank' href={Links.header.team}> Team </a></div>
              <div className='menu-item'><a target='_blank' href={Links.header.blog}> Blog </a></div>
              <div className='menu-item'><a target='_blank' href={Links.header.jobs}> Jobs </a></div>
              <div className='menu-item'><a target='_blank' href={Links.header.faqs}> FAQs </a></div>
              <div className='menu-item'><a href={Links.header.contact}> Contact </a></div>
            </div>
          </Modal>
          <div className='wrapper'>
            <div className='brand'>
              <a href='/' style={{textDecoration:'none'}}>
                <img className='logo-image' src= {`../../style/images/template/brand_image.svg` }/>
                <img className='logo-text' src={`../../style/images/template/brand_text.svg`} />
              </a>
              <div className='menu-item more'>
                <img
                  className='image-more'
                  src={`../../style/images/template/more.svg`}
                  onMouseOver={e => (e.currentTarget.src = "../../style/images/template/more_pink.svg")}
                  onMouseOut={e => (e.currentTarget.src = "../../style/images/template/more.svg")}
                  onClick={this.showModal.bind(this)}/>
              </div>

              <div className='menu-item'><a target='_blank' href={Links.header.how_to_play}>Play Tutorial </a></div>
              <div className='menu-item'><Link to={Links.header.library}> Library </Link></div>
              <div className='menu-item'><Link to={Links.header.battleground}> Battles </Link></div>
              <div className='menu-item'><Link to={Links.header.marketplace}> Store </Link></div>
              <div className='menu-item'><Link to={Links.header.my_collectibles}> My Stash </Link></div>
            </div>
          </div>
      </div>
    );
  }
}

export default Header;
