import React, {PropTypes} from 'react';
import TweenOne from 'rc-tween-one';
import {Button, Menu, Dropdown, Badge, message, Icon} from 'antd';
import UserConfigModalContainer from './Home/UserConfigModalContainer';
import FollowerUserModelContainer from './FollowerUserModelContainer';
import {calcInfluenceFactor} from '../api';
import {Link} from 'react-router';
const Item = Menu.Item;
let cancelLoading = null;

let Header = (props) => {
  // console.log("props", props);
  
  if (!!cancelLoading && props.message.loadingFinish) {
    //call cancel loading function, clear the function variable, set loadingFinish to false again
    cancelLoading();
    cancelLoading = null;
  }
  if (props.message.type) {
    if (props.message.type !== "loading"){
      message.config({duration: 3});
      message[props.message.type](props.message.content);
      props.clearMessage();
    } else {
      cancelLoading = message[props.message.type](props.message.content, 0);
      props.clearMessage();
    }
  }
  
  const onBtnClick = () => {
    if (!props.user.id) {
      props.onUserLogin();
    } else {
      props.onUserLogout();
    }
  };
  
  const onMenuClick = ({item, key, keyPath}) => {
    // console.log("item, key, keyPath", item, key, keyPath);
    switch (key) {
      case "0":
        // console.log("followModalOpen start");
        props.router.push("/app/addFollower");
        break;
      case "2":
        props.onUserLogout();
        break;
    }
  };
  
  
  //12px 16px
  //Todo Better influence factor calculation
  const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="username" disabled={true} className = "user-menu-item">
          <div className="username user-info">
            <span> {props.user.name || props.user.login} </span>
          </div>
          <div className="user-info">
            {"GitHub影响因子："}<Badge status="success"/>{calcInfluenceFactor(props.user)}
          </div>
        </Menu.Item>
        <Menu.Divider />
          <Menu.Item key="0">
            <a>我的GitMax</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href={`https://www.github.com/${props.user.login}/followers`} target="_blank">访问Github账户</a>
          </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">登出</Menu.Item>
      </Menu>
  );
  const navData = {menu1: '导航一', menu2: '导航二', menu3: '导航三', menu4: '导航四'};
  const navChildren = Object.keys(navData)
      .map((key, i) => (<Item key={i}>{navData[key]}</Item>));
  
  return (<div>
    <TweenOne
        component="header"
        animation={{opacity: 0, type: 'from'}}
        id={props.id}
        className={props.className}
        style={props.navStyle}
    >
      <TweenOne
          className={`${props.className}-logo`}
          animation={{x: -30, type: 'from', ease: 'easeOutQuad'}}
      >
        <Link to = "/">
        <img width="100%" src="images/gitmax_logo_mono_horizontal2.png"/>
        </Link>
      </TweenOne>
      
      {
        props.user.id
        &&
        <Dropdown overlay={menu} trigger={['click']}>
          <TweenOne
              className={`${props.className}-user`}
              animation={{x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad'}}
          >
            <a href="" className="user">
              <span className="img">
                <img
                    src={props.user.avatar_url}
                    width="30"
                    height="30"
                />
                <Icon type="caret-down" className="custom-caret-down"/>
              </span>
            </a>
          </TweenOne>
        </Dropdown>
        
      }
      
      <TweenOne
          className={`${props.className}-nav`}
          animation={{x: 30, type: 'from', ease: 'easeOutQuad'}}
      >
        {
          !props.user.id
          &&
          <Button type="primary" icon="github" loading={props.user.isLogging}
                  key="button" size="large" onClick={onBtnClick}>
            GitHub帐号登录
          </Button>
        }
        
      </TweenOne>
    
    </TweenOne>
    <UserConfigModalContainer router = {props.router}/>
    <FollowerUserModelContainer />
  </div>);
};

Header.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  user: PropTypes.object,
  onUserLogin: PropTypes.func,
  onUserLogout: PropTypes.func,
  isFollowing: PropTypes.bool,
  followModalOpen: PropTypes.func,
  message: PropTypes.object,
};

Header.defaultProps = {
  className: 'header1',
  user: {
    isLogging: false
  }
};

export default Header;
