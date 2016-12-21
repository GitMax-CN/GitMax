import React, {PropTypes} from 'react';
import TweenOne from 'rc-tween-one';
import Menu from 'antd/lib/menu';
import {Button} from 'antd';
import * as firebase from 'firebase';
import {connect} from 'react-redux';
import {userLogout, userLogin} from '../actions';

const Item = Menu.Item;

let Header = (props) => {
  let onBtnClick = () => {
    if (!firebase.auth().currentUser) {
      props.dispatch(userLogin());
    } else {
      props.dispatch(userLogout());
    }
  };
  
  const navData = {menu1: '导航一', menu2: '导航二', menu3: '导航三', menu4: '导航四'};
  const navChildren = Object.keys(navData)
      .map((key, i) => (<Item key={i}>{navData[key]}</Item>));
  
  return (<TweenOne
      component="header"
      animation={{opacity: 0, type: 'from'}}
      {...props}
      style={{backgroundColor: '#ffffff', position: 'fixed'}}
  >
    <TweenOne
        className={`${props.className}-logo`}
        animation={{x: -30, type: 'from', ease: 'easeOutQuad'}}
    >
      <img width="100%" src="images/gitmax_logo_mono_horizontal2.png"/>
    </TweenOne>
    <TweenOne
        className={`${props.className}-nav`}
        animation={{x: 30, type: 'from', ease: 'easeOutQuad'}}
    >
      <Button type="primary" key="button" onClick={onBtnClick}>
        开始使用
      </Button>
      
      {/*<Menu*/}
      {/*mode="horizontal" defaultSelectedKeys={['a']}*/}
      {/*style={{ color: '#ffffff' }}*/}
      {/*>*/}
      {/*{navChildren}*/}
      {/*</Menu>*/}
    </TweenOne>
  </TweenOne>);
};

Header = connect()(Header);

// Header.propTypes = {
//   className: PropTypes.string,
//   dispatch: PropTypes.function,
// };

Header.defaultProps = {
  className: 'header0',
};

export default Header;
